"use client"

import React, { useState } from "react"
import Image from "next/image"
import { ImageModal } from "./ImageModal"
import type { Dictionary } from "@/lib/get-dictionary"

interface AboutInvoiceExampleProps {
  translations: Dictionary["about"]["invoiceExample"]
}

export function AboutInvoiceExample({ translations: t }: AboutInvoiceExampleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div className="bg-card rounded-lg border-2 border-border p-4 mb-8 shadow-lg">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
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
              <div className="relative">
                <Image
                  src="/images/invoice-example.png"
                  alt={t.imageTitle}
                  className="w-full h-auto rounded border shadow-sm invoice-example-img"
                  width={400}
                  height={500}
                />
                {/* Overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded border flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    🔍 {t.clickToEnlarge}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-xl font-semibold">{t.whatYouGet}</h3>
            <ul className="space-y-2 text-sm">
              {t.items.map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4">{t.note}</p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc="/images/invoice-example.png"
        imageAlt={t.imageTitle}
        imageTitle={t.imageTitle}
      />
    </>
  )
}
