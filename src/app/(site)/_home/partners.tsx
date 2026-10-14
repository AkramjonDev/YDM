import type { CSSProperties } from "react";
import { partners, type Partner } from "@/data/partners";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { Reveal } from "./reveal";

// Keeps the scroll speed constant however many partners there are.
const SECONDS_PER_PARTNER = 6;
// Each half of the track holds at least this many cards (~3000px), so a short
// list still covers wide screens all the way to the loop point.
const MIN_CARDS_PER_HALF = 12;

// Full-bleed marquee. The track holds two identical halves (the list repeated
// as needed) and slides by -50%; its trailing padding equals the gap, so half
// the track is exactly one half plus one gap and the loop has no jump. Reads
// the locale cookie, so render it inside <Suspense> (Cache Components).
export async function Partners() {
  const locale = await getLocale();
  const { partners: t } = getDictionary(locale);
  if (partners.length === 0) return null;
  const copies = 2 * Math.ceil(MIN_CARDS_PER_HALF / partners.length);

  return (
    <section aria-labelledby="partners-title" className="border-y border-line bg-mist py-14">
      <Reveal>
        <h2
          id="partners-title"
          className="px-4 text-center font-display text-[13px] font-bold uppercase tracking-[0.15em] text-muted motion-safe:transition-opacity motion-safe:duration-600 motion-safe:group-data-[state=idle]/reveal:opacity-0"
        >
          {t.title}
        </h2>

        <div className="mt-7 overflow-x-clip py-1 marquee-mask ease-reveal motion-safe:transition-[opacity,translate] motion-safe:delay-150 motion-safe:duration-700 motion-reduce:[mask-image:none] motion-safe:group-data-[state=idle]/reveal:translate-y-5 motion-safe:group-data-[state=idle]/reveal:opacity-0">
          <div
            style={{ "--marquee-duration": `${(partners.length * copies * SECONDS_PER_PARTNER) / 2}s` } as CSSProperties}
            className="flex w-max gap-5 pr-5 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-safe:animate-marquee motion-reduce:w-auto motion-reduce:justify-center motion-reduce:pl-4 motion-reduce:pr-4"
          >
            {/* Only the first copy is real; the repeats are hidden from
                assistive tech and the tab order, and dropped without motion. */}
            {Array.from({ length: copies }, (_, i) => (
              <PartnerList key={i} locale={locale} duplicate={i > 0} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PartnerList({ locale, duplicate = false }: { locale: Locale; duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={`flex shrink-0 gap-5 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center ${
        duplicate ? "motion-reduce:hidden" : ""
      }`}
    >
      {partners.map((partner) => (
        <li key={partner.id}>
          <PartnerCard partner={partner} locale={locale} focusable={!duplicate} />
        </li>
      ))}
    </ul>
  );
}

function PartnerCard({
  partner,
  locale,
  focusable,
}: {
  partner: Partner;
  locale: Locale;
  focusable: boolean;
}) {
  const name = partner.name[locale];
  const className =
    "group/partner flex h-20 min-w-56 items-center gap-3 rounded-2xl border border-line bg-white px-6 transition-[translate,border-color] duration-300 hover:border-brand-100 motion-safe:hover:-translate-y-[3px]";

  const content = (
    <>
      {partner.logo ? (
        // Remote or local logos of any size; next/image isn't worth it here.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={partner.logo}
          alt=""
          className="max-h-9 w-auto opacity-70 grayscale transition-[opacity,filter] duration-300 group-hover/partner:opacity-100 group-hover/partner:grayscale-0"
        />
      ) : (
        <span
          aria-hidden
          className="grid size-9 shrink-0 place-items-center rounded-full bg-mist font-semibold text-muted"
        >
          {name.charAt(0)}
        </span>
      )}
      <span className="whitespace-nowrap text-[15px] font-semibold text-muted transition-colors duration-300 group-hover/partner:text-navy-900">
        {name}
      </span>
    </>
  );

  return partner.url ? (
    <a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={focusable ? undefined : -1}
      className={className}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
