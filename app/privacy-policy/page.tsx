import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContactButton } from "@/components/ContactButton"
import type { Metadata } from "next"
import { BreadcrumbJsonLd } from "../components/JsonLd"

export const metadata: Metadata = {
  title: "Privacy Policy - Invoice.wiki",
  description: "Invoice.wiki privacy policy. We don't collect personal data - all processing happens in your browser. No tracking, no data storage, complete privacy protection.",

  alternates: {
    canonical: "https://invoice.wiki/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy - Invoice.wiki",
    description:
      "Complete privacy protection with Invoice.wiki. No data collection, browser-based processing, and secure invoice generation.",
    url: "https://invoice.wiki/privacy-policy",
    siteName: "Invoice.wiki",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Invoice.wiki Privacy Policy",
        type: "image/svg+xml",
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - Invoice.wiki",
    description:
      "Learn about Invoice.wiki's privacy-first approach to online invoice generation.",
    images: ["/images/twitter-card.svg"]
  }
}

const privacyEmail = process.env.PRIVACY_EMAIL || "contact@example.com"


export default function PrivacyPolicyPage() {
  const breadcrumbItems = [
    { name: "Home", url: "https://invoice.wiki" },
    { name: "Privacy Policy", url: "https://invoice.wiki/privacy-policy" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Header />
      <main className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose dark:prose-invert max-w-none">
              <h2>Data Protection Statement</h2>
              <p>
                <Link href="/" className="text-blue-600 hover:underline">Invoice.wiki</Link> online invoice maker does not collect personal data. All invoice generation happens within your web browser.
                Professional invoices and PDFs are created on your device, and all invoice data is cleared when you close your browser.
              </p>
              <p>
                We do not use cookies for tracking or advertising. The only data we store in your browser is 
                theme preferences (light/dark) in localStorage to provide a consistent user experience.
              </p>
              <p>
                We use Vercel Analytics to collect anonymous usage statistics that help us improve the service.
                This data does not contain any personal information.
              </p>

              <h2>How We Protect Your Privacy</h2>
              <p>
                At Invoice.wiki, we believe your business information should remain completely private. Our <Link href="/create-invoice" className="text-blue-600 hover:underline">invoice generator</Link> is designed with privacy-first principles:
              </p>
              <ul>
                <li><strong>Local Processing:</strong> All invoice data is processed locally in your browser using JavaScript. No information is sent to our servers.</li>
                <li><strong>No Registration Required:</strong> You can start <Link href="/create-invoice" className="text-blue-600 hover:underline">creating invoices</Link> immediately without providing any personal information.</li>
                <li><strong>No Data Storage:</strong> We don't store your invoice details, client information, or business data on our servers.</li>
                <li><strong>Secure PDF Generation:</strong> PDF files are created locally in your browser and downloaded directly to your device.</li>
                <li><strong>No Email Required:</strong> Unlike other invoice generators, we never ask for your email address or contact details.</li>
              </ul>

              <h2>What Information We Don't Collect</h2>
              <p>To be completely transparent, here's what we specifically do NOT collect:</p>
              <ul>
                <li>Your name, email address, or contact information</li>
                <li>Client names, addresses, or business details</li>
                <li>Invoice amounts, line items, or payment information</li>
                <li>Company logos, branding, or custom content</li>
                <li>Bank account details or payment methods</li>
                <li>IP addresses for tracking purposes</li>
                <li>Browser fingerprints or device identifiers</li>
              </ul>

              <h2>Anonymous Analytics</h2>
              <p>
                We use Vercel Analytics to understand how our <Link href="/create-invoice" className="text-blue-600 hover:underline">free invoice generator</Link> is being used. This helps us improve the service and identify technical issues. The analytics data is completely anonymous and includes only:
              </p>
              <ul>
                <li>Page views and popular features</li>
                <li>Browser types and device categories (mobile/desktop)</li>
                <li>General geographic regions (country-level)</li>
                <li>Technical performance metrics</li>
              </ul>
              <p>
                This data cannot be used to identify individual users and is aggregated across all visitors.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                Invoice.wiki is hosted on Vercel's secure infrastructure. While we don't send your invoice data to any third parties, standard web hosting logs may contain basic technical information like request times and general error data. Learn more <Link href="/about" className="text-blue-600 hover:underline">about our platform</Link> and security measures.
              </p>

              <h2>Your Rights and Control</h2>
              <p>
                Since we don't collect your personal data, there's nothing for us to delete, modify, or transfer. You maintain complete control over your information at all times. If you have concerns about privacy, you can:
              </p>
              <ul>
                <li>Use Invoice.wiki in incognito/private browsing mode</li>
                <li>Clear your browser's localStorage to remove theme preferences</li>
                <li>Disable JavaScript (though this will prevent the invoice generator from working)</li>
              </ul>

              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg my-8">
                <h3 className="text-xl font-semibold mb-4">Ready to Create Secure Invoices?</h3>
                <p className="mb-4">
                  Experience the most private way to generate professional invoices online. No registration, no data collection, just fast and secure billing.
                </p>
                <Link href="/create-invoice" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Start Creating Private Invoices →
                </Link>
              </div>

              <h2>Contact Information</h2>
              <p>
                If you have any questions about our privacy policy or security measures, please{" "}
                <ContactButton email="support@invoice.wiki" />.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

