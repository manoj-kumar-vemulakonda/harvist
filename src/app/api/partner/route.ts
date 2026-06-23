import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/supabase";
import { getSheetWebhookUrl, sendToSheet } from "@/lib/sheet";
import { partnerLeadSchema } from "@/lib/leads";

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { ok: false, errors: { _form: ["Invalid request body."] } },
        { status: 400 },
      );
    }

    const parsed = partnerLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, errors: z.flattenError(parsed.error).fieldErrors },
        { status: 400 },
      );
    }

    const lead = parsed.data;

    // Primary path: the Google Apps Script webhook appends the lead to the
    // Google Sheet AND sends both the applicant confirmation and the owner
    // notification emails via Gmail.
    await sendToSheet(lead);

    // Optional durable backup: persist to Supabase when configured.
    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from("partner_leads").insert({
        business_name: lead.businessName,
        contact_name: lead.contactName,
        phone: lead.phone,
        email: lead.email,
        city: lead.city,
        business_type: lead.businessType,
        message: lead.message ?? null,
      });
      if (error) {
        console.error("[partner] supabase insert failed:", error);
      }
    }

    // Always log the lead so demo mode is fully functional with zero config.
    console.log("[partner] new lead:", {
      ...lead,
      receivedAt: new Date().toISOString(),
    });

    // Demo mode = no Sheet webhook configured (nothing is stored or emailed).
    const demo = !getSheetWebhookUrl();
    return NextResponse.json({ ok: true, demo });
  } catch (err) {
    console.error("[partner] unexpected error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
