import type { Locale } from "./config";

// Count-dependent text, one entry per CLDR plural category the language uses
// (uz/en: one, other · ru: one, few, many, other). `{count}` is replaced with
// the formatted number.
export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

export function plural(locale: Locale, count: number, forms: PluralForms): string {
  const form = forms[new Intl.PluralRules(locale).select(count)] ?? forms.other;
  return form.replaceAll("{count}", new Intl.NumberFormat(locale).format(count));
}
