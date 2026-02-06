export const dynamic = "force-static"

import Header from "@/components/Header"
import { SITE_URL, LOCALES, DEFAULT_LOCALE, LOCALE_OG, type Locale } from "@/lib/constants"
import Footer from "@/components/Footer"
import { ContactButton } from "@/components/ContactButton"
import { AboutInvoiceExample } from "@/components/AboutInvoiceExample"
import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbJsonLd, AboutPageJsonLd, WebPageJsonLd, InvoiceExampleImageJsonLd } from "@/app/components/JsonLd"
import { getDictionary } from "@/lib/get-dictionary"

// ISO 8601 metadata for the page
const pageCreationDate = "2025-02-04T12:00:00.000Z"
const pageModificationDate = "2026-02-06T12:00:00.000Z"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const alternateLanguages: Record<string, string> = {}
  for (const loc of LOCALES) {
    alternateLanguages[loc] = `${SITE_URL}/${loc}/about`
  }
  alternateLanguages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}/about`

  return {
    title: dict.about.meta.title,
    description: dict.about.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: dict.about.meta.ogTitle,
      description: dict.about.meta.ogDescription,
      url: `${SITE_URL}/${locale}/about`,
      siteName: "Invoice.wiki",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.about.meta.ogTitle,
          type: "image/png",
        },
      ],
      locale: LOCALE_OG[locale as Locale] || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.about.meta.ogTitle,
      description: dict.about.meta.ogDescription,
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

const updateEmojis = ["🧮", "🔄", "👁️", "🎨", "🌍"]
const internationalEmojis = ["🌍", "🗣️", "🧮", "🔄"]

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const supportEmail = process.env.SUPPORT_EMAIL || "E-mail"

  const breadcrumbItems = [
    { name: dict.nav.home, url: `${SITE_URL}/${locale}` },
    { name: dict.nav.about, url: `${SITE_URL}/${locale}/about` },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WebPageJsonLd
        url={`${SITE_URL}/${locale}/about`}
        name={dict.about.title}
        description={dict.about.meta.description}
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />
      <AboutPageJsonLd description={dict.about.meta.description} url={`${SITE_URL}/${locale}/about`} />
      <InvoiceExampleImageJsonLd
        name={dict.about.invoiceExample.imageTitle}
        description={dict.about.invoiceExample.imageAlt}
      />
      <Header />
      <main id="main-content" className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl font-bold mb-8">{dict.about.title}</h1>
            <p className="text-xl text-foreground mb-8">
              {dict.about.intro}{" "}
              <Link href={`/${locale}/create-invoice`} className="text-primary underline hover:no-underline">
                {dict.about.createFirstInvoice}
              </Link>{" "}
              now.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-300">
                ✨ {dict.about.latestUpdates.title}
              </h2>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                {dict.about.latestUpdates.items.map((item, index) => (
                  <li key={index}>
                    <strong>
                      {updateEmojis[index]} {item.split(":")[0]}:
                    </strong>
                    {item.substring(item.indexOf(":") + 1)}
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-4">{dict.about.privacy.title}</h2>
            <p className="mb-6">
              {dict.about.privacy.content}{" "}
              <Link href={`/${locale}/privacy-policy`} className="text-primary hover:underline">
                {dict.about.privacy.link}
              </Link>
              .
            </p>

            {/* What is an invoice */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">{dict.about.whatIsInvoice.title}</h2>
            <p className="mb-6">{dict.about.whatIsInvoice.content}</p>

            {/* Components of an invoice */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">{dict.about.components.title}</h2>

            {/* Seller information */}
            <h3 className="text-xl font-semibold mt-8 mb-4">{dict.about.components.seller.title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {dict.about.components.seller.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.split("–")[0]}–</strong>
                  {item.substring(item.indexOf("–") + 1)}
                </li>
              ))}
            </ul>

            {/* Customer information */}
            <h3 className="text-xl font-semibold mt-8 mb-4">{dict.about.components.buyer.title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {dict.about.components.buyer.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.split("–")[0]}–</strong>
                  {item.substring(item.indexOf("–") + 1)}
                </li>
              ))}
            </ul>

            {/* Invoice details */}
            <h3 className="text-xl font-semibold mt-8 mb-4">{dict.about.components.details.title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {dict.about.components.details.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.split("–")[0]}–</strong>
                  {item.substring(item.indexOf("–") + 1)}
                </li>
              ))}
            </ul>

            {/* Payment information */}
            <h3 className="text-xl font-semibold mt-8 mb-4">{dict.about.components.payment.title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {dict.about.components.payment.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.split("–")[0]}–</strong>
                  {item.substring(item.indexOf("–") + 1)}
                </li>
              ))}
            </ul>

            {/* Commodities and settlements */}
            <h3 className="text-xl font-semibold mt-8 mb-4">{dict.about.components.itemsTotals.title}</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              {dict.about.components.itemsTotals.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.split("–")[0]}–</strong>
                  {item.substring(item.indexOf("–") + 1)}
                </li>
              ))}
            </ul>

            {/* Legal significance */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">{dict.about.legal.title}</h2>
            <p className="mb-6">{dict.about.legal.content}</p>
            <p className="mb-6">{dict.about.legal.purposeIntro}</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              {dict.about.legal.purposes.map((purpose, index) => (
                <li key={index}>{purpose}</li>
              ))}
            </ul>

            {/* International Support */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">{dict.about.international.title}</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {dict.about.international.items.map((item, index) => (
                <div key={index}>
                  <h3 className="text-lg font-semibold mb-3">
                    {internationalEmojis[index]} {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Advantages of Invoice.wiki */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">{dict.about.whyChoose.title}</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              {dict.about.whyChoose.items.map((item, index) => (
                <li key={index}>
                  <strong>{item.split("–")[0]}–</strong>
                  {item.substring(item.indexOf("–") + 1)}
                </li>
              ))}
            </ul>

            {/* Invoice Quality Example */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">{dict.about.invoiceQuality.title}</h2>
            <p className="mb-6">{dict.about.invoiceQuality.content}</p>

            <AboutInvoiceExample translations={dict.about.invoiceExample} />

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">{dict.about.readyCta.title}</h3>
              <p className="mb-4">{dict.about.readyCta.subtitle}</p>
              <Link
                href={`/${locale}/create-invoice`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {dict.about.readyCta.button}
              </Link>
            </div>

            {/* Contacts */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">{dict.about.contact.title}</h2>
            <p className="mb-6">{dict.about.contact.content}</p>
            <ContactButton email={supportEmail} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
