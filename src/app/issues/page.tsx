'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Search, AlertCircle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const issues = [
  {
    id: 'dmarc-not-found',
    category: 'DMARC',
    severity: 'critical',
    title: 'DMARC Record Not Found',
    description: 'Your domain does not have a DMARC record, leaving it vulnerable to email spoofing.',
    symptoms: [
      'DNS lookup for _dmarc.yourdomain.com returns no results',
      'Email security scanners flag missing DMARC',
      'Potential for domain impersonation attacks'
    ],
    causes: [
      'DMARC record was never created',
      'Record was accidentally deleted',
      'Wrong DNS hostname (missing _dmarc prefix)',
      'DNS propagation still in progress'
    ],
    solutions: [
      {
        step: 'Create a DMARC record',
        action: 'Start with monitoring: v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com'
      },
      {
        step: 'Add TXT record to DNS',
        action: 'Add at hostname: _dmarc.yourdomain.com'
      },
      {
        step: 'Wait for DNS propagation',
        action: 'Allow 15-30 minutes for changes to take effect'
      },
      {
        step: 'Verify the record',
        action: 'Use our checker tool to confirm setup'
      }
    ],
    guideLink: '/guide/setup-dmarc'
  },
  {
    id: 'multiple-dmarc-records',
    category: 'DMARC',
    severity: 'critical',
    title: 'Multiple DMARC Records Detected',
    description: 'More than one DMARC record exists for your domain, which makes DMARC invalid.',
    symptoms: [
      'Email authentication failures',
      'Unpredictable DMARC behavior',
      'Some receivers may ignore all DMARC records'
    ],
    causes: [
      'Accidentally created duplicate records',
      'Multiple teams managing DNS without coordination',
      'Old DMARC record not removed when updating'
    ],
    solutions: [
      {
        step: 'Identify all DMARC records',
        action: 'Check your DNS for all TXT records at _dmarc.yourdomain.com'
      },
      {
        step: 'Choose the correct record',
        action: 'Determine which DMARC policy you want to enforce'
      },
      {
        step: 'Delete duplicate records',
        action: 'Remove all but one DMARC record from DNS'
      },
      {
        step: 'Verify cleanup',
        action: 'Confirm only one DMARC record remains'
      }
    ],
    guideLink: '/guide/setup-dmarc'
  },
  {
    id: 'spf-too-many-lookups',
    category: 'SPF',
    severity: 'critical',
    title: 'SPF Record Exceeds DNS Lookup Limit',
    description: 'Your SPF record requires more than 10 DNS lookups, causing it to fail validation.',
    symptoms: [
      'SPF validation returns permerror',
      'Email deliverability issues',
      'Some mail servers reject your emails'
    ],
    causes: [
      'Too many include: mechanisms',
      'Nested includes that cause lookup multiplication',
      'Multiple redirect mechanisms'
    ],
    solutions: [
      {
        step: 'Audit current lookups',
        action: 'Count all include:, a:, mx:, exists:, and redirect: mechanisms'
      },
      {
        step: 'Flatten nested includes',
        action: 'Replace includes with direct IP addresses where possible'
      },
      {
        step: 'Remove unnecessary includes',
        action: 'Eliminate unused mail service providers'
      },
      {
        step: 'Consider SPF macros',
        action: 'Use macros to reduce lookup count for complex setups'
      }
    ],
    guideLink: '/guide/setup-dmarc'
  },
  {
    id: 'spf-not-found',
    category: 'SPF',
    severity: 'critical',
    title: 'SPF Record Not Found',
    description: 'Your domain lacks an SPF record, allowing anyone to spoof your domain.',
    symptoms: [
      'No SPF record in DNS',
      'Emails may be marked as spam',
      'Higher risk of domain spoofing'
    ],
    causes: [
      'SPF record never created',
      'Accidentally deleted',
      'Wrong record type (not TXT)'
    ],
    solutions: [
      {
        step: 'Identify authorized mail servers',
        action: 'List all IPs and services that send email for your domain'
      },
      {
        step: 'Create SPF record',
        action: 'Format: v=spf1 include:_spf.google.com -all'
      },
      {
        step: 'Add to DNS as TXT record',
        action: 'Add at your root domain (yourdomain.com)'
      },
      {
        step: 'Verify SPF record',
        action: 'Check that record is properly formatted and accessible'
      }
    ],
    guideLink: '/guide/setup-dmarc'
  },
  {
    id: 'dkim-selector-not-found',
    category: 'DKIM',
    severity: 'warning',
    title: 'DKIM Selector Not Found',
    description: 'The DKIM selector being used by your mail server is not published in DNS.',
    symptoms: [
      'DKIM validation fails',
      'Authentication-Results header shows dkim=none',
      'Reduced email deliverability'
    ],
    causes: [
      'DKIM record not published in DNS',
      'Wrong selector name in DNS',
      'Mail server using different selector than what\'s in DNS',
      'Typo in selector name'
    ],
    solutions: [
      {
        step: 'Identify the selector',
        action: 'Check your email headers for the DKIM selector being used'
      },
      {
        step: 'Get the public key',
        action: 'Obtain the public key from your mail server/provider'
      },
      {
        step: 'Publish DKIM record',
        action: 'Add TXT record at selector._domainkey.yourdomain.com'
      },
      {
        step: 'Verify DKIM setup',
        action: 'Send a test email and check DKIM validation passes'
      }
    ],
    guideLink: '/guide/setup-dmarc'
  },
  {
    id: 'policy-too-permissive',
    category: 'DMARC',
    severity: 'info',
    title: 'DMARC Policy Set to None',
    description: 'Your DMARC policy is p=none, providing monitoring only without enforcement.',
    symptoms: [
      'DMARC configured but not blocking spoofed emails',
      'Domain still vulnerable to impersonation',
      'Reports show failed authentications with no action taken'
    ],
    causes: [
      'Initial monitoring phase',
      'Hesitation to enforce stricter policy',
      'Waiting to resolve authentication issues'
    ],
    solutions: [
      {
        step: 'Review DMARC reports',
        action: 'Analyze 2-4 weeks of reports to identify all legitimate senders'
      },
      {
        step: 'Fix authentication issues',
        action: 'Ensure all legitimate email sources pass SPF or DKIM'
      },
      {
        step: 'Move to quarantine',
        action: 'Change policy to p=quarantine for testing'
      },
      {
        step: 'Eventually enforce reject',
        action: 'After confirming no legitimate email blocked, set p=reject'
      }
    ],
    guideLink: '/guide/setup-dmarc'
  }
];

export default function CommonIssuesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesSeverity = selectedSeverity === 'all' || issue.severity === selectedSeverity;
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const getSeverityBadge = (severity: string) => {
    const styles = {
      critical: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
      info: 'bg-blue-100 text-blue-800'
    };
    return styles[severity as keyof typeof styles] || styles.info;
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === 'critical') return <XCircle className="w-5 h-5 text-red-500" />;
    if (severity === 'warning') return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    return <CheckCircle className="w-5 h-5 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Common DMARC, SPF & DKIM Issues
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Troubleshoot email authentication problems with step-by-step solutions for the most common issues.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Issues
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Categories</option>
                <option value="DMARC">DMARC</option>
                <option value="SPF">SPF</option>
                <option value="DKIM">DKIM</option>
              </select>
            </div>

            {/* Severity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity
              </label>
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
              </select>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredIssues.length} of {issues.length} issues
          </div>
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          {filteredIssues.map((issue) => (
            <div key={issue.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Issue Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getSeverityIcon(issue.severity)}
                    <h2 className="text-xl font-bold text-gray-900">{issue.title}</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded">
                      {issue.category}
                    </span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded ${getSeverityBadge(issue.severity)}`}>
                      {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600">{issue.description}</p>
              </div>

              {/* Issue Details */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  {/* Symptoms */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Symptoms</h3>
                    <ul className="space-y-2">
                      {issue.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Causes */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Common Causes</h3>
                    <ul className="space-y-2">
                      {issue.causes.map((cause, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-4 h-4 border-2 border-gray-300 rounded-full flex-shrink-0 mt-0.5" />
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Solutions */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    How to Fix
                  </h3>
                  <div className="space-y-4">
                    {issue.solutions.map((solution, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-green-900 mb-1">{solution.step}</h4>
                          <p className="text-sm text-green-800">{solution.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Links */}
                <div className="mt-6 flex gap-4">
                  <Link
                    href={issue.guideLink}
                    className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                  >
                    <span>Read detailed guide</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium"
                  >
                    <span>Check if fixed</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredIssues.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No issues found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedSeverity('all');
              }}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Diagnosing Your Issue?
          </h2>
          <p className="text-lg mb-8 text-amber-50">
            Use our free checker tool to identify problems with your email authentication setup.
          </p>
          <Link
            href="/"
            className="inline-block bg-white text-amber-600 font-bold py-3 px-8 rounded-lg hover:bg-amber-50 transition-colors"
          >
            Check Your Domain Now
          </Link>
        </div>
      </div>
    </div>
  );
}
