import dynamic from "next/dynamic"
import { Suspense } from "react"
import LoadingSpinner from "@/components/LoadingSpinner"

const CreateInvoiceForm = dynamic(() => import("@/components/CreateInvoiceForm"), {
  loading: () => <LoadingSpinner />,
})

export default function CreateInvoicePage() {
  return (
    <div className="min-h-screen flex flex-col">
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

