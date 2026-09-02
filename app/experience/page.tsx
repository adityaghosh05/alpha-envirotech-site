import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { ProjectCta } from '@/components/project-cta';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { experienceCards, sectors } from '@/lib/site-data';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Experience',
  description:
    'Representative environmental consulting and engineering experience across public infrastructure, federal, utility, commercial, and building projects.',
  alternates: { canonical: '/experience/' },
};

export default function ExperiencePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Representative experience"
          title="Technical depth, grounded in delivery."
          description="AEC supports public and private work where environmental requirements, project schedules, and field realities converge. The examples below are intentionally anonymized."
          image="construction"
        />
        <section className="section section-white">
          <div className="site-shell">
            <div className="experience-grid">
              {experienceCards.map((item, index) => (
                <article className="experience-card" key={item.title}>
                  <span className="card-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="eyebrow text-blue mt-8">{item.type}</p>
                  <h2>{item.title}</h2>
                  <p>{item.summary}</p>
                  <ul>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section section-fog">
          <div className="site-shell sector-layout">
            <div>
              <p className="eyebrow text-blue">Sectors served</p>
              <h2 className="section-title mt-4">
                Adaptable expertise for distinct operating environments.
              </h2>
            </div>
            <ul className="numbered-sectors">
              {sectors.map((sector, index) => (
                <li key={sector}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {sector}
                </li>
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
