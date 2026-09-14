import type { Metadata } from 'next';
import { InquiryForm } from '@/components/inquiry-form';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Get in Touch',
  description:
    'Contact Alpha Envirotech Consulting about a project, proposal request, general question, or environmental and engineering need.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Get in Touch"
          title="Let’s start with what you need."
          description="Reach out with a project inquiry, proposal request, general question, or an environmental or engineering need you would like to discuss."
          image="wetland"
        />
        <section
          id="get-in-touch"
          className="section section-fog scroll-target"
        >
          <div className="site-shell contact-layout">
            <aside className="contact-aside">
              <p className="eyebrow text-blue">Get in Touch</p>
              <h2 className="section-title mt-4">Start with the essentials.</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Share enough context for us to understand the need. Please do
                not send confidential or regulated material through this form.
              </p>
              <dl className="contact-details mt-9">
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href="tel:+19043820083">904.382.0083</a>
                  </dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href="mailto:info@aenvirotech.com">
                      info@aenvirotech.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>Jacksonville, Florida</dd>
                </div>
              </dl>
            </aside>
            <div className="form-card">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
