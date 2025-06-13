import ‘./globals.css’
import { Inter } from ‘next/font/google’

const inter = Inter({ subsets: [‘latin’] })

export const metadata = {
title: “Free DMARC Checker Tool - Test Your Email Security in 30 Seconds”,
description: “Is your domain vulnerable to email spoofing? Check your DMARC, SPF & DKIM records instantly. Free professional-grade tool to improve email security.”,
keywords: “DMARC checker free, email security test, SPF DKIM checker, email authentication, domain security, DMARC validator”,
openGraph: {
title: “Free DMARC Checker - Test Email Security in 30 Seconds”,
description: “Don’t let hackers spoof your emails! Check your DMARC, SPF & DKIM records instantly with our free professional-grade tool.”,
type: ‘website’,
url: ‘https://dmarc.makr.io’,
siteName: ‘MAKR.io Tools’,
},
twitter: {
card: ‘summary_large_image’,
title: “Free DMARC Checker - Test Email Security in 30 Seconds”,
description: “Don’t let hackers spoof your emails! Check your DMARC, SPF & DKIM records instantly. Free professional-grade tool, instant results.”,
},
icons: [
{
rel: ‘icon’,
type: ‘image/svg+xml’,
url: ‘/favicon.svg’,
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
type=“application/ld+json”
dangerouslySetInnerHTML={{
__html: JSON.stringify({
“@context”: “https://schema.org”,
“@type”: “WebApplication”,
“name”: “DMARC Checker Tool”,
“description”: “Free DMARC, SPF, and DKIM checker tool to verify email security records and prevent email spoofing”,
“url”: “https://dmarc.makr.io”,
“applicationCategory”: “SecurityApplication”,
“browserRequirements”: “Any modern web browser”,
“audience”: {
“@type”: “Audience”,  
“audienceType”: “Business owners, IT administrators, email marketers”
},
“offers”: {
“@type”: “Offer”,
“price”: “0”,
“priceCurrency”: “USD”
},
“provider”: {
“@type”: “Organization”,
“name”: “MAKR.io”,
“url”: “https://makr.io”
},
“featureList”: [
“DMARC record checker”,
“SPF record validation”,
“DKIM record verification”,
“Email security analysis”,
“Instant results”,
“Free to use”
]
})
}}
/>
</head>
<body className={inter.className}>{children}</body>
</html>
)
}