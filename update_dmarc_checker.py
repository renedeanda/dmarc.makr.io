#!/usr/bin/env python3

import os

def update_file(file_path, content):
    print(f"Updating {file_path}...")
    with open(file_path, "w") as f:
        f.write(content)
    print(f"{file_path} updated successfully.")

def main():
    # Update src/app/page.tsx
    page_tsx = """
'use client'

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Head from 'next/head';

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
    <>
      <Head>
        <title>DMARC Checker - Verify Your Domain's Email Security</title>
        <meta name="description" content="Free DMARC checker tool. Verify your domain's DMARC, SPF, and DKIM records to improve email security and deliverability." />
        <meta name="keywords" content="DMARC, SPF, DKIM, email security, domain checker" />
        <meta property="og:title" content="DMARC Checker - Verify Your Domain's Email Security" />
        <meta property="og:description" content="Free DMARC checker tool. Verify your domain's DMARC, SPF, and DKIM records to improve email security and deliverability." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DMARC Checker - Verify Your Domain's Email Security" />
        <meta name="twitter:description" content="Free DMARC checker tool. Verify your domain's DMARC, SPF, and DKIM records to improve email security and deliverability." />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
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
        <footer className="mt-8 text-center text-gray-500 text-sm">
          Provided for free by the makers of <a href="https://rede.io" className="text-amber-500 hover:underline">Rede.io</a>, your daily tech newsletter
        </footer>
      </main>
    </>
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
"""
    update_file("src/app/page.tsx", page_tsx)

    # Update src/app/api/check-domain/route.ts
    api_check_domain_ts = """
import { NextResponse } from 'next/server'
import dns from 'dns'
import { promisify } from 'util'

const resolveTxt = promisify(dns.resolveTxt)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
  }

  try {
    const [dmarcResult, spfResult, dkimResult] = await Promise.all([
      checkDMARC(domain),
      checkSPF(domain),
      checkDKIM(domain),
    ])

    return NextResponse.json({
      dmarc: dmarcResult.status,
      dmarcRecord: dmarcResult.record,
      spf: spfResult.status,
      spfRecord: spfResult.record,
      dkim: dkimResult.status,
      dkimRecord: dkimResult.record,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error checking domain records' }, { status: 500 })
  }
}

async function checkDMARC(domain: string): Promise<{ status: string; record: string }> {
  try {
    const records = await resolveTxt(`_dmarc.${domain}`)
    const dmarcRecord = records.find(record => record[0].startsWith('v=DMARC1'))
    if (dmarcRecord) {
      return { status: 'valid', record: dmarcRecord[0] }
    } else {
      return { status: 'invalid', record: 'No valid DMARC record found' }
    }
  } catch (error) {
    return { status: 'not found', record: 'No DMARC record found' }
  }
}

async function checkSPF(domain: string): Promise<{ status: string; record: string }> {
  try {
    const records = await resolveTxt(domain)
    const spfRecord = records.find(record => record[0].startsWith('v=spf1'))
    if (spfRecord) {
      return { status: 'valid', record: spfRecord[0] }
    } else {
      return { status: 'invalid', record: 'No valid SPF record found' }
    }
  } catch (error) {
    return { status: 'not found', record: 'No SPF record found' }
  }
}

async function checkDKIM(domain: string): Promise<{ status: string; record: string }> {
  // Note: DKIM is more complex to check without knowing the selector
  // This is a simplified check that looks for a default selector
  try {
    const records = await resolveTxt(`default._domainkey.${domain}`)
    const dkimRecord = records.find(record => record[0].startsWith('v=DKIM1'))
    if (dkimRecord) {
      return { status: 'valid', record: dkimRecord[0] }
    } else {
      return { status: 'invalid', record: 'No valid DKIM record found for default selector' }
    }
  } catch (error) {
    return { status: 'not found', record: 'No DKIM record found for default selector' }
  }
}
"""
    update_file("src/app/api/check-domain/route.ts", api_check_domain_ts)

    # Create favicon.svg
    favicon_svg = """
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
  <path d="M12 8v4"/>
  <path d="M12 16h.01"/>
</svg>
"""
    update_file("public/favicon.svg", favicon_svg)

    print("\nAll files have been updated successfully!")
    print("\nNext steps:")
    print("1. Review the changes in the updated files")
    print("2. Run 'npm run dev' to start the development server and test the changes")
    print("3. If everything looks good, commit the changes to your git repository")

if __name__ == "__main__":
    main()
