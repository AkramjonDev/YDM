import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";

type Pick = (dictionary: Dictionary, locale: Locale) => { title: string; description?: string };

// `generateMetadata` for a page whose title (and description) depend on the
// visitor's locale. The root layout's template turns the title into
// "{title} — Yoshlar Diplomatiya Markazi"; the description falls back to the
// site description.
export function localizedMetadata(pick: Pick) {
  return async function generateMetadata(): Promise<Metadata> {
    const locale = await getLocale();
    const dictionary = getDictionary(locale);
    const { title, description } = pick(dictionary, locale);
    return { title, description: description ?? dictionary.footer.about };
  };
}
