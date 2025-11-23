import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-amber-600 flex items-center gap-1">
              <Home className="w-4 h-4" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/guide" className="text-gray-600 hover:text-amber-600">
              Guides
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {children}
      </div>

      {/* CTA Section */}
      <div className="bg-amber-50 border-y border-amber-200 py-12 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to check your DMARC records?
          </h3>
          <p className="text-gray-600 mb-6">
            Test your email security in 30 seconds with our free tool.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Check Your Domain Now
          </Link>
        </div>
      </div>
    </div>
  );
}
