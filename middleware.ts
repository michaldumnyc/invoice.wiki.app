import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"


export function middleware(request: NextRequest) {
  const url = request.nextUrl

  // Redirect www to non-www (canonical URL)
  if (url.hostname.startsWith('www.')) {
    const newUrl = new URL(url)
    newUrl.hostname = url.hostname.substring(4)
    return NextResponse.redirect(newUrl, 301)
  }

  // Redirect index files to root (comprehensive list)
  const indexPaths = ['/index.html', '/index.php', '/index.htm', '/default.html', '/default.php']
  if (indexPaths.includes(url.pathname)) {
    return NextResponse.redirect(new URL('/', url), 301)
  }

  // Handle Vercel Insights
  if (request.nextUrl.pathname.startsWith('/_vercel/insights/')) {
    const response = NextResponse.next()
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Cache-Control', 'public, max-age=31536000')
    return response
  }

  // Handle static files
  if (request.nextUrl.pathname.startsWith('/_next/static/')) {
    return NextResponse.next()
  }

  // Skip API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

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
    connect-src 'self' ws: wss: https://vitals.vercel-analytics.com;
    media-src 'self';
    worker-src 'self' blob:;
    child-src 'none'
  `;

  const requestHeaders = new Headers(request.headers)

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
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json|ads.txt|llms.txt|icons/.*|images/.*|.well-known/.*|36f7ff9a-6917-499a-8386-4ef54ead6195.txt|720be7ce99844bd6aba70be9a4809aa9.txt).*)',
    '/_vercel/insights/:path*'      // Include Vercel Insights
  ]
}
