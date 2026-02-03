"use client"

import React from "react"
import { invoiceLanguages, type InvoiceLanguage } from "@/app/utils/invoice-languages"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export function InvoiceLanguagePicker({
  selectedLanguageId,
  onLanguageChange,
  className,
  translations,
}: InvoiceLanguagePickerProps) {
  const defaultTranslations = {
    title: "Invoice Language",
    description: "Choose the language for your invoice content and labels",
    selected: "Selected",
  }

  const t = translations || defaultTranslations
  const selectedLanguage = invoiceLanguages.find((l) => l.id === selectedLanguageId)

  return (
    <div className={cn("space-y-2", className)}>
      <label className="text-sm font-medium text-foreground">{t.title}</label>

      <Select value={selectedLanguageId} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-full" aria-label="Select invoice language">
          <SelectValue>
            {selectedLanguage && (
              <div className="flex items-center gap-2">
                <span className="text-lg" role="img" aria-label={`${selectedLanguage.name} flag`}>
                  {selectedLanguage.flag}
                </span>
                <span>{selectedLanguage.name}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {invoiceLanguages.map((language) => (
            <SelectItem key={language.id} value={language.id}>
              <div className="flex items-center gap-2">
                <span className="text-lg" role="img" aria-label={`${language.name} flag`}>
                  {language.flag}
                </span>
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
