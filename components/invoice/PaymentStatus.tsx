import React from "react"
import { Control } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { InvoiceFormValues } from "./types"
import type { FormLanguage } from "@/app/utils/form-languages"

interface PaymentStatusProps {
  control: Control<InvoiceFormValues>
  translations?: Pick<FormLanguage["form"], "paymentStatus" | "markAsPaid">
}

export function PaymentStatus({ control, translations: t }: PaymentStatusProps) {
  return (
    <Card className="card-content">
      <CardHeader>
        <CardTitle>{t?.paymentStatus ?? "Payment Status"}</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="isPaid"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{t?.markAsPaid ?? "Mark as Paid"}</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
