"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ImageModal } from "./ImageModal"

export function AboutInvoiceExample() {
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
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openModal()
                }
              }}
              aria-label="Click to view invoice example in full size"
            >
              <div className="relative">
                <Image 
                  src="/images/invoice-example.png"
                  alt="Generate invoice sample - Invoice Wiki generator creates professional invoices with invoice creator tools, PDF export, and VAT calculations"
                  className="w-full h-auto rounded border shadow-sm invoice-example-img"
                  width={400}
                  height={500}
                />
                {/* Overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded border flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    🔍 Click to enlarge
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-xl font-semibold">What You Get:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Professional layout with clear structure</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Automatic VAT calculations and totals</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Complete business and client information</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Payment terms and banking details</span>
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                <span>Print-ready formatting</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Every invoice maintains this professional standard, ensuring your business 
              makes a great impression with every client interaction.
            </p>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc="/images/invoice-example.png"
        imageAlt="Generate invoice sample - Invoice Wiki generator creates professional invoices with invoice creator tools, PDF export, and VAT calculations"
        imageTitle="Professional Invoice Sample"
      />
    </>
  )
}
