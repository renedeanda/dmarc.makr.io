import Link from 'next/link';
import { Shield, Lock, CheckCircle, AlertTriangle, Mail, Key, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Email Security Best Practices | Complete Guide to Email Authentication',
  description: 'Essential email security practices to protect your domain from phishing, spoofing, and email-based threats. Learn DMARC, SPF, DKIM, and more.',
};

export default function EmailSecurityPage() {
  return (
    <>
      <PageHeader
        title="Email Security Best Practices"
        description="Comprehensive guide to protecting your domain and users from email-based threats, phishing attacks, and brand impersonation."
        breadcrumbs={[
          { label: 'Guides', href: '/guide' },
          { label: 'Email Security' }
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Why it Matters */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-8 mb-12">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Why Email Security Matters</h2>
            <p className="text-blue-900 text-lg leading-relaxed">
              Email remains the primary attack vector for cybercriminals. Without proper authentication,
              attackers can send emails that appear to come from your domain, damaging your reputation
              and targeting your customers with phishing attacks.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Authentication Protocols */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            1. Implement All Three Authentication Protocols
          </h2>
        </div>

        {/* SPF */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">SPF (Sender Policy Framework)</h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            SPF specifies which mail servers are authorized to send email on behalf of your domain.
            This prevents attackers from forging your domain in the email's envelope sender.
          </p>

          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-4">
            <p className="text-sm font-bold text-gray-700 mb-3">Example SPF Record:</p>
            <div className="bg-white rounded border border-gray-200 p-3 mb-4">
              <code className="text-sm text-gray-900 break-all">
                v=spf1 include:_spf.google.com include:sendgrid.net -all
              </code>
            </div>

            <p className="text-sm font-bold text-gray-700 mb-3">Best Practices:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Use <code className="bg-white px-2 py-1 rounded text-sm">-all</code> (hard fail) instead of{' '}
                  <code className="bg-white px-2 py-1 rounded text-sm">~all</code> (soft fail) for maximum protection
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Keep DNS lookups under 10 to avoid validation failures</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">
                  Use <code className="bg-white px-2 py-1 rounded text-sm">ip4:</code> and{' '}
                  <code className="bg-white px-2 py-1 rounded text-sm">ip6:</code> mechanisms instead of{' '}
                  <code className="bg-white px-2 py-1 rounded text-sm">include:</code> when possible
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Regularly audit and remove outdated entries</span>
              </li>
            </ul>
          </div>
        </div>

        {/* DKIM */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">DKIM (DomainKeys Identified Mail)</h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            DKIM adds a cryptographic signature to your emails, allowing receivers to verify that
            messages haven't been tampered with in transit and actually came from your domain.
          </p>

          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
            <p className="text-sm font-bold text-gray-700 mb-3">Best Practices:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Use 2048-bit RSA keys minimum (recommended over 1024-bit)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Rotate DKIM keys annually for security</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Use multiple selectors for different mail streams</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Keep private keys secure and never expose them</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">Test DKIM signing before full deployment</span>
              </li>
            </ul>
          </div>
        </div>

        {/* DMARC */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">DMARC (Domain-based Message Authentication)</h3>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            DMARC builds on SPF and DKIM by telling receiving mail servers what to do when
            authentication fails. It also provides reporting so you can monitor email activity.
          </p>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6">
            <p className="text-sm font-bold text-gray-900 mb-4">DMARC Deployment Strategy:</p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Start with monitoring (p=none)</p>
                  <p className="text-gray-700">Deploy for 2-4 weeks to understand your email ecosystem</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Review reports</p>
                  <p className="text-gray-700">Identify all legitimate email sources and ensure they pass SPF or DKIM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Move to quarantine (p=quarantine)</p>
                  <p className="text-gray-700">Failed emails go to spam folders</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                  4
                </div>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Finally, reject (p=reject)</p>
                  <p className="text-gray-700">Failed emails are blocked entirely for maximum protection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Additional Security */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Lock className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            2. Additional Security Measures
          </h2>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Enable TLS for Email Transport</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Transport Layer Security (TLS) encrypts email in transit between mail servers, preventing
              eavesdropping and man-in-the-middle attacks.
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900">MTA-STS:</strong>{' '}
                  <span className="text-gray-700">Forces encrypted connections for email delivery</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900">DANE:</strong>{' '}
                  <span className="text-gray-700">Uses DNSSEC to verify TLS certificates</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="w-5 h-5 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-gray-900">TLS Reporting:</strong>{' '}
                  <span className="text-gray-700">Get reports on TLS failures and connection issues</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">BIMI (Brand Indicators for Message Identification)</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              BIMI displays your brand logo next to authenticated emails in supported email clients,
              helping users recognize legitimate emails from your organization.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-gray-800">
                <strong>Note:</strong> BIMI requires DMARC enforcement (p=quarantine or p=reject) and
                a Verified Mark Certificate (VMC) for most email providers.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Subdomain Protection</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Don't forget to protect your subdomains! Attackers often target unprotected subdomains
              to send spoofed emails.
            </p>
            <div className="bg-gray-50 border border-gray-300 rounded-lg p-6">
              <p className="font-bold text-gray-900 mb-3">Protect All Subdomains:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Use <code className="bg-white px-2 py-1 rounded text-sm">sp=reject</code> in your DMARC policy to apply to all subdomains
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Create explicit DMARC records for subdomains that send email</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Use wildcard DNS records for unused subdomains:{' '}
                    <code className="bg-white px-2 py-1 rounded text-sm">*._domainkey TXT "v=DKIM1; p="</code>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Monitoring */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <AlertTriangle className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            3. Continuous Monitoring and Maintenance
          </h2>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Monitor DMARC Reports</h3>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              DMARC reports provide valuable insights into your email authentication status and
              potential threats targeting your domain.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-2">Aggregate Reports (RUA)</h4>
                <p className="text-gray-700">Daily summaries of authentication results</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h4 className="font-bold text-gray-900 mb-2">Forensic Reports (RUF)</h4>
                <p className="text-gray-700">Individual failure samples for investigation</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Monthly Security Checklist</h3>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">Review DMARC reports for suspicious activity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">Verify all authentication records are still valid</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">Check for DNS propagation issues</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">Update SPF record when adding/removing email services</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">Test email deliverability to major providers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-800">Review and update security documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: User Education */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Mail className="w-8 h-8 text-amber-600" />
          <h2 className="text-3xl font-bold text-gray-900">
            4. User Education and Awareness
          </h2>
        </div>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Technical controls are only part of the solution. Educating your users about email
          security is crucial for preventing successful phishing attacks.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recognize Phishing</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-gray-700">Verify sender addresses carefully</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-gray-700">Look for spelling and grammar errors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-gray-700">Hover over links before clicking</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-gray-700">Be suspicious of urgent requests</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Security Programs</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-gray-700">Regular phishing simulations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-gray-700">Quarterly security training</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-gray-700">Clear reporting procedures</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-gray-700">Recognition for threat reporting</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 md:p-12 text-white mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Check Your Email Security Now
          </h2>
          <p className="text-xl mb-8 text-amber-50">
            See how your domain stacks up against these best practices.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-white text-amber-600 font-bold py-4 px-8 rounded-lg hover:bg-amber-50 transition-colors text-lg"
            >
              Check Your Domain
            </Link>
            <Link
              href="/guide/setup-dmarc"
              className="inline-block bg-amber-700 text-white font-bold py-4 px-8 rounded-lg hover:bg-amber-800 transition-colors text-lg"
            >
              Setup Guide
            </Link>
          </div>
        </div>
      </div>

      {/* Related Resources */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/guide/setup-dmarc"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Complete DMARC Setup Guide
          </Link>
          <Link
            href="/compare/email-authentication"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            DMARC vs SPF vs DKIM
          </Link>
          <Link
            href="/issues"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Troubleshooting Common Issues
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Free DMARC Checker
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
