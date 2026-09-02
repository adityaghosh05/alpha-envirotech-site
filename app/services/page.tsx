import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { ProjectCta } from '@/components/project-cta';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { serviceGroups } from '@/lib/site-data';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Environmental Services',
  description:
    'Environmental assessment, remediation, permitting, engineering, construction compliance, sustainability, and industrial-hygiene services.',
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Environmental capabilities"
          title="One team across the project lifecycle."
          description="AEC combines science, engineering, permitting, and construction support to help clients understand risk, meet requirements, and deliver defensible solutions."
          image="engineering"
        />
        <section className="section section-fog">
          <div className="site-shell">
            <div className="service-index" aria-label="Service areas">
              {serviceGroups.map((service) => (
                <a key={service.slug} href={`#${service.slug}`}>
                  <span>{service.number}</span>
                  {service.title}
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="section section-white service-details">
          <div className="site-shell">
            {serviceGroups.map((service) => (
              <article
                id={service.slug}
                className="service-detail"
                key={service.slug}
              >
                <div className="service-detail-heading">
                  <span className="card-number">{service.number}</span>
                  <h2>{service.title}</h2>
                  <p>{service.intro}</p>
                  <a
                    className="text-link mt-6"
                    href="/contact/#project-inquiry"
                  >
                    Discuss this service <ArrowRight aria-hidden="true" />
                  </a>
                </div>
                <ul className="capability-list">
                  {service.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
        <ProjectCta />
      </main>
      <SiteFooter />
    </>
  );
}
