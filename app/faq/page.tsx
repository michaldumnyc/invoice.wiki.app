export const dynamic = "force-static"
export const revalidate = 86400 // 24h

import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Metadata } from "next"
import { BreadcrumbJsonLd, WebPageJsonLd, FaqJsonLd } from "@/app/components/JsonLd"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Invoice Generator | Invoice.wiki",
  description:
    "Get answers to common questions about our free invoice generator. Learn about invoicing, tax support, PDF downloads, and business billing.",
  alternates: {
    canonical: "https://invoice.wiki/faq",
  },
  openGraph: {
    title: "FAQ - Invoice Generator Questions | Invoice.wiki",
    description: "Get answers to common questions about our free invoice generator and invoicing best practices.",
    url: "https://invoice.wiki/faq",
    siteName: "Invoice.wiki",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Invoice.wiki FAQ - Invoice Generator Questions",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - Invoice Generator Questions | Invoice.wiki",
    description: "Get answers to common questions about our free invoice generator and invoicing best practices.",
    images: ["/images/twitter-card.png"],
  },
}

const faqCategories = [
  {
    category: "Getting Started",
    icon: "🚀",
    questions: [
      {
        question: "Do I need to register to create invoices?",
        answer: "No! Just open the form and start creating. No login, no signup, no personal info required.",
      },
      {
        question: "How quickly can I create an invoice?",
        answer: "2-3 minutes. Fill in the fields, click download — done.",
      },
      {
        question: "Is this tool completely free?",
        answer:
          "Yes, Invoice.wiki is a free invoice maker for both personal and commercial use with no hidden fees or subscription costs.",
      },
      {
        question: "What makes your invoice generator different?",
        answer:
          "Everything runs in your browser — your data never leaves your device. No registration, 40+ currencies, 6 languages, flexible tax support, and customizable colors.",
      },
    ],
  },
  {
    category: "Privacy & Security",
    icon: "🔒",
    questions: [
      {
        question: "Is my data safe?",
        answer: "Yes! Everything runs in your browser. Nothing is sent to servers.",
      },
      {
        question: "Do you store my invoice data?",
        answer: "No. All processing is local. Close the tab — data is gone.",
      },
      {
        question: "Can I use this for sensitive info?",
        answer: "Yes. No data leaves your device — safe for confidential details.",
      },
      {
        question: "What happens when I download the PDF?",
        answer: "PDF is generated in your browser and saved to your device. Nothing stored server-side.",
      },
    ],
  },
  {
    category: "Features & Functionality",
    icon: "⚡",
    questions: [
      {
        question: "Can I download my invoice as PDF?",
        answer: "Yes! Click 'Generate Invoice' and your PDF downloads instantly. Ready to send or print.",
      },
      {
        question: "Does it support tax calculations?",
        answer: "Yes! Enter any tax rate. Totals calculate automatically.",
      },
      {
        question: "What currencies are supported?",
        answer:
          "40+ currencies: USD, EUR, GBP, PLN, CZK, UAH, JPY, and many more. Amounts format automatically based on the selected currency.",
      },
      {
        question: "Can I customize invoice colors and languages?",
        answer:
          "Yes! 10 accent colors to match your brand + 6 languages (EN, DE, CS, PL, SK, UK) for international clients.",
      },
      {
        question: "Can I add my company logo?",
        answer:
          "Not yet — we focus on clean text-based invoices for privacy (no uploads to servers). Your company details in text fields look professional.",
      },
    ],
  },
  {
    category: "Business & Legal",
    icon: "📋",
    questions: [
      {
        question: "Are the invoices legally valid?",
        answer:
          "Yes — includes all required elements: invoice number, dates, parties, items, taxes, totals. Check your local regulations for specifics.",
      },
      {
        question: "Can I use this for international business?",
        answer: "Yes! 40+ currencies, 6 languages, flexible tax. Works globally.",
      },
      {
        question: "What info is required?",
        answer: "Your business details, client info, invoice number, date, items with prices. Tax is optional.",
      },
      {
        question: "How should I number invoices?",
        answer: "Sequential (INV-001, INV-002) or with date (2024-001). Be consistent for accounting.",
      },
    ],
  },
  {
    category: "Technical Questions",
    icon: "🛠️",
    questions: [
      {
        question: "What browsers are supported?",
        answer: "All modern browsers: Chrome, Firefox, Safari, Edge. Desktop and mobile.",
      },
      {
        question: "Can I use this on mobile?",
        answer: "Yes! Fully responsive — works on phones and tablets.",
      },
      {
        question: "Technical issues?",
        answer: "Try refresh, clear cache, or incognito mode. That fixes most issues.",
      },
      {
        question: "Can I save and continue later?",
        answer: "No persistent save (for privacy). Complete in one session or copy to notes.",
      },
    ],
  },
  {
    category: "Business Usage",
    icon: "💼",
    questions: [
      {
        question: "Good for freelancers?",
        answer: "Perfect. Professional invoices, no costs, tax included.",
      },
      {
        question: "Small businesses?",
        answer: "Yes! Professional output without enterprise complexity.",
      },
      {
        question: "Recurring invoices?",
        answer: "No automation, but easy to duplicate — just update date and number.",
      },
      {
        question: "Payment tracking?",
        answer: "We create invoices; use a spreadsheet or accounting app to track payments.",
      },
    ],
  },
]

export default function FAQPage() {
  // ISO 8601 metadata for the page
  const pageCreationDate = "2025-08-26T12:00:00.000Z" // вчера
  const pageModificationDate = "2025-12-07T12:00:00.000Z"

  const breadcrumbItems = [
    { name: "Home", url: "https://invoice.wiki" },
    { name: "FAQ", url: "https://invoice.wiki/faq" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FaqJsonLd />
      <WebPageJsonLd
        url="https://invoice.wiki/faq"
        name="Frequently Asked Questions - Invoice Generator"
        description="Get answers to common questions about our free invoice generator. Learn about invoicing, tax support, PDF downloads, and business billing."
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />

      <Header />
      <main id="main-content" className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12 max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant answers to common questions about our free invoice generator, privacy protection, and
              professional invoicing best practices.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {faqCategories.map((category) => (
              <div key={category.category} className="flex flex-col items-center p-4 bg-card rounded-lg border">
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium text-center">{category.category}</span>
              </div>
            ))}
          </div>

          {/* FAQ Sections */}
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <div id={category.category.toLowerCase().replace(/\s+/g, "-")} className="flex items-center gap-3 mb-6">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={`${categoryIndex}-${questionIndex}`}
                    value={`${categoryIndex}-${questionIndex}`}
                    className="bg-card rounded-lg border px-6"
                  >
                    <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Start creating your professional invoice right away or learn
              more about our service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/create-invoice"
                className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Invoice Now
              </a>
              <a
                href="/about"
                className="px-6 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                About Invoice.wiki
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
