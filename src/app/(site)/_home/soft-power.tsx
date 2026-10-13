import { softPower } from "@/data/soft-power";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { plural } from "@/i18n/plural";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";
import {
  ActivePhotoProvider,
  DirectionChip,
  SoftPowerCta,
  SoftPowerGallery,
} from "./soft-power-client";
import { SplitHeading } from "./split-heading";

const PAGE_HREF = "/soft-power";

// Title sentences take 100ms + 2 × 150ms to start, then ~0.7s to land; the
// rest follows in order.
const TEXT_DELAY_MS = 450;
const CHIPS_DELAY_MS = 600;
const CHIP_STAGGER_MS = 40;

// Reads the locale cookie, so render it inside <Suspense> (Cache Components).
export async function SoftPower() {
  const locale = await getLocale();
  const { softPower: t } = getDictionary(locale);
  const { directions, photos } = softPower;
  const ctaDelay = CHIPS_DELAY_MS + directions.length * CHIP_STAGGER_MS + 150;

  return (
    <section
      id="soft-power"
      aria-labelledby="soft-power-title"
      className="relative isolate scroll-mt-18 overflow-hidden bg-navy-950 py-[72px] sm:py-24 lg:scroll-mt-25 lg:py-[110px]"
    >
      <div aria-hidden className="pattern-girih-line absolute inset-0 -z-10 opacity-5" />

      <ActivePhotoProvider>
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,45fr)_minmax(0,50fr)] lg:items-center lg:justify-between lg:gap-16">
          <Reveal>
            <Eyebrow className="text-gold-500">{t.eyebrow}</Eyebrow>
            <SplitHeading
              id="soft-power-title"
              text={t.title}
              stepMs={150}
              className="mt-6 font-display text-[34px] font-extrabold leading-[1.15] tracking-tight text-white lg:text-[44px]"
            />
            <p
              style={{ transitionDelay: `${TEXT_DELAY_MS}ms` }}
              className="mt-6 max-w-[480px] text-[17px] leading-[1.7] text-white/70 ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-600 sm:text-lg motion-safe:group-data-[state=idle]/reveal:translate-y-4 motion-safe:group-data-[state=idle]/reveal:opacity-0"
            >
              {t.text}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {directions.map((direction, i) => (
                <li
                  key={direction.slug}
                  style={{ transitionDelay: `${CHIPS_DELAY_MS + i * CHIP_STAGGER_MS}ms` }}
                  className="ease-spring motion-safe:transition-[opacity,translate,scale] motion-safe:duration-700 motion-safe:group-data-[state=idle]/reveal:translate-y-3 motion-safe:group-data-[state=idle]/reveal:scale-90 motion-safe:group-data-[state=idle]/reveal:opacity-0"
                >
                  <DirectionChip
                    href={`${PAGE_HREF}#${direction.slug}`}
                    icon={direction.icon}
                    label={direction.label[locale]}
                    photo={direction.photo}
                  />
                </li>
              ))}
            </ul>

            <div
              style={{ transitionDelay: `${ctaDelay}ms` }}
              className="mt-9 ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-600 motion-safe:group-data-[state=idle]/reveal:translate-y-4 motion-safe:group-data-[state=idle]/reveal:opacity-0"
            >
              <SoftPowerCta href={PAGE_HREF} label={plural(locale, directions.length, t.cta)} />
            </div>
          </Reveal>

          <Reveal>
            <SoftPowerGallery
              photos={photos.map((photo) => ({ ...photo, alt: t.photoAlt[photo.key] }))}
            />
          </Reveal>
        </div>
      </ActivePhotoProvider>
    </section>
  );
}
