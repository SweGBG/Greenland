export interface FarmPackage {
  id: string;
  tier: "small" | "medium" | "large";
  name: { sv: string; en: string };
  tagline: { sv: string; en: string };
  price: number;
  weight: { sv: string; en: string };
  popular?: boolean;
  includes: { sv: string[]; en: string[] };
}

export const packages: FarmPackage[] = [
  {
    id: "veckolada",
    tier: "small",
    name: { sv: "Veckolådan", en: "The Weekly Box" },
    tagline: { sv: "Grönsaker för en hushåll", en: "Vegetables for one household" },
    price: 295,
    weight: { sv: "~5 kg", en: "~5 kg" },
    includes: {
      sv: ["Säsongens grönsaker", "Bladmix eller kål", "Ett dussin ägg", "Receptkort"],
      en: ["Seasonal vegetables", "Salad greens or cabbage", "A dozen eggs", "Recipe card"],
    },
  },
  {
    id: "kottlada",
    tier: "medium",
    name: { sv: "Köttlådan", en: "The Meat Box" },
    tagline: { sv: "Blandat kött för två veckor", en: "Mixed meat for two weeks" },
    price: 595,
    weight: { sv: "~6 kg", en: "~6 kg" },
    popular: true,
    includes: {
      sv: ["Nötfärs & grytbitar", "Hel kyckling", "Fläskkarré eller lamm", "2 dussin ägg"],
      en: ["Beef mince & stew cuts", "Whole chicken", "Pork loin or lamb", "2 dozen eggs"],
    },
  },
  {
    id: "allilada",
    tier: "large",
    name: { sv: "Allt-i-allo-lådan", en: "The Everything Box" },
    tagline: { sv: "Hela gården i en leverans", en: "The whole farm in one delivery" },
    price: 895,
    weight: { sv: "~10 kg", en: "~10 kg" },
    includes: {
      sv: ["Allt ur Veckolådan", "Allt ur Köttlådan", "Honung & gårdsmjöl", "Getfeta"],
      en: ["Everything in the Weekly Box", "Everything in the Meat Box", "Honey & farm flour", "Goat feta"],
    },
  },
];
