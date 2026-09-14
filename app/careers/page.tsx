import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Learn about careers and internships with Alpha Envirotech Consulting.',
  alternates: { canonical: '/careers/' },
};

const recruitingEmail = '[RECRUITING_EMAIL]';

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Work with us"
          title="Do the right thing. Do the work well."
          description="AEC values meaningful technical work, professional responsibility, and the discipline to deliver work correctly."
          image="engineering"
        />
        <section className="section section-white">
          <div className="site-shell careers-intro">
            <div>
              <p className="eyebrow text-blue">Work with us</p>
              <h2 className="section-title mt-4">Bring judgment and care.</h2>
            </div>
            <div className="prose-large">
              <p>
                We look for people who respect the responsibility behind
                environmental and engineering work—people who ask good
                questions, document carefully, and take pride in getting the
                details right.
              </p>
              <ul className="careers-principles mt-8">
                <li>
                  <CheckCircle2 aria-hidden="true" />
                  Meaningful technical work
                </li>
                <li>
                  <CheckCircle2 aria-hidden="true" />
                  Professional responsibility
                </li>
                <li>
                  <CheckCircle2 aria-hidden="true" />
                  Quality without shortcuts
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="section section-fog">
          <div className="site-shell careers-grid">
            <article className="career-panel">
              <p className="eyebrow text-blue">Open opportunities</p>
              <h2>Stay connected.</h2>
              <p>We do not currently have any open positions posted.</p>
              <p>
                We are always interested in hearing from talented professionals.
              </p>
              <a className="text-link mt-6" href={`mailto:${recruitingEmail}`}>
                {recruitingEmail} <ArrowRight aria-hidden="true" />
              </a>
            </article>
            <article className="career-panel career-panel-accent">
              <p className="eyebrow text-green-light">Internships</p>
              <h2>Start with real work.</h2>
              <p>
                AEC welcomes interest from students exploring environmental,
                engineering, scientific, or related work and looking to learn
                how careful technical practice supports real projects.
              </p>
              <a
                className="button mt-8"
                href="mailto:[RECRUITING_EMAIL]?subject=Alpha%20Envirotech%20Internship%20Application"
              >
                Apply Now <ArrowRight aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
