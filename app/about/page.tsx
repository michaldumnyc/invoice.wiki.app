import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContactButton } from "@/components/ContactButton"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "../components/JsonLd"

export const metadata: Metadata = {
  title: "About Invoice.wiki - Free Invoice Generator & Secure Online Billing",
  description: "Discover how Invoice.wiki helps freelancers, contractors, and businesses create free invoices online. Secure, fast, no registration, and PDF download included.",

  alternates: {
    canonical: "https://invoice.wiki/about",
  },
}

export default function AboutPage() {
  const supportEmail = process.env.SUPPORT_EMAIL || "contact@example.com"

  const breadcrumbItems = [
    { name: "Home", url: "https://invoice.wiki" },
    { name: "About", url: "https://invoice.wiki/about" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Header />
      <main className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl font-bold mb-8">About Invoice.wiki - Free Invoice Generator for Freelancers & Businesses</h1>
            <p className="text-xl text-foreground mb-8">
              Invoice.wiki is a free and easy-to-use online invoice generator built for freelancers, small businesses, contractors, and entrepreneurs.
              Create and download professional invoices as PDFs with full privacy — no sign-up, no data tracking, and no installation required.
              Whether you're billing local clients or international partners, our tool makes invoicing fast, secure, and accessible.
            </p>

            {/* Mission */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
            <p className="mb-6">
              We believe professional invoicing should be accessible to everyone. Our online invoice maker simplifies the billing process
              with a clean interface, automatic tax and total calculations, and instant PDF generation. With Invoice.wiki, anyone can create
              accurate business invoices without technical skills or accounts.
            </p>
            <p className="mb-6">
              We never store your data. All information is processed locally in your browser to ensure full privacy and security.
            </p>

            {/* What is an invoice */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">What is an Invoice?</h2>
            <p className="mb-6">
              An invoice is an official document used to request payment for goods or services. It outlines what was sold, who sold it, who bought it,
              the agreed price, tax amounts, and payment terms. Invoices serve as critical financial and legal records.
            </p>

            {/* History and purpose */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">History and Purpose</h2>
            <p className="mb-6">
              Invoices have been part of commerce since early accounting systems were developed. Today, digital invoicing has become
              standard across industries and borders, supporting smooth trade, clear tax records, and timely payments.
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
              Invoices are official commercial records. They can be used for tax reporting, financial accounting, and legal protection.
              Depending on your country, invoicing may follow specific rules like VAT formatting in the EU or sales tax declarations in the US.
            </p>
            <p className="mb-6">
              Common legal purposes of invoices include:
            </p>
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

            {/* Contacts */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
            <p className="mb-6">
              Have questions, suggestions, or feedback? We’d love to hear from you.
            </p>
            <ContactButton email={supportEmail} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
