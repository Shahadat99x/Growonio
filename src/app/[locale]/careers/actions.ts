"use server";

import { siteConfig } from "@/lib/config";
import {
  isValidEmail,
  normalizeRequiredText,
  sendLeadNotification,
  storeLead,
} from "@/lib/forms/lead-submission";

export type CareersFormState = {
  error: string | null;
  success: string | null;
};

const initialState: CareersFormState = {
  error: null,
  success: null,
};

type CareersPayload = {
  fullName: string;
  email: string;
  phone: string;
  background: string;
  profileLink: string;
  interest: string;
  experience: string;
  locale: string;
  sourcePath: string;
};

function getLocalizedMessages(locale: string) {
  if (locale === "ro") {
    return {
      required:
        "Completează toate câmpurile obligatorii înainte de trimitere.",
      invalidEmail: "Introdu o adresă de email validă.",
      tooLong:
        "Răspunsul este prea lung. Scurtează-l puțin și încearcă din nou.",
      success:
        "Aplicarea a fost trimisă. Revenim către tine dacă vedem o potrivire bună.",
      fallback:
        `Nu am putut procesa formularul acum. Trimite-ne direct la ${siteConfig.companyEmail}.`,
    };
  }

  return {
    required: "Complete the required fields before submitting.",
    invalidEmail: "Enter a valid email address.",
    tooLong: "One of your answers is too long. Shorten it and try again.",
    success:
      "Your application has been sent. We will get back to you if there is a good fit.",
    fallback: `We could not process the form right now. Please email us directly at ${siteConfig.companyEmail}.`,
  };
}

function splitFullName(fullName: string) {
  const parts = fullName
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length <= 1) {
    return {
      firstName: fullName,
      lastName: "-",
    };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function buildApplicationMessage(payload: CareersPayload) {
  return [
    "Growonio careers application",
    `Full name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Phone / WhatsApp: ${payload.phone}`,
    `University / Background: ${payload.background}`,
    `LinkedIn / CV / Portfolio: ${payload.profileLink || "Not provided"}`,
    `Locale: ${payload.locale}`,
    `Source: ${payload.sourcePath}`,
    "",
    "Why are you interested in Growonio?",
    payload.interest,
    "",
    "Sales / outreach / marketing experience",
    payload.experience,
  ].join("\n");
}

async function sendCareersNotification(payload: CareersPayload) {
  const subject =
    payload.locale === "ro"
      ? `Aplicare Growonio de la ${payload.fullName}`
      : `Growonio application from ${payload.fullName}`;

  return sendLeadNotification({
    replyTo: payload.email,
    subject,
    text: buildApplicationMessage(payload),
  });
}

export async function submitCareersAction(
  _prevState: CareersFormState,
  formData: FormData,
): Promise<CareersFormState> {
  const website = normalizeRequiredText(formData.get("website"));
  const locale = normalizeRequiredText(formData.get("locale")) || "ro";
  const messages = getLocalizedMessages(locale);

  if (website) {
    return {
      error: null,
      success: messages.success,
    };
  }

  const payload: CareersPayload = {
    fullName: normalizeRequiredText(formData.get("full_name")),
    email: normalizeRequiredText(formData.get("email")),
    phone: normalizeRequiredText(formData.get("phone")),
    background: normalizeRequiredText(formData.get("background")),
    profileLink: normalizeRequiredText(formData.get("profile_link")),
    interest: normalizeRequiredText(formData.get("interest")),
    experience: normalizeRequiredText(formData.get("experience")),
    locale,
    sourcePath: normalizeRequiredText(formData.get("source_path")) || "/careers",
  };

  if (
    !payload.fullName ||
    !payload.email ||
    !payload.phone ||
    !payload.background ||
    !payload.interest ||
    !payload.experience
  ) {
    return { error: messages.required, success: null };
  }

  if (!isValidEmail(payload.email)) {
    return { error: messages.invalidEmail, success: null };
  }

  if (
    payload.background.length > 600 ||
    payload.profileLink.length > 300 ||
    payload.interest.length > 2000 ||
    payload.experience.length > 2000
  ) {
    return { error: messages.tooLong, success: null };
  }

  const { firstName, lastName } = splitFullName(payload.fullName);
  const leadMessage = buildApplicationMessage(payload);

  let stored = false;
  let emailed = false;

  try {
    stored = await storeLead({
      firstName,
      lastName,
      email: payload.email,
      message: leadMessage,
      locale: payload.locale,
      sourcePath: payload.sourcePath,
    });
  } catch (error) {
    console.error("Failed to store careers application:", error);
  }

  try {
    emailed = await sendCareersNotification(payload);
  } catch (error) {
    console.error("Failed to send careers notification:", error);
  }

  if (!stored && !emailed) {
    return { error: messages.fallback, success: null };
  }

  return {
    error: null,
    success: messages.success,
  };
}

export { initialState as initialCareersFormState };
