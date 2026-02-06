export const dynamic = "force-static"

// ISO 8601 metadata for the page
const pageCreationDate = "2025-02-04T12:00:00.000Z"
const pageModificationDate = "2026-02-06T12:00:00.000Z"

import Link from "next/link"
import { SITE_URL, LOCALES, DEFAULT_LOCALE, LOCALE_OG, type Locale } from "@/lib/constants"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Metadata } from "next"
import React from "react"
import {
  WebsiteJsonLd,
  OrganizationJsonLd,
  FaqJsonLd,
  InvoiceExampleImageJsonLd,
  EnhancedSoftwareApplicationJsonLd,
  WebPageJsonLd,
  BreadcrumbJsonLd,
} from "@/app/components/JsonLd"
import { InvoiceExampleSection } from "@/components/InvoiceExampleSection"
import { getDictionary } from "@/lib/get-dictionary"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const alternateLanguages: Record<string, string> = {}
  for (const loc of LOCALES) {
    alternateLanguages[loc] = `${SITE_URL}/${loc}`
  }
  alternateLanguages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}`

  return {
    title: dict.home.meta.title,
    description: dict.home.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: dict.home.meta.ogTitle,
      description: dict.home.meta.ogDescription,
      url: `${SITE_URL}/${locale}`,
      siteName: "Invoice.wiki",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.home.meta.ogTitle,
          type: "image/png",
        },
      ],
      locale: LOCALE_OG[locale as Locale] || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.meta.ogTitle,
      description: dict.home.meta.ogDescription,
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

const stepEmojis = ["1️⃣", "2️⃣", "3️⃣"]
const stepColors = [
  "bg-blue-100 dark:bg-blue-900",
  "bg-green-100 dark:bg-green-900",
  "bg-purple-100 dark:bg-purple-900",
]
const featureEmojis = ["⚡", "🔒", "🌐"]
const gridEmojis = ["💰", "🌍", "🎨", "📄", "🧮", "📱", "🔐", "✨"]

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const breadcrumbItems = [{ name: dict.nav.home, url: `${SITE_URL}/${locale}` }]

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WebPageJsonLd
        url={`${SITE_URL}/${locale}`}
        name={dict.home.meta.title}
        description={dict.home.meta.description}
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />
      <WebsiteJsonLd description={dict.home.meta.description} />
      <OrganizationJsonLd />
      <FaqJsonLd questions={dict.home.faq.items} />
      <EnhancedSoftwareApplicationJsonLd description={dict.home.meta.description} />
      <InvoiceExampleImageJsonLd
        name={dict.home.invoiceExample.imageTitle}
        description={dict.home.invoiceExample.imageAlt}
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 pt-[72px] sm:pt-[80px]">
          {/* Hero Section */}
          <section aria-labelledby="hero-heading" className="bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 id="hero-heading" className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
                  {dict.home.hero.title}
                </h1>
                <p
                  className="text-lg sm:text-xl text-muted-foreground mb-8"
                  dangerouslySetInnerHTML={{ __html: dict.home.hero.description }}
                />
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href={`/${locale}/create-invoice`} aria-label={dict.home.hero.cta}>
                    {dict.home.hero.cta} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section aria-labelledby="how-it-works-heading" className="py-12 md:py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                {dict.home.howItWorks.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {dict.home.howItWorks.steps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-16 h-16 ${stepColors[index]} rounded-full flex items-center justify-center mx-auto mb-4 text-3xl`}
                    >
                      {stepEmojis[index]}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href={`/${locale}/create-invoice`}
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                >
                  {dict.home.howItWorks.cta}
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section aria-labelledby="features-heading" className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                {dict.home.features.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {dict.home.features.items.map((feature, index) => (
                  <article key={index} className="text-center p-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                      {featureEmojis[index]}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                      {index === 1 && (
                        <>
                          {" "}
                          <Link
                            href={`/${locale}/privacy-policy`}
                            className="text-primary underline hover:no-underline"
                          >
                            {dict.home.features.privacyLink}
                          </Link>
                        </>
                      )}
                      {index === 2 && (
                        <>
                          {" "}
                          <Link href={`/${locale}/about`} className="text-primary underline hover:no-underline">
                            {dict.home.features.learnMoreLink}
                          </Link>
                        </>
                      )}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <InvoiceExampleSection translations={dict.home.invoiceExample} locale={locale} />

          {/* FAQ Section */}
          <section aria-labelledby="faq-heading" className="py-12 md:py-20 bg-muted">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-center mb-10">
                {dict.home.faq.title}
              </h2>
              <div className="space-y-6 text-foreground/90">
                {dict.home.faq.items.map((item, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
                    <p className="leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section aria-labelledby="features-grid-heading" className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 id="features-grid-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                {dict.home.grid.title}
              </h2>
              <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {dict.home.grid.items.map((item, index) => (
                  <div key={index} className="p-4">
                    <div className="text-3xl mb-2">{gridEmojis[index]}</div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section aria-labelledby="cta-heading" className="bg-background dark:bg-background border-t py-12 md:py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {dict.home.cta.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">{dict.home.cta.subtitle}</p>
              <Button size="lg" variant="default" className="bg-blue-600 hover:bg-blue-700" asChild>
                <Link href={`/${locale}/create-invoice`} aria-label={dict.home.cta.button}>
                  {dict.home.cta.button} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
