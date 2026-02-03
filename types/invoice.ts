import type { z } from "zod"
import type { invoiceFormSchema } from "@/lib/schemas"

export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

export type InvoiceFormData = {
  seller: {
    companyName: string
    address: string
    companyId?: string
    vatId?: string
    email?: string
    website?: string
  }
  buyer: {
    companyName: string
    address: string
    companyId?: string
    vatId?: string
    email?: string
    website?: string
  }
  invoice: {
    number: string
    issueDate: Date
    dueDate: Date
    currency: string
    referenceNumber?: string
    customerReferenceNumber?: string
    orderNumber?: string
  }
  payment: {
    method?: string
    bankAccount?: string
    iban?: string
    swift?: string
  }
  items: {
    name: string
    quantity: number
    price: number
    vatRate: number
  }[]
  notes?: string
  colorId: string
  languageId: string
  taxType: "vat" | "gst" | "sales_tax" | "none"
  showTax: boolean
  reverseCharge: boolean
  isPaid: boolean
  total: number
}
