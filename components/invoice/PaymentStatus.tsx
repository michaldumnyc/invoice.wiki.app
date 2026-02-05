import React from "react"
import { Control } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { InvoiceFormValues } from "./types"

interface PaymentStatusProps {
  control: Control<InvoiceFormValues>
}

export function PaymentStatus({ control }: PaymentStatusProps) {
  return (
    <Card className="card-content">
      <CardHeader>
        <CardTitle>Payment Status</CardTitle>
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
                <FormLabel>Mark as Paid</FormLabel>
              </div>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}
