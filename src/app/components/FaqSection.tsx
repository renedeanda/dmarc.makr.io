'use client'

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is DMARC and why do I need it?",
    answer: "DMARC (Domain-based Message Authentication, Reporting, and Conformance) is an email authentication protocol that helps protect your domain from email spoofing and phishing attacks. It works by allowing domain owners to publish policies in their DNS records that specify how email receivers should handle messages that fail authentication checks. Without DMARC, attackers can easily send emails that appear to come from your domain, damaging your reputation and potentially scamming your customers or partners."
  },
  {
    question: "How often should I check my DMARC records?",
    answer: "You should check your DMARC records whenever you make changes to your email infrastructure, add new email service providers, or update your DNS settings. It's also good practice to verify your records quarterly to ensure they haven't been accidentally modified. If you're experiencing email deliverability issues or suspect spoofing attempts, check your records immediately."
  },
  {
    question: "What's the difference between DMARC, SPF, and DKIM?",
    answer: "SPF (Sender Policy Framework) specifies which mail servers are authorized to send email on behalf of your domain. DKIM (DomainKeys Identified Mail) adds a digital signature to your emails to verify they haven't been tampered with. DMARC builds on both SPF and DKIM by telling receiving servers what to do when emails fail these checks (reject, quarantine, or nothing) and provides reporting on authentication results. All three work together to secure your email."
  },
  {
    question: "Can DMARC prevent all email spoofing?",
    answer: "DMARC significantly reduces email spoofing but can't prevent it entirely. It only protects your exact domain when properly configured with a strict policy (p=reject). Attackers can still use similar-looking domains (like adding a character or using a different TLD). However, DMARC with a reject policy will prevent most spoofing attempts and is considered a critical security control for any domain."
  },
  {
    question: "What does p=reject vs p=quarantine mean?",
    answer: "The 'p' tag in your DMARC record defines your policy. p=none means monitoring only - no action is taken on failed emails, but you receive reports. p=quarantine tells receivers to treat failed emails as suspicious (usually sent to spam). p=reject is the strictest policy, instructing receivers to completely reject emails that fail DMARC authentication. Start with p=none, monitor reports, fix issues, then gradually move to p=quarantine and finally p=reject."
  },
  {
    question: "Do subdomains need their own DMARC records?",
    answer: "Not necessarily. Subdomains can inherit the DMARC policy from your main domain. The 'sp' tag in your parent domain's DMARC record specifies the policy for subdomains. If no 'sp' tag is present, subdomains inherit the main 'p' policy. However, you can create separate DMARC records for specific subdomains if they require different policies."
  },
  {
    question: "Is my domain data private when I use this tool?",
    answer: "Yes, completely. This tool performs all DNS lookups directly from your browser using public DNS servers. We never send your domain name to our servers, store any information, or track what domains you check. Everything happens client-side in your browser. You can even verify this by checking your browser's network tab - you'll see DNS queries going directly to DNS providers, not to us."
  },
  {
    question: "How long does it take to check DMARC records?",
    answer: "Typically 5-15 seconds. The tool performs DNS lookups for your DMARC, SPF, and DKIM records. Speed depends on your internet connection and the responsiveness of DNS servers. Common DKIM selectors are checked automatically, though some custom selectors might be missed. The tool runs entirely in your browser, so results appear as soon as DNS queries complete."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 pr-8">{faq.question}</h3>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
