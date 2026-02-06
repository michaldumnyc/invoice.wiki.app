import React from "react"
import { Control } from "react-hook-form"
import { PartyInformation, PartyTranslations } from "./PartyInformation"
import { FieldVisibility, InvoiceFormValues } from "./types"

interface BuyerInformationProps {
  control: Control<InvoiceFormValues>
  fieldVisibility: Partial<FieldVisibility>
  toggleFieldVisibility: (field: keyof FieldVisibility) => void
  highlightedField: string | null
  translations?: PartyTranslations
}

export function BuyerInformation(props: BuyerInformationProps) {
  return <PartyInformation prefix="buyer" {...props} />
}
