"use client";

import { useState } from "react";
import { useLang } from "@/context/LangContext";
import { useAuth } from "@/context/AuthContext";
import clsx from "clsx";

export default function AuthForm({
  initialMode = "login",
  onSuccess,
  compact = false,
}: {
  initialMode?: "login" | "signup";
  onSuccess?: () => void;
  compact?: boolean;
}) {
  const { t } = useLang();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const a = t.account;

  const errMsg: Record<string, string> = {
    email: a.errEmail,
    password: a.errPassword,
    name: a.errName,
    exists: a.errExists,
    invalid: a.errInvalid,
  };

  function submit() {
    setError(null);
    const res =
      mode === "login"
        ? login(email, password)
        : signup(name, email, password);
    if (res.ok) {
      onSuccess?.();
    } else {
      setError(res.error ? errMsg[res.error] : a.errInvalid);
    }
  }

  function switchMode(next: "login" | "signup") {
    setMode(next);
    setError(null);
  }

  const inputCls =
    "w-full rounded-xl border border-moss-600/15 bg-cream-50 px-3.5 py-2.5 text-sm text-soil-700 placeholder:text-soil-600/40 transition-colors focus:border-wheat-400 focus:outline-none";
  const labelCls =
    "mb-1.5 block text-[12px] font-mono font-medium uppercase tracking-wide text-moss-600/70";

  return (
    <div>
      {/* Tabs */}
      <div className="mb-4 flex rounded-full bg-moss-50 p-0.5">
        <button
          type="button"
          onClick={() => switchMode("login")}
          className={clsx(
            "flex-1 rounded-full py-2 text-[13px] font-semibold transition-colors",
            mode === "login"
              ? "bg-moss-600 text-cream-50"
              : "text-moss-600/70 hover:text-moss-600"
          )}
          aria-pressed={mode === "login"}
        >
          {a.login}
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={clsx(
            "flex-1 rounded-full py-2 text-[13px] font-semibold transition-colors",
            mode === "signup"
              ? "bg-moss-600 text-cream-50"
              : "text-moss-600/70 hover:text-moss-600"
          )}
          aria-pressed={mode === "signup"}
        >
          {a.signup}
        </button>
      </div>

      {!compact && (
        <div className="mb-4">
          <h3 className="font-display text-lg font-semibold text-moss-700">
            {mode === "login" ? a.loginTitle : a.signupTitle}
          </h3>
          <p className="mt-1 text-[13px] leading-snug text-soil-600/75">
            {mode === "login" ? a.loginSub : a.signupSub}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3.5">
        {mode === "signup" && (
          <div>
            <label className={labelCls} htmlFor="af-name">
              {a.name}
            </label>
            <input
              id="af-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={a.namePh}
              className={inputCls}
            />
          </div>
        )}
        <div>
          <label className={labelCls} htmlFor="af-email">
            {a.email}
          </label>
          <input
            id="af-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={a.emailPh}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="af-password">
            {a.password}
          </label>
          <input
            id="af-password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder={a.passwordPh}
            className={inputCls}
          />
        </div>

        {error && (
          <p className="rounded-lg bg-barn-50 px-3 py-2 text-[12.5px] font-medium text-barn-600">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={submit}
          className="mt-1 flex min-h-[46px] items-center justify-center rounded-full bg-barn-500 px-5 text-sm font-semibold text-cream-50 transition-colors hover:bg-barn-400"
        >
          {mode === "login" ? a.loginCta : a.signupCta}
        </button>

        {mode === "login" && (
          <button
            type="button"
            onClick={() => {
              setName("");
              setEmail("demo@greenland.se");
              setPassword("demo123");
              setError(null);
            }}
            className="text-center text-[12px] font-medium text-moss-600/70 underline-offset-2 transition-colors hover:text-moss-600 hover:underline"
          >
            {a.demoTry} →
          </button>
        )}

        <p className="text-center text-[12.5px] text-soil-600/70">
          {mode === "login" ? a.noAccount : a.haveAccount}{" "}
          <button
            type="button"
            onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            className="font-semibold text-moss-600 underline-offset-2 hover:underline"
          >
            {mode === "login" ? a.switchToSignup : a.switchToLogin}
          </button>
        </p>
      </div>
    </div>
  );
}
