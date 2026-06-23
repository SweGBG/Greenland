"use client";

import Image from "next/image";
import { useLang } from "@/context/LangContext";
import SignTag from "./SignTag";
import Reveal from "./Reveal";

export default function About() {
  const { t } = useLang();

  const stats = [
    { n: t.about.stat1n, l: t.about.stat1l },
    { n: t.about.stat2n, l: t.about.stat2l },
    { n: t.about.stat3n, l: t.about.stat3l },
  ];

  return (
    <section id="gard" className="grain-overlay relative bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[1.4rem] shadow-crate">
            <Image
              src="/images/green-land-farm.jpg"
              alt="Illustration av Green Lands odlingar, lada och gårdsbutik i kvällsljus"
              width={1408}
              height={768}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-soil-700/10" />
          </div>
          <div className="sign-tag absolute -bottom-5 left-6 -rotate-2 px-5 py-3 sm:left-10">
            <p className="font-display text-sm font-semibold text-cream-50 sm:text-base">
              Green Land
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-cream-100/80">
              Est. familjegård
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <SignTag tilt="right">{t.about.eyebrow}</SignTag>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-moss-700 sm:text-4xl md:text-[2.6rem]">
            {t.about.title}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-soil-600/90 sm:text-base">
            {t.about.p1}
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-soil-600/90 sm:text-base">
            {t.about.p2}
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-moss-600/15 pt-7">
            {stats.map((s) => (
              <div key={s.l}>
                <p className="font-display text-2xl font-semibold text-barn-500 sm:text-3xl">
                  {s.n}
                </p>
                <p className="mt-1 text-xs leading-snug text-soil-600/70 sm:text-[13px]">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
