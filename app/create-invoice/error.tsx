"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, RefreshCw, AlertTriangle } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const supportEmail = process.env.SUPPORT_EMAIL

  // Determine error type and customize instructions
  const isPdfError = error.message.includes("PDF Generation Failed")
  const isValidationError = error.message.includes("validation") || error.message.includes("required")

  const getErrorTitle = () => {
    if (isPdfError) return "PDF Generation Problem"
    if (isValidationError) return "Form Validation Error"
    return "Oops! Something went wrong"
  }

  const getErrorDescription = () => {
    if (isPdfError) {
      return "We couldn't generate your PDF invoice. This is usually a temporary issue with the PDF generation system."
    }
    if (isValidationError) {
      return "There's an issue with the information you've entered. Please check your form and try again."
    }
    return "An unexpected error occurred while creating your invoice. We're sorry for the inconvenience."
  }

  const getSpecificInstructions = () => {
    if (isPdfError) {
      return (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Try these solutions first:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Refresh the page and try again</li>
            <li>Try using a different browser (Chrome, Firefox, Edge)</li>
            <li>Clear your browser cache and cookies</li>
            <li>Disable browser extensions temporarily</li>
            <li>Ensure you have enough device memory available</li>
          </ol>
        </div>
      )
    }

    if (isValidationError) {
      return (
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Please check:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>All required fields are filled in</li>
            <li>Dates are in the correct format</li>
            <li>Numbers are positive values</li>
            <li>Email addresses are valid</li>
          </ul>
        </div>
      )
    }

    return null
  }

  // Safe error info for email (no sensitive data)
  const handleEmailSupport = () => {
    const errorType = isPdfError ? "PDF Generation" : isValidationError ? "Form Validation" : "General"
    const timestamp = new Date().toISOString()
    const browserInfo = navigator.userAgent

    const subject = encodeURIComponent("Invoice Generator Error Report")
    const body = encodeURIComponent(
      `
Hello,

I encountered an error while using the Invoice Generator:

Error Type: ${errorType}
When it happened: ${timestamp}
Browser: ${browserInfo}

Steps I was taking:
[Please describe what you were doing when the error occurred]

Additional Details:
[Any other relevant information]

Thank you for your help!
    `.trim()
    )

    window.open(`mailto:${supportEmail}?subject=${subject}&body=${body}`, "_blank")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-white to-gray-50 dark:bg-gradient-to-br dark:from-background dark:via-secondary dark:to-background">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">{getErrorTitle()}</CardTitle>
          <p className="text-muted-foreground">{getErrorDescription()}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Specific Instructions */}
          {getSpecificInstructions() && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3">Quick Fix Suggestions</h3>
              {getSpecificInstructions()}
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex gap-3 justify-center">
            <Button onClick={reset} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>

          {/* Help Us Fix This */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Still having problems?
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
              If the issue persists, please let us know and we'll help you resolve it quickly.
            </p>

            {supportEmail && (
              <Button onClick={handleEmailSupport} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Mail className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            )}
          </div>

          {/* Alternative Solution */}
          <div className="text-center text-sm text-muted-foreground">
            <p>If the problem persists, try using a different browser or device.</p>
            {supportEmail && (
              <p className="mt-1">
                You can also contact us directly at{" "}
                <a href={`mailto:${supportEmail}`} className="text-primary hover:underline">
                  {supportEmail}
                </a>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
