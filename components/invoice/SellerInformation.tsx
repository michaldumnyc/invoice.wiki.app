import React from "react"
import { Control } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ToggleableFormField } from "@/components/ui/toggleable-form-field"
import { sanitizeInput, sanitizeEmail, sanitizeWebsite } from "@/lib/security"
import { FieldVisibility, InvoiceFormValues } from "./types"

interface SellerInformationProps {
  control: Control<InvoiceFormValues>
  fieldVisibility: Pick<FieldVisibility, 'sellerCompanyId' | 'sellerVatId' | 'sellerEmail' | 'sellerWebsite'>
  toggleFieldVisibility: (field: keyof FieldVisibility) => void
  highlightedField: string | null
}

export function SellerInformation({
  control,
  fieldVisibility,
  toggleFieldVisibility,
  highlightedField
}: SellerInformationProps) {
  return (
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
                  placeholder="Your Company Name"
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
              <FormLabel>Address *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  maxLength={250}
                  placeholder="123 Business St, City, Country"
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
              label="Company ID"
              fieldName="sellerCompanyId"
              field={field}
              isVisible={fieldVisibility.sellerCompanyId}
              onToggle={() => toggleFieldVisibility("sellerCompanyId")}
              maxLength={40}
              sanitizer={sanitizeInput}
              highlightedField={highlightedField}
              placeholder="12345678"
            />
          )}
        />

        {/* sellerVatId */}
        <FormField
          control={control}
          name="sellerVatId"
          render={({ field }) => (
            <ToggleableFormField
              label="VAT ID"
              fieldName="sellerVatId"
              field={field}
              isVisible={fieldVisibility.sellerVatId}
              onToggle={() => toggleFieldVisibility("sellerVatId")}
              maxLength={43}
              sanitizer={sanitizeInput}
              highlightedField={highlightedField}
              placeholder="GB123456789"
            />
          )}
        />

        {/* sellerEmail */}
        <FormField
          control={control}
          name="sellerEmail"
          render={({ field }) => (
            <ToggleableFormField
              label="Email"
              fieldName="sellerEmail"
              field={field}
              isVisible={fieldVisibility.sellerEmail}
              onToggle={() => toggleFieldVisibility("sellerEmail")}
              maxLength={90}
              sanitizer={sanitizeEmail}
              highlightedField={highlightedField}
              type="email"
              placeholder="contact@company.com"
            />
          )}
        />

        {/* sellerWebsite */}
        <FormField
          control={control}
          name="sellerWebsite"
          render={({ field }) => (
            <ToggleableFormField
              label="Website"
              fieldName="sellerWebsite"
              field={field}
              isVisible={fieldVisibility.sellerWebsite}
              onToggle={() => toggleFieldVisibility("sellerWebsite")}
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