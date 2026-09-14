import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/about/',
    '/services/',
    '/markets/',
    '/projects/',
    '/careers/',
    '/contact/',
    '/privacy/',
  ].map((path) => ({
    url: `https://aenvirotech.com${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'monthly' : 'yearly',
    priority: path === '' ? 1 : path === '/contact/' ? 0.9 : 0.8,
  }));
}
