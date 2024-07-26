'use client'

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function Home() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkedDomain, setCheckedDomain] = useState('');

  const checkDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);
    setCheckedDomain('');

    try {
      const response = await fetch(`/api/check-domain?domain=${encodeURIComponent(domain)}`);
      if (!response.ok) throw new Error('Failed to check domain');
      const data = await response.json();
      setResults(data);
      setCheckedDomain(domain);
    } catch (err) {
      setError('An error occurred while checking the domain. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col">
      {/* Rede.io Promotion Banner */}
      <div className="bg-amber-500 text-white py-2 text-center">
        <a href="https://rede.io/?utm_source=dmarc" className="font-bold hover:underline">
          Check out Rede.io for your daily tech newsletter! 📚
        </a>
      </div>

      <div className="flex-grow py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold font-iowan-old-style text-amber-500">DMARC Domain Checker</h1>
                <p className="mt-2 text-gray-600">Check your domain's email security setup</p>
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
                      <RecordStatus name="DKIM" status={results.dkim} record={results.dkimRecord} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center text-gray-500 text-sm py-4">
        © 2024 Crafted with 🧡 + 🤖 by the <a href="https://rede.io/?utm_source=dmarc" className="text-amber-500 hover:underline">Rede team</a>.
      </footer>
    </main>
  );
}

const RecordStatus = ({ name, status, record }: { name: string; status: string; record: string }) => {
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

  const getRemediation = () => {
    switch (status) {
      case 'not found':
        return `Your domain does not have a ${name} record. We recommend setting up a ${name} record to improve your email security.`;
      case 'invalid':
        return `Your ${name} record is invalid. Please review and correct your ${name} configuration.`;
      default:
        return '';
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow">
      <div className="flex items-center space-x-2 mb-2">
        {getIcon()}
        <span className="font-semibold">{name}: {status}</span>
      </div>
      {record && (
        <div className="mt-2">
          <h4 className="font-semibold">Current Record:</h4>
          <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto">{record}</pre>
        </div>
      )}
      {(status === 'not found' || status === 'invalid') && (
        <div className="mt-2 text-red-600">
          <h4 className="font-semibold">Remediation:</h4>
          <p>{getRemediation()}</p>
        </div>
      )}
    </div>
  );
};