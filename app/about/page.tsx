import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { ProjectCta } from '@/components/project-cta';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { companyData } from '@/lib/site-data';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Alpha Envirotech Consulting, a woman-owned environmental engineering and consulting firm founded in 2010.',
  alternates: { canonical: '/about/' },
};

const differentiators = [
  'Environmental science, engineering, policy, and construction insight in one team',
  'Senior-level attention and practical communication',
  'Experience supporting public agencies, prime contractors, and commercial clients',
  'A delivery mindset grounded in stewardship, safety, and compliance',
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="About Alpha Envirotech"
          title="Prepared to solve the complicated part."
          description="Founded in Jacksonville in 2010, AEC helps public and private clients move complex environmental work toward practical, responsible outcomes."
          image="about"
        />
        <section className="section section-white">
          <div className="site-shell story-layout">
            <div>
              <p className="eyebrow text-blue">Our purpose</p>
              <h2 className="section-title mt-4">
                Stewardship and delivery belong together.
              </h2>
            </div>
            <div className="prose-large">
              <p>
                Alpha Envirotech Consulting, Inc. provides environmental
                engineering, science, and policy solutions for projects
                nationwide. Our work is built around a simple conviction: sound
                environmental stewardship should help projects make better, more
                durable decisions.
              </p>
              <p>
                We engage across the project lifecycle—from assessment and
                permitting through engineering, construction, monitoring, and
                closeout—so environmental commitments remain connected to how
                work is actually delivered.
              </p>
            </div>
          </div>
        </section>
        <section className="section section-fog">
          <div className="site-shell differentiator-layout">
            <div className="about-image-frame">
              <picture>
                <source srcSet="/images/egret.webp" type="image/webp" />
                <img
                  src="/images/egret.png"
                  alt="Great egret standing in a wetland"
                  width="800"
                  height="900"
                />
              </picture>
            </div>
            <div>
              <p className="eyebrow text-blue">Why AEC</p>
              <h2 className="section-title mt-4">
                Responsive by design. Rigorous by practice.
              </h2>
              <ul className="differentiator-list mt-8">
                {differentiators.map((item) => (
                  <li key={item}>
                    <CheckCircle2 aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section
          id="leadership"
          className="section section-white scroll-target"
        >
          <div className="site-shell leadership-layout">
            <figure className="leader-portrait">
              <picture>
                <source srcSet="/images/amy-fu.webp" type="image/webp" />
                <img
                  src="/images/amy-fu.jpeg"
                  alt="Dr. Amy Fu, founder and president of Alpha Envirotech Consulting"
                  width="560"
                  height="560"
                  loading="lazy"
                />
              </picture>
            </figure>
            <div className="leader-copy">
              <p className="eyebrow text-blue">Leadership</p>
              <h2 className="section-title mt-4">Dr. Amy Fu</h2>
              <p className="leader-credentials">
                P.E. · LEED AP BD+C · WELL AP
              </p>
              <div className="prose-large mt-8">
                <p>
                  Dr. Amy Fu is the founder and president of Alpha Envirotech
                  Consulting. Her leadership brings together environmental
                  engineering, sustainable building, project delivery, and
                  cross-disciplinary problem solving.
                </p>
                <p>
                  Under her direction, AEC supports clients that need clear
                  technical judgment, responsive coordination, and environmental
                  commitments carried through execution.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="section section-navy">
          <div className="site-shell">
            <p className="eyebrow text-green-light">Company identifiers</p>
            <h2 className="section-title mt-4 max-w-3xl text-white">
              Ready for public and private teaming.
            </h2>
            <dl className="company-data mt-10">
              {companyData.map(([term, value]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <ProjectCta />
      </main>
      <SiteFooter />
    </>
  );
}
