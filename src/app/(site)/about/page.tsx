import { Suspense } from "react";
import { aboutPage } from "@/data/about-page";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { Eyebrow } from "../_home/eyebrow";
import { Reveal } from "../_home/reveal";
import { PageHero, PageHeroFallback } from "../_page/page-hero";
import { localizedMetadata } from "../_page/page-metadata";
import { ScrollWords } from "../_page/scroll-words";
import { GoalsTasks } from "./_about/goals-tasks";
import { IntroImage } from "./_about/intro-image";
import { Leadership } from "./_about/leadership";

export const generateMetadata = localizedMetadata((_, locale) => ({
  title: aboutPage.hero.title[locale],
  description: aboutPage.hero.subtitle[locale],
}));

export default function AboutPage() {
  return (
    <Suspense fallback={<PageHeroFallback />}>
      <About />
    </Suspense>
  );
}

async function About() {
  const locale = await getLocale();
  const dictionary = getDictionary(locale);
  const { hero, intro } = aboutPage;
  const title = hero.title[locale];

  return (
    <>
      <PageHero title={title} subtitle={hero.subtitle[locale]} breadcrumbs={[{ label: title }]} />

      <section className="overflow-x-clip bg-white py-[72px] sm:py-24 lg:py-[110px]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,55fr)_minmax(0,45fr)] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow className="text-gold-600">{intro.eyebrow[locale]}</Eyebrow>
            </Reveal>
            <ScrollWords
              text={dictionary.about.text}
              className="mt-5 max-w-[640px] text-[21px] leading-[1.7] text-navy-900 lg:text-[26px]"
            />
          </div>

          <Reveal>
            <IntroImage src={intro.image} alt={dictionary.hero.secondaryImageAlt} />
          </Reveal>
        </div>
      </section>

      <GoalsTasks content={aboutPage} locale={locale} />
      <Leadership content={aboutPage} locale={locale} emailLabel={dictionary.topBar.email} />
    </>
  );
}
