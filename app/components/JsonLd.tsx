import React from "react"

interface JsonLdProps {
  data: Record<string, any>
}

export default function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

// ✅ WebSite only - for homepage
export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Invoice.wiki",
    alternateName: "Free Online Invoice Maker & Generator",
    url: "https://invoice.wiki",
    description:
      "Free online invoice maker with PDF download, tax support, 40+ currencies and 6 languages. No registration required.",
    datePublished: "2025-02-04",
    dateModified: "2025-12-07",
    inLanguage: ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://invoice.wiki/create-invoice?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "Invoice.wiki Team",
      url: "https://invoice.wiki",
    },
  }

  return <JsonLd data={data} />
}

// ✅ Organization
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Invoice.wiki",
    url: "https://invoice.wiki",
    logo: {
      "@type": "ImageObject",
      url: "https://invoice.wiki/icons/icon-512x512.png",
      width: 512,
      height: 512,
    },
    description: "Provider of free online invoice generation services",
    foundingDate: "2025-02-04",
    dateModified: "2025-12-07",
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

// ✅ FAQ Schema
export function FaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I need to register to create invoices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely not! Our invoice generator is completely free and doesn't require any registration, login, or account creation whatsoever. Simply visit our invoice creation page and start building professional invoices immediately without providing personal information.",
        },
      },
      {
        "@type": "Question",
        name: "Can I download my invoice as PDF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, you can instantly download your professionally formatted invoice as a high-quality PDF file that's ready for sending to clients or printing for your business records. Our PDF generation system ensures perfect formatting across all devices and platforms.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool completely free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Invoice.wiki is a 100% free invoice maker for both personal and commercial use with no hidden fees, subscription costs, or premium features. We believe professional invoice generation should be accessible to everyone, from individual freelancers to growing businesses.",
        },
      },
      {
        "@type": "Question",
        name: "Does it support tax calculations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! Add any tax rate. Totals calculate automatically. Works for any country.",
        },
      },
      {
        "@type": "Question",
        name: "What currencies are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our invoice generator supports 40+ international currencies including USD, EUR, GBP, CAD, AUD, CHF, JPY, SEK, NOK, DKK, PLN, CZK, UAH, CNY, INR, SGD, HKD, NZD, BRL, MXN, ZAR, TRY, ILS, AED, THB, and many others. You can select your preferred currency and the system will format amounts according to standard financial conventions for that currency.",
        },
      },
      {
        "@type": "Question",
        name: "Can I customize invoice colors and languages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! By popular demand, we've added customization options. Choose from 10 professional accent colors (Blue, Green, Red, Purple, Orange, Pink, Teal, Yellow, Slate, Black) to match your brand identity. Plus, generate invoices in 6 languages: English, German (Deutsch), Czech (Čeština), Polish (Polski), Slovak (Slovenčina), and Ukrainian (Українська) to serve international clients professionally.",
        },
      },
    ],
    datePublished: "2025-02-04",
    dateModified: "2025-12-07",
  }

  return <JsonLd data={data} />
}

// ✅ About Page Schema
export function AboutPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Invoice.wiki",
    url: "https://invoice.wiki/about",
    description:
      "Learn more about Invoice.wiki, a free and secure online invoice generator for freelancers, contractors, and businesses.",
    mainEntity: {
      "@type": "SoftwareApplication",
      name: "Invoice.wiki",
      description: "Free online invoice maker with PDF download, tax support, 40+ currencies and 6 languages.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      url: "https://invoice.wiki",
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
      dateModified: "2025-12-07",
    },
    publisher: {
      "@type": "Organization",
      name: "Invoice.wiki Team",
      url: "https://invoice.wiki",
    },
    datePublished: "2025-02-04",
    dateModified: "2025-12-07",
    inLanguage: ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"],
  }

  return <JsonLd data={data} />
}

// ✅ Invoice Example Image Schema
export function InvoiceExampleImageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: "Professional Invoice Example",
    description:
      "Sample invoice created with Invoice.wiki showing business details, itemized services, tax calculations, and payment info. Customizable colors, 6 languages, PDF download.",
    url: "https://invoice.wiki/images/invoice-example.png",
    contentUrl: "https://invoice.wiki/images/invoice-example.png",
    width: "800",
    height: "1000",
    encodingFormat: "image/png",
    creator: {
      "@type": "Organization",
      name: "Invoice.wiki",
      url: "https://invoice.wiki",
    },
    copyrightNotice: "© 2025 Invoice.wiki - Free to use for personal and commercial purposes",
    creditText: "Invoice example created with Invoice.wiki - Free Online Invoice Generator",
    acquireLicensePage: "https://invoice.wiki/privacy-policy",
    license: "https://invoice.wiki/privacy-policy",
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
    dateModified: "2025-12-07",
  }

  return <JsonLd data={data} />
}

// ✅ WebPage Schema
export function WebPageJsonLd({
  url,
  name,
  description,
  dateCreated = "2025-02-04",
  dateModified = "2025-12-07",
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

// ✅ Fixed structured data missing properties
export function EnhancedSoftwareApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Free Online Invoice Maker & Generator",
    description:
      "Free invoice maker with PDF download, tax support, 40+ currencies and 6 languages. No registration required.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    inLanguage: ["en-US", "de-DE", "cs-CZ", "pl-PL", "sk-SK", "uk-UA"],
    url: "https://invoice.wiki",
    image: "https://invoice.wiki/images/og-image.png",
    screenshot: "https://invoice.wiki/images/og-image.png",
    softwareVersion: "1.0",
    datePublished: "2025-02-04",
    dateModified: "2025-12-07",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2099-12-31",
    },
    acquireLicensePage: "https://invoice.wiki/privacy-policy",
    copyrightNotice: "© 2025 Invoice.wiki - Free to use for personal and commercial purposes",
    creditText: "Invoice created with Invoice.wiki - Free Online Invoice Generator",
  }

  return <JsonLd data={data} />
}
