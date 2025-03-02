"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva(
  "fixed flex items-center w-auto max-w-md p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out z-50",
  {
    variants: {
      variant: {
        default: "bg-white text-gray-900 border-l-4 border-blue-500",
        success: "bg-white text-gray-900 border-l-4 border-green-500",
        error: "bg-white text-gray-900 border-l-4 border-red-500",
        warning: "bg-white text-gray-900 border-l-4 border-yellow-500",
      },
      position: {
        topRight: "top-4 right-4 transform translate-x-0",
        topLeft: "top-4 left-4 transform translate-x-0",
        bottomRight: "bottom-4 right-4 transform translate-x-0",
        bottomLeft: "bottom-4 left-4 transform translate-x-0",
      },
      visibility: {
        shown: "opacity-100 translate-y-0",
        hidden: "opacity-0 translate-y-2",
      }
    },
    defaultVariants: {
      variant: "default",
      position: "bottomLeft",
      visibility: "hidden",
    },
  }
)

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  open: boolean
  onClose?: () => void
  duration?: number
}

export function Toast({
  message,
  variant,
  position,
  open,
  onClose,
  duration = 4000,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(open)

  useEffect(() => {
    setIsVisible(open)
    if (open && duration) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        if (onClose) onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [open, duration, onClose])

  // If not visible and not open, don't render anything
  if (!isVisible && !open) return null

  // Get the appropriate icon based on the variant
  const IconComponent = {
    default: Info,
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
  }[variant || "default"]

  // Get the appropriate color for the icon
  const iconColor = {
    default: "text-blue-500",
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
  }[variant || "default"]

  return (
    <div 
      className={cn(
        toastVariants({ 
          variant, 
          position,
          visibility: isVisible ? "shown" : "hidden"
        }),
        "flex items-center gap-3"
      )} 
      role="alert"
    >
      <IconComponent className={cn("h-5 w-5", iconColor)} />
      <div className="text-sm font-medium flex-grow">{message}</div>
      <button
        type="button"
        className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
        onClick={() => {
          setIsVisible(false)
          if (onClose) onClose()
        }}
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const [state, setState] = useState<{
    open: boolean
    message: string
    variant?: "default" | "success" | "error" | "warning"
    position?: "topRight" | "topLeft" | "bottomRight" | "bottomLeft"
  }>({
    open: false,
    message: "",
    variant: "default",
    position: "bottomLeft",
  })

  const toast = (
    message: string,
    variant: "default" | "success" | "error" | "warning" = "default",
    position: "topRight" | "topLeft" | "bottomRight" | "bottomLeft" = "bottomLeft"
  ) => {
    setState({ open: true, message, variant, position })
  }

  const dismiss = () => {
    setState((prev) => ({ ...prev, open: false }))
  }

  return {
    toast,
    dismiss,
    ...state,
  }
} 