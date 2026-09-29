'use client';

import { useEffect, useRef } from 'react';

type YouTubePlayer = {
  getCurrentTime: () => number;
  pauseVideo: () => void;
  destroy: () => void;
};

type YouTubePlayerEvent = { data: number };

declare global {
  interface Window {
    YT?: {
      Player: new (
        iframe: HTMLIFrameElement,
        options: {
          events: {
            onStateChange: (event: YouTubePlayerEvent) => void;
          };
        },
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function ClippedYouTubeVideo() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let active = true;
    let player: YouTubePlayer | undefined;
    let playbackCheck: ReturnType<typeof setInterval> | undefined;

    const stopChecking = () => {
      if (playbackCheck) clearInterval(playbackCheck);
      playbackCheck = undefined;
    };

    const initializePlayer = () => {
      if (!active || !window.YT?.Player || !iframeRef.current || player) return;

      player = new window.YT.Player(iframeRef.current, {
        events: {
          onStateChange: ({ data }) => {
            stopChecking();
            if (data !== 1 || !player) return;

            playbackCheck = setInterval(() => {
              if (player && player.getCurrentTime() >= 70) {
                player.pauseVideo();
                stopChecking();
              }
            }, 200);
          },
        },
      });
    };

    const previousReadyHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.();
      initializePlayer();
    };

    if (window.YT?.Player) {
      initializePlayer();
    } else {
      const apiScript = document.querySelector<HTMLScriptElement>(
        'script[src="https://www.youtube.com/iframe_api"]',
      );
      if (apiScript) {
        apiScript.addEventListener('load', initializePlayer, { once: true });
      } else {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.addEventListener('load', initializePlayer, { once: true });
        document.head.appendChild(script);
      }
    }

    return () => {
      active = false;
      stopChecking();
      if (window.onYouTubeIframeAPIReady) {
        window.onYouTubeIframeAPIReady = previousReadyHandler;
      }
      player?.destroy();
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src="https://www.youtube-nocookie.com/embed/LcnZ_DS-yEc?rel=0&amp;end=70&amp;enablejsapi=1"
      title="Meet Amy Fu, founder and president of Alpha Envirotech Consulting (first 1 minute 10 seconds)"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}
