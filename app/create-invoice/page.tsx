import dynamic from "next/dynamic"
import { Suspense } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"
import Footer from "@/components/Footer"
import type { Metadata } from "next"
import {
  BreadcrumbJsonLd,
  WebsiteJsonLd,
  ProductJsonLd,
  OrganizationJsonLd,
} from "../components/JsonLd"

export const metadata: Metadata = {
  title: "Create Invoice - Free Online Invoice Generator",
  description:
    "Create professional invoices online for free. Add items, calculate VAT, set due dates, and download as PDF. Perfect for freelancers and small businesses.",
  alternates: {
    canonical: "https://invoice.wiki/create-invoice",
  },
  openGraph: {
    title: "Create Invoice - Free Online Invoice Generator",
    description:
      "Create invoices with VAT support and PDF export. No login needed.",
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
}

const CreateInvoiceForm = dynamic(
  () => import("@/components/CreateInvoiceForm"),
  {
    loading: () => <LoadingSpinner />,
  }
)

export default function CreateInvoicePage() {
  const breadcrumbItems = [
    { name: "Home", url: "https://invoice.wiki" },
    { name: "Create Invoice", url: "https://invoice.wiki/create-invoice" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Structured Data */}
      <WebsiteJsonLd />
      <ProductJsonLd />
      <OrganizationJsonLd />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Main content */}
      <main className="flex-1 pt-[72px] sm:pt-[80px]">
        <section className="container max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-6">
            Create Invoice
          </h1>
          <p className="text-base sm:text-lg text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Generate professional invoices with PDF export. Use our free invoice maker to create professional business invoices with PDF download. No registration required.
          </p>

          {/* Invoice Form */}
          <Suspense fallback={<LoadingSpinner />}>
            <CreateInvoiceForm />
          </Suspense>
        </section>
      </main>

      {/* Full-width footer */}
      <footer className="w-full mt-auto">
        <Footer />
      </footer>
    </div>
  )
}
