import Link from 'next/link';
import { Shield, Lock, CheckCircle, AlertTriangle, Mail, Key } from 'lucide-react';

export const metadata = {
  title: 'Email Security Best Practices | Complete Guide to Email Authentication',
  description: 'Essential email security practices to protect your domain from phishing, spoofing, and email-based threats. Learn DMARC, SPF, DKIM, and more.',
};

export default function EmailSecurityPage() {
  return (
    <div className="prose prose-lg max-w-4xl">
      <h1>Email Security Best Practices</h1>
      <p className="lead">
        Comprehensive guide to protecting your domain and users from email-based threats, phishing attacks, and brand impersonation.
      </p>

      {/* Introduction */}
      <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
        <h2 className="text-xl font-bold text-blue-900 mb-3">Why Email Security Matters</h2>
        <p className="text-blue-800 mb-0">
          Email remains the primary attack vector for cybercriminals. Without proper authentication,
          attackers can send emails that appear to come from your domain, damaging your reputation
          and targeting your customers with phishing attacks.
        </p>
      </div>

      {/* Core Authentication Protocols */}
      <h2 className="flex items-center gap-2">
        <Shield className="w-6 h-6 text-amber-600" />
        1. Implement All Three Authentication Protocols
      </h2>

      <h3>SPF (Sender Policy Framework)</h3>
      <p>
        SPF specifies which mail servers are authorized to send email on behalf of your domain.
        This prevents attackers from forging your domain in the email's envelope sender.
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">Example SPF Record:</p>
        <code className="text-sm text-gray-900">v=spf1 include:_spf.google.com include:sendgrid.net -all</code>
        <p className="text-sm text-gray-600 mt-3">
          <strong>Best Practices:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mt-2 mb-0">
          <li>• Use <code>-all</code> (hard fail) instead of <code>~all</code> (soft fail) for maximum protection</li>
          <li>• Keep DNS lookups under 10 to avoid validation failures</li>
          <li>• Use <code>ip4:</code> and <code>ip6:</code> mechanisms instead of <code>include:</code> when possible</li>
          <li>• Regularly audit and remove outdated entries</li>
        </ul>
      </div>

      <h3>DKIM (DomainKeys Identified Mail)</h3>
      <p>
        DKIM adds a cryptographic signature to your emails, allowing receivers to verify that
        messages haven't been tampered with in transit and actually came from your domain.
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <p className="text-sm text-gray-600 mb-0">
          <strong>Best Practices:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mt-2 mb-0">
          <li>• Use 2048-bit RSA keys minimum (recommended over 1024-bit)</li>
          <li>• Rotate DKIM keys annually for security</li>
          <li>• Use multiple selectors for different mail streams</li>
          <li>• Keep private keys secure and never expose them</li>
          <li>• Test DKIM signing before full deployment</li>
        </ul>
      </div>

      <h3>DMARC (Domain-based Message Authentication)</h3>
      <p>
        DMARC builds on SPF and DKIM by telling receiving mail servers what to do when
        authentication fails. It also provides reporting so you can monitor email activity.
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <p className="text-sm text-gray-600 mb-2">
          <strong>DMARC Deployment Strategy:</strong>
        </p>
        <ol className="text-sm text-gray-600 space-y-2 mt-2 mb-0 list-decimal list-inside">
          <li><strong>Start with monitoring (p=none):</strong> Deploy for 2-4 weeks to understand your email ecosystem</li>
          <li><strong>Review reports:</strong> Identify all legitimate email sources and ensure they pass SPF or DKIM</li>
          <li><strong>Move to quarantine (p=quarantine):</strong> Failed emails go to spam</li>
          <li><strong>Finally, reject (p=reject):</strong> Failed emails are blocked entirely</li>
        </ol>
      </div>

      {/* Additional Security Measures */}
      <h2 className="flex items-center gap-2">
        <Lock className="w-6 h-6 text-amber-600" />
        2. Additional Security Measures
      </h2>

      <h3>Enable TLS for Email Transport</h3>
      <p>
        Transport Layer Security (TLS) encrypts email in transit between mail servers, preventing
        eavesdropping and man-in-the-middle attacks.
      </p>
      <ul>
        <li><strong>MTA-STS (Mail Transfer Agent Strict Transport Security):</strong> Forces encrypted connections for email delivery</li>
        <li><strong>DANE (DNS-based Authentication of Named Entities):</strong> Uses DNSSEC to verify TLS certificates</li>
        <li><strong>TLS Reporting:</strong> Get reports on TLS failures and connection issues</li>
      </ul>

      <h3>BIMI (Brand Indicators for Message Identification)</h3>
      <p>
        BIMI displays your brand logo next to authenticated emails in supported email clients.
        This helps users recognize legitimate emails from your organization.
      </p>
      <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
        <p className="text-sm text-yellow-800 mb-0">
          <strong>Note:</strong> BIMI requires DMARC enforcement (p=quarantine or p=reject) and
          a Verified Mark Certificate (VMC) for most email providers.
        </p>
      </div>

      <h3>Subdomain Protection</h3>
      <p>
        Don't forget to protect your subdomains! Attackers often target unprotected subdomains
        to send spoofed emails.
      </p>
      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">Protect All Subdomains:</p>
        <ul className="text-sm text-gray-600 space-y-1 mt-2 mb-0">
          <li>• Use <code>sp=reject</code> in your DMARC policy to apply to all subdomains</li>
          <li>• Create explicit DMARC records for subdomains that send email</li>
          <li>• Use wildcard DNS records for unused subdomains: <code>*._domainkey TXT "v=DKIM1; p="</code></li>
        </ul>
      </div>

      {/* Monitoring and Maintenance */}
      <h2 className="flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-amber-600" />
        3. Continuous Monitoring and Maintenance
      </h2>

      <h3>Monitor DMARC Reports</h3>
      <p>
        DMARC reports provide valuable insights into your email authentication status and
        potential threats targeting your domain.
      </p>
      <ul>
        <li><strong>Aggregate Reports (RUA):</strong> Daily summaries of authentication results</li>
        <li><strong>Forensic Reports (RUF):</strong> Individual failure samples for investigation</li>
        <li><strong>Third-party Services:</strong> Use DMARC analysis tools to parse and visualize reports</li>
      </ul>

      <h3>Regular Security Audits</h3>
      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <p className="text-sm font-semibold text-gray-700 mb-2">Monthly Checklist:</p>
        <ul className="text-sm text-gray-600 space-y-1 mt-2 mb-0">
          <li>• Review DMARC reports for suspicious activity</li>
          <li>• Verify all authentication records are still valid</li>
          <li>• Check for DNS propagation issues</li>
          <li>• Update SPF record when adding/removing email services</li>
          <li>• Test email deliverability to major providers</li>
          <li>• Review and update security documentation</li>
        </ul>
      </div>

      {/* User Education */}
      <h2 className="flex items-center gap-2">
        <Mail className="w-6 h-6 text-amber-600" />
        4. User Education and Awareness
      </h2>

      <p>
        Technical controls are only part of the solution. Educating your users about email
        security is crucial for preventing successful phishing attacks.
      </p>

      <h3>Train Users to Recognize Phishing</h3>
      <ul>
        <li>Verify sender addresses carefully (not just display names)</li>
        <li>Look for spelling and grammar errors</li>
        <li>Hover over links before clicking to see the actual URL</li>
        <li>Be suspicious of urgent requests for credentials or financial information</li>
        <li>Report suspicious emails to your IT/security team</li>
      </ul>

      <h3>Implement Security Awareness Programs</h3>
      <ul>
        <li>Regular phishing simulation exercises</li>
        <li>Quarterly security training sessions</li>
        <li>Clear reporting procedures for suspicious emails</li>
        <li>Recognition for employees who report threats</li>
      </ul>

      {/* Advanced Techniques */}
      <h2 className="flex items-center gap-2">
        <Key className="w-6 h-6 text-amber-600" />
        5. Advanced Security Techniques
      </h2>

      <h3>Email Gateway Security</h3>
      <ul>
        <li><strong>Advanced Threat Protection:</strong> Sandbox suspicious attachments and URLs</li>
        <li><strong>Anti-Spam Filters:</strong> Use machine learning to identify and block spam</li>
        <li><strong>Data Loss Prevention (DLP):</strong> Prevent sensitive information leaks</li>
        <li><strong>Email Encryption:</strong> Use S/MIME or PGP for end-to-end encryption</li>
      </ul>

      <h3>Zero Trust Email Security</h3>
      <p>
        Apply zero trust principles to email security by never implicitly trusting any email,
        even from internal sources.
      </p>
      <ul>
        <li>Require authentication for all email, internal and external</li>
        <li>Implement email banner warnings for external senders</li>
        <li>Use multi-factor authentication for email access</li>
        <li>Regularly review and audit email forwarding rules</li>
      </ul>

      {/* Compliance and Standards */}
      <h2>6. Compliance and Industry Standards</h2>

      <h3>Meet Regulatory Requirements</h3>
      <p>
        Many industries have specific email security requirements:
      </p>
      <ul>
        <li><strong>HIPAA (Healthcare):</strong> Requires encryption for emails containing PHI</li>
        <li><strong>PCI DSS (Payment Cards):</strong> Mandates secure email for cardholder data</li>
        <li><strong>GDPR (EU Data Protection):</strong> Requires appropriate security measures for personal data</li>
        <li><strong>SOX (Financial Reporting):</strong> Email retention and security requirements</li>
      </ul>

      <h3>Follow Industry Best Practices</h3>
      <ul>
        <li><strong>NIST Guidelines:</strong> Follow NIST SP 800-177 for email security</li>
        <li><strong>CISA Recommendations:</strong> Implement DHS/CISA email authentication guidance</li>
        <li><strong>M3EAD:</strong> Follow the Messaging, Malware, and Mobile Anti-Abuse Working Group recommendations</li>
      </ul>

      {/* Quick Reference */}
      <div className="not-prose bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-8 my-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Reference: Security Priorities</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">Priority 1 (Critical):</strong>
              <span className="text-gray-700"> Deploy SPF, DKIM, and DMARC (start with p=none)</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">Priority 2 (High):</strong>
              <span className="text-gray-700"> Monitor DMARC reports and strengthen policy to p=quarantine/p=reject</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">Priority 3 (Medium):</strong>
              <span className="text-gray-700"> Implement TLS encryption, MTA-STS, and subdomain protection</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900">Priority 4 (Ongoing):</strong>
              <span className="text-gray-700"> User training, security audits, and advanced threat protection</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="not-prose text-center bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-8 my-12 text-white">
        <h2 className="text-2xl font-bold mb-4">
          Check Your Email Security Now
        </h2>
        <p className="text-lg mb-6 text-amber-50">
          See how your domain stacks up against these best practices.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-block bg-white text-amber-600 font-bold py-3 px-8 rounded-lg hover:bg-amber-50 transition-colors"
          >
            Check Your Domain
          </Link>
          <Link
            href="/guide/setup-dmarc"
            className="inline-block bg-amber-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Setup Guide
          </Link>
        </div>
      </div>

      {/* Related Resources */}
      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 my-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/guide/setup-dmarc" className="text-amber-600 hover:text-amber-700 font-medium">
            Complete DMARC Setup Guide →
          </Link>
          <Link href="/compare/email-authentication" className="text-amber-600 hover:text-amber-700 font-medium">
            DMARC vs SPF vs DKIM →
          </Link>
          <Link href="/issues" className="text-amber-600 hover:text-amber-700 font-medium">
            Troubleshooting Common Issues →
          </Link>
          <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
            Free DMARC Checker →
          </Link>
        </div>
      </div>
    </div>
  );
}
