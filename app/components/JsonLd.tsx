"use client"

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
  const webSiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Invoice.wiki',
    'alternateName': 'Free Online Invoice Generator',
    'url': 'https://invoice.wiki',
    'description': 'Free online invoice generator with PDF download, VAT support, and multiple currencies. No registration required.',
    'inLanguage': 'en-US',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://invoice.wiki/create-invoice?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Invoice.wiki Team',
      'url': 'https://invoice.wiki'
    }
  };

  const webAppData = {
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

  return (
    <>
      <JsonLd data={webSiteData} />
      <JsonLd data={webAppData} />
    </>
  );
}

export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Invoice.wiki',
    'url': 'https://invoice.wiki',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://invoice.wiki/icons/icon-512x512.svg',
      'width': 512,
      'height': 512
    },
    'description': 'Provider of free online invoice generation services',
    'foundingDate': '2024',
    'serviceArea': 'Worldwide',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'email': 'support@invoice.wiki',
      'availableLanguage': 'English'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'Global',
      'addressLocality': 'Online'
    },
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

export function ProductJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': 'Free Online Invoice Generator',
    'description': 'Professional invoice generator with PDF download, VAT support, and multiple currencies. No registration required.',
    'brand': {
      '@type': 'Brand',
      'name': 'Invoice.wiki'
    },
    'category': 'Finance Software',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock',
      'itemCondition': 'https://schema.org/NewCondition',
      'url': 'https://invoice.wiki'
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.8',
      'reviewCount': '150',
      'bestRating': '5',
      'worstRating': '1'
    },
    'review': [
      {
        '@type': 'Review',
        'reviewRating': {
          '@type': 'Rating',
          'ratingValue': '5',
          'bestRating': '5'
        },
        'author': {
          '@type': 'Person',
          'name': 'Small Business Owner'
        },
        'reviewBody': 'Perfect free tool for creating professional invoices quickly and easily.'
      }
    ],
    'url': 'https://invoice.wiki',
    'image': 'https://invoice.wiki/images/og-image.svg'
  };

  return <JsonLd data={data} />;
} 