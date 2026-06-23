import { z } from "zod";

/** Business types a partner can self-identify as. */
export const BUSINESS_TYPES = [
  "Hotel",
  "Restaurant",
  "Cloud Kitchen",
  "Caterer",
  "Tiffin Service",
  "Other",
] as const;

/**
 * Shared validation schema for partner leads.
 * Lives in lib (not the API route) so the client form can import the type/enum
 * without pulling server-only modules (Supabase/Resend) into the client bundle.
 */
export const partnerLeadSchema = z.object({
  businessName: z.string().min(2, "Please enter your business name."),
  contactName: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  city: z.string().min(2, "Please enter your city."),
  businessType: z.enum(BUSINESS_TYPES, {
    message: "Please choose a business type.",
  }),
  message: z.string().max(1000, "Message is too long.").optional(),
});

export type PartnerLead = z.infer<typeof partnerLeadSchema>;
