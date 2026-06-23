import { Resend } from "resend";
import { BRAND } from "@/lib/brand";

/**
 * Returns a Resend client, or `null` when RESEND_API_KEY is missing so the
 * app can run in demo mode. Never throws at import time.
 */
export function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

/** Shape of a partner lead used for the notification email. */
export type LeadEmailPayload = {
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  message?: string;
};

/**
 * Emails a formatted lead notification when Resend is configured.
 * Returns `true` if an email was dispatched, `false` if Resend is not
 * configured or the send failed. Never throws.
 */
export async function sendLeadEmail(lead: LeadEmailPayload): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const to = process.env.LEAD_NOTIFY_EMAIL || BRAND.contactEmail;

  const lines = [
    `Business name: ${lead.businessName}`,
    `Contact name:  ${lead.contactName}`,
    `Phone:         ${lead.phone}`,
    `Email:         ${lead.email}`,
    `City:          ${lead.city}`,
    `Business type: ${lead.businessType}`,
    `Message:       ${lead.message?.trim() ? lead.message.trim() : "—"}`,
  ];

  const text = `New partner lead for ${BRAND.name}\n\n${lines.join("\n")}\n`;

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; color:#211E17;">
      <h2 style="margin:0 0 12px;">New partner lead for ${BRAND.name}</h2>
      <table style="border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:4px 12px 4px 0;color:#5C8A3A;">Business name</td><td>${escapeHtml(lead.businessName)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5C8A3A;">Contact name</td><td>${escapeHtml(lead.contactName)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5C8A3A;">Phone</td><td>${escapeHtml(lead.phone)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5C8A3A;">Email</td><td>${escapeHtml(lead.email)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5C8A3A;">City</td><td>${escapeHtml(lead.city)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5C8A3A;">Business type</td><td>${escapeHtml(lead.businessType)}</td></tr>
        <tr><td style="padding:4px 12px 4px 0;color:#5C8A3A;vertical-align:top;">Message</td><td>${escapeHtml(lead.message?.trim() || "—")}</td></tr>
      </table>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      replyTo: lead.email,
      subject: `New ${BRAND.name} partner lead — ${lead.businessName}`,
      text,
      html,
    });
    return true;
  } catch (err) {
    console.error("[resend] failed to send lead email:", err);
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
