import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ContactButton } from "@/components/ContactButton"

const privacyEmail = process.env.PRIVACY_EMAIL || "contact@example.com"


export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[72px] sm:pt-[80px]">
        <div className="container px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose prose-blue max-w-none">
              <p className="text-sm text-gray-500 mb-8">Last Updated: February 25, 2025</p>

              <section>
                <h2 className="text-2xl font-semibold mt-12 mb-4">1. Introduction</h2>
                <p>
                  At Invoice.wiki, we are committed to protecting your privacy. This Privacy Policy outlines how we
                  handle your information when you use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-12 mb-4">2. Information We Do Not Collect</h2>
                <p>
                  Invoice.wiki is designed with your privacy in mind. We do not collect or store any personal
                  information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Personal details</li>
                  <li>Business information</li>
                  <li>Client information</li>
                  <li>Invoice data</li>
                </ul>
                <p>All data processing occurs locally on your device, and no data is transmitted to our servers.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-12 mb-4">3. How Our Service Operates</h2>
                <p>When you create an invoice using Invoice.wiki:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>All processing happens within your web browser.</li>
                  <li>Generated PDFs are created on your device.</li>
                  <li>No data is sent to our servers.</li>
                  <li>All data is cleared when you close your browser.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-12 mb-4">
                  4. Technical Information Collected by Third Parties
                </h2>
                <p>
                  While Invoice.wiki does not collect personal data, certain third-party services used to operate and
                  secure the service may collect technical information. These include:
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Hosting Provider (Vercel)</h3>
                <p>
                  Our hosting provider, Vercel, may automatically collect technical data required for service operation
                  and security, such as:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>IP addresses</li>
                  <li>Browser type and version</li>
                  <li>Access times and dates</li>
                  <li>Error logs</li>
                </ul>
                <p>
                  For more details on how Vercel handles this information, please refer to their{" "}
                  <Link
                    href="https://vercel.com/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Vercel Privacy Policy
                  </Link>
                  .
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-2">Google reCAPTCHA</h3>
                <p>
                  To protect our website from spam and automated abuse, we use Google reCAPTCHA. This service analyzes
                  user interactions to determine whether an activity is performed by a human or a bot. Google may
                  collect the following information:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Your IP address</li>
                  <li>User behavior data (mouse movements, time spent on the page, etc.)</li>
                  <li>Browser and device information</li>
                </ul>
                <p>
                  Google processes this data in accordance with its own{" "}
                  <Link
                    href="https://policies.google.com/privacy?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Google Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="https://policies.google.com/terms?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Google Terms of Service
                  </Link>
                  . By using Invoice.wiki, you acknowledge and agree to this data processing.
                </p>
                <p className="mt-4">If you do not agree with these terms, please discontinue use of our service.</p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-12 mb-4">5. Legal Basis for Data Processing</h2>
                <p>
                  The processing of data within your browser is conducted to fulfill the service you request by using
                  Invoice.wiki. This is in accordance with Article 6(1)(b) of the GDPR, which permits processing
                  necessary for the performance of a contract.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-12 mb-4">6. Your Data Protection Rights</h2>
                <p>
                  Under the GDPR, you have rights concerning your personal data. However, since Invoice.wiki does not
                  collect or store personal data, these rights are not applicable in this context. You have the right
                  to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>Use our service without providing personal information.</li>
                  <li>Clear your browser data at any time to remove all local data.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-12 mb-4">7. Data Transfers</h2>
                <p>
                  As our hosting provider, Vercel, may process data in locations outside the EEA, we ensure that
                  appropriate safeguards are in place to protect your data in compliance with GDPR requirements. For
                  more information, please review Vercel's{" "}
                  <Link
                    href="https://vercel.com/legal/dpa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Vercel Data Processing Agreement
                  </Link>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-12 mb-4">8. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy periodically. It is your responsibility to review this page for any
                  changes. Continued use of our service after modifications indicates your acceptance of the updated
                  policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mt-12 mb-4">9. Contact Information</h2>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <div className="bg-gray-50 p-6 rounded-lg mb-8 mt-4">
                  <p>Nextrey s.r.o.</p>
                  <p>Varšavská 715/36, Vinohrady,</p>
                  <p>120 00 Praha 2, Czech Republic</p>
                  <div className="mt-4">
                    <ContactButton email={privacyEmail} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

