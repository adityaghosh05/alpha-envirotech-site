import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, Upload } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { InternshipForm } from '@/components/internship-form';

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
          title="Do the right thing. Do the work well."
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
              {resumeFileRequestUrl ? (
                <>
                  <a
                    className="button mt-8"
                    href={resumeFileRequestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Upload aria-hidden="true" /> Upload your resume
                  </a>
                  <p className="career-panel-contact">
                    Or email <a href={`mailto:${recruitingEmail}`}>{recruitingEmail}</a>
                  </p>
                </>
              ) : (
                <a
                  className="button mt-8"
                  href={`mailto:${recruitingEmail}?subject=${encodeURIComponent('Resume for future opportunities')}`}
                >
                  <ArrowRight aria-hidden="true" /> Email your resume
                </a>
              )}
            </article>
            <article className="career-panel career-panel-accent">
              <p className="eyebrow text-green-light">Internships</p>
              <h2>Start with real work.</h2>
              <p>
                AEC welcomes interest from students exploring environmental,
                engineering, scientific, or related work and looking to learn
                how careful technical practice supports real projects.
              </p>
              <a className="button mt-8" href="#internship-application">
                Apply Now <ArrowRight aria-hidden="true" />
              </a>
            </article>
          </div>
        </section>
        <section
          id="internship-application"
          className="section section-white scroll-target"
        >
          <div className="site-shell">
            <div className="form-card internship-form-card">
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
