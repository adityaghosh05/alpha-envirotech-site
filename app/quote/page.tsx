import type { Metadata } from 'next';
import { CompatibilityPage } from '@/components/compatibility-page';

export const dynamic = 'force-static';
export const metadata: Metadata = {
  title: 'Get in Touch',
  robots: { index: false, follow: true },
};

export default function QuoteCompatibilityPage() {
  return (
    <CompatibilityPage
      eyebrow="Get in Touch"
      title="Tell us what your project needs."
      href="/contact/#get-in-touch"
      linkLabel="Get in Touch"
    >
      <p>
        Contact AEC with a project inquiry, proposal request, or general
        question.
      </p>
    </CompatibilityPage>
  );
}
