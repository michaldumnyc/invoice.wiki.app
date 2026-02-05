import React from "react"
import type { ControllerRenderProps, Path } from "react-hook-form"
import type { z } from "zod"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { invoiceFormSchema } from "@/lib/schemas"

type InvoiceFormValues = z.infer<typeof invoiceFormSchema>

interface ToggleableFormFieldProps {
  label: string
  fieldName: string
  field: ControllerRenderProps<InvoiceFormValues, Path<InvoiceFormValues>>
  isVisible: boolean
  onToggle: () => void
  maxLength?: number
  sanitizer?: (value: string) => string
  highlightedField?: string | null
  placeholder?: string
  type?: string
  customContent?: React.ReactNode // For custom input content
  hideText?: string
  showText?: string
}

export function ToggleableFormField({
  label,
  fieldName,
  field,
  isVisible,
  onToggle,
  maxLength = 100,
  sanitizer = (value: string) => value,
  highlightedField,
  placeholder,
  type = "text",
  customContent,
  hideText = "Hide",
  showText = "Show",
}: ToggleableFormFieldProps) {
  return (
    <FormItem>
      <div className="flex justify-between items-center">
        <FormLabel>{label}</FormLabel>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onToggle}
          aria-label={isVisible ? `Hide ${label}` : `Show ${label}`}
        >
          {isVisible ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {isVisible ? hideText : showText}
        </Button>
      </div>
      {isVisible && (
        <FormControl>
          {customContent || (
            <Input
              name={field.name}
              value={String(field.value ?? "")}
              onBlur={field.onBlur}
              ref={field.ref}
              type={type}
              maxLength={maxLength}
              placeholder={placeholder}
              aria-label={label}
              autoComplete="off"
              data-lpignore="true"
              data-form-type="other"
              onChange={(e) => field.onChange(sanitizer(e.target.value))}
              className={highlightedField === fieldName ? "border-red-500 error-highlight" : ""}
            />
          )}
        </FormControl>
      )}
      <FormMessage />
    </FormItem>
  )
}
