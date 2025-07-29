import React from "react"
import { Control } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToggleableFormField } from "@/components/ui/toggleable-form-field"
import { sanitizeInput } from "@/lib/security"
import { FieldVisibility, InvoiceFormValues } from "./types"

interface SellerInformationProps {
  control: Control<InvoiceFormValues>
  fieldVisibility: Pick<FieldVisibility, 'sellerCompanyId' | 'sellerVatId' | 'sellerEmail' | 'sellerWebsite'>
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

export function SellerInformation({
  control,
  fieldVisibility,
  toggleFieldVisibility,
  highlightedField,
  translations
}: SellerInformationProps) {
  const defaultTranslations = {
    title: "Seller Information",
    companyName: "Company Name",
    address: "Address",
    companyId: "Company ID",
    vatId: "VAT ID",
    email: "Email",
    website: "Website",
    hide: "Hide",
    show: "Show",
    placeholders: {
      companyName: "Your Company Ltd.",
      address: "123 Business Street, City, Country",
      companyId: "12345678",
      vatId: "GB123456789",
      email: "contact@company.com",
      website: "example.com"
    }
  }
  
  const t = translations || defaultTranslations

  return (
    <Card className="card-content">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* sellerCompanyName */}
        <FormField
          control={control}
          name="sellerCompanyName"
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
            <ToggleableFormField
              label={t.companyId}
              fieldName="sellerCompanyId"
              field={field}
              placeholder={t.placeholders.companyId}
              maxLength={40}
              isVisible={fieldVisibility.sellerCompanyId}
              onToggle={() => toggleFieldVisibility('sellerCompanyId')}
              highlightedField={highlightedField}
              hideText={t.hide}
              showText={t.show}
            />
          )}
        />

        {/* sellerVatId */}
        <FormField
          control={control}
          name="sellerVatId"
          render={({ field }) => (
            <ToggleableFormField
              label={t.vatId}
              fieldName="sellerVatId"
              field={field}
              placeholder={t.placeholders.vatId}
              maxLength={43}
              isVisible={fieldVisibility.sellerVatId}
              onToggle={() => toggleFieldVisibility('sellerVatId')}
              highlightedField={highlightedField}
              hideText={t.hide}
              showText={t.show}
            />
          )}
        />

        {/* sellerEmail */}
        <FormField
          control={control}
          name="sellerEmail"
          render={({ field }) => (
            <ToggleableFormField
              label={t.email}
              fieldName="sellerEmail"
              field={field}
              placeholder={t.placeholders.email}
              maxLength={90}
              type="email"
              isVisible={fieldVisibility.sellerEmail}
              onToggle={() => toggleFieldVisibility('sellerEmail')}
              highlightedField={highlightedField}
              sanitizer={(value) => value} // email sanitizer will be handled in Input
              hideText={t.hide}
              showText={t.show}
            />
          )}
        />

        {/* sellerWebsite */}
        <FormField
          control={control}
          name="sellerWebsite"
          render={({ field }) => (
            <ToggleableFormField
              label={t.website}
              fieldName="sellerWebsite"
              field={field}
              placeholder={t.placeholders.website}
              maxLength={60}
              type="text"
              isVisible={fieldVisibility.sellerWebsite}
              onToggle={() => toggleFieldVisibility('sellerWebsite')}
              highlightedField={highlightedField}
              sanitizer={(value) => value.replace(/^(https?:\/\/)/, "")} // remove protocol
              hideText={t.hide}
              showText={t.show}
            />
          )}
        />
      </CardContent>
    </Card>
  )
} 