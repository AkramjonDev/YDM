import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { departments, type Department } from "@/data/departments";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { plural } from "@/i18n/plural";
import { ArrowRightIcon } from "../_header/icons";
import { departmentHref } from "../_header/nav";
import { departmentIcons } from "./department-icons";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";
import { RevealGrid } from "./reveal-grid";
import { SplitHeading } from "./split-heading";

// Target of the hero's "Explore our departments" button. Reads the locale
// cookie, so render it inside <Suspense> (Cache Components).
export async function Departments() {
  const locale = await getLocale();
  const { departments: t } = getDictionary(locale);

  return (
    <section
      id="departments"
      aria-labelledby="departments-title"
      className="relative isolate scroll-mt-18 bg-mist py-[72px] sm:py-24 lg:scroll-mt-25 lg:py-[110px]"
    >
      <div aria-hidden className="pattern-girih-dark absolute inset-0 -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-12">
          <div>
            <Eyebrow className="text-gold-600">{t.eyebrow}</Eyebrow>
            <SplitHeading
              id="departments-title"
              text={plural(locale, departments.length, t.title)}
              className="mt-6 font-display text-[2rem] font-extrabold leading-[1.2] tracking-tight text-navy-900 sm:text-4xl lg:text-[44px]"
            />
            <p className="mt-5 max-w-[560px] text-[17px] leading-[1.7] text-muted ease-reveal motion-safe:transition-[opacity,translate] motion-safe:delay-300 motion-safe:duration-600 sm:text-lg motion-safe:group-data-[state=idle]/reveal:translate-y-4 motion-safe:group-data-[state=idle]/reveal:opacity-0">
              {t.subtitle}
            </p>
          </div>

          {/* Reveal on the wrapper so the link's hover transitions stay undelayed. */}
          <div className="shrink-0 ease-reveal motion-safe:transition-[opacity,translate] motion-safe:delay-450 motion-safe:duration-600 motion-safe:group-data-[state=idle]/reveal:translate-y-4 motion-safe:group-data-[state=idle]/reveal:opacity-0">
            <Link
              href="/departments"
              className="group/more inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-6 font-semibold text-navy-900 transition-colors duration-300 hover:border-navy-900"
            >
              {t.all}
              <ArrowRightIcon className="size-5 transition-[translate] duration-300 motion-safe:group-hover/more:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <RevealGrid className="mt-12 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {departments.map((department, i) => (
            <li
              key={department.slug}
              data-state="idle"
              className="group/reveal ease-reveal [transition-delay:calc(var(--col,0)*60ms)] motion-safe:transition-[opacity,translate,scale] motion-safe:duration-700 motion-safe:data-[state=idle]:translate-y-8 motion-safe:data-[state=idle]:scale-97 motion-safe:data-[state=idle]:opacity-0"
            >
              <DepartmentCard
                department={department}
                number={String(i + 1).padStart(2, "0")}
                locale={locale}
                linkLabel={t.cardLink}
              />
            </li>
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}

function DepartmentCard({
  department: { slug, color, icon, name, short },
  number,
  locale,
  linkLabel,
}: {
  department: Department;
  number: string;
  locale: Locale;
  linkLabel: string;
}) {
  const Icon = departmentIcons[icon];
  const titleId = `department-${slug}-title`;
  const shortId = `department-${slug}-short`;

  return (
    // `--dept` drives every hover/focus colour. `card-on:` (globals.css)
    // matches descendants while the card is hovered or keyboard-focused.
    <Link
      href={departmentHref(slug)}
      aria-labelledby={titleId}
      aria-describedby={shortId}
      data-spotlight
      style={{ "--dept": color } as CSSProperties}
      className="group/card-link relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-[22px] transition-[translate,box-shadow,border-color] duration-300 hover:border-(--dept)/35 hover:shadow-[0_22px_44px_-22px_color-mix(in_oklab,var(--dept)_55%,transparent)] focus-visible:border-(--dept)/35 focus-visible:shadow-[0_22px_44px_-22px_color-mix(in_oklab,var(--dept)_55%,transparent)] motion-safe:hover:-translate-y-1.5 motion-safe:focus-visible:-translate-y-1.5"
    >
      {/* Cursor spotlight; position comes from <RevealGrid>. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(260px_circle_at_var(--spot-x,50%)_var(--spot-y,0%),color-mix(in_oklab,var(--dept)_8%,transparent),transparent_70%)] opacity-0 transition-opacity duration-300 motion-safe:group-hover/card-link:opacity-100"
      />
      {/* Top accent bar: grows in; with reduced motion it only fades. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-(--dept) transition-[scale,opacity] duration-300 motion-safe:scale-x-0 motion-safe:card-on:scale-x-100 motion-reduce:opacity-0 motion-reduce:card-on:opacity-100"
      />

      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden
          className="grid size-12 shrink-0 place-items-center rounded-xl bg-(--dept)/10 text-(--dept) transition-colors duration-300 card-on:bg-(--dept) card-on:text-white"
        >
          <Icon
            strokeWidth={1.75}
            className="size-[22px] transition-[scale,rotate] duration-300 motion-safe:card-on:scale-108 motion-safe:card-on:-rotate-6"
          />
        </span>
        {/* Slides in just after the card lands; the inner span owns the
            hover colour so that transition isn't delayed. */}
        <span
          aria-hidden
          className="ease-reveal [transition-delay:calc(var(--col,0)*60ms+450ms)] motion-safe:transition-[opacity,translate] motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:translate-x-2 motion-safe:group-data-[state=idle]/reveal:opacity-0"
        >
          <span className="block font-display text-[28px] font-extrabold leading-none tabular-nums text-line transition-colors duration-300 card-on:text-(--dept)/25">
            {number}
          </span>
        </span>
      </div>

      <h3
        id={titleId}
        className="mt-5 font-display text-[15px] font-bold leading-[1.35] text-navy-900"
      >
        {name[locale]}
      </h3>
      <p id={shortId} className="mt-2 line-clamp-3 text-[13.5px] leading-[1.6] text-muted">
        {short[locale]}
      </p>

      <span
        aria-hidden
        className="mt-auto inline-flex items-center gap-1 pt-5 text-[13px] font-semibold text-(--dept)"
      >
        {linkLabel}
        <ArrowUpRight className="size-3.5 transition-[translate] duration-300 motion-safe:card-on:translate-x-[3px] motion-safe:card-on:-translate-y-[3px]" />
      </span>
    </Link>
  );
}
