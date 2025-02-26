import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

interface TermsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsDialog({ open, onOpenChange }: TermsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
          <DialogDescription>Version 1.0 – Initial Release</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p className="text-sm text-muted-foreground">Last updated: February 25, 2025</p>

          <section>
            <h3 className="font-semibold mb-2">1. Acceptance of Terms</h3>
            <p>
              By accessing or using Invoice.wiki (the "Service"), you acknowledge that you have read, understood, and
              agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these
              Terms, you must discontinue use of the Service immediately.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">2. Description of Service</h3>
            <p>
              Invoice.wiki provides a free, web-based invoice generation tool. All invoice generation occurs entirely
              within your browser; no data is transmitted to or stored on our servers. We do not offer data storage,
              retrieval, or recovery services.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">3. No Warranties</h3>
            <p>
              The Service is provided "as is" and "as available," without any warranties of any kind, whether express or
              implied. We do not guarantee that the Service will be error-free, uninterrupted, or free from defects. To
              the fullest extent permitted by law, we disclaim all warranties, including but not limited to warranties
              of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">4. Limitation of Liability</h3>
            <p>
              To the extent permitted by applicable law, Invoice.wiki, its owners, employees, officers, agents,
              affiliates, and partners shall not be liable for any indirect, incidental, special, consequential, or
              exemplary damages arising from your use of the Service. This includes, but is not limited to, damages for
              loss of profits, goodwill, data, or other intangible losses, even if we have been advised of the
              possibility of such damages.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">5. Indemnification</h3>
            <p>
              You agree to indemnify and hold harmless Invoice.wiki, its owners, employees, officers, agents,
              affiliates, and partners from any claims, damages, liabilities, costs, and expenses (including reasonable
              legal fees) arising out of:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Your use or misuse of the Service.</li>
              <li>Your violation of these Terms.</li>
              <li>Any claims made by third parties related to invoices generated using the Service.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">6. Governing Law and Jurisdiction</h3>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the Czech Republic. Any
              disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction
              of the courts of the Czech Republic.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">7. Changes to Terms</h3>
            <p>
              We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon
              posting on our website. Your continued use of the Service after any such changes constitutes your
              acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">8. Version History</h3>
            <p>This section provides a historical record of changes to these Terms and Conditions.</p>
            <p className="mt-2">
              Version 1.0 (Published: February 25, 2025) – Initial release of Terms and Conditions.
            </p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">9. Contact Information</h3>
            <p>If you have any questions regarding these Terms, please contact us at:</p>
            <div className="mt-2">
              <p>Nextrey s.r.o.</p>
              <p>Varšavská 715/36, Vinohrady,</p>
              <p>120 00 Praha 2, Czech Republic</p>
              <p className="mt-2">
                Email:{" "}
                <Link href="/privacy-policy#contact" className="text-blue-500 hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}

