import type { Metadata } from "next";
import { Fraunces, Work_Sans, JetBrains_Mono } from "next/font/google";
import { LangProvider } from "@/context/LangContext";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-worksans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jbMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Green Land — Ekologisk gård & gårdsbutik",
  description:
    "Grönsaker, ägg och kött från Green Land. Ekologiskt odlat, fodrat och skördat på gården utanför Göteborg — utan mellanhänder.",
  openGraph: {
    title: "Green Land — Ekologisk gård & gårdsbutik",
    description:
      "Grönsaker, ägg och kött odlat på gården. Beställ en färdig matlåda eller besök gårdsbutiken.",
    images: ["/images/green-land-farm.jpg"],
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${fraunces.variable} ${workSans.variable} ${jbMono.variable}`}>
      <body
        className="font-body antialiased"
        style={{ "--nav-h": "76px" } as React.CSSProperties}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
