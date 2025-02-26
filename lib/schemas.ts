import * as z from "zod"
import DOMPurify from "isomorphic-dompurify"

const sanitizeWebsite = (url: string): string => {
  return url.replace(/^(https?:\/\/)/, "").slice(0, 60)
}

const sanitizeString = (value: string) => DOMPurify.sanitize(value)

export const invoiceFormSchema = z.object({
  sellerCompanyName: z.string().max(100).transform(sanitizeString),
  sellerAddress: z.string().max(250).transform(sanitizeString),
  sellerCompanyId: z
    .string()
    .max(40)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  sellerVatId: z
    .string()
    .max(43)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  sellerEmail: z
    .string()
    .email()
    .max(90)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? sanitizeString(v) : v)),
  sellerWebsite: z
    .string()
    .max(60)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  buyerCompanyName: z.string().max(100).transform(sanitizeString),
  buyerAddress: z.string().max(250).transform(sanitizeString),
  buyerCompanyId: z
    .string()
    .max(40)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  buyerVatId: z
    .string()
    .max(43)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  buyerEmail: z
    .string()
    .email()
    .max(90)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? sanitizeString(v) : v)),
  buyerWebsite: z
    .string()
    .max(60)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  invoiceNumber: z.string().max(30).transform(sanitizeString),
  issueDate: z.date(),
  dueDate: z.date(),
  currency: z.string().max(3).transform(sanitizeString),
  referenceNumber: z
    .string()
    .max(30)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  customerReferenceNumber: z
    .string()
    .max(30)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  orderNumber: z
    .string()
    .max(30)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  paymentMethod: z.string().max(20).transform(sanitizeString),
  bankAccount: z
    .string()
    .max(35)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  iban: z
    .string()
    .max(34)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  swift: z
    .string()
    .max(11)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  items: z
    .array(
      z.object({
        name: z.string().max(130).transform(sanitizeString),
        quantity: z.number().int().min(1).max(999999),
        price: z.number().min(0).max(999999999),
        vatRate: z.number().min(0).max(100),
      }),
    )
    .min(1)
    .max(10),
  notes: z
    .string()
    .max(210)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : v)),
  isPaid: z.boolean(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
})

