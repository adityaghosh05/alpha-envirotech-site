import type { Metadata } from 'next';
import { PageHero } from '@/components/page-hero';
import { ProjectMap } from '@/components/project-map';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'A geographic view of Alpha Envirotech project activity across five southeastern states.',
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
          description="Explore AEC locations across Florida, Alabama, Mississippi, Georgia, and South Carolina."
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
      </main>
      <SiteFooter />
    </>
  );
}
