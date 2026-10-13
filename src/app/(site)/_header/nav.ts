import type { Dictionary } from "@/i18n/dictionaries";

export type HeaderLabels = Dictionary["header"];

export type DepartmentLink = { slug: string; name: string; color: string };

export type NavEntry =
  | { kind: "link"; href: string; label: string }
  | { kind: "departments"; label: string };

export const CTA_HREF = "/contact";

export function getNavEntries(labels: HeaderLabels): NavEntry[] {
  const { nav } = labels;
  return [
    { kind: "link", href: "/about", label: nav.about },
    { kind: "departments", label: nav.departments },
    { kind: "link", href: departmentHref("yumshoq-kuch"), label: nav.softPower },
    { kind: "link", href: "/news", label: nav.news },
    { kind: "link", href: "/events", label: nav.events },
    { kind: "link", href: "/media", label: nav.media },
    { kind: "link", href: "/partners", label: nav.partners },
  ];
}

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export const departmentHref = (slug: string) => `/departments/${slug}`;
