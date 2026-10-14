import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { events } from "@/data/events";
import { getLocale } from "@/i18n/get-locale";
import { ComingSoonPage } from "../../_page/coming-soon";

export function generateStaticParams() {
  return events.map(({ slug }) => ({ slug }));
}

const find = (slug: string) => events.find((event) => event.slug === slug);

export async function generateMetadata({ params }: PageProps<"/events/[slug]">): Promise<Metadata> {
  const event = find((await params).slug);
  if (!event) return {};
  const locale = await getLocale();
  return { title: event.title[locale], description: event.excerpt[locale] };
}

export default function EventPage({ params }: PageProps<"/events/[slug]">) {
  return (
    <ComingSoonPage
      content={async (d, locale) => {
        const event = find((await params).slug);
        if (!event) notFound();
        const title = event.title[locale];
        return { title, breadcrumbs: [{ label: d.header.nav.events, href: "/events" }, { label: title }] };
      }}
    />
  );
}
