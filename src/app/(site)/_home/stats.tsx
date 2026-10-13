import { stats } from "@/data/stats";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { StatsCard } from "./stats-card";

// Overlaps the hero's bottom edge via negative margin; the hero's bottom
// padding reserves the same space. Reads the locale cookie, so render it
// inside <Suspense> (Cache Components).
export async function Stats() {
  const locale = await getLocale();
  const { stats: labels } = getDictionary(locale);

  return (
    <section aria-labelledby="stats-title" className="relative z-10 pb-20 lg:pb-28">
      <h2 id="stats-title" className="sr-only">
        {labels.title}
      </h2>
      <div className="mx-auto -mt-36 max-w-7xl px-4 sm:-mt-40 sm:px-6 lg:-mt-28">
        <StatsCard
          locale={locale}
          items={stats.map(({ key, value, suffix }) => ({
            value,
            suffix,
            label: labels.items[key],
          }))}
        />
      </div>
    </section>
  );
}
