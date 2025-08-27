import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContactButton } from "@/components/ContactButton"
import { AboutInvoiceExample } from "@/components/AboutInvoiceExample"
import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbJsonLd, AboutPageJsonLd, WebPageJsonLd } from "../components/JsonLd"

export const metadata: Metadata = {
  title: "About Invoice.wiki - Free Invoice Generator & Secure Online Billing",
  description:
    "Discover how Invoice.wiki helps freelancers, contractors, and businesses create free invoices online. Secure, fast, no registration, and PDF download included.",
  alternates: {
    canonical: "https://invoice.wiki/about",
  },
  openGraph: {
    title: "About Invoice.wiki - Free Invoice Generator",
    description:
      "Learn how Invoice.wiki provides free online invoice generation for freelancers and businesses. No registration required, secure browser-based processing.",
    url: "https://invoice.wiki/about",
    siteName: "Invoice.wiki",
    images: [
              {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "About Invoice.wiki - Free Invoice Generator",
          type: "image/png",
        }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Invoice.wiki - Free Invoice Generator",
    description:
      "Learn about our free online invoice generator for freelancers and businesses.",
    images: ["/images/twitter-card.png"],
    site: "@invoice_wiki",
    creator: "@invoice_wiki",
  },
  other: {
    "article:published_time": "2025-02-04T00:00:00Z",
    "article:modified_time": "2025-08-27T00:00:00Z",
    "datePublished": "2025-02-04",
    "dateModified": "2025-08-27"
  }
}

export default function AboutPage() {
  const supportEmail = process.env.SUPPORT_EMAIL || "contact@example.com"
  
  // ISO 8601 metadata for the page
  const pageCreationDate = "2025-02-04T12:00:00.000Z"
  const pageModificationDate = "2025-08-27T18:30:00.000Z"

  const breadcrumbItems = [
    { name: "Home", url: "https://invoice.wiki" },
    { name: "About", url: "https://invoice.wiki/about" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WebPageJsonLd 
        url="https://invoice.wiki/about"
        name="About Invoice Wiki - Create Invoice Generator for Freelancers & Businesses"
        description="Invoice.wiki is a free and easy-to-use online invoice generator built for freelancers, small businesses, contractors, and entrepreneurs. Create and download professional invoices as PDFs with full privacy — no registration needed."
        dateCreated={pageCreationDate}
        dateModified={pageModificationDate}
      />
      <AboutPageJsonLd />
      <Header />
      <main className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl font-bold mb-8">
              About Invoice Wiki - Create Invoice Generator for Freelancers & Businesses
            </h1>
            <p className="text-xl text-foreground mb-8">
              Invoice.wiki is a free and easy-to-use online invoice generator built for freelancers, small businesses,
              contractors, and entrepreneurs. Create and download professional invoices as PDFs with full privacy — no
              registration needed. Use our free invoice generator and 
              <Link href="/create-invoice" className="text-primary underline hover:no-underline">create your first invoice</Link> now.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-3 text-blue-800 dark:text-blue-300">🎨 New Features by Popular Demand!</h2>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                We've listened to our community and added exciting new customization options to make your invoices even more professional and accessible:
              </p>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li><strong>🎨 Custom Colors:</strong> Choose from 10 beautiful accent colors (Blue, Green, Red, Purple, Orange, Pink, Teal, Yellow, Slate, Black) to match your brand identity.</li>
                <li><strong>🌍 Multiple Languages:</strong> Generate invoices in 6 languages - English, German (Deutsch), Czech (Čeština), Polish (Polski), Slovak (Slovenčina), and Ukrainian (Українська) to serve international clients.</li>
              </ul>
              <p className="text-blue-700 dark:text-blue-300 mt-4">
                Try these new features and create invoices that truly represent your business!
              </p>
            </div>

            <h2 className="text-2xl font-semibold mt-12 mb-4">How We Prioritize Your Privacy</h2>
            <p className="mb-6">
              We believe professional invoicing should be accessible to everyone. Our online invoice maker simplifies
              the process while maintaining the highest standards of data protection and user privacy. Your invoice
              information stays entirely on your device, processed locally in your browser for maximum data
              security. Learn more about our <Link href="/privacy-policy" className="text-primary hover:underline">privacy protection measures</Link>.
            </p>

            {/* What is an invoice */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">What is an Invoice?</h2>
            <p className="mb-6">
              An invoice is an official document used to request payment for goods or services. It outlines what was
              sold, who sold it, who bought it, the agreed price, tax amounts, and payment terms. Invoices serve as
              critical financial and legal records.
            </p>

            {/* History and purpose */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">History and Purpose</h2>
            <p className="mb-6">
              Invoices have been part of commerce since early accounting systems were developed. Today, digital
              invoicing has become standard across industries and borders, supporting smooth trade, clear tax records,
              and timely payments.
            </p>

            {/* Components of an invoice */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Key Components of an Invoice</h2>

            {/* Seller information */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Invoice Creator - Seller Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Company Name –</strong> Official business name.</li>
              <li><strong>Business Address –</strong> Registered address of the seller.</li>
              <li><strong>Company ID –</strong> Official registration number.</li>
              <li><strong>VAT Number –</strong> Tax identification number (if applicable).</li>
              <li><strong>Contact Details –</strong> Email, phone number, and website.</li>
            </ul>

            {/* Customer information */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Buyer Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Client Name –</strong> Name of the person or business being billed.</li>
              <li><strong>Client Address –</strong> Delivery or legal address.</li>
              <li><strong>Company ID & VAT (if any) –</strong> Tax info of the buyer.</li>
              <li><strong>Contact –</strong> Client’s email or phone number.</li>
            </ul>

            {/* Invoice details */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Generate Invoice Details</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Invoice Number –</strong> Unique identifier for tracking.</li>
              <li><strong>Issue & Due Dates –</strong> When invoice was created and when payment is due.</li>
              <li><strong>Currency –</strong> Used for the transaction.</li>
              <li><strong>Reference –</strong> Optional PO or order numbers.</li>
            </ul>

            {/* Payment information */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Payment Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Accepted Methods –</strong> Bank transfer, card, PayPal, cash, etc.</li>
              <li><strong>Bank Details –</strong> Account number, IBAN, BIC/SWIFT.</li>
              <li><strong>Status –</strong> Paid or unpaid label.</li>
            </ul>

            {/* Commodities and settlements */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Invoice Generator - Items and Totals</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Service/Product –</strong> Name of what was sold.</li>
              <li><strong>Quantity & Unit Price –</strong> Per-item breakdown.</li>
              <li><strong>VAT –</strong> Percentage applied (if applicable).</li>
              <li><strong>Total –</strong> Final amount including tax.</li>
            </ul>

            {/* Legal significance */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Legal Relevance of Invoices</h2>
            <p className="mb-6">
              Invoices are official commercial records. They can be used for tax reporting, financial accounting, and
              legal protection. Depending on your country, invoicing may follow specific rules like VAT formatting in
              the EU or sales tax declarations in the US. Different countries have specific invoicing requirements for tax compliance.
            </p>
            <p className="mb-6">Common legal purposes of invoices include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Verifying business transactions.</li>
              <li>Filing tax returns and claiming deductions.</li>
              <li>Documenting payment terms and amounts.</li>
              <li>Providing evidence in disputes or audits.</li>
            </ul>

            {/* International Standards */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">International Invoicing Standards</h2>
            <p className="mb-6">
              Modern businesses operate across borders, making international invoicing standards crucial for seamless commerce. 
              Our generator supports international best practices including ISO 20022 standards, EU VAT compliance, 
              and multi-currency formatting that meets global business requirements.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">European Union Compliance</h3>
            <p className="mb-4">
              For businesses operating within the EU, invoices must comply with the EU VAT Directive and national implementations. 
              Key requirements include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Valid VAT identification numbers for cross-border transactions</li>
              <li>Proper reverse charge mechanisms for B2B services</li>
              <li>Compliant invoice numbering and record keeping</li>
              <li>Accurate tax rate application based on place of supply rules</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Digital Invoice Security</h3>
            <p className="mb-4">
              With increasing digitalization, invoice security has become paramount. Our platform ensures:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li><strong>Data Privacy:</strong> All processing occurs locally in your browser</li>
              <li><strong>GDPR Compliance:</strong> No personal data collection or storage</li>
              <li><strong>Audit Trails:</strong> Sequential numbering for tax compliance</li>
              <li><strong>Format Integrity:</strong> PDF generation maintains professional standards</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">Multi-Language Business Support</h3>
            <p className="mb-4">
              International business requires clear communication across language barriers. We support:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>English:</strong> Global business standard</li>
              <li><strong>German (Deutsch):</strong> Central European commerce</li>
              <li><strong>Czech (Čeština):</strong> Regional business hub</li>
              <li><strong>Polish (Polski):</strong> Major EU economy</li>
              <li><strong>Slovak (Slovenčina):</strong> Eurozone member</li>
              <li><strong>Ukrainian (Українська):</strong> Emerging market support</li>
            </ul>

            {/* Advantages of Invoice.wiki */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Why Choose Invoice Wiki Generator?</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>Free forever –</strong> No subscriptions, no trials, no fees.</li>
              <li><strong>Instant PDF invoices –</strong> Ready-to-download professional documents.</li>
              <li><strong>Browser-based –</strong> Use on any device without installing anything.</li>
              <li><strong>No login –</strong> Start creating invoices immediately.</li>
              <li><strong>Multi-currency & tax support –</strong> Ideal for international invoicing.</li>
              <li><strong>Secure & private –</strong> Your data never leaves your browser.</li>
            </ul>

            {/* Invoice Quality Example */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Create Invoices - Professional Results Every Time</h2>
            <p className="mb-6">
              Our invoice generator creates clean, professional documents that reflect well on your business. 
              Here's an example of what your invoices will look like:
            </p>
            
            <AboutInvoiceExample />
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">Ready to Create Your First Invoice?</h3>
              <p className="mb-4">
                Join thousands of freelancers and small business owners who trust Invoice.wiki for their billing needs. 
                Our free invoice generator helps you create professional invoices in minutes, not hours.
              </p>
              <p className="mb-4">
                Whether you need to bill for consulting services, freelance work, or product sales, our platform 
                handles VAT calculations, multiple currencies, and generates PDF invoices that look professional 
                and meet international standards.
              </p>
              <Link href="/create-invoice" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Start Creating Invoices →
              </Link>
            </div>

            {/* Contacts */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
            <p className="mb-6">Have questions, suggestions, or feedback? We’d love to hear from you.</p>
            <ContactButton email={supportEmail} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
