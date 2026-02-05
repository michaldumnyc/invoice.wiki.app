"use client"

import { useEffect, useState } from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const toastVariants = cva("relative flex items-center justify-between p-4 mb-2 rounded-lg shadow-lg", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground border-l-4 border-primary",
      success: "bg-card text-card-foreground border-l-4 border-green-500",
      error: "bg-card text-card-foreground border-l-4 border-red-500",
      warning: "bg-card text-card-foreground border-l-4 border-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  open: boolean
  onClose?: () => void
  duration?: number
}

export function Toast({ message, variant, open, onClose, duration = 4000 }: ToastProps) {
  const [isVisible, setIsVisible] = useState(open)

  useEffect(() => {
    // Defer setState so it's not synchronous in effect (avoids cascading render warning)
    queueMicrotask(() => setIsVisible(open))
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
    <div className={cn(toastVariants({ variant }), "flex items-center gap-3")} role="alert">
      <IconComponent className={cn("h-5 w-5", iconColor)} />
      <div className="text-sm font-medium flex-grow">{message}</div>
      <button
        type="button"
        className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none"
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
