'use client';

import { useEffect, useRef, useState } from 'react';

const photos = [
  { src: '/images/wetland-egret.webp', fallback: '/images/wetland-egret.jpg' },
  { src: '/images/home/waterfront-development.webp' },
  { src: '/images/home/fire-rescue-station.webp' },
  { src: '/images/home/waterfront-construction.webp' },
  { src: '/images/home/commercial-construction.webp' },
  { src: '/images/home/site-grading.webp' },
  { src: '/images/home/fire-rescue-project.webp' },
];

function HeroPhoto({ index, entering = false, onAnimationEnd }: {
  index: number;
  entering?: boolean;
  onAnimationEnd?: () => void;
}) {
  const photo = photos[index];
  return (
    <picture
      className={entering ? 'hero-home-photo hero-home-photo-next' : 'hero-home-photo'}
      onAnimationEnd={onAnimationEnd}
    >
      {photo.fallback && <source srcSet={photo.src} type="image/webp" />}
      <img
        className="hero-home-image"
        src={photo.fallback ?? photo.src}
        alt=""
        fetchPriority={index === 0 ? 'high' : undefined}
      />
    </picture>
  );
}

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const currentRef = useRef(0);

  useEffect(() => {
    photos.slice(1).forEach((photo) => {
      const image = new Image();
      image.src = photo.src;
    });

    const timer = window.setInterval(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setNext((pending) => pending ?? (currentRef.current + 1) % photos.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, []);

  function finishTransition() {
    if (next === null) return;
    currentRef.current = next;
    setCurrent(next);
    setNext(null);
  }

  return (
    <>
      <HeroPhoto index={current} />
      {next !== null && (
        <HeroPhoto index={next} entering onAnimationEnd={finishTransition} />
      )}
    </>
  );
}
