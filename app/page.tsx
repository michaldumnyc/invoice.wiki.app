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
  FaqJsonLd,
  InvoiceExampleImageJsonLd
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
      "Create professional invoices instantly. Free PDF download, no registration needed.",
    images: ["/images/twitter-card.png"]
  }
}

export default function HomePage() {
  return (
    <>
      <WebsiteJsonLd />
      <OrganizationJsonLd />
      <ProductJsonLd />
      <FaqJsonLd />
      <InvoiceExampleImageJsonLd />

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
                  Use our comprehensive free online invoice maker to create professional invoices for clients with advanced features including automatic VAT calculations, multi-currency support, and instant PDF generation. Generate and download perfectly formatted PDF invoices instantly without any registration requirements. Our platform is specifically designed for freelancers, small business owners, independent contractors, and entrepreneurs who need a reliable, fast, secure, and completely free billing solution that works seamlessly across all devices and browsers.
                </p>
                <Link href="/create-invoice" aria-label="Start creating your professional invoice now">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    Create Invoice Now <ArrowRight className="ml-2 h-5 w-5" />
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
                  <h3 className="text-xl font-semibold mb-2">Lightning-Fast Invoice Generation</h3>
                  <p className="text-foreground/80 dark:text-foreground">Generate professional invoices in seconds with our streamlined <Link href="/create-invoice" className="text-blue-600 hover:underline">invoice generator interface</Link> that requires zero learning curve and delivers instant results.</p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Bank-Level Security & Privacy</h3>
                  <p className="text-foreground/80 dark:text-foreground">Your sensitive invoice data stays completely secure on your device and never gets stored on our servers, ensuring absolute privacy. Learn more about our <Link href="/privacy-policy" className="text-blue-600 hover:underline">privacy protection measures</Link>.</p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Zero Installation Required</h3>
                  <p className="text-foreground/80 dark:text-foreground">Access our powerful invoice creator directly in your browser without downloading software or creating accounts. Discover more <Link href="/about" className="text-blue-600 hover:underline">about our platform features</Link> and capabilities.</p>
                </article>
              </div>
            </div>
          </section>

          {/* Invoice Example Section */}
          <section aria-labelledby="example-heading" className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 id="example-heading" className="text-2xl sm:text-3xl font-bold text-center mb-4">
                    See What You'll Create
                  </h2>
                  <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
                    Generate professional invoices that impress clients and ensure prompt payment. Our free invoice generator creates clean, modern invoices with all essential business details, automatic calculations, and perfect formatting.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  {/* Invoice Preview Image */}
                  <div className="order-2 lg:order-1">
                    <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 sm:p-6 border dark:border-gray-700">
                      <img 
                        src="/images/invoice-example.png"
                        alt="Professional invoice example created with Invoice.wiki free invoice generator showing company details, itemized services, VAT calculations, and payment information"
                        className="w-full h-auto rounded border"
                        loading="lazy"
                        width="800"
                        height="1000"
                      />
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                        PDF Ready
                      </div>
                    </div>
                  </div>
                  
                  {/* Benefits Content */}
                  <div className="order-1 lg:order-2 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">Clean Professional Design</h3>
                          <p className="text-foreground/80">Every invoice generated maintains consistent, professional formatting that reflects well on your business and builds client trust.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">Automatic Calculations</h3>
                          <p className="text-foreground/80">VAT rates, subtotals, and grand totals are calculated automatically with precision, eliminating manual errors and saving valuable time.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">Complete Business Information</h3>
                          <p className="text-foreground/80">Include all necessary business details: company information, addresses, VAT IDs, payment terms, and contact information for complete transparency.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1">
                          <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-foreground">Instant PDF Download</h3>
                          <p className="text-foreground/80">Download your completed invoices as high-quality PDF files that are ready for printing, emailing, or digital storage with perfect formatting preservation.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Link href="/create-invoice" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Try It Now - Free →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section aria-labelledby="faq-heading" className="py-12 md:py-20 bg-muted">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
              <div className="space-y-6 text-foreground/90">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Do I need to register to create invoices?</h3>
                  <p className="leading-relaxed">Absolutely not! Our invoice generator is completely free and doesn't require any registration, login, or account creation whatsoever. Simply visit our <Link href="/create-invoice" className="text-blue-600 hover:underline">invoice creation page</Link> and start building professional invoices immediately without providing personal information.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I download my invoice as PDF?</h3>
                  <p className="leading-relaxed">Yes, you can instantly download your professionally formatted invoice as a high-quality PDF file that's ready for sending to clients or printing for your business records. Our PDF generation system ensures perfect formatting across all devices and platforms.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Is this tool completely free?</h3>
                  <p className="leading-relaxed">Yes, Invoice.wiki is a 100% free invoice maker for both personal and commercial use with no hidden fees, subscription costs, or premium features. We believe professional invoice generation should be accessible to everyone, from individual freelancers to growing businesses.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Does it support VAT and tax calculations?</h3>
                  <p className="leading-relaxed">Absolutely! You can easily add VAT rates, tax percentages, and various fee structures to your invoices with automatic calculations. Our system supports multiple tax types and handles complex billing scenarios commonly required in different countries and industries.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">What currencies are supported?</h3>
                  <p className="leading-relaxed">Our invoice generator supports 40+ international currencies including USD, EUR, GBP, CAD, AUD, CHF, JPY, SEK, NOK, DKK, PLN, CZK, UAH, CNY, INR, SGD, HKD, NZD, BRL, MXN, ZAR, TRY, ILS, AED, THB, and many others. You can select your preferred currency and the system will format amounts according to standard financial conventions for that currency, ensuring professional invoices for clients worldwide.</p>
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
                    The invoice maker supports multiple international currencies, sophisticated VAT calculations, flexible payment terms, customizable due dates, and detailed line items with quantities, rates, and comprehensive descriptions. You can easily add your company logo, customize brand colors, include detailed business information, and create professional-looking invoices that are generated as high-quality PDF files suitable for sending directly to clients or printing for your permanent business records.
                  </p>
                  <p className="text-lg leading-relaxed">
                    Security and privacy are our highest priorities when handling your sensitive business and financial information. Your invoice data is processed entirely locally in your browser using advanced client-side encryption and never stored on our servers, ensuring your sensitive business information remains completely private and secure. Start <Link href="/create-invoice" className="text-blue-600 hover:underline">creating professional invoices</Link> today without any registration requirements or subscription fees.
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
              <p className="text-lg sm:text-xl text-foreground/80 mb-8">
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
