import React from "react"
import { Control, UseFormSetValue } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleableFormField } from "@/components/ui/toggleable-form-field"
import { sanitizeInput } from "@/lib/security"
import { FieldVisibility, InvoiceFormValues } from "./types"
import type { FormLanguage } from "@/app/utils/form-languages"

type PaymentTranslations = Pick<
  FormLanguage["form"],
  | "paymentInformation"
  | "referenceNumber"
  | "customerReferenceNumber"
  | "orderNumber"
  | "paymentMethod"
  | "bankAccount"
  | "iban"
  | "swiftBic"
  | "hide"
  | "show"
  | "reset"
  | "selectPaymentMethod"
  | "paymentMethods"
  | "placeholders"
>

interface PaymentInformationProps {
  control: Control<InvoiceFormValues>
  fieldVisibility: Pick<
    FieldVisibility,
    "referenceNumber" | "customerReferenceNumber" | "orderNumber" | "bankAccount" | "iban" | "swift"
  >
  toggleFieldVisibility: (field: keyof FieldVisibility) => void
  highlightedField: string | null
  isMobile: boolean
  paymentMethod: string
  invoiceNumber: string
  manuallyEditedReference: boolean
  setManuallyEditedReference: (value: boolean) => void
  setValue: UseFormSetValue<InvoiceFormValues>
  translations?: PaymentTranslations
}

export function PaymentInformation({
  control,
  fieldVisibility,
  toggleFieldVisibility,
  highlightedField,
  isMobile,
  paymentMethod,
  invoiceNumber,
  manuallyEditedReference,
  setManuallyEditedReference,
  setValue,
  translations: t,
}: PaymentInformationProps) {
  const paymentMethods = [
    { value: "bank_transfer", label: t?.paymentMethods?.bankTransfer ?? "Bank Transfer" },
    { value: "cash", label: t?.paymentMethods?.cash ?? "Cash" },
    { value: "credit_card", label: t?.paymentMethods?.creditCard ?? "Credit Card" },
    { value: "paypal", label: t?.paymentMethods?.paypal ?? "PayPal" },
    { value: "wise", label: t?.paymentMethods?.wise ?? "Wise" },
  ]

  return (
    <Card className="bg-card card-content">
      <CardHeader>
        <CardTitle>{t?.paymentInformation ?? "Payment Information"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"} gap-4`}>
          {/* referenceNumber */}
          <FormField
            control={control}
            name="referenceNumber"
            render={({ field }) => (
              <ToggleableFormField
                label={t?.referenceNumber ?? "Reference Number"}
                fieldName="referenceNumber"
                field={field}
                isVisible={fieldVisibility.referenceNumber}
                onToggle={() => toggleFieldVisibility("referenceNumber")}
                maxLength={35}
                highlightedField={highlightedField}
                hideText={t?.hide}
                showText={t?.show}
                customContent={
                  <div>
                    <Input
                      {...field}
                      type="text"
                      maxLength={35}
                      placeholder={t?.placeholders?.referenceNumber ?? "123456789"}
                      aria-label={t?.referenceNumber ?? "Reference Number"}
                      autoComplete="off"
                      data-lpignore="true"
                      data-form-type="other"
                      onChange={(e) => {
                        field.onChange(sanitizeInput(e.target.value))
                        setManuallyEditedReference(true)
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
                            const digitsOnly = invoiceNumber.replace(/[^0-9]/g, "")
                            setValue("referenceNumber", digitsOnly)
                            setManuallyEditedReference(false)
                          }}
                        >
                          {t?.reset ?? "Reset"}
                        </Button>
                      )}
                    </div>
                  </div>
                }
              />
            )}
          />

          {/* customerReferenceNumber */}
          <FormField
            control={control}
            name="customerReferenceNumber"
            render={({ field }) => (
              <ToggleableFormField
                label={t?.customerReferenceNumber ?? "Customer Reference Number"}
                fieldName="customerReferenceNumber"
                field={field}
                isVisible={fieldVisibility.customerReferenceNumber}
                onToggle={() => toggleFieldVisibility("customerReferenceNumber")}
                maxLength={35}
                sanitizer={sanitizeInput}
                highlightedField={highlightedField}
                placeholder={t?.placeholders?.customerReferenceNumber ?? "REF-2024-001"}
                hideText={t?.hide}
                showText={t?.show}
              />
            )}
          />

          {/* orderNumber */}
          <FormField
            control={control}
            name="orderNumber"
            render={({ field }) => (
              <ToggleableFormField
                label={t?.orderNumber ?? "Order Number"}
                fieldName="orderNumber"
                field={field}
                isVisible={fieldVisibility.orderNumber}
                onToggle={() => toggleFieldVisibility("orderNumber")}
                maxLength={35}
                sanitizer={sanitizeInput}
                placeholder={t?.placeholders?.orderNumber ?? "ORD-2024-001"}
                highlightedField={highlightedField}
                hideText={t?.hide}
                showText={t?.show}
              />
            )}
          />

          {/* paymentMethod */}
          <FormField
            control={control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t?.paymentMethod ?? "Payment Method"}</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t?.selectPaymentMethod ?? "Select payment method"} />
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
                  <ToggleableFormField
                    label={t?.bankAccount ?? "Bank Account"}
                    fieldName="bankAccount"
                    field={field}
                    isVisible={fieldVisibility.bankAccount}
                    onToggle={() => toggleFieldVisibility("bankAccount")}
                    maxLength={35}
                    sanitizer={sanitizeInput}
                    highlightedField={highlightedField}
                    placeholder={t?.placeholders?.bankAccount ?? "12345678"}
                    hideText={t?.hide}
                    showText={t?.show}
                  />
                )}
              />

              {/* iban */}
              <FormField
                control={control}
                name="iban"
                render={({ field }) => (
                  <ToggleableFormField
                    label={t?.iban ?? "IBAN"}
                    fieldName="iban"
                    field={field}
                    isVisible={fieldVisibility.iban}
                    onToggle={() => toggleFieldVisibility("iban")}
                    maxLength={34}
                    sanitizer={sanitizeInput}
                    highlightedField={highlightedField}
                    placeholder={t?.placeholders?.iban ?? "GB82 WEST 1234 5698 7654 32"}
                    hideText={t?.hide}
                    showText={t?.show}
                  />
                )}
              />

              {/* swift */}
              <FormField
                control={control}
                name="swift"
                render={({ field }) => (
                  <ToggleableFormField
                    label={t?.swiftBic ?? "SWIFT/BIC"}
                    fieldName="swift"
                    field={field}
                    isVisible={fieldVisibility.swift}
                    onToggle={() => toggleFieldVisibility("swift")}
                    maxLength={11}
                    sanitizer={sanitizeInput}
                    highlightedField={highlightedField}
                    placeholder={t?.placeholders?.swiftBic ?? "ABNAFRPP"}
                    hideText={t?.hide}
                    showText={t?.show}
                  />
                )}
              />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
