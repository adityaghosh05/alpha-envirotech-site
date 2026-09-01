import type { Metadata } from 'next';
import { InquiryForm } from '@/components/inquiry-form';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Start a project inquiry with Alpha Envirotech Consulting or reach the team by phone or email.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Start a conversation"
          title="Tell us what your project needs next."
          description="Request a free project evaluation, ask for a proposal, or start with a general question. Our team will review the details and follow up directly."
          image="wetland"
        />
        <section
          id="project-inquiry"
          className="section section-fog scroll-target"
        >
          <div className="site-shell contact-layout">
            <aside className="contact-aside">
              <p className="eyebrow text-blue">Project inquiry</p>
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
        <section className="section section-white">
          <div className="site-shell disclaimer-box">
            <p className="eyebrow text-blue">
              Free project evaluation disclaimer
            </p>
            <p>
              Free Project Evaluations are prepared by our expert environmental
              scientists and engineers and may reveal preliminary solutions and
              foreshadow the all-inclusive services one would receive as a
              client. AEC does not warrant the accuracy and completeness of the
              free evaluations, as they are based only on the information
              provided by the requestor and are not designed to be used as
              complete evaluations.
            </p>
            <p>
              For more comprehensive, customized solutions and environmental
              engineering consultations, please request a proposal through the
              form above or contact us directly.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
