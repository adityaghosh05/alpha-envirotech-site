import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

type CompatibilityPageProps = {
  eyebrow: string;
  title: string;
  children: ReactNode;
  href: string;
  linkLabel: string;
};

export function CompatibilityPage({
  eyebrow,
  title,
  children,
  href,
  linkLabel,
}: CompatibilityPageProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="compatibility-page">
          <div className="site-shell compatibility-panel">
            <p className="eyebrow text-blue">{eyebrow}</p>
            <h1 className="section-title mt-4">{title}</h1>
            <div className="compatibility-copy">{children}</div>
            <a className="button mt-8" href={href}>
              {linkLabel} <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
