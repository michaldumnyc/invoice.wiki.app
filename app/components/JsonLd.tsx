import React from "react"
import { SITE_URL } from "@/lib/constants"

interface JsonLdProps {
  data: Record<string, unknown>
}

export default function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

// ✅ WebSite — for homepage
export function WebsiteJsonLd({ description }: { description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Invoice.wiki",
    alternateName: "Free Online Invoice Maker & Generator",
    url: SITE_URL,
    description,
    datePublished: "2025-02-04",
    dateModified: "2026-02-06",
    inLanguage: ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/create-invoice?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Invoice.wiki Team",
      url: SITE_URL,
    },
  }

  return <JsonLd data={data} />
}

// ✅ Organization — global, English-only is fine
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Invoice.wiki",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icons/icon-512x512.png`,
      width: 512,
      height: 512,
    },
    description: "Provider of free online invoice generation services",
    foundingDate: "2025-02-04",
    dateModified: "2026-02-06",
  }

  return <JsonLd data={data} />
}

// ✅ Breadcrumb
export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return <JsonLd data={data} />
}

// ✅ FAQ Schema — accepts translated questions
export function FaqJsonLd({ questions }: { questions: Array<{ question: string; answer: string }> }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
    datePublished: "2025-02-04",
    dateModified: "2026-02-06",
  }

  return <JsonLd data={data} />
}

// ✅ About Page Schema — accepts translated text
export function AboutPageJsonLd({ description, url }: { description: string; url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Invoice.wiki",
    url,
    description,
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Invoice.wiki",
      description,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      url: SITE_URL,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        priceValidUntil: "2099-12-31",
      },
      inLanguage: ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"],
      softwareVersion: "1.0",
      datePublished: "2025-02-04",
      dateModified: "2026-02-06",
    },
    publisher: {
      "@type": "Organization",
      name: "Invoice.wiki Team",
      url: SITE_URL,
    },
    datePublished: "2025-02-04",
    dateModified: "2026-02-06",
    inLanguage: ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"],
  }

  return <JsonLd data={data} />
}

// ✅ Invoice Example Image Schema
export function InvoiceExampleImageJsonLd({ name, description }: { name: string; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name,
    description,
    url: `${SITE_URL}/images/invoice-example.png`,
    contentUrl: `${SITE_URL}/images/invoice-example.png`,
    width: "800",
    height: "1000",
    encodingFormat: "image/png",
    creator: {
      "@type": "Organization",
      name: "Invoice.wiki",
      url: SITE_URL,
    },
    copyrightNotice: "© 2026 Invoice.wiki - Free to use for personal and commercial purposes",
    creditText: "Invoice example created with Invoice.wiki - Free Online Invoice Generator",
    acquireLicensePage: `${SITE_URL}/privacy-policy`,
    license: `${SITE_URL}/privacy-policy`,
    keywords: [
      "invoice example",
      "invoice template",
      "free invoice generator",
      "PDF invoice",
      "business invoice",
      "tax invoice",
      "multi-language invoice",
    ],
    datePublished: "2025-02-04",
    dateModified: "2026-02-06",
  }

  return <JsonLd data={data} />
}

// ✅ WebPage Schema
export function WebPageJsonLd({
  url,
  name,
  description,
  dateCreated = "2025-02-04",
  dateModified = "2026-02-06",
}: {
  url: string
  name: string
  description: string
  dateCreated?: string
  dateModified?: string
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: name,
    description: description,
    url: url,
    datePublished: dateCreated,
    dateModified: dateModified,
  }

  return <JsonLd data={data} />
}

// ✅ Enhanced SoftwareApplication
export function EnhancedSoftwareApplicationJsonLd({ description }: { description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Invoice.wiki",
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    inLanguage: ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"],
    url: SITE_URL,
    image: `${SITE_URL}/images/og-image.png`,
    screenshot: `${SITE_URL}/images/og-image.png`,
    softwareVersion: "1.0",
    datePublished: "2025-02-04",
    dateModified: "2026-02-06",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2099-12-31",
    },
    acquireLicensePage: `${SITE_URL}/privacy-policy`,
    copyrightNotice: "© 2026 Invoice.wiki - Free to use for personal and commercial purposes",
    creditText: "Invoice created with Invoice.wiki - Free Online Invoice Generator",
  }

  return <JsonLd data={data} />
}
