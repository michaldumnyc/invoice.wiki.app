"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ImageModal } from "./ImageModal"
import type { Dictionary } from "@/lib/get-dictionary"

interface InvoiceExampleSectionProps {
  translations: Dictionary["home"]["invoiceExample"]
  locale: string
}

export function InvoiceExampleSection({ translations: t, locale }: InvoiceExampleSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      {/* Invoice Example Section */}
      <section
        aria-labelledby="example-heading"
        className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100 dark:bg-gradient-to-br dark:from-background dark:via-secondary dark:to-background"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 id="example-heading" className="text-2xl sm:text-3xl font-bold text-center mb-4">
                {t.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">{t.description}</p>
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
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        openModal()
                      }
                    }}
                    aria-label={t.clickToEnlarge}
                  >
                    <Image
                      src="/images/invoice-example.png"
                      alt={t.imageAlt}
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
                        🔍 {t.clickToEnlarge}
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    {t.pdfReady}
                  </div>
                </div>
              </div>

              {/* Benefits Content */}
              <div className="order-1 lg:order-2 space-y-4">
                {t.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mt-1 text-green-600 dark:text-green-400 text-sm font-bold">
                      ✓
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <Link
                    href={`/${locale}/create-invoice`}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {t.tryItNow}
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
        imageAlt={t.imageAlt}
        imageTitle={t.imageTitle}
      />
    </>
  )
}
