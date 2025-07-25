import type * as z from "zod"
import { invoiceFormSchema } from "@/lib/schemas"

export interface FieldVisibility {
  sellerCompanyId: boolean
  sellerVatId: boolean
  sellerEmail: boolean
  sellerWebsite: boolean
  buyerCompanyId: boolean
  buyerVatId: boolean
  buyerEmail: boolean
  buyerWebsite: boolean
  referenceNumber: boolean
  customerReferenceNumber: boolean
  orderNumber: boolean
  bankAccount: boolean
  iban: boolean
  swift: boolean
}

// Use the type inferred from the schema to ensure compatibility
export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

export interface InvoiceItem {
  name: string
  quantity: number
  price: number
  vatRate: number
}

export interface InvoiceTotals {
  net: number
  vat: number
  grand: number
} 