import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { ProjectCta } from '@/components/project-cta';
import { ProjectMap } from '@/components/project-map';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A geographic view of Alpha Envirotech project activity across the southeastern and eastern United States.',
  alternates: { canonical: '/projects/' },
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Projects"
          title="Environmental work grounded in place."
          description="Explore AEC locations across Florida, Alabama, Mississippi, and Georgia."
          image="construction"
        />
        <section className="section section-fog">
          <div className="site-shell project-map-layout">
            <div>
              <p className="eyebrow text-blue">Regional project map</p>
              <h2 className="section-title mt-4">The places behind our work.</h2>
              <p className="section-intro mt-6">
                Explore the cities and counties where AEC has worked across the
                Southeast. Select a place on the map or in the list below it.
              </p>
            </div>
            <ProjectMap />
          </div>
        </section>
        <section className="section section-white">
          <div className="site-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow text-blue">Project environments</p>
                <h2 className="section-title mt-4">
                  Field conditions shape the work.
                </h2>
              </div>
              <p className="section-intro">
                Public infrastructure and federal construction settings call for
                careful coordination, clear documentation, and responsive
                environmental support.
              </p>
            </div>
            <div className="project-image-grid mt-12">
              <figure>
                <picture>
                  <source
                    srcSet="/images/projects/arlington-water-reclamation.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/projects/arlington-water-reclamation.jpg"
                    alt="Water reclamation facility infrastructure in Jacksonville"
                    loading="lazy"
                  />
                </picture>
                <figcaption>Public infrastructure</figcaption>
              </figure>
              <figure>
                <picture>
                  <source
                    srcSet="/images/projects/kings-bay-federal-construction.webp"
                    type="image/webp"
                  />
                  <img
                    src="/images/projects/kings-bay-federal-construction.png"
                    alt="Federal waterfront construction facility at Kings Bay"
                    loading="lazy"
                  />
                </picture>
                <figcaption>Federal construction</figcaption>
              </figure>
            </div>
          </div>
        </section>
        <ProjectCta />
      </main>
      <SiteFooter />
    </>
  );
}
