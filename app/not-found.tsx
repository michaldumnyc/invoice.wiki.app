import React from "react"
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
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:bg-gradient-to-br dark:from-background dark:via-secondary dark:to-background overflow-hidden relative">
        {/* Floating Documents Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-pulse">
            <div className="w-16 h-20 bg-card rounded shadow-lg border border-border transform rotate-12 opacity-70">
              <div className="p-1 space-y-1">
                <div className="h-1 bg-muted rounded"></div>
                <div className="h-1 bg-muted rounded w-3/4"></div>
                <div className="h-1 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/3 right-1/4 animate-pulse">
            <div className="w-14 h-18 bg-card rounded shadow-lg border border-border transform -rotate-6 opacity-60">
              <div className="p-1 space-y-1">
                <div className="h-1 bg-muted rounded"></div>
                <div className="h-1 bg-muted rounded w-2/3"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-1/3 left-1/3 animate-pulse">
            <div className="w-12 h-16 bg-card rounded shadow-lg border border-border transform rotate-45 opacity-50">
              <div className="p-1 space-y-1">
                <div className="h-1 bg-muted rounded"></div>
                <div className="h-1 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-1/4 right-1/3 animate-pulse">
            <div className="w-18 h-22 bg-card rounded shadow-lg border border-border transform -rotate-12 opacity-40">
              <div className="p-1 space-y-1">
                <div className="h-1 bg-muted rounded"></div>
                <div className="h-1 bg-muted rounded w-3/4"></div>
                <div className="h-1 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Error Content */}
        <div className="relative z-10 text-center">
          <div className="w-24 h-32 bg-card rounded-lg shadow-2xl border-2 border-red-200 dark:border-red-800 transform rotate-3 mx-auto mb-8 overflow-hidden">
            <div className="p-3 space-y-2">
              <div className="h-2 bg-red-300 dark:bg-red-700 rounded"></div>
              <div className="h-1 bg-muted rounded"></div>
              <div className="h-1 bg-muted rounded w-3/4"></div>
              <div className="h-1 bg-muted rounded w-1/2"></div>
              <div className="h-8 bg-red-100 dark:bg-red-900 rounded mt-3"></div>
            </div>
          </div>

          {/* Animated 404 Number */}
          <h1 className="text-8xl md:text-9xl font-bold text-foreground mb-4 animate-bounce">
            404
          </h1>

          {/* Main Message */}
          <div className="mb-8">
            <p className="text-xl md:text-2xl text-muted-foreground mb-2">
              Invoice Not Found!
            </p>
            
            <p className="text-lg text-muted-foreground mb-8">
              Looks like this invoice escaped our filing system.
            </p>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8">
            Don't worry! Let's get you back to creating professional invoices
          </p>
        </div>

        {/* Animated Button */}
        <div className="space-y-6">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              🏠 Return to Invoice Generator
            </Button>
          </Link>

          <div className="mt-8">
            <Link href="/create-invoice" className="text-primary hover:text-primary/80 underline hover:no-underline transition-colors duration-200">
              Or start creating an invoice right away →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
