"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { CartItem } from "./CartContext";

export type OrderStatus = "processing" | "packed" | "delivered";

export interface Order {
  id: string;
  date: string; // ISO
  items: CartItem[];
  total: number;
  status: OrderStatus;
}

export interface User {
  name: string;
  email: string;
  createdAt: string; // ISO
}

interface StoredUser extends User {
  password: string;
}

interface AuthResult {
  ok: boolean;
  error?: "email" | "password" | "name" | "exists" | "invalid";
}

interface AuthContextValue {
  user: User | null;
  ready: boolean;
  orders: Order[];
  login: (email: string, password: string) => AuthResult;
  signup: (name: string, email: string, password: string) => AuthResult;
  logout: () => void;
  placeOrder: (items: CartItem[], total: number) => Order;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const USERS_KEY = "greenland-users";
const SESSION_KEY = "greenland-session";
const ordersKey = (email: string) => `greenland-orders-${email.toLowerCase()}`;

function readUsers(): Record<string, StoredUser> {
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeUsers(users: Record<string, StoredUser>) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/* ------------------------------------------------------------------ *
 * Embedded demo account
 * Baked into the bundle so the demo is identical on every device —
 * anyone can log in at demo@greenland.se / demo123 and see a filled
 * order history without first creating an account on that device.
 * ------------------------------------------------------------------ */
const DEMO_EMAIL = "demo@greenland.se";
const DEMO_PASSWORD = "demo123";

const daysAgo = (n: number) =>
  new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

const DEMO_USER: StoredUser = {
  name: "Demo Andersson",
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
  createdAt: daysAgo(96),
};

const DEMO_ORDERS: Order[] = [
  {
    id: "GL-204815",
    date: daysAgo(24),
    status: "delivered",
    total: 644,
    items: [
      {
        id: "kottlada",
        kind: "package",
        name: { sv: "Köttlådan", en: "The Meat Box" },
        price: 595,
        qty: 1,
      },
      {
        id: "egg-mixed",
        kind: "product",
        name: { sv: "Blandade hönsägg", en: "Mixed hen eggs" },
        price: 49,
        unit: "dozen",
        qty: 1,
      },
    ],
  },
  {
    id: "GL-209372",
    date: daysAgo(9),
    status: "delivered",
    total: 532,
    items: [
      {
        id: "veckolada",
        kind: "package",
        name: { sv: "Veckolådan", en: "The Weekly Box" },
        price: 295,
        qty: 1,
      },
      {
        id: "pantry-honey",
        kind: "product",
        name: { sv: "Gårdshonung", en: "Farm honey" },
        price: 119,
        unit: "unit",
        qty: 1,
      },
      {
        id: "dairy-feta",
        kind: "product",
        name: { sv: "Getfeta", en: "Goat feta" },
        price: 89,
        unit: "unit",
        qty: 1,
      },
      {
        id: "veg-carrot",
        kind: "product",
        name: { sv: "Morötter", en: "Carrots" },
        price: 35,
        unit: "kg",
        qty: 1,
      },
    ],
  },
  {
    id: "GL-212640",
    date: daysAgo(2),
    status: "packed",
    total: 432,
    items: [
      {
        id: "meat-beef",
        kind: "product",
        name: { sv: "Nötfärs, gräsbete", en: "Grass-fed beef mince" },
        price: 169,
        unit: "kg",
        qty: 2,
      },
      {
        id: "veg-tomato",
        kind: "product",
        name: { sv: "Tomater, blandade", en: "Mixed tomatoes" },
        price: 59,
        unit: "kg",
        qty: 1,
      },
      {
        id: "veg-greens",
        kind: "product",
        name: { sv: "Bladmix & kål", en: "Salad greens & cabbage" },
        price: 45,
        unit: "unit",
        qty: 1,
      },
    ],
  },
];

const isDemo = (email: string) => email.toLowerCase() === DEMO_EMAIL;

/** Seed orders for an account that has never placed one on this device. */
function seedOrdersFor(email: string): Order[] {
  return isDemo(email) ? DEMO_ORDERS.map((o) => ({ ...o })) : [];
}

/**
 * Load a user's orders. If nothing has been stored on this device yet,
 * fall back to any embedded seed orders (so the demo account is never empty).
 * Once an order is placed, the stored key takes over and seed is no longer used.
 */
function loadOrders(email: string): Order[] {
  try {
    const raw = window.localStorage.getItem(ordersKey(email));
    if (raw !== null) return JSON.parse(raw);
  } catch {
    /* ignore corrupt storage */
  }
  return seedOrdersFor(email);
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ready, setReady] = useState(false);

  // Restore session on mount
  useEffect(() => {
    try {
      const email = window.localStorage.getItem(SESSION_KEY);
      if (email) {
        const stored = isDemo(email) ? DEMO_USER : readUsers()[email.toLowerCase()];
        if (stored) {
          const { password: _pw, ...safe } = stored;
          void _pw;
          setUser(safe);
          setOrders(loadOrders(email));
        }
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string): AuthResult => {
    if (!emailRe.test(email)) return { ok: false, error: "email" };
    if (password.length < 6) return { ok: false, error: "password" };
    const stored = isDemo(email) ? DEMO_USER : readUsers()[email.toLowerCase()];
    if (!stored || stored.password !== password)
      return { ok: false, error: "invalid" };
    const { password: _pw, ...safe } = stored;
    void _pw;
    window.localStorage.setItem(SESSION_KEY, safe.email.toLowerCase());
    setUser(safe);
    setOrders(loadOrders(safe.email));
    return { ok: true };
  }, []);

  const signup = useCallback(
    (name: string, email: string, password: string): AuthResult => {
      if (name.trim().length < 2) return { ok: false, error: "name" };
      if (!emailRe.test(email)) return { ok: false, error: "email" };
      if (password.length < 6) return { ok: false, error: "password" };
      const key = email.toLowerCase();
      if (isDemo(email)) return { ok: false, error: "exists" };
      const users = readUsers();
      if (users[key]) return { ok: false, error: "exists" };
      const newUser: StoredUser = {
        name: name.trim(),
        email,
        password,
        createdAt: new Date().toISOString(),
      };
      users[key] = newUser;
      writeUsers(users);
      window.localStorage.setItem(SESSION_KEY, key);
      const { password: _pw, ...safe } = newUser;
      void _pw;
      setUser(safe);
      setOrders([]);
      return { ok: true };
    },
    []
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
    setOrders([]);
  }, []);

  const placeOrder = useCallback(
    (items: CartItem[], total: number): Order => {
      const order: Order = {
        id: `GL-${Date.now().toString().slice(-6)}`,
        date: new Date().toISOString(),
        items,
        total,
        status: "processing",
      };
      if (user) {
        const next = [order, ...loadOrders(user.email)];
        window.localStorage.setItem(ordersKey(user.email), JSON.stringify(next));
        setOrders(next);
      }
      return order;
    },
    [user]
  );

  const value = useMemo<AuthContextValue>(
    () => ({ user, ready, orders, login, signup, logout, placeOrder }),
    [user, ready, orders, login, signup, logout, placeOrder]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
