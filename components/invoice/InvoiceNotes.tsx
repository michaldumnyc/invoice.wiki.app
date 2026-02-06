import React from "react"
import { Control } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { sanitizeInput } from "@/lib/security"
import { InvoiceFormValues } from "./types"
import type { FormLanguage } from "@/app/utils/form-languages"

interface InvoiceNotesProps {
  control: Control<InvoiceFormValues>
  highlightedField: string | null
  translations?: Pick<FormLanguage["form"], "notes" | "notesField" | "placeholders">
}

export function InvoiceNotes({ control, highlightedField, translations: t }: InvoiceNotesProps) {
  return (
    <Card className="card-content">
      <CardHeader>
        <CardTitle>{t?.notes ?? "Notes"}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t?.notesField ?? "Notes (max 210 characters)"}</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  maxLength={210}
                  placeholder={t?.placeholders?.notes ?? "Payment terms: Net 30 days. Thank you for your business!"}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-bwignore="true"
                  data-dashlane-ignore="true"
                  data-form-type="other"
                  data-testid="invoice-notes"
                  role="textbox"
                  aria-label="Invoice notes and payment terms"
                  onFocus={(e) => {
                    // Prevent browser extensions from interfering
                    e.target.setAttribute("data-form-type", "other")
                    e.target.setAttribute("autocomplete", "off")
                  }}
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
