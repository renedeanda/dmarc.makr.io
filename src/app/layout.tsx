import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "DMARC Checker - Verify Your Domain's Email Security",
  description: "Free DMARC checker tool. Verify your domain's DMARC, SPF, and DKIM records to improve email security and deliverability.",
  keywords: "DMARC, SPF, DKIM, email security, domain checker",
  openGraph: {
    title: "DMARC Checker - Verify Your Domain's Email Security",
    description: "Free DMARC checker tool. Verify your domain's DMARC, SPF, and DKIM records to improve email security and deliverability.",
    type: 'website',
    url: 'https://yourwebsite.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: "DMARC Checker - Verify Your Domain's Email Security",
    description: "Free DMARC checker tool. Verify your domain's DMARC, SPF, and DKIM records to improve email security and deliverability.",
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}