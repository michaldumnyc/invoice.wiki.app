"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, RefreshCw, AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const supportEmail = process.env.SUPPORT_EMAIL
  
  const handleEmailSupport = () => {
    const subject = encodeURIComponent("Invoice Generator Error Report")
    const body = encodeURIComponent(`
Hello,

I encountered an error while using the Invoice Generator:

Error Message: ${error.message}
Error Stack: ${error.stack || 'Not available'}
Digest: ${error.digest || 'Not available'}
Timestamp: ${new Date().toISOString()}
User Agent: ${navigator.userAgent}

Steps I was taking:
[Please describe what you were doing when the error occurred]

Additional Details:
[Any other relevant information]

Thank you for your help!
    `.trim())
    
    window.open(`mailto:${supportEmail}?subject=${subject}&body=${body}`, '_blank')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-white to-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600 mb-2">
            Oops! Something went wrong
          </CardTitle>
          <p className="text-gray-600">
            An unexpected error occurred while creating your invoice. We're sorry for the inconvenience.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
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
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Help us fix this issue
            </h3>
            <p className="text-blue-700 text-sm mb-4">
              To help us resolve this error quickly, please follow these steps:
            </p>
            
            <ol className="text-sm text-blue-700 space-y-2 mb-4 list-decimal list-inside">
              <li>
                <strong>Open Developer Tools:</strong>
                <ul className="mt-1 ml-4 space-y-1 list-disc list-inside text-xs">
                  <li><kbd className="px-1 py-0.5 bg-white rounded border">F12</kbd> (Windows/Linux)</li>
                  <li><kbd className="px-1 py-0.5 bg-white rounded border">Cmd+Opt+I</kbd> (Mac)</li>
                  <li>Or right-click → "Inspect Element"</li>
                </ul>
              </li>
              <li><strong>Go to "Console" tab</strong> in Developer Tools</li>
              <li><strong>Refresh the page</strong> and <strong>repeat the action</strong> that caused the error</li>
              <li><strong>Select all text</strong> in Console (<kbd className="px-1 py-0.5 bg-white rounded border">Ctrl+A</kbd> / <kbd className="px-1 py-0.5 bg-white rounded border">Cmd+A</kbd>)</li>
              <li><strong>Copy</strong> (<kbd className="px-1 py-0.5 bg-white rounded border">Ctrl+C</kbd> / <kbd className="px-1 py-0.5 bg-white rounded border">Cmd+C</kbd>) and send to us via email</li>
            </ol>

                         {supportEmail && (
               <Button 
                 onClick={handleEmailSupport}
                 className="w-full bg-blue-600 hover:bg-blue-700 text-white"
               >
                 <Mail className="w-4 h-4 mr-2" />
                 Send Error Report to {supportEmail}
               </Button>
             )}
          </div>

          {/* Error Details */}
          <details className="bg-gray-50 rounded-lg p-4 border">
            <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
              Technical Details (for developers)
            </summary>
            <div className="mt-3 p-3 bg-gray-100 rounded text-xs font-mono overflow-auto max-h-40">
              <div className="mb-2">
                <strong>Error:</strong> {error.message}
              </div>
              {error.digest && (
                <div className="mb-2">
                  <strong>Digest:</strong> {error.digest}
                </div>
              )}
              {error.stack && (
                <div>
                  <strong>Stack:</strong>
                  <pre className="mt-1 text-xs">{error.stack}</pre>
                </div>
              )}
            </div>
          </details>

          {/* Alternative */}
                     <div className="text-center text-sm text-gray-500">
             <p>If the problem persists, try using a different browser or device.</p>
             {supportEmail && (
               <p className="mt-1">
                 You can also create invoices manually and contact us at{" "}
                 <a href={`mailto:${supportEmail}`} className="text-blue-600 hover:underline">
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

