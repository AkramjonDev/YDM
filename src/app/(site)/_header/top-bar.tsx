import { contact } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { MailIcon, PhoneIcon } from "./icons";
import { LanguageSwitcher } from "./language-switcher";

type Props = {
  locale: Locale;
  labels: Dictionary["topBar"];
  languageLabel: string;
};

// Navy strip above the navbar (≥768px). Scrolls away; the navbar stays sticky.
export function TopBar({ locale, labels, languageLabel }: Props) {
  return (
    <div className="hidden bg-navy-950 text-[13px] md:block">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-6 px-6">
        <p className="flex min-w-0 items-center gap-3">
          <span className="font-semibold text-gold-500">{labels.republic}</span>
          <span aria-hidden className="hidden h-4 w-px bg-white/20 xl:block" />
          <span className="hidden truncate text-white/80 xl:inline">{labels.centreName}</span>
        </p>

        <div className="flex shrink-0 items-center gap-4 lg:gap-6">
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-2 rounded text-white/80 transition-colors hover:text-white"
          >
            <PhoneIcon className="size-4 text-gold-500" />
            <span className="sr-only">{labels.phone}: </span>
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded text-white/80 transition-colors hover:text-white"
          >
            <MailIcon className="size-4 text-gold-500" />
            <span className="sr-only">{labels.email}: </span>
            {contact.email}
          </a>
          <LanguageSwitcher locale={locale} label={languageLabel} variant="dark" />
        </div>
      </div>
    </div>
  );
}
