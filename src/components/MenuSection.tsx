"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { products, type Category } from "@/lib/menuData";
import ProductCard from "./ProductCard";
import SignTag from "./SignTag";
import Reveal from "./Reveal";

const filterOrder: ("all" | Category)[] = ["all", "eggs", "meat", "veg", "pantry"];

export default function MenuSection() {
  const { t } = useLang();
  const [filter, setFilter] = useState<"all" | Category>("all");

  const list = filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <section id="sortiment" className="bg-moss-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SignTag>{t.menu.eyebrow}</SignTag>
          <h2 className="mt-5 font-display text-3xl font-semibold text-moss-700 sm:text-4xl md:text-[2.6rem]">
            {t.menu.title}
          </h2>
          <p className="mt-4 text-[15px] text-soil-600/80 sm:text-base">{t.menu.sub}</p>
        </Reveal>

        <div
          className="mx-auto mt-10 flex max-w-full gap-2.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center"
        >
          {filterOrder.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-colors ${
                filter === f
                  ? "border-moss-600 bg-moss-600 text-cream-50"
                  : "border-moss-600/20 bg-cream-50 text-soil-600/80 hover:border-moss-600/40"
              }`}
            >
              {t.menu.filters[f]}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i * 0.05, 0.3)}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
