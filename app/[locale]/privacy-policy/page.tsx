export const dynamic = "force-static"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContactButton } from "@/components/ContactButton"
import type { Metadata } from "next"
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/app/components/JsonLd"
import { getDictionary } from "@/lib/get-dictionary"
import { SITE_URL, LOCALES, DEFAULT_LOCALE, LOCALE_OG, type Locale } from "@/lib/constants"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const alternateLanguages: Record<string, string> = {}
  for (const loc of LOCALES) {
    alternateLanguages[loc] = `${SITE_URL}/${loc}/privacy-policy`
  }
  alternateLanguages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}/privacy-policy`

  return {
    title: dict.privacy.meta.title,
    description: dict.privacy.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/privacy-policy`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: dict.privacy.meta.ogTitle,
      description: dict.privacy.meta.ogDescription,
      url: `${SITE_URL}/${locale}/privacy-policy`,
      siteName: "Invoice.wiki",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.privacy.meta.ogTitle,
          type: "image/png",
        },
      ],
      locale: LOCALE_OG[locale as Locale] || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.privacy.meta.ogTitle,
      description: dict.privacy.meta.ogDescription,
      images: ["/images/twitter-card.png"],
    },
    other: {
      "article:published_time": "2025-02-04T00:00:00Z",
      "article:modified_time": "2026-02-06T00:00:00Z",
      datePublished: "2025-02-04",
      dateModified: "2026-02-06",
    },
  }
}

const privacyEmail = process.env.PRIVACY_EMAIL || "E-mail"

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  // ISO 8601 metadata for the page
  const pageCreationDate = "2025-02-04T12:00:00.000Z"
  const pageModificationDate = "2026-02-06T12:00:00.000Z"

  const breadcrumbItems = [
    { name: dict.nav.home, url: `${SITE_URL}/${locale}` },
    { name: dict.footer.privacyPolicy, url: `${SITE_URL}/${locale}/privacy-policy` },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WebPageJsonLd
        url={`${SITE_URL}/${locale}/privacy-policy`}
        name={dict.privacy.title}
        description={dict.privacy.meta.description}
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />
      <Header />
      <main id="main-content" className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">{dict.privacy.title}</h1>

            <div className="space-y-6 text-foreground">
              <h2 className="text-2xl font-semibold mb-4">{dict.privacy.noCollection.title}</h2>
              <p className="mb-4 leading-relaxed">
                <Link href={`/${locale}`} className="text-primary underline hover:no-underline">
                  Invoice Wiki
                </Link>{" "}
                {dict.privacy.noCollection.content[0]}
              </p>
              {dict.privacy.noCollection.content.slice(1).map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <h2 className="text-2xl font-semibold mb-4">{dict.privacy.howWeProtect.title}</h2>
              <p className="mb-4 leading-relaxed">{dict.privacy.howWeProtect.intro}</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                {dict.privacy.howWeProtect.items.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}:</strong> {item.content}
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mb-4">{dict.privacy.whatWeDoNotCollect.title}</h2>
              <p className="mb-4 leading-relaxed">{dict.privacy.whatWeDoNotCollect.intro}</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                {dict.privacy.whatWeDoNotCollect.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold mb-4">{dict.privacy.analytics.title}</h2>
              <p className="mb-4 leading-relaxed">{dict.privacy.analytics.intro}</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                {dict.privacy.analytics.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="mb-4 leading-relaxed">{dict.privacy.analytics.note}</p>

              <h2 className="text-2xl font-semibold mb-4">{dict.privacy.thirdParty.title}</h2>
              <p className="mb-4 leading-relaxed">
                {dict.privacy.thirdParty.content}{" "}
                <Link href={`/${locale}/about`} className="text-primary underline hover:no-underline">
                  {dict.privacy.thirdParty.link}
                </Link>{" "}
                and security measures.
              </p>

              <h2 className="text-2xl font-semibold mb-4">{dict.privacy.rights.title}</h2>
              <p className="mb-4 leading-relaxed">{dict.privacy.rights.intro}</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                {dict.privacy.rights.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">{dict.privacy.readyCta.title}</h3>
                <p className="mb-4 leading-relaxed">{dict.privacy.readyCta.content}</p>
                <Link
                  href={`/${locale}/create-invoice`}
                  className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
                >
                  {dict.privacy.readyCta.button}
                </Link>
              </div>

              <h2 className="text-2xl font-semibold mb-4">{dict.privacy.contactTitle}</h2>
              <p className="mb-4 leading-relaxed">
                {dict.privacy.contactContent} <ContactButton email={privacyEmail} />
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
