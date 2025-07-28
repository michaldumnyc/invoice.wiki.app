import dynamic from "next/dynamic"
import { Suspense } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"
import type { Metadata } from "next"
import {
  BreadcrumbJsonLd,
  WebsiteJsonLd,
  ProductJsonLd,
  OrganizationJsonLd
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
        url: "https://invoice.wiki/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Create invoice instantly with Invoice.wiki",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Invoice - Free Invoice Maker",
    description:
      "Generate invoices online with PDF export and multi-currency support.",
    images: ["https://invoice.wiki/images/og-image.svg"],
  },
}

const CreateInvoiceForm = dynamic(() => import("@/components/CreateInvoiceForm"), {
  loading: () => <LoadingSpinner />,
})

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

      <main className="flex-1 pt-[72px] sm:pt-[80px]">
        <section className="container max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-4xl font-bold text-center mb-6">
            Free Invoice Generator – Create & Download Your Invoice Now
          </h1>
          <p className="text-lg text-center text-foreground/80 mb-8">
            Use our free online invoice maker to generate professional invoices
            in seconds. Add multiple items, calculate VAT automatically, choose
            currencies, set payment terms, and export a polished PDF – no registration needed.
          </p>

          {/* Invoice Form */}
          <Suspense fallback={<LoadingSpinner />}>
            <CreateInvoiceForm />
          </Suspense>
        </section>
      </main>
    </div>
  )
}
