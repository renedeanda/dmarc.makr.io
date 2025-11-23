
'use client'

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Lock, ChevronDown, Copy } from 'lucide-react';
import DmarcTagExplanation from './DmarcTagExplanation';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CheckHistory from './components/CheckHistory';
import ShareResults from './components/ShareResults';
import useGoogleAnalytics from '../hooks/useGoogleAnalytics';
import { useCheckHistory } from '../hooks/useCheckHistory';
import Script from 'next/script';

export default function Home() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkedDomain, setCheckedDomain] = useState('');

  // Initialize Google Analytics and History
  useGoogleAnalytics();
  const { addToHistory } = useCheckHistory();

  const calculateSecurityScore = (results: any) => {
    let score = 0;
    if (results.dmarc === 'valid') score += 40;
    else if (results.dmarc === 'invalid') score += 10;

    if (results.spf === 'valid') score += 30;
    else if (results.spf === 'invalid') score += 10;

    if (results.dkimResults?.some((d: any) => d.status === 'valid')) score += 30;

    return score;
  };

  const checkDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);
    setCheckedDomain('');

    // Trim protocol prefixes from the domain
    const trimmedDomain = domain.replace(/^(https?:\/\/)?(www\.)?/i, '').split('/')[0];

    try {
      const response = await fetch(`/api/check-domain?domain=${encodeURIComponent(trimmedDomain)}`);
      if (!response.ok) throw new Error('Failed to check domain');
      const data = await response.json();
      setResults(data);
      setCheckedDomain(trimmedDomain);

      // Calculate score and save to history
      const score = calculateSecurityScore(data);
      const dkimStatus = data.dkimResults?.some((d: any) => d.status === 'valid') ? 'valid' :
                        data.dkimResults?.length > 0 ? 'invalid' : 'not found';

      addToHistory({
        domain: trimmedDomain,
        dmarcStatus: data.dmarc,
        spfStatus: data.spf,
        dkimStatus,
        score
      });
    } catch (err) {
      setError('An error occurred while checking the domain. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (selectedDomain: string) => {
    setDomain(selectedDomain);
    // Trigger the check automatically
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      <main className="min-h-screen bg-gray-100 flex flex-col">
        <div className="flex-grow py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    DMARC Checker
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Check your email security in seconds. Free, instant, and completely private.
                  </p>

                  <div className="inline-flex flex-wrap items-center justify-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Free Forever
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      <Lock className="w-4 h-4" />
                      100% Private
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Instant Results
                    </span>
                  </div>

                  <div className="text-sm text-gray-500">
                    All checks run in your browser. No data is sent to our servers.
                  </div>
                </div>

                {/* History Dropdown */}
                <div className="flex justify-end mb-4">
                  <CheckHistory onSelectDomain={handleHistorySelect} />
                </div>

                <div className="divide-y divide-gray-200">
                  <form onSubmit={checkDomain} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-amber-500 transition-colors"
                        placeholder="Enter domain"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                      />
                      <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter domain</label>
                    </div>
                    <div className="relative">
                      <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50">
                        {loading ? 'Checking...' : 'Check Domain'}
                      </button>
                    </div>
                  </form>
                  {loading && (
                    <div className="py-8 text-center">
                      <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-6 py-4">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <div>
                          <p className="text-blue-900 font-medium">Checking {domain}...</p>
                          <p className="text-blue-700 text-sm">Performing DNS lookups</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="py-4">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-800 font-medium">Check Failed</p>
                          <p className="text-red-700 text-sm">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {results && (
                    <div className="py-8">
                      <h2 className="text-xl font-semibold mb-6">Results for {checkedDomain}</h2>

                      <SecurityScore score={calculateSecurityScore(results)} />

                      <div className="space-y-4 mt-6">
                        <RecordStatus name="DMARC" status={results.dmarc} record={results.dmarcRecord} />
                        <RecordStatus name="SPF" status={results.spf} record={results.spfRecord} />
                        <DkimStatus dkimResults={results.dkimResults} />
                      </div>

                      <ShareResults
                        domain={checkedDomain}
                        results={results}
                        score={calculateSecurityScore(results)}
                      />

                      <SubdomainInheritance />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DmarcTagExplanation />
        <FaqSection />
        <Footer />
      </main>
    </>
  );
}

const SecurityScore = ({ score }: { score: number }) => {
  const getScoreColor = () => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 50) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const getScoreTextColor = () => {
    if (score >= 80) return 'text-green-700';
    if (score >= 50) return 'text-yellow-700';
    return 'text-red-700';
  };

  const getScoreLabel = () => {
    if (score >= 80) return { text: 'Good Security', icon: CheckCircle, color: 'text-green-600' };
    if (score >= 50) return { text: 'Needs Improvement', icon: AlertCircle, color: 'text-yellow-600' };
    return { text: 'Critical Issues', icon: XCircle, color: 'text-red-600' };
  };

  const label = getScoreLabel();
  const Icon = label.icon;

  return (
    <div className={`border rounded-lg p-6 ${getScoreColor()}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Icon className={`w-5 h-5 ${label.color}`} />
            <span className={`text-lg font-semibold ${getScoreTextColor()}`}>{label.text}</span>
          </div>
          <p className={`text-sm ${getScoreTextColor()}`}>
            {score >= 80 && 'Your email authentication is properly configured.'}
            {score >= 50 && score < 80 && 'Some records are configured, but improvements needed.'}
            {score < 50 && 'Your domain has critical email security issues.'}
          </p>
        </div>
        <div className="text-center">
          <div className={`text-5xl font-bold ${getScoreTextColor()}`}>{score}</div>
          <div className={`text-sm ${getScoreTextColor()} opacity-75`}>/ 100</div>
        </div>
      </div>
    </div>
  );
};

const RecordStatus = ({ name, status, record }: { name: string; status: string; record: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyRecord = () => {
    if (record) {
      navigator.clipboard.writeText(record);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'valid':
        return <CheckCircle className="text-green-500" />;
      case 'invalid':
        return <XCircle className="text-red-500" />;
      default:
        return <AlertCircle className="text-yellow-500" />;
    }
  };

  const getSeverityBadge = () => {
    if (status === 'valid') {
      return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">Good</span>;
    }
    if (status === 'invalid') {
      return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">Critical</span>;
    }
    return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded">Warning</span>;
  };

  const getRemediation = () => {
    switch (status) {
      case 'not found':
        return {
          title: 'Missing Record',
          description: `Your domain does not have a ${name} record. This makes your domain vulnerable to email spoofing.`,
          action: `Set up a ${name} record to improve your email security.`
        };
      case 'invalid':
        return {
          title: 'Invalid Configuration',
          description: `Your ${name} record contains errors.`,
          action: `Review and correct your ${name} configuration.`
        };
      default:
        return null;
    }
  };

  const remediation = getRemediation();

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {getIcon()}
          <span className="font-semibold">{name}</span>
          {getSeverityBadge()}
        </div>
        {record && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            {isExpanded ? 'Hide details' : 'Show details'}
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {isExpanded && record && (
        <div className="mt-3 space-y-2">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-sm">Current Record:</h4>
              <button
                onClick={copyRecord}
                className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3 h-3" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="bg-white p-3 rounded border border-gray-200 text-xs overflow-x-auto">{record}</pre>
          </div>
        </div>
      )}

      {remediation && (
        <div className="mt-3 bg-white rounded border border-red-200 p-3">
          <h4 className="font-semibold text-sm text-red-800 mb-1">{remediation.title}</h4>
          <p className="text-sm text-gray-700 mb-2">{remediation.description}</p>
          <p className="text-sm text-gray-700"><strong>Action needed:</strong> {remediation.action}</p>
        </div>
      )}
    </div>
  );
};

const DkimStatus = ({ dkimResults }: { dkimResults: { selector: string; status: string }[] }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow">
      <div className="flex items-center space-x-2 mb-2">
        <span className="font-semibold">DKIM:</span>
      </div>
      {dkimResults.length > 0 ? (
        <div>
          <h4 className="font-semibold">Found DKIM Selectors:</h4>
          <ul className="list-disc list-inside">
            {dkimResults.map((result, index) => (
              <li key={index}>
                Selector: {result.selector} - Status: {result.status}
                {result.status === 'valid' && <CheckCircle className="inline-block ml-2 text-green-500" />}
                {result.status === 'invalid' && <XCircle className="inline-block ml-2 text-red-500" />}
                {result.status === 'not found' && <AlertCircle className="inline-block ml-2 text-yellow-500" />}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No DKIM selectors found. Consider setting up DKIM for improved email authentication.</p>
      )}
    </div>
  );
};

const SubdomainInheritance = () => {
  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">Subdomain Inheritance</h3>
      <p>
        Subdomains can inherit their DMARC configuration from the parent domain, depending on the values in the parent domain's DMARC record.
        The 'sp' tag in the parent domain's DMARC record specifies the policy for subdomains. If not present, subdomains inherit the policy specified by the 'p' tag.
      </p>
    </div>
  );
};
