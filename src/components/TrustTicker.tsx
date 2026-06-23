"use client";

import { useLang } from "@/context/LangContext";
import { Sprout } from "lucide-react";

export default function TrustTicker() {
  const { t } = useLang();
  const items = [...t.ticker, ...t.ticker];

  return (
    <div className="overflow-hidden border-y border-soil-700/10 bg-soil-700 py-3.5">
      <div className="ticker-track gap-10 whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-2.5 font-mono text-xs font-medium tracking-[0.18em] text-cream-100/85"
          >
            <Sprout className="h-3.5 w-3.5 text-wheat-300" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
