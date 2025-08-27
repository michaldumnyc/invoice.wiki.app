import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Metadata } from "next"
import {
  BreadcrumbJsonLd,
  WebPageJsonLd,
  FaqJsonLd
} from "@/app/components/JsonLd"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "Frequently Asked Questions - Invoice Generator | Invoice.wiki",
  description: "Get answers to common questions about our free invoice generator. Learn about invoicing, VAT compliance, PDF downloads, and business billing.",
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
      }
    ],
    locale: "en_US",
    type: "website"
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
        answer: "Absolutely not! Our invoice generator is completely free and doesn't require any registration, login, or account creation whatsoever. Simply visit our invoice creation page and start building professional invoices immediately without providing personal information."
      },
      {
        question: "How quickly can I create an invoice?",
        answer: "You can create a professional invoice in under 2 minutes! Our streamlined interface guides you through the essential fields, and you can download your PDF immediately after completing the form."
      },
      {
        question: "Is this tool completely free?",
        answer: "Yes, Invoice.wiki is a 100% free invoice maker for both personal and commercial use with no hidden fees, subscription costs, or premium features. We believe professional invoice generation should be accessible to everyone, from individual freelancers to growing businesses."
      },
      {
        question: "What makes your invoice generator different?",
        answer: "Our generator processes everything locally in your browser for maximum privacy, requires no registration, supports 40+ currencies and 6 languages, includes automatic VAT calculations, and offers customizable colors to match your brand."
      }
    ]
  },
  {
    category: "Privacy & Security",
    icon: "🔒",
    questions: [
      {
        question: "Is my data safe and private?",
        answer: "Absolutely! All invoice processing happens locally in your browser. Your sensitive business data never leaves your device or gets stored on our servers. We cannot see, access, or store any of your invoice information."
      },
      {
        question: "Do you store my invoice data?",
        answer: "No, we don't store any of your invoice data. Everything is processed locally in your browser using JavaScript. When you close the browser tab, all your data is automatically cleared."
      },
      {
        question: "Can I use this for sensitive business information?",
        answer: "Yes! Since all processing happens locally and no data is transmitted to our servers, you can safely use our generator for any business information, including confidential client details and financial data."
      },
      {
        question: "What happens to my data when I download the PDF?",
        answer: "The PDF is generated entirely in your browser and downloaded directly to your device. No copy is stored on our servers or transmitted anywhere else."
      }
    ]
  },
  {
    category: "Features & Functionality",
    icon: "⚡",
    questions: [
      {
        question: "Can I download my invoice as PDF?",
        answer: "Yes, you can instantly download your professionally formatted invoice as a high-quality PDF file that's ready for sending to clients or printing for your business records. Our PDF generation system ensures perfect formatting across all devices and platforms."
      },
      {
        question: "Does it support VAT and tax calculations?",
        answer: "Absolutely! You can easily add VAT rates, tax percentages, and various fee structures to your invoices with automatic calculations. Our system supports multiple tax types and handles complex billing scenarios commonly required in different countries and industries."
      },
      {
        question: "What currencies are supported?",
        answer: "Our invoice generator supports 40+ international currencies including USD, EUR, GBP, CAD, AUD, CHF, JPY, SEK, NOK, DKK, PLN, CZK, UAH, CNY, INR, SGD, HKD, NZD, BRL, MXN, ZAR, TRY, ILS, AED, THB, and many others. You can select your preferred currency and the system will format amounts according to standard financial conventions for that currency."
      },
      {
        question: "Can I customize invoice colors and languages?",
        answer: "Yes! By popular demand, we've added customization options. Choose from 10 professional accent colors (Blue, Green, Red, Purple, Orange, Pink, Teal, Yellow, Slate, Black) to match your brand identity. Plus, generate invoices in 6 languages: English, German (Deutsch), Czech (Čeština), Polish (Polski), Slovak (Slovenčina), and Ukrainian (Українська) to serve international clients professionally."
      },
      {
        question: "Can I add my company logo?",
        answer: "Currently, our generator focuses on clean, professional text-based invoices without logo upload functionality. This ensures maximum compatibility, fast loading, and privacy (no image uploads to servers). You can include your complete company information in the text fields for professional presentation."
      }
    ]
  },
  {
    category: "Business & Legal",
    icon: "📋",
    questions: [
      {
        question: "Are the invoices legally valid?",
        answer: "Yes, our invoices include all essential elements required for legal business documents: unique invoice numbers, dates, seller/buyer information, itemized services/products, taxes, and totals. However, specific legal requirements vary by country, so please verify local regulations for your jurisdiction."
      },
      {
        question: "Can I use this for international business?",
        answer: "Absolutely! Our generator supports international invoicing with multi-currency support, VAT calculations for EU business, and multiple languages. It's perfect for cross-border transactions and international client relationships."
      },
      {
        question: "What invoice information is required?",
        answer: "Essential elements include: your business information (name, address, contact), client information, invoice number and date, description of goods/services, quantities and prices, applicable taxes (VAT), and payment terms. Our form guides you through all required fields."
      },
      {
        question: "How should I number my invoices?",
        answer: "Use a sequential numbering system (e.g., INV-001, INV-002) or include year/month (2024-001, 2024-002). Our generator suggests the next number, but you can customize it to fit your business system. Consistent numbering is important for accounting and legal compliance."
      }
    ]
  },
  {
    category: "Technical Support",
    icon: "🛠️",
    questions: [
      {
        question: "What browsers are supported?",
        answer: "Our invoice generator works on all modern browsers including Chrome, Firefox, Safari, and Edge. It's optimized for both desktop and mobile devices, so you can create invoices anywhere."
      },
      {
        question: "Can I use this on mobile devices?",
        answer: "Yes! Our generator is fully responsive and works perfectly on smartphones and tablets. You can create professional invoices on the go with the same functionality as the desktop version."
      },
      {
        question: "What if I encounter technical issues?",
        answer: "If you experience any technical problems, try refreshing the page or using a different browser. Most issues are resolved by clearing your browser cache. For persistent problems, the issue is usually browser-specific and can be resolved by updating your browser."
      },
      {
        question: "Can I save my work and continue later?",
        answer: "Since everything runs locally in your browser for privacy, your work is only saved during the current session. We recommend completing your invoice in one session or copying your information to a text document if you need to continue later."
      }
    ]
  },
  {
    category: "Business Usage",
    icon: "💼",
    questions: [
      {
        question: "Is this suitable for freelancers?",
        answer: "Absolutely! Our generator is perfect for freelancers who need to create professional invoices quickly without ongoing subscription costs. It includes all the features freelancers need: time-based billing, project descriptions, tax calculations, and professional formatting."
      },
      {
        question: "Can small businesses use this?",
        answer: "Yes, our invoice generator is ideal for small businesses, startups, and entrepreneurs. It provides enterprise-level invoice formatting without the complexity or cost of specialized software."
      },
      {
        question: "How do I handle recurring invoices?",
        answer: "While our generator doesn't automate recurring billing, you can easily recreate regular invoices by copying the previous invoice information and updating the date and invoice number. This gives you full control over each invoice."
      },
      {
        question: "Can I track payments?",
        answer: "Our generator creates the invoices, but payment tracking is handled by your business systems. We recommend keeping a simple spreadsheet or using basic accounting software to track which invoices have been paid."
      }
    ]
  }
]

export default function FAQPage() {
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
        description="Get answers to common questions about our free invoice generator. Learn about invoicing, VAT compliance, PDF downloads, and business billing."
      />
      
      <Header />
      <main className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12 max-w-4xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant answers to common questions about our free invoice generator, 
              privacy protection, and professional invoicing best practices.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {faqCategories.map((category) => (
              <div
                key={category.category}
                className="flex flex-col items-center p-4 bg-card rounded-lg border"
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium text-center">{category.category}</span>
              </div>
            ))}
          </div>

          {/* FAQ Sections */}
          {faqCategories.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <div 
                id={category.category.toLowerCase().replace(/\s+/g, '-')}
                className="flex items-center gap-3 mb-6"
              >
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
                    <AccordionTrigger className="text-left font-medium">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg p-6 md:p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Start creating your professional 
              invoice right away or learn more about our service.
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
