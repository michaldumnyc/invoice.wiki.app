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
}

export function BuyerInformation({
  control,
  fieldVisibility,
  toggleFieldVisibility,
  highlightedField
}: BuyerInformationProps) {
  return (
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
                  placeholder="Client Company Name"
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
              <FormLabel>Address *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  maxLength={250}
                  placeholder="456 Client Ave, City, Country"
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
              label="Company ID"
              fieldName="buyerCompanyId"
              field={field}
              isVisible={fieldVisibility.buyerCompanyId}
              onToggle={() => toggleFieldVisibility("buyerCompanyId")}
              maxLength={40}
              sanitizer={sanitizeInput}
              highlightedField={highlightedField}
              placeholder="87654321"
            />
          )}
        />

        {/* buyerVatId */}
        <FormField
          control={control}
          name="buyerVatId"
          render={({ field }) => (
            <ToggleableFormField
              label="VAT ID"
              fieldName="buyerVatId"
              field={field}
              isVisible={fieldVisibility.buyerVatId}
              onToggle={() => toggleFieldVisibility("buyerVatId")}
              maxLength={43}
              sanitizer={sanitizeInput}
              highlightedField={highlightedField}
              placeholder="DE987654321"
            />
          )}
        />

        {/* buyerEmail */}
        <FormField
          control={control}
          name="buyerEmail"
          render={({ field }) => (
            <ToggleableFormField
              label="Email"
              fieldName="buyerEmail"
              field={field}
              isVisible={fieldVisibility.buyerEmail}
              onToggle={() => toggleFieldVisibility("buyerEmail")}
              maxLength={90}
              sanitizer={sanitizeEmail}
              highlightedField={highlightedField}
              type="email"
              placeholder="client@company.com"
            />
          )}
        />

        {/* buyerWebsite */}
        <FormField
          control={control}
          name="buyerWebsite"
          render={({ field }) => (
            <ToggleableFormField
              label="Website"
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
              placeholder="example.com"
            />
          )}
        />
      </CardContent>
    </Card>
  )
} 