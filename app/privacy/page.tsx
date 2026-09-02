import type { Metadata } from 'next';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Privacy',
  description:
    'Privacy information for the Alpha Envirotech website and project-inquiry form.',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="privacy-hero">
          <div className="site-shell py-18 sm:py-24">
            <p className="eyebrow text-green-light">Website privacy</p>
            <h1 className="page-title mt-5 text-white">Privacy notice</h1>
            <p className="mt-5 text-white/65">Last updated September 1, 2026</p>
          </div>
        </section>
        <section className="section section-white">
          <article className="site-shell privacy-copy">
            <h2>Information we collect</h2>
            <p>
              When you submit a project inquiry, we collect the information you
              provide, such as your name, organization, work email, phone
              number, project location, service interest, timeline, and project
              summary. We do not offer file uploads through this website.
            </p>
            <h2>How we use information</h2>
            <p>
              We use inquiry information to review your request, respond to you,
              evaluate a potential engagement, prevent misuse of the form, and
              maintain reasonable business records. Submitting an inquiry does
              not create a client or professional-services relationship.
            </p>
            <h2>Service providers</h2>
            <p>
              The inquiry form uses Cloudflare Turnstile for spam prevention and
              Resend for email delivery. These providers process limited
              technical or inquiry information needed to perform those services
              under their own privacy terms.
            </p>
            <h2>Cookies and analytics</h2>
            <p>
              At launch, this website does not use advertising cookies or
              analytics cookies. Our hosting and security providers may process
              essential network information to deliver and protect the site.
            </p>
            <h2>Retention and security</h2>
            <p>
              Inquiry emails and related business records are retained only as
              reasonably needed for business, legal, security, and recordkeeping
              purposes. We use reasonable safeguards, but no internet
              transmission or electronic storage method is completely secure.
            </p>
            <h2>Your choices</h2>
            <p>
              You may contact us to ask about personal information you submitted
              through this site. Email{' '}
              <a href="mailto:info@aenvirotech.com">info@aenvirotech.com</a> or
              call <a href="tel:+19043820083">904.382.0083</a>.
            </p>
          </article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
