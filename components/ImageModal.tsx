"use client"

import React, { useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  imageTitle?: string
}

export function ImageModal({ isOpen, onClose, imageSrc, imageAlt, imageTitle }: ImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Auto-focus modal for keyboard events + lock body scroll
  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus()
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose()
      }
    },
    [onClose]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    },
    [onClose]
  )

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-labelledby={imageTitle ? "modal-title" : undefined}
    >
      <div className="relative max-w-4xl max-h-[90vh] w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close image preview"
        >
          <X size={32} />
        </button>

        {/* Image container */}
        <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
          {imageTitle && (
            <div className="bg-gray-50 px-4 py-2 border-b">
              <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
                {imageTitle}
              </h3>
            </div>
          )}

          <div className="relative">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={800}
              height={1000}
              className="w-full h-auto max-h-[80vh] object-contain"
              quality={90}
              priority={false}
            />
          </div>

          {/* Click hint */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            Click outside to close
          </div>
        </div>
      </div>
    </div>
  )
}
