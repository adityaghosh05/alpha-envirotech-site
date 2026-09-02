import { navigation } from '@/lib/site-data';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-shell grid gap-12 py-14 md:grid-cols-[1.2fr_.8fr_.8fr] md:py-20">
        <div>
          <a
            href="/"
            className="brand-lockup"
            aria-label="Alpha Envirotech home"
          >
            <picture>
              <source
                srcSet="/images/aec-mark-transparent.webp"
                type="image/webp"
              />
              <img
                src="/images/aec-mark-transparent.png"
                alt=""
                width="70"
                height="53"
              />
            </picture>
            <span>
              <strong>Alpha Envirotech</strong>
              <small>Consulting, Inc.</small>
            </span>
          </a>
          <p className="mt-6 max-w-md text-white/65">
            Environmental engineering, science, and policy solutions for public
            and private projects nationwide.
          </p>
          <p className="mt-6 text-sm font-semibold text-white/85">
            DBE &amp; W/MBE provider
          </p>
        </div>
        <div>
          <p className="footer-label">Explore</p>
          <nav className="footer-links mt-5" aria-label="Footer navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="/privacy/">Privacy</a>
          </nav>
        </div>
        <div>
          <p className="footer-label">Connect</p>
          <div className="footer-links mt-5">
            <a href="tel:+19043820083">904.382.0083</a>
            <a href="mailto:info@aenvirotech.com">info@aenvirotech.com</a>
            <span>Jacksonville, Florida</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="site-shell flex flex-col gap-2 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Alpha Envirotech Consulting, Inc.</p>
          <p>CAGE 762WB · SAM UEI NM6CPALCNQL9 · CA29370</p>
        </div>
      </div>
    </footer>
  );
}
