import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://aenvirotech.com/sitemap.xml',
    host: 'https://aenvirotech.com',
  };
}
