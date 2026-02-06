"use client"

import React from "react"
import { invoiceColors } from "@/app/utils/invoice-colors"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InvoiceColorPickerProps {
  selectedColorId: string
  onColorChange: (colorId: string) => void
  className?: string
  translations?: {
    title: string
    description: string
    selected: string
  }
  colorNames?: Record<string, string>
}

export function InvoiceColorPicker({
  selectedColorId,
  onColorChange,
  className,
  translations,
  colorNames,
}: InvoiceColorPickerProps) {
  const defaultTranslations = {
    title: "Invoice Accent Color",
    description: "Choose the accent color for your invoice headers and highlights",
    selected: "Selected",
  }

  const t = translations || defaultTranslations
  const selectedColor = invoiceColors.find((c) => c.id === selectedColorId)

  const getColorName = (color: { id: string; name: string }) => {
    return colorNames?.[color.id] ?? color.name
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground">{t.title}</label>

      <Select value={selectedColorId} onValueChange={onColorChange}>
        <SelectTrigger className="w-full" aria-label="Select invoice accent color">
          <SelectValue>
            {selectedColor && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full overflow-hidden border border-border">
                  <div className="w-full h-full" style={{ backgroundColor: selectedColor.hex }}></div>
                </div>
                <span>{getColorName(selectedColor)}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {invoiceColors.map((color) => (
            <SelectItem key={color.id} value={color.id}>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full overflow-hidden border border-border">
                  <div className="w-full h-full" style={{ backgroundColor: color.hex }}></div>
                </div>
                <span>{getColorName(color)}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
