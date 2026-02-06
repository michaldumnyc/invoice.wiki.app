export const dynamic = "force-static"

import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Metadata } from "next"
import { BreadcrumbJsonLd, WebPageJsonLd, FaqJsonLd } from "@/app/components/JsonLd"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getDictionary } from "@/lib/get-dictionary"
import { SITE_URL, LOCALES, DEFAULT_LOCALE, LOCALE_OG, type Locale } from "@/lib/constants"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const alternateLanguages: Record<string, string> = {}
  for (const loc of LOCALES) {
    alternateLanguages[loc] = `${SITE_URL}/${loc}/faq`
  }
  alternateLanguages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}/faq`

  return {
    title: dict.faq.meta.title,
    description: dict.faq.meta.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/faq`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: dict.faq.meta.ogTitle,
      description: dict.faq.meta.ogDescription,
      url: `${SITE_URL}/${locale}/faq`,
      siteName: "Invoice.wiki",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: dict.faq.meta.ogTitle,
          type: "image/png",
        },
      ],
      locale: LOCALE_OG[locale as Locale] || "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.faq.meta.ogTitle,
      description: dict.faq.meta.ogDescription,
      images: ["/images/twitter-card.png"],
    },
  }
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  // ISO 8601 metadata for the page
  const pageCreationDate = "2025-08-26T12:00:00.000Z"
  const pageModificationDate = "2026-02-06T12:00:00.000Z"

  const breadcrumbItems = [
    { name: dict.nav.home, url: `${SITE_URL}/${locale}` },
    { name: dict.nav.faq, url: `${SITE_URL}/${locale}/faq` },
  ]

  const faqCategories = dict.faq.categories

  // Flatten all FAQ questions for JSON-LD schema
  const allFaqQuestions = faqCategories.flatMap((cat) => cat.questions)

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FaqJsonLd questions={allFaqQuestions} />
      <WebPageJsonLd
        url={`${SITE_URL}/${locale}/faq`}
        name={dict.faq.meta.title}
        description={dict.faq.meta.description}
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />

      <Header />
      <main id="main-content" className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12 max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">{dict.faq.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{dict.faq.subtitle}</p>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {faqCategories.map((category) => (
              <div key={category.category} className="flex flex-col items-center p-4 bg-card rounded-lg border">
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium text-center">{category.category}</span>
              </div>
            ))}
          </div>

          {/* FAQ Sections */}
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <div id={category.category.toLowerCase().replace(/\s+/g, "-")} className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={`${categoryIndex}-${questionIndex}`}
                    value={`${categoryIndex}-${questionIndex}`}
                    className="bg-card rounded-lg border px-6"
                  >
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">{dict.faq.stillHaveQuestions.title}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{dict.faq.stillHaveQuestions.content}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/create-invoice`}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                {dict.faq.stillHaveQuestions.createInvoice}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                {dict.faq.stillHaveQuestions.aboutSite}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
