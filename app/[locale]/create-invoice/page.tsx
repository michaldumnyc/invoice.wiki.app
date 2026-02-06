export const dynamic = "force-static"

import dynamic_import from "next/dynamic"
import { SITE_URL, LOCALES, DEFAULT_LOCALE, LOCALE_OG, type Locale } from "@/lib/constants"
import { getDictionary } from "@/lib/get-dictionary"
import { Suspense } from "react"
import Link from "next/link"
import LoadingSpinner from "@/components/LoadingSpinner"
import Footer from "@/components/Footer"
import type { Metadata } from "next"
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/app/components/JsonLd"

const CreateInvoiceForm = dynamic_import(() => import("@/components/CreateInvoiceForm"), {
  loading: () => <LoadingSpinner />,
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const alternateLanguages: Record<string, string> = {}
  for (const loc of LOCALES) {
    alternateLanguages[loc] = `${SITE_URL}/${loc}/create-invoice`
  }
  alternateLanguages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}/create-invoice`

  return {
    title: dict.createInvoice.meta.title,
    description: dict.createInvoice.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/create-invoice`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: dict.createInvoice.meta.ogTitle,
      description: dict.createInvoice.meta.ogDescription,
      url: `${SITE_URL}/${locale}/create-invoice`,
      siteName: "Invoice.wiki",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.createInvoice.meta.ogTitle,
          type: "image/png",
        },
      ],
      locale: LOCALE_OG[locale as Locale] || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.createInvoice.meta.ogTitle,
      description: dict.createInvoice.meta.ogDescription,
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

export default async function CreateInvoicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const pageCreationDate = "2025-02-04T12:00:00.000Z"
  const pageModificationDate = "2026-02-06T12:00:00.000Z"

  const breadcrumbItems = [
    { name: dict.nav.home, url: `${SITE_URL}/${locale}` },
    { name: dict.nav.createInvoice, url: `${SITE_URL}/${locale}/create-invoice` },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WebPageJsonLd
        url={`${SITE_URL}/${locale}/create-invoice`}
        name={dict.createInvoice.meta.title}
        description={dict.createInvoice.meta.description}
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />

      <main id="main-content" className="flex-1 pt-[72px] sm:pt-[80px]">
        <section className="container max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">{dict.createInvoice.title}</h1>
          <p className="text-base sm:text-lg text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            {dict.createInvoice.subtitle}{" "}
            <Link href={`/${locale}/privacy-policy`} className="text-primary underline hover:no-underline">
              {dict.createInvoice.privacyLink}
            </Link>
            . {dict.createInvoice.needHelp}{" "}
            <Link href={`/${locale}/faq`} className="text-primary underline hover:no-underline">
              {dict.createInvoice.faqLink}
            </Link>
            .
          </p>

          <Suspense fallback={<LoadingSpinner />}>
            <CreateInvoiceForm formDict={dict.createInvoice.form} termsDict={dict.terms} locale={locale} />
          </Suspense>
        </section>
      </main>

      {/* FAQ Section */}
      <section className="w-full bg-muted/50 py-12">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">{dict.createInvoice.faqTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dict.createInvoice.faqItems.map((faq, index) => (
              <div key={index} className="bg-card rounded-lg border p-6">
                <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href={`/${locale}/faq`}
              className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {dict.createInvoice.viewAllFaqs}
            </Link>
          </div>
        </div>
      </section>

      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  )
}
