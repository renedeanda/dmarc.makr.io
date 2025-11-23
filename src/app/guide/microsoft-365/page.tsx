import Link from 'next/link';
import { CheckCircle, AlertTriangle, ArrowRight, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'DMARC Setup for Microsoft 365 - Complete Setup Guide',
  description: 'Step-by-step guide to configuring DMARC, SPF, and DKIM for Microsoft 365 (Office 365). Protect your domain from email spoofing and phishing attacks.',
};

export default function Microsoft365Guide() {
  return (
    <>
      <PageHeader
        title="DMARC for Microsoft 365"
        description="Complete setup guide for implementing email authentication with Microsoft 365."
        breadcrumbs={[
          { label: 'Guides', href: '/guide' },
          { label: 'Microsoft 365' }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 pb-12">
          <article className="prose prose-lg max-w-none">
          {/* Meta info */}
          <div className="not-prose flex items-center gap-4 text-sm text-gray-600 mb-8">
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
              <li>• Set up SPF for Microsoft 365</li>
              <li>• Enable DKIM signing for your domains</li>
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
              <p className="font-semibold text-gray-900">Microsoft 365 Admin Access</p>
              <p className="text-sm text-gray-700">Global administrator or Exchange administrator role</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">DNS Management Access</p>
              <p className="text-sm text-gray-700">Ability to add TXT and CNAME records to your domain's DNS</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Verified Domain</p>
              <p className="text-sm text-gray-700">Your domain must be added and verified in Microsoft 365</p>
            </div>
          </li>
        </ul>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Step 1: Set Up SPF for Microsoft 365</h2>
      <p className="text-gray-700 mb-6">
        SPF authorizes Microsoft's mail servers to send email on behalf of your domain.
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">Add SPF Record to DNS</h3>
        <p className="text-sm text-gray-700 mb-4">
          Add this TXT record to your domain's DNS at the root level:
        </p>
        <div className="bg-white border border-gray-200 rounded p-4 mb-4">
          <p className="text-xs text-gray-600 mb-2">Type: <span className="font-mono font-bold">TXT</span></p>
          <p className="text-xs text-gray-600 mb-2">Name: <span className="font-mono font-bold">@</span> (or your domain)</p>
          <p className="text-xs text-gray-600 mb-2">Value:</p>
          <code className="block bg-gray-50 p-3 rounded text-sm text-gray-900 break-all">
            v=spf1 include:spf.protection.outlook.com -all
          </code>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-xs font-semibold text-yellow-900 mb-2">If you already have an SPF record:</p>
          <p className="text-xs text-yellow-800">
            Don't create a second SPF record! Instead, add <code className="bg-white px-1 py-0.5 rounded">include:spf.protection.outlook.com</code> to your
            existing SPF record, before the final <code className="bg-white px-1 py-0.5 rounded">-all</code> or <code className="bg-white px-1 py-0.5 rounded">~all</code>.
          </p>
        </div>
      </div>

      <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-900">
          <strong>Important:</strong> Microsoft 365 requires <code className="bg-white px-1 py-0.5 rounded">-all</code> (hard fail) for proper DMARC compliance.
          Using <code className="bg-white px-1 py-0.5 rounded">~all</code> may cause delivery issues.
        </p>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Step 2: Enable DKIM Signing</h2>
      <p className="text-gray-700 mb-6">
        DKIM adds cryptographic signatures to your emails. Microsoft 365 makes this easy with automatic key management.
      </p>

      <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-4">Enable DKIM in Microsoft 365 Admin Center</h3>
        <ol className="space-y-4">
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
            <div>
              <p className="font-semibold text-gray-900">Access Security Admin Center</p>
              <p className="text-sm text-gray-700">Go to <a href="https://security.microsoft.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-700 inline-flex items-center gap-1">security.microsoft.com <ExternalLink className="w-3 h-3" /></a></p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
            <div>
              <p className="font-semibold text-gray-900">Navigate to DKIM Settings</p>
              <p className="text-sm text-gray-700">Go to Email & Collaboration → Policies & Rules → Threat policies → DKIM</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
            <div>
              <p className="font-semibold text-gray-900">View DKIM Records</p>
              <p className="text-sm text-gray-700">Select your domain from the list to see the required CNAME records</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</span>
            <div>
              <p className="font-semibold text-gray-900">Copy DKIM CNAME Records</p>
              <p className="text-sm text-gray-700">Microsoft will show you two CNAME records that need to be added to DNS</p>
            </div>
          </li>
        </ol>
      </div>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-bold text-gray-900 mb-3">Add DKIM CNAME Records to DNS</h3>
        <p className="text-sm text-gray-700 mb-4">
          Add both CNAME records to your DNS (values will be specific to your domain):
        </p>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded p-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Record 1:</p>
            <p className="text-xs text-gray-600 mb-1">Type: <span className="font-mono font-bold">CNAME</span></p>
            <p className="text-xs text-gray-600 mb-1">Name: <span className="font-mono font-bold">selector1._domainkey</span></p>
            <p className="text-xs text-gray-600">Value: <span className="font-mono">selector1-yourdomain-com._domainkey.yourtenant.onmicrosoft.com</span></p>
          </div>
          <div className="bg-white border border-gray-200 rounded p-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">Record 2:</p>
            <p className="text-xs text-gray-600 mb-1">Type: <span className="font-mono font-bold">CNAME</span></p>
            <p className="text-xs text-gray-600 mb-1">Name: <span className="font-mono font-bold">selector2._domainkey</span></p>
            <p className="text-xs text-gray-600">Value: <span className="font-mono">selector2-yourdomain-com._domainkey.yourtenant.onmicrosoft.com</span></p>
          </div>
        </div>
      </div>

      <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="font-bold text-gray-900 mb-4">Enable DKIM Signing</h3>
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
              <p className="text-sm text-gray-700">Return to the DKIM page in Microsoft 365 Security Center</p>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">7</span>
            <div>
              <p className="text-sm text-gray-700">Toggle the switch to "Enable" for your domain</p>
            </div>
          </li>
        </ol>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Step 3: Create DMARC Policy</h2>
      <p className="text-gray-700 mb-6">
        With SPF and DKIM configured, you can now implement DMARC to control how receiving servers handle
        emails that fail authentication.
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">Recommended DMARC Record (Monitor Mode)</h3>
        <p className="text-sm text-gray-700 mb-4">
          Start with monitoring mode to collect data:
        </p>
        <div className="bg-white border border-gray-200 rounded p-4">
          <p className="text-xs text-gray-600 mb-2">Type: <span className="font-mono font-bold">TXT</span></p>
          <p className="text-xs text-gray-600 mb-2">Name: <span className="font-mono font-bold">_dmarc</span></p>
          <p className="text-xs text-gray-600 mb-2">Value:</p>
          <code className="block bg-gray-50 p-3 rounded text-sm text-gray-900 break-all">
            v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com; pct=100
          </code>
        </div>
      </div>

      <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-yellow-900">
          <strong>Important:</strong> Replace <code className="bg-white px-1 py-0.5 rounded">dmarc@yourdomain.com</code> with a real email
          address where you want to receive reports. Create a dedicated mailbox or shared mailbox in Microsoft 365.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">DMARC Policy Progression</h3>
      <p className="text-gray-700 mb-6">
        Gradually strengthen your policy over time:
      </p>

      <div className="not-prose space-y-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-blue-900">Phase 1: Monitor (Weeks 1-4)</h4>
            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded font-semibold">p=none</span>
          </div>
          <p className="text-sm text-blue-800">
            Collect data on all email sources. Review DMARC reports weekly and address any legitimate sources that fail.
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-amber-900">Phase 2: Quarantine (Weeks 5-8)</h4>
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded font-semibold">p=quarantine</span>
          </div>
          <p className="text-sm text-amber-800">
            Failed emails go to junk folder. Monitor for legitimate mail being quarantined.
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
            Failed emails are rejected. Maximum protection against domain spoofing.
          </p>
          <code className="block bg-white p-2 rounded text-xs text-gray-900 mt-2">
            v=DMARC1; p=reject; rua=mailto:dmarc@yourdomain.com; pct=100
          </code>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Step 4: Testing Your Setup</h2>
      <p className="text-gray-700 mb-6">
        After DNS records are published (wait 24-48 hours), test your configuration:
      </p>

      <div className="not-prose bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <ol className="space-y-4">
          <li className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Use Our Checker</p>
              <p className="text-sm text-gray-700 mb-2">Verify your setup with our <Link href="/" className="text-amber-600 hover:text-amber-700 font-semibold">free DMARC checker</Link></p>
            </div>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Send Test Emails</p>
              <p className="text-sm text-gray-700">Send emails to Gmail, Outlook, and other major providers</p>
            </div>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Check Message Headers</p>
              <p className="text-sm text-gray-700">Look for "dmarc=pass" in the Authentication-Results header</p>
            </div>
          </li>
          <li className="flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900">Wait for Reports</p>
              <p className="text-sm text-gray-700">DMARC reports typically arrive within 24-48 hours of first emails</p>
            </div>
          </li>
        </ol>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Common Issues & Solutions</h2>

      <div className="not-prose space-y-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-bold text-gray-900 mb-2">DKIM Not Enabling</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Problem:</strong> Can't enable DKIM signing in Microsoft 365 admin center
          </p>
          <p className="text-sm text-gray-700">
            <strong>Solution:</strong> Verify both CNAME records are published correctly. Use nslookup or a DNS checker
            to confirm. Wait 24-48 hours after adding records before trying to enable.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-bold text-gray-900 mb-2">Emails from Shared Mailboxes Failing</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Problem:</strong> Emails sent from shared mailboxes or distribution lists fail DMARC
          </p>
          <p className="text-sm text-gray-700">
            <strong>Solution:</strong> Ensure "Send As" or "Send on Behalf" permissions are properly configured.
            Microsoft 365 should automatically sign these with DKIM.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-bold text-gray-900 mb-2">Third-Party Applications Failing</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Problem:</strong> CRM, ticketing systems, or other apps can't send email
          </p>
          <p className="text-sm text-gray-700">
            <strong>Solution:</strong> Configure these apps to send via Microsoft 365 SMTP relay, or add their
            IPs to SPF and enable their DKIM signing. See <Link href="/issues" className="text-amber-600 hover:text-amber-700">troubleshooting guide</Link> for details.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h4 className="font-bold text-gray-900 mb-2">Too Many DNS Lookups</h4>
          <p className="text-sm text-gray-700 mb-2">
            <strong>Problem:</strong> SPF record exceeds 10 DNS lookups when including multiple services
          </p>
          <p className="text-sm text-gray-700">
            <strong>Solution:</strong> Use our <Link href="/tools/spf-generator" className="text-amber-600 hover:text-amber-700 font-semibold">SPF Generator</Link> to
            optimize your record. Consider replacing includes with direct IP addresses where possible.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Microsoft 365-Specific Tips</h2>

      <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <ul className="space-y-3 text-sm text-blue-900">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <div>
              <strong>Enhanced Filtering:</strong> If you use a third-party spam filter or email gateway in front of M365,
              enable Enhanced Filtering to ensure proper DMARC evaluation.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <div>
              <strong>Key Rotation:</strong> Microsoft automatically rotates DKIM keys. No manual key management needed.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <div>
              <strong>Multiple Domains:</strong> Repeat the DKIM setup process for each custom domain in your tenant.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">•</span>
            <div>
              <strong>Defender Integration:</strong> DMARC works alongside Microsoft Defender for Office 365 for enhanced protection.
            </div>
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="not-prose bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white mb-8 mt-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Verify Your Setup?
          </h2>
          <p className="text-xl mb-8 text-amber-50">
            Use our free tools to check your configuration and generate proper DNS records.
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
            href="/guide/google-workspace"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            DMARC for Google Workspace
          </Link>
        </div>
      </div>
          </article>
        </div>
      </div>
    </>
  );
}
