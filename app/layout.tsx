import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import "./styles/components.css"
import type { Metadata } from "next"
import { headers } from "next/headers"
import Script from "next/script"
import { PrivacyBanner } from "@/components/PrivacyBanner"
import "../styles/global.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Invoice.wiki - Free Online Invoice Generator | Create & Download Invoices",
  description: "Generate invoices online for free. No registration required. Secure, simple, and fast invoice generator with PDF download and VAT support."  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nonce = headers().get("x-nonce")

  return (
    <html lang="en">
      <head>
        <meta name="x-nonce" content={nonce ?? undefined} />
      </head>
      <body className={inter.className}>
        {children}
        <PrivacyBanner />
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          nonce={nonce ?? undefined}
        />
      </body>
    </html>
  )  
}



import './globals.css'