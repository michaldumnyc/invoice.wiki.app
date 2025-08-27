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
      "Create professional invoices instantly. Free PDF download, no registration needed.",
    images: ["/images/twitter-card.png"],
    site: "@invoice_wiki",
    creator: "@invoice_wiki",
  },
  other: {
    "article:published_time": "2025-02-04T00:00:00Z",
    "article:modified_time": "2025-08-12T00:00:00Z",
    "datePublished": "2025-02-04",
    "dateModified": "2025-08-12"
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
      />
      <WebsiteJsonLd />
      <OrganizationJsonLd />
      <EnhancedSoftwareApplicationJsonLd />
      <FaqJsonLd />
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
                  Use our comprehensive <strong>free online invoice maker</strong> to create professional invoices for clients with advanced features including <strong>automatic VAT calculations</strong>, multi-currency support, and <strong>instant PDF generation</strong>. Generate and download perfectly formatted PDF invoices instantly without any registration requirements. Our platform is specifically designed for freelancers, small business owners, independent contractors, and entrepreneurs who need a reliable, fast, secure, and completely <strong>free billing solution</strong> that works seamlessly across all devices and browsers.
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
                  <p className="text-muted-foreground">Choose colors, language, and VAT settings. Preview your invoice to ensure everything looks perfect.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                    3️⃣
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Download PDF</h3>
                  <p className="text-muted-foreground">Generate and download your professional invoice as a PDF. Ready to send to clients or print for records.</p>
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
                  <h3 className="text-xl font-semibold mb-2">Generate Invoice in Seconds</h3>
                  <p className="text-muted-foreground">Generate <strong>professional invoices in seconds</strong> with our streamlined invoice generator interface that requires zero learning curve and delivers instant results.</p>
                </article>
                <article className="text-center p-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    🔒
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Bank-Level Security & Privacy</h3>
                  <p className="text-muted-foreground">Your sensitive invoice data stays <strong>completely secure on your device</strong> and never gets stored on our servers, ensuring absolute privacy. Learn more about our <Link href="/privacy-policy" className="text-primary underline hover:no-underline">privacy protection measures</Link>.</p>
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

          {/* Testimonials Section */}
          <section aria-labelledby="testimonials-heading" className="py-12 md:py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 id="testimonials-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                What Our Users Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-card rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">MS</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Maria Schmidt</h4>
                      <p className="text-sm text-muted-foreground">Freelance Designer, Germany</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Perfect for my freelance business! Creates professional invoices in German with proper VAT calculations. No registration needed - exactly what I was looking for."
                  </p>
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                </div>
                
                <div className="bg-card rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-green-600 dark:text-green-400 font-semibold">PK</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Petr Krejčí</h4>
                      <p className="text-sm text-muted-foreground">IT Consultant, Prague</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Skvělé! Finally found an invoice generator that supports Czech language and DPH calculations. Clean interface, fast PDF generation. Highly recommended!"
                  </p>
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                </div>
                
                <div className="bg-card rounded-lg border p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold">AJ</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">Anna Johnson</h4>
                      <p className="text-sm text-muted-foreground">Small Business Owner, UK</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "Saves me hours every month! Multi-currency support is excellent for my international clients. The privacy-first approach gives me confidence in using it."
                  </p>
                  <div className="flex text-yellow-400">
                    {"★".repeat(5)}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Comparison Section */}
          <section aria-labelledby="comparison-heading" className="py-12 md:py-20">
            <div className="container mx-auto px-4">
              <h2 id="comparison-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Why Choose Invoice.wiki vs Other Solutions?
              </h2>
              <div className="max-w-4xl mx-auto">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-border rounded-lg">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border border-border p-4 text-left">Feature</th>
                        <th className="border border-border p-4 text-center bg-primary text-primary-foreground">Invoice.wiki</th>
                        <th className="border border-border p-4 text-center">Other Generators</th>
                        <th className="border border-border p-4 text-center">Accounting Software</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-border p-4 font-medium">Cost</td>
                        <td className="border border-border p-4 text-center text-green-600 font-semibold">100% Free</td>
                        <td className="border border-border p-4 text-center text-muted-foreground">Limited Free / Paid</td>
                        <td className="border border-border p-4 text-center text-muted-foreground">$15-50/month</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-4 font-medium">Registration Required</td>
                        <td className="border border-border p-4 text-center text-green-600 font-semibold">No ✓</td>
                        <td className="border border-border p-4 text-center text-red-600">Yes ✗</td>
                        <td className="border border-border p-4 text-center text-red-600">Yes ✗</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-4 font-medium">Data Privacy</td>
                        <td className="border border-border p-4 text-center text-green-600 font-semibold">Local Only ✓</td>
                        <td className="border border-border p-4 text-center text-red-600">Stored on Server ✗</td>
                        <td className="border border-border p-4 text-center text-red-600">Cloud Storage ✗</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-4 font-medium">Multiple Languages</td>
                        <td className="border border-border p-4 text-center text-green-600 font-semibold">6 Languages ✓</td>
                        <td className="border border-border p-4 text-center text-muted-foreground">English Only</td>
                        <td className="border border-border p-4 text-center text-muted-foreground">Limited</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-4 font-medium">VAT Compliance</td>
                        <td className="border border-border p-4 text-center text-green-600 font-semibold">EU Ready ✓</td>
                        <td className="border border-border p-4 text-center text-muted-foreground">Basic</td>
                        <td className="border border-border p-4 text-center text-green-600">Advanced ✓</td>
                      </tr>
                      <tr>
                        <td className="border border-border p-4 font-medium">Speed to Generate</td>
                        <td className="border border-border p-4 text-center text-green-600 font-semibold">&lt; 2 minutes ✓</td>
                        <td className="border border-border p-4 text-center text-muted-foreground">3-5 minutes</td>
                        <td className="border border-border p-4 text-center text-muted-foreground">5-10 minutes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-center mt-8">
                <Link href="/create-invoice" className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  Try Our Superior Solution →
                </Link>
              </div>
            </div>
          </section>

          {/* Resources Section */}
          <section aria-labelledby="resources-heading" className="py-12 md:py-20 bg-muted/50">
            <div className="container mx-auto px-4">
              <h2 id="resources-heading" className="text-2xl sm:text-3xl font-bold text-center mb-12">
                Invoice Resources & Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <Link href="/blog" className="group bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                    📝
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Blog & Tips</h3>
                  <p className="text-muted-foreground text-sm">Expert insights on invoicing, VAT compliance, and business billing best practices.</p>
                </Link>
                
                <Link href="/guides" className="group bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                    📚
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Step-by-Step Guides</h3>
                  <p className="text-muted-foreground text-sm">Comprehensive tutorials for mastering professional invoicing from basic to advanced.</p>
                </Link>
                

                
                <Link href="/faq" className="group bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                    ❓
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">FAQ & Support</h3>
                  <p className="text-muted-foreground text-sm">Get instant answers to common questions about invoicing and our generator.</p>
                </Link>
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
                  <p className="leading-relaxed">Absolutely not! Our invoice generator is completely free and doesn't require any registration, login, or account creation whatsoever. Simply visit our invoice creation page and start building professional invoices immediately without providing personal information.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I generate invoice as PDF instantly?</h3>
                  <p className="leading-relaxed">Yes, you can instantly download your professionally formatted invoice as a high-quality PDF file that's ready for sending to clients or printing for your business records. Our PDF generation system ensures perfect formatting across all devices and platforms.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Is this invoice generator completely free?</h3>
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
                <div>
                  <h3 className="font-semibold text-lg mb-2">Can I customize invoice colors and languages?</h3>
                  <p className="leading-relaxed">Yes! By popular demand, we've added customization options. Choose from 10 professional accent colors (Blue, Green, Red, Purple, Orange, Pink, Teal, Yellow, Slate, Black) to match your brand. Plus, generate invoices in 6 languages: English, German (Deutsch), Czech (Čeština), Polish (Polski), Slovak (Slovenčina), and Ukrainian (Українська) to serve international clients professionally.</p>
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
