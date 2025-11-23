import Link from 'next/link';
import { FileText, Mail, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Understanding DMARC Reports - Complete Guide | DMARC Checker',
  description: 'Learn how to read and interpret DMARC aggregate (RUA) and forensic (RUF) reports. Understand email authentication results and take action on failures.',
};

export default function DmarcReportsGuide() {
  return (
    <>
      <PageHeader
        title="Understanding DMARC Reports"
        description="Learn how to read and interpret DMARC reports to monitor your email authentication and identify security threats."
        breadcrumbs={[
          { label: 'Guides', href: '/guide' },
          { label: 'DMARC Reports' }
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
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
              Intermediate
            </span>
          </div>

      {/* Introduction */}
      <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <div className="flex gap-3">
          <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-2">What you'll learn</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• The two types of DMARC reports and their purposes</li>
              <li>• How to read aggregate (RUA) reports and what the data means</li>
              <li>• Understanding forensic (RUF) reports for individual failures</li>
              <li>• How to identify legitimate vs unauthorized email sources</li>
              <li>• Taking action based on report findings</li>
            </ul>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Types of DMARC Reports</h2>
      <p className="text-gray-700 mb-6">
        DMARC provides two types of reports that help you monitor email authentication for your domain.
        Understanding both types is crucial for effective email security management.
      </p>

      {/* Report Types */}
      <div className="not-prose grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-500 text-white w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Aggregate Reports (RUA)</h3>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Sent daily by email receivers</li>
            <li>• Show authentication results in bulk</li>
            <li>• Include IP addresses and volume</li>
            <li>• XML format (typically gzipped)</li>
            <li>• Best for monitoring trends</li>
          </ul>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-red-500 text-white w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Forensic Reports (RUF)</h3>
          </div>
          <ul className="text-sm text-gray-700 space-y-2">
            <li>• Sent immediately on failure</li>
            <li>• Contain individual email samples</li>
            <li>• Include headers and metadata</li>
            <li>• Less commonly supported</li>
            <li>• Best for investigating issues</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Reading Aggregate Reports (RUA)</h2>
      <p className="text-gray-700 mb-6">
        Aggregate reports are XML files sent by email receivers (Gmail, Outlook, etc.) that summarize
        authentication results for emails claiming to be from your domain.
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Key Components of RUA Reports</h3>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h4 className="font-bold text-gray-900 mb-3">1. Report Metadata</h4>
        <div className="bg-white border border-gray-200 rounded p-4 text-sm space-y-2">
          <p className="text-gray-700"><strong>Organization:</strong> Who sent the report (e.g., google.com, outlook.com)</p>
          <p className="text-gray-700"><strong>Date Range:</strong> Time period covered by the report</p>
          <p className="text-gray-700"><strong>Report ID:</strong> Unique identifier for this report</p>
        </div>
      </div>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h4 className="font-bold text-gray-900 mb-3">2. Policy Published</h4>
        <p className="text-sm text-gray-700 mb-3">Shows your current DMARC policy as seen by the receiver:</p>
        <div className="bg-white border border-gray-200 rounded p-4 text-sm space-y-2">
          <p className="text-gray-700"><strong>Domain:</strong> Your domain being reported on</p>
          <p className="text-gray-700"><strong>Policy (p):</strong> none, quarantine, or reject</p>
          <p className="text-gray-700"><strong>Subdomain Policy (sp):</strong> Policy for subdomains</p>
          <p className="text-gray-700"><strong>Percentage (pct):</strong> % of emails the policy applies to</p>
          <p className="text-gray-700"><strong>Alignment:</strong> SPF and DKIM alignment mode (relaxed or strict)</p>
        </div>
      </div>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
        <h4 className="font-bold text-gray-900 mb-3">3. Records (The Important Part)</h4>
        <p className="text-sm text-gray-700 mb-3">Each record represents a group of emails from the same source:</p>
        <div className="bg-white border border-gray-200 rounded p-4 space-y-4">
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Source IP Address</p>
            <p className="text-xs text-gray-700">The server that sent emails claiming to be from your domain</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Count</p>
            <p className="text-xs text-gray-700">Number of emails from this source during the reporting period</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Disposition</p>
            <p className="text-xs text-gray-700">What the receiver did: <code className="bg-gray-100 px-1 py-0.5 rounded">none</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">quarantine</code>, or <code className="bg-gray-100 px-1 py-0.5 rounded">reject</code></p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">DKIM Result</p>
            <p className="text-xs text-gray-700"><code className="bg-green-100 text-green-800 px-1 py-0.5 rounded">pass</code> or <code className="bg-red-100 text-red-800 px-1 py-0.5 rounded">fail</code></p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">SPF Result</p>
            <p className="text-xs text-gray-700"><code className="bg-green-100 text-green-800 px-1 py-0.5 rounded">pass</code> or <code className="bg-red-100 text-red-800 px-1 py-0.5 rounded">fail</code></p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Header From</p>
            <p className="text-xs text-gray-700">The domain shown in the "From" header (what users see)</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Interpreting Results</h3>
      <p className="text-gray-700 mb-4">
        The most important thing to understand: <strong>DMARC passes if either SPF or DKIM passes AND aligns</strong> with your domain.
      </p>

      <div className="not-prose space-y-4 mb-8">
        <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900 mb-1">DMARC Pass</p>
            <p className="text-sm text-green-800">SPF or DKIM passed and aligned with your domain. This is legitimate email and no action needed.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg p-4">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 mb-1">DMARC Fail</p>
            <p className="text-sm text-red-800">Both SPF and DKIM failed or didn't align. Could be unauthorized sending or misconfiguration.</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Common Scenarios</h2>

      <div className="not-prose space-y-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-3">Scenario 1: Everything Passing</h4>
          <div className="bg-gray-50 rounded p-4 mb-3 text-sm font-mono">
            <p>Source IP: 209.85.128.24 (Google)</p>
            <p>Count: 1,247</p>
            <p className="text-green-600">SPF: pass, DKIM: pass</p>
            <p className="text-green-600">DMARC: pass</p>
          </div>
          <p className="text-sm text-gray-700">
            <strong>Interpretation:</strong> This is legitimate email sent through Google. No action needed.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-3">Scenario 2: Legitimate but Misconfigured</h4>
          <div className="bg-gray-50 rounded p-4 mb-3 text-sm font-mono">
            <p>Source IP: 192.0.2.45 (Your CRM)</p>
            <p>Count: 89</p>
            <p className="text-red-600">SPF: fail, DKIM: none</p>
            <p className="text-red-600">DMARC: fail</p>
          </div>
          <p className="text-sm text-gray-700">
            <strong>Interpretation:</strong> This is likely your CRM or marketing platform, but it's not properly configured.
            You need to add this IP to your SPF record or configure DKIM signing.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-3">Scenario 3: Potential Spoofing</h4>
          <div className="bg-gray-50 rounded p-4 mb-3 text-sm font-mono">
            <p>Source IP: 198.51.100.123 (Unknown)</p>
            <p>Count: 12</p>
            <p className="text-red-600">SPF: fail, DKIM: fail</p>
            <p className="text-red-600">DMARC: fail</p>
          </div>
          <p className="text-sm text-gray-700">
            <strong>Interpretation:</strong> Unknown IP sending low volume of email that fails all checks. This could be a spoofing attempt.
            Investigate the IP using WHOIS lookups and consider moving to a stricter DMARC policy.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Taking Action on Reports</h2>
      <p className="text-gray-700 mb-6">
        Use your DMARC reports to gradually tighten your email security without breaking legitimate email.
      </p>

      <div className="not-prose bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-amber-900 mb-4">Weekly Report Review Checklist</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
            <div>
              <p className="font-semibold text-amber-900">Identify all email sources</p>
              <p className="text-sm text-amber-800">List all unique IP addresses sending email from your domain</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
            <div>
              <p className="font-semibold text-amber-900">Verify legitimacy</p>
              <p className="text-sm text-amber-800">Cross-reference IPs with your email services (ESP, CRM, ticketing, etc.)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
            <div>
              <p className="font-semibold text-amber-900">Fix failing legitimate sources</p>
              <p className="text-sm text-amber-800">Update SPF records or enable DKIM for services that should pass but don't</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">4</div>
            <div>
              <p className="font-semibold text-amber-900">Investigate unknowns</p>
              <p className="text-sm text-amber-800">Use IP WHOIS lookup, reverse DNS, and search engines to identify unknown sources</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">5</div>
            <div>
              <p className="font-semibold text-amber-900">Progress your policy</p>
              <p className="text-sm text-amber-800">Once everything legitimate passes, move from p=none → p=quarantine → p=reject</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Tools for Analyzing Reports</h2>
      <p className="text-gray-700 mb-6">
        While you can manually parse XML reports, these tools make the process much easier:
      </p>

      <div className="not-prose space-y-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="font-semibold text-gray-900 mb-2">Free Services</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Postmark DMARC Digests</li>
            <li>• DMARC Analyzer (limited free tier)</li>
            <li>• dmarcian (limited free tier)</li>
          </ul>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="font-semibold text-gray-900 mb-2">Self-Hosted Solutions</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Parsedmarc - Open source Python tool</li>
            <li>• DMARC Visualizer - Self-hosted dashboard</li>
          </ul>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">Forensic Reports (RUF)</h2>
      <p className="text-gray-700 mb-6">
        Forensic reports provide samples of individual emails that failed DMARC. However, most major
        receivers (Gmail, Outlook) don't send these due to privacy concerns.
      </p>

      <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900 mb-2">Limited Support</p>
            <p className="text-sm text-yellow-800">
              Don't rely on forensic reports for monitoring. Aggregate reports are much more reliable
              and widely supported. Use forensic reports only as supplementary investigation tools.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="not-prose bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white mb-8 mt-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Set Up DMARC Reporting?
          </h2>
          <p className="text-xl mb-8 text-amber-50">
            Check your current configuration and generate proper DMARC records with reporting enabled.
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
            Complete DMARC Setup Guide
          </Link>
          <Link
            href="/guide/email-security"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Email Security Best Practices
          </Link>
          <Link
            href="/issues"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Troubleshooting Common Issues
          </Link>
          <Link
            href="/tools/analyzer"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            DMARC Policy Analyzer
          </Link>
        </div>
      </div>
          </article>
        </div>
      </div>
    </>
  );
}
