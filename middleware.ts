import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const LOCALES = ["en", "de", "cs", "pl", "sk", "uk"]
const DEFAULT_LOCALE = "en"

function getLocaleFromHeaders(request: NextRequest): string {
  const acceptLanguage = request.headers.get("accept-language")
  if (!acceptLanguage) return DEFAULT_LOCALE

  // Parse Accept-Language header and find best match
  const preferred = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q] = lang.trim().split(";q=")
      return { code: code.split("-")[0].toLowerCase(), quality: q ? parseFloat(q) : 1 }
    })
    .sort((a, b) => b.quality - a.quality)

  for (const { code } of preferred) {
    if (LOCALES.includes(code)) return code
  }
  return DEFAULT_LOCALE
}

function pathnameHasLocale(pathname: string): boolean {
  return LOCALES.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Forced redirect to HTTPS first (if not localhost)
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    const httpsUrl = new URL(url)
    httpsUrl.protocol = "https:"
    return NextResponse.redirect(httpsUrl, 301)
  }

  // Redirect www to non-www (canonical URL)
  if (url.hostname.startsWith("www.")) {
    const newUrl = new URL(url)
    newUrl.hostname = url.hostname.substring(4)
    return NextResponse.redirect(newUrl, 301)
  }

  // Redirect index files to root (comprehensive list)
  const indexPaths = ["/index.html", "/index.php", "/index.htm", "/default.html", "/default.php"]
  if (indexPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL("/", url), 301)
  }

  // Handle Vercel Insights
  if (url.pathname.startsWith("/_vercel/insights/")) {
    const response = NextResponse.next()
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Cache-Control", "public, max-age=31536000")
    return response
  }

  // Handle static files
  if (url.pathname.startsWith("/_next/static/")) {
    return NextResponse.next()
  }

  // Skip API routes
  if (url.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // --- i18n locale routing ---
  if (!pathnameHasLocale(url.pathname)) {
    // Check cookie first, then Accept-Language header
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
    const locale = cookieLocale && LOCALES.includes(cookieLocale) ? cookieLocale : getLocaleFromHeaders(request)

    // Redirect to locale-prefixed path
    const newUrl = new URL(`/${locale}${url.pathname}`, url)
    newUrl.search = url.search
    const response = NextResponse.redirect(newUrl, 307) // Temporary redirect for locale detection
    response.cookies.set("NEXT_LOCALE", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 })
    return response
  }

  // Extract locale from pathname for cookie persistence
  const pathnameLocale = url.pathname.split("/")[1]
  if (LOCALES.includes(pathnameLocale)) {
    // Persist locale preference
    const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
    if (cookieLocale !== pathnameLocale) {
      // Will set cookie on the response below
    }
  }

  // --- Security headers ---
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https://invoice.wiki;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'none';
    connect-src 'self' https://vitals.vercel-analytics.com;
    media-src 'self';
    worker-src 'self' blob:;
    child-src 'none'
  `

  const requestHeaders = new Headers(request.headers)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  // Set locale cookie
  if (LOCALES.includes(pathnameLocale)) {
    response.cookies.set("NEXT_LOCALE", pathnameLocale, { path: "/", maxAge: 60 * 60 * 24 * 365 })
  }

  // Add security headers
  response.headers.set("Content-Security-Policy", cspHeader.replace(/\s{2,}/g, " ").trim())
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin")
  response.headers.set("Cross-Origin-Embedder-Policy", "credentialless")
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin")

  // Removing headers that disclose technologies
  response.headers.delete("X-Powered-By")
  response.headers.delete("Server")
  response.headers.delete("X-Nextjs-Cache")
  response.headers.delete("X-React-Server-Component")

  return response
}

// Matcher configuration for middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - Static files from /public directory
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|ads.txt|llms.txt|icons/.*|images/.*|.well-known/.*).*)",
    "/_vercel/insights/:path*", // Include Vercel Insights
  ],
}
