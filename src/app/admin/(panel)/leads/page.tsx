import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { deleteLead, updateLeadStatus } from "../../actions";

export const metadata: Metadata = { title: "Leads" };

export default async function LeadsPage() {
  const { supabase } = await requireAdmin();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, name, email, message, status, created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <>
      <h1 className="text-2xl font-bold">Leads</h1>
      {error && <p className="mt-4 text-red-600">{error.message}</p>}
      {leads?.length === 0 && <p className="mt-6 opacity-70">No leads yet.</p>}

      {!!leads?.length && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/5 dark:bg-white/5">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
                <th className="p-3">Received</th>
                <th className="p-3">Status</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-black/10 align-top dark:border-white/10">
                  <td className="p-3 font-medium">{lead.name}</td>
                  <td className="p-3">
                    <a href={`mailto:${lead.email}`} className="underline">
                      {lead.email}
                    </a>
                  </td>
                  <td className="max-w-xs p-3 whitespace-pre-wrap opacity-80">
                    {lead.message}
                  </td>
                  <td className="p-3 whitespace-nowrap opacity-70">
                    {new Date(lead.created_at).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <form action={updateLeadStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={lead.id} />
                      <select
                        name="status"
                        defaultValue={lead.status}
                        className="rounded border border-black/15 bg-transparent px-2 py-1 dark:border-white/20"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                      <button type="submit" className="underline">
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="p-3">
                    <form action={deleteLead}>
                      <input type="hidden" name="id" value={lead.id} />
                      <button type="submit" className="text-red-600 hover:underline">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
