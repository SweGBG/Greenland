# Green Land — gårdens marknadsföringssajt

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Hero med fullskärmsvideo
(skogslövverk) som bakgrund, SE/EN-språkväxlare, sortiment med filter,
färdiga matlådor och kontaktformulär.

## Komma igång

```bash
npm install
npm run dev
```

Öppna http://localhost:3000

## Struktur

- `src/app` — layout, globala stilar, sidan
- `src/components` — alla UI-sektioner (Hero, MenuSection, Packages, Contact, m.fl.)
- `src/context/LangContext.tsx` — SE/EN-state, sparas i `localStorage`
- `src/lib/translations.ts` — alla texter på svenska/engelska
- `src/lib/menuData.ts` — sortimentet (ägg, kött, grönsaker, skafferi)
- `src/lib/packagesData.ts` — de tre färdiga matlådorna
- `public/video/forest-canopy.mp4` — hero-bakgrundsvideo (komprimerad från
  originalfilen, 640×1138, h264, ~8 MB, utan ljud, loopar sömlöst)
- `public/images/hero-poster.jpg` — poster-frame som visas innan videon laddat
- `public/images/green-land-farm.jpg` — illustrationen till "Om gården"

## Att göra innan lansering

1. **Kontaktformuläret** skickar inget än — det visar bara en bekräftelse i
   gränssnittet. Koppla `src/components/Contact.tsx` (`handleSubmit`) till en
   route handler i `src/app/api/contact/route.ts` som skickar via Resend, enligt
   er vanliga stack.
2. **Adress/telefon/e-post** i `Contact.tsx` och `Footer.tsx` är platshållare —
   byt till gårdens riktiga uppgifter.
3. **Priser och sortiment** i `menuData.ts` och `packagesData.ts` är exempel —
   byt till verkliga priser. Strukturen är redo att senare kopplas till Supabase
   om ni vill ha ett dynamiskt sortiment eller riktig beställningsflöde +
   Stripe-checkout.
4. **OG-bild/metadata** i `src/app/layout.tsx` — uppdatera titel/beskrivning om
   gårdens namn eller adress ändras.
5. **Kartan** i kontaktsektionen är text/adress än så länge — lägg till en
   inbäddad Google Maps-karta eller en stiliserad illustration om ni vill.

## Tekniska val

- **Typsnitt:** Fraunces (rubriker), Work Sans (brödtext), JetBrains Mono
  (priser/etiketter) — laddas via `next/font/google`, ingen extern fetch.
- **Färgpalett:** djup mossgrön, vetegul, ladu-röd, krämvit — definierad i
  `tailwind.config.ts` under `theme.extend.colors`.
- **Signaturelement:** den handmålade "trätaggen" (`SignTag.tsx`) återanvänds
  som sektionsetikett genom hela sajten, för att spegla gårdsbutikens skyltar.
- **Video:** `<video autoPlay loop muted playsInline>` med `poster` och respekt
  för `prefers-reduced-motion` (pausas automatiskt). Manuell play/pause-knapp
  finns i hero-sektionens nedre högra hörn.
- **Mobilmeny:** slide-down under navbaren (`position: fixed`, `top` = navhöjd,
  `max-height`-transition), aldrig `bottom: 0`.
