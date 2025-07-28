export const dynamic = 'force-static'
export const revalidate = 3600 // 1h

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
  ProductJsonLd,
  FaqJsonLd
} from "./components/JsonLd"

export const metadata: Metadata = {
  title: "Free Invoice Generator - Invoice.wiki",
  description:
    "Free online invoice maker. Create professional invoices instantly with PDF download, VAT calculation, and multiple currencies. No registration required - start now!",
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
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Invoice.wiki - Free Online Invoice Maker",
        type: "image/svg+xml",
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice.wiki - Free Invoice Generator",
    description:
      "Create and download invoices online as PDF. No sign-up required.",
    images: ["/images/twitter-card.svg"]
  }
}

export default function HomePage() {
  return (
    <>
      <WebsiteJsonLd />
      <OrganizationJsonLd />
      <ProductJsonLd />
      <FaqJsonLd />

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[72px] sm:pt-[80px]">
          {/* Hero Section */}
          <section aria-labelledby="hero-heading" className="bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 id="hero-heading" className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                  <span className="text-foreground">Free Invoice Generator</span>
                  <br className="sm:hidden" />
                  <span className="text-blue-500"> Create PDF Invoices</span>
                </h1>
                <p className="text-lg sm:text-xl text-foreground/80 mb-8">
                  Use our free online invoice maker to create professional invoices for clients. Generate and download PDF invoices instantly. Ideal for freelancers, small business owners, and contractors. No sign-up or installation required — just fast, secure, and simple billing.
                </p>
                <Link href="/create-invoice" aria-label="Start creating your invoice now">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Create Invoice <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section aria-labelledby="features-heading" className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Why Choose Our Online Invoice Maker?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
                  <p className="text-foreground/80 dark:text-foreground">Generate invoices in seconds with our simple invoice generator. No learning curve.</p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure</h3>
                  <p className="text-foreground/80 dark:text-foreground">Your data stays on your device. We never store or track sensitive invoice data.</p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Installation</h3>
                  <p className="text-foreground/80 dark:text-foreground">Use our invoice creator right in your browser. No downloads or setup required.</p>
                </article>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section aria-labelledby="faq-heading" className="py-12 md:py-20 bg-muted">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
              <div className="space-y-6 text-foreground/90">
                <div>
                  <h3 className="font-semibold">Do I need to register to create invoices?</h3>
                  <p>No, our invoice generator is completely free and doesn’t require registration or login.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Can I download my invoice as PDF?</h3>
                  <p>Yes, you can instantly download your invoice as a professional PDF file.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Is this tool free?</h3>
                  <p>Yes, Invoice.wiki is a 100% free invoice maker for personal and commercial use.</p>
                </div>
                <div>
                  <h3 className="font-semibold">Does it support VAT?</h3>
                  <p>Yes, you can add VAT and tax values to your invoice easily.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section aria-labelledby="cta-heading" className="bg-background dark:bg-background border-t py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Ready to Create Your Invoice?</h2>
              <p className="text-lg sm:text-xl text-foreground/80 mb-8">
                No registration required. Start creating professional invoices online with our free invoice generator.
              </p>
              <Link href="/create-invoice" aria-label="Get started creating your invoice now">
                <Button size="lg" variant="default" className="bg-blue-600 hover:bg-blue-700">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
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
