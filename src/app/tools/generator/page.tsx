'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Copy, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function DMARCGeneratorPage() {
  const [policy, setPolicy] = useState('none');
  const [ruaEmail, setRuaEmail] = useState('');
  const [rufEmail, setRufEmail] = useState('');
  const [percentage, setPercentage] = useState('100');
  const [subdomainPolicy, setSubdomainPolicy] = useState('');
  const [alignment, setAlignment] = useState<{ dkim: string; spf: string }>({ dkim: 'r', spf: 'r' });
  const [copied, setCopied] = useState(false);

  const generateRecord = () => {
    const parts = ['v=DMARC1', `p=${policy}`];

    if (ruaEmail) {
      parts.push(`rua=mailto:${ruaEmail}`);
    }

    if (rufEmail) {
      parts.push(`ruf=mailto:${rufEmail}`);
    }

    if (percentage !== '100') {
      parts.push(`pct=${percentage}`);
    }

    if (subdomainPolicy) {
      parts.push(`sp=${subdomainPolicy}`);
    }

    if (alignment.dkim !== 'r') {
      parts.push(`adkim=${alignment.dkim}`);
    }

    if (alignment.spf !== 'r') {
      parts.push(`aspf=${alignment.spf}`);
    }

    return parts.join('; ');
  };

  const record = generateRecord();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(record);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="DMARC Record Generator"
        description="Create a properly formatted DMARC DNS record with our easy-to-use generator."
        breadcrumbs={[
          { label: 'Tools', href: '/tools' },
          { label: 'DMARC Generator' }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-2">Before You Start</h2>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Ensure SPF and/or DKIM are already configured</li>
            <li>• Start with policy "none" to monitor before enforcing</li>
            <li>• Set up an email address to receive DMARC reports</li>
            <li>• Test your record before publishing to DNS</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Generator Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Configuration</h2>

            {/* Policy */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Policy (p=) *
              </label>
              <select
                value={policy}
                onChange={(e) => setPolicy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="none">none - Monitor only (recommended for start)</option>
                <option value="quarantine">quarantine - Send to spam</option>
                <option value="reject">reject - Block entirely</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Start with "none" to monitor for 2-4 weeks before enforcing
              </p>
            </div>

            {/* RUA Email */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Aggregate Reports Email (rua=)
              </label>
              <input
                type="email"
                value={ruaEmail}
                onChange={(e) => setRuaEmail(e.target.value)}
                placeholder="dmarc@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Daily aggregate reports of authentication results
              </p>
            </div>

            {/* RUF Email */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Forensic Reports Email (ruf=)
              </label>
              <input
                type="email"
                value={rufEmail}
                onChange={(e) => setRufEmail(e.target.value)}
                placeholder="dmarc-forensic@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Individual failure reports (optional, can be high volume)
              </p>
            </div>

            {/* Percentage */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Percentage (pct=)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Percentage of emails to apply policy to (1-100, default: 100)
              </p>
            </div>

            {/* Subdomain Policy */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Subdomain Policy (sp=)
              </label>
              <select
                value={subdomainPolicy}
                onChange={(e) => setSubdomainPolicy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="">Same as main policy</option>
                <option value="none">none - Monitor only</option>
                <option value="quarantine">quarantine - Send to spam</option>
                <option value="reject">reject - Block entirely</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Policy for subdomains (defaults to main policy if not specified)
              </p>
            </div>

            {/* Advanced Settings */}
            <details className="mb-6">
              <summary className="text-sm font-semibold text-gray-700 cursor-pointer mb-2">
                Advanced Settings
              </summary>
              <div className="space-y-4 mt-4">
                {/* DKIM Alignment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DKIM Alignment (adkim=)
                  </label>
                  <select
                    value={alignment.dkim}
                    onChange={(e) => setAlignment({ ...alignment, dkim: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="r">Relaxed (r) - Default</option>
                    <option value="s">Strict (s)</option>
                  </select>
                </div>

                {/* SPF Alignment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SPF Alignment (aspf=)
                  </label>
                  <select
                    value={alignment.spf}
                    onChange={(e) => setAlignment({ ...alignment, spf: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="r">Relaxed (r) - Default</option>
                    <option value="s">Strict (s)</option>
                  </select>
                </div>
              </div>
            </details>
          </div>

          {/* Generated Record */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your DMARC Record</h2>

              <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 mb-4">
                <p className="text-xs text-gray-600 mb-2 font-medium">DNS Record:</p>
                <code className="text-sm text-gray-900 break-all">{record}</code>
              </div>

              <button
                onClick={copyToClipboard}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors mb-4"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy to Clipboard
                  </>
                )}
              </button>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-yellow-800 font-medium mb-2">DNS Setup Instructions:</p>
                <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
                  <li>Log in to your DNS provider</li>
                  <li>Create a new TXT record</li>
                  <li>Set hostname to: <code className="bg-yellow-100 px-1">_dmarc</code></li>
                  <li>Paste the record value above</li>
                  <li>Save and wait for DNS propagation (up to 48 hours)</li>
                </ol>
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Next Steps:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Publish this record to your DNS</li>
                  <li>Wait 24-48 hours for propagation</li>
                  <li>Verify with our <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">DMARC Checker</Link></li>
                  <li>Monitor reports for 2-4 weeks</li>
                  <li>Gradually strengthen policy as needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Guidance */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Policy Deployment Strategy</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Start: p=none</h3>
              <p className="text-sm text-gray-700">
                Monitor email authentication for 2-4 weeks without affecting delivery.
                Review reports to identify all legitimate email sources.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Next: p=quarantine</h3>
              <p className="text-sm text-gray-700">
                Failed emails go to spam folders. Monitor deliverability and ensure
                no legitimate emails are quarantined.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-xl mb-3">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Final: p=reject</h3>
              <p className="text-sm text-gray-700">
                Failed emails are completely blocked. This is the strongest protection
                but requires confidence in your setup.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Check Your Domain Now
          </Link>
        </div>
      </div>
    </div>
  );
}
