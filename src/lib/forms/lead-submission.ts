import { createAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase/server";

const DEFAULT_RESEND_FROM_EMAIL = "Growonio <hello@growonio.ro>";
const DEFAULT_NOTIFICATION_EMAIL = "growoniohq@gmail.com";

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
  html: string;
  text: string;
  tags?: Array<{
    name: string;
    value: string;
  }>;
};

type NotificationField = {
  label: string;
  value: string;
};

type NotificationSection = {
  heading: string;
  value: string;
};

type NotificationEmailInput = {
  title: string;
  fields: NotificationField[];
  sections?: NotificationSection[];
};

export function normalizeRequiredText(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export function normalizeOptionalText(value: FormDataEntryValue | null) {
  const normalized = normalizeRequiredText(value);
  return normalized.length > 0 ? normalized : "";
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone: string) {
  return /^[+()\d\s.-]{7,30}$/.test(phone);
}

export function isValidUrl(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function hasMeaningfulText(
  value: string,
  minimumLength: number,
  minimumAlphaNumeric = Math.min(minimumLength, 6),
) {
  if (value.length < minimumLength) {
    return false;
  }

  const alphaNumericLength = value.replace(/[^\p{L}\p{N}]+/gu, "").length;
  return alphaNumericLength >= minimumAlphaNumeric;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatMultilineHtml(value: string) {
  return escapeHtml(value).replaceAll("\n", "<br />");
}

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY for public form delivery.");
  }

  // These defaults match the current Growonio mailbox setup so optional env drift
  // does not silently disable public-form notifications.
  const from = process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_RESEND_FROM_EMAIL;
  const to =
    process.env.CONTACT_NOTIFICATION_EMAIL?.trim() || DEFAULT_NOTIFICATION_EMAIL;

  return { apiKey, from, to };
}

export function buildNotificationEmail({
  title,
  fields,
  sections = [],
}: NotificationEmailInput) {
  const textParts = [
    title,
    "",
    ...fields.map((field) => `${field.label}: ${field.value}`),
  ];

  for (const section of sections) {
    textParts.push("", `${section.heading}:`, section.value);
  }

  const html = `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;background:#f4f4f8;color:#111827;font-family:Arial,sans-serif;">
    <div style="margin:0 auto;max-width:680px;padding:32px 20px;">
      <div style="border:1px solid #e5e7eb;border-radius:24px;background:#ffffff;overflow:hidden;">
        <div style="padding:28px 28px 16px;background:linear-gradient(135deg,#1f1b3d 0%,#3147a3 100%);color:#ffffff;">
          <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.78;">Growonio</p>
          <h1 style="margin:0;font-size:28px;line-height:1.25;">${escapeHtml(title)}</h1>
        </div>
        <div style="padding:28px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tbody>
              ${fields
                .map(
                  (field) => `
                    <tr>
                      <td style="padding:0 0 16px;vertical-align:top;width:180px;font-size:13px;font-weight:700;color:#4b5563;">${escapeHtml(field.label)}</td>
                      <td style="padding:0 0 16px;vertical-align:top;font-size:14px;line-height:1.65;color:#111827;">${formatMultilineHtml(field.value)}</td>
                    </tr>`,
                )
                .join("")}
            </tbody>
          </table>
          ${sections
            .map(
              (section) => `
                <div style="margin-top:16px;border-top:1px solid #e5e7eb;padding-top:16px;">
                  <h2 style="margin:0 0 8px;font-size:15px;line-height:1.5;color:#111827;">${escapeHtml(section.heading)}</h2>
                  <p style="margin:0;font-size:14px;line-height:1.75;color:#374151;">${formatMultilineHtml(section.value)}</p>
                </div>`,
            )
            .join("")}
        </div>
      </div>
    </div>
  </body>
</html>`;

  return {
    html,
    text: textParts.join("\n"),
  };
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
  html,
  text,
  tags,
}: LeadNotificationInput): Promise<true> {
  const config = getResendConfig();

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
      html,
      text,
      tags,
    }),
  });

  const rawBody = await response.text();

  if (!response.ok) {
    throw new Error(
      `Resend delivery failed with status ${response.status}: ${rawBody}`,
    );
  }

  try {
    const parsed = rawBody ? (JSON.parse(rawBody) as { id?: string }) : null;
    if (!parsed?.id) {
      console.warn("Resend accepted a public-form notification without returning an id.");
    }
  } catch {
    console.warn("Resend accepted a public-form notification with a non-JSON response body.");
  }

  return true;
}
