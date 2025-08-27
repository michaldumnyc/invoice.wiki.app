export const dynamic = 'force-static'
export const revalidate = 3600 // 1h

// ISO 8601 metadata for the page
const pageCreationDate = "2025-02-04T12:00:00.000Z"
const pageModificationDate = "2025-08-27T18:30:00.000Z"

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
    "Free online invoice maker. Create professional invoices instantly with PDF download, VAT calculation, multiple currencies and languages.",
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
    "article:modified_time": "2025-08-27T00:00:00Z",
    "datePublished": "2025-02-04",
    "dateModified": "2025-08-27"
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
        description="Free online invoice maker. Create professional invoices instantly with PDF download, VAT calculation, multiple currencies and languages."
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />
      <WebsiteJsonLd />
      <OrganizationJsonLd />
      <EnhancedSoftwareApplicationJsonLd />
      <InvoiceExampleImageJsonLd />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[72px] sm:pt-[80px]">
          {/* Hero Section */}
          <section aria-labelledby="hero-heading" className="bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 id="hero-heading" className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-foreground">
                  Free Invoice Generator - Create PDF Invoices
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                  Use our <strong>free online invoice maker</strong> to create invoices for clients with features including <strong>VAT calculations</strong>, multi-currency support, and <strong>PDF generation</strong>. Generate and download formatted PDF invoices without registration requirements. Our platform is designed for freelancers, small business owners, independent contractors, and entrepreneurs who need a <strong>free billing solution</strong>.
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
                  <p className="text-muted-foreground">Choose colors, language, and VAT settings. Preview your invoice before downloading.</p>
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
                  <h3 className="text-xl font-semibold mb-2">Generate Invoice Quickly</h3>
                  <p className="text-muted-foreground">Generate <strong>invoices quickly</strong> with our streamlined invoice generator interface.</p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    🔒
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Security & Privacy</h3>
                  <p className="text-muted-foreground">Your invoice data stays <strong>on your device</strong> and is not stored on our servers. Learn more about our <Link href="/privacy-policy" className="text-primary underline hover:no-underline">privacy policy</Link>.</p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    🌐
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Create Invoice Online - No Installation</h3>
                  <p className="text-muted-foreground">Access our powerful invoice creator directly in your browser without downloading software or creating accounts. Discover more <Link href="/about" className="text-primary underline hover:no-underline">about our platform features</Link> and capabilities.</p>
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
                  <h3 className="font-semibold text-lg mb-2">Do I need to register to create invoices with Invoice Wiki?</h3>
                  <p className="leading-relaxed">No! Our invoice generator is free and doesn't require registration, login, or account creation. Simply visit our invoice creation page and start building invoices without providing personal information.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I generate invoice as PDF instantly?</h3>
                  <p className="leading-relaxed">Yes, you can download your formatted invoice as a PDF file that's ready for sending to clients or printing for your business records.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Is this invoice generator completely free?</h3>
                  <p className="leading-relaxed">Yes, Invoice.wiki is a free invoice maker for both personal and commercial use with no hidden fees or subscription costs.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Does it support VAT and tax calculations?</h3>
                  <p className="leading-relaxed">Yes! You can add VAT rates, tax percentages, and various fee structures to your invoices with automatic calculations.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">What currencies are supported?</h3>
                  <p className="leading-relaxed">Our invoice generator supports multiple international currencies including USD, EUR, GBP, CAD, AUD, CHF, JPY, PLN, CZK, UAH, and others. You can select your preferred currency and the system will format amounts accordingly.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I customize invoice colors and languages?</h3>
                  <p className="leading-relaxed">Yes! Choose from 10 accent colors (Blue, Green, Red, Purple, Orange, Pink, Teal, Yellow, Slate, Black) to match your brand. Plus, generate invoices in 6 languages: English, German, Czech, Polish, Slovak, and Ukrainian.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section aria-labelledby="benefits-heading" className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 id="benefits-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Professional Invoice Generation Made Simple
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="space-y-6 text-foreground/90">
                  <p className="text-lg leading-relaxed">
                    Creating professional invoices has never been easier with our comprehensive online invoice generation platform that combines simplicity with powerful features. Our free online invoice generator allows you to create, customize, and download professional invoices in just minutes, whether you're a freelancer sending your first invoice to a client or an experienced small business owner managing multiple ongoing client relationships and complex billing scenarios.
                  </p>
                  <p className="text-lg leading-relaxed">
                    The invoice maker supports multiple international currencies, sophisticated VAT calculations, flexible payment terms, customizable due dates, and detailed line items with quantities, rates, and comprehensive descriptions. You can easily customize brand colors, include detailed business information, and create professional-looking invoices that are generated as high-quality PDF files suitable for sending directly to clients or printing for your permanent business records.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Security and privacy are our highest priorities when handling your sensitive business and financial information. Your invoice data is processed entirely locally in your browser using advanced client-side encryption and never stored on our servers, ensuring your sensitive business information remains completely private and secure. Start creating professional invoices today without any registration requirements or subscription fees.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Our advanced invoice generator includes powerful features that streamline your billing process and help you maintain professional relationships with clients. The platform automatically calculates totals, applies discounts, manages tax rates across different regions, and ensures compliance with international invoicing standards. Whether you need to create simple one-time invoices or manage recurring billing cycles, our comprehensive toolset adapts to your specific business requirements.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Built with modern web technologies, our invoice creation platform delivers exceptional performance and reliability across all devices and browsers. The responsive design ensures your invoices look perfect whether viewed on desktop computers, tablets, or mobile devices. Advanced PDF generation capabilities produce crisp, print-ready documents that maintain professional formatting and can be easily shared via email or stored in cloud services for future reference.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section aria-labelledby="cta-heading" className="bg-background dark:bg-background border-t py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Ready to Create Your Professional Invoice?</h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                No registration required, no hidden fees, no complex setup procedures. Start creating professional invoices online immediately with our free invoice generator that delivers results in seconds. Perfect for freelancers, consultants, contractors, and small business owners who need reliable billing solutions.
              </p>
              <Link href="/create-invoice" aria-label="Begin creating your professional invoice immediately">
                <Button size="lg" variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Start Building Invoice <ArrowRight className="ml-2 h-5 w-5" />
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
