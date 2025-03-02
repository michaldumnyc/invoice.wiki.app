import type { z } from "zod"
import type { invoiceFormSchema } from "@/lib/schemas"

export type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

export type InvoiceFormData = {
  sellerCompanyName: string
  sellerAddress: string
  sellerCompanyId?: string
  sellerVatId?: string
  sellerEmail?: string
  sellerWebsite?: string
  buyerCompanyName: string
  buyerAddress: string
  buyerCompanyId?: string
  buyerVatId?: string
  buyerEmail?: string
  buyerWebsite?: string
  invoiceNumber: string
  issueDate: Date
  dueDate: Date
  currency: string
  referenceNumber?: string
  customerReferenceNumber?: string
  orderNumber?: string
  paymentMethod?: string
  bankAccount?: string
  iban?: string
  swift?: string
  items: {
    name: string
    quantity: number
    price: number
    vatRate: number
  }[]
  notes?: string
  isPaid: boolean
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
  total: number
}

