"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Check } from "lucide-react";
import type { Product } from "@/lib/menuData";
import { categoryFallback } from "@/lib/menuData";
import { useLang } from "@/context/LangContext";
import { useCart } from "@/context/CartContext";

const unitLabelKey = { kg: "perKg", dozen: "perDozen", unit: "perUnit" } as const;

export default function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useLang();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const src = imgFailed ? categoryFallback[product.category] : product.img;

  function handleAdd() {
    addItem({
      id: product.id,
      kind: "product",
      name: product.name,
      price: product.price,
      unit: product.unit,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-moss-600/12 bg-cream-50 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:border-wheat-300 hover:shadow-crate">
      {/* Photo */}
      <div className="relative aspect-[5/4] w-full overflow-hidden bg-moss-50">
        <Image
          src={src}
          alt={product.name[lang]}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          onError={() => setImgFailed(true)}
          unoptimized={imgFailed}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-soil-700/25 via-transparent to-transparent" />
        {product.seasonal && (
          <span className="absolute left-3 top-3 rounded-full bg-wheat-400/95 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide text-soil-700 shadow-tag">
            {t.menu.seasonal}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-moss-700">
          {product.name[lang]}
        </h3>
        <p className="mt-1.5 text-[13px] leading-snug text-soil-600/75">
          {product.desc[lang]}
        </p>

        <div className="mt-auto flex items-end justify-between border-t border-moss-600/10 pt-4">
          <p className="font-mono text-base font-semibold text-barn-500">
            {product.price} kr
            <span className="ml-0.5 text-xs font-normal text-soil-600/60">
              {t.menu[unitLabelKey[product.unit]]}
            </span>
          </p>
          <button
            onClick={handleAdd}
            aria-label={t.menu.addToOrder}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-cream-50 transition-colors ${
              added ? "bg-wheat-500" : "bg-moss-600 group-hover:bg-barn-500"
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
