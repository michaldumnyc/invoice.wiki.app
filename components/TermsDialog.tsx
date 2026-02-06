import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import type { Dictionary } from "@/lib/get-dictionary"

interface TermsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dict: Dictionary["terms"]
  locale: string
}

export function TermsDialog({ open, onOpenChange, dict, locale }: TermsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dict.title}</DialogTitle>
          <DialogDescription>{dict.version}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p className="text-sm text-muted-foreground">{dict.lastUpdated}</p>

          <section>
            <h3 className="font-semibold mb-2">{dict.acceptanceOfTerms.title}</h3>
            <p>{dict.acceptanceOfTerms.content}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">{dict.descriptionOfService.title}</h3>
            <p>{dict.descriptionOfService.content}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">{dict.noWarranties.title}</h3>
            <p>{dict.noWarranties.content}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">{dict.limitationOfLiability.title}</h3>
            <p>{dict.limitationOfLiability.content}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">{dict.indemnification.title}</h3>
            <p>{dict.indemnification.content}</p>
            <ul className="list-disc pl-6 mt-2">
              {dict.indemnification.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">{dict.governingLaw.title}</h3>
            <p>{dict.governingLaw.content}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">{dict.changesToTerms.title}</h3>
            <p>{dict.changesToTerms.content}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">{dict.versionHistory.title}</h3>
            <p>{dict.versionHistory.content}</p>
            <p className="mt-2">{dict.versionHistory.v1}</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">{dict.contactInfo.title}</h3>
            <p>{dict.contactInfo.content}</p>
            <div className="mt-2">
              <p>
                <Link href={`/${locale}/privacy-policy#contact`} className="text-primary hover:underline">
                  {dict.contactInfo.link}
                </Link>
              </p>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
