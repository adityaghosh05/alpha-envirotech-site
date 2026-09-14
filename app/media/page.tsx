import type { Metadata } from 'next';
import { CompatibilityPage } from '@/components/compatibility-page';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Projects',
  robots: { index: false, follow: true },
};

export default function MediaCompatibilityPage() {
  return (
    <CompatibilityPage
      eyebrow="Projects"
      title="Explore our project work."
      href="/projects/"
      linkLabel="View Projects"
    >
      <p>
        Project information and imagery are now organized on the Projects page.
      </p>
    </CompatibilityPage>
  );
}
