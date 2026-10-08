"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactState = { ok: boolean; message: string } | null;

export async function submitLead(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
    return { ok: false, message: "Please enter your name and a valid email." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .insert({ name, email, message: message || null });

  if (error) {
    console.error("submitLead:", error.message);
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  return { ok: true, message: "Thanks! We'll be in touch soon." };
}
