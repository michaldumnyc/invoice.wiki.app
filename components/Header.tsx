"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { MobileMenu } from "./MobileMenu"
import { Analytics } from "@vercel/analytics/react"

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="w-full px-3 sm:px-4 py-4">
        {/* Reduced padding and removed container class */}
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-blue-500 hover:text-blue-600 transition-colors truncate"
          >
            Invoice.wiki
          </Link>

          {/* Desktop Navigation */}
          <ul className="lg:flex space-x-6">
            <li>
              <Link
                href="/about"
                className={cn(
                  "text-gray-600 hover:text-blue-500 transition-colors",
                  pathname === "/about" && "text-blue-500",
                )}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/create-invoice"
                className={cn(
                  "text-gray-600 hover:text-blue-500 transition-colors",
                  pathname === "/create-invoice" && "text-blue-500",
                )}
              >
                Create Invoice
              </Link>
            </li>
          </ul>

          {/* Mobile Menu */}
          <MobileMenu />
        </nav>
      </div>
      <Analytics />
    </header>
  )
}
