import { departments } from "@/data/departments";
import { getDictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { HeaderBar } from "./header-bar";
import { HtmlLang } from "./html-lang";
import { Logo } from "./logo";
import { TopBar } from "./top-bar";

// Reads the locale cookie, so render it inside <Suspense> (Cache Components).
// The top bar and navbar are siblings so the navbar can stick to the viewport
// while the top bar scrolls away.
export async function SiteHeader() {
  const locale = await getLocale();
  const { topBar, header } = getDictionary(locale);

  return (
    <>
      <HtmlLang locale={locale} />
      <TopBar locale={locale} labels={topBar} languageLabel={header.language} />
      <HeaderBar
        locale={locale}
        labels={header}
        departments={departments.map(({ slug, color, name }) => ({
          slug,
          color,
          name: name[locale],
        }))}
      />
    </>
  );
}

// Static shell shown until the locale-aware header streams in. Same heights,
// so nothing shifts when it is swapped.
export function SiteHeaderFallback() {
  return (
    <>
      <div className="hidden h-12 bg-navy-950 md:block" />
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <div className="mx-auto flex h-18 max-w-7xl items-center px-4 sm:px-6 lg:h-25">
          <Logo className="h-11 w-auto lg:h-12 xl:h-14" />
        </div>
      </header>
    </>
  );
}
