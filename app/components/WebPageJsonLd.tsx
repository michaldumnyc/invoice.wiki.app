"use client"

import JsonLd from "./JsonLd"

export default function WebPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Free Invoice Generator - Invoice.wiki",
    "url": "https://invoice.wiki",
    "description": "Free online invoice maker with PDF download, VAT support, and multi-language options.",
    "inLanguage": "en-US",
    "datePublished": "2025-02-04",
    "dateModified": "2025-07-30"
  }

  return <JsonLd data={data} />
}
