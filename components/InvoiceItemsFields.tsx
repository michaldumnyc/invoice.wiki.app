import type React from "react"
import { useFormContext, FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove } from "react-hook-form"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { InvoiceFormValues } from "@/types/invoice"

interface InvoiceItemsFieldsProps {
  // Массив полей, возвращаемый useFieldArray
  fields: FieldArrayWithId<InvoiceFormValues, "items", "id">[]

  // Функция добавления элемента в массив
  append: UseFieldArrayAppend<InvoiceFormValues, "items">

  // Функция удаления элемента по индексу
  remove: UseFieldArrayRemove
}

export const InvoiceItemsFields: React.FC<InvoiceItemsFieldsProps> = ({ fields, append, remove }) => {
  const { control } = useFormContext<InvoiceFormValues>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <FormField
                  control={control}
                  name={`items.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`items.${index}.vatRate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VAT Rate (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="w-32"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => append({ name: "", quantity: 1, price: 0, vatRate: 0 })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
