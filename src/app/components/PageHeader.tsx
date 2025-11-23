import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  showHomeLink?: boolean;
}

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  showHomeLink = true
}: PageHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {(showHomeLink || breadcrumbs.length > 0) && (
          <nav className="flex items-center gap-2 text-sm py-4">
            {showHomeLink && (
              <>
                <Link href="/" className="text-gray-600 hover:text-amber-600 flex items-center gap-1 transition-colors">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
                {breadcrumbs.length > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </>
            )}
            {breadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Page Title */}
        <div className="py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {title}
          </h1>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
