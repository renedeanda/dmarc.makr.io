import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dmarc.makr.io';
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    '',
    '/guide',
    '/guide/setup-dmarc',
    '/guide/setup-spf',
    '/guide/setup-dkim',
    '/guide/fix-spf-errors',
    '/guide/fix-alignment-issues',
    '/guide/fix-dkim-selectors',
    '/guide/email-security-checklist',
    '/guide/policy-progression',
    '/guide/report-analysis',
    '/tools/generator',
    '/tools/bulk-checker',
    '/compare/email-authentication',
    '/issues',
    '/privacy',
    '/terms'
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: currentDate,
    changeFrequency: path === '' ? 'daily' : path.startsWith('/guide') ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : path.startsWith('/guide') ? 0.8 : 0.6
  })) as MetadataRoute.Sitemap;
}
