import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContactButton } from "@/components/ContactButton"
import type { Metadata } from "next"
import Link from "next/link"
import { BreadcrumbJsonLd, AboutPageJsonLd, InvoiceExampleImageJsonLd } from "../components/JsonLd"

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
    images: ["/images/twitter-card.png"]
  }
}

export default function AboutPage() {
  const supportEmail = process.env.SUPPORT_EMAIL || "contact@example.com"

  const breadcrumbItems = [
    { name: "Home", url: "https://invoice.wiki" },
    { name: "About", url: "https://invoice.wiki/about" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <AboutPageJsonLd />
      <InvoiceExampleImageJsonLd />
      <Header />
      <main className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl font-bold mb-8">
              About Invoice.wiki - Free Invoice Generator for Freelancers & Businesses
            </h1>
            <p className="text-xl text-foreground mb-8">
              Invoice.wiki is a free and easy-to-use online invoice generator built for freelancers, small businesses,
              contractors, and entrepreneurs. <Link href="/create-invoice" className="text-blue-600 hover:underline">Create and download professional invoices</Link> as PDFs with full privacy — no
              sign-up, no data tracking, and no installation required. Whether you're billing local clients or
              international partners, our tool makes invoicing fast, secure, and accessible. Ready to get started? Visit our <Link href="/create-invoice" className="text-blue-600 hover:underline">invoice generator</Link> now.
            </p>

            {/* Mission */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
            <p className="mb-6">
              We believe professional invoicing should be accessible to everyone. Our <Link href="/create-invoice" className="text-blue-600 hover:underline">online invoice maker</Link> simplifies
              the billing process with a clean interface, automatic tax and total calculations, and instant PDF
              generation. With Invoice.wiki, anyone can create accurate business invoices without technical skills or
              accounts.
            </p>
            <p className="mb-6">
              We never store your data. All information is processed locally in your browser to ensure full privacy and
              security. Learn more about our <Link href="/privacy-policy" className="text-blue-600 hover:underline">privacy protection measures</Link>.
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
            <h3 className="text-xl font-semibold mt-8 mb-4">Seller Information</h3>
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
            <h3 className="text-xl font-semibold mt-8 mb-4">Invoice Details</h3>
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
            <h3 className="text-xl font-semibold mt-8 mb-4">Items and Totals</h3>
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
              the EU or sales tax declarations in the US.
            </p>
            <p className="mb-6">Common legal purposes of invoices include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Verifying business transactions.</li>
              <li>Filing tax returns and claiming deductions.</li>
              <li>Documenting payment terms and amounts.</li>
              <li>Providing evidence in disputes or audits.</li>
            </ul>

            {/* Advantages of Invoice.wiki */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Why Choose Invoice.wiki?</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>Free forever –</strong> No subscriptions, no trials, no fees.</li>
              <li><strong>Instant PDF invoices –</strong> Ready-to-download professional documents.</li>
              <li><strong>Browser-based –</strong> Use on any device without installing anything.</li>
              <li><strong>No login –</strong> Start creating invoices immediately.</li>
              <li><strong>Multi-currency & tax support –</strong> Ideal for international invoicing.</li>
              <li><strong>Secure & private –</strong> Your data never leaves your browser.</li>
            </ul>

            {/* Invoice Quality Example */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Professional Results Every Time</h2>
            <p className="mb-6">
              Our invoice generator creates clean, professional documents that reflect well on your business. 
              Here's an example of what your invoices will look like:
            </p>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-4 mb-8 shadow-lg">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/2">
                  <img 
                    src="/images/invoice-example.png"
                    alt="Sample professional invoice generated by Invoice.wiki showing proper formatting, VAT calculations, and business details"
                    className="w-full h-auto rounded border shadow-sm invoice-example-img"
                    loading="lazy"
                    width="400"
                    height="500"
                  />
                </div>
                <div className="md:w-1/2 space-y-4">
                  <h3 className="text-xl font-semibold">What You Get:</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span>Professional layout with clear structure</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span>Automatic VAT calculations and totals</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span>Complete business and client information</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span>Payment terms and banking details</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <span>Print-ready formatting</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Every invoice maintains this professional standard, ensuring your business 
                    makes a great impression with every client interaction.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold mb-4">Ready to Create Your First Invoice?</h3>
              <p className="mb-4">
                Join thousands of freelancers and small business owners who trust Invoice.wiki for their billing needs. 
                Our <Link href="/create-invoice" className="text-blue-600 hover:underline">free invoice generator</Link> helps you create professional invoices in minutes, not hours.
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
