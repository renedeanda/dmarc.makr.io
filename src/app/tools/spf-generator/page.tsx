'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Copy, CheckCircle, Plus, X, AlertTriangle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

interface Include {
  id: number;
  value: string;
}

interface IP {
  id: number;
  value: string;
  type: 'ip4' | 'ip6';
}

export default function SPFGeneratorPage() {
  const [includes, setIncludes] = useState<Include[]>([]);
  const [ips, setIps] = useState<IP[]>([]);
  const [qualifier, setQualifier] = useState('-all');
  const [copied, setCopied] = useState(false);
  const [nextIncludeId, setNextIncludeId] = useState(1);
  const [nextIpId, setNextIpId] = useState(1);

  const addInclude = () => {
    setIncludes([...includes, { id: nextIncludeId, value: '' }]);
    setNextIncludeId(nextIncludeId + 1);
  };

  const removeInclude = (id: number) => {
    setIncludes(includes.filter(inc => inc.id !== id));
  };

  const updateInclude = (id: number, value: string) => {
    setIncludes(includes.map(inc => inc.id === id ? { ...inc, value } : inc));
  };

  const addIP = (type: 'ip4' | 'ip6') => {
    setIps([...ips, { id: nextIpId, value: '', type }]);
    setNextIpId(nextIpId + 1);
  };

  const removeIP = (id: number) => {
    setIps(ips.filter(ip => ip.id !== id));
  };

  const updateIP = (id: number, value: string) => {
    setIps(ips.map(ip => ip.id === id ? { ...ip, value } : ip));
  };

  const generateRecord = () => {
    const parts = ['v=spf1'];

    // Add IPs
    ips.forEach(ip => {
      if (ip.value.trim()) {
        parts.push(`${ip.type}:${ip.value.trim()}`);
      }
    });

    // Add includes
    includes.forEach(inc => {
      if (inc.value.trim()) {
        parts.push(`include:${inc.value.trim()}`);
      }
    });

    // Add qualifier
    parts.push(qualifier);

    return parts.join(' ');
  };

  const record = generateRecord();

  const getDNSLookupCount = () => {
    return includes.length;
  };

  const lookupCount = getDNSLookupCount();
  const isOverLimit = lookupCount > 10;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(record);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commonProviders = [
    { name: 'Google Workspace', value: '_spf.google.com' },
    { name: 'Microsoft 365', value: 'spf.protection.outlook.com' },
    { name: 'SendGrid', value: 'sendgrid.net' },
    { name: 'Mailchimp', value: 'servers.mcsv.net' },
    { name: 'HubSpot', value: 'include.hubspot.com' },
    { name: 'Zendesk', value: 'mail.zendesk.com' }
  ];

  return (
    <>
      <PageHeader
        title="SPF Record Generator"
        description="Create a properly formatted SPF DNS record to authorize mail servers for your domain."
        breadcrumbs={[
          { label: 'Tools', href: '/tools' },
          { label: 'SPF Generator' }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 pb-12 pt-8">

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-bold text-blue-900 mb-2">About SPF Records</h2>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• SPF authorizes which mail servers can send email on behalf of your domain</li>
            <li>• SPF records are published as DNS TXT records at your root domain</li>
            <li>• Keep DNS lookups under 10 to avoid validation failures</li>
            <li>• Use -all (hard fail) for maximum protection</li>
          </ul>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generator Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">IP Addresses</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add your mail server IP addresses directly. This doesn't count toward the DNS lookup limit.
              </p>

              {ips.map((ip) => (
                <div key={ip.id} className="flex gap-2 mb-3">
                  <select
                    value={ip.type}
                    onChange={(e) => {
                      const newIps = ips.map(i =>
                        i.id === ip.id ? { ...i, type: e.target.value as 'ip4' | 'ip6' } : i
                      );
                      setIps(newIps);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="ip4">IPv4</option>
                    <option value="ip6">IPv6</option>
                  </select>
                  <input
                    type="text"
                    value={ip.value}
                    onChange={(e) => updateIP(ip.id, e.target.value)}
                    placeholder="192.0.2.1 or 192.0.2.0/24"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeIP(ip.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="flex gap-2">
                <button
                  onClick={() => addIP('ip4')}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add IPv4
                </button>
                <button
                  onClick={() => addIP('ip6')}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add IPv6
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Third-Party Services</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add include: mechanisms for email service providers. Each include counts as a DNS lookup.
              </p>

              {includes.map((inc) => (
                <div key={inc.id} className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={inc.value}
                    onChange={(e) => updateInclude(inc.id, e.target.value)}
                    placeholder="e.g., _spf.google.com"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeInclude(inc.id)}
                    className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <button
                onClick={addInclude}
                className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm mb-4"
              >
                <Plus className="w-4 h-4" />
                Add Include
              </button>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Common Providers:</p>
                <div className="flex flex-wrap gap-2">
                  {commonProviders.map((provider) => (
                    <button
                      key={provider.name}
                      onClick={() => {
                        setIncludes([...includes, { id: nextIncludeId, value: provider.value }]);
                        setNextIncludeId(nextIncludeId + 1);
                      }}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                    >
                      + {provider.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">All Qualifier</h3>
              <p className="text-sm text-gray-600 mb-4">
                Determines what happens when a sending server is not listed in your SPF record.
              </p>

              <div className="space-y-2">
                <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="qualifier"
                    value="-all"
                    checked={qualifier === '-all'}
                    onChange={(e) => setQualifier(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">-all (Hard Fail) - Recommended</div>
                    <div className="text-sm text-gray-600">Reject emails from unauthorized servers</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="qualifier"
                    value="~all"
                    checked={qualifier === '~all'}
                    onChange={(e) => setQualifier(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">~all (Soft Fail)</div>
                    <div className="text-sm text-gray-600">Accept but mark as suspicious</div>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="qualifier"
                    value="?all"
                    checked={qualifier === '?all'}
                    onChange={(e) => setQualifier(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">?all (Neutral)</div>
                    <div className="text-sm text-gray-600">No policy, for testing only</div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Generated Record */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your SPF Record</h3>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">DNS Record:</p>
                <div className="bg-white border border-gray-200 rounded p-3 mb-3">
                  <p className="text-xs text-gray-600 mb-1">Type: <span className="font-mono font-bold">TXT</span></p>
                  <p className="text-xs text-gray-600 mb-1">Name: <span className="font-mono font-bold">@</span> (or your domain)</p>
                  <p className="text-xs text-gray-600">Value:</p>
                  <code className="text-xs text-gray-900 break-all block mt-2">{record}</code>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Record
                    </>
                  )}
                </button>
              </div>

              {/* DNS Lookup Warning */}
              <div className={`rounded-lg p-4 mb-4 ${isOverLimit ? 'bg-red-50 border border-red-200' : lookupCount > 7 ? 'bg-yellow-50 border border-yellow-200' : 'bg-green-50 border border-green-200'}`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isOverLimit ? 'text-red-600' : lookupCount > 7 ? 'text-yellow-600' : 'text-green-600'}`} />
                  <div>
                    <p className={`font-semibold text-sm ${isOverLimit ? 'text-red-900' : lookupCount > 7 ? 'text-yellow-900' : 'text-green-900'}`}>
                      DNS Lookups: {lookupCount} / 10
                    </p>
                    <p className={`text-xs mt-1 ${isOverLimit ? 'text-red-800' : lookupCount > 7 ? 'text-yellow-800' : 'text-green-800'}`}>
                      {isOverLimit
                        ? 'SPF record exceeds 10 DNS lookup limit and will fail validation!'
                        : lookupCount > 7
                        ? 'Approaching the 10 DNS lookup limit. Consider using IP addresses instead of includes.'
                        : 'Your SPF record is within the DNS lookup limit.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 text-sm mb-2">Next Steps:</h4>
                <ol className="text-xs text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Copy the record above</li>
                  <li>Log in to your DNS provider</li>
                  <li>Create a new TXT record at your root domain</li>
                  <li>Paste the SPF record as the value</li>
                  <li>Wait 24-48 hours for DNS propagation</li>
                  <li>Test with our <Link href="/" className="font-semibold underline">DMARC Checker</Link></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            Don't Forget DMARC!
          </h2>
          <p className="text-lg mb-6 text-amber-50">
            SPF alone isn't enough. Complete your email security with DMARC and DKIM.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/tools/generator"
              className="inline-block bg-white text-amber-600 font-bold py-3 px-8 rounded-lg hover:bg-amber-50 transition-colors"
            >
              DMARC Generator
            </Link>
            <Link
              href="/"
              className="inline-block bg-amber-700 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-800 transition-colors"
            >
              Check Your Domain
            </Link>
          </div>
        </div>

        </div>
      </div>
    </>
  );
}
