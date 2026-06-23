"use client";

import { useLang } from "@/context/LangContext";
import SignTag from "./SignTag";
import Reveal from "./Reveal";
import { ClipboardList, Hammer, Truck } from "lucide-react";

export default function HowItWorks() {
  const { t } = useLang();

  const steps = [
    { n: "01", t: t.how.step1t, d: t.how.step1d, Icon: ClipboardList },
    { n: "02", t: t.how.step2t, d: t.how.step2d, Icon: Hammer },
    { n: "03", t: t.how.step3t, d: t.how.step3d, Icon: Truck },
  ];

  return (
    <section id="sa-funkar-det" className="relative overflow-hidden bg-moss-700 py-20 sm:py-28">
      <div className="bg-noise absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SignTag>{t.how.eyebrow}</SignTag>
          <h2 className="mt-5 font-display text-3xl font-semibold text-cream-50 sm:text-4xl md:text-[2.6rem]">
            {t.how.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1} className="relative">
              <div className="flex items-center gap-4">
                <span className="font-display text-4xl font-semibold text-wheat-300/30 sm:text-5xl">
                  {s.n}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream-50/10">
                  <s.Icon className="h-5 w-5 text-wheat-300" strokeWidth={1.8} />
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-cream-50">
                {s.t}
              </h3>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-cream-100/75">
                {s.d}
              </p>
              {i < 2 && (
                <div className="absolute right-[-1.5rem] top-6 hidden h-px w-12 bg-cream-50/15 sm:block" />
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
