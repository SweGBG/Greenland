"use client";

import { X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import LangSwitch from "./LangSwitch";

type NavKey = "about" | "menu" | "packages" | "how" | "reviews" | "contact";

export default function MobileMenu({
  open,
  onClose,
  navKeys,
}: {
  open: boolean;
  onClose: () => void;
  navKeys: readonly { key: NavKey; href: string }[];
}) {
  const { t } = useLang();

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-soil-700/50 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ top: "var(--nav-h, 76px)" }}
      />
      <div
        className="fixed inset-x-0 z-50 overflow-hidden bg-cream-50 shadow-xl transition-[max-height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden"
        style={{
          top: "var(--nav-h, 76px)",
          maxHeight: open ? "calc(100vh - var(--nav-h, 76px))" : "0px",
        }}
      >
        <div className="flex items-center justify-between border-b border-moss-600/10 px-5 py-4">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-moss-600/60">
            Meny
          </span>
          <button
            onClick={onClose}
            aria-label="Stäng meny"
            className="flex h-9 w-9 items-center justify-center rounded-full text-moss-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col px-5 py-3">
          {navKeys.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={onClose}
              className="min-h-[48px] border-b border-moss-600/10 py-3.5 text-[15px] font-medium text-soil-700 last:border-none"
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 px-5 pb-6 pt-2">
          <LangSwitch />
          <a
            href="#lador"
            onClick={onClose}
            className="flex min-h-[48px] items-center justify-center rounded-full bg-barn-500 px-5 text-[15px] font-semibold text-cream-50"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </>
  );
}
