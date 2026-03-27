"use server";

import { siteConfig } from "@/lib/config";
import {
  buildNotificationEmail,
  hasMeaningfulText,
  isValidEmail,
  isValidPhone,
  isValidUrl,
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
      invalidPhone: "Introdu un număr de telefon sau WhatsApp valid.",
      invalidLink:
        "Linkul de LinkedIn, CV sau portofoliu trebuie să fie un URL complet valid.",
      tooShort:
        "Răspunsurile sunt prea scurte. Adaugă puțin context util ca să putem evalua aplicarea.",
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
    invalidPhone: "Enter a valid phone or WhatsApp number.",
    invalidLink:
      "The LinkedIn, CV, or portfolio link must be a complete valid URL.",
    tooShort:
      "Your answers are too short. Add a bit more useful context so we can review the application.",
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
  const submittedAt = new Date().toISOString();
  const emailContent = buildNotificationEmail({
    title: "New Growonio careers application",
    fields: [
      { label: "Full name", value: payload.fullName },
      { label: "Email", value: payload.email },
      { label: "Phone / WhatsApp", value: payload.phone },
      { label: "University / Background", value: payload.background },
      {
        label: "LinkedIn / CV / Portfolio",
        value: payload.profileLink || "Not provided",
      },
      { label: "Source page", value: payload.sourcePath },
      { label: "Locale", value: payload.locale },
      { label: "Submitted at (UTC)", value: submittedAt },
    ],
    sections: [
      {
        heading: "Why they are interested",
        value: payload.interest,
      },
      {
        heading: "Sales / outreach / marketing experience",
        value: payload.experience,
      },
    ],
  });

  return sendLeadNotification({
    replyTo: payload.email,
    subject: "New Growonio careers application",
    html: emailContent.html,
    text: emailContent.text,
    tags: [
      { name: "form_type", value: "careers" },
      { name: "locale", value: payload.locale },
    ],
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

  if (!isValidPhone(payload.phone)) {
    return { error: messages.invalidPhone, success: null };
  }

  if (payload.profileLink && !isValidUrl(payload.profileLink)) {
    return { error: messages.invalidLink, success: null };
  }

  if (
    !hasMeaningfulText(payload.fullName, 3, 3) ||
    !hasMeaningfulText(payload.background, 3, 3) ||
    !hasMeaningfulText(payload.interest, 30, 18) ||
    !hasMeaningfulText(payload.experience, 15, 8)
  ) {
    return { error: messages.tooShort, success: null };
  }

  if (
    payload.fullName.length > 120 ||
    payload.phone.length > 30 ||
    payload.background.length > 160 ||
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

  if (!stored) {
    console.warn("Careers application email will proceed without Supabase lead storage.");
  }

  try {
    emailed = await sendCareersNotification(payload);
  } catch (error) {
    console.error("Failed to send careers notification:", error);
  }

  // Public-form success means Growonio received the email notification,
  // not only that we managed to persist a lead row.
  if (!emailed) {
    return { error: messages.fallback, success: null };
  }

  return {
    error: null,
    success: messages.success,
  };
}

export { initialState as initialCareersFormState };
