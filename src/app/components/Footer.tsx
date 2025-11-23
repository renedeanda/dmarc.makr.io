import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div>
            <h3 className="font-bold text-lg text-amber-600 mb-4">DMARC Checker</h3>
            <p className="text-sm text-gray-600 mb-4">
              Free, instant, and privacy-first email security checking tool.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              No data stored
            </div>
          </div>

          {/* Tools Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-amber-600 transition-colors">
                  DMARC Checker
                </Link>
              </li>
              <li>
                <Link href="/tools/generator" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Record Generator
                </Link>
              </li>
              <li>
                <Link href="/tools/bulk-checker" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Bulk Checker
                </Link>
              </li>
              <li>
                <Link href="/tools/analyzer" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Policy Analyzer
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/guide" className="text-gray-600 hover:text-amber-600 transition-colors">
                  All Guides
                </Link>
              </li>
              <li>
                <Link href="/guide/setup-dmarc" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Setup Guide
                </Link>
              </li>
              <li>
                <Link href="/issues" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Common Issues
                </Link>
              </li>
              <li>
                <Link href="/compare/email-authentication" className="text-gray-600 hover:text-amber-600 transition-colors">
                  DMARC vs SPF vs DKIM
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://makr.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-amber-600 transition-colors"
                >
                  About MAKR.io
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-amber-600 transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div>
            Crafted by{' '}
            <a
              href="https://makr.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              René DeAnda
            </a>
          </div>
          <div>
            © {currentYear} MAKR.io. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
