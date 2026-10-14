import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { CalendarDays, Eye } from "lucide-react";
import { getDepartment, type Department } from "@/data/departments";
import { news, type NewsItem } from "@/data/news";
import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { formatDate, formatNumber } from "@/i18n/format";
import { getLocale } from "@/i18n/get-locale";
import { DepartmentBadge } from "./department-badge";
import { FadeImage } from "./fade-image";
import { NewsCover } from "./news-cover";
import { Reveal } from "./reveal";
import { RevealGrid } from "./reveal-grid";
import { SectionHeader } from "./section-header";

type Labels = Dictionary["news"];

// The featured card's text follows its image wipe in, 80ms apart.
const TEXT_DELAY_MS = 450;
const TEXT_STAGGER_MS = 80;

const newsHref = (slug: string) => `/news/${slug}`;

const cardClass =
  "group/card-link overflow-hidden rounded-2xl border border-line bg-white transition-[translate,box-shadow] duration-300 hover:shadow-[0_24px_48px_-24px_rgb(2_28_86/0.3)] focus-visible:shadow-[0_24px_48px_-24px_rgb(2_28_86/0.3)] motion-safe:hover:-translate-y-1.5 motion-safe:focus-visible:-translate-y-1.5";

// Newest item as a wide featured card, the next three in a grid. Reads the
// locale cookie, so render it inside <Suspense> (Cache Components).
export async function News() {
  const locale = await getLocale();
  const { news: t } = getDictionary(locale);
  const [featured, ...rest] = news;
  if (!featured) return null;

  return (
    <section
      id="news"
      aria-labelledby="news-title"
      className="scroll-mt-18 bg-white py-[72px] sm:py-24 lg:scroll-mt-25 lg:py-[110px]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={t.title}
          titleId="news-title"
          titleSize="lg:text-[40px]"
          action={{ href: "/news", label: t.all }}
        />

        <FeaturedCard item={featured} locale={locale} labels={t} />

        <RevealGrid className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.slice(0, 3).map((item, i) => (
            <li
              key={item.id}
              data-state="idle"
              // Two columns between 768 and 1023px: the third card waits for lg.
              className={`group/reveal ease-reveal [transition-delay:calc(var(--col,0)*100ms)] motion-safe:transition-[opacity,translate,scale] motion-safe:duration-700 motion-safe:data-[state=idle]:translate-y-8 motion-safe:data-[state=idle]:scale-97 motion-safe:data-[state=idle]:opacity-0 ${
                i === 2 ? "md:max-lg:hidden" : ""
              }`}
            >
              <NewsCard item={item} locale={locale} labels={t} />
            </li>
          ))}
        </RevealGrid>
      </div>
    </section>
  );
}

function FeaturedCard({ item, locale, labels }: { item: NewsItem; locale: Locale; labels: Labels }) {
  const department = getDepartment(item.department_id);
  const ids = textIds(item);

  return (
    <Reveal className="mt-10 ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:data-[state=idle]:translate-y-8 motion-safe:data-[state=idle]:opacity-0">
      <Link
        href={newsHref(item.slug)}
        aria-labelledby={ids.title}
        aria-describedby={ids.excerpt}
        style={{ "--dept": department.color } as CSSProperties}
        className={`grid lg:min-h-[320px] lg:grid-cols-2 ${cardClass}`}
      >
        {/* Wipes in from the left while the picture settles from 1.15× to 1×. */}
        <div className="relative aspect-video overflow-hidden bg-mist ease-reveal [clip-path:inset(0)] motion-safe:transition-[clip-path] motion-safe:duration-900 lg:aspect-auto motion-safe:group-data-[state=idle]/reveal:[clip-path:inset(0_100%_0_0)]">
          <div className="absolute inset-0 ease-reveal motion-safe:transition-[scale] motion-safe:duration-900 motion-safe:group-data-[state=idle]/reveal:scale-115">
            <Media
              item={item}
              department={department}
              sizes="(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 100vw"
              pan
            />
          </div>
        </div>

        <div className="flex flex-col p-7 sm:p-10">
          <Stagger step={0}>
            <DepartmentBadge department={department} locale={locale} />
          </Stagger>
          <Stagger step={1} className="mt-4">
            <h3
              id={ids.title}
              className="font-display text-2xl font-extrabold leading-[1.25] text-navy-900 transition-colors duration-300 card-on:text-brand-600 sm:text-[30px]"
            >
              {item.title[locale]}
            </h3>
          </Stagger>
          <Stagger step={2} className="mt-4">
            <p id={ids.excerpt} className="text-[15px] leading-[1.7] text-muted">
              {item.excerpt[locale]}
            </p>
          </Stagger>
          <Stagger step={3} className="mt-auto">
            <Meta item={item} locale={locale} labels={labels} />
          </Stagger>
        </div>
      </Link>
    </Reveal>
  );
}

function NewsCard({ item, locale, labels }: { item: NewsItem; locale: Locale; labels: Labels }) {
  const department = getDepartment(item.department_id);
  const ids = textIds(item);

  return (
    <Link
      href={newsHref(item.slug)}
      aria-labelledby={ids.title}
      aria-describedby={ids.excerpt}
      style={{ "--dept": department.color } as CSSProperties}
      className={`flex h-full flex-col ${cardClass}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-mist">
        <Media
          item={item}
          department={department}
          sizes="(min-width: 1280px) 400px, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <DepartmentBadge department={department} locale={locale} />
        <h3
          id={ids.title}
          className="mt-3 line-clamp-3 font-display text-[17px] font-bold leading-[1.35] text-navy-900 transition-colors duration-300 card-on:text-brand-600"
        >
          {item.title[locale]}
        </h3>
        <p id={ids.excerpt} className="mt-2 line-clamp-2 text-[13.5px] leading-[1.6] text-muted">
          {item.excerpt[locale]}
        </p>
        <Meta item={item} locale={locale} labels={labels} />
      </div>
    </Link>
  );
}

// Photo, or the generated cover when there is none. Zooms on card hover/focus.
function Media({
  item,
  department,
  sizes,
  pan = false,
}: {
  item: NewsItem;
  department: Department;
  sizes: string;
  pan?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 transition-[scale,translate] duration-600 ease-out motion-safe:card-on:scale-106 ${
        pan ? "motion-safe:card-on:-translate-x-[2%]" : ""
      }`}
    >
      {item.image ? (
        <FadeImage src={item.image} alt="" fill loading="lazy" sizes={sizes} className="object-cover" />
      ) : (
        <NewsCover department={department} />
      )}
    </div>
  );
}

function Meta({ item, locale, labels }: { item: NewsItem; locale: Locale; labels: Labels }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-4 pt-5 text-xs text-muted">
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays aria-hidden className="size-3.5" />
        <time dateTime={item.date}>{formatDate(locale, item.date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Eye aria-hidden className="size-3.5" />
        {formatNumber(locale, item.views)}
        <span className="sr-only"> {labels.viewsLabel}</span>
      </span>
    </div>
  );
}

// Featured-card text fading up in sequence. A wrapper, so the delay never
// slows the children's own hover transitions.
function Stagger({
  step,
  className = "",
  children,
}: {
  step: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{ transitionDelay: `${TEXT_DELAY_MS + step * TEXT_STAGGER_MS}ms` }}
      className={`ease-reveal motion-safe:transition-[opacity,translate] motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:translate-y-3 motion-safe:group-data-[state=idle]/reveal:opacity-0 ${className}`}
    >
      {children}
    </div>
  );
}

function textIds(item: NewsItem) {
  return { title: `news-${item.slug}-title`, excerpt: `news-${item.slug}-excerpt` };
}
