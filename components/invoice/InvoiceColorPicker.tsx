"use client"

import React from "react"
import { invoiceColors, type InvoiceColor } from "@/app/utils/invoice-colors"
import { cn } from "@/lib/utils"

interface InvoiceColorPickerProps {
  selectedColorId: string
  onColorChange: (colorId: string) => void
  className?: string
  translations?: {
    title: string
    description: string
    selected: string
  }
}

export function InvoiceColorPicker({ selectedColorId, onColorChange, className, translations }: InvoiceColorPickerProps) {
  const defaultTranslations = {
    title: "Invoice Accent Color",
    description: "Choose the accent color for your invoice headers and highlights",
    selected: "Selected"
  }
  
  const t = translations || defaultTranslations
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-foreground">
          {t.title}
        </label>
        <p className="text-xs text-muted-foreground">
          {t.description}
        </p>
      </div>
      
      <div className="grid grid-cols-5 gap-3">
        {invoiceColors.map((color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => onColorChange(color.id)}
            className={cn(
              "relative w-12 h-12 rounded-full border-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedColorId === color.id 
                ? "border-primary ring-2 ring-primary ring-offset-2 scale-105" 
                : "border-border hover:border-muted-foreground"
            )}
            title={color.name}
            aria-label={`Select ${color.name} color`}
          >
            {/* Half-circle split design */}
            <div className="w-full h-full rounded-full overflow-hidden relative">
              {/* White half */}
              <div className="absolute inset-0 bg-white"></div>
              {/* Colored half */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, transparent 50%, ${color.hex} 50%)`
                }}
              ></div>
              
              {/* Selected indicator */}
              {selectedColorId === color.id && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full border border-gray-400 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground">
        {t.selected}: <span className="font-medium">{invoiceColors.find(c => c.id === selectedColorId)?.name || 'Blue'}</span>
      </div>
    </div>
  )
} 