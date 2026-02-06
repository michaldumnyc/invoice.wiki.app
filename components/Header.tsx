"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useLocale } from "@/app/[locale]/providers"
import { LOCALES, LOCALE_NAMES } from "@/lib/constants"

export default function Header() {
  const pathname = usePathname()
  const { locale, dict } = useLocale()

  // Strip locale prefix for active link matching
  const pathWithoutLocale = pathname.replace(new RegExp(`^/${locale}`), "") || "/"

  // Build locale-aware href
  const href = (path: string) => `/${locale}${path === "/" ? "" : path}`

  // Build locale switcher URL (keep current path, change locale)
  const switchLocale = (newLocale: string) => `/${newLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm border-b">
      <div className="w-full px-3 sm:px-4 py-4">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link
            href={href("/")}
            className="text-xl sm:text-2xl font-bold text-primary hover:text-primary/90 transition-colors truncate"
          >
            Invoice.wiki
          </Link>

          {/* Desktop & Tablet Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href={href("/")}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    pathWithoutLocale === "/" && "text-primary"
                  )}
                >
                  {dict.home}
                </Link>
              </li>
              <li>
                <Link
                  href={href("/create-invoice")}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    pathWithoutLocale === "/create-invoice" && "text-primary"
                  )}
                >
                  {dict.createInvoice}
                </Link>
              </li>
              <li>
                <Link
                  href={href("/faq")}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    pathWithoutLocale === "/faq" && "text-primary"
                  )}
                >
                  {dict.faq}
                </Link>
              </li>
              <li>
                <Link
                  href={href("/about")}
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    pathWithoutLocale === "/about" && "text-primary"
                  )}
                >
                  {dict.about}
                </Link>
              </li>
            </ul>

            {/* Locale Switcher */}
            <select
              value={locale}
              onChange={(e) => {
                window.location.href = switchLocale(e.target.value)
              }}
              className="text-sm bg-background border border-input rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Language"
            >
              {LOCALES.map((loc) => (
                <option key={loc} value={loc}>
                  {LOCALE_NAMES[loc]}
                </option>
              ))}
            </select>

            <ThemeToggle />
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  )
}
