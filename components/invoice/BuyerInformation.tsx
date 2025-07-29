import React from "react"
import { Control } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToggleableFormField } from "@/components/ui/toggleable-form-field"
import { sanitizeInput, sanitizeEmail, sanitizeWebsite } from "@/lib/security"
import { FieldVisibility, InvoiceFormValues } from "./types"

interface BuyerInformationProps {
  control: Control<InvoiceFormValues>
  fieldVisibility: Pick<FieldVisibility, 'buyerCompanyId' | 'buyerVatId' | 'buyerEmail' | 'buyerWebsite'>
  toggleFieldVisibility: (field: keyof FieldVisibility) => void
  highlightedField: string | null
  translations?: {
    title: string
    companyName: string
    address: string
    companyId: string
    vatId: string
    email: string
    website: string
    hide: string
    show: string
    placeholders: {
      companyName: string
      address: string
      companyId: string
      vatId: string
      email: string
      website: string
    }
  }
}

export function BuyerInformation({
  control,
  fieldVisibility,
  toggleFieldVisibility,
  highlightedField,
  translations
}: BuyerInformationProps) {
  const defaultTranslations = {
    title: "Buyer Information",
    companyName: "Company Name",
    address: "Address",
    companyId: "Company ID",
    vatId: "VAT ID",
    email: "Email",
    website: "Website",
    hide: "Hide",
    show: "Show",
    placeholders: {
      companyName: "Client Company Ltd.",
      address: "456 Client Street, City, Country",
      companyId: "87654321",
      vatId: "GB987654321",
      email: "client@company.com",
      website: "client.com"
    }
  }
  
  const t = translations || defaultTranslations

  return (
    <Card className="card-content">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* buyerCompanyName */}
        <FormField
          control={control}
          name="buyerCompanyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.companyName} *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  maxLength={100}
                  placeholder={t.placeholders.companyName}
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
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
              <FormLabel>{t.address} *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  maxLength={250}
                  placeholder={t.placeholders.address}
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
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
            <ToggleableFormField
              label={t.companyId}
              fieldName="buyerCompanyId"
              field={field}
              isVisible={fieldVisibility.buyerCompanyId}
              onToggle={() => toggleFieldVisibility("buyerCompanyId")}
              maxLength={40}
              sanitizer={sanitizeInput}
              highlightedField={highlightedField}
              placeholder={t.placeholders.companyId}
            />
          )}
        />

        {/* buyerVatId */}
        <FormField
          control={control}
          name="buyerVatId"
          render={({ field }) => (
            <ToggleableFormField
              label={t.vatId}
              fieldName="buyerVatId"
              field={field}
              isVisible={fieldVisibility.buyerVatId}
              onToggle={() => toggleFieldVisibility("buyerVatId")}
              maxLength={43}
              sanitizer={sanitizeInput}
              highlightedField={highlightedField}
              placeholder={t.placeholders.vatId}
            />
          )}
        />

        {/* buyerEmail */}
        <FormField
          control={control}
          name="buyerEmail"
          render={({ field }) => (
            <ToggleableFormField
              label={t.email}
              fieldName="buyerEmail"
              field={field}
              isVisible={fieldVisibility.buyerEmail}
              onToggle={() => toggleFieldVisibility("buyerEmail")}
              maxLength={90}
              sanitizer={sanitizeEmail}
              highlightedField={highlightedField}
              type="email"
              placeholder={t.placeholders.email}
            />
          )}
        />

        {/* buyerWebsite */}
        <FormField
          control={control}
          name="buyerWebsite"
          render={({ field }) => (
            <ToggleableFormField
              label={t.website}
              fieldName="buyerWebsite"
              field={field}
              isVisible={fieldVisibility.buyerWebsite}
              onToggle={() => toggleFieldVisibility("buyerWebsite")}
              maxLength={60}
              sanitizer={(value) => {
                const raw = sanitizeWebsite(value)
                return raw.replace(/^(https?:\/\/)/, "")
              }}
              highlightedField={highlightedField}
              type="text"
              placeholder={t.placeholders.website}
            />
          )}
        />
      </CardContent>
    </Card>
  )
} 