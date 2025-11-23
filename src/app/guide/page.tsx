import Link from 'next/link';
import { Book, Wrench, Shield, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export const metadata = {
  title: 'DMARC Email Security Guides & Tutorials | DMARC Checker',
  description: 'Complete guides and tutorials for DMARC, SPF, and DKIM email authentication. Learn how to set up, troubleshoot, and optimize your email security.',
};

const guides = [
  {
    category: 'Setup',
    icon: Book,
    guides: [
      {
        title: 'Complete DMARC Setup Guide',
        description: 'Step-by-step instructions for implementing DMARC on your domain from scratch.',
        href: '/guide/setup-dmarc',
        readTime: '10 min',
        difficulty: 'Beginner'
      },
      {
        title: 'Email Security Best Practices',
        description: 'Essential security practices to protect your domain from email-based threats.',
        href: '/guide/email-security',
        readTime: '8 min',
        difficulty: 'All levels'
      }
    ]
  },
  {
    category: 'Understanding',
    icon: Shield,
    guides: [
      {
        title: 'DMARC, SPF & DKIM Comparison',
        description: 'Understand the differences between DMARC, SPF, and DKIM and how they work together.',
        href: '/compare/email-authentication',
        readTime: '12 min',
        difficulty: 'Beginner'
      }
    ]
  },
  {
    category: 'Troubleshooting',
    icon: Wrench,
    guides: [
      {
        title: 'Common DMARC Issues',
        description: 'Diagnose and fix the most common DMARC, SPF, and DKIM problems.',
        href: '/issues',
        readTime: '15 min',
        difficulty: 'Intermediate'
      }
    ]
  }
];

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        title="Email Security Guides"
        description="Everything you need to know about DMARC, SPF, DKIM, and email authentication."
        breadcrumbs={[
          { label: 'Guides' }
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Guide Categories */}
        <div className="space-y-12">
        {guides.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.category}>
              <div className="flex items-center gap-3 mb-6">
                <Icon className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {category.guides.map((guide) => (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-amber-500 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                        {guide.title}
                      </h3>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
                    </div>
                    <p className="text-gray-600 mb-4">
                      {guide.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {guide.readTime}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        guide.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        guide.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        guide.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {guide.difficulty}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="mt-16 bg-gray-100 rounded-lg p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Helpful Tools</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/tools/generator" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
            DMARC Generator →
          </Link>
          <Link href="/tools/bulk-checker" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
            Bulk Checker →
          </Link>
          <Link href="/tools/analyzer" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
            Policy Analyzer →
          </Link>
          <Link href="/issues" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
            Troubleshooting →
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}
