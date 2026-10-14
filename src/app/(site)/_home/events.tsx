import type { CSSProperties } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { CalendarDays, MapPin } from "lucide-react";
import { getDepartment } from "@/data/departments";
import { upcomingEvents, type EventItem } from "@/data/events";
import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { daysUntil, eventDay, formatDateTime } from "@/i18n/format";
import { getLocale } from "@/i18n/get-locale";
import { plural } from "@/i18n/plural";
import { DepartmentBadge } from "./department-badge";
import { RevealGrid } from "./reveal-grid";
import { SectionHeader } from "./section-header";

type Labels = Dictionary["events"];

// Events this close get a "soon" chip.
const SOON_DAYS = 7;
// The date block flips in as its card lands; the digit and month follow.
const FLIP_DELAY_MS = 450;

const eventHref = (slug: string) => `/events/${slug}`;

// Next three events from now. Reads the locale cookie and the current time, so
// render it inside <Suspense> (Cache Components).
export async function Events() {
  const locale = await getLocale();
  await connection();
  const now = new Date();
  const { events: t } = getDictionary(locale);
  const items = upcomingEvents(now);

  return (
    <section
      id="events"
      aria-labelledby="events-title"
      className="scroll-mt-18 bg-white py-[72px] sm:py-24 lg:scroll-mt-25 lg:py-[110px]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow={t.eyebrow}
          title={t.title}
          titleId="events-title"
          titleSize="lg:text-[40px]"
          action={{ href: "/events", label: t.all }}
        />

        {items.length === 0 ? (
          <p className="mt-12 rounded-2xl border border-dashed border-line bg-mist px-6 py-10 text-center text-muted">
            {t.empty}
          </p>
        ) : (
          <RevealGrid className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((event) => (
              <li
                key={event.id}
                data-state="idle"
                className="group/reveal ease-reveal [transition-delay:calc(var(--col,0)*100ms)] motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:data-[state=idle]:translate-y-7 motion-safe:data-[state=idle]:opacity-0"
              >
                <EventCard
                  event={event}
                  locale={locale}
                  labels={t}
                  daysLeft={daysUntil(event.start, now)}
                />
              </li>
            ))}
          </RevealGrid>
        )}
      </div>
    </section>
  );
}

function EventCard({
  event,
  locale,
  labels,
  daysLeft,
}: {
  event: EventItem;
  locale: Locale;
  labels: Labels;
  daysLeft: number;
}) {
  const department = getDepartment(event.department_id);
  const { day, month } = eventDay(locale, event.start);
  const titleId = `event-${event.slug}-title`;
  const excerptId = `event-${event.slug}-excerpt`;
  const delay = (ms: number) => ({
    transitionDelay: `calc(var(--col, 0) * 100ms + ${FLIP_DELAY_MS + ms}ms)`,
  });

  return (
    <Link
      href={eventHref(event.slug)}
      aria-labelledby={titleId}
      aria-describedby={excerptId}
      style={{ "--dept": department.color } as CSSProperties}
      className="group/card-link grid h-full grid-cols-[68px_minmax(0,1fr)] gap-5 rounded-2xl border border-line bg-white p-6 transition-[translate,box-shadow,border-color] duration-300 min-[400px]:grid-cols-[80px_minmax(0,1fr)] hover:border-brand-100 hover:shadow-[0_24px_48px_-24px_rgb(2_28_86/0.3)] focus-visible:border-brand-100 focus-visible:shadow-[0_24px_48px_-24px_rgb(2_28_86/0.3)] motion-safe:hover:-translate-y-1.5 motion-safe:focus-visible:-translate-y-1.5"
    >
      {/* Calendar leaf. Decorative: the full date is in the meta below. */}
      <div aria-hidden className="perspective-[600px]">
        <div
          style={delay(0)}
          className="relative flex h-full origin-top flex-col items-center justify-center overflow-hidden rounded-xl bg-navy-900 py-4 ease-spring motion-safe:transition-transform motion-safe:duration-800 motion-safe:group-data-[state=idle]/reveal:-rotate-x-90"
        >
          <span className="absolute inset-x-0 top-0 h-0 bg-gold-500 transition-[height] duration-300 card-on:h-1" />
          <span
            style={delay(300)}
            className="ease-reveal motion-safe:transition-[translate] motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:-translate-y-3"
          >
            <span className="block font-display text-[32px] font-extrabold leading-none tabular-nums text-white transition-[scale] duration-300 motion-safe:card-on:scale-108">
              {day}
            </span>
          </span>
          <span
            style={delay(400)}
            className="mt-2 text-[11px] font-bold tracking-[0.15em] text-gold-400 motion-safe:transition-opacity motion-safe:duration-500 motion-safe:group-data-[state=idle]/reveal:opacity-0"
          >
            {month}
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        <DepartmentBadge department={department} locale={locale} />
        {daysLeft <= SOON_DAYS && (
          <span className="mt-3 inline-flex items-center gap-2 self-start rounded-full bg-gold-100 px-2.5 py-1 text-[11px] font-semibold text-gold-600">
            <span aria-hidden className="relative size-1.5">
              <span className="absolute inset-0 rounded-full bg-gold-600 motion-safe:animate-pulse-dot" />
              <span className="absolute inset-0 rounded-full bg-gold-600" />
            </span>
            {daysLeft <= 0 ? labels.today : plural(locale, daysLeft, labels.daysLeft)}
          </span>
        )}
        <h3
          id={titleId}
          className="mt-3 line-clamp-2 font-display text-[19px] font-bold leading-[1.3] text-navy-900 transition-colors duration-300 card-on:text-brand-600"
        >
          {event.title[locale]}
        </h3>
        <p id={excerptId} className="mt-2 line-clamp-2 text-sm leading-[1.6] text-muted">
          {event.excerpt[locale]}
        </p>

        <div className="mt-auto space-y-1.5 pt-4 text-[12.5px] text-muted">
          <p className="flex items-center gap-2">
            <CalendarDays aria-hidden className="size-3.5 shrink-0 text-gold-500" />
            <time dateTime={event.start}>{formatDateTime(locale, event.start)}</time>
          </p>
          <p className="flex items-center gap-2">
            <MapPin aria-hidden className="size-3.5 shrink-0 text-gold-500" />
            <span className="truncate">{event.location[locale]}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
