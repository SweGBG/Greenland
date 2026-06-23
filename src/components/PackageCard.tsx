"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FarmPackage } from "@/lib/packagesData";
import { useLang } from "@/context/LangContext";
import { useCart } from "@/context/CartContext";
import clsx from "clsx";

export default function PackageCard({ pkg }: { pkg: FarmPackage }) {
  const { lang, t } = useLang();
  const { addItem } = useCart();
  const router = useRouter();

  function choose() {
    addItem({
      id: pkg.id,
      kind: "package",
      name: pkg.name,
      price: pkg.price,
    });
    router.push("/varukorg");
  }

  return (
    <div
      className={clsx(
        "relative flex flex-col rounded-2xl border-2 p-7 pt-9 transition-transform hover:-translate-y-1.5",
        pkg.popular
          ? "border-wheat-400 bg-moss-700 text-cream-50 shadow-crate"
          : "border-moss-600/15 bg-cream-50 text-soil-700"
      )}
    >
      {/* rope handle */}
      <svg
        viewBox="0 0 120 30"
        className="absolute -top-4 left-1/2 h-6 w-28 -translate-x-1/2"
        aria-hidden="true"
      >
        <path
          d="M10 28 Q10 0 60 0 Q110 0 110 28"
          fill="none"
          stroke={pkg.popular ? "#D9A441" : "#8C6A3E"}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </svg>

      {pkg.popular && (
        <span className="absolute -top-3 right-6 rounded-full bg-barn-500 px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-wide text-cream-50">
          {t.packages.popular}
        </span>
      )}

      <h3 className="font-display text-xl font-semibold sm:text-2xl">{pkg.name[lang]}</h3>
      <p
        className={clsx(
          "mt-1.5 text-[13px]",
          pkg.popular ? "text-cream-100/80" : "text-soil-600/75"
        )}
      >
        {pkg.tagline[lang]}
      </p>

      <div className="mt-6 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-bold">{pkg.price} kr</span>
        <span
          className={clsx(
            "text-xs",
            pkg.popular ? "text-cream-100/70" : "text-soil-600/60"
          )}
        >
          · {pkg.weight[lang]}
        </span>
      </div>

      <p
        className={clsx(
          "mt-6 text-[11px] font-mono font-semibold uppercase tracking-[0.14em]",
          pkg.popular ? "text-wheat-300" : "text-moss-600/70"
        )}
      >
        {t.packages.includes}
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {pkg.includes[lang].map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[13.5px]">
            <Check
              className={clsx(
                "mt-0.5 h-4 w-4 shrink-0",
                pkg.popular ? "text-wheat-300" : "text-barn-500"
              )}
            />
            <span className={pkg.popular ? "text-cream-100/90" : "text-soil-600/90"}>
              {item}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={choose}
        className={clsx(
          "mt-8 flex min-h-[48px] items-center justify-center rounded-full text-sm font-semibold transition-colors",
          pkg.popular
            ? "bg-wheat-400 text-soil-700 hover:bg-wheat-300"
            : "bg-moss-600 text-cream-50 hover:bg-moss-500"
        )}
      >
        {t.packages.cta}
      </button>
    </div>
  );
}
