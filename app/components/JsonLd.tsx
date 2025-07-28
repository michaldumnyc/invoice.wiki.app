"use client"

import React from "react"

interface JsonLdProps {
  data: Record<string, any>
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// ✅ WebSite + WebApplication
export function WebsiteJsonLd() {
  const webSiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Invoice.wiki",
    "alternateName": "Free Online Invoice Maker & Generator",
    "url": "https://invoice.wiki",
    "description":
      "Free online invoice maker and generator with PDF download, VAT support, and multiple currencies. No registration required.",
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://invoice.wiki/create-invoice?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Invoice.wiki Team",
      "url": "https://invoice.wiki"
    }
  }

  const webAppData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Invoice.wiki",
    "alternateName": "Free Online Invoice Maker & Generator",
    "url": "https://invoice.wiki",
    "logo": "https://invoice.wiki/icons/icon-512x512.svg",
    "description":
      "Free online invoice maker and generator with PDF download, VAT support, and multiple currencies. No registration required.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Modern browser recommended.",
    "permissions": "No personal data collected",
    "featureList": [
      "PDF invoice generation",
      "VAT calculation",
      "Multiple currencies support",
      "No registration required",
      "Browser-based processing"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": "Invoice.wiki Team",
      "url": "https://invoice.wiki"
    },
    "datePublished": "2024-01-01",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "screenshot": "https://invoice.wiki/images/og-image.svg"
  }

  return (
    <>
      <JsonLd data={webSiteData} />
      <JsonLd data={webAppData} />
    </>
  )
}

// ✅ Organization
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Invoice.wiki",
    "url": "https://invoice.wiki",
    "logo": {
      "@type": "ImageObject",
      "url": "https://invoice.wiki/icons/icon-512x512.svg",
      "width": 512,
      "height": 512
    },
    "description": "Provider of free online invoice generation services",
    "foundingDate": "2024",
    "serviceArea": "Worldwide",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@invoice.wiki",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Global",
      "addressLocality": "Online"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Invoice Generation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Free Invoice Generation",
            "description": "Create professional invoices online for free"
          }
        }
      ]
    }
  }

  return <JsonLd data={data} />
}

// ✅ Product
export function ProductJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Free Online Invoice Maker & Generator",
    "description":
      "Professional invoice maker and generator with PDF download, VAT support, and multiple currencies. No registration required.",
    "inLanguage": "en-US",
    "brand": {
      "@type": "Brand",
      "name": "Invoice.wiki"
    },
    "category": "Finance Software",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "url": "https://invoice.wiki"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Small Business Owner"
        },
        "reviewBody":
          "Perfect free tool for creating professional invoices quickly and easily."
      }
    ],
    "url": "https://invoice.wiki",
    "image": "https://invoice.wiki/images/og-image.svg"
  }

  return <JsonLd data={data} />
}

// ✅ Breadcrumb
export function BreadcrumbJsonLd({
  items
}: {
  items: Array<{ name: string; url: string }>
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return <JsonLd data={data} />
}

// ✅ FAQ Schema
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need to register to create invoices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "No, our invoice generator is completely free and doesn’t require registration or login."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download my invoice as PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, you can instantly download your invoice as a professional PDF file."
        }
      },
      {
        "@type": "Question",
        "name": "Is this tool free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Yes, Invoice.wiki is a 100% free invoice maker for personal and commercial use."
        }
      },
      {
        "@type": "Question",
        "name": "Does it support VAT?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can add VAT and tax values to your invoice easily."
        }
      }
    ]
  }

  return <JsonLd data={data} />
}

// ✅ About Page Schema
export function AboutPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Invoice.wiki",
    "url": "https://invoice.wiki/about",
    "description":
      "Learn more about Invoice.wiki, a free and secure online invoice generator for freelancers, contractors, and businesses.",
    "mainEntity": {
      "@type": "WebApplication",
      "name": "Invoice.wiki",
      "applicationCategory": "FinanceApplication",
      "url": "https://invoice.wiki"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Invoice.wiki Team",
      "url": "https://invoice.wiki"
    },
    "inLanguage": "en-US"
  }

  return <JsonLd data={data} />
}
