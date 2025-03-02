"use client"

import React from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function ErrorPage() {
  return (
    <>
      <Header />
      <main className="flex-1 pt-[72px] sm:pt-[80px] flex items-center justify-center min-h-[70vh]">
        <div className="p-6 max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-bold text-red-700 mb-2">An Error Occurred</h2>
          <p className="text-red-600">
            Unable to load the invoice creation page. Please try refreshing the page or come back later.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

