import dynamic from "next/dynamic"
import { Suspense } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "../components/JsonLd"

export const metadata: Metadata = {
  title: "Create Invoice - Free Online Invoice Generator",
  description: "Create professional invoices online for free. Add items, calculate VAT, set due dates, and download as PDF. Perfect for freelancers and small businesses.",

  alternates: {
    canonical: "https://invoice.wiki/create-invoice",
  },
}

const CreateInvoiceForm = dynamic(() => import("@/components/CreateInvoiceForm"), {
  loading: () => <LoadingSpinner />,
})

export default function CreateInvoicePage() {
  const breadcrumbItems = [
    { name: "Home", url: "https://invoice.wiki" },
    { name: "Create Invoice", url: "https://invoice.wiki/create-invoice" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Suspense fallback={<LoadingSpinner />}>
        <div className="pt-20 sm:pt-24">
          {" "}
          {/* Increased padding-top for mobile */}
          <CreateInvoiceForm />
        </div>
      </Suspense>
    </div>
  )
}

