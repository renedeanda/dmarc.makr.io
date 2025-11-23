'use client'

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Search, CheckCircle, XCircle, AlertCircle, Info, Loader2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

interface ParsedTag {
  tag: string;
  value: string;
  description: string;
  status: 'good' | 'warning' | 'info';
}

export default function DMARCAnalyzerPage() {
  const [record, setRecord] = useState('');
  const [parsed, setParsed] = useState<ParsedTag[] | null>(null);
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const analyzeRecord = () => {
    setError('');
    setParsed(null);
    setIsAnalyzing(true);

    if (!record.trim()) {
      setError('Please enter a DMARC record');
      setIsAnalyzing(false);
      return;
    }

    // Small delay for visual feedback
    setTimeout(() => {
      try {
        const tags = record.split(';').map(t => t.trim()).filter(t => t);
        const results: ParsedTag[] = [];

      tags.forEach(tag => {
        const [key, value] = tag.split('=').map(s => s.trim());

        switch (key) {
          case 'v':
            results.push({
              tag: 'v (Version)',
              value,
              description: value === 'DMARC1' ? 'Correct version identifier' : 'Invalid version - should be DMARC1',
              status: value === 'DMARC1' ? 'good' : 'warning'
            });
            break;

          case 'p':
            const policyDesc = {
              'none': 'Monitoring only - no action taken on failed emails. Good for initial deployment.',
              'quarantine': 'Failed emails sent to spam. Recommended after monitoring period.',
              'reject': 'Failed emails blocked entirely. Strongest protection, use with caution.'
            }[value] || 'Invalid policy value';
            results.push({
              tag: 'p (Policy)',
              value,
              description: policyDesc,
              status: ['none', 'quarantine', 'reject'].includes(value) ? 'good' : 'warning'
            });
            break;

          case 'sp':
            const spDesc = {
              'none': 'Subdomains: Monitoring only',
              'quarantine': 'Subdomains: Failed emails sent to spam',
              'reject': 'Subdomains: Failed emails blocked'
            }[value] || 'Invalid subdomain policy';
            results.push({
              tag: 'sp (Subdomain Policy)',
              value,
              description: spDesc,
              status: ['none', 'quarantine', 'reject'].includes(value) ? 'good' : 'warning'
            });
            break;

          case 'rua':
            results.push({
              tag: 'rua (Aggregate Reports)',
              value,
              description: `Aggregate reports sent to: ${value}. You'll receive daily summaries of authentication results.`,
              status: value.includes('mailto:') ? 'good' : 'warning'
            });
            break;

          case 'ruf':
            results.push({
              tag: 'ruf (Forensic Reports)',
              value,
              description: `Forensic reports sent to: ${value}. Individual failure reports (can be high volume).`,
              status: value.includes('mailto:') ? 'good' : 'warning'
            });
            break;

          case 'pct':
            const pct = parseInt(value);
            results.push({
              tag: 'pct (Percentage)',
              value,
              description: `Policy applied to ${value}% of emails. ${pct < 100 ? 'Consider increasing to 100 after testing.' : 'Policy applied to all emails.'}`,
              status: pct === 100 ? 'good' : 'info'
            });
            break;

          case 'adkim':
            results.push({
              tag: 'adkim (DKIM Alignment)',
              value,
              description: value === 's' ? 'Strict alignment - DKIM domain must exactly match From domain' : 'Relaxed alignment - DKIM can be on subdomain (default)',
              status: 'info'
            });
            break;

          case 'aspf':
            results.push({
              tag: 'aspf (SPF Alignment)',
              value,
              description: value === 's' ? 'Strict alignment - SPF domain must exactly match From domain' : 'Relaxed alignment - SPF can be on subdomain (default)',
              status: 'info'
            });
            break;

          case 'fo':
            const foDesc = {
              '0': 'Generate report if both SPF and DKIM fail',
              '1': 'Generate report if either SPF or DKIM fails',
              'd': 'Generate report if DKIM fails',
              's': 'Generate report if SPF fails'
            }[value] || 'Forensic options set';
            results.push({
              tag: 'fo (Forensic Options)',
              value,
              description: foDesc,
              status: 'info'
            });
            break;

          case 'rf':
            results.push({
              tag: 'rf (Report Format)',
              value,
              description: `Report format: ${value} (usually 'afrf' for Auth Failure Reporting Format)`,
              status: 'info'
            });
            break;

          case 'ri':
            results.push({
              tag: 'ri (Report Interval)',
              value,
              description: `Reports sent every ${value} seconds (${Math.round(parseInt(value) / 3600)} hours)`,
              status: 'info'
            });
            break;

          default:
            results.push({
              tag: key,
              value,
              description: 'Unknown or custom tag',
              status: 'info'
            });
        }
      });

        if (results.length === 0) {
          setError('No valid DMARC tags found');
          setIsAnalyzing(false);
          return;
        }

        // Check for required tags
        const hasVersion = results.some(r => r.tag.startsWith('v'));
        const hasPolicy = results.some(r => r.tag.startsWith('p'));

        if (!hasVersion) {
          results.unshift({
            tag: 'Missing: v',
            value: '',
            description: 'Version tag is required! Should be v=DMARC1',
            status: 'warning'
          });
        }

        if (!hasPolicy) {
          results.push({
            tag: 'Missing: p',
            value: '',
            description: 'Policy tag is required! Should be p=none, p=quarantine, or p=reject',
            status: 'warning'
          });
        }

        setParsed(results);
        setIsAnalyzing(false);

        // Scroll to results after a brief moment
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } catch (err) {
        setError('Failed to parse DMARC record. Please check the format.');
        setIsAnalyzing(false);
      }
    }, 300);
  };

  const getStatusIcon = (status: string) => {
    if (status === 'good') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (status === 'warning') return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <Info className="w-5 h-5 text-blue-500" />;
  };

  const exampleRecords = [
    {
      name: 'Basic Monitoring',
      record: 'v=DMARC1; p=none; rua=mailto:dmarc@example.com'
    },
    {
      name: 'Quarantine Policy',
      record: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com; pct=100; adkim=r; aspf=r'
    },
    {
      name: 'Strict Rejection',
      record: 'v=DMARC1; p=reject; sp=reject; rua=mailto:dmarc@example.com; ruf=mailto:forensic@example.com; pct=100'
    }
  ];

  return (
    <>
      <PageHeader
        title="DMARC Policy Analyzer"
        description="Paste any DMARC record to get a detailed breakdown of what each tag means and how it affects your email security."
        breadcrumbs={[
          { label: 'Tools', href: '/tools' },
          { label: 'Policy Analyzer' }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Enter DMARC Record</h2>
          <p className="text-sm text-gray-600 mb-4">
            Paste your DMARC TXT record value (everything after the record name):
          </p>

          <textarea
            value={record}
            onChange={(e) => setRecord(e.target.value)}
            placeholder='v=DMARC1; p=none; rua=mailto:dmarc@example.com'
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-sm mb-4"
          />

          <button
            onClick={analyzeRecord}
            disabled={isAnalyzing}
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Analyze Record
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Example Records */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Try an Example:</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {exampleRecords.map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setRecord(example.record);
                  setError('');
                  setParsed(null);
                  setIsAnalyzing(true);

                  // Auto-analyze the example
                  setTimeout(() => {
                    const tags = example.record.split(';').map(t => t.trim()).filter(t => t);
                    const results: ParsedTag[] = [];

                    tags.forEach(tag => {
                      const [key, value] = tag.split('=').map(s => s.trim());

                      switch (key) {
                        case 'v':
                          results.push({
                            tag: 'v (Version)',
                            value,
                            description: value === 'DMARC1' ? 'Correct version identifier' : 'Invalid version - should be DMARC1',
                            status: value === 'DMARC1' ? 'good' : 'warning'
                          });
                          break;
                        case 'p':
                          const policyDesc = {
                            'none': 'Monitoring only - no action taken on failed emails. Good for initial deployment.',
                            'quarantine': 'Failed emails sent to spam. Recommended after monitoring period.',
                            'reject': 'Failed emails blocked entirely. Strongest protection, use with caution.'
                          }[value] || 'Invalid policy value';
                          results.push({
                            tag: 'p (Policy)',
                            value,
                            description: policyDesc,
                            status: ['none', 'quarantine', 'reject'].includes(value) ? 'good' : 'warning'
                          });
                          break;
                        case 'sp':
                          const spDesc = {
                            'none': 'Subdomains: Monitoring only',
                            'quarantine': 'Subdomains: Failed emails sent to spam',
                            'reject': 'Subdomains: Failed emails blocked'
                          }[value] || 'Invalid subdomain policy';
                          results.push({
                            tag: 'sp (Subdomain Policy)',
                            value,
                            description: spDesc,
                            status: ['none', 'quarantine', 'reject'].includes(value) ? 'good' : 'warning'
                          });
                          break;
                        case 'rua':
                          results.push({
                            tag: 'rua (Aggregate Reports)',
                            value,
                            description: `Aggregate reports sent to: ${value}. You'll receive daily summaries of authentication results.`,
                            status: value.includes('mailto:') ? 'good' : 'warning'
                          });
                          break;
                        case 'ruf':
                          results.push({
                            tag: 'ruf (Forensic Reports)',
                            value,
                            description: `Forensic reports sent to: ${value}. Individual failure reports (can be high volume).`,
                            status: value.includes('mailto:') ? 'good' : 'warning'
                          });
                          break;
                        case 'pct':
                          const pct = parseInt(value);
                          results.push({
                            tag: 'pct (Percentage)',
                            value,
                            description: `Policy applied to ${value}% of emails. ${pct < 100 ? 'Consider increasing to 100 after testing.' : 'Policy applied to all emails.'}`,
                            status: pct === 100 ? 'good' : 'info'
                          });
                          break;
                        case 'adkim':
                          results.push({
                            tag: 'adkim (DKIM Alignment)',
                            value,
                            description: value === 's' ? 'Strict alignment - DKIM domain must exactly match From domain' : 'Relaxed alignment - DKIM can be on subdomain (default)',
                            status: 'info'
                          });
                          break;
                        case 'aspf':
                          results.push({
                            tag: 'aspf (SPF Alignment)',
                            value,
                            description: value === 's' ? 'Strict alignment - SPF domain must exactly match From domain' : 'Relaxed alignment - SPF can be on subdomain (default)',
                            status: 'info'
                          });
                          break;
                        case 'fo':
                          const foDesc = {
                            '0': 'Generate report if both SPF and DKIM fail',
                            '1': 'Generate report if either SPF or DKIM fails',
                            'd': 'Generate report if DKIM fails',
                            's': 'Generate report if SPF fails'
                          }[value] || 'Forensic options set';
                          results.push({
                            tag: 'fo (Forensic Options)',
                            value,
                            description: foDesc,
                            status: 'info'
                          });
                          break;
                        case 'rf':
                          results.push({
                            tag: 'rf (Report Format)',
                            value,
                            description: `Report format: ${value} (usually 'afrf' for Auth Failure Reporting Format)`,
                            status: 'info'
                          });
                          break;
                        case 'ri':
                          results.push({
                            tag: 'ri (Report Interval)',
                            value,
                            description: `Reports sent every ${value} seconds (${Math.round(parseInt(value) / 3600)} hours)`,
                            status: 'info'
                          });
                          break;
                        default:
                          results.push({
                            tag: key,
                            value,
                            description: 'Unknown or custom tag',
                            status: 'info'
                          });
                      }
                    });

                    setParsed(results);
                    setIsAnalyzing(false);

                    setTimeout(() => {
                      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }, 300);
                }}
                className="text-left bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 hover:border-amber-400 rounded-lg p-4 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{example.name}</h4>
                  <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Try It
                  </span>
                </div>
                <code className="text-xs text-gray-600 break-all block">{example.record}</code>
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Click any example to load and analyze it automatically
          </p>
        </div>

        {/* Results */}
        {parsed && parsed.length > 0 && (
          <div ref={resultsRef} className="bg-white rounded-lg shadow-md overflow-hidden scroll-mt-4">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-amber-50 to-amber-100">
              <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
              <p className="text-gray-700 mt-1">
                Found {parsed.length} tag{parsed.length !== 1 ? 's' : ''} in your DMARC record
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {parsed.map((tag, idx) => (
                <div key={idx} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getStatusIcon(tag.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-bold text-gray-900">{tag.tag}</h3>
                        {tag.value && (
                          <code className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-800 font-mono break-all">
                            {tag.value}
                          </code>
                        )}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{tag.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Recommendations</h3>
              <ul className="space-y-2 text-gray-700">
                {parsed.some(p => p.tag.startsWith('p') && p.value === 'none') && (
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Your policy is set to "none" (monitoring). After reviewing reports for 2-4 weeks, consider strengthening to "quarantine" or "reject"</span>
                  </li>
                )}
                {!parsed.some(p => p.tag.startsWith('rua')) && (
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Add rua= tag to receive aggregate reports and monitor authentication</span>
                  </li>
                )}
                {!parsed.some(p => p.tag.startsWith('sp')) && (
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Consider adding sp= tag to explicitly set a policy for subdomains</span>
                  </li>
                )}
                {parsed.some(p => p.tag.startsWith('pct') && parseInt(p.value) < 100) && (
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>Your pct value is below 100%. Consider increasing to 100 after testing to apply policy to all emails</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">Instant Analysis</h3>
            <p className="text-sm text-gray-600">
              Get immediate feedback on your DMARC record syntax and configuration.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">Tag Explanations</h3>
            <p className="text-sm text-gray-600">
              Understand what each DMARC tag means and how it affects your email security.
            </p>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-2">Best Practices</h3>
            <p className="text-sm text-gray-600">
              Receive recommendations based on industry best practices and your current configuration.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Want to check your live DMARC record?
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Check Your Domain
          </Link>
        </div>
        </div>
      </div>
    </>
  );
}
