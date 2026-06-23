"use client";

import { Leaf, Instagram, Facebook } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { key: "about", href: "#gard" },
    { key: "menu", href: "#sortiment" },
    { key: "packages", href: "#lador" },
    { key: "contact", href: "#kontakt" },
  ] as const;

  return (
    <footer className="bg-soil-700 pt-16 text-cream-100/80">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/10">
                <Leaf className="h-[18px] w-[18px] text-wheat-300" strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-semibold text-cream-50">
                Green Land
              </span>
            </div>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed">{t.footer.tagline}</p>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/10 transition-colors hover:bg-wheat-400 hover:text-soil-700"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/10 transition-colors hover:bg-wheat-400 hover:text-soil-700"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/50">
              {t.footer.links}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-[14px]">
              {links.map((l) => (
                <li key={l.key}>
                  <a href={l.href} className="transition-colors hover:text-wheat-300">
                    {t.nav[l.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/50">
              {t.footer.contact}
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-[14px]">
              <li>Lantgårdsvägen 14, 442 00 Kungälv</li>
              <li>
                <a href="mailto:hej@greenland.se" className="hover:text-wheat-300">
                  hej@greenland.se
                </a>
              </li>
              <li>
                <a href="tel:+46300000000" className="hover:text-wheat-300">
                  0300-00 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-cream-50/10 py-6 text-[12px] text-cream-100/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Green Land. {t.footer.rights}
          </p>
          <p>
            {t.footer.made}{" "}
            <a
              href="https://swegbg.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-wheat-300 hover:underline"
            >
              SweGBG Trading
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
