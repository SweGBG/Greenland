export type Category = "eggs" | "meat" | "veg" | "pantry";
export type Unit = "kg" | "dozen" | "unit";

export interface Product {
  id: string;
  category: Category;
  name: { sv: string; en: string };
  desc: { sv: string; en: string };
  price: number;
  unit: Unit;
  seasonal?: boolean;
  icon: "egg" | "beef" | "carrot" | "wheat" | "drumstick" | "ham" | "leaf" | "milk";
}

export const products: Product[] = [
  {
    id: "egg-mixed",
    category: "eggs",
    name: { sv: "Blandade hönsägg", en: "Mixed hen eggs" },
    desc: { sv: "Fria höns, blandade storlekar", en: "Free-range hens, mixed sizes" },
    price: 49,
    unit: "dozen",
    icon: "egg",
  },
  {
    id: "egg-duck",
    category: "eggs",
    name: { sv: "Ankägg", en: "Duck eggs" },
    desc: { sv: "Rikare gula, perfekt till bakning", en: "Richer yolks, great for baking" },
    price: 65,
    unit: "dozen",
    seasonal: true,
    icon: "egg",
  },
  {
    id: "dairy-feta",
    category: "eggs",
    name: { sv: "Getfeta", en: "Goat feta" },
    desc: { sv: "Lagrad 6 veckor i saltlake", en: "Aged 6 weeks in brine" },
    price: 89,
    unit: "unit",
    icon: "milk",
  },
  {
    id: "meat-beef",
    category: "meat",
    name: { sv: "Nötfärs, gräsbete", en: "Grass-fed beef mince" },
    desc: { sv: "Highland-nöt, 100% gräsbete", en: "Highland cattle, 100% grass-fed" },
    price: 169,
    unit: "kg",
    icon: "beef",
  },
  {
    id: "meat-chicken",
    category: "meat",
    name: { sv: "Hel kyckling", en: "Whole chicken" },
    desc: { sv: "Frigående, slaktad vid 12 veckor", en: "Free-range, raised 12 weeks" },
    price: 139,
    unit: "kg",
    icon: "drumstick",
  },
  {
    id: "meat-pork",
    category: "meat",
    name: { sv: "Fläskkarré", en: "Pork loin" },
    desc: { sv: "Gris uppvuxen utomhus", en: "Outdoor-raised pigs" },
    price: 159,
    unit: "kg",
    seasonal: true,
    icon: "ham",
  },
  {
    id: "meat-lamb",
    category: "meat",
    name: { sv: "Lammkotletter", en: "Lamb chops" },
    desc: { sv: "Betesdjur från ängarna", en: "Pasture-raised on the meadows" },
    price: 219,
    unit: "kg",
    seasonal: true,
    icon: "ham",
  },
  {
    id: "veg-tomato",
    category: "veg",
    name: { sv: "Tomater, blandade", en: "Mixed tomatoes" },
    desc: { sv: "Sju sorter, mognade i solen", en: "Seven varieties, vine-ripened" },
    price: 59,
    unit: "kg",
    seasonal: true,
    icon: "carrot",
  },
  {
    id: "veg-carrot",
    category: "veg",
    name: { sv: "Morötter", en: "Carrots" },
    desc: { sv: "Med blasten på, jorden kvar", en: "Tops on, a little soil included" },
    price: 35,
    unit: "kg",
    icon: "carrot",
  },
  {
    id: "veg-potato",
    category: "veg",
    name: { sv: "Potatis, mandel", en: "Almond potatoes" },
    desc: { sv: "Gammal svensk sort", en: "Heritage Swedish variety" },
    price: 32,
    unit: "kg",
    icon: "carrot",
  },
  {
    id: "veg-greens",
    category: "veg",
    name: { sv: "Bladmix & kål", en: "Salad greens & cabbage" },
    desc: { sv: "Skördat samma morgon", en: "Harvested the same morning" },
    price: 45,
    unit: "unit",
    icon: "leaf",
  },
  {
    id: "pantry-honey",
    category: "pantry",
    name: { sv: "Gårdshonung", en: "Farm honey" },
    desc: { sv: "Från våra egna kupor", en: "From our own hives" },
    price: 119,
    unit: "unit",
    icon: "wheat",
  },
  {
    id: "pantry-flour",
    category: "pantry",
    name: { sv: "Stenmalet vetemjöl", en: "Stone-milled wheat flour" },
    desc: { sv: "Malet av gårdens egen vete", en: "Milled from our own wheat" },
    price: 55,
    unit: "unit",
    icon: "wheat",
  },
];
