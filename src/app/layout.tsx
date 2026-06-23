import type { Metadata } from "next";
import { LangProvider } from "@/context/LangContext";

// Lokala fonter via @fontsource — ingen build-tid-fetch till Google.
// Variable fonts: en fil per familj täcker alla vikter.
import "@fontsource-variable/fraunces";
import "@fontsource-variable/work-sans";
import "@fontsource-variable/jetbrains-mono";

import "./globals.css";

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
    <html lang="sv">
      <body
        className="font-body antialiased"
        style={{ "--nav-h": "76px" } as React.CSSProperties}
      >
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}