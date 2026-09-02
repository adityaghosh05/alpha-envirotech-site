import { ArrowRight, Check, MapPinned, ShieldCheck } from 'lucide-react';
import { ProjectCta } from '@/components/project-cta';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { experienceCards, sectors, serviceGroups } from '@/lib/site-data';

export const dynamic = 'force-static';

const projectPath = [
  ['01', 'Assess', 'Clarify site conditions, constraints, and risk.'],
  ['02', 'Permit', 'Navigate agency requirements and approvals.'],
  ['03', 'Engineer', 'Shape practical, defensible solutions.'],
  ['04', 'Construct', 'Carry commitments into the field and schedule.'],
  ['05', 'Comply', 'Document performance, closeout, and continuing needs.'],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-home">
          <picture>
            <source srcSet="/images/wetland-egret.webp" type="image/webp" />
            <img
              className="hero-home-image"
              src="/images/wetland-egret.jpg"
              alt=""
            />
          </picture>
          <div className="hero-home-overlay" />
          <div className="site-shell relative z-10 grid min-h-[min(760px,calc(100svh-76px))] items-end py-16 lg:grid-cols-[1.2fr_.8fr] lg:gap-16 lg:py-24">
            <div className="max-w-4xl">
              <p className="eyebrow text-white/80">
                Environmental engineering &amp; consulting
              </p>
              <h1 className="hero-title mt-5 text-white">
                Prepared. <span>Qualified.</span> Experienced.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl">
                Practical, cross-disciplinary solutions for environmental risk,
                permitting, engineering, construction, and compliance.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a className="button" href="/contact/#project-inquiry">
                  Start a project inquiry{' '}
                  <span aria-hidden="true">&#8594;</span>
                </a>
                <a className="button button-ghost" href="/services/">
                  Explore capabilities
                </a>
              </div>
            </div>
            <aside
              className="hero-proof mt-12 lg:mt-0"
              aria-label="Firm highlights"
            >
              <p className="eyebrow text-white/65">Trusted project partner</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-7">
                <div>
                  <dt>Established</dt>
                  <dd>2010</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>Jacksonville</dd>
                </div>
                <div>
                  <dt>Certified</dt>
                  <dd>DBE &amp; W/MBE</dd>
                </div>
                <div>
                  <dt>Reach</dt>
                  <dd>Nationwide</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="section section-white">
          <div className="site-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow text-blue">
                  Integrated environmental services
                </p>
                <h2 className="section-title mt-4">
                  Expertise that connects the whole project.
                </h2>
              </div>
              <p className="section-intro">
                From early due diligence through construction closeout, AEC
                brings environmental science, engineering, permitting, and
                delivery support into one practical team.
              </p>
            </div>
            <div className="service-grid mt-10">
              {serviceGroups.map((service) => (
                <a
                  className="service-card"
                  key={service.slug}
                  href={`/services/#${service.slug}`}
                >
                  <span className="card-number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.short}</p>
                  <span className="card-link">
                    View capabilities <ArrowRight aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="project-path-section">
          <div className="site-shell py-16 sm:py-20">
            <div className="max-w-2xl">
              <p className="eyebrow text-blue">
                From first question to final closeout
              </p>
              <h2 className="section-title mt-4">
                A clear path through complex work.
              </h2>
            </div>
            <ol className="project-path mt-10">
              {projectPath.map(([number, title, copy]) => (
                <li key={number}>
                  <span className="path-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-navy">
          <div className="site-shell proof-layout">
            <div>
              <p className="eyebrow text-green-light">
                Built for accountable delivery
              </p>
              <h2 className="section-title mt-4 text-white">
                Credibility you can put to work.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/68">
                AEC is a woman-owned, minority-owned environmental consulting
                and engineering firm prepared to support public agencies, prime
                contractors, and commercial teams.
              </p>
            </div>
            <div className="credentials-panel">
              <div>
                <ShieldCheck aria-hidden="true" />
                <span>
                  <strong>DBE &amp; W/MBE</strong>Certified business
                </span>
              </div>
              <div>
                <Check aria-hidden="true" />
                <span>
                  <strong>Florida CA29370</strong>Engineering authorization
                </span>
              </div>
              <div>
                <MapPinned aria-hidden="true" />
                <span>
                  <strong>Jacksonville-based</strong>Nationwide project support
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-white">
          <div className="site-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow text-blue">Representative experience</p>
                <h2 className="section-title mt-4">
                  Work shaped around real-world constraints.
                </h2>
              </div>
              <a className="text-link" href="/experience/">
                Explore experience <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <div className="experience-preview-grid mt-10">
              {experienceCards.slice(0, 3).map((item, index) => (
                <article className="experience-preview" key={item.title}>
                  <span>
                    {String(index + 1).padStart(2, '0')} / {item.type}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sectors-strip" aria-labelledby="sectors-title">
          <div className="site-shell py-12 sm:py-16">
            <p id="sectors-title" className="eyebrow text-blue">
              Sectors served
            </p>
            <ul className="sector-list mt-6">
              {sectors.map((sector) => (
                <li key={sector}>{sector}</li>
              ))}
            </ul>
          </div>
        </section>

        <ProjectCta />
      </main>
      <SiteFooter />
    </>
  );
}
