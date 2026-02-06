import type React from "react"
import "@/styles/global.css"
import type { Metadata, Viewport } from "next"
import { ToastProvider } from "@/components/ui/toast-provider"
import { Analytics } from "@vercel/analytics/react"
import { SITE_URL, SITE_NAME, LOCALES, DEFAULT_LOCALE, LOCALE_OG, type Locale } from "@/lib/constants"
import { getDictionary } from "@/lib/get-dictionary"
import { LocaleProvider } from "./providers"
import { notFound } from "next/navigation"

// Viewport configuration for all pages
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3b82f6",
}

// Generate all locale variants at build time
export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }))
}

// Dynamic metadata per locale
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const dict = await getDictionary(locale as Locale)

  const alternateLanguages: Record<string, string> = {}
  for (const loc of LOCALES) {
    alternateLanguages[loc] = `${SITE_URL}/${loc}`
  }
  alternateLanguages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}`

  return {
    title: {
      default: `${SITE_NAME} - ${dict.home.meta.title}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: dict.home.meta.description,
    authors: [{ name: "Invoice.wiki Team" }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    other: {
      "article:published_time": "2025-02-04T00:00:00Z",
      "article:modified_time": "2026-02-06T00:00:00Z",
      datePublished: "2025-02-04",
      dateModified: "2026-02-06",
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}`,
      languages: alternateLanguages,
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-video-preview": -1,
        "max-snippet": -1,
        noimageindex: false,
        notranslate: false,
        noarchive: false,
      },
    },
    openGraph: {
      type: "website",
      locale: LOCALE_OG[locale as Locale] || "en_US",
      url: `${SITE_URL}/${locale}`,
      title: dict.home.meta.ogTitle,
      description: dict.home.meta.ogDescription,
      siteName: SITE_NAME,
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - ${dict.home.meta.ogTitle}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.home.meta.ogTitle,
      description: dict.home.meta.ogDescription,
      images: ["/images/twitter-card.png"],
    },
    category: "Finance",
    applicationName: SITE_NAME,
    manifest: "/manifest.json",
    keywords: [
      "free invoice generator",
      "invoice maker",
      "PDF invoice",
      "tax invoice",
      "business invoicing",
      "freelancer tools",
    ],
    classification: "Business Software",
    icons: {
      icon: [
        { url: "/favicon.ico", type: "image/x-icon", sizes: "32x32" },
        { url: "/icons/icon.png", type: "image/png", sizes: "32x32" },
        { url: "/icons/icon-192x192.png", type: "image/png", sizes: "192x192" },
        { url: "/icons/icon-512x512.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!LOCALES.includes(locale as Locale)) {
    notFound()
  }

  const dict = await getDictionary(locale as Locale)

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Prevent theme FOUC — runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=document.documentElement;d.classList.remove("light","dark");if(t==="dark"||t==="light"){d.classList.add(t)}else if(t==="system"||!t){d.classList.add(window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light")}}catch(e){}})()`,
          }}
        />
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Invoice.wiki" />
        <meta name="application-name" content="Invoice.wiki" />
        <meta name="msapplication-config" content="none" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </head>
      <body className="min-h-screen antialiased bg-background text-foreground">
        {/* Skip to main content link for screen readers */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          {dict.skipToContent}
        </a>
        <LocaleProvider locale={locale} nav={dict.nav} footer={dict.footer}>
          <ToastProvider>{children}</ToastProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
