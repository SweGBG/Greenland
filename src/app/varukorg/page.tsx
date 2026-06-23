"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBasket, ArrowLeft, Lock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/AuthForm";
import { useLang } from "@/context/LangContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const unitKey = { kg: "perKg", dozen: "perDozen", unit: "perUnit" } as const;

export default function CartPage() {
  const { lang, t } = useLang();
  const { items, setQty, removeItem, total, clear } = useCart();
  const { user, placeOrder } = useAuth();
  const router = useRouter();

  const [showAuth, setShowAuth] = useState(false);
  const [pending, setPending] = useState(false);

  function finalize() {
    const order = placeOrder(items, total);
    try {
      window.sessionStorage.setItem("greenland-just-ordered", order.id);
    } catch {
      /* ignore */
    }
    clear();
    router.push("/medlem#ordrar");
  }

  function handleCheckout() {
    if (!user) {
      setShowAuth(true);
      setPending(true);
      return;
    }
    finalize();
  }

  // Complete checkout once the user logs in / signs up mid-flow
  useEffect(() => {
    if (pending && user) {
      setPending(false);
      finalize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pending, user]);

  return (
    <main className="overflow-x-hidden bg-cream-100">
      <Header />

      <section
        className="mx-auto max-w-6xl px-5 pb-20 sm:px-8"
        style={{ paddingTop: "calc(var(--nav-h, 76px) + 2.5rem)" }}
      >
        <Link
          href="/#sortiment"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-soil-600/70 transition-colors hover:text-barn-500"
        >
          <ArrowLeft className="h-4 w-4" />
          {t.cart.continue}
        </Link>

        <h1 className="mt-4 font-display text-3xl font-semibold text-moss-700 sm:text-4xl">
          {t.cart.title}
        </h1>

        {items.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-3xl border border-moss-600/12 bg-cream-50 px-6 py-16 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-moss-50 text-moss-600">
              <ShoppingBasket className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <h2 className="mt-5 font-display text-xl font-semibold text-moss-700">
              {t.cart.empty}
            </h2>
            <p className="mt-2 max-w-sm text-[14px] text-soil-600/75">
              {t.cart.emptySub}
            </p>
            <Link
              href="/#sortiment"
              className="mt-6 rounded-full bg-moss-600 px-6 py-3 text-sm font-semibold text-cream-50 transition-colors hover:bg-moss-500"
            >
              {t.cart.emptyCta}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-7 lg:grid-cols-[1fr_360px]">
            {/* Items */}
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 rounded-2xl border border-moss-600/12 bg-cream-50 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {item.kind === "package" && (
                        <span className="rounded-full bg-wheat-50 px-2 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wide text-wheat-600">
                          {t.cart.pkgLabel}
                        </span>
                      )}
                      <h3 className="truncate font-display text-[15px] font-semibold text-moss-700">
                        {item.name[lang]}
                      </h3>
                    </div>
                    <p className="mt-1 font-mono text-[13px] text-soil-600/70">
                      {item.price} kr
                      {item.unit && (
                        <span className="text-soil-600/50">
                          {t.cart[unitKey[item.unit]]}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Qty stepper */}
                  <div className="flex items-center gap-1 rounded-full border border-moss-600/15 p-1">
                    <button
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label="−"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-moss-600 transition-colors hover:bg-moss-50"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-6 text-center font-mono text-sm font-semibold text-soil-700">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label="+"
                      className="flex h-7 w-7 items-center justify-center rounded-full text-moss-600 transition-colors hover:bg-moss-50"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="hidden w-20 text-right font-mono text-sm font-semibold text-barn-500 sm:block">
                    {item.price * item.qty} kr
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    aria-label={t.cart.remove}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-soil-600/50 transition-colors hover:bg-barn-50 hover:text-barn-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            {/* Summary */}
            <div className="lg:sticky lg:top-[calc(var(--nav-h,76px)+1.5rem)] lg:h-fit">
              <div className="rounded-2xl border border-moss-600/12 bg-cream-50 p-6">
                <h2 className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-moss-600/70">
                  {t.cart.summary}
                </h2>
                <dl className="mt-4 flex flex-col gap-2.5 text-[14px]">
                  <div className="flex justify-between">
                    <dt className="text-soil-600/75">{t.cart.subtotal}</dt>
                    <dd className="font-mono font-semibold text-soil-700">
                      {total} kr
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-soil-600/75">{t.cart.delivery}</dt>
                    <dd className="font-mono font-medium text-moss-600">
                      {t.cart.deliveryFree}
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 flex items-baseline justify-between border-t border-moss-600/10 pt-4">
                  <span className="font-display text-base font-semibold text-moss-700">
                    {t.cart.total}
                  </span>
                  <span className="font-mono text-2xl font-bold text-barn-500">
                    {total} kr
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-5 flex min-h-[50px] w-full items-center justify-center gap-2 rounded-full bg-barn-500 px-5 text-sm font-semibold text-cream-50 transition-colors hover:bg-barn-400"
                >
                  {!user && <Lock className="h-4 w-4" />}
                  {user ? t.cart.checkout : t.cart.loginToCheckout}
                </button>
              </div>

              {showAuth && !user && (
                <div className="mt-4 rounded-2xl border border-moss-600/12 bg-cream-50 p-5">
                  <AuthForm onSuccess={() => { /* effect finalizes */ }} />
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
