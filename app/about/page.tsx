import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContactButton } from "@/components/ContactButton"

export default function AboutPage() {
  const supportEmail = process.env.SUPPORT_EMAIL || "contact@example.com"

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Headline */}
            <h1 className="text-4xl font-bold mb-8">About Invoice.wiki</h1>
            <p className="text-xl text-gray-600 mb-8">
              Invoice.wiki is a free invoice generator that helps create invoices quickly,
              conveniently, and securely. We strive to make the invoicing process accessible
              to everyone, regardless of their level of knowledge and experience.
            </p>

            {/* Mission */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Our Mission</h2>
            <p className="mb-6">
              We believe that invoicing should not be complicated. Invoice.wiki offers an easy-to-use 
              and intuitive service that allows users to create professional invoices without registration, 
              complex configurations, or hidden fees.
            </p>
            <p className="mb-6">
              We ensure maximum privacy and security – all data is processed locally in your 
              browser, without being sent to any servers.
            </p>

            {/* What is an invoice */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">What is an Invoice?</h2>
            <p className="mb-6">
              An invoice is an official commercial document that a seller provides to a buyer to record
              the sale of goods or services. It confirms the buyer’s obligation to pay the specified amount
              under the agreed terms. Invoices serve as a legal basis for accounting and taxation.
            </p>

            {/* History and purpose */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">History and Purpose</h2>
            <p className="mb-6">
              Historically, invoices have been used in trade since the inception of accounting systems.
              They serve as a key element in financial transactions, ensuring transparency and record-keeping 
              for both parties. In today’s world, invoices are an essential tool in e-commerce 
              and international trade.
            </p>

            {/* Components of an invoice */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Invoice Components</h2>

            {/* Seller information */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Seller Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Company Name –</strong> The official name of the business.</li>
              <li><strong>Address –</strong> The registered or operational business address.</li>
              <li><strong>Company Registration Number –</strong> A unique company identifier (Company ID).</li>
              <li><strong>VAT Number (VAT ID) –</strong> If applicable, the Value Added Tax identification number.</li>
              <li><strong>Contact Information –</strong> Email and website of the company.</li>
            </ul>

            {/* Customer information */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Buyer Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Company Name –</strong> The legal name of the client.</li>
              <li><strong>Address –</strong> The client’s registered or operational address.</li>
              <li><strong>Company Registration Number and VAT ID –</strong> If applicable.</li>
              <li><strong>Contact Information –</strong> Email and website of the client.</li>
            </ul>

            {/* Invoice details */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Invoice Details</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Invoice Number –</strong> A unique identifier for the document.</li>
              <li><strong>Issue Date –</strong> When the invoice was created.</li>
              <li><strong>Due Date –</strong> The deadline for payment.</li>
              <li><strong>Currency –</strong> The currency in which the transaction is conducted.</li>
              <li><strong>Reference Numbers –</strong> Additional order or transaction identifiers.</li>
            </ul>

            {/* Payment information */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Payment Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Payment Methods –</strong> Bank transfer, cash, credit card, PayPal, and others.</li>
              <li><strong>Bank Account Details –</strong> Account number, IBAN, SWIFT/BIC code.</li>
              <li><strong>Payment Status –</strong> Indicates whether the invoice has been paid.</li>
            </ul>

            {/* Commodities and settlements */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Items and Calculations</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Item Name –</strong> The product or service being sold.</li>
              <li><strong>Quantity –</strong> The number of units of goods or services provided.</li>
              <li><strong>Unit Price –</strong> The cost of a single unit.</li>
              <li><strong>VAT Rate –</strong> The applicable percentage of Value Added Tax.</li>
              <li><strong>Total Calculation –</strong> Automatic computation of the total cost, including taxes.</li>
            </ul>

            {/* Legal significance */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Legal Significance of an Invoice</h2>
            <p className="mb-6">
              An invoice is an official document confirming the seller’s right to receive payment and the 
              buyer’s obligation to make the payment. Different countries have their own laws and regulations 
              for invoicing, governed by tax authorities. For example, in the European Union, the VAT system 
              applies, while in the United States, Sales Tax is used.
            </p>
            <p className="mb-6">
              By law, an invoice can be used for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li>Confirming a transaction between a buyer and a seller.</li>
              <li>Accounting and financial reporting.</li>
              <li>Calculating and paying taxes.</li>
              <li>Resolving potential disputes between parties.</li>
            </ul>

            {/* Advantages of Invoice.wiki */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Advantages of Invoice.wiki</h2>
            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>Free to use –</strong> No subscriptions or hidden fees.</li>
              <li><strong>No registration required –</strong> Start creating invoices immediately without an account.</li>
              <li><strong>Full confidentiality –</strong> Data is not stored on servers.</li>
              <li><strong>PDF Generation –</strong> Download invoices in a convenient format.</li>
              <li><strong>Multi-currency support –</strong> Work with international clients.</li>
              <li><strong>Flexible fields –</strong> Customize invoice fields to meet your needs.</li>
            </ul>

            {/* Contacts */}
            <h2 className="text-2xl font-semibold mt-12 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have any questions or suggestions, please don't hesitate to reach out to us.
            </p>
            <ContactButton email={supportEmail} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
