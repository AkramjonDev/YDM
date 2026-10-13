// Supabase is optional until the project is connected. Without these env vars
// the public site still runs; the admin area and lead form are disabled.
export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
);
