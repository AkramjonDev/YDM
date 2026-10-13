import Image from "next/image";
import Link from "next/link";
import { heroImages } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { ArrowRightIcon } from "../_header/icons";

const sectionClass =
  "relative isolate overflow-hidden bg-linear-to-br from-navy-900 to-navy-950";

// Reads the locale cookie, so render it inside <Suspense> (Cache Components).
export async function Hero() {
  const locale = await getLocale();
  const { hero } = getDictionary(locale);

  return (
    <section aria-labelledby="hero-title" className={sectionClass}>
      <div aria-hidden className="pattern-girih absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-7xl gap-14 px-4 pb-56 pt-14 sm:px-6 sm:pb-60 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12 lg:pb-56 lg:pt-24 xl:gap-16">
        <div>
          <p className="flex animate-fade-up items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-500 motion-reduce:animate-none sm:text-sm">
            <span aria-hidden className="gold-rule h-0.5 w-10 shrink-0 rounded-full" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 animate-fade-up font-display text-[2rem] font-extrabold leading-[1.12] tracking-tight text-balance text-white [animation-delay:80ms] motion-reduce:animate-none sm:text-5xl lg:text-[3.25rem] xl:text-[4rem] xl:leading-[1.08]"
          >
            {hero.title}
          </h1>

          <p className="mt-6 max-w-[560px] animate-fade-up text-base leading-relaxed text-white/80 [animation-delay:160ms] motion-reduce:animate-none sm:text-lg lg:text-xl">
            {hero.lead}
          </p>

          <div className="mt-10 flex animate-fade-up flex-col gap-3 [animation-delay:240ms] motion-reduce:animate-none sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="#departments"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gold-500 px-7 font-semibold text-navy-950 transition-colors hover:bg-gold-400"
            >
              {hero.primaryCta}
              <ArrowRightIcon className="size-5" />
            </Link>
            <Link
              href="/news"
              className="inline-flex h-14 items-center justify-center rounded-full border border-white/30 px-7 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              {hero.secondaryCta}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[420px] sm:max-w-[480px] animate-fade-up [animation-delay:200ms] motion-reduce:animate-none lg:max-w-none">
          <div className="relative aspect-[20/21]">
            <div className="absolute right-0 top-0 aspect-[4/5] w-[78%] overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/50">
              <Image
                src={heroImages.main}
                alt={hero.mainImageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 400px, 78vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-[6%] left-0 sm:bottom-[14%] aspect-[4/5] w-[46%] overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/60 ring-[6px] ring-navy-900 sm:ring-8">
              <Image
                src={heroImages.secondary}
                alt={hero.secondaryImageAlt}
                fill
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 240px, 46vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 backdrop-blur-md sm:absolute sm:bottom-0 sm:right-0 sm:mt-0">
            {/* Decorative: the badge text carries the meaning. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/yd-mark-white.svg" alt="" width={48} height={32} className="h-8 w-auto" />
            <span aria-hidden className="h-9 w-px bg-white/20" />
            <p className="max-w-[13rem] text-sm font-semibold leading-snug text-white">
              {hero.badge}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Static shell shown until the locale-aware hero streams in.
export function HeroFallback() {
  return (
    <section aria-hidden className={`${sectionClass} min-h-[880px] lg:min-h-[640px]`}>
      <div className="pattern-girih absolute inset-0 -z-10" />
    </section>
  );
}
