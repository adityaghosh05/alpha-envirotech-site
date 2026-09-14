import type { Metadata } from 'next';
import { CompatibilityPage } from '@/components/compatibility-page';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Leadership',
  robots: { index: false, follow: true },
};

export default function LeadershipCompatibilityPage() {
  return (
    <CompatibilityPage
      eyebrow="Leadership"
      title="Meet Amy Fu."
      href="/about/#leadership"
      linkLabel="View Leadership"
    >
      <p>
        Learn about Amy Fu and the values that guide Alpha Envirotech on the
        About page.
      </p>
    </CompatibilityPage>
  );
}
