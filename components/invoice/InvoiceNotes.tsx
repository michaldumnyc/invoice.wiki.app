import React from "react"
import { Control } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { sanitizeInput } from "@/lib/security"
import { InvoiceFormValues } from "./types"

interface InvoiceNotesProps {
  control: Control<InvoiceFormValues>
  highlightedField: string | null
}

export function InvoiceNotes({ control, highlightedField }: InvoiceNotesProps) {
  return (
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
                  placeholder="Payment terms: Net 30 days. Thank you for your business!"
                  autoComplete="off"
                  data-lpignore="true"
                  data-form-type="other"
                  spellCheck="false"
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
  )
} 