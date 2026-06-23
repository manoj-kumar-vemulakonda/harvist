import type { PartnerLead } from "@/lib/leads";

/**
 * Returns the Google Apps Script Web App URL that receives partner leads, or
 * `null` when it is not configured so the app can run in demo mode (leads are
 * just logged to the server console). Never throws at import time.
 *
 * The Apps Script behind this URL appends the lead to a Google Sheet AND sends
 * both the applicant confirmation and the owner notification emails via Gmail —
 * no Resend, no Supabase, and no custom domain required.
 */
export function getSheetWebhookUrl(): string | null {
  return process.env.GOOGLE_SHEET_WEBHOOK_URL || null;
}

/**
 * POSTs a partner lead to the Google Apps Script webhook (which writes the row
 * and sends the emails). Returns `true` if the webhook accepted the lead,
 * `false` when it is not configured or the request failed. Never throws.
 */
export async function sendToSheet(lead: PartnerLead): Promise<boolean> {
  const url = getSheetWebhookUrl();
  if (!url) return false;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: process.env.GOOGLE_SHEET_WEBHOOK_TOKEN ?? "",
        lead,
      }),
      // Apps Script web apps respond after a 302 redirect to the script output.
      redirect: "follow",
    });

    if (!res.ok) {
      console.error("[sheet] webhook returned non-OK status:", res.status);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[sheet] failed to post lead to webhook:", err);
    return false;
  }
}
