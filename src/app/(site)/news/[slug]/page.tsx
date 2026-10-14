import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { news } from "@/data/news";
import { getLocale } from "@/i18n/get-locale";
import { ComingSoonPage } from "../../_page/coming-soon";

export function generateStaticParams() {
  return news.map(({ slug }) => ({ slug }));
}

const find = (slug: string) => news.find((item) => item.slug === slug);

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const item = find((await params).slug);
  if (!item) return {};
  const locale = await getLocale();
  return { title: item.title[locale], description: item.excerpt[locale] };
}

export default function NewsArticlePage({ params }: PageProps<"/news/[slug]">) {
  return (
    <ComingSoonPage
      content={async (d, locale) => {
        const item = find((await params).slug);
        if (!item) notFound();
        const title = item.title[locale];
        return { title, breadcrumbs: [{ label: d.header.nav.news, href: "/news" }, { label: title }] };
      }}
    />
  );
}
