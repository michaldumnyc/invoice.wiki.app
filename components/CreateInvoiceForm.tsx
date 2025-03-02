"use client"

import React from "react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { generateInvoicePDF } from "@/app/utils/generate-pdf"
import { currencies } from "@/app/utils/currencies"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { TermsDialog } from "@/components/TermsDialog"
import { invoiceFormSchema } from "@/lib/schemas"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { useToastProvider } from "@/components/ui/toast-provider"

// Import input sanitization functions
import {
  sanitizeInput,
  sanitizeEmail,
  sanitizeWebsite,
  sanitizeNumber,
} from "@/lib/security"

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

const CreateInvoiceForm: React.FC = () => {
  const { showToast } = useToastProvider()

  const isMobile = useMediaQuery("(max-width: 768px)")

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
  const [previewVisible, setPreviewVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Track if the reference number has been manually edited by the user
  const [manuallyEditedReference, setManuallyEditedReference] = useState(false)
  const [highlightedField, setHighlightedField] = useState<string | null>(null);

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

  const { control, handleSubmit, watch, setValue } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const items = watch("items")
  const paymentMethod = watch("paymentMethod")
  const isPaid = watch("isPaid")
  const currency = watch("currency")
  const invoiceNumber = watch("invoiceNumber")

  // Watch for changes in invoiceNumber and update referenceNumber with digits only
  useEffect(() => {
    if (!manuallyEditedReference && invoiceNumber) {
      // Extract only digits from invoiceNumber
      const digitsOnly = invoiceNumber.replace(/[^0-9]/g, "");
      if (digitsOnly) {
        // Auto-fill reference number with digits from invoice number
        setValue("referenceNumber", digitsOnly);
      }
    }
  }, [invoiceNumber, setValue, manuallyEditedReference]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => {
      const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0)
      const itemQuantity = typeof item.quantity === 'string' ? parseFloat(item.quantity) : (item.quantity || 0)
      const itemVatRate = typeof item.vatRate === 'string' ? parseFloat(item.vatRate) : (item.vatRate || 0)
      
      const netPrice = itemPrice * itemQuantity
      const vatAmount = (netPrice * itemVatRate) / 100
      return sum + netPrice + vatAmount
    }, 0)
  }, [items])

  const onSubmit = useCallback(
    async (data: InvoiceFormValues) => {
      try {
        setIsSubmitting(true);
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
          showToast("Failed to generate PDF. Please try again later.", "error")
          setIsSubmitting(false);
          return
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

        showToast(`Invoice #${data.invoiceNumber} created successfully!`, "success")
        form.reset()
        setManuallyEditedReference(false)
        setIsSubmitting(false);
      } catch (err) {
        console.error("Error creating invoice:", err)
        showToast("Failed to create invoice. Please check your data and try again.", "error")
        setIsSubmitting(false);
      }
    },
    [form, total, showToast],
  )

  // Add CSS for the pulsating animation
  useEffect(() => {
    // Add a style tag for the pulsating animation if it doesn't exist
    if (!document.getElementById('pulsate-animation')) {
      const style = document.createElement('style');
      style.id = 'pulsate-animation';
      style.innerHTML = `
        @keyframes pulsate {
          0% { box-shadow: 0 0 0 0 hsl(var(--destructive) / 0.7); }
          70% { box-shadow: 0 0 0 6px hsl(var(--destructive) / 0); }
          100% { box-shadow: 0 0 0 0 hsl(var(--destructive) / 0); }
        }
        .error-highlight {
          animation: pulsate 1.5s infinite;
          border-color: hsl(var(--destructive)) !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  // Add a function to highlight a field temporarily with animation
  const highlightField = (fieldName: string) => {
    setHighlightedField(fieldName);
    // Remove highlight after 3 seconds
    setTimeout(() => {
      setHighlightedField(null);
    }, 3000);
  };

  // Add a function to scroll to the first error field
  const scrollToFirstError = (errors: any) => {
    const errorFields = Object.keys(errors);
    if (errorFields.length === 0) return;
    
    // Get the first error field
    const firstErrorField = errorFields[0];
    
    // Handle array fields like items[0].name
    let selector = `[name="${firstErrorField}"]`;
    let fieldToHighlight = firstErrorField;
    
    // Check if it's an array field (like items)
    if (firstErrorField === 'items') {
      // If items array has errors, find the first item with error
      const itemsErrors = errors.items as any[];
      if (itemsErrors && Array.isArray(itemsErrors)) {
        for (let i = 0; i < itemsErrors.length; i++) {
          if (itemsErrors[i]) {
            // Get the first error property in this item
            const itemErrorField = Object.keys(itemsErrors[i])[0];
            if (itemErrorField) {
              selector = `[name="items.${i}.${itemErrorField}"]`;
              fieldToHighlight = `items.${i}.${itemErrorField}`;
              break;
            }
          }
        }
      }
    }
    
    // Find the element with error
    const errorElement = document.querySelector(selector);
    
    if (errorElement) {
      // Scroll to the error element with some offset
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add focus to the element
      (errorElement as HTMLElement).focus();
      
      // Highlight the field
      highlightField(fieldToHighlight);
      
      // Get a more descriptive error message
      let validationErrorMessage = "Please fill in all required fields to generate the invoice.";
      
      // Create more specific error messages based on the field
      const fieldLabels: Record<string, string> = {
        'sellerCompanyName': 'Seller Company Name',
        'sellerAddress': 'Seller Address',
        'buyerCompanyName': 'Buyer Company Name',
        'buyerAddress': 'Buyer Address',
        'invoiceNumber': 'Invoice Number',
        'termsAccepted': 'Terms and Conditions',
      };
      
      // Check if it's an item field
      if (fieldToHighlight.startsWith('items.')) {
        const parts = fieldToHighlight.split('.');
        if (parts.length === 3 && parts[2] === 'name') {
          const itemIndex = parseInt(parts[1]) + 1;
          validationErrorMessage = `Please provide a name for Item #${itemIndex}`;
        }
      } else if (fieldLabels[fieldToHighlight]) {
        validationErrorMessage = `Please fill in the "${fieldLabels[fieldToHighlight]}" field`;
      }
      
      // Show toast notification
      showToast(validationErrorMessage, "error");
    }
  };

  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <Header />
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Create Invoice</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
            Fill out the form below to create a new invoice.
          </p>
        </div>
        <div className="flex justify-center w-full">
          <FormProvider {...form}>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit, (errors) => {
                scrollToFirstError(errors);
              })} className="space-y-8 w-full">
                {/* Rest of the form content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Seller Information */}
                  <Card className="card-content">
                    <CardHeader>
                      <CardTitle>Seller Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* sellerCompanyName */}
                      <FormField
                        control={control}
                        name="sellerCompanyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                maxLength={100}
                                onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                className={highlightedField === "sellerCompanyName" ? "border-red-500 error-highlight" : ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* sellerAddress */}
                      <FormField
                        control={control}
                        name="sellerAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                maxLength={250}
                                onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                className={highlightedField === "sellerAddress" ? "border-red-500 error-highlight" : ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* sellerCompanyId */}
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
                              {fieldVisibility.sellerCompanyId && (
                                <Input
                                  {...field}
                                  maxLength={40}
                                  aria-label="Seller Company ID"
                                  onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                  className={highlightedField === "sellerCompanyId" ? "border-red-500 error-highlight" : ""}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* sellerVatId */}
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
                              {fieldVisibility.sellerVatId && (
                                <Input
                                  {...field}
                                  maxLength={43}
                                  aria-label="Seller VAT ID"
                                  onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                  className={highlightedField === "sellerVatId" ? "border-red-500 error-highlight" : ""}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* sellerEmail */}
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
                              {fieldVisibility.sellerEmail && (
                                <Input
                                  {...field}
                                  maxLength={90}
                                  aria-label="Seller Email"
                                  onChange={(e) => field.onChange(sanitizeEmail(e.target.value))}
                                  className={highlightedField === "sellerEmail" ? "border-red-500 error-highlight" : ""}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* sellerWebsite */}
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
                                  aria-label="Seller Website"
                                  onChange={(e) => {
                                    const raw = sanitizeWebsite(e.target.value)
                                    // remove http:// https://
                                    const value = raw.replace(/^(https?:\/\/)/, "")
                                    field.onChange(value)
                                  }}
                                  className={highlightedField === "sellerWebsite" ? "border-red-500 error-highlight" : ""}
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
                      {/* buyerCompanyName */}
                      <FormField
                        control={control}
                        name="buyerCompanyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                maxLength={100}
                                onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                className={highlightedField === "buyerCompanyName" ? "border-red-500 error-highlight" : ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* buyerAddress */}
                      <FormField
                        control={control}
                        name="buyerAddress"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                maxLength={250}
                                onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                className={highlightedField === "buyerAddress" ? "border-red-500 error-highlight" : ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* buyerCompanyId */}
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
                              {fieldVisibility.buyerCompanyId && (
                                <Input
                                  {...field}
                                  maxLength={40}
                                  aria-label="Buyer Company ID"
                                  onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                  className={highlightedField === "buyerCompanyId" ? "border-red-500 error-highlight" : ""}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* buyerVatId */}
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
                              {fieldVisibility.buyerVatId && (
                                <Input
                                  {...field}
                                  maxLength={43}
                                  aria-label="Buyer VAT ID"
                                  onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                  className={highlightedField === "buyerVatId" ? "border-red-500 error-highlight" : ""}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* buyerEmail */}
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
                              {fieldVisibility.buyerEmail && (
                                <Input
                                  {...field}
                                  maxLength={90}
                                  aria-label="Buyer Email"
                                  onChange={(e) => field.onChange(sanitizeEmail(e.target.value))}
                                  className={highlightedField === "buyerEmail" ? "border-red-500 error-highlight" : ""}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* buyerWebsite */}
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
                                  aria-label="Buyer Website"
                                  onChange={(e) => {
                                    const raw = sanitizeWebsite(e.target.value)
                                    // remove http:// https://
                                    const value = raw.replace(/^(https?:\/\/)/, "")
                                    field.onChange(value)
                                  }}
                                  className={highlightedField === "buyerWebsite" ? "border-red-500 error-highlight" : ""}
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
                      {/* invoiceNumber */}
                      <FormField
                        control={control}
                        name="invoiceNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Invoice Number *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                maxLength={30}
                                onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                className={highlightedField === "invoiceNumber" ? "border-red-500 error-highlight" : ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* issueDate */}
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
                                className={highlightedField === "issueDate" ? "border-red-500 error-highlight" : ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* dueDate */}
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
                                className={highlightedField === "dueDate" ? "border-red-500 error-highlight" : ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* currency */}
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
                                {currencies.map((c) => (
                                  <SelectItem key={c.code} value={c.code}>
                                    {c.code} - {c.name}
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
                <Card className="bg-card card-content">
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
                      {/* referenceNumber */}
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
                              {fieldVisibility.referenceNumber && (
                                <>
                                <Input
                                  {...field}
                                  maxLength={35}
                                  aria-label="Reference Number"
                                  onChange={(e) => {
                                    field.onChange(sanitizeInput(e.target.value));
                                    setManuallyEditedReference(true);
                                  }}
                                  className={highlightedField === "referenceNumber" ? "border-red-500 error-highlight" : ""}
                                />
                                <div className="flex justify-end items-center mt-1">
                                  {manuallyEditedReference && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => {
                                        const digitsOnly = invoiceNumber.replace(/[^0-9]/g, "");
                                        setValue("referenceNumber", digitsOnly);
                                        setManuallyEditedReference(false);
                                      }}
                                    >
                                      Reset
                                    </Button>
                                  )}
                                </div>
                                </>
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* customerReferenceNumber */}
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
                              {fieldVisibility.customerReferenceNumber && (
                                <Input
                                  {...field}
                                  maxLength={35}
                                  aria-label="Customer Reference Number"
                                  onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                  className={highlightedField === "customerReferenceNumber" ? "border-red-500 error-highlight" : ""}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* orderNumber */}
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
                              {fieldVisibility.orderNumber && (
                                <Input
                                  {...field}
                                  maxLength={35}
                                  aria-label="Order Number"
                                  onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                  className={highlightedField === "orderNumber" ? "border-red-500 error-highlight" : ""}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* paymentMethod */}
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
                          {/* bankAccount */}
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
                                  {fieldVisibility.bankAccount && (
                                    <Input
                                      {...field}
                                      maxLength={35}
                                      aria-label="Bank Account"
                                      onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                      className={highlightedField === "bankAccount" ? "border-red-500 error-highlight" : ""}
                                    />
                                  )}
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* iban */}
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
                                  {fieldVisibility.iban && (
                                    <Input
                                      {...field}
                                      maxLength={34}
                                      aria-label="IBAN"
                                      onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                      className={highlightedField === "iban" ? "border-red-500 error-highlight" : ""}
                                    />
                                  )}
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* swift */}
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
                                  {fieldVisibility.swift && (
                                    <Input
                                      {...field}
                                      maxLength={11}
                                      aria-label="SWIFT/BIC"
                                      onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                      className={highlightedField === "swift" ? "border-red-500 error-highlight" : ""}
                                    />
                                  )}
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
                                let value = sanitizeInput(e.target.value)
                                // Insert line break every 105 characters
                                value = value.replace(/(.{105})/g, "$1\n")
                                field.onChange(value)
                              }}
                              className={highlightedField === "notes" ? "border-red-500 error-highlight" : ""}
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
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
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
                      {fields.map((fieldItem, index) => (
                        <div key={fieldItem.id} className="space-y-4">
                          <div
                            className={`grid ${
                              isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4"
                            } gap-4`}
                          >
                            {/* item name */}
                            <FormField
                              control={control}
                              name={`items.${index}.name`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Item Name *</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      maxLength={130}
                                      onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                                      className={highlightedField === `items.${index}.name` ? "border-red-500 error-highlight" : ""}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* quantity */}
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
                                        const raw = sanitizeNumber(e.target.value)
                                        let valueNum = parseInt(raw, 10)
                                        if (Number.isNaN(valueNum)) {
                                          valueNum = 1
                                        }
                                        // limit from 1 to 999999
                                        const clamped = Math.min(Math.max(1, valueNum), 999999)
                                        field.onChange(clamped)
                                      }}
                                      min={1}
                                      max={999999}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* price */}
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
                                        const raw = sanitizeNumber(e.target.value)
                                        let valueNum = parseFloat(raw)
                                        if (Number.isNaN(valueNum)) {
                                          valueNum = 0
                                        }
                                        // from 0 to 999999999
                                        const clamped = Math.min(Math.max(0, valueNum), 999999999)
                                        field.onChange(clamped)
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

                            {/* vatRate */}
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
                                        const raw = sanitizeNumber(e.target.value)
                                        let valueNum = parseFloat(raw)
                                        if (Number.isNaN(valueNum)) {
                                          valueNum = 0
                                        }
                                        // from 0 to 100
                                        const clamped = Math.min(Math.max(0, valueNum), 100)
                                        field.onChange(clamped)
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
                            className="text-white font-medium"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      ))}

                      {/* Add Item Button */}
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
                        <p className="text-sm text-muted-foreground mt-2">
                          Maximum number of items (10) reached.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Terms Accepted + Submit */}
                <div className="flex flex-col items-center gap-4 mt-8">
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className={highlightedField === "termsAccepted" ? "border-red-500 error-highlight" : ""}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I agree to the invoice.wiki{" "}
                            <button
                              type="button"
                              className="text-blue-700 dark:text-blue-400 hover:underline font-medium"
                              onClick={() => setTermsDialogOpen(true)}
                            >
                              Terms and Conditions
                            </button>
                            {" "}*
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
                    disabled={!form.watch("termsAccepted") || isSubmitting}
                    onClick={() => {
                      // Trigger form validation manually
                      form.trigger().then((isValid) => {
                        if (!isValid) {
                          // If form is invalid, scroll to the first error
                          scrollToFirstError(form.formState.errors);
                        }
                      });
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">Generating Invoice...</span>
                      </>
                    ) : (
                      <>
                        Generate Invoice
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>

                <TermsDialog open={termsDialogOpen} onOpenChange={setTermsDialogOpen} />

                <div className="mt-8 text-right space-y-2">
                  {total > 0 && (
                    <>
                      <div className="flex flex-col items-end">
                        <div className="grid grid-cols-2 gap-x-4 text-right">
                          <span className="text-gray-600">Net Total:</span>
                          <span className="font-medium">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: currency,
                            }).format(items.reduce((sum, item) => {
                              const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0)
                              const itemQuantity = typeof item.quantity === 'string' ? parseFloat(item.quantity) : (item.quantity || 0)
                              return sum + itemQuantity * itemPrice
                            }, 0))}
                          </span>

                          <span className="text-gray-600">VAT Total:</span>
                          <span className="font-medium">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: currency,
                            }).format(
                              items.reduce((sum, item) => {
                                const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : (item.price || 0)
                                const itemQuantity = typeof item.quantity === 'string' ? parseFloat(item.quantity) : (item.quantity || 0)
                                const itemVatRate = typeof item.vatRate === 'string' ? parseFloat(item.vatRate) : (item.vatRate || 0)
                                
                                const netPrice = itemQuantity * itemPrice
                                return sum + (netPrice * itemVatRate) / 100
                              }, 0)
                            )}
                          </span>

                          <span className="text-gray-600 font-bold">Total Due:</span>
                          <span className="font-bold">
                            {isPaid
                              ? "PAID!"
                              : new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: currency,
                                }).format(total)}
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
  )
}

export default CreateInvoiceForm
