"use client";

import { useEffect, useRef } from "react";

const description =
  "A waterfront of modern buildings in warm evening light, seen from the water.";

const FADE_MS = 1600;

export function HeroFilm() {
  const primaryRef = useRef<HTMLVideoElement>(null);
  const secondaryRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const primary = primaryRef.current;
    const secondary = secondaryRef.current;
    if (!primary || !secondary) return;

    primary.loop = false;
    secondary.loop = false;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active = primary;
    let idle = secondary;
    let handingOff = false;
    let dissolve: Animation | null = null;
    let frame = 0;

    const playFromStart = (video: HTMLVideoElement) => {
      video.currentTime = 0;
      return video.play();
    };

    const begin = () => {
      if (handingOff || motion.matches) return;
      if (idle.readyState < 2) return;
      handingOff = true;

      const outgoing = active;
      const incoming = idle;
      incoming.style.zIndex = "1";
      outgoing.style.zIndex = "0";
      incoming.style.opacity = "0";

      void playFromStart(incoming).catch(() => {
        dissolve?.cancel();
        incoming.style.opacity = "0";
        handingOff = false;
      });

      dissolve?.cancel();
      dissolve = incoming.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: FADE_MS,
        easing: "linear",
        fill: "forwards",
      });

      void dissolve.finished
        .then(() => {
          incoming.style.opacity = "1";
          dissolve?.cancel();
          dissolve = null;
          outgoing.pause();
          outgoing.style.opacity = "0";
          outgoing.currentTime = 0;
          active = incoming;
          idle = outgoing;
          handingOff = false;
        })
        .catch(() => {});
    };

    const onEnded = (event: Event) => {
      if (event.currentTarget !== active || handingOff) return;
      if (idle.readyState < 2) {
        void playFromStart(active).catch(() => {});
        return;
      }
      begin();
    };

    const watch = () => {
      frame = requestAnimationFrame(watch);
      if (motion.matches || handingOff || active.paused) return;
      const duration = active.duration;
      if (!Number.isFinite(duration) || duration === 0) return;
      if (duration - active.currentTime <= FADE_MS / 1000) begin();
    };

    const apply = () => {
      if (motion.matches) {
        dissolve?.cancel();
        primary.pause();
        secondary.pause();
        handingOff = false;
        return;
      }
      void active.play().catch(() => {});
    };

    primary.addEventListener("ended", onEnded);
    secondary.addEventListener("ended", onEnded);
    apply();
    frame = requestAnimationFrame(watch);
    motion.addEventListener("change", apply);

    return () => {
      cancelAnimationFrame(frame);
      dissolve?.cancel();
      primary.removeEventListener("ended", onEnded);
      secondary.removeEventListener("ended", onEnded);
      motion.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div className="absolute inset-0 isolate">
      <p className="sr-only">{description}</p>
      <video
        ref={primaryRef}
        className="hero-film h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-waterfront.jpg"
        preload="auto"
        width={1920}
        height={1080}
        aria-hidden="true"
      >
        <source src="/hero-waterfront.mp4" type="video/mp4" />
      </video>
      <video
        ref={secondaryRef}
        className="hero-film hero-film-hold h-full w-full object-cover"
        muted
        playsInline
        poster="/hero-waterfront.jpg"
        preload="auto"
        width={1920}
        height={1080}
        aria-hidden="true"
      >
        <source src="/hero-waterfront.mp4" type="video/mp4" />
      </video>
      <img
        src="/hero-waterfront.jpg"
        alt=""
        width={1600}
        height={899}
        className="hero-film-still h-full w-full object-cover"
      />
      <div className="hero-grade absolute inset-0" aria-hidden="true" />
      <div className="hero-grain absolute inset-0" aria-hidden="true" />
    </div>
  );
}
