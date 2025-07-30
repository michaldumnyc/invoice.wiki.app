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
      "Free online invoice maker and generator with PDF download, VAT support, multiple currencies and languages.",
    "datePublished": "2025-02-04",
    "dateModified": "2025-07-30",
    "inLanguage": ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"],
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
      "Free online invoice maker and generator with PDF download, VAT support, multiple currencies, custom colors, and multi-language support. No registration required.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Modern browser recommended.",
    "permissions": "No personal data collected",
    "featureList": [
      "PDF invoice generation",
      "VAT calculation",
      "Multiple currencies support",
      "Custom color themes",
      "Multi-language support",
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
    "datePublished": "2025-02-04",
    "dateModified": "2025-07-30",
    "inLanguage": ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"],
    "isAccessibleForFree": true,
    "screenshot": "https://invoice.wiki/images/og-image.png"
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
    "foundingDate": "2025-02-04",
    "dateModified": "2025-07-30",
    "serviceArea": "Worldwide",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "info@invoice.wiki",
      "availableLanguage": ["English", "German", "Czech", "Polish", "Slovak", "Ukrainian"]
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
    "operatingSystem": "Any",
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
    "image": "https://invoice.wiki/images/og-image.png"
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
          "text": "Absolutely not! Our invoice generator is completely free and doesn't require any registration, login, or account creation whatsoever. Simply visit our invoice creation page and start building professional invoices immediately without providing personal information."
        }
      },
      {
        "@type": "Question",
        "name": "Can I download my invoice as PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can instantly download your professionally formatted invoice as a high-quality PDF file that's ready for sending to clients or printing for your business records. Our PDF generation system ensures perfect formatting across all devices and platforms."
        }
      },
      {
        "@type": "Question",
        "name": "Is this tool completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Invoice.wiki is a 100% free invoice maker for both personal and commercial use with no hidden fees, subscription costs, or premium features. We believe professional invoice generation should be accessible to everyone, from individual freelancers to growing businesses."
        }
      },
      {
        "@type": "Question",
        "name": "Does it support VAT and tax calculations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! You can easily add VAT rates, tax percentages, and various fee structures to your invoices with automatic calculations. Our system supports multiple tax types and handles complex billing scenarios commonly required in different countries and industries."
        }
      },
      {
        "@type": "Question",
        "name": "What currencies are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our invoice generator supports 40+ international currencies including USD, EUR, GBP, CAD, AUD, CHF, JPY, SEK, NOK, DKK, PLN, CZK, UAH, CNY, INR, SGD, HKD, NZD, BRL, MXN, ZAR, TRY, ILS, AED, THB, and many others. You can select your preferred currency and the system will format amounts according to standard financial conventions for that currency."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize invoice colors and languages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! By popular demand, we've added customization options. Choose from 10 professional accent colors (Blue, Green, Red, Purple, Orange, Pink, Teal, Yellow, Slate, Black) to match your brand identity. Plus, generate invoices in 6 languages: English, German (Deutsch), Czech (Čeština), Polish (Polski), Slovak (Slovenčina), and Ukrainian (Українська) to serve international clients professionally."
        }
      }
    ],
    "datePublished": "2025-07-25",
    "dateModified": "2025-07-30"
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
    "datePublished": "2025-07-25",
    "dateModified": "2025-07-30",
    "inLanguage": ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"]
  }

  return <JsonLd data={data} />
}

// ✅ Invoice Example Image Schema
export function InvoiceExampleImageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "name": "Professional Invoice Example",
    "description": "Sample professional invoice created with Invoice.wiki free online invoice generator showing complete business details, itemized services, VAT calculations, payment information, and clean formatting ready for PDF download. Now features customizable colors and multi-language support.",
    "url": "https://invoice.wiki/images/invoice-example.png",
    "contentUrl": "https://invoice.wiki/images/invoice-example.png",
    "width": "800",
    "height": "1000",
    "encodingFormat": "image/png",
    "creator": {
      "@type": "WebApplication",
      "name": "Invoice.wiki",
      "url": "https://invoice.wiki"
    },
    "license": "https://invoice.wiki",
    "keywords": [
      "invoice example",
      "professional invoice template",
      "free invoice generator",
      "business invoice sample",
      "VAT invoice template",
      "PDF invoice example",
      "customizable invoice colors",
      "multi-language invoices",
      "international invoicing"
    ],
    "datePublished": "2025-07-25",
    "dateModified": "2025-07-30",
    "about": {
      "@type": "WebApplication",
      "name": "Free Invoice Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
"offers": {
  "@type": "Offer",
  "price": "0",
  "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
      "description": "Free online invoice generator for creating professional invoices with custom colors and multi-language support"
    }
  }

  return <JsonLd data={data} />
}
