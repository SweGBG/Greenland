"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ShoppingBasket, MapPin } from "lucide-react";
import { useLang } from "@/context/LangContext";
import SignTag from "./SignTag";

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] w-full items-center overflow-hidden bg-moss-700"
    >
      {/* Farm-market backdrop (uploaded photo) with gentle parallax */}
      <div
        data-parallax="0.12"
        className="absolute inset-0 -z-0 h-[118%] w-full"
        style={{ top: "-9%" }}
      >
        <Image
          src="/images/market-hero.jpg"
          alt="Gårdsbutikens stånd fyllt med nyskördade grönsaker, frukt och bär framför fälten och den röda ladan"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Legibility overlays — warm, not murky */}
      <div className="absolute inset-0 bg-gradient-to-t from-moss-800/92 via-moss-700/45 to-soil-700/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-moss-800/80 via-moss-700/20 to-transparent" />
      <div className="bg-noise absolute inset-0 opacity-60" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8">
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
          className="mt-6 max-w-3xl font-display text-[2.7rem] font-semibold leading-[1.04] text-cream-50 drop-shadow-[0_2px_18px_rgba(14,20,11,0.45)] sm:text-6xl md:text-7xl"
        >
          {t.hero.title1}
          <br />
          <span className="text-wheat-300">{t.hero.title2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-xl text-base leading-relaxed text-cream-100 drop-shadow-[0_1px_10px_rgba(14,20,11,0.5)] sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          {/* magnetic on desktop only (data-magnetic handled in SiteEffects) */}
          <a
            data-magnetic="0.3"
            href="#sortiment"
            className="group inline-flex items-center gap-2 rounded-full bg-wheat-400 px-7 py-3.5 text-sm font-semibold text-soil-700 shadow-tag transition-colors hover:bg-wheat-300"
          >
            <ShoppingBasket className="h-4 w-4" strokeWidth={2.2} />
            {t.hero.ctaPrimary}
          </a>
          <a
            data-magnetic="0.22"
            href="#kontakt"
            className="inline-flex items-center gap-2 rounded-full border border-cream-50/40 px-7 py-3.5 text-sm font-semibold text-cream-50 backdrop-blur-sm transition-colors hover:bg-cream-50/10"
          >
            <MapPin className="h-4 w-4" strokeWidth={2.2} />
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* quick trust chips */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-cream-100/85"
        >
          {t.hero.chips.map((c: string) => (
            <li key={c} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-wheat-300" />
              {c}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-cream-50/70 sm:flex">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em]">
          {t.hero.scroll}
        </span>
        <ChevronDown className="h-3.5 w-3.5 animate-bounce" />
      </div>
    </section>
  );
}
