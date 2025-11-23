
'use client'

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Lock, ChevronDown } from 'lucide-react';
import DmarcTagExplanation from './DmarcTagExplanation';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import useGoogleAnalytics from '../hooks/useGoogleAnalytics';
import Script from 'next/script';

export default function Home() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkedDomain, setCheckedDomain] = useState('');

  // Initialize Google Analytics
  useGoogleAnalytics();

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
    } catch (err) {
      setError('An error occurred while checking the domain. Please try again.');
    } finally {
      setLoading(false);
    }
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
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-4">
                    <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-medium text-amber-800">Trusted by 10,000+ IT professionals</span>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Check Your DMARC Security in 30 Seconds
                  </h1>

                  <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-2">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Free
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      No Signup
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Instant Results
                    </span>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <Lock className="w-4 h-4" />
                    <span>Your domain data never leaves your browser</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm text-blue-800">
                  <strong>How it works:</strong> We perform DNS lookups directly from your browser to check your DMARC, SPF, and DKIM records. Nothing is stored or sent to our servers.
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
                  {loading && <p className="text-center">Checking domain...</p>}
                  {error && <p className="text-red-500 bg-red-100 border border-red-400 rounded p-3">{error}</p>}
                  {results && (
                    <div className="py-8">
                      <h2 className="text-xl font-semibold mb-4">Results for {checkedDomain}</h2>
                      <div className="space-y-4">
                        <RecordStatus name="DMARC" status={results.dmarc} record={results.dmarcRecord} />
                        <RecordStatus name="SPF" status={results.spf} record={results.spfRecord} />
                        <DkimStatus dkimResults={results.dkimResults} />
                      </div>
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

const RecordStatus = ({ name, status, record }: { name: string; status: string; record: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
            <h4 className="font-semibold text-sm mb-1">Current Record:</h4>
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
