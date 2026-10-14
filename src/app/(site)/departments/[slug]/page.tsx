import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { departments } from "@/data/departments";
import { getLocale } from "@/i18n/get-locale";
import { ComingSoonPage } from "../../_page/coming-soon";

export function generateStaticParams() {
  return departments.map(({ slug }) => ({ slug }));
}

const find = (slug: string) => departments.find((department) => department.slug === slug);

export async function generateMetadata({
  params,
}: PageProps<"/departments/[slug]">): Promise<Metadata> {
  const department = find((await params).slug);
  if (!department) return {};
  const locale = await getLocale();
  return { title: department.name[locale], description: department.short[locale] };
}

export default function DepartmentPage({ params }: PageProps<"/departments/[slug]">) {
  return (
    <ComingSoonPage
      content={async (d, locale) => {
        const department = find((await params).slug);
        if (!department) notFound();
        const title = department.name[locale];
        return {
          title,
          breadcrumbs: [{ label: d.header.nav.departments, href: "/departments" }, { label: title }],
        };
      }}
    />
  );
}
