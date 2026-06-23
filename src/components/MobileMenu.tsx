"use client";

import Link from "next/link";
import { X, ShoppingBasket, UserCircle, LogOut, LogIn } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
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
  const { user, logout } = useAuth();
  const { count } = useCart();
  const firstName = user?.name.split(" ")[0] ?? "";

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
            <Link
              key={item.key}
              href={item.href}
              onClick={onClose}
              className="min-h-[48px] border-b border-moss-600/10 py-3.5 text-[15px] font-medium text-soil-700 last:border-none"
            >
              {t.nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-3 border-t border-moss-600/10 px-5 pb-6 pt-4">
          {user ? (
            <>
              <div className="flex items-center gap-3 rounded-2xl bg-moss-50 px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-moss-600 text-cream-50">
                  <UserCircle className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-moss-700">
                    {t.account.greeting}, {firstName}
                  </p>
                  <p className="truncate text-[12px] text-soil-600/70">{user.email}</p>
                </div>
              </div>
              <Link
                href="/medlem"
                onClick={onClose}
                className="flex min-h-[48px] items-center gap-2.5 rounded-full border border-moss-600/20 px-5 text-[15px] font-medium text-soil-700"
              >
                <UserCircle className="h-5 w-5 text-moss-600" />
                {t.account.myAccount}
              </Link>
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-barn-500/30 px-5 text-[15px] font-medium text-barn-500"
              >
                <LogOut className="h-4 w-4" />
                {t.account.logout}
              </button>
            </>
          ) : (
            <Link
              href="/medlem"
              onClick={onClose}
              className="flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-moss-600/20 px-5 text-[15px] font-medium text-soil-700"
            >
              <LogIn className="h-5 w-5 text-moss-600" />
              {t.account.login} / {t.account.signup}
            </Link>
          )}

          <Link
            href="/varukorg"
            onClick={onClose}
            className="relative flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-moss-600/20 px-5 text-[15px] font-medium text-soil-700"
          >
            <ShoppingBasket className="h-5 w-5 text-moss-600" />
            {t.cart.badge}
            {count > 0 && (
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-barn-500 px-1.5 text-[11px] font-bold text-cream-50">
                {count}
              </span>
            )}
          </Link>

          <LangSwitch />
          <Link
            href="/#lador"
            onClick={onClose}
            className="flex min-h-[48px] items-center justify-center rounded-full bg-barn-500 px-5 text-[15px] font-semibold text-cream-50"
          >
            {t.nav.cta}
          </Link>
        </div>
      </div>
    </>
  );
}
