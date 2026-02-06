"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "privacy-banner-dismissed"

export function PrivacyBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let show = true
    try {
      show = localStorage.getItem(STORAGE_KEY) !== "true"
    } catch {
      // localStorage unavailable (e.g. private browsing)
    }
    // Reading from localStorage on mount — valid external store sync
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible((prev) => (prev !== show ? show : prev))
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true")
    } catch {
      // localStorage unavailable
    }
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 text-white backdrop-blur-sm",
        "transform transition-transform duration-300 ease-in-out",
        "border-t border-gray-800"
      )}
    >
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <p className="text-sm text-center sm:text-left flex-1">
            This website uses Vercel for hosting. Vercel collects basic visit statistics (e.g., IP address, browser
            type) for operational purposes. By using this site, you agree to these terms.
          </p>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/privacy-policy">
              <Button variant="link" size="sm" className="text-blue-400 hover:text-blue-300 p-0">
                View Privacy Policy
              </Button>
            </Link>
            <Button
              onClick={handleAccept}
              size="sm"
              className="whitespace-nowrap bg-white text-gray-900 hover:bg-gray-100"
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
