import { Suspense } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { PageHero, PageHeroFallback, type Breadcrumb } from "./page-hero";

type Content = { title: string; breadcrumbs?: Breadcrumb[] };

type Props = {
  // Title and trail for the visitor's locale; by default the trail is just
  // the title.
  content: (dictionary: Dictionary, locale: Locale) => Content | Promise<Content>;
};

// Stand-in for pages that aren't built yet: the page hero and a short
// "coming soon" note, so no route looks broken.
export function ComingSoonPage({ content }: Props) {
  return (
    <Suspense fallback={<PageHeroFallback />}>
      <ComingSoon content={content} />
    </Suspense>
  );
}

async function ComingSoon({ content }: Props) {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const { title, breadcrumbs = [{ label: title }] } = await content(dictionary, locale);

  return (
    <>
      <PageHero title={title} breadcrumbs={breadcrumbs} />
      <section className="bg-white py-[72px] sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="rounded-2xl border border-dashed border-line bg-mist px-6 py-12 text-center text-lg font-medium text-muted">
            {dictionary.page.comingSoon}
          </p>
        </div>
      </section>
    </>
  );
}
