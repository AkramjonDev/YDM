import type { Metadata } from "next";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const { supabase } = await requireAdmin();

  const count = (status?: string) => {
    let q = supabase.from("leads").select("*", { count: "exact", head: true });
    if (status) q = q.eq("status", status);
    return q.then((r) => r.count ?? 0);
  };

  const [total, fresh, contacted, closed] = await Promise.all([
    count(),
    count("new"),
    count("contacted"),
    count("closed"),
  ]);

  const stats = [
    { label: "Total leads", value: total },
    { label: "New", value: fresh },
    { label: "Contacted", value: contacted },
    { label: "Closed", value: closed },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-black/10 p-5 dark:border-white/10"
          >
            <p className="text-sm opacity-70">{s.label}</p>
            <p className="mt-1 text-3xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>
      <Link
        href="/admin/leads"
        className="mt-8 inline-block text-sm underline underline-offset-4"
      >
        View all leads →
      </Link>
    </>
  );
}
