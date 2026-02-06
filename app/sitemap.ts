import type { MetadataRoute } from "next"
import { SITE_URL, LOCALES, DEFAULT_LOCALE } from "@/lib/constants"

const pages = ["", "/about", "/create-invoice", "/faq", "/privacy-policy"]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    const languages: Record<string, string> = {}
    for (const locale of LOCALES) {
      languages[locale] = `${SITE_URL}/${locale}${page}`
    }
    languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}${page}`

    // Create entry for each locale
    for (const locale of LOCALES) {
      entries.push({
        url: `${SITE_URL}/${locale}${page}`,
        lastModified: new Date("2026-02-06"),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page === "/create-invoice" ? 0.9 : 0.7,
        alternates: {
          languages,
        },
      })
    }
  }

  return entries
}
