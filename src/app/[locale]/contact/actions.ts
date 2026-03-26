"use server";

import { siteConfig } from "@/lib/config";
import {
  isValidEmail,
  normalizeRequiredText,
  sendLeadNotification,
  storeLead,
} from "@/lib/forms/lead-submission";

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
async function sendContactNotification(payload: ContactPayload) {
  const subject =
    payload.locale === "ro"
      ? `Lead nou Growonio de la ${payload.firstName} ${payload.lastName}`
      : `New Growonio lead from ${payload.firstName} ${payload.lastName}`;

  return sendLeadNotification({
    replyTo: payload.email,
    subject,
    text: [
      `Name: ${payload.firstName} ${payload.lastName}`,
      `Email: ${payload.email}`,
      `Locale: ${payload.locale}`,
      `Source: ${payload.sourcePath}`,
      "",
      payload.message,
    ].join("\n"),
  });
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
    emailed = await sendContactNotification(payload);
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
