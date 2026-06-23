"use client";

import { Star } from "lucide-react";
import { useLang } from "@/context/LangContext";
import SignTag from "./SignTag";
import Reveal from "./Reveal";

const reviews = [
  {
    name: "Maria L.",
    sv: "Köttlådan slog ut allt vi köpte i mataffären — och vi vet nu exakt vilken gård kycklingen kommer från.",
    en: "The meat box beat everything we used to buy at the supermarket — and now we know exactly which farm the chicken came from.",
  },
  {
    name: "Johan B.",
    sv: "Hämtar varje lördag på väg hem. Barnen tjuvtittar på grisarna varje gång.",
    en: "We pick up every Saturday on the way home. The kids sneak a look at the pigs every time.",
  },
  {
    name: "Sara & Erik",
    sv: "Beställde Allt-i-allo-lådan till en middagsbjudning. Gästerna trodde vi var proffskockar.",
    en: "Ordered the Everything Box for a dinner party. Our guests thought we were professional chefs.",
  },
];

export default function Testimonials() {
  const { lang, t } = useLang();

  return (
    <section id="omdomen" className="grain-overlay bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SignTag tilt="right">{t.reviews.eyebrow}</SignTag>
          <h2 className="mt-5 font-display text-3xl font-semibold text-moss-700 sm:text-4xl md:text-[2.6rem]">
            {t.reviews.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-moss-600/12 bg-moss-50/30 p-6">
                <div className="flex gap-0.5 text-wheat-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-soil-600/90">
                  &rdquo;{lang === "sv" ? r.sv : r.en}&rdquo;
                </p>
                <p className="mt-5 font-display text-sm font-semibold text-moss-700">
                  {r.name}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
