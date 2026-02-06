export const SITE_URL = "https://invoice.wiki"
export const SITE_NAME = "Invoice.wiki"

export const LOCALES = ["en", "de", "cs", "pl", "sk", "uk"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "en"

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  cs: "Čeština",
  pl: "Polski",
  sk: "Slovenčina",
  uk: "Українська",
}

export const LOCALE_OG: Record<Locale, string> = {
  en: "en_US",
  de: "de_DE",
  cs: "cs_CZ",
  pl: "pl_PL",
  sk: "sk_SK",
  uk: "uk_UA",
}
