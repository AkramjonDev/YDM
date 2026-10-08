"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error: string } | null;

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  // Only allow redirects within the admin area.
  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

const STATUSES = ["new", "contacted", "closed"] as const;

export async function updateLeadStatus(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!STATUSES.includes(status as (typeof STATUSES)[number])) return;

  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin", "layout");
}

export async function deleteLead(formData: FormData) {
  const { supabase } = await requireAdmin();
  await supabase.from("leads").delete().eq("id", Number(formData.get("id")));
  revalidatePath("/admin", "layout");
}
