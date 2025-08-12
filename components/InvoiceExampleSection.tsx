"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ImageModal } from "./ImageModal"

export function InvoiceExampleSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Invoice Example Section */}
      <section aria-labelledby="example-heading" className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-background dark:via-secondary dark:to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="example-heading" className="text-2xl sm:text-3xl font-bold text-center mb-4">
                See What You'll Create
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Generate professional invoices that impress clients and ensure prompt payment. Our free invoice generator creates clean, modern invoices with all essential business details, automatic calculations, and perfect formatting.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Invoice Preview Image */}
              <div className="order-2 lg:order-1">
                <div className="relative bg-card rounded-lg shadow-2xl p-4 sm:p-6 border border-border">
                  <div 
                    className="cursor-pointer transition-transform hover:scale-105 group"
                    onClick={openModal}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openModal()
                      }
                    }}
                    aria-label="Click to view invoice example in full size"
                  >
                    <Image 
                      src="/images/invoice-example.png"
                      alt="Professional invoice example created with Invoice.wiki free invoice generator showing company details, itemized services, VAT calculations, and payment information"
                      className="w-full h-auto rounded border invoice-example-img"
                      width={400}
                      height={500}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      priority={false}
                      quality={75}
                    />
                    {/* Overlay hint */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded border flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        🔍 Click to enlarge
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    PDF Ready
                  </div>
                </div>
              </div>
              
              {/* Benefits Content */}
              <div className="order-1 lg:order-2 space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1 text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">Clean Professional Design</h3>
                      <p className="text-muted-foreground">Every invoice generated maintains consistent, professional formatting that reflects well on your business and builds client trust.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1 text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">Automatic Calculations</h3>
                      <p className="text-muted-foreground">VAT rates, subtotals, and grand totals are calculated automatically with high precision using mathematical rounding (0.5 rounds up) to 2 decimal places, eliminating manual errors and saving valuable time.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1 text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">Complete Business Information</h3>
                      <p className="text-muted-foreground">Include all necessary business details: company information, addresses, VAT IDs, payment terms, and contact information for complete transparency.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1 text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">Instant PDF Download</h3>
                      <p className="text-muted-foreground">Download your completed invoices as high-quality PDF files that are ready for printing, emailing, or digital storage with perfect formatting preservation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1 text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">Customizable Colors & Languages</h3>
                      <p className="text-muted-foreground">NEW: By popular demand! Choose from 10 accent colors and 6 languages (English, German, Czech, Polish, Slovak, Ukrainian) to match your brand and serve international clients.</p>
                    </div>
                  </div>
                
                <div className="pt-4">
                  <Link href="/create-invoice" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Try It Now - Free →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc="/images/invoice-example.png"
        imageAlt="Professional invoice example created with Invoice.wiki showing detailed formatting, VAT calculations, and business information"
        imageTitle="Professional Invoice Example"
      />
    </>
  )
}
