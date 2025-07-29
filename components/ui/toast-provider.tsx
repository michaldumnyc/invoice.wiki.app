"use client"

import { createContext, useContext, useState, ReactNode, useRef } from "react"
import { Toast } from "./toast"

type ToastType = "success" | "error" | "warning" | "default"

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToastProvider() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToastProvider must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [toast, setToast] = useState<{
    message: string
    visible: boolean
    type: ToastType
  }>({
    message: "",
    visible: false,
    type: "default",
  })

  const showToast = (message: string, type: ToastType = "default") => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    setToast({ message, visible: true, type })
    
    // Automatically hide after 4 seconds
    timeoutRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }))
    }, 4000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast 
        message={toast.message} 
        open={toast.visible} 
        variant={toast.type}
        onClose={() => setToast(prev => ({ ...prev, visible: false }))} 
      />
    </ToastContext.Provider>
  )
} 