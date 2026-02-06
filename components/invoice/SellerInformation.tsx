import React from "react"
import { Control } from "react-hook-form"
import { PartyInformation, PartyTranslations } from "./PartyInformation"
import { FieldVisibility, InvoiceFormValues } from "./types"

interface SellerInformationProps {
  control: Control<InvoiceFormValues>
  fieldVisibility: Partial<FieldVisibility>
  toggleFieldVisibility: (field: keyof FieldVisibility) => void
  highlightedField: string | null
  translations?: PartyTranslations
}

export function SellerInformation(props: SellerInformationProps) {
  return <PartyInformation prefix="seller" {...props} />
}
