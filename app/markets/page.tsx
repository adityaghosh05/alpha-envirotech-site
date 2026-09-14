import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { ProjectCta } from '@/components/project-cta';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { markets } from '@/lib/site-data';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Markets',
  description:
    'Environmental and engineering consulting for public works, federal programs, and development projects.',
  alternates: { canonical: '/markets/' },
};

export default function MarketsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Markets"
          title="Technical perspective for distinct project environments."
          description="AEC brings environmental science, engineering, permitting, and construction insight to public, federal, and development teams."
          image="wetland"
        />
        <section className="section section-white">
          <div className="site-shell">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow text-blue">Where we work</p>
                <h2 className="section-title mt-4">
                  Three markets. One accountable approach.
                </h2>
              </div>
              <p className="section-intro">
                Each market brings different constraints. Our role is to make
                environmental requirements clear, practical, and connected to
                delivery.
              </p>
            </div>
            <div className="market-grid mt-12">
              {markets.map((market) => (
                <article className="market-card" key={market.title}>
                  <picture>
                    <source srcSet={market.image} type="image/webp" />
                    <img
                      src={market.fallback}
                      alt={market.alt}
                      loading="lazy"
                    />
                  </picture>
                  <div className="market-card-copy">
                    <span className="card-number">{market.number}</span>
                    <h2>{market.title}</h2>
                    <p>{market.copy}</p>
                    <a className="text-link mt-6" href="/contact/#get-in-touch">
                      Discuss your needs <ArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
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
