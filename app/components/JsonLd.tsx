import React from 'react';

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Invoice.wiki',
    'alternateName': 'Online Invoice Generator',
    'url': 'https://invoice.wiki',
    'logo': 'https://invoice.wiki/icons/icon-512x512.png',
    'description': 'Free online invoice generator with PDF download and VAT support',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'author': {
      '@type': 'Organization',
      'name': 'Invoice.wiki Team',
      'url': 'https://invoice.wiki'
    }
  };

  return <JsonLd data={data} />;
}

export function InvoiceJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Invoice Generator',
    'applicationCategory': 'BusinessApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return <JsonLd data={data} />;
} 