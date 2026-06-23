import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Returns a server-side Supabase client built from service-role credentials,
 * or `null` when either env var is missing so the app can run in demo mode
 * (leads are just logged to the server console) with zero configuration.
 *
 * Never throws at import time.
 */
export function getSupabase(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
