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
function readOrders(email: string): Order[] {
  try {
    return JSON.parse(window.localStorage.getItem(ordersKey(email)) || "[]");
  } catch {
    return [];
  }
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
        const stored = readUsers()[email.toLowerCase()];
        if (stored) {
          const { password: _pw, ...safe } = stored;
          void _pw;
          setUser(safe);
          setOrders(readOrders(email));
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
    const stored = readUsers()[email.toLowerCase()];
    if (!stored || stored.password !== password)
      return { ok: false, error: "invalid" };
    const { password: _pw, ...safe } = stored;
    void _pw;
    window.localStorage.setItem(SESSION_KEY, safe.email.toLowerCase());
    setUser(safe);
    setOrders(readOrders(safe.email));
    return { ok: true };
  }, []);

  const signup = useCallback(
    (name: string, email: string, password: string): AuthResult => {
      if (name.trim().length < 2) return { ok: false, error: "name" };
      if (!emailRe.test(email)) return { ok: false, error: "email" };
      if (password.length < 6) return { ok: false, error: "password" };
      const users = readUsers();
      const key = email.toLowerCase();
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
        const next = [order, ...readOrders(user.email)];
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
