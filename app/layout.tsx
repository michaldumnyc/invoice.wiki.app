import type React from "react";
import "@/styles/global.css";
import type { Metadata, Viewport } from "next";
import { PrivacyBanner } from "@/components/PrivacyBanner";
import { ToastProvider } from "@/components/ui/toast-provider";
import { headers } from "next/headers";

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

// Viewport configuration for all pages
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#3b82f6' // blue color for browser theme
};

// Extended metadata for SEO
export const metadata: Metadata = {
  title: {
    default: "Invoice.wiki - Free Invoice Maker & Generator | Create Professional Invoices",
    template: "%s | Invoice.wiki",
  },
  description: "Free Invoice Generator. Create invoices online instantly. Download as PDF. Perfect for freelancers and small businesses. Free invoice generator with VAT support. | Free Invoice Maker",
  keywords: ["invoice generator", "free invoice maker", "free invoice generator", "online invoice", "invoice maker", "invoice template", "PDF invoice", "VAT invoice", "business invoice", "professional invoice", "free invoicing software"],
  authors: [{ name: "Invoice.wiki Team" }],
  creator: "Invoice.wiki",
  publisher: "Invoice.wiki",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://invoice.wiki"),
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://invoice.wiki",
    title: "Invoice.wiki - Free Invoice Maker & Generator",
    description: "Free invoice maker and generator. Create invoices online instantly and for Free. No registration required. Perfect for freelancers and small businesses.",
    siteName: "Invoice.wiki",
    images: [
      {
        url: "/icons/icon-512x512.svg",
        width: 512,
        height: 512,
        alt: "Invoice.wiki - Free Invoice Generator",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invoice.wiki - Free Invoice Maker & Generator",
    description: "Free invoice maker and generator. Create invoices online instantly and for Free. No registration required. Perfect for freelancers and small businesses.",
    images: ["/icons/icon-512x512.svg"],
  },
  category: "Finance",
  applicationName: "Invoice.wiki",
  manifest: "/manifest.json",
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
  const headersList = headers();
  const nonce = headersList.get("x-nonce") || "";
  
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Fonts are now included in global.css */}
        <meta name="x-nonce" content={nonce} />
        {/* SVG favicon with PNG fallback for older browsers */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="manifest" href="/manifest.json" />
        {/* SVG Apple Touch Icon with PNG fallback */}
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen antialiased bg-background text-foreground">
        <ToastProvider>
          {children}
          <PrivacyBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
