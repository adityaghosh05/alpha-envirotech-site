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

const coreValues = [
  {
    number: '01',
    title: 'Quality First',
    copy: 'We prioritize careful thinking, sound technical work, and useful deliverables.',
  },
  {
    number: '02',
    title: 'Do Things Right',
    copy: 'We work correctly, responsibly, and with professional integrity—even when the details are difficult.',
  },
  {
    number: '03',
    title: 'Protect Trust',
    copy: 'Trust is earned once and protected every day through candor, consistency, and follow-through.',
  },
  {
    number: '04',
    title: 'Aim Higher',
    copy: 'We continually raise our own standards and look beyond the minimum requirement to deliver better work.',
  },
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
        <section
          id="our-purpose"
          className="section section-white scroll-target"
        >
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
          id="core-values"
          className="section section-navy core-values-section scroll-target"
        >
          <div className="site-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow text-green-light">Core values</p>
                <h2 className="section-title mt-4 text-white">
                  We Aim Higher.
                </h2>
              </div>
              <p className="section-intro text-white/68">
                Our standards are practical: do careful work, make responsible
                decisions, and protect the trust placed in us.
              </p>
            </div>
            <div className="core-values-grid mt-12">
              {coreValues.map((value) => (
                <article key={value.title}>
                  <span>{value.number}</span>
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </article>
              ))}
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
                <source
                  srcSet="/images/amy-fu-upscaled.webp"
                  type="image/webp"
                />
                <img
                  src="/images/amy-fu-upscaled.jpg"
                  alt="Amy Fu, founder and president of Alpha Envirotech Consulting"
                  width="1254"
                  height="1254"
                  loading="lazy"
                />
              </picture>
            </figure>
            <div className="leader-copy">
              <p className="eyebrow text-blue">Leadership</p>
              <h2 className="section-title mt-4">Amy Fu</h2>
              <ul
                className="leader-credentials"
                aria-label="Professional credentials"
              >
                <li>P.E.</li>
                <li>LEED AP BD+C</li>
                <li>WELL AP</li>
              </ul>
              <div className="prose-large mt-8">
                <p>
                  Amy Fu founded Alpha Envirotech Consulting in 2010 and leads
                  the firm’s environmental engineering, science, and policy
                  work. A licensed professional engineer, she remains closely
                  involved in fieldwork and project delivery, working alongside
                  senior staff to understand site conditions and help clients
                  manage risk with clear, responsive judgment.
                </p>
                <p>
                  Beyond AEC, Amy has served on Jacksonville’s Environmental
                  Protection Board and Planning Commission and has supported
                  environmental education and STEM mentorship. Her leadership is
                  grounded in continuous learning, professional integrity,
                  community service, and a belief that technical work should be
                  done carefully and responsibly.
                </p>
              </div>
            </div>
            <div className="leader-video">
              <div className="leader-video-heading">
                <p className="eyebrow text-blue">In her own words</p>
                <h3>Meet Amy Fu</h3>
              </div>
              <div className="video-frame">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/LcnZ_DS-yEc?rel=0"
                  title="Meet Amy Fu, founder and president of Alpha Envirotech Consulting"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
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
