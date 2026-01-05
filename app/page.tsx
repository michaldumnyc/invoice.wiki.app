export const dynamic = 'force-static'
export const revalidate = 3600 // 1h

// ISO 8601 metadata for the page
const pageCreationDate = "2025-02-04T12:00:00.000Z"
const pageModificationDate = "2025-12-07T12:00:00.000Z"

import Link from "next/link"
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
  BreadcrumbJsonLd
} from "./components/JsonLd"
import { InvoiceExampleSection } from "@/components/InvoiceExampleSection"

export const metadata: Metadata = {
  title: "Free Invoice Generator - Invoice.wiki",
  description:
    "Free online invoice maker. Create professional invoices instantly with PDF download, tax support, multiple currencies and languages. No registration.",
  alternates: {
    canonical: "https://invoice.wiki",
    languages: {
      "en-US": "/"
    }
  },
  openGraph: {
    title: "Invoice.wiki - Free Invoice Generator",
    description:
      "Create invoices instantly online. Free PDF download, no registration needed.",
    url: "https://invoice.wiki",
    siteName: "Invoice.wiki",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Invoice.wiki - Free Online Invoice Maker",
        type: "image/png",
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice.wiki - Free Invoice Generator",
    description:
      "Create invoices quickly. Free PDF download, no registration needed.",
    images: ["/images/twitter-card.png"],
  },
  other: {
    "article:published_time": "2025-02-04T00:00:00Z",
    "article:modified_time": "2025-12-07T00:00:00Z",
    "datePublished": "2025-02-04",
    "dateModified": "2025-12-07"
  }
}

export default function HomePage() {
  const breadcrumbItems = [
    { name: "Home", url: "https://invoice.wiki" }
  ]

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WebPageJsonLd 
        url="https://invoice.wiki"
        name="Free Invoice Generator - Invoice.wiki"
        description="Free online invoice maker. Create professional invoices instantly with PDF download, tax support, multiple currencies and languages. No registration."
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />
      <WebsiteJsonLd />
      <OrganizationJsonLd />
      <EnhancedSoftwareApplicationJsonLd />
      <InvoiceExampleImageJsonLd />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 pt-[72px] sm:pt-[80px]">
          {/* Hero Section */}
          <section aria-labelledby="hero-heading" className="bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 id="hero-heading" className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
                  Free Invoice Generator - Create PDF Invoices
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                  Create and download <strong>professional PDF invoices</strong> in minutes. Our free invoice maker supports <strong>40+ currencies</strong>, automatic tax calculations, and <strong>6 languages</strong>. No registration, no fees — just fill in your details and download.
                </p>
                <Link href="/create-invoice" aria-label="Start creating your professional invoice now">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Create Invoice Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section aria-labelledby="how-it-works-heading" className="py-12 md:py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 id="how-it-works-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                How to Create Professional Invoices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    1️⃣
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Fill Invoice Details</h3>
                  <p className="text-muted-foreground">Enter your business information, client details, and invoice items. Our form guides you through all required fields.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    2️⃣
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Customize & Review</h3>
                  <p className="text-muted-foreground">Choose colors, language, and tax settings. Preview your invoice before downloading.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    3️⃣
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Download PDF</h3>
                  <p className="text-muted-foreground">Generate and download your invoice as a PDF. Ready to send to clients or print for records.</p>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link href="/create-invoice" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Start Creating Invoice →
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section aria-labelledby="features-heading" className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Why Choose Our Invoice Generator?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    ⚡
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast & Simple</h3>
                  <p className="text-muted-foreground">Fill out the form, hit download. Your PDF invoice is ready in seconds.</p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    🔒
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Private & Secure</h3>
                  <p className="text-muted-foreground">Everything runs in your browser. We don't store or see your data. <Link href="/privacy-policy" className="text-primary underline hover:no-underline">Privacy details →</Link></p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    🌐
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Works Everywhere</h3>
                  <p className="text-muted-foreground">Desktop, tablet, phone — any browser, any device. No apps to install. <Link href="/about" className="text-primary underline hover:no-underline">Learn more →</Link></p>
                </article>
              </div>
            </div>
          </section>

          <InvoiceExampleSection />

          {/* FAQ Section */}
          <section aria-labelledby="faq-heading" className="py-12 md:py-20 bg-muted">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
              <div className="space-y-6 text-foreground/90">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Do I need to register?</h3>
                  <p className="leading-relaxed">No! Just open the form and start creating. No login, no signup.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I download as PDF?</h3>
                  <p className="leading-relaxed">Yes — instant PDF download, ready to send or print.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Is it really free?</h3>
                  <p className="leading-relaxed">100% free. No hidden fees, no subscriptions, no limits.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tax calculations?</h3>
                  <p className="leading-relaxed">Yes! Any tax type — auto-calculated totals.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">What currencies?</h3>
                  <p className="leading-relaxed">40+ currencies: USD, EUR, GBP, PLN, CZK, UAH, and more.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Customization?</h3>
                  <p className="leading-relaxed">10 colors + 6 languages (EN, DE, CS, PL, SK, UK).</p>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section aria-labelledby="features-grid-heading" className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 id="features-grid-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Everything You Need
              </h2>
              <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="p-4">
                  <div className="text-3xl mb-2">💰</div>
                  <div className="font-semibold">40+ Currencies</div>
                  <div className="text-sm text-muted-foreground">USD, EUR, GBP, and more</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🌍</div>
                  <div className="font-semibold">6 Languages</div>
                  <div className="text-sm text-muted-foreground">EN, DE, CS, PL, SK, UK</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🎨</div>
                  <div className="font-semibold">10 Colors</div>
                  <div className="text-sm text-muted-foreground">Match your brand</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">📄</div>
                  <div className="font-semibold">Instant PDF</div>
                  <div className="text-sm text-muted-foreground">Download & send</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🧮</div>
                  <div className="font-semibold">Auto Calculations</div>
                  <div className="text-sm text-muted-foreground">Tax, totals, discounts</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">📱</div>
                  <div className="font-semibold">Any Device</div>
                  <div className="text-sm text-muted-foreground">Desktop, tablet, phone</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">🔐</div>
                  <div className="font-semibold">100% Private</div>
                  <div className="text-sm text-muted-foreground">Data stays local</div>
                </div>
                <div className="p-4">
                  <div className="text-3xl mb-2">✨</div>
                  <div className="font-semibold">Forever Free</div>
                  <div className="text-sm text-muted-foreground">No hidden fees</div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section aria-labelledby="cta-heading" className="bg-background dark:bg-background border-t py-12 md:py-16">
            <div className="container mx-auto px-4 text-center">
              <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Ready to Create Your Invoice?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                No signup. No fees. Takes 2 minutes.
              </p>
              <Link href="/create-invoice" aria-label="Create your invoice now">
                <Button size="lg" variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Create Invoice <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
