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
    'alternateName': 'Free Online Invoice Generator',
    'url': 'https://invoice.wiki',
    'logo': 'https://invoice.wiki/icons/icon-512x512.svg',
    'description': 'Free online invoice generator with PDF download, VAT support, and multiple currencies. No registration required.',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'Any',
    'browserRequirements': 'Requires JavaScript. Modern browser recommended.',
    'permissions': 'No personal data collected',
    'featureList': [
      'PDF invoice generation',
      'VAT calculation',
      'Multiple currencies support',
      'Customizable templates',
      'No registration required',
      'Browser-based processing'
    ],
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    },
    'author': {
      '@type': 'Organization',
      'name': 'Invoice.wiki Team',
      'url': 'https://invoice.wiki'
    },
    'datePublished': '2024-01-01',
    'inLanguage': 'en-US',
    'isAccessibleForFree': true,
    'screenshot': 'https://invoice.wiki/images/og-image.svg'
  };

  return <JsonLd data={data} />;
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Invoice.wiki',
    'url': 'https://invoice.wiki',
    'logo': 'https://invoice.wiki/icons/icon-512x512.svg',
    'description': 'Provider of free online invoice generation services',
    'foundingDate': '2024',
    'serviceArea': 'Worldwide',
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Invoice Generation Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Free Invoice Generation',
            'description': 'Create professional invoices online for free'
          }
        }
      ]
    }
  };

  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };

  return <JsonLd data={data} />;
} 