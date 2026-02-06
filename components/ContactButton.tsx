"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactButtonProps {
  email: string
}

export function ContactButton({ email }: ContactButtonProps) {
  const isValidEmail = EMAIL_REGEX.test(email)

  if (!isValidEmail) return null

  return (
    <Button
      onClick={() => (window.location.href = `mailto:${encodeURIComponent(email)}`)}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      <Mail className="mr-2 h-4 w-4" /> Contact Support
    </Button>
  )
}
