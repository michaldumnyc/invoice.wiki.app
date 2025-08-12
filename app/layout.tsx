import type React from "react";
import "@/styles/global.css";
import type { Metadata, Viewport } from "next";

import { ToastProvider } from "@/components/ui/toast-provider";


// Import local base64-encoded fonts (these will be handled in global.css)
import { notoSansRegularBase64 } from "@/utils/fonts/notoSansRegular";
import { notoSansBoldBase64 } from "@/utils/fonts/notoSansBold";

// Function to clean base64 by removing prefix
const cleanBase64 = (base64String: string) => {
  return base64String.startsWith("data:font/ttf;base64,")
    ? base64String.replace("data:font/ttf;base64,", "")
    : base64String;
};

// Create cleaned base64 font strings
const cleanedNotoSansRegular = cleanBase64(notoSansRegularBase64);
const cleanedNotoSansBold = cleanBase64(notoSansBoldBase64);

// Viewport configuration for all pages - removed maximumScale for accessibility
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6' // blue color for browser theme
};

// Extended metadata for SEO
export const metadata: Metadata = {
  title: {
    default: "Invoice.wiki - Free Invoice Generator",
    template: "%s | Invoice.wiki",
  },
  description: "Free online invoice generator. Create professional invoices instantly with PDF download, VAT support, multiple currencies and languages.",

  authors: [{ name: "Invoice.wiki Team" }],
  creator: "Invoice.wiki",
  publisher: "Invoice.wiki",
    other: {
    "article:published_time": "2025-02-04T00:00:00Z",
    "article:modified_time": "2025-08-12T00:00:00Z",
    "datePublished": "2025-02-04",
    "dateModified": "2025-08-12"
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://invoice.wiki"),
  alternates: {
    canonical: "/",
    languages: {
      'en-US': '/'
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
      noimageindex: false,
      notranslate: false,
      noarchive: false,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://invoice.wiki",
    title: "Invoice.wiki - Free Invoice Generator",
    description: "Free invoice maker and generator. Create invoices online instantly and for Free. No registration required. Perfect for freelancers and small businesses.",
    siteName: "Invoice.wiki",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Invoice.wiki - Free Invoice Generator",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Invoice.wiki - Free Invoice Generator",
    description: "Create professional invoices online instantly. Free invoice maker with PDF download, VAT support, and multiple currencies. No registration required.",
    images: ["/images/twitter-card.png"],
    site: "@invoice_wiki",
    creator: "@invoice_wiki",
  },
  category: "Finance",
  applicationName: "Invoice.wiki",
  manifest: "/manifest.json",
  keywords: ["free invoice generator", "invoice maker", "PDF invoice", "VAT calculator", "business invoicing", "freelancer tools"],
  classification: "Business Software",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/icons/apple-touch-icon.svg", type: "image/svg+xml" }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Fonts are now included in global.css */}
        {/* SVG favicon with PNG fallback for older browsers */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" title="Invoice.wiki Icon" />
        <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" title="Invoice.wiki Icon" />
        <link rel="manifest" href="/manifest.json" />
        {/* SVG Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" type="image/svg+xml" title="Invoice.wiki Apple Touch Icon" />
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Invoice.wiki" />
        <meta name="application-name" content="Invoice.wiki" />
        <meta name="msapplication-config" content="none" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://invoice.wiki" />

      </head>
      <body className="min-h-screen antialiased bg-background text-foreground">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
