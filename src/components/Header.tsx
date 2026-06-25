"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Leaf } from "lucide-react";
import { useLang } from "@/context/LangContext";
import LangSwitch from "./LangSwitch";
import MobileMenu from "./MobileMenu";
import CartButton from "./CartButton";
import AccountMenu from "./AccountMenu";

const navKeys = [
  { key: "about", href: "/#gard" },
  { key: "menu", href: "/#sortiment" },
  { key: "packages", href: "/#lador" },
  { key: "how", href: "/#sa-funkar-det" },
  { key: "reviews", href: "/#omdomen" },
  { key: "contact", href: "/#kontakt" },
] as const;

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream-50/95 shadow-[0_2px_18px_rgba(20,15,5,0.08)] backdrop-blur-md"
          : "bg-transparent"
      }`}
      style={{ height: "var(--nav-h, 76px)" }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              scrolled ? "bg-moss-600" : "bg-cream-50/15 backdrop-blur-sm"
            }`}
          >
            <Leaf
              className={`h-[18px] w-[18px] ${scrolled ? "text-wheat-300" : "text-wheat-300"}`}
              strokeWidth={2.2}
            />
          </span>
          <span
            className={`font-display text-lg font-semibold tracking-tight ${
              scrolled ? "text-moss-700" : "text-cream-50"
            }`}
          >
            Green Land
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navKeys.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-[13px] font-medium tracking-wide transition-colors ${
                scrolled
                  ? "text-soil-600/80 hover:text-barn-500"
                  : "text-cream-50/85 hover:text-wheat-300"
              }`}
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <LangSwitch dark={!scrolled} />
          <CartButton dark={!scrolled} />
          <AccountMenu dark={!scrolled} />
          <Link
            data-magnetic="0.25"
            href="/#lador"
            className="rounded-full bg-barn-500 px-5 py-2.5 text-[13px] font-semibold text-cream-50 shadow-tag transition-colors hover:bg-barn-400"
          >
            {t.nav.cta}
          </Link>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <CartButton dark={!scrolled} />
          <button
            onClick={() => setOpen(true)}
            aria-label="Öppna meny"
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              scrolled ? "text-moss-700" : "text-cream-50"
            }`}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} navKeys={navKeys} />
    </header>
  );
}
