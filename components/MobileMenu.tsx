"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLocale } from "@/app/[locale]/providers"
import { LOCALES, LOCALE_NAMES } from "@/lib/constants"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { locale, dict } = useLocale()

  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/"
  const href = (path: string) => `/${locale}${path === "/" ? "" : path}`
  const switchLocale = (newLocale: string) => `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`

  const closeMenu = useCallback(() => setIsOpen(false), [])

  // Lock body scroll + Escape key handler
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeMenu()
      }
      document.addEventListener("keydown", handleEscape)

      return () => {
        document.body.style.overflow = ""
        document.removeEventListener("keydown", handleEscape)
      }
    }
  }, [isOpen, closeMenu])

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="relative z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? dict.closeMenu : dict.openMenu}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={closeMenu}>
          <div
            className="fixed top-[64px] left-0 right-0 p-4 bg-background border-b"
            onClick={(e) => e.stopPropagation()}
          >
            <nav aria-label="Mobile navigation" className="flex flex-col space-y-4">
              <Link
                href={href("/")}
                className={cn("px-4 py-2 text-sm rounded-md hover:bg-accent", pathWithoutLocale === "/" && "bg-accent")}
                onClick={closeMenu}
              >
                {dict.home}
              </Link>
              <Link
                href={href("/create-invoice")}
                className={cn(
                  "px-4 py-2 text-sm rounded-md hover:bg-accent",
                  pathWithoutLocale === "/create-invoice" && "bg-accent"
                )}
                onClick={closeMenu}
              >
                {dict.createInvoice}
              </Link>
              <Link
                href={href("/faq")}
                className={cn(
                  "px-4 py-2 text-sm rounded-md hover:bg-accent",
                  pathWithoutLocale === "/faq" && "bg-accent"
                )}
                onClick={closeMenu}
              >
                {dict.faq}
              </Link>
              <Link
                href={href("/about")}
                className={cn(
                  "px-4 py-2 text-sm rounded-md hover:bg-accent",
                  pathWithoutLocale === "/about" && "bg-accent"
                )}
                onClick={closeMenu}
              >
                {dict.about}
              </Link>

              {/* Locale Switcher */}
              <select
                value={locale}
                onChange={(e) => {
                  const newLocale = e.target.value
                  if (!LOCALES.includes(newLocale as (typeof LOCALES)[number])) return
                  window.location.href = switchLocale(newLocale)
                }}
                className="mx-4 text-sm bg-background border border-input rounded-md px-3 py-2"
                aria-label="Language"
              >
                {LOCALES.map((loc) => (
                  <option key={loc} value={loc}>
                    {LOCALE_NAMES[loc]}
                  </option>
                ))}
              </select>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
