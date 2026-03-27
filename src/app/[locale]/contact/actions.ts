"use server";

import { siteConfig } from "@/lib/config";
import {
  buildNotificationEmail,
  hasMeaningfulText,
  isValidEmail,
  normalizeRequiredText,
  sendLeadNotification,
  storeLead,
} from "@/lib/forms/lead-submission";

type ContactFormState = {
  error: string | null;
  success: string | null;
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
      tooShort:
        "Adaugă câteva detalii utile despre proiect ca să putem înțelege solicitarea.",
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
    tooShort:
      "Add a bit more useful detail about the project so we can understand the request.",
    tooLong: "Your message is too long. Shorten it and try again.",
    success: "Your message has been sent. We will get back to you shortly.",
    fallback: `We could not process the form right now. Please email us directly at ${siteConfig.companyEmail}.`,
  };
}
async function sendContactNotification(payload: ContactPayload) {
  const submittedAt = new Date().toISOString();
  const emailContent = buildNotificationEmail({
    title: "New Growonio contact inquiry",
    fields: [
      { label: "First name", value: payload.firstName },
      { label: "Last name", value: payload.lastName },
      { label: "Email address", value: payload.email },
      { label: "Source page", value: payload.sourcePath },
      { label: "Locale", value: payload.locale },
      { label: "Submitted at (UTC)", value: submittedAt },
    ],
    sections: [
      {
        heading: "Project details / Message",
        value: payload.message,
      },
    ],
  });

  return sendLeadNotification({
    replyTo: payload.email,
    subject: "New Growonio contact inquiry",
    html: emailContent.html,
    text: emailContent.text,
    tags: [
      { name: "form_type", value: "contact" },
      { name: "locale", value: payload.locale },
    ],
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

  if (
    !hasMeaningfulText(payload.firstName, 2, 2) ||
    !hasMeaningfulText(payload.lastName, 2, 2) ||
    !hasMeaningfulText(payload.message, 20, 10)
  ) {
    return { error: messages.tooShort, success: null };
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

  if (!stored) {
    console.warn("Contact submission email will proceed without Supabase lead storage.");
  }

  try {
    emailed = await sendContactNotification(payload);
  } catch (error) {
    console.error("Failed to send contact notification:", error);
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
