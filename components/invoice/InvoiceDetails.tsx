import React from "react"
import { Control } from "react-hook-form"
import { format, isValid } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sanitizeInput } from "@/lib/security"
import { currencies } from "@/app/utils/currencies"
import { InvoiceFormValues } from "./types"

interface InvoiceDetailsProps {
  control: Control<any>
  highlightedField: string | null
  isMobile: boolean
}

export function InvoiceDetails({ control, highlightedField, isMobile }: InvoiceDetailsProps) {
  return (
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
                    placeholder="INV-2024-001"
                    autoComplete="off"
                    data-lpignore="true"
                    data-form-type="other"
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
                    value={isValid(field.value) ? format(field.value, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const date = new Date(e.target.value)
                      if (isValid(date)) {
                        field.onChange(date)
                      }
                    }}
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
                    value={isValid(field.value) ? format(field.value, "yyyy-MM-dd") : ""}
                    onChange={(e) => {
                      const date = new Date(e.target.value)
                      if (isValid(date)) {
                        field.onChange(date)
                      }
                    }}
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
  )
}
