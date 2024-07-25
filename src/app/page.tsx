
'use client'

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function Home() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const response = await fetch(`/api/check-domain?domain=${encodeURIComponent(domain)}`);
      if (!response.ok) throw new Error('Failed to check domain');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError('An error occurred while checking the domain. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
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
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-amber-500"
                    placeholder="Enter domain"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    required
                  />
                  <label className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Enter domain</label>
                </div>
                <div className="relative">
                  <button className="bg-amber-500 text-white rounded-md px-4 py-2">Check Domain</button>
                </div>
              </form>
              {loading && <p className="text-center">Checking domain...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {results && (
                <div className="py-8">
                  <h2 className="text-xl font-semibold mb-4">Results for {domain}</h2>
                  <div className="space-y-4">
                    <RecordStatus name="DMARC" status={results.dmarc} />
                    <RecordStatus name="SPF" status={results.spf} />
                    <RecordStatus name="DKIM" status={results.dkim} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        Provided for free by the makers of <a href="https://rede.io" className="text-amber-500 hover:underline">Rede.io</a>, your daily tech newsletter
      </footer>
    </main>
  );
}

const RecordStatus = ({ name, status }: { name: string; status: string }) => {
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

  return (
    <div className="flex items-center space-x-2">
      {getIcon()}
      <span>{name}: {status}</span>
    </div>
  );
};
