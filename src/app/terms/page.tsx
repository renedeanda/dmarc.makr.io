import Link from 'next/link';

export const metadata = {
  title: 'Terms of Use | DMARC Checker',
  description: 'Terms of use for DMARC Checker. Please review before using our service.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Use</h1>

        <p className="text-gray-600 mb-8">
          Last updated: November 2025
        </p>

        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Acceptance of Terms</h2>
          <p className="text-gray-700 mb-4">
            By accessing and using DMARC Checker ("the Service"), you accept and agree to be bound by the
            terms and provisions of this agreement. If you do not agree to these terms, please do not use the Service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Use of Service</h2>
          <p className="text-gray-700 mb-4">
            DMARC Checker is a free tool that queries publicly available DNS records. DNS records (including DMARC, SPF, and DKIM) are public information that anyone can look up. You may use this Service to check any domain for:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Verifying email authentication configurations</li>
            <li>Educational and learning purposes</li>
            <li>Security research and analysis</li>
            <li>Troubleshooting email deliverability</li>
            <li>Any other legitimate purpose</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Acceptable Use</h2>
          <p className="text-gray-700 mb-4">
            While checking DNS records is legal and the information is public, please use this Service responsibly:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Avoid excessive automated requests that could impact service availability for others</li>
            <li>Do not attempt to exploit, hack, or compromise the Service</li>
            <li>Use the information obtained for lawful purposes only</li>
            <li>Respect applicable laws and regulations</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">No Warranty</h2>
          <p className="text-gray-700 mb-4">
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT
            NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p className="text-gray-700 mb-4">
            We do not guarantee that:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>The Service will be error-free or uninterrupted</li>
            <li>The results provided are 100% accurate or complete</li>
            <li>Any errors in the Service will be corrected</li>
            <li>The Service will meet your specific requirements</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 mb-4">
            In no event shall MAKR.io, its owners, or contributors be liable for any direct, indirect, incidental,
            special, consequential, or exemplary damages arising from:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
            <li>Your use or inability to use the Service</li>
            <li>Any errors or inaccuracies in the results provided</li>
            <li>Any unauthorized access to or use of our servers</li>
            <li>Any interruption or cessation of the Service</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Professional Advice Disclaimer</h2>
          <p className="text-gray-700 mb-4">
            The information provided by this Service is for informational purposes only and should not be considered
            as professional IT security advice. For critical security implementations, we recommend consulting with
            qualified IT security professionals.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Modifications to Service</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
            We shall not be liable to you or any third party for any modification, suspension, or discontinuance
            of the Service.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to Terms</h2>
          <p className="text-gray-700 mb-4">
            We reserve the right to update or modify these Terms of Use at any time. Your continued use of the
            Service after such modifications constitutes your acceptance of the updated terms.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Governing Law</h2>
          <p className="text-gray-700 mb-4">
            These Terms shall be governed by and construed in accordance with applicable laws, without regard
            to conflict of law provisions.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contact</h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms of Use, please contact us through{' '}
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
