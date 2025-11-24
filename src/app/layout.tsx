import './globals.css'
import Footer from './components/Footer'

export const metadata = {
  title: 'DMARC Checker - Instant Results, No Signup Required | Free Tool',
  description: 'Check your DMARC, SPF & DKIM records in 30 seconds. Free tools including bulk domain checker, policy analyzer, record generators, and setup guides. Instant, private, no signup required.',
  keywords: 'DMARC checker free, instant DMARC test, SPF DKIM checker, email authentication, domain security, DMARC validator, no signup tool, bulk domain checker, DMARC generator, SPF generator, policy analyzer, DMARC setup guide',
  openGraph: {
    title: 'Free DMARC Checker - Instant Results, No Signup | Privacy-First',
    description: 'Check your email security in 30 seconds. Free tools including bulk checker, policy analyzer, generators, and comprehensive setup guides. Your domain data stays private.',
    type: 'website',
    url: 'https://dmarc.makr.io',
    siteName: 'DMARC Checker by MAKR.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DMARC Checker - Instant, Free, Private',
    description: 'Check DMARC, SPF & DKIM records in 30 seconds. Includes bulk checker, policy analyzer, generators & guides. No signup required.',
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      url: '/favicon.svg',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "DMARC Checker Tool",
              description: "Free DMARC, SPF, and DKIM checker tool to verify email security records and prevent email spoofing",
              url: "https://dmarc.makr.io",
              applicationCategory: "SecurityApplication",
              browserRequirements: "Any modern web browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD"
              },
              provider: {
                "@type": "Organization",
                name: "MAKR.io",
                url: "https://makr.io"
              },
              featureList: [
                "Instant DMARC record checking",
                "SPF record validation",
                "DKIM record verification",
                "Bulk domain checker (up to 50 domains)",
                "DMARC policy analyzer",
                "DMARC record generator",
                "SPF record generator",
                "Comprehensive setup guides",
                "Client-side DNS lookups",
                "No signup required",
                "Privacy-first design"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}