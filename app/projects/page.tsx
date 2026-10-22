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
    'A geographic view of Alpha Envirotech project activity across five southeastern states.',
  alternates: { canonical: '/projects/' },
};

const fieldPhotos = [
  { src: '/images/field/pic1.webp', alt: 'Multistory building under construction at a downtown intersection', caption: 'Urban construction' },
  { src: '/images/field/pic2.webp', alt: 'Excavated ground and utility pipe near a sports venue', caption: 'Site preparation' },
  { src: '/images/field/pic3.webp', alt: 'Steel frame of a building under construction', caption: 'Structural construction' },
  { src: '/images/field/pic4.webp', alt: 'Paved working waterfront with a marina and city skyline', caption: 'Working waterfront' },
  { src: '/images/field/pic5.webp', alt: 'Construction site and road corridor beside a multistory building', caption: 'Construction corridor' },
  { src: '/images/field/pic6.webp', alt: 'Pines and shrubs growing around a paved clearing', caption: 'Vegetated site' },
  { src: '/images/field/pic7.webp', alt: 'Water-filled corridor through a pine forest', caption: 'Wooded waterway' },
  { src: '/images/field/pic8.webp', alt: 'Concrete structure surrounded by pines and grasses', caption: 'Structure in a natural setting' },
];

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
        <section className="section section-white">
          <div className="site-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow text-blue">Field photography</p>
                <h2 className="section-title mt-4">
                  Field conditions shape the work.
                </h2>
              </div>
              <p className="section-intro">
                A look at the built and natural environments that inform AEC&apos;s
                environmental and construction work.
              </p>
            </div>
            <div className="project-image-grid mt-12">
              {fieldPhotos.map((photo) => (
                <figure key={photo.src}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
        <ProjectCta />
      </main>
      <SiteFooter />
    </>
  );
}
