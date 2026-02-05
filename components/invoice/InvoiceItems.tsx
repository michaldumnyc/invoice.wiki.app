import React from "react"
import { Control, FieldArrayWithId, UseFieldArrayRemove, UseFieldArrayAppend } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { sanitizeInput, sanitizeNumber } from "@/lib/security"
import { InvoiceFormValues } from "./types"

interface InvoiceItemsProps {
  control: Control<InvoiceFormValues>
  fields: FieldArrayWithId<InvoiceFormValues, "items", "id">[]
  append: UseFieldArrayAppend<InvoiceFormValues, "items">
  remove: UseFieldArrayRemove
  highlightedField: string | null
  isMobile: boolean
  showTaxColumn?: boolean
}

export function InvoiceItems({
  control,
  fields,
  append,
  remove,
  highlightedField,
  isMobile,
  showTaxColumn = true,
}: InvoiceItemsProps) {
  return (
    <Card className="card-content">
      <CardHeader>
        <CardTitle>Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((fieldItem, index) => (
            <div key={fieldItem.id} className="space-y-4">
              <div
                className={`grid ${
                  isMobile ? "grid-cols-1" : showTaxColumn ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1 md:grid-cols-3"
                } gap-4`}
              >
                {/* item name */}
                <FormField
                  control={control}
                  name={`items.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={130}
                          placeholder="Product or service name"
                          autoComplete="off"
                          data-lpignore="true"
                          data-form-type="other"
                          onChange={(e) => field.onChange(sanitizeInput(e.target.value))}
                          className={highlightedField === `items.${index}.name` ? "border-red-500 error-highlight" : ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* quantity */}
                <FormField
                  control={control}
                  name={`items.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          autoComplete="off"
                          data-lpignore="true"
                          data-form-type="other"
                          onChange={(e) => {
                            const raw = sanitizeNumber(e.target.value)
                            let valueNum = parseInt(raw, 10)
                            if (Number.isNaN(valueNum) || valueNum < 1) {
                              valueNum = 1
                            }
                            // limit from 1 to 999999
                            const clamped = Math.min(valueNum, 999999)
                            field.onChange(clamped)
                          }}
                          min={1}
                          max={999999}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* price */}
                <FormField
                  control={control}
                  name={`items.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          autoComplete="off"
                          data-lpignore="true"
                          data-form-type="other"
                          onChange={(e) => {
                            const raw = sanitizeNumber(e.target.value)
                            let valueNum = parseFloat(raw)
                            if (Number.isNaN(valueNum) || valueNum < 0) {
                              valueNum = 0
                            }
                            // from 0 to 999999999
                            const clamped = Math.min(valueNum, 999999999)
                            field.onChange(clamped)
                          }}
                          min={0}
                          max={999999999}
                          step={0.01}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* taxRate - only show when tax is enabled */}
                {showTaxColumn && (
                  <FormField
                    control={control}
                    name={`items.${index}.vatRate`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax Rate (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            autoComplete="off"
                            data-lpignore="true"
                            data-form-type="other"
                            onChange={(e) => {
                              const raw = sanitizeNumber(e.target.value)
                              let valueNum = parseFloat(raw)
                              if (Number.isNaN(valueNum) || valueNum < 0) {
                                valueNum = 0
                              }
                              // from 0 to 100
                              const clamped = Math.min(valueNum, 100)
                              field.onChange(clamped)
                            }}
                            min={0}
                            max={100}
                            step={0.1}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="text-white font-medium"
                onClick={() => remove(index)}
                disabled={fields.length <= 1}
                aria-label={`Remove item ${index + 1}`}
              >
                <Trash2 className="h-4 w-4 mr-1" aria-hidden="true" />
                Remove
              </Button>
            </div>
          ))}

          {/* Add Item Button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "", quantity: 1, price: 0, vatRate: 0 })}
            disabled={fields.length >= 10}
            aria-label="Add new invoice item"
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Add Item
          </Button>
          {fields.length >= 10 && (
            <p className="text-sm text-muted-foreground mt-2">Maximum number of items (10) reached.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
