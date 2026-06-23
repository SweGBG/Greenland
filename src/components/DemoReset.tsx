"use client";

import { useState } from "react";
import { RotateCcw, X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import clsx from "clsx";

/**
 * Discreet demo utility: wipes all locally-created accounts, sessions,
 * carts and orders (everything under the `greenland-` key prefix) so each
 * demo starts from a clean slate. The embedded demo account lives in code,
 * not in storage, so it always survives a reset.
 *
 * Hidden automatically once real auth is wired up:
 * set NEXT_PUBLIC_DEMO_MODE="false" in the environment.
 */
export default function DemoReset() {
  const { t } = useLang();
  const [confirming, setConfirming] = useState(false);

  if (process.env.NEXT_PUBLIC_DEMO_MODE === "false") return null;

  function reset() {
    try {
      const keys: string[] = [];
      for (let i = 0; i < window.localStorage.length; i++) {
        const k = window.localStorage.key(i);
        if (k && k.startsWith("greenland-")) keys.push(k);
      }
      keys.forEach((k) => window.localStorage.removeItem(k));
      window.sessionStorage.removeItem("greenland-just-ordered");
    } catch {
      /* ignore */
    }
    // Hard reload so every context re-initialises from a clean slate
    window.location.href = "/";
  }

  return (
    <div className="fixed bottom-4 left-4 z-40 print:hidden">
      {confirming ? (
        <div className="flex items-center gap-1.5 rounded-full border border-moss-600/15 bg-cream-50/95 p-1 pl-3.5 shadow-crate backdrop-blur-sm">
          <span className="text-[12px] font-medium text-soil-700">
            {t.demo.confirm}
          </span>
          <button
            onClick={reset}
            className="rounded-full bg-barn-500 px-3 py-1.5 text-[12px] font-semibold text-cream-50 transition-colors hover:bg-barn-400"
          >
            {t.demo.yes}
          </button>
          <button
            onClick={() => setConfirming(false)}
            aria-label={t.demo.cancel}
            className="flex h-7 w-7 items-center justify-center rounded-full text-soil-600/60 transition-colors hover:bg-moss-50 hover:text-soil-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className={clsx(
            "flex items-center gap-1.5 rounded-full border border-moss-600/15 bg-cream-50/80 px-3.5 py-2 text-[12px] font-medium text-soil-600/70 shadow-tag backdrop-blur-sm transition-all",
            "hover:bg-cream-50 hover:text-barn-500 hover:opacity-100",
            "opacity-55"
          )}
          title={t.demo.reset}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t.demo.reset}
        </button>
      )}
    </div>
  );
}
