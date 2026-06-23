"use client";

import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import clsx from "clsx";

export default function CartButton({ dark }: { dark?: boolean }) {
  const { count } = useCart();
  const { t } = useLang();

  return (
    <Link
      href="/varukorg"
      aria-label={t.cart.badge}
      className={clsx(
        "relative flex h-10 w-10 items-center justify-center rounded-full transition-colors",
        dark
          ? "bg-cream-100/15 text-cream-50 backdrop-blur-sm hover:bg-cream-100/25"
          : "bg-moss-600/10 text-moss-700 hover:bg-moss-600/15"
      )}
    >
      <ShoppingBasket className="h-[18px] w-[18px]" strokeWidth={2} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-barn-500 px-1 text-[10px] font-bold leading-none text-cream-50">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
