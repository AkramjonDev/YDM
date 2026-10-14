import { Suspense } from "react";
import { departments } from "@/data/departments";
import { news } from "@/data/news";
import { heroImages } from "@/data/site";
import { softPower, type SoftPowerPhoto } from "@/data/soft-power";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { plural } from "@/i18n/plural";
import { departmentHref } from "../_header/nav";
import { NewsCard, newsGridItemClass } from "../_home/news";
import { Reveal } from "../_home/reveal";
import { RevealGrid } from "../_home/reveal-grid";
import { SplitHeading } from "../_home/split-heading";
import { PageHero, PageHeroFallback } from "../_page/page-hero";
import { localizedMetadata } from "../_page/page-metadata";
import { CtaBand } from "./_soft-power/cta-band";
import { Directions } from "./_soft-power/directions";
import { HeroGallery } from "./_soft-power/hero-gallery";

const { page, directions } = softPower;

export const generateMetadata = localizedMetadata((_, locale) => ({
  title: page.title[locale],
  description: plural(locale, directions.length, { other: page.text[locale] }),
}));

export default function SoftPowerPage() {
  return (
    <Suspense fallback={<PageHeroFallback />}>
      <SoftPower />
    </Suspense>
  );
}

async function SoftPower() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const department = departments.find((d) => d.slug === page.departmentSlug);
  // Newest first already; only this department's items.
  const related = department ? news.filter((item) => item.department_id === department.id).slice(0, 3) : [];
  const photo = (key: SoftPowerPhoto) => ({
    src: softPower.photos.find((p) => p.key === key)?.src ?? "",
    alt: dictionary.softPower.photoAlt[key],
  });

  return (
    <>
      <PageHero
        variant="split"
        title={page.title[locale]}
        breadcrumbs={[{ label: dictionary.header.nav.softPower }]}
        eyebrow={page.eyebrow[locale]}
        tagline={dictionary.softPower.title.join(" ")}
        text={plural(locale, directions.length, { other: page.text[locale] })}
        media={
          <HeroGallery
            photos={[
              photo("soft-registan"),
              photo("soft-dance"),
              photo("soft-lake"),
              { src: heroImages.secondary, alt: dictionary.hero.secondaryImageAlt },
            ]}
          />
        }
      />

      <Directions title={dictionary.softPower.title} directions={directions} locale={locale} />

      {department && (
        <CtaBand
          text={dictionary.hero.badge}
          button={{ href: departmentHref(department.slug), label: department.name[locale] }}
        />
      )}

      {related.length > 0 && (
        <section className="bg-white py-[72px] sm:py-24 lg:py-[100px]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <Reveal>
              <SplitHeading
                text={page.relatedTitle[locale]}
                className="font-display text-[2rem] font-extrabold leading-[1.2] tracking-tight text-navy-900 sm:text-4xl lg:text-[44px]"
              />
            </Reveal>
            <RevealGrid className="mt-10 grid gap-5 md:grid-cols-2 lg:mt-12 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id} data-state="idle" className={newsGridItemClass}>
                  <NewsCard item={item} locale={locale} labels={dictionary.news} />
                </li>
              ))}
            </RevealGrid>
          </div>
        </section>
      )}
    </>
  );
}
