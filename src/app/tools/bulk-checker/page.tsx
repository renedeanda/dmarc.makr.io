'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Upload, Download, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

interface DomainResult {
  domain: string;
  dmarc: string;
  spf: string;
  dkim: string;
  score: number;
  status: 'pending' | 'checking' | 'complete' | 'error';
}

export default function BulkCheckerPage() {
  const [domains, setDomains] = useState('');
  const [results, setResults] = useState<DomainResult[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  const parseDomains = (text: string): string[] => {
    return text
      .split(/[\n,;]/)
      .map(d => d.trim())
      .filter(d => d && d.includes('.'));
  };

  const checkDomain = async (domain: string): Promise<DomainResult> => {
    try {
      const response = await fetch(`/api/check-domain?domain=${encodeURIComponent(domain)}`);
      const data = await response.json();

      const dkimStatus = data.dkimResults?.some((d: any) => d.status === 'valid') ? 'valid' :
                         data.dkimResults?.length > 0 ? 'invalid' : 'not found';

      let score = 0;
      if (data.dmarc === 'valid') score += 40;
      else if (data.dmarc === 'invalid') score += 10;

      if (data.spf === 'valid') score += 30;
      else if (data.spf === 'invalid') score += 10;

      if (dkimStatus === 'valid') score += 30;

      return {
        domain,
        dmarc: data.dmarc,
        spf: data.spf,
        dkim: dkimStatus,
        score,
        status: 'complete'
      };
    } catch (error) {
      return {
        domain,
        dmarc: 'error',
        spf: 'error',
        dkim: 'error',
        score: 0,
        status: 'error'
      };
    }
  };

  const handleCheck = async () => {
    const domainList = parseDomains(domains);
    if (domainList.length === 0) {
      alert('Please enter at least one domain');
      return;
    }

    if (domainList.length > 50) {
      alert('Maximum 50 domains at a time');
      return;
    }

    setIsChecking(true);
    const initialResults: DomainResult[] = domainList.map(domain => ({
      domain,
      dmarc: '-',
      spf: '-',
      dkim: '-',
      score: 0,
      status: 'pending'
    }));
    setResults(initialResults);

    // Check domains sequentially with slight delay
    for (let i = 0; i < domainList.length; i++) {
      setResults(prev => prev.map((r, idx) =>
        idx === i ? { ...r, status: 'checking' } : r
      ));

      const result = await checkDomain(domainList[i]);

      setResults(prev => prev.map((r, idx) =>
        idx === i ? result : r
      ));

      // Small delay between checks to avoid overwhelming the server
      if (i < domainList.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setIsChecking(false);
  };

  const downloadCSV = () => {
    const csv = [
      ['Domain', 'DMARC', 'SPF', 'DKIM', 'Security Score'],
      ...results.map(r => [r.domain, r.dmarc, r.spf, r.dkim, r.score.toString()])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dmarc-bulk-check-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    if (status === 'valid') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'invalid') return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    if (status === 'error') return <XCircle className="w-5 h-5 text-gray-400" />;
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  const completedCount = results.filter(r => r.status === 'complete').length;
  const totalCount = results.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Bulk Domain Checker"
        description="Check DMARC, SPF, and DKIM records for multiple domains at once."
        breadcrumbs={[
          { label: 'Tools', href: '/guide' },
          { label: 'Bulk Checker' }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Enter Domains</h2>
          <p className="text-sm text-gray-600 mb-4">
            Enter one domain per line, or separate with commas. Maximum 50 domains at a time.
          </p>

          <textarea
            value={domains}
            onChange={(e) => setDomains(e.target.value)}
            placeholder="example.com&#10;another-domain.com&#10;third-domain.net"
            rows={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-sm"
            disabled={isChecking}
          />

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={handleCheck}
              disabled={isChecking || !domains.trim()}
              className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isChecking ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Checking ({completedCount}/{totalCount})
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Check Domains
                </>
              )}
            </button>

            {results.length > 0 && !isChecking && (
              <button
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download CSV
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-3">
            💡 Tip: You can paste from Excel/CSV or enter domains manually
          </p>
        </div>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Results</h2>
              <p className="text-sm text-gray-600 mt-1">
                {completedCount} of {totalCount} domains checked
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Domain
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      DMARC
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      SPF
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      DKIM
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {results.map((result, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{result.domain}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.status === 'checking' ? (
                          <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                        ) : result.status === 'pending' ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            {getStatusIcon(result.dmarc)}
                            <span className="text-sm text-gray-700">{result.dmarc}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.status === 'checking' || result.status === 'pending' ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            {getStatusIcon(result.spf)}
                            <span className="text-sm text-gray-700">{result.spf}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.status === 'checking' || result.status === 'pending' ? (
                          <span className="text-gray-400">-</span>
                        ) : (
                          <div className="flex items-center gap-2">
                            {getStatusIcon(result.dkim)}
                            <span className="text-sm text-gray-700">{result.dkim}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {result.status === 'complete' ? (
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            result.score >= 80 ? 'bg-green-100 text-green-800' :
                            result.score >= 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {result.score}/100
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          result.status === 'complete' ? 'bg-green-100 text-green-800' :
                          result.status === 'checking' ? 'bg-blue-100 text-blue-800' :
                          result.status === 'error' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {result.status === 'complete' ? 'Done' :
                           result.status === 'checking' ? 'Checking...' :
                           result.status === 'error' ? 'Error' :
                           'Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!isChecking && completedCount === totalCount && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  ✅ All checks complete! Download the CSV for a full report, or{' '}
                  <Link href="/" className="text-amber-600 hover:text-amber-700 font-medium">
                    check individual domains
                  </Link>
                  {' '}for detailed recommendations.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">Fast & Efficient</h3>
            <p className="text-sm text-gray-600">
              Check up to 50 domains at once with real-time results and progress tracking.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">Export Results</h3>
            <p className="text-sm text-gray-600">
              Download results as CSV for easy analysis, reporting, and integration with your workflow.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">100% Private</h3>
            <p className="text-sm text-gray-600">
              All checks run in real-time with no data storage. Your domains remain completely private.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Need detailed recommendations for a specific domain?
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Check Single Domain
          </Link>
        </div>
      </div>
    </div>
  );
}
