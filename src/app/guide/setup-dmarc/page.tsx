import Link from 'next/link';
import { AlertCircle, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'Complete DMARC Setup Guide - Step-by-Step Tutorial | DMARC Checker',
  description: 'Learn how to set up DMARC records for your domain with our comprehensive step-by-step guide. Includes examples, best practices, and troubleshooting tips.',
};

export default function SetupDmarcGuide() {
  return (
    <>
      <PageHeader
        title="Complete DMARC Setup Guide"
        description="Step-by-step instructions for implementing DMARC on your domain from scratch."
        breadcrumbs={[
          { label: 'Guides', href: '/guide' },
          { label: 'DMARC Setup' }
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
              10 min read
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
              <li>• What DMARC is and why it's essential for email security</li>
              <li>• How to create your first DMARC record</li>
              <li>• Step-by-step DNS configuration instructions</li>
              <li>• How to verify your DMARC setup is working</li>
              <li>• Best practices for DMARC policy progression</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">What is DMARC?</h2>
      <p className="text-gray-700 mb-4">
        DMARC (Domain-based Message Authentication, Reporting, and Conformance) is an email authentication protocol that protects your domain from being used in email spoofing, phishing scams, and other cybercrimes.
      </p>
      <p className="text-gray-700 mb-6">
        Think of DMARC as a security policy for your domain that tells email providers (like Gmail, Outlook, etc.) what to do when they receive an email claiming to be from your domain that doesn't pass authentication checks.
      </p>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Prerequisites</h2>
      <p className="text-gray-700 mb-4">Before setting up DMARC, you need:</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li><strong>SPF record</strong> - Specifies which servers can send email for your domain</li>
        <li><strong>DKIM record</strong> - Adds a digital signature to your emails</li>
        <li><strong>DNS access</strong> - Ability to add TXT records to your domain's DNS</li>
      </ul>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 1: Create Your DMARC Record</h2>
      <p className="text-gray-700 mb-4">
        A DMARC record is a TXT record added to your DNS. Here's the basic format:
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <code className="text-sm">v=DMARC1; p=none; rua=mailto:dmarc@example.com</code>
        <p className="text-sm text-gray-600 mt-3">
          <strong>Breaking it down:</strong>
        </p>
        <ul className="text-sm text-gray-600 space-y-1 mt-2">
          <li>• <code>v=DMARC1</code> - Version identifier (required)</li>
          <li>• <code>p=none</code> - Policy: monitoring only, no action taken</li>
          <li>• <code>rua=mailto:dmarc@example.com</code> - Where to send aggregate reports</li>
        </ul>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Recommended Starting Configuration</h3>
      <p className="text-gray-700 mb-4">
        For your first DMARC record, use this configuration:
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <code className="text-sm">v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com; pct=100; adkim=r; aspf=r</code>
      </div>

      <p className="text-gray-700 mb-4">This configuration:</p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Monitors all email (pct=100) without taking action</li>
        <li>Sends daily aggregate reports to your specified email</li>
        <li>Uses relaxed alignment (adkim=r, aspf=r) for easier initial setup</li>
        <li>Lets you identify all sources sending email on your behalf</li>
      </ul>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 2: Add DMARC Record to DNS</h2>
      <p className="text-gray-700 mb-4">
        Add your DMARC record as a TXT record at the hostname:
      </p>

      <div className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 my-6">
        <p className="text-sm font-semibold text-gray-900 mb-2">Hostname:</p>
        <code className="text-sm">_dmarc.yourdomain.com</code>
        <p className="text-sm font-semibold text-gray-900 mt-4 mb-2">Value:</p>
        <code className="text-sm">v=DMARC1; p=none; rua=mailto:dmarc-reports@yourdomain.com</code>
      </div>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">DNS Provider Instructions</h3>
      <p className="text-gray-700 mb-4">The exact steps vary by provider, but generally:</p>
      <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-6">
        <li>Log in to your DNS provider (GoDaddy, Cloudflare, Route53, etc.)</li>
        <li>Navigate to your domain's DNS settings</li>
        <li>Add a new TXT record</li>
        <li>Enter <code>_dmarc</code> as the hostname/name</li>
        <li>Paste your DMARC record as the value</li>
        <li>Save the changes</li>
      </ol>

      <div className="not-prose bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-yellow-900 mb-2">DNS Propagation Time</h3>
            <p className="text-sm text-yellow-800">
              DNS changes can take up to 48 hours to propagate globally, though most providers update within 15-30 minutes.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 3: Verify Your DMARC Record</h2>
      <p className="text-gray-700 mb-4">
        After adding your DMARC record, verify it's working correctly:
      </p>

      <div className="not-prose my-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          <CheckCircle className="w-5 h-5" />
          Check Your DMARC Record Now
        </Link>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Step 4: Policy Progression</h2>
      <p className="text-gray-700 mb-4">
        After monitoring for 2-4 weeks and fixing any issues, gradually strengthen your policy:
      </p>

      <div className="not-prose my-8">
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-gray-900">p=none (Week 1-4)</h3>
            </div>
            <p className="text-gray-600">Monitor mode - collect data, no action taken on failed emails</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-gray-900">p=quarantine (Week 5-8)</h3>
            </div>
            <p className="text-gray-600">Failed emails go to spam folder - still deliverable but marked suspicious</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-red-100 text-red-800 rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-gray-900">p=reject (Week 9+)</h3>
            </div>
            <p className="text-gray-600">Failed emails are completely rejected - strongest protection</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Common DMARC Tags</h2>
      <table className="not-prose w-full border-collapse border border-gray-200 my-8">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-200 p-3 text-left font-semibold">Tag</th>
            <th className="border border-gray-200 p-3 text-left font-semibold">Purpose</th>
            <th className="border border-gray-200 p-3 text-left font-semibold">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-200 p-3"><code>v</code></td>
            <td className="border border-gray-200 p-3">Protocol version</td>
            <td className="border border-gray-200 p-3"><code>v=DMARC1</code></td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>p</code></td>
            <td className="border border-gray-200 p-3">Policy for domain</td>
            <td className="border border-gray-200 p-3"><code>p=reject</code></td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>rua</code></td>
            <td className="border border-gray-200 p-3">Aggregate reports email</td>
            <td className="border border-gray-200 p-3"><code>rua=mailto:reports@domain.com</code></td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-3"><code>pct</code></td>
            <td className="border border-gray-200 p-3">Percentage of emails to filter</td>
            <td className="border border-gray-200 p-3"><code>pct=25</code></td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">Troubleshooting</h2>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">DMARC Record Not Found</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Wait 15-30 minutes for DNS propagation</li>
        <li>Verify the hostname is exactly <code>_dmarc.yourdomain.com</code></li>
        <li>Check that it's a TXT record, not another type</li>
        <li>Ensure there are no typos in the record</li>
      </ul>

      <h3 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">Not Receiving Reports</h3>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>Verify the email address in <code>rua</code> is correct</li>
        <li>Check spam folder for DMARC reports</li>
        <li>Reports are sent daily - wait 24-48 hours</li>
        <li>Ensure your email can receive large attachments</li>
      </ul>

      {/* Related Guides */}
      <div className="not-prose mt-16 pt-8 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Related Resources</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/compare/email-authentication"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">DMARC vs SPF vs DKIM</h4>
            <p className="text-sm text-gray-600">Understand how these protocols work together</p>
          </Link>
          <Link
            href="/issues"
            className="block p-4 border border-gray-200 rounded-lg hover:border-amber-500 hover:shadow-md transition-all"
          >
            <h4 className="font-semibold text-gray-900 mb-2">Common Issues</h4>
            <p className="text-sm text-gray-600">Troubleshoot DMARC problems</p>
          </Link>
          </div>
        </div>
          </article>
        </div>
      </div>
    </>
  );
}
