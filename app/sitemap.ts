import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/services/',
    '/experience/',
    '/about/',
    '/contact/',
    '/privacy/',
  ].map((path) => ({
    url: `https://aenvirotech.com${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'monthly' : 'yearly',
    priority: path === '' ? 1 : path === '/contact/' ? 0.9 : 0.8,
  }));
}
