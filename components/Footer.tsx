import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
          <div className="text-xl font-semibold mb-4">Invoice.wiki</div>
            <p>© {new Date().getFullYear()} Invoice.wiki</p>
          </div>
                  <div>
          <div className="text-xl font-semibold mb-4">Quick Links</div>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-blue-300 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/create-invoice" className="hover:text-blue-300 transition-colors">
                  Create Invoice
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

