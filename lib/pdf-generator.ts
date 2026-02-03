import type { InvoiceFormData } from "@/types/invoice"

/**
 * Lazy-loaded PDF generator to reduce initial bundle size
 * PDF generation libraries are heavy, so we load them only when needed
 */
export async function generateInvoicePDFLazy(data: InvoiceFormData) {
  // Dynamic import - loads PDF modules only when needed
  const { generateInvoicePDF } = await import("@/app/utils/generate-pdf")

  return generateInvoicePDF(data)
}

/**
 * Preload PDF generation modules (optional optimization)
 * Call this on user interaction (e.g., hover over download button)
 */
export function preloadPDFModules() {
  // Preload modules without executing
  import("@/app/utils/generate-pdf")
}
