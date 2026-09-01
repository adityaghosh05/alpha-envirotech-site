import Link from 'next/link';

export function ProjectCta() {
  return (
    <section className="project-cta">
      <div className="site-shell grid items-center gap-8 py-14 md:grid-cols-[1fr_auto] md:py-18">
        <div>
          <p className="eyebrow text-green-light">
            Bring us the complicated part.
          </p>
          <h2 className="mt-3 font-heading text-4xl font-semibold uppercase leading-none text-white sm:text-5xl">
            Let’s move your project forward.
          </h2>
        </div>
        <Link className="button" href="/contact/#project-inquiry">
          Start a project inquiry <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
    </section>
  );
}
