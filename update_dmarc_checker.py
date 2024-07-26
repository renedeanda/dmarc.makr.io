#!/usr/bin/env python3

import os

def update_file(file_path, content):
    print(f"Updating {file_path}...")
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w") as f:
        f.write(content)
    print(f"{file_path} updated successfully.")

def main():
    # Update src/app/page.tsx
    page_tsx = """
'use client'

import { useState } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import DmarcTagExplanation from './DmarcTagExplanation';

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
          Check out Rede.io for your daily tech newsletter! 🚀
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
                      <DkimStatus dkimResults={results.dkimResults} />
                    </div>
                    {results.dmarcRecord && (
                      <DmarcRecordBreakdown record={results.dmarcRecord} />
                    )}
                    <SubdomainInheritance />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DmarcTagExplanation />
      <footer className="text-center text-gray-500 text-sm py-4">
        Provided for free by the makers of <a href="https://rede.io" className="text-amber-500 hover:underline">Rede.io</a>, your daily tech newsletter
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

const DmarcRecordBreakdown = ({ record }: { record: string }) => {
  const tags = record.split(';').map(tag => tag.trim());
  return (
    <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow">
      <h3 className="text-lg font-semibold mb-2">DMARC Record Breakdown</h3>
      <ul className="list-disc list-inside">
        {tags.map((tag, index) => {
          const [key, value] = tag.split('=');
          return (
            <li key={index}>
              <span className="font-semibold">{key}:</span> {value}
            </li>
          );
        })}
      </ul>
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
"""
    update_file("src/app/page.tsx", page_tsx)

    # Create src/app/DmarcTagExplanation.tsx
    dmarc_tag_explanation_tsx = """
import React from 'react';

const dmarcTags = [
  { tag: 'v', description: 'Version tag. Must be "DMARC1". Record is ignored if incorrect or missing.' },
  { tag: 'p', description: 'Policy for the domain. Values: "none" (no action), "quarantine" (mark as suspicious), "reject" (block).' },
  { tag: 'rua', description: 'URI for aggregate report delivery. Optional, but necessary for receiving reports.' },
  { tag: 'ruf', description: 'URI for forensic report delivery. Optional, but necessary for receiving failure reports.' },
  { tag: 'sp', description: 'Policy for subdomains. Inherits from "p" if not specified. Values same as "p".' },
  { tag: 'adkim', description: 'DKIM alignment. "r" (relaxed, default) allows partial match, "s" (strict) requires exact match.' },
  { tag: 'aspf', description: 'SPF alignment. "r" (relaxed, default) allows partial match, "s" (strict) requires exact match.' },
  { tag: 'fo', description: 'Forensic reporting options. Values: "0" (default), "1", "d", "s". Affects when reports are generated.' },
  { tag: 'rf', description: 'Reporting format for failure reports. Values: "afrf", "iodef".' },
  { tag: 'pct', description: 'Percentage of messages subject to filtering. Applies to "quarantine" or "reject" policies.' },
  { tag: 'ri', description: 'Reporting interval in seconds. Default is 86400 (daily). Actual delivery may vary.' },
];

const DmarcTagExplanation: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">DMARC Tag Explanations</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Tag</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {dmarcTags.map((tag, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="border px-4 py-2 font-semibold">{tag.tag}</td>
                <td className="border px-4 py-2">{tag.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DmarcTagExplanation;
"""
    update_file("src/app/DmarcTagExplanation.tsx", dmarc_tag_explanation_tsx)

    # Update src/app/api/check-domain/route.ts
    check_domain_route_ts = """
import { NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

const resolveTxt = promisify(dns.resolveTxt);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
  }

  try {
    const [dmarcRecord, spfRecord] = await Promise.all([
      getDmarcRecord(domain),
      getSpfRecord(domain),
    ]);

    const dkimResults = await checkDkimSelectors(domain);

    return NextResponse.json({
      dmarc: dmarcRecord ? 'valid' : 'not found',
      dmarcRecord,
      spf: spfRecord ? 'valid' : 'not found',
      spfRecord,
      dkimResults,
    });
  } catch (error) {
    console.error('Error checking domain:', error);
    return NextResponse.json({ error: 'Failed to check domain' }, { status: 500 });
  }
}

async function getDmarcRecord(domain: string): Promise<string | null> {
  try {
    const records = await resolveTxt(`_dmarc.${domain}`);
    return records[0].join('');
  } catch (error) {
    return null;
  }
}

async function getSpfRecord(domain: string): Promise<string | null> {
  try {
    const records = await resolveTxt(domain);
    const spfRecord = records.find(record => record[0].startsWith('v=spf1'));
    return spfRecord ? spfRecord.join('') : null;
  } catch (error) {
    return null;
  }
}

async function checkDkimSelectors(domain: string): Promise<{ selector: string; status: string }[]> {
  const commonSelectors = ['default', 'google', 'selector1', 'selector2', 'k1', 'dkim'];
  const results = await Promise.all(
    commonSelectors.map(async (selector) => {
      try {
        const records = await resolveTxt(`${selector}._domainkey.${domain}`);
        return { selector, status: 'valid' };
      } catch (error) {
        return { selector, status: 'not found' };
      }
    })
  );
  return results.filter(result => result.status === 'valid');
}
"""
    update_file("src/app/api/check-domain/route.ts", check_domain_route_ts)

    print("\nAll files have been updated successfully!")
    print("\nNext steps:")
    print("1. Review the changes in the updated files")
    print("2. Run 'npm run dev' to start the development server and test the changes")
    print("3. If everything looks good, commit the changes to your git repository")

if __name__ == "__main__":
    main()