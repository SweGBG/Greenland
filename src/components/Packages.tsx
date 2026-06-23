"use client";

import { useLang } from "@/context/LangContext";
import { packages } from "@/lib/packagesData";
import PackageCard from "./PackageCard";
import SignTag from "./SignTag";
import Reveal from "./Reveal";

export default function Packages() {
  const { t } = useLang();

  return (
    <section id="lador" className="bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SignTag tilt="right">{t.packages.eyebrow}</SignTag>
          <h2 className="mt-5 font-display text-3xl font-semibold text-moss-700 sm:text-4xl md:text-[2.6rem]">
            {t.packages.title}
          </h2>
          <p className="mt-4 text-[15px] text-soil-600/80 sm:text-base">{t.packages.sub}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
