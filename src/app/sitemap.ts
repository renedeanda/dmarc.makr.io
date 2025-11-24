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
    '/guide/policy-progression',
    '/guide/email-security',
    '/guide/dmarc-reports',
    '/guide/google-workspace',
    '/guide/microsoft-365',
    '/tools',
    '/tools/generator',
    '/tools/spf-generator',
    '/tools/bulk-checker',
    '/tools/analyzer',
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
