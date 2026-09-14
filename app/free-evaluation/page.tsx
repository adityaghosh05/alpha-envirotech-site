import type { Metadata } from 'next';
import { CompatibilityPage } from '@/components/compatibility-page';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Get in Touch',
  robots: { index: false, follow: true },
};

export default function LegacyContactCompatibilityPage() {
  return (
    <CompatibilityPage
      eyebrow="Contact Alpha Envirotech"
      title="Let’s discuss what your project needs."
      href="/contact/#get-in-touch"
      linkLabel="Get in Touch"
    >
      <p>
        Alpha Envirotech welcomes project inquiries, proposal requests, and
        general questions about environmental and engineering needs.
      </p>
    </CompatibilityPage>
  );
}
