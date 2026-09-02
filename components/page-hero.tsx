type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: 'wetland' | 'about' | 'construction' | 'engineering';
};

const sources = {
  wetland: ['/images/wetland-landscape.webp', '/images/wetland-landscape.jpg'],
  about: ['/images/about-wetland-viewing.webp', '/images/about-wetland-viewing.jpg'],
  construction: ['/images/construction.webp', '/images/construction.jpg'],
  engineering: [
    '/images/engineering-hero-upscaled.webp',
    '/images/engineering-hero-upscaled.png',
  ],
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: PageHeroProps) {
  const [webp, fallback] = sources[image];
  return (
    <section className="page-hero">
      <picture>
        <source srcSet={webp} type="image/webp" />
        <img src={fallback} alt="" />
      </picture>
      <div className="page-hero-overlay" />
      <div className="site-shell relative z-10 py-20 sm:py-28 lg:py-32">
        <p className="eyebrow text-white/65">{eyebrow}</p>
        <h1 className="page-title mt-5 max-w-5xl text-white">{title}</h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/78">
          {description}
        </p>
      </div>
    </section>
  );
}
