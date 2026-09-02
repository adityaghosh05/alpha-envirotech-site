import type { Metadata } from 'next';
import { Barlow_Condensed, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const display = Barlow_Condensed({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

const body = Source_Sans_3({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aenvirotech.com'),
  title: {
    default: 'Alpha Envirotech | Environmental Engineering & Consulting',
    template: '%s | Alpha Envirotech',
  },
  description:
    'Environmental engineering and consulting for assessment, permitting, remediation, construction, compliance, and sustainable building projects.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Alpha Envirotech Consulting, Inc.',
    title: 'Prepared. Qualified. Experienced. | Alpha Envirotech',
    description:
      'Environmental engineering, science, and policy solutions for public and private projects nationwide.',
    images: [
      {
        url: '/og.png',
        width: 1731,
        height: 909,
        alt: 'Alpha Envirotech — Prepared. Qualified. Experienced.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prepared. Qualified. Experienced. | Alpha Envirotech',
    description: 'Environmental engineering, science, and policy solutions.',
    images: ['/og.png'],
  },
};

export const dynamic = 'force-static';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Alpha Envirotech Consulting, Inc.',
    alternateName: 'AEC',
    url: 'https://aenvirotech.com',
    logo: 'https://aenvirotech.com/icon.png',
    image: 'https://aenvirotech.com/og.png',
    telephone: '+1-904-382-0083',
    email: 'info@aenvirotech.com',
    foundingDate: '2010',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jacksonville',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    areaServed: { '@type': 'Country', name: 'United States' },
    knowsAbout: [
      'Environmental engineering',
      'Environmental consulting',
      'Site assessment and remediation',
      'Wetlands and permitting',
      'Construction environmental compliance',
      'Sustainable building services',
    ],
  };

  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
