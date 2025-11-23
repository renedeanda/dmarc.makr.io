import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | DMARC Checker',
  description: 'Privacy policy for DMARC Checker. Learn how we protect your data and privacy.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

        <p className="text-gray-600 mb-8">
          Last updated: November 2025
        </p>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment to Privacy</h2>
          <p className="text-gray-700 mb-4">
            At DMARC Checker, we take your privacy seriously. This tool is designed with privacy at its core -
            all domain checks are performed entirely in your browser using client-side DNS lookups.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Data We DO NOT Collect</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>We do not collect, store, or transmit any domain names you check</li>
            <li>We do not store DNS records or results from your checks</li>
            <li>We do not track individual users or create user profiles</li>
            <li>We do not sell, share, or distribute any user data to third parties</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How the Tool Works</h2>
          <p className="text-gray-700 mb-4">
            When you check a domain using our tool:
          </p>
          <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
            <li>Your browser performs DNS lookups directly to public DNS servers (like Google DNS or Cloudflare DNS)</li>
            <li>The results are displayed in your browser</li>
            <li>Nothing is sent to our servers</li>
            <li>You can verify this by checking your browser's network tab - you'll see DNS queries, but no requests to our domain</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Analytics</h2>
          <p className="text-gray-700 mb-4">
            We use Google Analytics to understand aggregate usage patterns (such as number of visitors,
            geographic location, and pages viewed). This helps us improve the tool. Google Analytics may use cookies
            to collect this data. No personally identifiable information or domain names checked are sent to Google Analytics.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Local Storage</h2>
          <p className="text-gray-700 mb-4">
            Our tool may use your browser's local storage to save your check history and preferences. This data:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Remains entirely on your device</li>
            <li>Is never transmitted to our servers</li>
            <li>Can be cleared at any time by clearing your browser data</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
          <p className="text-gray-700 mb-4">
            Our tool connects to public DNS services (such as Google DNS, Cloudflare DNS) to perform DNS lookups.
            These services have their own privacy policies. We recommend reviewing their policies if you have concerns.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this privacy policy from time to time. We will notify users of any material changes by
            updating the "Last updated" date at the top of this policy.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="https://makr.io" className="text-amber-600 hover:text-amber-700 font-medium">
              makr.io
            </a>.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            ← Back to DMARC Checker
          </Link>
        </div>
      </div>
    </div>
  );
}
