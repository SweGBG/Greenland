"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UserCircle,
  ClipboardList,
  LogOut,
  CheckCircle2,
  Package,
  ArrowLeft,
  CalendarDays,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useLang } from "@/context/LangContext";
import { useAuth, type OrderStatus } from "@/context/AuthContext";
import clsx from "clsx";

const statusStyles: Record<OrderStatus, string> = {
  processing: "bg-wheat-50 text-wheat-600",
  packed: "bg-moss-50 text-moss-600",
  delivered: "bg-barn-50 text-barn-600",
};

export default function MemberPage() {
  const { lang, t } = useLang();
  const { user, ready, orders, logout } = useAuth();
  const [justOrdered, setJustOrdered] = useState<string | null>(null);

  useEffect(() => {
    try {
      const id = window.sessionStorage.getItem("greenland-just-ordered");
      if (id) {
        setJustOrdered(id);
        window.sessionStorage.removeItem("greenland-just-ordered");
      }
    } catch {
      /* ignore */
    }
  }, []);

  const statusLabel: Record<OrderStatus, string> = {
    processing: t.member.statusProcessing,
    packed: t.member.statusPacked,
    delivered: t.member.statusDelivered,
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "sv" ? "sv-SE" : "en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <main className="overflow-x-hidden bg-cream-100">
      <Header />

      <section
        className="mx-auto max-w-5xl px-5 pb-20 sm:px-8"
        style={{ paddingTop: "calc(var(--nav-h, 76px) + 2.5rem)" }}
      >
        <Link
          href="/#sortiment"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-soil-600/70 transition-colors hover:text-barn-500"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.member.backToShop}
        </Link>

        {/* Not logged in */}
        {ready && !user && (
          <div className="mx-auto mt-8 max-w-md">
            <div className="text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss-50 text-moss-600">
                <UserCircle className="h-8 w-8" strokeWidth={1.5} />
              </span>
              <h1 className="mt-5 font-display text-2xl font-semibold text-moss-700">
                {t.member.loginRequired}
              </h1>
              <p className="mt-2 text-[14px] text-soil-600/75">
                {t.member.loginRequiredSub}
              </p>
            </div>
            <div className="mt-7 rounded-2xl border border-moss-600/12 bg-cream-50 p-6">
              <AuthForm compact />
            </div>
          </div>
        )}

        {/* Logged in */}
        {ready && user && (
          <>
            <h1 className="mt-4 font-display text-3xl font-semibold text-moss-700 sm:text-4xl">
              {t.member.title}
            </h1>

            {justOrdered && (
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-moss-300/40 bg-moss-50 px-5 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-moss-600" />
                <p className="text-[14px] text-moss-700">
                  <span className="font-semibold">
                    {lang === "sv" ? "Tack för din beställning!" : "Thanks for your order!"}
                  </span>{" "}
                  {lang === "sv" ? "Order" : "Order"} #{justOrdered}{" "}
                  {lang === "sv" ? "är mottagen och behandlas." : "received and processing."}
                </p>
              </div>
            )}

            <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-[300px_1fr]">
              {/* Profile */}
              <aside className="lg:sticky lg:top-[calc(var(--nav-h,76px)+1.5rem)] lg:h-fit">
                <div className="rounded-2xl border border-moss-600/12 bg-cream-50 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-moss-600 text-cream-50">
                      <UserCircle className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-base font-semibold text-moss-700">
                        {user.name}
                      </p>
                      <p className="truncate text-[12.5px] text-soil-600/70">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <dl className="mt-5 border-t border-moss-600/10 pt-4 text-[13px]">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1.5 text-soil-600/70">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {t.member.memberSince}
                      </dt>
                      <dd className="font-mono font-medium text-soil-700">
                        {fmtDate(user.createdAt)}
                      </dd>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <dt className="flex items-center gap-1.5 text-soil-600/70">
                        <ClipboardList className="h-3.5 w-3.5" />
                        {t.member.ordersTitle}
                      </dt>
                      <dd className="font-mono font-medium text-soil-700">
                        {orders.length}
                      </dd>
                    </div>
                  </dl>
                  <button
                    onClick={logout}
                    className="mt-5 flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-barn-500/30 px-5 text-[13.5px] font-semibold text-barn-500 transition-colors hover:bg-barn-50"
                  >
                    <LogOut className="h-4 w-4" />
                    {t.account.logout}
                  </button>
                </div>
              </aside>

              {/* Order history */}
              <div id="ordrar" className="scroll-mt-28">
                <h2 className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-moss-600/70">
                  <ClipboardList className="h-4 w-4" />
                  {t.member.ordersTitle}
                </h2>

                {orders.length === 0 ? (
                  <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-moss-600/20 bg-cream-50 px-6 py-12 text-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-moss-50 text-moss-600">
                      <Package className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <p className="mt-4 text-[14px] text-soil-600/75">
                      {t.member.noOrders}
                    </p>
                    <Link
                      href="/#sortiment"
                      className="mt-5 rounded-full bg-moss-600 px-5 py-2.5 text-[13px] font-semibold text-cream-50 transition-colors hover:bg-moss-500"
                    >
                      {t.member.noOrdersCta}
                    </Link>
                  </div>
                ) : (
                  <ul className="mt-4 flex flex-col gap-4">
                    {orders.map((order) => (
                      <li
                        key={order.id}
                        className="overflow-hidden rounded-2xl border border-moss-600/12 bg-cream-50"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-moss-600/10 bg-moss-50/50 px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-[13px] font-bold text-moss-700">
                              #{order.id}
                            </span>
                            <span className="text-[12.5px] text-soil-600/70">
                              {fmtDate(order.date)}
                            </span>
                          </div>
                          <span
                            className={clsx(
                              "rounded-full px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wide",
                              statusStyles[order.status]
                            )}
                          >
                            {statusLabel[order.status]}
                          </span>
                        </div>
                        <div className="px-5 py-4">
                          <ul className="flex flex-col gap-2">
                            {order.items.map((it) => (
                              <li
                                key={it.id}
                                className="flex items-center justify-between text-[13.5px]"
                              >
                                <span className="text-soil-700">
                                  <span className="font-mono text-soil-600/60">
                                    {it.qty}×
                                  </span>{" "}
                                  {it.name[lang]}
                                </span>
                                <span className="font-mono text-soil-600/80">
                                  {it.price * it.qty} kr
                                </span>
                              </li>
                            ))}
                          </ul>
                          <div className="mt-3 flex items-baseline justify-between border-t border-moss-600/10 pt-3">
                            <span className="text-[12.5px] font-semibold text-soil-600/70">
                              {t.member.orderTotal}
                            </span>
                            <span className="font-mono text-base font-bold text-barn-500">
                              {order.total} kr
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </section>

      <Footer />
    </main>
  );
}
