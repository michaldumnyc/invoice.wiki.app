import { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import Head from "next/head"

export default function MyApp({ Component, pageProps }: AppProps) {
  const [nonce, setNonce] = useState("")

  useEffect(() => {
    // Генерируем nonce динамически
    setNonce(Buffer.from(crypto.randomUUID()).toString("base64"))
  }, [])

  return (
    <>
      <Head>
        {/* Передаем nonce в CSP */}
        <meta httpEquiv="Content-Security-Policy" content={`default-src 'self'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}'`} />
      </Head>
      <Component {...pageProps} nonce={nonce} />
    </>
  )
}
