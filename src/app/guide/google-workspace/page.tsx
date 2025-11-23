import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'DMARC Setup for Google Workspace - Step-by-Step Guide',
  description: 'Complete guide to setting up DMARC, SPF, and DKIM for Google Workspace (formerly G Suite). Protect your domain from email spoofing and phishing.',
};

export default function GoogleWorkspaceGuide() {
  return (
    <>
      <PageHeader
        title="DMARC for Google Workspace"
        description="Complete setup guide for implementing email authentication with Google Workspace."
        breadcrumbs={[
          { label: 'Guides', href: '/guide' },
          { label: 'Google Workspace' }
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
              15 min read
            </span>
            <span>•</span>
            <span>Last updated: November 2025</span>
            <span>•</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
              Platform Specific
            </span>
          </div>

      {/* Introduction */}
      <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">What you'll accomplish</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Set up SPF for Google Workspace</li>
              <li>• Enable and configure DKIM signing</li>
              <li>• Create and publish your DMARC policy</li>
              <li>• Configure DMARC reporting</li>
              <li>• Test your complete setup</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Prerequisites</h2>
      <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Google Workspace Admin Access</p>
              <p className="text-sm text-gray-700">You need super admin privileges to configure email settings</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">DNS Management Access</p>
              <p className="text-sm text-gray-700">Ability to add TXT records to your domain's DNS</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Verified Domain</p>
              <p className="text-sm text-gray-700">Your domain must be verified in Google Workspace</p>
            </div>
          </li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Step 1: Set Up SPF for Google Workspace</h2>
      <p className="text-gray-700 mb-6">
        SPF authorizes Google's mail servers to send email on behalf of your domain. This is essential
        for email delivery and DMARC compliance.
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">Add SPF Record to DNS</h3>
        <p className="text-sm text-gray-700 mb-4">
          Add this TXT record to your domain's DNS at the root level (@ or your domain name):
        </p>
        <div className="bg-white border border-gray-200 rounded p-4 mb-4">
          <p className="text-xs text-gray-600 mb-2">Type: <span className="font-mono font-bold">TXT</span></p>
          <p className="text-xs text-gray-600 mb-2">Name: <span className="font-mono font-bold">@</span> (or your domain)</p>
          <p className="text-xs text-gray-600 mb-2">Value:</p>
          <code className="block bg-gray-50 p-3 rounded text-sm text-gray-900 break-all">
            v=spf1 include:_spf.google.com ~all
          </code>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-yellow-900 mb-2">If you already have an SPF record:</p>
          <p className="text-xs text-yellow-800">
            Don't create a second SPF record! Instead, add <code className="bg-white px-1 py-0.5 rounded">include:_spf.google.com</code> to your
            existing SPF record, before the final <code className="bg-white px-1 py-0.5 rounded">~all</code> or <code className="bg-white px-1 py-0.5 rounded">-all</code>.
          </p>
        </div>
      </div>

      <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> If you only send email through Google Workspace, you can use <code className="bg-white px-1 py-0.5 rounded">-all</code> (hard fail)
          instead of <code className="bg-white px-1 py-0.5 rounded">~all</code> for stronger protection.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Step 2: Enable DKIM Signing</h2>
      <p className="text-gray-700 mb-6">
        DKIM adds a cryptographic signature to emails sent from Google Workspace, proving they haven't
        been tampered with.
      </p>

      <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">Enable DKIM in Google Admin Console</h3>
        <ol className="space-y-4">
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
            <div>
              <p className="font-semibold text-gray-900">Access Admin Console</p>
              <p className="text-sm text-gray-700">Go to <a href="https://admin.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 inline-flex items-center gap-1">admin.google.com <ExternalLink className="w-3 h-3" /></a></p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
            <div>
              <p className="font-semibold text-gray-900">Navigate to Email Authentication</p>
              <p className="text-sm text-gray-700">Go to Apps → Google Workspace → Gmail → Authenticate email</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
            <div>
              <p className="font-semibold text-gray-900">Generate DKIM Key</p>
              <p className="text-sm text-gray-700">Select your domain and click "Generate New Record"</p>
              <p className="text-xs text-gray-600 mt-1">Recommended: Use 2048-bit key for better security</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
            <div>
              <p className="font-semibold text-gray-900">Copy DNS Record</p>
              <p className="text-sm text-gray-700">Google will display the DKIM TXT record you need to add to DNS</p>
            </div>
          </li>
        </ol>
      </div>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-bold text-gray-900 mb-3">Add DKIM Record to DNS</h3>
        <p className="text-sm text-gray-700 mb-4">
          Add the TXT record provided by Google to your DNS:
        </p>
        <div className="bg-white border border-gray-200 rounded p-4">
          <p className="text-xs text-gray-600 mb-2">Type: <span className="font-mono font-bold">TXT</span></p>
          <p className="text-xs text-gray-600 mb-2">Name: <span className="font-mono font-bold">google._domainkey</span> (or as shown by Google)</p>
          <p className="text-xs text-gray-600 mb-2">Value: <span className="text-gray-500">(long string provided by Google)</span></p>
        </div>
      </div>

      <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Activate DKIM in Google Admin</h3>
        <ol className="space-y-3">
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">5</span>
            <div>
              <p className="text-sm text-gray-700">Wait 24-48 hours for DNS propagation</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">6</span>
            <div>
              <p className="text-sm text-gray-700">Return to the Gmail authentication page in Admin Console</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">7</span>
            <div>
              <p className="text-sm text-gray-700">Click "Start Authentication" to enable DKIM signing</p>
            </div>
          </li>
        </ol>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Step 3: Create DMARC Policy</h2>
      <p className="text-gray-700 mb-6">
        Now that SPF and DKIM are configured, you can implement DMARC to tell receiving servers how to
        handle emails that fail authentication.
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">Recommended DMARC Record (Monitor Mode)</h3>
        <p className="text-sm text-gray-700 mb-4">
          Start with monitoring mode to collect data before enforcing:
        </p>
        <div className="bg-white border border-gray-200 rounded p-4">
          <p className="text-xs text-gray-600 mb-2">Type: <span className="font-mono font-bold">TXT</span></p>
          <p className="text-xs text-gray-600 mb-2">Name: <span className="font-mono font-bold">_dmarc</span></p>
          <p className="text-xs text-gray-600 mb-2">Value:</p>
          <code className="block bg-gray-50 p-3 rounded text-sm text-gray-900 break-all">
            v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc@yourdomain.com; pct=100
          </code>
        </div>
      </div>

      <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-yellow-900">
          <strong>Important:</strong> Replace <code className="bg-white px-1 py-0.5 rounded">dmarc@yourdomain.com</code> with a real email
          address where you want to receive reports. This can be a Google Group or mailbox in your Workspace.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">DMARC Policy Progression</h3>
      <p className="text-gray-700 mb-6">
        Follow this timeline to gradually strengthen your DMARC policy:
      </p>

      <div className="not-prose space-y-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-blue-900">Phase 1: Monitor (Weeks 1-4)</h4>
            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded font-semibold">p=none</span>
          </div>
          <p className="text-sm text-blue-800">
            Collect data on all email sources. Review DMARC reports weekly and fix any legitimate sources failing authentication.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-amber-900">Phase 2: Quarantine (Weeks 5-8)</h4>
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded font-semibold">p=quarantine</span>
          </div>
          <p className="text-sm text-amber-800">
            Failed emails go to spam. Monitor for any legitimate mail ending up in spam folders.
          </p>
          <code className="block bg-white p-2 rounded text-xs text-gray-900 mt-2">
            v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; pct=100
          </code>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-red-900">Phase 3: Reject (Week 9+)</h4>
            <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded font-semibold">p=reject</span>
          </div>
          <p className="text-sm text-red-800">
            Failed emails are blocked entirely. Maximum protection against spoofing and phishing.
          </p>
          <code className="block bg-white p-2 rounded text-xs text-gray-900 mt-2">
            v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; pct=100
          </code>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Step 4: Testing Your Setup</h2>
      <p className="text-gray-700 mb-6">
        After configuring all records and waiting 24-48 hours for DNS propagation, test your setup:
      </p>

      <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <ol className="space-y-4">
          <li className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Use Our Checker</p>
              <p className="text-sm text-gray-700 mb-2">Check your domain with our <Link href="/" className="text-amber-600 hover:text-amber-700 font-semibold">free DMARC checker</Link></p>
            </div>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Send Test Emails</p>
              <p className="text-sm text-gray-700">Send emails from your Workspace to Gmail and Outlook accounts</p>
            </div>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Check Email Headers</p>
              <p className="text-sm text-gray-700">Look for "dmarc=pass" in the Authentication-Results header</p>
            </div>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Monitor Reports</p>
              <p className="text-sm text-gray-700">Watch for DMARC reports to arrive (can take 24-48 hours for first reports)</p>
            </div>
          </li>
        </ol>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Common Issues & Solutions</h2>

      <div className="not-prose space-y-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-bold text-gray-900 mb-2">DKIM Not Activating</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Problem:</strong> Google Admin shows "Awaiting Activation" for DKIM
          </p>
          <p className="text-sm text-gray-700">
            <strong>Solution:</strong> DNS record may not be propagated yet. Wait 48 hours and try again.
            Verify the TXT record is published correctly using a DNS checker.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-bold text-gray-900 mb-2">SPF Too Long</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Problem:</strong> SPF record exceeds 10 DNS lookups when using other services
          </p>
          <p className="text-sm text-gray-700">
            <strong>Solution:</strong> Use our <Link href="/tools/spf-generator" className="text-amber-600 hover:text-amber-700 font-semibold">SPF Generator</Link> to optimize your record,
            or consider using SPF flattening services.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-bold text-gray-900 mb-2">Emails Failing from Third-Party Services</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Problem:</strong> Emails from CRM, marketing tools, or ticketing systems fail DMARC
          </p>
          <p className="text-sm text-gray-700">
            <strong>Solution:</strong> Either add their IPs to SPF, enable DKIM in those services, or configure
            them to send through Google Workspace SMTP relay.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="not-prose bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white mb-8 mt-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Setting Up?
          </h2>
          <p className="text-xl mb-8 text-amber-50">
            Use our tools to generate properly formatted DNS records and check your configuration.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-white text-amber-600 font-bold py-4 px-8 rounded-lg hover:bg-amber-50 transition-colors text-lg"
            >
              Check Your Domain
            </Link>
            <Link
              href="/tools/generator"
              className="inline-block bg-amber-700 text-white font-bold py-4 px-8 rounded-lg hover:bg-amber-800 transition-colors text-lg"
            >
              DMARC Generator
            </Link>
          </div>
        </div>
      </div>

      {/* Related Resources */}
      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/guide/setup-dmarc"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            General DMARC Setup Guide
          </Link>
          <Link
            href="/guide/dmarc-reports"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Understanding DMARC Reports
          </Link>
          <Link
            href="/tools/spf-generator"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            SPF Record Generator
          </Link>
          <Link
            href="/guide/microsoft-365"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            DMARC for Microsoft 365
          </Link>
        </div>
      </div>
          </article>
        </div>
      </div>
    </>
  );
}
