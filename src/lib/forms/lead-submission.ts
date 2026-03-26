import { createAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/server";

export type LeadPayload = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  locale: string;
  sourcePath: string;
};

type LeadNotificationInput = {
  replyTo: string;
  subject: string;
  text: string;
};

export function normalizeRequiredText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export function isValidEmail(email: string) {
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

export async function storeLead(payload: LeadPayload) {
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

export async function sendLeadNotification({
  replyTo,
  subject,
  text,
}: LeadNotificationInput) {
  const config = getResendConfig();
  if (!config) {
    return false;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: replyTo,
      subject,
      text,
    }),
  });

  if (!response.ok) {
    throw new Error("Resend delivery failed.");
  }

  return true;
}
