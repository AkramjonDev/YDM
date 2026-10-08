import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

// Server-side guard for admin pages. The proxy only checks that a user is
// signed in; this also checks the `admin` role stored in public.profiles.
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/admin/login?error=forbidden");

  return { supabase, user, profile };
}
