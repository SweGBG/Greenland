"use client";

import { Egg, Beef, Carrot, Wheat, Drumstick, Ham, Leaf, Milk, Plus } from "lucide-react";
import type { Product } from "@/lib/menuData";
import { useLang } from "@/context/LangContext";

const icons = { egg: Egg, beef: Beef, carrot: Carrot, wheat: Wheat, drumstick: Drumstick, ham: Ham, leaf: Leaf, milk: Milk };

const unitLabelKey = { kg: "perKg", dozen: "perDozen", unit: "perUnit" } as const;

export default function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useLang();
  const Icon = icons[product.icon];

  return (
    <div className="group relative flex flex-col rounded-2xl border border-moss-600/12 bg-cream-50 p-5 transition-all hover:-translate-y-1 hover:border-wheat-300 hover:shadow-crate">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-moss-50 text-moss-600">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        {product.seasonal && (
          <span className="rounded-full bg-wheat-50 px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wide text-wheat-600">
            {t.menu.seasonal}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-moss-700">
        {product.name[lang]}
      </h3>
      <p className="mt-1.5 text-[13px] leading-snug text-soil-600/75">
        {product.desc[lang]}
      </p>

      <div className="mt-5 flex items-end justify-between border-t border-moss-600/10 pt-4">
        <p className="font-mono text-base font-semibold text-barn-500">
          {product.price} kr
          <span className="ml-0.5 text-xs font-normal text-soil-600/60">
            {t.menu[unitLabelKey[product.unit]]}
          </span>
        </p>
        <button
          aria-label={t.menu.addToOrder}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-moss-600 text-cream-50 transition-colors group-hover:bg-barn-500"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
