"use server";

import { createAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/config";

export type ContactFormState = {
  error: string | null;
  success: string | null;
};

const initialState: ContactFormState = {
  error: null,
  success: null,
};

type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  locale: string;
  sourcePath: string;
};

function normalizeRequiredText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function getLocalizedMessages(locale: string) {
  if (locale === "ro") {
    return {
      required: "Completează toate câmpurile înainte de trimitere.",
      invalidEmail: "Introdu o adresă de email validă.",
      tooLong: "Mesajul este prea lung. Te rog scurtează-l și încearcă din nou.",
      success:
        "Mesajul a fost trimis. Revenim către tine cât mai curând.",
      fallback:
        `Nu am putut procesa formularul acum. Trimite-ne direct la ${siteConfig.companyEmail}.`,
    };
  }

  return {
    required: "Complete all fields before submitting.",
    invalidEmail: "Enter a valid email address.",
    tooLong: "Your message is too long. Shorten it and try again.",
    success: "Your message has been sent. We will get back to you shortly.",
    fallback: `We could not process the form right now. Please email us directly at ${siteConfig.companyEmail}.`,
  };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_NOTIFICATION_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    return null;
  }

  return { apiKey, from, to };
}

async function storeLead(payload: ContactPayload) {
  if (!hasSupabaseAdminEnv()) {
    return false;
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("contact_leads").insert({
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    message: payload.message,
    locale: payload.locale,
    source_path: payload.sourcePath,
  });

  if (error) {
    if (
      error.code === "42P01" ||
      error.message.includes("contact_leads") ||
      error.message.includes("schema cache")
    ) {
      return false;
    }

    throw error;
  }

  return true;
}

async function sendLeadNotification(payload: ContactPayload) {
  const config = getResendConfig();
  if (!config) {
    return false;
  }

  const subject =
    payload.locale === "ro"
      ? `Lead nou Growonio de la ${payload.firstName} ${payload.lastName}`
      : `New Growonio lead from ${payload.firstName} ${payload.lastName}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: payload.email,
      subject,
      text: [
        `Name: ${payload.firstName} ${payload.lastName}`,
        `Email: ${payload.email}`,
        `Locale: ${payload.locale}`,
        `Source: ${payload.sourcePath}`,
        "",
        payload.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error("Resend delivery failed.");
  }

  return true;
}

export async function submitContactAction(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const website = normalizeRequiredText(formData.get("website"));
  const locale = normalizeRequiredText(formData.get("locale")) || "ro";
  const messages = getLocalizedMessages(locale);

  if (website) {
    return {
      error: null,
      success: messages.success,
    };
  }

  const payload: ContactPayload = {
    firstName: normalizeRequiredText(formData.get("first_name")),
    lastName: normalizeRequiredText(formData.get("last_name")),
    email: normalizeRequiredText(formData.get("email")),
    message: normalizeRequiredText(formData.get("message")),
    locale,
    sourcePath: normalizeRequiredText(formData.get("source_path")) || "/contact",
  };

  if (!payload.firstName || !payload.lastName || !payload.email || !payload.message) {
    return { error: messages.required, success: null };
  }

  if (!isValidEmail(payload.email)) {
    return { error: messages.invalidEmail, success: null };
  }

  if (payload.message.length > 5000) {
    return { error: messages.tooLong, success: null };
  }

  let stored = false;
  let emailed = false;

  try {
    stored = await storeLead(payload);
  } catch (error) {
    console.error("Failed to store contact lead:", error);
  }

  try {
    emailed = await sendLeadNotification(payload);
  } catch (error) {
    console.error("Failed to send contact notification:", error);
  }

  if (!stored && !emailed) {
    return { error: messages.fallback, success: null };
  }

  return {
    error: null,
    success: messages.success,
  };
}

export { initialState as initialContactFormState };
