"use client"

import React from "react"
import { useState, useCallback, useMemo, useEffect } from "react"
import { useForm, useFieldArray, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { generateInvoicePDFLazy, preloadPDFModules } from "@/lib/pdf-generator"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { TermsDialog } from "@/components/TermsDialog"
import { invoiceFormSchema } from "@/lib/schemas"
import { useMediaQuery } from "@/app/hooks/useMediaQuery"
import { useToastProvider } from "@/components/ui/toast-provider"

// Import invoice components
import {
  SellerInformation,
  BuyerInformation,
  InvoiceDetails,
  PaymentInformation,
  InvoiceNotes,
  PaymentStatus,
  InvoiceItems,
  InvoiceTotals,
  InvoiceColorPicker,
  InvoiceLanguagePicker,
  type FieldVisibility,
  type InvoiceFormValues
} from "@/components/invoice"

// Import decimal utilities for precise financial calculations
import { calculateInvoiceTotals, toNumber } from "@/lib/decimal-utils"
import { isValid } from "date-fns"
import { getFormLanguageById } from "@/app/utils/form-languages"

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [manuallyEditedReference, setManuallyEditedReference] = useState(false)
  const [highlightedField, setHighlightedField] = useState<string | null>(null)

  const toggleFieldVisibility = (field: keyof FieldVisibility) => {
    setFieldVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const form = useForm({
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
      colorId: "blue",
      languageId: "en",
      taxType: "vat" as const,
      showTax: true,
      reverseCharge: false,
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
  const languageId = watch("languageId")
  const taxType = watch("taxType")

  // Get form translations based on selected language
  const formTranslations = getFormLanguageById(languageId || 'en').form

  // Watch for changes in invoiceNumber and update referenceNumber with digits only
  useEffect(() => {
    if (!manuallyEditedReference && invoiceNumber) {
      const digitsOnly = invoiceNumber.replace(/[^0-9]/g, "")
      if (digitsOnly) {
        setValue("referenceNumber", digitsOnly)
      }
    }
  }, [invoiceNumber, setValue, manuallyEditedReference])

  const totals = useMemo(() => {
    const { netTotal, vatTotal, grandTotal } = calculateInvoiceTotals(items)
    return {
      net: toNumber(netTotal),
      vat: toNumber(vatTotal),
      grand: toNumber(grandTotal)
    }
  }, [items])

  // Handle critical errors that should show error.tsx with instructions
  const handleCriticalError = (message: string, technicalDetails?: string) => {
    const error = new Error(message)
    if (technicalDetails) {
      error.stack = technicalDetails
    }
    throw error
  }

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        setIsSubmitting(true)
        
        // Validate dates before processing - keep as toast (validation error)
        if (!isValid(data.issueDate) || !isValid(data.dueDate)) {
          showToast("Please ensure all dates are valid", "error")
          setIsSubmitting(false)
          return
        }
        
        const pdfData = {
          ...data,
          total: totals.grand,
          taxType: data.taxType || 'vat',
          showTax: data.showTax !== false,
          reverseCharge: data.reverseCharge || false,
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

        const pdfBlob = await generateInvoicePDFLazy(pdfData)

        if (!pdfBlob) {
          // Critical error - show error.tsx with instructions
          handleCriticalError(
            "PDF Generation Failed", 
            "The PDF generation system is currently unavailable. This could be due to browser compatibility issues, memory constraints, or a temporary service problem."
          )
          return
        }

        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/292dbdac-c8fe-4506-a6e2-91adda4e7959',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'CreateInvoiceForm.tsx:219',message:'PDF download triggered in CreateInvoiceForm',data:{invoiceNumber:data.invoiceNumber},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'A-fix'})}).catch(()=>{});
        // #endregion
        const blob = new Blob([pdfBlob.output("blob")], { type: "application/pdf" })
        const url = URL.createObjectURL(blob)

        const link = document.createElement("a")
        link.href = url
        link.download = `invoice-${data.invoiceNumber}.pdf`
        link.target = "_blank"
        link.rel = "noopener noreferrer"
        
        // Handle mobile browsers differently
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          window.open(url, "_blank")
          // Delay URL revocation on mobile to allow time for download
          setTimeout(() => URL.revokeObjectURL(url), 60000)
        } else {
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
        }

        showToast(`Invoice #${data.invoiceNumber} created successfully!`, "success")
        form.reset()
        setManuallyEditedReference(false)
        setIsSubmitting(false)
      } catch (err) {
        setIsSubmitting(false) // Reset submit state on any error
        
        // Check if it's our intentional critical error
        if (err instanceof Error && err.message === "PDF Generation Failed") {
          // Re-throw to show error.tsx
          throw err
        }
        
        // For unexpected errors, also show error.tsx with technical details
        handleCriticalError(
          "Unexpected Error During Invoice Creation",
          `An unexpected error occurred: ${err instanceof Error ? err.message : 'Unknown error'}\n\nTechnical details: ${err instanceof Error ? err.stack : 'No stack trace available'}`
        )
      }
    },
    [form, totals.grand, showToast],
  )

  // Add CSS for the pulsating animation
  useEffect(() => {
    if (!document.getElementById('pulsate-animation')) {
      const style = document.createElement('style')
      style.id = 'pulsate-animation'
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
      `
      document.head.appendChild(style)
    }
  }, [])
  
  const highlightField = (fieldName: string) => {
    setHighlightedField(fieldName)
    setTimeout(() => {
      setHighlightedField(null)
    }, 3000)
  }

  const scrollToFirstError = (errors: any) => {
    const errorFields = Object.keys(errors)
    if (errorFields.length === 0) return
    
    const firstErrorField = errorFields[0]
    let selector = `[name="${firstErrorField}"]`
    let fieldToHighlight = firstErrorField
    
    if (firstErrorField === 'items') {
      const itemsErrors = errors.items
      if (itemsErrors && Array.isArray(itemsErrors)) {
        for (let i = 0; i < itemsErrors.length; i++) {
          if (itemsErrors[i]) {
            const itemErrorField = Object.keys(itemsErrors[i])[0]
            if (itemErrorField) {
              selector = `[name="items.${i}.${itemErrorField}"]`
              fieldToHighlight = `items.${i}.${itemErrorField}`
              break
            }
          }
        }
      }
    }
    
    const errorElement = document.querySelector(selector)
    
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      ;(errorElement as HTMLElement).focus()
      highlightField(fieldToHighlight)
      
      let validationErrorMessage = "Please fill in all required fields to generate the invoice."
      
      const fieldLabels: Record<string, string> = {
        'sellerCompanyName': 'Seller Company Name',
        'sellerAddress': 'Seller Address',
        'buyerCompanyName': 'Buyer Company Name',
        'buyerAddress': 'Buyer Address',
        'invoiceNumber': 'Invoice Number',
        'termsAccepted': 'Terms and Conditions',
      }
      
      if (fieldToHighlight.startsWith('items.')) {
        const parts = fieldToHighlight.split('.')
        if (parts.length === 3 && parts[2] === 'name') {
          const itemIndex = parseInt(parts[1]) + 1
          validationErrorMessage = `Please provide a name for Item #${itemIndex}`
        }
      } else if (fieldLabels[fieldToHighlight]) {
        validationErrorMessage = `Please fill in the "${fieldLabels[fieldToHighlight]}" field`
      }
      
      showToast(validationErrorMessage, "error")
    }
  }

  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <Header />
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex justify-center w-full">
          <FormProvider {...form}>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit, scrollToFirstError)} className="space-y-8 w-full mb-16">
                {/* Invoice Settings - Color, Language, Tax Type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-card rounded-lg border border-border">
                  <FormField
                    control={control}
                    name="colorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InvoiceColorPicker
                            selectedColorId={field.value || "blue"}
                            onColorChange={field.onChange}
                            translations={{
                              title: formTranslations.invoiceColorSelection,
                              description: formTranslations.colorDescription,
                              selected: "Selected"
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={control}
                    name="languageId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InvoiceLanguagePicker
                            selectedLanguageId={field.value || "en"}
                            onLanguageChange={field.onChange}
                            translations={{
                              title: formTranslations.invoiceLanguageSelection,
                              description: formTranslations.languageDescription,
                              selected: "Selected"
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="taxType"
                    render={({ field }) => (
                      <FormItem>
                        <div className="space-y-2">
                          <FormLabel className="text-base font-semibold">{formTranslations.taxTypeSelection}</FormLabel>
                          <p className="text-sm text-muted-foreground">{formTranslations.taxTypeDescription}</p>
                          <FormControl>
                            <select
                              value={field.value || "vat"}
                              onChange={(e) => field.onChange(e.target.value)}
                              className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            >
                              <option value="vat">{formTranslations.taxTypes.vat}</option>
                              <option value="gst">{formTranslations.taxTypes.gst}</option>
                              <option value="sales_tax">{formTranslations.taxTypes.sales_tax}</option>
                              <option value="none">{formTranslations.taxTypes.none}</option>
                            </select>
                          </FormControl>
                          
                          {/* Tax Options */}
                          <div className="flex flex-col gap-2 pt-2">
                            <FormField
                              control={control}
                              name="showTax"
                              render={({ field: showTaxField }) => (
                                <label className="flex items-center gap-2 text-sm cursor-pointer">
                                  <Checkbox
                                    checked={showTaxField.value}
                                    onCheckedChange={showTaxField.onChange}
                                  />
                                  <span>{formTranslations.showTax}</span>
                                </label>
                              )}
                            />
                            
                            {/* Reverse Charge only for EU languages (not Ukrainian) */}
                            {taxType === 'vat' && languageId !== 'uk' && (
                              <FormField
                                control={control}
                                name="reverseCharge"
                                render={({ field: reverseChargeField }) => (
                                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                                    <Checkbox
                                      checked={reverseChargeField.value}
                                      onCheckedChange={reverseChargeField.onChange}
                                    />
                                    <span className="flex flex-col">
                                      <span className="font-medium">{formTranslations.reverseCharge}</span>
                                      <span className="text-xs text-muted-foreground">{formTranslations.reverseChargeDescription}</span>
                                    </span>
                                  </label>
                                )}
                              />
                            )}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Seller and Buyer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SellerInformation
                    control={control}
                    fieldVisibility={fieldVisibility}
                    toggleFieldVisibility={toggleFieldVisibility}
                    highlightedField={highlightedField}
                    translations={{
                      title: formTranslations.sellerInformation,
                      companyName: formTranslations.companyName,
                      address: formTranslations.address,
                      companyId: formTranslations.companyId,
                      vatId: formTranslations.vatId,
                      email: formTranslations.email,
                      website: formTranslations.website,
                      hide: formTranslations.hide,
                      show: formTranslations.show,
                      placeholders: formTranslations.placeholders
                    }}
                  />
                  <div>
                    <BuyerInformation
                      control={control}
                      fieldVisibility={fieldVisibility}
                      toggleFieldVisibility={toggleFieldVisibility}
                      highlightedField={highlightedField}
                      translations={{
                        title: formTranslations.buyerInformation,
                        companyName: formTranslations.companyName,
                        address: formTranslations.address,
                        companyId: formTranslations.companyId,
                        vatId: formTranslations.vatId,
                        email: formTranslations.email,
                        website: formTranslations.website,
                        hide: formTranslations.hide,
                        show: formTranslations.show,
                        placeholders: formTranslations.placeholders
                      }}
                    />
                  </div>
                </div>

                {/* Invoice Details */}
                <InvoiceDetails
                  control={control}
                  highlightedField={highlightedField}
                  isMobile={isMobile}
                />



                {/* Payment Information */}
                <PaymentInformation
                  control={control}
                  fieldVisibility={fieldVisibility}
                  toggleFieldVisibility={toggleFieldVisibility}
                  highlightedField={highlightedField}
                  isMobile={isMobile}
                  paymentMethod={paymentMethod}
                  invoiceNumber={invoiceNumber}
                  manuallyEditedReference={manuallyEditedReference}
                  setManuallyEditedReference={setManuallyEditedReference}
                  setValue={setValue}
                />

                {/* Notes */}
                <InvoiceNotes
                  control={control}
                  highlightedField={highlightedField}
                />

                {/* Payment Status */}
                <PaymentStatus control={control} />

                {/* Items */}
                <InvoiceItems
                  control={control}
                  fields={fields}
                  append={append}
                  remove={remove}
                  highlightedField={highlightedField}
                  isMobile={isMobile}
                />

                {/* Terms and Submit */}
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
                              className="text-primary hover:underline font-medium"
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
                    onMouseEnter={preloadPDFModules}
                    onClick={() => {
                      form.trigger().then((isValid) => {
                        if (!isValid) {
                          scrollToFirstError(form.formState.errors)
                        }
                      })
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

                {/* Totals */}
                <InvoiceTotals
                  totals={totals}
                  currency={currency}
                  isPaid={isPaid}
                />
              </form>
            </Form>
          </FormProvider>
        </div>
      </div>
    </section>
  )
}

export default CreateInvoiceForm
