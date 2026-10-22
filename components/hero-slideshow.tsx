'use client';

import { useEffect, useRef, useState } from 'react';

const photos = [
  { src: 'images/field/pic1.webp' },
  { src: 'images/field/pic2.webp' },
  { src: 'images/field/pic3.webp' },
  { src: 'images/field/pic4.webp' },
  { src: 'images/field/pic5.webp' },
  { src: 'images/field/pic6.webp' },
  { src: 'images/field/pic7.webp' },
  { src: 'images/field/pic8.webp' },
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
      <img
        className="hero-home-image"
        src={photo.src}
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
    }, 3500);

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
