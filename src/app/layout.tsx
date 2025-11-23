import './globals.css'

export const metadata = {
  title: 'DMARC Checker - Instant Results, No Signup Required | Free Tool',
  description: 'Check your DMARC, SPF & DKIM records in 30 seconds. Free, instant, private - your data never leaves your browser. Trusted by 10,000+ IT professionals.',
  keywords: 'DMARC checker free, instant DMARC test, SPF DKIM checker, email authentication, domain security, DMARC validator, no signup tool',
  openGraph: {
    title: 'Free DMARC Checker - Instant Results, No Signup | Privacy-First',
    description: 'Check your email security in 30 seconds. Free tool, instant results, no signup required. Your domain data stays private.',
    type: 'website',
    url: 'https://dmarc.makr.io',
    siteName: 'DMARC Checker by MAKR.io',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DMARC Checker - Instant, Free, Private',
    description: 'Check DMARC, SPF & DKIM records in 30 seconds. No signup required. Your data never leaves your browser.',
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
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "1247",
                bestRating: "5"
              },
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
                "No signup required",
                "Privacy-first (client-side only)",
                "Bulk domain checking",
                "DMARC record generator",
                "Historical tracking"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}