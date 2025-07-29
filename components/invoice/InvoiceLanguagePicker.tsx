"use client"

import React from "react"
import { invoiceLanguages, type InvoiceLanguage } from "@/app/utils/invoice-languages"
import { cn } from "@/lib/utils"

interface InvoiceLanguagePickerProps {
  selectedLanguageId: string
  onLanguageChange: (languageId: string) => void
  className?: string
  translations?: {
    title: string
    description: string
    selected: string
  }
}

export function InvoiceLanguagePicker({ selectedLanguageId, onLanguageChange, className, translations }: InvoiceLanguagePickerProps) {
  const defaultTranslations = {
    title: "Invoice Language",
    description: "Choose the language for your invoice content and labels",
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
      
      <div className="grid grid-cols-3 gap-3">
        {invoiceLanguages.map((language) => (
          <button
            key={language.id}
            type="button"
            onClick={() => onLanguageChange(language.id)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
              selectedLanguageId === language.id 
                ? "border-primary bg-primary/10 ring-2 ring-primary ring-offset-2 scale-105" 
                : "border-border hover:border-muted-foreground bg-card"
            )}
            title={`Select ${language.name}`}
            aria-label={`Select ${language.name} language`}
          >
            {/* Flag and text */}
            <span className="text-2xl" role="img" aria-label={`${language.name} flag`}>
              {language.flag}
            </span>
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-sm font-medium text-foreground truncate">
                {language.name}
              </span>
              {selectedLanguageId === language.id && (
                <span className="text-xs text-primary font-medium">
                  {t.selected}
                </span>
              )}
            </div>
            
            {/* Selected indicator */}
            {selectedLanguageId === language.id && (
              <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
            )}
          </button>
        ))}
      </div>
      
      <div className="text-xs text-muted-foreground">
        {t.selected}: <span className="font-medium">{invoiceLanguages.find(l => l.id === selectedLanguageId)?.name || 'English'}</span>
      </div>
    </div>
  )
} 