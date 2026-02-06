"use client"

import Link from "next/link"
import { useLocale } from "@/app/[locale]/providers"

export default function Footer() {
  const { locale, dict } = useLocale()
  const href = (path: string) => `/${locale}${path === "/" ? "" : path}`

  return (
    <footer className="bg-secondary text-secondary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-xl font-semibold mb-4">Invoice.wiki</div>
            <p className="mb-3">&copy; {new Date().getFullYear()} Invoice.wiki</p>
            <a
              href="https://github.com/michaldumnyc/invoice.wiki.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"
              aria-label="View source code on GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              {dict.footer.openSource}
            </a>
          </div>
          <div>
            <div className="text-xl font-semibold mb-4">{dict.footer.quickLinks}</div>
            <ul className="space-y-2">
              <li>
                <Link href={href("/")} className="hover:text-primary transition-colors">
                  {dict.footer.freeInvoiceGenerator}
                </Link>
              </li>
              <li>
                <Link href={href("/about")} className="hover:text-primary transition-colors">
                  {dict.footer.aboutSite}
                </Link>
              </li>
              <li>
                <Link href={href("/create-invoice")} className="hover:text-primary transition-colors">
                  {dict.footer.createProfessionalInvoice}
                </Link>
              </li>
              <li>
                <Link href={href("/privacy-policy")} className="hover:text-primary transition-colors">
                  {dict.footer.privacyPolicy}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
