import React from "react"
import { currencies } from "@/app/utils/currencies"

interface InvoiceTotalsProps {
  totals: {
    net: number
    vat: number
    grand: number
  }
  currency: string
  isPaid: boolean
}

export function InvoiceTotals({ totals, currency, isPaid }: InvoiceTotalsProps) {
  if (totals.grand <= 0) return null

  // Get currency symbol for display consistency with PDF
  const currencyData = currencies.find((c) => c.code === currency)
  const currencySymbol = currencyData?.symbol || currency

  return (
    <div className="mt-8 text-right space-y-2">
      <div className="flex flex-col items-end">
        <div className="grid grid-cols-2 gap-x-4 text-right">
          <span className="text-muted-foreground">Net Total:</span>
          <span className="text-foreground font-medium">
            {currencySymbol} {totals.net.toFixed(2)}
          </span>

          <span className="text-muted-foreground">VAT Total:</span>
          <span className="text-foreground font-medium">
            {currencySymbol} {totals.vat.toFixed(2)}
          </span>

          <span className="text-muted-foreground font-bold">Total Due:</span>
          <span className="text-foreground font-bold text-lg">
            {currencySymbol} {totals.grand.toFixed(2)}
          </span>
        </div>

        {isPaid && (
          <div className="text-destructive font-bold mt-2 flex items-center">
            <span className="text-xl">PAID!</span>
          </div>
        )}
      </div>
    </div>
  )
} 