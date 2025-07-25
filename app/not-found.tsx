import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found - Invoice.wiki",
  description: "The page you're looking for doesn't exist. Return to Invoice.wiki free invoice generator to create professional invoices online.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Return to our free invoice maker to create professional invoices</p>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
