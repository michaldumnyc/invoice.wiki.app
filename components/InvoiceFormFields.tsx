import { useState } from "react"
import type React from "react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { format } from "date-fns"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { currencies } from "@/app/utils/currencies"
import { InvoiceItemsFields } from "@/components/InvoiceItemsFields"
import type { InvoiceFormValues } from "@/types/invoice"

const paymentMethods = [
  { value: "bank_transfer", label: "Bank Transfer" },
  { value: "cash", label: "Cash" },
  { value: "credit_card", label: "Credit Card" },
  { value: "paypal", label: "PayPal" },
]

interface FieldVisibility {
  sellerCompanyId: boolean
  sellerVatId: boolean
  sellerEmail: boolean
  sellerWebsite: boolean
  buyerCompanyId: boolean
  buyerVatId: boolean
  buyerEmail: boolean
  buyerWebsite: boolean
  referenceNumber: boolean
  customerReferenceNumber: boolean
  orderNumber: boolean
  bankAccount: boolean
  iban: boolean
  swift: boolean
}

interface InvoiceFormFieldsProps {
  setTermsDialogOpen: (open: boolean) => void
  total: number
  currency: string
  isPaid: boolean
}

export const InvoiceFormFields: React.FC<InvoiceFormFieldsProps> = ({
  setTermsDialogOpen,
  total,
  currency,
  isPaid,
}) => {
  const { control, watch } = useFormContext<InvoiceFormValues>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const [fieldVisibility, setFieldVisibility] = useState<FieldVisibility>({
    sellerCompanyId: true,
    sellerVatId: true,
    sellerEmail: true,
    sellerWebsite: true,
    buyerCompanyId: true,
    buyerVatId: true,
    buyerEmail: true,
    buyerWebsite: true,
    referenceNumber: true,
    customerReferenceNumber: true,
    orderNumber: true,
    bankAccount: true,
    iban: true,
    swift: true,
  })

  const toggleFieldVisibility = (field: keyof FieldVisibility) => {
    setFieldVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  const paymentMethod = watch("paymentMethod")
  const items = watch("items")

  return (
    <>
      {/* Seller Information */}
      <Card>
        <CardHeader>
          <CardTitle>Seller Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="sellerCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="sellerAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add other seller fields here */}
        </CardContent>
      </Card>

      {/* Buyer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Buyer Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="buyerCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="buyerAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Add other buyer fields here */}
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Number *</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="issueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Issue Date *</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={format(field.value, "yyyy-MM-dd")}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date *</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      value={format(field.value, "yyyy-MM-dd")}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code} - {currency.name}
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

      {/* Payment Information */}
      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.value} value={method.value}>
                          {method.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {paymentMethod === "bank_transfer" && (
              <>
                <FormField
                  control={control}
                  name="bankAccount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Bank Account</FormLabel>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFieldVisibility("bankAccount")}
                        >
                          {fieldVisibility.bankAccount ? (
                            <EyeOff className="h-4 w-4 mr-2" />
                          ) : (
                            <Eye className="h-4 w-4 mr-2" />
                          )}
                          {fieldVisibility.bankAccount ? "Hide" : "Show"}
                        </Button>
                      </div>
                      <FormControl>{fieldVisibility.bankAccount && <Input {...field} />}</FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="iban"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>IBAN</FormLabel>
                        <Button type="button" variant="ghost" size="sm" onClick={() => toggleFieldVisibility("iban")}>
                          {fieldVisibility.iban ? (
                            <EyeOff className="h-4 w-4 mr-2" />
                          ) : (
                            <Eye className="h-4 w-4 mr-2" />
                          )}
                          {fieldVisibility.iban ? "Hide" : "Show"}
                        </Button>
                      </div>
                      <FormControl>{fieldVisibility.iban && <Input {...field} />}</FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="swift"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>SWIFT/BIC</FormLabel>
                        <Button type="button" variant="ghost" size="sm" onClick={() => toggleFieldVisibility("swift")}>
                          {fieldVisibility.swift ? (
                            <EyeOff className="h-4 w-4 mr-2" />
                          ) : (
                            <Eye className="h-4 w-4 mr-2" />
                          )}
                          {fieldVisibility.swift ? "Hide" : "Show"}
                        </Button>
                      </div>
                      <FormControl>{fieldVisibility.swift && <Input {...field} />}</FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (max 500 characters)</FormLabel>
                <FormControl>
                  <Textarea {...field} maxLength={500} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
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

      {/* Items */}
      <InvoiceItemsFields fields={fields} append={append} remove={remove} />

      <FormField
        control={control}
        name="termsAccepted"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
            <FormControl>
              <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setTermsDialogOpen(true)}
                  className="text-blue-500 hover:underline"
                >
                  invoice.wiki terms and conditions
                </button>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <div className="mt-8 text-right space-y-2">
        {total > 0 && (
          <>
            <div className="flex flex-col items-end">
              <div className="grid grid-cols-2 gap-x-4 text-right">
                <span className="text-gray-600">Net Total:</span>
                <span className="font-medium">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(
                    items.reduce((sum, item) => sum + item.quantity * item.price, 0),
                  )}
                </span>

                <span className="text-gray-600">VAT Total:</span>
                <span className="font-medium">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(
                    items.reduce((sum, item) => {
                      const netPrice = item.quantity * item.price
                      return sum + (netPrice * item.vatRate) / 100
                    }, 0),
                  )}
                </span>

                <span className="text-gray-600 font-bold">Total Due:</span>
                <span className="font-bold">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: currency }).format(total)}
                </span>
              </div>

              {isPaid && (
                <div className="text-red-500 font-bold mt-2 flex items-center">
                  <span className="text-xl">PAID!</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

