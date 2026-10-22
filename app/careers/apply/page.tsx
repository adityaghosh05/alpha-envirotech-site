import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { InternshipForm } from '@/components/internship-form';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Internship Application',
  description: 'Apply for an internship with Alpha Envirotech Consulting.',
  alternates: { canonical: '/careers/apply/' },
};

export default function InternshipApplicationPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Internship application"
          title="Start with real work."
          description="Tell us about your studies and interests. Our team will follow up with you."
          image="engineering"
        />
        <section className="section section-white">
          <div className="site-shell">
            <a className="text-link" href="/careers/">
              <ArrowLeft aria-hidden="true" /> Back to Careers
            </a>
            <div className="form-card internship-form-card mt-8">
              <p className="eyebrow text-blue">Internship application</p>
              <h2 className="section-title mt-4">Tell us about yourself.</h2>
              <p className="mt-4 mb-8 max-w-2xl text-muted-foreground">
                Share a few details about your studies and interests. Our team
                will follow up with you.
              </p>
              <InternshipForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
