"use client"

import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

interface ContactButtonProps {
  email: string
}

export function ContactButton({ email }: ContactButtonProps) {
  return (
    <Button
      onClick={() => (window.location.href = `mailto:${email}`)}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      <Mail className="mr-2 h-4 w-4" /> Contact Support
    </Button>
  )
}

