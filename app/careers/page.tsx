import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Upload } from 'lucide-react';
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

const recruitingEmail = 'info@aenvirotech.com';
const resumeFileRequestUrl = process.env.NEXT_PUBLIC_DROPBOX_FILE_REQUEST_URL;

export default function CareersPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Work with us"
          title="Do the right thing and get the right thing done."
          description="AEC values quality technical work, professional responsibility, and the discipline to deliver work on time and on budget."
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
                  Quality technical work
                </li>
                <li>
                  <CheckCircle2 aria-hidden="true" />
                  Professional responsibility
                </li>
                <li>
                  <CheckCircle2 aria-hidden="true" />
                  On time and on budget
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
                Send us your resume for future opportunities.
              </p>
              {resumeFileRequestUrl && (
                <p className="career-panel-contact">
                  Or email <a href={`mailto:${recruitingEmail}`}>{recruitingEmail}</a>
                </p>
              )}
              <div className="career-panel-action">
                {resumeFileRequestUrl ? (
                  <a
                    className="button"
                    href={resumeFileRequestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Upload aria-hidden="true" /> Upload your resume
                  </a>
                ) : (
                  <a
                    className="button"
                    href={`mailto:${recruitingEmail}?subject=${encodeURIComponent('Resume for future opportunities')}`}
                  >
                    Email your resume <ArrowRight aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
            <article className="career-panel career-panel-accent">
              <p className="eyebrow text-green-light">Internships</p>
              <h2>Start with real work.</h2>
              <p>
                AEC welcomes interest from students exploring environmental,
                engineering, scientific, or related work and looking to learn
                how careful technical practice supports real projects.
              </p>
              <div className="career-panel-action">
                <a className="button" href="/careers/apply/">
                  Apply Now <ArrowRight aria-hidden="true" />
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
