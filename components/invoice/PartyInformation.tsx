import React from "react"
import { Control, FieldPath } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToggleableFormField } from "@/components/ui/toggleable-form-field"
import { sanitizeInput } from "@/lib/security"
import { FieldVisibility, InvoiceFormValues } from "./types"

export interface PartyTranslations {
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

type PartyPrefix = "seller" | "buyer"

interface PartyInformationProps {
  prefix: PartyPrefix
  control: Control<InvoiceFormValues>
  fieldVisibility: Partial<FieldVisibility>
  toggleFieldVisibility: (field: keyof FieldVisibility) => void
  highlightedField: string | null
  translations?: PartyTranslations
}

const defaultTranslationsByPrefix: Record<PartyPrefix, PartyTranslations> = {
  seller: {
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
      website: "example.com",
    },
  },
  buyer: {
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
      website: "client.com",
    },
  },
}

export function PartyInformation({
  prefix,
  control,
  fieldVisibility,
  toggleFieldVisibility,
  highlightedField,
  translations,
}: PartyInformationProps) {
  const t = translations || defaultTranslationsByPrefix[prefix]

  // Build field names from prefix
  const fieldName = (suffix: string) => `${prefix}${suffix}` as FieldPath<InvoiceFormValues>
  const visibilityKey = (suffix: string) => `${prefix}${suffix}` as keyof FieldVisibility

  return (
    <Card className="card-content">
      <CardHeader>
        <CardTitle>{t.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Company Name */}
        <FormField
          control={control}
          name={fieldName("CompanyName")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.companyName} *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value as string}
                  maxLength={100}
                  placeholder={t.placeholders.companyName}
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                  className={highlightedField === fieldName("CompanyName") ? "border-red-500 error-highlight" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address */}
        <FormField
          control={control}
          name={fieldName("Address")}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t.address} *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value as string}
                  maxLength={250}
                  placeholder={t.placeholders.address}
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                  className={highlightedField === fieldName("Address") ? "border-red-500 error-highlight" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Company ID */}
        <FormField
          control={control}
          name={fieldName("CompanyId")}
          render={({ field }) => (
            <ToggleableFormField
              label={t.companyId}
              fieldName={fieldName("CompanyId")}
              field={field}
              placeholder={t.placeholders.companyId}
              maxLength={40}
              isVisible={fieldVisibility[visibilityKey("CompanyId")] ?? false}
              onToggle={() => toggleFieldVisibility(visibilityKey("CompanyId"))}
              highlightedField={highlightedField}
              hideText={t.hide}
              showText={t.show}
            />
          )}
        />

        {/* VAT ID */}
        <FormField
          control={control}
          name={fieldName("VatId")}
          render={({ field }) => (
            <ToggleableFormField
              label={t.vatId}
              fieldName={fieldName("VatId")}
              field={field}
              placeholder={t.placeholders.vatId}
              maxLength={43}
              isVisible={fieldVisibility[visibilityKey("VatId")] ?? false}
              onToggle={() => toggleFieldVisibility(visibilityKey("VatId"))}
              highlightedField={highlightedField}
              hideText={t.hide}
              showText={t.show}
            />
          )}
        />

        {/* Email */}
        <FormField
          control={control}
          name={fieldName("Email")}
          render={({ field }) => (
            <ToggleableFormField
              label={t.email}
              fieldName={fieldName("Email")}
              field={field}
              placeholder={t.placeholders.email}
              maxLength={90}
              type="email"
              isVisible={fieldVisibility[visibilityKey("Email")] ?? false}
              onToggle={() => toggleFieldVisibility(visibilityKey("Email"))}
              highlightedField={highlightedField}
              sanitizer={(value) => value}
              hideText={t.hide}
              showText={t.show}
            />
          )}
        />

        {/* Website */}
        <FormField
          control={control}
          name={fieldName("Website")}
          render={({ field }) => (
            <ToggleableFormField
              label={t.website}
              fieldName={fieldName("Website")}
              field={field}
              placeholder={t.placeholders.website}
              maxLength={60}
              type="text"
              isVisible={fieldVisibility[visibilityKey("Website")] ?? false}
              onToggle={() => toggleFieldVisibility(visibilityKey("Website"))}
              highlightedField={highlightedField}
              sanitizer={(value) => value.replace(/^(https?:\/\/)/, "")}
              hideText={t.hide}
              showText={t.show}
            />
          )}
        />
      </CardContent>
    </Card>
  )
}
