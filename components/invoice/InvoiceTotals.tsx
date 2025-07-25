import React from "react"

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

  return (
    <div className="mt-8 text-right space-y-2">
      <div className="flex flex-col items-end">
        <div className="grid grid-cols-2 gap-x-4 text-right">
          <span className="text-gray-600">Net Total:</span>
          <span className="font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency,
            }).format(totals.net)}
          </span>

          <span className="text-gray-600">VAT Total:</span>
          <span className="font-medium">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency,
            }).format(totals.vat)}
          </span>

          <span className="text-gray-600 font-bold">Total Due:</span>
          <span className="font-bold">
            {isPaid
              ? "PAID!"
              : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: currency,
                }).format(totals.grand)}
          </span>
        </div>

        {isPaid && (
          <div className="text-red-500 font-bold mt-2 flex items-center">
            <span className="text-xl">PAID!</span>
          </div>
        )}
      </div>
    </div>
  )
} 