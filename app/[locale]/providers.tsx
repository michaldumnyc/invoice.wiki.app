"use client"

import { createContext, useContext } from "react"
import type { Dictionary } from "@/lib/get-dictionary"

interface LocaleContextValue {
  locale: string
  dict: Dictionary["nav"] & { footer: Dictionary["footer"] }
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}

export function LocaleProvider({
  locale,
  nav,
  footer,
  children,
}: {
  locale: string
  nav: Dictionary["nav"]
  footer: Dictionary["footer"]
  children: React.ReactNode
}) {
  return <LocaleContext.Provider value={{ locale, dict: { ...nav, footer } }}>{children}</LocaleContext.Provider>
}
