import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { nanoid } from "nanoid"

export function middleware(request: NextRequest) {
  // Skip API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  const nonce = nanoid()
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
    style-src 'self' 'nonce-${nonce}' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
    img-src 'self' data: https://invoice.wiki https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/;
    font-src 'self' data: https://invoice.wiki https://fonts.gstatic.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors https://www.google.com/ https://www.gstatic.com/recaptcha/;
    frame-src 'self' https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/;
    connect-src 'self' https://www.google.com/recaptcha/ https://*.vercel.app;
    block-all-mixed-content;
    upgrade-insecure-requests;
  `

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-nonce", nonce)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Add security headers
  response.headers.set("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, " ").trim())
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin")
  response.headers.set("Cross-Origin-Embedder-Policy", "require-corp")
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin")

  // Removing headings that disclose technologies
  response.headers.delete("X-Powered-By")
  response.headers.delete("Server")
  response.headers.delete("X-Nextjs-Cache")
  response.headers.delete("X-React-Server-Component")

  // Forced redirect to HTTPS (if not localhost)
  if (request.nextUrl.protocol !== "https:" && request.nextUrl.hostname !== "localhost") {
    return NextResponse.redirect(`https://${request.nextUrl.host}${request.nextUrl.pathname}`)
  }

  return response
}

// Exclude API and static files from middleware processing
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
