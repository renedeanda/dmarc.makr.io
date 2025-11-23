import Link from 'next/link';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export const metadata = {
  title: 'DMARC vs SPF vs DKIM: Complete Comparison Guide | Email Authentication',
  description: 'Understand the differences between DMARC, SPF, and DKIM email authentication protocols. Learn which you need and how they work together to protect your domain.',
};

export default function EmailAuthComparisonPage() {
  return (
    <>
      <PageHeader
        title="DMARC vs SPF vs DKIM"
        description="Understanding the three pillars of email authentication and how they work together to protect your domain."
        breadcrumbs={[
          { label: 'Compare', href: '/compare/email-authentication' },
          { label: 'Email Authentication' }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Quick Answer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-blue-900 mb-3">Quick Answer</h2>
          <p className="text-blue-800 mb-4">
            You need all three for complete email security:
          </p>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span><strong>SPF</strong> authorizes which servers can send email for your domain</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span><strong>DKIM</strong> signs your emails to verify they haven't been tampered with</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span><strong>DMARC</strong> tells receivers what to do when SPF or DKIM fails</span>
            </li>
          </ul>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
                  <th className="px-6 py-4 text-left font-semibold text-amber-600">SPF</th>
                  <th className="px-6 py-4 text-left font-semibold text-amber-600">DKIM</th>
                  <th className="px-6 py-4 text-left font-semibold text-amber-600">DMARC</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">What it does</td>
                  <td className="px-6 py-4 text-gray-700">Specifies authorized mail servers</td>
                  <td className="px-6 py-4 text-gray-700">Adds cryptographic signature to emails</td>
                  <td className="px-6 py-4 text-gray-700">Enforces policy when authentication fails</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">How it works</td>
                  <td className="px-6 py-4 text-gray-700">Checks sender IP against authorized list</td>
                  <td className="px-6 py-4 text-gray-700">Verifies email signature with public key</td>
                  <td className="px-6 py-4 text-gray-700">Validates SPF/DKIM alignment + enforces action</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Protects against</td>
                  <td className="px-6 py-4 text-gray-700">Sender IP spoofing</td>
                  <td className="px-6 py-4 text-gray-700">Email tampering, replay attacks</td>
                  <td className="px-6 py-4 text-gray-700">Domain spoofing, phishing</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Setup difficulty</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Easy</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">Medium</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Easy</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">DNS record type</td>
                  <td className="px-6 py-4 text-gray-700">TXT</td>
                  <td className="px-6 py-4 text-gray-700">TXT (selector-specific)</td>
                  <td className="px-6 py-4 text-gray-700">TXT at _dmarc</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Provides reports</td>
                  <td className="px-6 py-4"><XCircle className="w-5 h-5 text-red-500" /></td>
                  <td className="px-6 py-4"><XCircle className="w-5 h-5 text-red-500" /></td>
                  <td className="px-6 py-4"><CheckCircle className="w-5 h-5 text-green-500" /></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Can stand alone</td>
                  <td className="px-6 py-4">
                    <CheckCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-xs text-gray-600 block mt-1">Partial protection</span>
                  </td>
                  <td className="px-6 py-4">
                    <CheckCircle className="w-5 h-5 text-yellow-500" />
                    <span className="text-xs text-gray-600 block mt-1">Partial protection</span>
                  </td>
                  <td className="px-6 py-4">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="text-xs text-gray-600 block mt-1">Needs SPF/DKIM</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How They Work Together */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-8 my-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How They Work Together
          </h2>
          <div className="space-y-4">
            {[
              { num: 1, title: 'Email is sent', desc: 'Someone sends an email claiming to be from your domain' },
              { num: 2, title: 'SPF check', desc: 'Receiver verifies the sender\'s IP is authorized in your SPF record' },
              { num: 3, title: 'DKIM check', desc: 'Receiver validates the email signature using your public key' },
              { num: 4, title: 'DMARC evaluation', desc: 'Receiver checks if SPF/DKIM "From" domains align with the email\'s "From" domain' },
              { num: 5, title: 'Policy enforcement', desc: 'If DMARC fails, receiver applies your policy (none/quarantine/reject)' },
              { num: 6, title: 'Reporting', desc: 'Receiver sends you a report about the authentication results' }
            ].map((step) => (
              <div key={step.num} className="flex gap-4">
                <div className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-700">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Which Do You Need? */}
        <div className="bg-white rounded-lg p-8 shadow-md mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Which Do You Need?
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">For Basic Protection:</h3>
                <p className="text-gray-700">Start with SPF and DMARC in monitoring mode (p=none). This gives you visibility and some protection.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">For Strong Protection:</h3>
                <p className="text-gray-700">Implement all three: SPF, DKIM, and DMARC with p=quarantine or p=reject. This is the gold standard.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Don't Do This:</h3>
                <p className="text-gray-700">Don't implement DMARC p=reject without first testing with p=none. You could block legitimate emails.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Check Your Email Security?
          </h2>
          <p className="text-lg mb-8 text-amber-50">
            See if your SPF, DKIM, and DMARC records are properly configured.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-amber-600 font-bold py-3 px-8 rounded-lg hover:bg-amber-50 transition-colors"
          >
            Check Your Domain Now
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
