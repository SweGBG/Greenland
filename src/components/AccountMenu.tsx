"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User, ChevronDown, ClipboardList, LogOut, UserCircle } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";
import AuthForm from "./AuthForm";
import clsx from "clsx";

export default function AccountMenu({ dark }: { dark?: boolean }) {
  const { t } = useLang();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const firstName = user?.name.split(" ")[0] ?? "";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={clsx(
          "flex items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium transition-colors",
          dark
            ? "bg-cream-100/15 text-cream-50 backdrop-blur-sm hover:bg-cream-100/25"
            : "bg-moss-600/10 text-moss-700 hover:bg-moss-600/15"
        )}
      >
        <User className="h-4 w-4" strokeWidth={2} />
        <span className="max-w-[88px] truncate">
          {user ? firstName : t.account.account}
        </span>
        <ChevronDown
          className={clsx("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+10px)] z-50 w-[300px] max-w-[calc(100vw-2rem)] rounded-2xl border border-moss-600/12 bg-cream-50 p-4 shadow-crate"
        >
          {user ? (
            <div>
              <div className="flex items-center gap-3 border-b border-moss-600/10 pb-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss-600 text-cream-50">
                  <UserCircle className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold text-moss-700">
                    {t.account.greeting}, {firstName}
                  </p>
                  <p className="truncate text-[12px] text-soil-600/70">
                    {user.email}
                  </p>
                </div>
              </div>
              <nav className="mt-2 flex flex-col">
                <Link
                  href="/medlem"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-[13.5px] font-medium text-soil-700 transition-colors hover:bg-moss-50"
                >
                  <UserCircle className="h-4 w-4 text-moss-600" />
                  {t.account.myAccount}
                </Link>
                <Link
                  href="/medlem#ordrar"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-[13.5px] font-medium text-soil-700 transition-colors hover:bg-moss-50"
                >
                  <ClipboardList className="h-4 w-4 text-moss-600" />
                  {t.account.orderHistory}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left text-[13.5px] font-medium text-barn-500 transition-colors hover:bg-barn-50"
                >
                  <LogOut className="h-4 w-4" />
                  {t.account.logout}
                </button>
              </nav>
            </div>
          ) : (
            <AuthForm onSuccess={() => setOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
}
