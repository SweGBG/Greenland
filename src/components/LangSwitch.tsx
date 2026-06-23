"use client";

import { useLang } from "@/context/LangContext";
import clsx from "clsx";

function FlagSV({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 10" className={className} aria-hidden="true">
      <rect width="16" height="10" fill="#006AA7" />
      <rect y="4" width="16" height="2" fill="#FECC02" />
      <rect x="6" width="2" height="10" fill="#FECC02" />
    </svg>
  );
}

function FlagGB({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 10" className={className} aria-hidden="true">
      <rect width="16" height="10" fill="#012169" />
      <path d="M0 0L16 10M16 0L0 10" stroke="#fff" strokeWidth="1.6" />
      <path d="M0 0L16 10M16 0L0 10" stroke="#C8102E" strokeWidth="0.8" />
      <path d="M8 0V10M0 5H16" stroke="#fff" strokeWidth="2.6" />
      <path d="M8 0V10M0 5H16" stroke="#C8102E" strokeWidth="1.4" />
    </svg>
  );
}

export default function LangSwitch({ dark }: { dark?: boolean }) {
  const { lang, setLang } = useLang();

  return (
    <div
      className={clsx(
        "flex items-center gap-0.5 rounded-full p-0.5 text-[11px] font-mono font-medium tracking-wide",
        dark ? "bg-cream-100/15 backdrop-blur-sm" : "bg-moss-600/10"
      )}
      role="group"
      aria-label="Language switch / Språkval"
    >
      <button
        onClick={() => setLang("sv")}
        className={clsx(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors",
          lang === "sv"
            ? dark
              ? "bg-cream-100 text-moss-700"
              : "bg-moss-600 text-cream-100"
            : dark
            ? "text-cream-100/80 hover:text-cream-100"
            : "text-moss-600/70 hover:text-moss-600"
        )}
        aria-pressed={lang === "sv"}
      >
        <FlagSV className="h-2.5 w-4 rounded-[1px]" />
        SE
      </button>
      <span className={dark ? "text-cream-100/40" : "text-moss-600/30"}>|</span>
      <button
        onClick={() => setLang("en")}
        className={clsx(
          "flex items-center gap-1.5 rounded-full px-2.5 py-1.5 transition-colors",
          lang === "en"
            ? dark
              ? "bg-cream-100 text-moss-700"
              : "bg-moss-600 text-cream-100"
            : dark
            ? "text-cream-100/80 hover:text-cream-100"
            : "text-moss-600/70 hover:text-moss-600"
        )}
        aria-pressed={lang === "en"}
      >
        <FlagGB className="h-2.5 w-4 rounded-[1px]" />
        EN
      </button>
    </div>
  );
}
