"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"
import { Analytics } from "@vercel/analytics/react"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background backdrop-blur-sm border-b">
      <div className="w-full px-3 sm:px-4 py-4">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-primary hover:text-primary/90 transition-colors truncate"
          >
            Invoice.wiki
          </Link>

          {/* Desktop & Tablet Navigation (Visible on lg and larger) */}
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="flex space-x-6">
              <li>
                <Link
                  href="/"
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    pathname === "/" && "text-primary",
                  )}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    pathname === "/about" && "text-primary",
                  )}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/create-invoice"
                  className={cn(
                    "text-foreground hover:text-primary transition-colors",
                    pathname === "/create-invoice" && "text-primary",
                  )}
                >
                  Create Invoice
                </Link>
              </li>
            </ul>
            <ThemeToggle />
          </div>

          {/* Mobile Menu (Visible only on small screens) */}
          <div className="lg:hidden flex items-center space-x-4">
            <ThemeToggle />
            <MobileMenu />
          </div>
        </nav>
      </div>
      <Analytics />
    </header>
  )
}
