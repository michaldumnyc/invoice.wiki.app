"use client" 

import { Alert, AlertDescription } from "@/components/ui/alert"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <Alert variant="destructive">
      <AlertDescription>
        <p>Oops. Something went wrong!</p>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </AlertDescription>
    </Alert>
  )
}

