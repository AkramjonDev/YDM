import Link from "next/link";
import { Suspense } from "react";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../actions";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/leads", label: "Leads" },
] as const;

async function CurrentUser() {
  const { user, profile } = await requireAdmin();
  return <p className="truncate opacity-70">{profile?.full_name ?? user.email}</p>;
}

// The shell renders statically; every page calls requireAdmin() itself
// before touching data, so nothing protected is rendered without a check.
export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="border-b border-black/10 p-4 md:w-60 md:border-r md:border-b-0 dark:border-white/10">
        <Link href="/admin" className="block text-lg font-semibold">
          YDM Admin
        </Link>
        <nav className="mt-6 flex gap-2 md:flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 border-t border-black/10 pt-4 text-sm dark:border-white/10">
          <Suspense fallback={<p className="opacity-50">…</p>}>
            <CurrentUser />
          </Suspense>
          <form action={logout}>
            <button type="submit" className="mt-2 hover:underline">
              Sign out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
