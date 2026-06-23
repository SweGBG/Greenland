"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Play, Pause } from "lucide-react";
import { useLang } from "@/context/LangContext";
import SignTag from "./SignTag";

export default function Hero() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setPlaying(!mq.matches);
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative flex h-[100vh] min-h-[640px] w-full items-center overflow-hidden bg-moss-700"
    >
      {/* Video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/forest-canopy.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay={!reduced}
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-moss-700 via-moss-700/35 to-moss-700/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-moss-700/70 via-transparent to-moss-700/30" />
      <div className="bg-noise absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <SignTag tilt="left">{t.hero.eyebrow}</SignTag>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-3xl font-display text-[2.6rem] font-semibold leading-[1.05] text-cream-50 sm:text-6xl md:text-7xl"
        >
          {t.hero.title1}
          <br />
          <span className="text-wheat-300">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-lg text-base leading-relaxed text-cream-100/90 sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#sortiment"
            className="rounded-full bg-wheat-400 px-7 py-3.5 text-sm font-semibold text-soil-700 shadow-tag transition-transform hover:-translate-y-0.5 hover:bg-wheat-300"
          >
            {t.hero.ctaPrimary}
          </a>
          <a
            href="#kontakt"
            className="rounded-full border border-cream-50/40 px-7 py-3.5 text-sm font-semibold text-cream-50 backdrop-blur-sm transition-colors hover:bg-cream-50/10"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>
      </div>

      {/* Video mute/pause control */}
      <button
        onClick={toggle}
        aria-label={playing ? "Pausa bakgrundsvideo" : "Spela bakgrundsvideo"}
        className="absolute bottom-7 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream-50/30 text-cream-50/90 backdrop-blur-sm transition-colors hover:bg-cream-50/10 sm:right-8"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>

      <div className="absolute bottom-7 left-5 z-10 hidden items-center gap-2 text-cream-50/70 sm:flex sm:left-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
          {t.hero.scroll}
        </span>
        <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
      </div>
    </section>
  );
}
