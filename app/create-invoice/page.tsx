export const revalidate = 86400 // 24h - static shell, form is client-side

import dynamic from "next/dynamic"
import { Suspense } from "react"
import Link from "next/link"
import LoadingSpinner from "@/components/LoadingSpinner"
import Footer from "@/components/Footer"
import type { Metadata } from "next"
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
} from "../components/JsonLd"

export const metadata: Metadata = {
  title: "Create Invoice - Free Online Invoice Generator",
  description:
    "Create professional invoices online for free. Add items, calculate taxes, set due dates, and download as PDF. No registration required.",
  alternates: {
    canonical: "https://invoice.wiki/create-invoice",
  },
  openGraph: {
    title: "Create Invoice - Free Online Invoice Generator",
    description:
      "Create invoices with tax support and PDF export. No login needed.",
    url: "https://invoice.wiki/create-invoice",
    siteName: "Invoice.wiki",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Create invoice instantly with Invoice.wiki",
        type: "image/png",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Invoice - Free Invoice Maker",
    description:
      "Generate invoices online with PDF export and multi-currency support.",
    images: ["/images/twitter-card.png"],

  },
  other: {
    "article:published_time": "2025-02-04T00:00:00Z",
    "article:modified_time": "2025-12-07T00:00:00Z",
    "datePublished": "2025-02-04",
    "dateModified": "2025-12-07"
  }
}

const CreateInvoiceForm = dynamic(
  () => import("@/components/CreateInvoiceForm"),
  {
    loading: () => <LoadingSpinner />,
  }
)

export default function CreateInvoicePage() {
  // ISO 8601 metadata for the page
  const pageCreationDate = "2025-02-04T12:00:00.000Z"
  const pageModificationDate = "2025-12-07T12:00:00.000Z"

  const breadcrumbItems = [
    { name: "Home", url: "https://invoice.wiki" },
    { name: "Create Invoice", url: "https://invoice.wiki/create-invoice" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WebPageJsonLd 
        url="https://invoice.wiki/create-invoice"
        name="Create Invoice - Free Online Invoice Generator"
        description="Generate professional invoices with PDF export. Use our free invoice maker to create professional business invoices with PDF download. No registration required."
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />

      {/* Main content */}
      <main id="main-content" className="flex-1 pt-[72px] sm:pt-[80px]">
        <section className="container max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">
            Create Invoice
          </h1>
          <p className="text-base sm:text-lg text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate professional invoices with PDF export. Use our free invoice maker to create professional business invoices with PDF download. No registration required. Your data stays private - see our <Link href="/privacy-policy" className="text-primary underline hover:no-underline">privacy policy</Link>. 
            Need help? Check our <Link href="/faq" className="text-primary underline hover:no-underline">FAQ section</Link>.
          </p>

          {/* Invoice Form */}
          <Suspense fallback={<LoadingSpinner />}>
            <CreateInvoiceForm />
          </Suspense>
        </section>
      </main>

      {/* FAQ Section */}
      <section className="w-full bg-muted/50 py-12">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-3">Is this really free?</h3>
              <p className="text-muted-foreground">Yes! No hidden fees, no registration required, no subscription costs. Create unlimited professional invoices completely free.</p>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-3">Is my data secure?</h3>
              <p className="text-muted-foreground">Absolutely. All processing happens locally in your browser. Your sensitive business data never leaves your device or gets stored on our servers.</p>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-3">What languages are supported?</h3>
              <p className="text-muted-foreground">We support 6 languages: English, German, Czech, Polish, Slovak, and Ukrainian. Perfect for international business.</p>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-3">Can I customize colors?</h3>
              <p className="text-muted-foreground">Yes! Choose from 10 professional accent colors to match your brand identity and create consistent invoices.</p>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-3">Does it calculate taxes automatically?</h3>
              <p className="text-muted-foreground">Yes! Enter any tax rate. Totals auto-calculate.</p>
            </div>
            
            <div className="bg-card rounded-lg border p-6">
              <h3 className="font-semibold text-lg mb-3">How quickly can I create an invoice?</h3>
              <p className="text-muted-foreground">Create professional invoices quickly. Fill in the details, preview, and download your PDF instantly.</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link 
              href="/faq"
              className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All FAQs →
            </Link>
          </div>
        </div>
      </section>

      {/* Full-width footer */}
      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  )
}
