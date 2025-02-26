"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { useForm, useFieldArray, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { format } from "date-fns"
import { Plus, Trash2, Eye, EyeOff, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateInvoicePDF } from "@/app/utils/generate-pdf"
import { currencies } from "@/app/utils/currencies"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ErrorBoundary } from "react-error-boundary"
import { TermsDialog } from "@/components/TermsDialog"
import { invoiceFormSchema } from "@/lib/schemas"
import { useMediaQuery } from "@/hooks/useMediaQuery"

const paymentMethods = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash", label: "Cash" },
  { value: "credit_card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
]

interface FieldVisibility {
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

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

const CreateInvoiceForm = () => {
  const [nonce, setNonce] = useState("")

  useEffect(() => {
    // Fetch the nonce from the custom header
    const headerNonce = document.querySelector('meta[name="x-nonce"]')?.getAttribute("content")
    if (headerNonce) {
      setNonce(headerNonce)
    }
  }, [])

  const isMobile = useMediaQuery("(max-width: 768px)")

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldVisibility, setFieldVisibility] = useState<FieldVisibility>({
    sellerCompanyId: true,
    sellerVatId: true,
    sellerEmail: true,
    sellerWebsite: true,
    buyerCompanyId: true,
    buyerVatId: true,
    buyerEmail: true,
    buyerWebsite: true,
    referenceNumber: true,
    customerReferenceNumber: true,
    orderNumber: true,
    bankAccount: true,
    iban: true,
    swift: true,
  })
  const [termsDialogOpen, setTermsDialogOpen] = useState(false)
  const [isVerifyingRecaptcha, setIsVerifyingRecaptcha] = useState(false)

  const toggleFieldVisibility = (field: keyof FieldVisibility) => {
    setFieldVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      sellerCompanyName: "",
      sellerAddress: "",
      sellerCompanyId: "",
      sellerVatId: "",
      sellerEmail: "",
      sellerWebsite: "",
      buyerCompanyName: "",
      buyerAddress: "",
      buyerCompanyId: "",
      buyerVatId: "",
      buyerEmail: "",
      buyerWebsite: "",
      invoiceNumber: "",
      issueDate: new Date(),
      dueDate: new Date(),
      currency: "USD",
      referenceNumber: "",
      customerReferenceNumber: "",
      orderNumber: "",
      paymentMethod: "bank_transfer",
      bankAccount: "",
      iban: "",
      swift: "",
      items: [{ name: "", quantity: 1, price: 0, vatRate: 0 }],
      notes: "",
      isPaid: false,
      termsAccepted: false,
    },
  })

  const { control, handleSubmit, watch } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const items = watch("items")
  const paymentMethod = watch("paymentMethod")
  const isPaid = watch("isPaid")
  const currency = watch("currency")

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const itemTotal = item.quantity * item.price
      const vatAmount = (itemTotal * item.vatRate) / 100
      return sum + itemTotal + vatAmount
    }, 0)
  }, [items])

  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const executeRecaptcha = useCallback(async () => {
    if (typeof window !== "undefined" && (window as any).grecaptcha) {
      try {
        setIsVerifyingRecaptcha(true)
        const token = await (window as any).grecaptcha.execute(
          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          { action: "submit" }
        )
        setRecaptchaToken(token)
        setIsVerifyingRecaptcha(false)
      } catch (error) {
        console.error("reCAPTCHA execution failed:", error)
        setIsVerifyingRecaptcha(false)
        setError("Failed to verify reCAPTCHA. Please try again.")
      }
    }
  }, [])  

  const onSubmit = useCallback(
    async (data: InvoiceFormValues) => {
      try {
        setError(null)
        setSuccess(false)

        if (!isMobile) {
          if (!recaptchaToken) {
            await executeRecaptcha()
            return
          }

          console.log("Sending reCAPTCHA verification request")
          console.log("reCAPTCHA token:", recaptchaToken)
          const recaptchaResponse = await fetch("/api/verify-recaptcha", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: recaptchaToken }),
          })

          console.log("reCAPTCHA response status:", recaptchaResponse.status)
          console.log("reCAPTCHA response headers:", recaptchaResponse.headers)

          if (!recaptchaResponse.ok) {
            const errorText = await recaptchaResponse.text()
            console.error("reCAPTCHA verification failed:", errorText)
            throw new Error(`reCAPTCHA verification failed: ${errorText}`)
          }

          const recaptchaResult = await recaptchaResponse.json()
          console.log("reCAPTCHA verification result:", recaptchaResult)

          if (!recaptchaResult.success) {
            throw new Error("reCAPTCHA verification failed. Please try again.")
          }

          console.log("reCAPTCHA verification successful")
        }

        // Continue with the existing form submission logic
        const pdfData = {
          ...data,
          total,
          seller: {
            companyName: data.sellerCompanyName,
            address: data.sellerAddress,
            companyId: data.sellerCompanyId,
            vatId: data.sellerVatId,
            email: data.sellerEmail,
            website: data.sellerWebsite,
          },
          buyer: {
            companyName: data.buyerCompanyName,
            address: data.buyerAddress,
            companyId: data.buyerCompanyId,
            vatId: data.buyerVatId,
            email: data.buyerEmail,
            website: data.buyerWebsite,
          },
          invoice: {
            number: data.invoiceNumber,
            issueDate: data.issueDate,
            dueDate: data.dueDate,
            currency: data.currency,
            referenceNumber: data.referenceNumber,
            customerReferenceNumber: data.customerReferenceNumber,
            orderNumber: data.orderNumber,
          },
          payment: {
            method: data.paymentMethod,
            bankAccount: data.bankAccount,
            iban: data.iban,
            swift: data.swift,
          },
        }

        const pdfBlob = await generateInvoicePDF(pdfData)

        if (!pdfBlob) {
          throw new Error("Failed to generate PDF")
        }

        const blob = new Blob([pdfBlob.output("blob")], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `invoice-${data.invoiceNumber}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        setSuccess(true)
        form.reset()
        setRecaptchaToken(null) // Reset the token after successful submission
      } catch (err) {
        console.error("Error in form submission:", err)
        setError(err instanceof Error ? err.message : "Failed to submit form")
      }
    },
    [form, total, recaptchaToken, executeRecaptcha, isMobile],
  )

  useEffect(() => {
    executeRecaptcha()
  }, [executeRecaptcha])

  return (
    <ErrorBoundary
      fallback={
        <Alert variant="destructive">
          <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
        </Alert>
      }
    >
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <Header />
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          <div className="text-left mb-8">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Create Invoice</h1>
            <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Fill out the form below to create a new invoice.
            </p>
          </div>

          <div className="flex justify-center">
            <FormProvider {...form}>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
                  {/* Rest of the form content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Seller Information */}
                    <Card className="card-content">
                      <CardHeader>
                        <CardTitle>Seller Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={control}
                          name="sellerCompanyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name *</FormLabel>
                              <FormControl>
                                <Input {...field} maxLength={100} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="sellerAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address *</FormLabel>
                              <FormControl>
                                <Input {...field} maxLength={250} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="sellerCompanyId"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Company ID</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("sellerCompanyId")}
                                >
                                  {fieldVisibility.sellerCompanyId ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.sellerCompanyId ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.sellerCompanyId && <Input {...field} maxLength={40} />}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="sellerVatId"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>VAT ID</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("sellerVatId")}
                                >
                                  {fieldVisibility.sellerVatId ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.sellerVatId ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.sellerVatId && <Input {...field} maxLength={43} />}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="sellerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Email</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("sellerEmail")}
                                >
                                  {fieldVisibility.sellerEmail ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.sellerEmail ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.sellerEmail && <Input {...field} maxLength={90} />}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="sellerWebsite"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Website</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("sellerWebsite")}
                                >
                                  {fieldVisibility.sellerWebsite ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.sellerWebsite ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.sellerWebsite && (
                                  <Input
                                    {...field}
                                    maxLength={60}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/^(https?:\/\/)/, "")
                                      field.onChange(value)
                                    }}
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>

                    {/* Buyer Information */}
                    <Card className="card-content">
                      <CardHeader>
                        <CardTitle>Buyer Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <FormField
                          control={control}
                          name="buyerCompanyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name *</FormLabel>
                              <FormControl>
                                <Input {...field} maxLength={100} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="buyerAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address *</FormLabel>
                              <FormControl>
                                <Input {...field} maxLength={250} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="buyerCompanyId"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Company ID</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("buyerCompanyId")}
                                >
                                  {fieldVisibility.buyerCompanyId ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.buyerCompanyId ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.buyerCompanyId && <Input {...field} maxLength={40} />}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="buyerVatId"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>VAT ID</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("buyerVatId")}
                                >
                                  {fieldVisibility.buyerVatId ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.buyerVatId ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.buyerVatId && <Input {...field} maxLength={43} />}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="buyerEmail"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Email</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("buyerEmail")}
                                >
                                  {fieldVisibility.buyerEmail ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.buyerEmail ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.buyerEmail && <Input {...field} maxLength={90} />}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="buyerWebsite"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Website</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("buyerWebsite")}
                                >
                                  {fieldVisibility.buyerWebsite ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.buyerWebsite ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.buyerWebsite && (
                                  <Input
                                    {...field}
                                    maxLength={60}
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/^(https?:\/\/)/, "")
                                      field.onChange(value)
                                    }}
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* Invoice Details */}
                  <Card className="card-content">
                    <CardHeader>
                      <CardTitle>Invoice Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"} gap-4`}>
                        <FormField
                          control={control}
                          name="invoiceNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Invoice Number *</FormLabel>
                              <FormControl>
                                <Input {...field} maxLength={30} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="issueDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Issue Date *</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  value={format(field.value, "yyyy-MM-dd")}
                                  onChange={(e) => field.onChange(new Date(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="dueDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Due Date *</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  value={format(field.value, "yyyy-MM-dd")}
                                  onChange={(e) => field.onChange(new Date(e.target.value))}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className="max-h-[200px] overflow-y-auto">
                                  {currencies.map((currency) => (
                                    <SelectItem key={currency.code} value={currency.code}>
                                      {currency.code} - {currency.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Information */}
                  <Card className="bg-blue-50 card-content">
                    <CardHeader>
                      <CardTitle>Payment Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
                        <FormField
                          control={control}
                          name="referenceNumber"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Reference Number</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("referenceNumber")}
                                >
                                  {fieldVisibility.referenceNumber ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.referenceNumber ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.referenceNumber && <Input {...field} maxLength={35} />}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="customerReferenceNumber"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Customer Reference Number</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("customerReferenceNumber")}
                                >
                                  {fieldVisibility.customerReferenceNumber ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.customerReferenceNumber ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.customerReferenceNumber && <Input {...field} maxLength={35} />}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="orderNumber"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex justify-between items-center">
                                <FormLabel>Order Number</FormLabel>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleFieldVisibility("orderNumber")}
                                >
                                  {fieldVisibility.orderNumber ? (
                                    <EyeOff className="h-4 w-4 mr-2" />
                                  ) : (
                                    <Eye className="h-4 w-4 mr-2" />
                                  )}
                                  {fieldVisibility.orderNumber ? "Hide" : "Show"}
                                </Button>
                              </div>
                              <FormControl>
                                {fieldVisibility.orderNumber && <Input {...field} maxLength={35} />}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Payment Method</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select payment method" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {paymentMethods.map((method) => (
                                    <SelectItem key={method.value} value={method.value}>
                                      {method.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {paymentMethod === "bank_transfer" && (
                          <>
                            <FormField
                              control={control}
                              name="bankAccount"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex justify-between items-center">
                                    <FormLabel>Bank Account</FormLabel>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleFieldVisibility("bankAccount")}
                                    >
                                      {fieldVisibility.bankAccount ? (
                                        <EyeOff className="h-4 w-4 mr-2" />
                                      ) : (
                                        <Eye className="h-4 w-4 mr-2" />
                                      )}
                                      {fieldVisibility.bankAccount ? "Hide" : "Show"}
                                    </Button>
                                  </div>
                                  <FormControl>
                                    {fieldVisibility.bankAccount && <Input {...field} maxLength={35} />}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={control}
                              name="iban"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex justify-between items-center">
                                    <FormLabel>IBAN</FormLabel>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleFieldVisibility("iban")}
                                    >
                                      {fieldVisibility.iban ? (
                                        <EyeOff className="h-4 w-4 mr-2" />
                                      ) : (
                                        <Eye className="h-4 w-4 mr-2" />
                                      )}
                                      {fieldVisibility.iban ? "Hide" : "Show"}
                                    </Button>
                                  </div>
                                  <FormControl>
                                    {fieldVisibility.iban && <Input {...field} maxLength={34} />}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={control}
                              name="swift"
                              render={({ field }) => (
                                <FormItem>
                                  <div className="flex justify-between items-center">
                                    <FormLabel>SWIFT/BIC</FormLabel>
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => toggleFieldVisibility("swift")}
                                    >
                                      {fieldVisibility.swift ? (
                                        <EyeOff className="h-4 w-4 mr-2" />
                                      ) : (
                                        <Eye className="h-4 w-4 mr-2" />
                                      )}
                                      {fieldVisibility.swift ? "Hide" : "Show"}
                                    </Button>
                                  </div>
                                  <FormControl>
                                    {fieldVisibility.swift && <Input {...field} maxLength={11} />}
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Notes */}
                  <Card className="card-content">
                    <CardHeader>
                      <CardTitle>Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Notes (max 210 characters)</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                maxLength={210}
                                onChange={(e) => {
                                  let value = e.target.value
                                  // Insert line break every 105 characters
                                  value = value.replace(/(.{105})/g, "$1\n")
                                  field.onChange(value)
                                }}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  <Card className="card-content">
                    <CardHeader>
                      <CardTitle>Payment Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={control}
                        name="isPaid"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>Mark as Paid</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>

                  {/* Items */}
                  <Card className="card-content">
                    <CardHeader>
                      <CardTitle>Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {fields.map((field, index) => (
                          <div key={field.id} className="space-y-4">
                            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4"} gap-4`}>
                              <FormField
                                control={control}
                                name={`items.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Item Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} maxLength={130} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={control}
                                name={`items.${index}.quantity`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Quantity</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => {
                                          const value = Math.min(
                                            Math.max(1, Number.parseInt(e.target.value) || 1),
                                            999999,
                                          )
                                          field.onChange(value)
                                        }}
                                        min={1}
                                        max={999999}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={control}
                                name={`items.${index}.price`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => {
                                          const value = Math.min(
                                            Math.max(0, Number.parseFloat(e.target.value) || 0),
                                            999999999,
                                          )
                                          field.onChange(value)
                                        }}
                                        min={0}
                                        max={999999999}
                                        step={0.01}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={control}
                                name={`items.${index}.vatRate`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>VAT Rate (%)</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) => {
                                          const value = Math.min(
                                            Math.max(0, Number.parseFloat(e.target.value) || 0),
                                            100,
                                          )
                                          field.onChange(value)
                                        }}
                                        min={0}
                                        max={100}
                                        step={0.1}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => remove(index)}
                              className="w-32"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => append({ name: "", quantity: 1, price: 0, vatRate: 0 })}
                          disabled={fields.length >= 10}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                        {fields.length >= 10 && (
                          <p className="text-sm text-muted-foreground mt-2">Maximum number of items (10) reached.</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className={`flex ${isMobile ? "flex-col" : "flex-row"} items-center gap-4 mt-8`}>
                    <FormField
                      control={form.control}
                      name="termsAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the{" "}
                              <button
                                type="button"
                                onClick={() => setTermsDialogOpen(true)}
                                className="text-blue-500 hover:underline"
                              >
                                invoice.wiki terms and conditions
                              </button>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full max-w-md bg-blue-400 hover:bg-blue-500 text-white"
                      size="lg"
                      disabled={!form.watch("termsAccepted") || !recaptchaToken || isVerifyingRecaptcha}
                    >
                      {isVerifyingRecaptcha ? "Verifying..." : "Generate Invoice"}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  <TermsDialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen} />

                  {success && (
                    <Alert className="mt-4">
                      <AlertDescription>Invoice created successfully!</AlertDescription>
                    </Alert>
                  )}
                  {error && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="mt-8 text-right space-y-2">
                    {total > 0 && (
                      <>
                        <div className="flex flex-col items-end">
                          <div className="grid grid-cols-2 gap-x-4 text-right">
                            <span className="text-gray-600">Net Total:</span>
                            <span className="font-medium">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(
                                items.reduce((sum, item) => sum + item.quantity * item.price, 0),
                              )}
                            </span>

                            <span className="text-gray-600">VAT Total:</span>
                            <span className="font-medium">
                              {new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(
                                items.reduce((sum, item) => {
                                  const netPrice = item.quantity * item.price
                                  return sum + (netPrice * item.vatRate) / 100
                                }, 0),
                              )}
                            </span>

                            <span className="text-gray-600 font-bold">Total Due:</span>
                            <span className="font-bold">
                              {isPaid
                                ? "PAID!"
                                : new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(
                                    total,
                                  )}
                            </span>
                          </div>

                          {isPaid && (
                            <div className="text-red-500 font-bold mt-2 flex items-center">
                              <span className="text-xl">PAID!</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </form>
              </Form>
            </FormProvider>
          </div>
        </div>
        <Footer />
      </section>
      {/* Add nonce to any inline styles */}
      <style nonce={nonce}></style>
    </ErrorBoundary>
  )
}

export default CreateInvoiceForm

