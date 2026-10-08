"use client";

import { useActionState } from "react";
import { submitLead, type ContactState } from "./actions";

const inputClass =
  "w-full rounded-lg border border-black/15 bg-transparent px-4 py-3 outline-none focus:border-foreground dark:border-white/20";

export function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitLead,
    null,
  );

  if (state?.ok) {
    return <p className="mt-10 text-center text-lg">{state.message}</p>;
  }

  return (
    <form action={formAction} className="mt-10 space-y-4">
      <input name="name" placeholder="Name" required className={inputClass} />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className={inputClass}
      />
      <textarea
        name="message"
        placeholder="Message (optional)"
        rows={4}
        className={inputClass}
      />
      {state && !state.ok && (
        <p className="text-sm text-red-600">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-foreground py-3 font-medium text-background hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
