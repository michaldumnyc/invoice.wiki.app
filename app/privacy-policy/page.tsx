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

            <div className="prose dark:prose-invert max-w-none">
              <h2>Privacy Policy</h2>
              <p>
                Invoice.wiki does not collect personal data. All processing happens within your web browser.
                Generated PDFs are created on your device, and all data is cleared when you close your browser.
              </p>
              <p>
                We do not use cookies for tracking or advertising. The only data we store in your browser is 
                theme preferences (light/dark) in localStorage to provide a consistent user experience.
              </p>
              <p>
                We use Vercel Analytics to collect anonymous usage statistics that help us improve the service.
                This data does not contain any personal information.
              </p>
              <h2>Contact Information</h2>
              <p>
                If you have any questions about our privacy policy, please{" "}
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

