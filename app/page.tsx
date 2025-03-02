import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Metadata } from "next"
import React from "react"
import { WebsiteJsonLd } from "./components/JsonLd"

// Additional metadata for the home page
export const metadata: Metadata = {
  title: "Invoice.wiki - Free Online Invoice Generator | Create & Download Invoices",
  description: "Generate invoices online for free. No registration required. Secure, simple, and fast invoice generator with PDF download and VAT support.",
  alternates: {
    canonical: "https://invoice.wiki",
  },
};

export default function HomePage() {
  // JSON-LD markup for search engines (Schema.org)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Invoice.wiki",
    "url": "https://invoice.wiki",
    "description": "Free online invoice generator with PDF download and VAT support",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": "PDF invoices, VAT calculation, Multiple currencies, Customizable templates",
    "screenshot": "https://invoice.wiki/images/screenshot.png",
    "author": {
      "@type": "Organization",
      "name": "Invoice.wiki Team",
      "url": "https://invoice.wiki"
    }
  };

  return (
    <>
      <WebsiteJsonLd />
      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[72px] sm:pt-[80px]">
          {/* Hero Section */}
          <section aria-labelledby="hero-heading" className="bg-background py-12 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <h1 id="hero-heading" className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
                  <span className="text-foreground">Create Invoices </span>
                  <span className="text-blue-500">in</span>
                  <br className="sm:hidden" />
                  <span className="text-blue-600"> Seconds</span>
                </h1>
                <p className="text-lg sm:text-xl text-foreground/80 mb-8">
                  Free, simple, and secure invoice generator. No registration required.
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
              <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">Why Choose Invoice.wiki?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Fast & Easy</h3>
                  <p className="text-foreground/80 dark:text-foreground">Generate invoices in seconds with our intuitive interface.</p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure</h3>
                  <p className="text-foreground/80 dark:text-foreground">
                    Your data stays on your device. We don't store any sensitive information.
                  </p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Installation</h3>
                  <p className="text-foreground/80 dark:text-foreground">Works directly in your browser. No software installation required.</p>
                </article>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section aria-labelledby="cta-heading" className="bg-background dark:bg-background border-t py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
              <h2 id="cta-heading" className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Ready to Create Your Invoice?</h2>
              <p className="text-lg sm:text-xl text-foreground/80 mb-8">
                No registration required. Start generating invoices now.
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

