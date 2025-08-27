"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const closeMenu = () => setIsOpen(false)

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        className="relative z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" onClick={closeMenu}>
          <div
            className="fixed top-[64px] left-0 right-0 p-4 bg-background border-b"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={cn("px-4 py-2 text-sm rounded-md hover:bg-accent", pathname === "/" && "bg-accent")}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/create-invoice"
                className={cn(
                  "px-4 py-2 text-sm rounded-md hover:bg-accent",
                  pathname === "/create-invoice" && "bg-accent",
                )}
                onClick={closeMenu}
              >
                Create Invoice
              </Link>

              <Link
                href="/faq"
                className={cn("px-4 py-2 text-sm rounded-md hover:bg-accent", pathname === "/faq" && "bg-accent")}
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <Link
                href="/about"
                className={cn("px-4 py-2 text-sm rounded-md hover:bg-accent", pathname === "/about" && "bg-accent")}
                onClick={closeMenu}
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}

