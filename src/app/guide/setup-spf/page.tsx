import Link from 'next/link';
import { AlertCircle, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Complete SPF Setup Guide - Step-by-Step Tutorial | DMARC Checker',
  description: 'Learn how to set up SPF (Sender Policy Framework) records for your domain. Includes syntax guide, examples, best practices, and troubleshooting tips.',
};

export default function SetupSpfGuide() {
  return (
    <>
      <PageHeader
        title="Complete SPF Setup Guide"
        description="Step-by-step instructions for implementing SPF to protect your domain from email spoofing."
        breadcrumbs={[
          { label: 'Guides', href: '/guide' },
          { label: 'SPF Setup' }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 pb-8 pt-6">
          <article className="prose prose-lg max-w-none">
          {/* Meta info */}
          <div className="not-prose flex items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              12 min read
            </span>
            <span>•</span>
            <span>Last updated: November 2025</span>
            <span>•</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
              Beginner Friendly
            </span>
          </div>

      {/* Introduction */}
      <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">What you'll learn</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• What SPF is and why it's critical for email security</li>
              <li>• How to create a valid SPF record</li>
              <li>• SPF syntax and mechanisms explained</li>
              <li>• How to authorize email servers to send on your behalf</li>
              <li>• Best practices and common pitfalls to avoid</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">What is SPF?</h2>
      <p className="text-gray-700 mb-4">
        SPF (Sender Policy Framework) is an email authentication protocol that specifies which mail servers are authorized to send email on behalf of your domain. It prevents spammers from sending emails with forged "From" addresses using your domain.
      </p>
      <p className="text-gray-700 mb-6">
        When an email is received, the receiving server checks the SPF record published in your DNS to verify that the sending server is authorized to send email for your domain. If the server isn't listed, the email may be marked as spam or rejected.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">How SPF Works</h2>
      <div className="not-prose my-8">
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-gray-900">Email is sent from your domain</h3>
            </div>
            <p className="text-gray-600">An email server attempts to send an email claiming to be from @yourdomain.com</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-gray-900">Receiving server checks SPF record</h3>
            </div>
            <p className="text-gray-600">The receiving server looks up your domain's SPF record in DNS</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-gray-900">Server IP is validated</h3>
            </div>
            <p className="text-gray-600">The sending server's IP address is checked against your authorized list</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold text-sm">
                ✓
              </div>
              <h3 className="font-semibold text-gray-900">Email passes or fails SPF check</h3>
            </div>
            <p className="text-gray-600">If authorized, email passes; if not, it may be rejected or marked as spam</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 1: Identify Your Email Sources</h2>
      <p className="text-gray-700 mb-4">
        Before creating an SPF record, identify all services that send email on behalf of your domain:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li><strong>Your email provider</strong> - Google Workspace, Microsoft 365, etc.</li>
        <li><strong>Marketing platforms</strong> - Mailchimp, SendGrid, Constant Contact</li>
        <li><strong>Transactional email services</strong> - AWS SES, Postmark, Mailgun</li>
        <li><strong>CRM systems</strong> - Salesforce, HubSpot</li>
        <li><strong>Help desk software</strong> - Zendesk, Freshdesk</li>
        <li><strong>Your own mail servers</strong> - If you host email yourself</li>
      </ul>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 2: Create Your SPF Record</h2>
      <p className="text-gray-700 mb-4">
        An SPF record is a TXT record that starts with <code>v=spf1</code> and includes mechanisms that define authorized senders.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Basic SPF Record Structure</h3>
      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <code className="text-sm">v=spf1 include:_spf.google.com ~all</code>
        <p className="text-sm text-gray-600 mt-3">
          <strong>Breaking it down:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mt-2">
          <li>• <code>v=spf1</code> - SPF version identifier (required)</li>
          <li>• <code>include:_spf.google.com</code> - Include Google's authorized servers</li>
          <li>• <code>~all</code> - Soft fail for all other servers (recommended)</li>
        </ul>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Common SPF Mechanisms</h3>
      <table className="not-prose w-full border-collapse border border-gray-200 my-8">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-3 text-left font-semibold">Mechanism</th>
            <th className="border border-gray-200 p-3 text-left font-semibold">Purpose</th>
            <th className="border border-gray-200 p-3 text-left font-semibold">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 p-3"><code>include:</code></td>
            <td className="border border-gray-200 p-3">Include another domain's SPF policy</td>
            <td className="border border-gray-200 p-3"><code>include:_spf.google.com</code></td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>ip4:</code></td>
            <td className="border border-gray-200 p-3">Authorize specific IPv4 address</td>
            <td className="border border-gray-200 p-3"><code>ip4:192.0.2.1</code></td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>ip6:</code></td>
            <td className="border border-gray-200 p-3">Authorize specific IPv6 address</td>
            <td className="border border-gray-200 p-3"><code>ip6:2001:db8::1</code></td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>a</code></td>
            <td className="border border-gray-200 p-3">Authorize domain's A record IPs</td>
            <td className="border border-gray-200 p-3"><code>a:mail.example.com</code></td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>mx</code></td>
            <td className="border border-gray-200 p-3">Authorize domain's MX record IPs</td>
            <td className="border border-gray-200 p-3"><code>mx</code></td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">SPF Qualifiers</h3>
      <table className="not-prose w-full border-collapse border border-gray-200 my-8">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-3 text-left font-semibold">Qualifier</th>
            <th className="border border-gray-200 p-3 text-left font-semibold">Result</th>
            <th className="border border-gray-200 p-3 text-left font-semibold">Recommendation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 p-3"><code>+</code></td>
            <td className="border border-gray-200 p-3">Pass (default)</td>
            <td className="border border-gray-200 p-3">For authorized servers</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>~</code></td>
            <td className="border border-gray-200 p-3">Soft Fail</td>
            <td className="border border-gray-200 p-3">Recommended for <code>~all</code></td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>-</code></td>
            <td className="border border-gray-200 p-3">Fail (Hard Fail)</td>
            <td className="border border-gray-200 p-3">Only use <code>-all</code> when certain</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>?</code></td>
            <td className="border border-gray-200 p-3">Neutral</td>
            <td className="border border-gray-200 p-3">Rarely used</td>
          </tr>
        </tbody>
      </table>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Example SPF Records</h3>

      <div className="not-prose space-y-6 my-8">
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Google Workspace Only</h4>
          <code className="text-sm bg-gray-50 p-2 rounded block">v=spf1 include:_spf.google.com ~all</code>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Microsoft 365 Only</h4>
          <code className="text-sm bg-gray-50 p-2 rounded block">v=spf1 include:spf.protection.outlook.com ~all</code>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Multiple Services</h4>
          <code className="text-sm bg-gray-50 p-2 rounded block">v=spf1 include:_spf.google.com include:sendgrid.net ip4:192.0.2.1 ~all</code>
          <p className="text-xs text-gray-600 mt-2">Google Workspace + SendGrid + specific IP</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">With MX Records</h4>
          <code className="text-sm bg-gray-50 p-2 rounded block">v=spf1 mx include:_spf.google.com ~all</code>
          <p className="text-xs text-gray-600 mt-2">Authorize your MX servers and Google</p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 3: Add SPF Record to DNS</h2>
      <p className="text-gray-700 mb-4">
        Add your SPF record as a TXT record at the root of your domain:
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <p className="text-sm font-semibold text-gray-900 mb-2">Hostname:</p>
        <code className="text-sm">@ (or leave blank for root domain)</code>
        <p className="text-sm font-semibold text-gray-900 mt-4 mb-2">Record Type:</p>
        <code className="text-sm">TXT</code>
        <p className="text-sm font-semibold text-gray-900 mt-4 mb-2">Value:</p>
        <code className="text-sm">v=spf1 include:_spf.google.com ~all</code>
      </div>

      <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">Important SPF Rules</h3>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Only ONE SPF record per domain (multiple records will break SPF)</li>
              <li>• Maximum 10 DNS lookups (includes, a, mx mechanisms count as lookups)</li>
              <li>• Maximum 512 characters (though most DNS providers support longer)</li>
              <li>• Always end with <code>~all</code> or <code>-all</code></li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 4: Verify Your SPF Record</h2>
      <p className="text-gray-700 mb-4">
        After adding your SPF record, verify it's working correctly:
      </p>

      <div className="not-prose my-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <CheckCircle className="w-5 h-5" />
          Check Your SPF Record Now
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Best Practices</h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">1. Start with Soft Fail (~all)</h3>
      <p className="text-gray-700 mb-4">
        Use <code>~all</code> initially to monitor without risking legitimate email delivery. After confirming everything works, you can switch to <code>-all</code> (hard fail) for stricter enforcement.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">2. Keep Under 10 DNS Lookups</h3>
      <p className="text-gray-700 mb-4">
        Each <code>include:</code>, <code>a</code>, <code>mx</code>, and <code>redirect:</code> mechanism counts toward the 10 lookup limit. Exceeding this limit causes SPF to fail.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">3. Use IP Addresses When Possible</h3>
      <p className="text-gray-700 mb-4">
        <code>ip4:</code> and <code>ip6:</code> mechanisms don't count toward the DNS lookup limit. If you have static IPs, use them instead of includes.
      </p>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">4. Document Your SPF Record</h3>
      <p className="text-gray-700 mb-4">
        Keep a list of all services included in your SPF record and why they're there. This makes updates easier and prevents accidentally removing authorized senders.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting</h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">SPF Record Not Found</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Verify the record is at the root domain (@), not a subdomain</li>
        <li>Check that it's a TXT record type</li>
        <li>Wait 15-30 minutes for DNS propagation</li>
        <li>Ensure there are no typos in <code>v=spf1</code></li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Too Many DNS Lookups</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Replace <code>include:</code> mechanisms with <code>ip4:</code> or <code>ip6:</code> where possible</li>
        <li>Remove unused email services from your SPF record</li>
        <li>Consider using SPF flattening tools (with caution)</li>
        <li>Contact service providers for their specific IP ranges</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Multiple SPF Records Error</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>You can only have ONE SPF record per domain</li>
        <li>Combine all mechanisms into a single record</li>
        <li>Remove duplicate SPF TXT records from DNS</li>
      </ul>

      <div className="not-prose bg-green-50 border border-green-200 rounded-lg p-6 my-8">
        <div className="flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">Next Steps</h3>
            <p className="text-sm text-green-800 mb-3">
              Once your SPF record is set up, complete your email authentication by setting up DKIM and DMARC.
            </p>
            <div className="flex gap-2">
              <Link
                href="/guide/setup-dkim"
                className="text-sm font-medium text-green-800 hover:text-green-900 underline"
              >
                Setup DKIM →
              </Link>
              <span className="text-green-600">•</span>
              <Link
                href="/guide/setup-dmarc"
                className="text-sm font-medium text-green-800 hover:text-green-900 underline"
              >
                Setup DMARC →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Guides */}
      <div className="not-prose mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/tools/spf-generator"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">SPF Record Generator</h4>
            <p className="text-sm text-gray-600">Create a valid SPF record using our free tool</p>
          </Link>
          <Link
            href="/compare/email-authentication"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">DMARC vs SPF vs DKIM</h4>
            <p className="text-sm text-gray-600">Understand how these protocols work together</p>
          </Link>
          <Link
            href="/guide/setup-dkim"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">DKIM Setup Guide</h4>
            <p className="text-sm text-gray-600">Next step: Set up DKIM authentication</p>
          </Link>
          <Link
            href="/issues"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">Common Issues</h4>
            <p className="text-sm text-gray-600">Troubleshoot SPF problems</p>
          </Link>
          </div>
        </div>
          </article>
        </div>
      </div>
    </>
  );
}
