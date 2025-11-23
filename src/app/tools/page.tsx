import Link from 'next/link';
import { Wrench, Calculator, FileSearch, Layers } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export const metadata = {
  title: 'DMARC Tools - Generators, Checkers & Analyzers | Free Tools',
  description: 'Free DMARC tools including record generator, bulk domain checker, and policy analyzer. Everything you need to manage email authentication.',
};

const tools = [
  {
    title: 'DMARC Record Generator',
    description: 'Create properly formatted DMARC DNS records with our easy-to-use interactive generator.',
    href: '/tools/generator',
    icon: Calculator,
    color: 'bg-blue-500'
  },
  {
    title: 'Bulk Domain Checker',
    description: 'Check DMARC, SPF, and DKIM records for up to 50 domains at once with CSV export.',
    href: '/tools/bulk-checker',
    icon: Layers,
    color: 'bg-green-500'
  },
  {
    title: 'DMARC Policy Analyzer',
    description: 'Parse and analyze any DMARC record to understand what each tag means.',
    href: '/tools/analyzer',
    icon: FileSearch,
    color: 'bg-purple-500'
  }
];

export default function ToolsPage() {
  return (
    <>
      <PageHeader
        title="DMARC Tools"
        description="Free tools to help you manage and optimize your email authentication."
        breadcrumbs={[
          { label: 'Tools' }
        ]}
      />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="block bg-white rounded-lg border border-gray-200 p-6 hover:border-amber-500 hover:shadow-lg transition-all group"
                >
                  <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-600">
                    {tool.description}
                  </p>
                </Link>
              );
            })}
          </div>

          {/* Main Checker CTA */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-3">
              Check Your Domain
            </h2>
            <p className="text-lg mb-6 text-amber-50">
              Start by checking your current DMARC, SPF, and DKIM configuration.
            </p>
            <Link
              href="/"
              className="inline-block bg-white text-amber-600 font-bold py-3 px-8 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Free DMARC Checker →
            </Link>
          </div>

          {/* Related Resources */}
          <div className="mt-12 bg-gray-100 rounded-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/guide" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                Setup Guides →
              </Link>
              <Link href="/issues" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                Troubleshooting →
              </Link>
              <Link href="/guide/email-security" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                Best Practices →
              </Link>
              <Link href="/compare/email-authentication" className="text-amber-600 hover:text-amber-700 font-medium transition-colors">
                DMARC vs SPF vs DKIM →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
