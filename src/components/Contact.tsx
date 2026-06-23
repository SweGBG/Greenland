"use client";

import { useState, type FormEvent } from "react";
import { MapPin, Clock, Mail, Phone, Send } from "lucide-react";
import { useLang } from "@/context/LangContext";
import SignTag from "./SignTag";
import Reveal from "./Reveal";

export default function Contact() {
  const { t } = useLang();
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: koppla till /api/contact + Resend när backend är på plats.
    setSent(true);
  }

  return (
    <section id="kontakt" className="bg-moss-50/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SignTag>{t.contact.eyebrow}</SignTag>
          <h2 className="mt-5 font-display text-3xl font-semibold text-moss-700 sm:text-4xl md:text-[2.6rem]">
            {t.contact.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
          <Reveal className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-2xl border border-moss-600/12 bg-cream-50 p-6">
              <div className="flex items-center gap-2.5 text-moss-700">
                <Clock className="h-[18px] w-[18px]" />
                <h3 className="font-display text-base font-semibold">{t.contact.hours}</h3>
              </div>
              <dl className="mt-4 flex flex-col gap-2 text-[14px]">
                <div className="flex justify-between border-b border-moss-600/10 pb-2">
                  <dt className="text-soil-600/70">{t.contact.mon}</dt>
                  <dd className="font-mono text-soil-700">09–18</dd>
                </div>
                <div className="flex justify-between border-b border-moss-600/10 pb-2">
                  <dt className="text-soil-600/70">{t.contact.sat}</dt>
                  <dd className="font-mono text-soil-700">09–14</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-soil-600/70">{t.contact.sun}</dt>
                  <dd className="font-mono text-soil-700">{t.contact.closed}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-moss-600/12 bg-cream-50 p-6">
              <div className="flex items-center gap-2.5 text-moss-700">
                <MapPin className="h-[18px] w-[18px]" />
                <h3 className="font-display text-base font-semibold">{t.contact.address}</h3>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed text-soil-600/85">
                Green Land Gård<br />
                Lantgårdsvägen 14<br />
                442 00 Kungälv
              </p>
              <div className="mt-4 flex flex-col gap-2 border-t border-moss-600/10 pt-4 text-[14px]">
                <a href="tel:+46300000000" className="flex items-center gap-2.5 text-soil-700 hover:text-barn-500">
                  <Phone className="h-4 w-4" /> 0300-00 00 00
                </a>
                <a href="mailto:hej@greenland.se" className="flex items-center gap-2.5 text-soil-700 hover:text-barn-500">
                  <Mail className="h-4 w-4" /> hej@greenland.se
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-2xl border border-moss-600/12 bg-cream-50 p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-moss-700">
                {t.contact.formTitle}
              </h3>

              {sent ? (
                <div className="mt-6 rounded-xl bg-moss-50 p-5 text-[14px] text-moss-700">
                  {t.contact.sent}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="flex flex-col gap-1.5 text-[13px] font-medium text-soil-600/80">
                      {t.contact.name}
                      <input
                        required
                        type="text"
                        className="min-h-[48px] rounded-lg border border-moss-600/20 bg-cream-50 px-3.5 text-[15px] text-soil-700 outline-none transition-colors focus:border-wheat-400"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-[13px] font-medium text-soil-600/80">
                      {t.contact.email}
                      <input
                        required
                        type="email"
                        className="min-h-[48px] rounded-lg border border-moss-600/20 bg-cream-50 px-3.5 text-[15px] text-soil-700 outline-none transition-colors focus:border-wheat-400"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5 text-[13px] font-medium text-soil-600/80">
                    {t.contact.message}
                    <textarea
                      required
                      rows={4}
                      className="rounded-lg border border-moss-600/20 bg-cream-50 px-3.5 py-3 text-[15px] text-soil-700 outline-none transition-colors focus:border-wheat-400"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-1 flex min-h-[48px] items-center justify-center gap-2 self-start rounded-full bg-barn-500 px-6 text-sm font-semibold text-cream-50 transition-colors hover:bg-barn-400"
                  >
                    <Send className="h-4 w-4" />
                    {t.contact.send}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
