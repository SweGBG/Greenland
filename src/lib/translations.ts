export type Lang = "sv" | "en";

export interface Translations {
  nav: {
    about: string;
    menu: string;
    packages: string;
    how: string;
    reviews: string;
    contact: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  ticker: string[];
  about: {
    eyebrow: string;
    title: string;
    p1: string;
    p2: string;
    stat1n: string;
    stat1l: string;
    stat2n: string;
    stat2l: string;
    stat3n: string;
    stat3l: string;
  };
  menu: {
    eyebrow: string;
    title: string;
    sub: string;
    filters: {
      all: string;
      eggs: string;
      meat: string;
      veg: string;
      pantry: string;
    };
    addToOrder: string;
    perKg: string;
    perDozen: string;
    perUnit: string;
    seasonal: string;
  };
  packages: {
    eyebrow: string;
    title: string;
    sub: string;
    cta: string;
    popular: string;
    includes: string;
  };
  how: {
    eyebrow: string;
    title: string;
    step1t: string;
    step1d: string;
    step2t: string;
    step2d: string;
    step3t: string;
    step3d: string;
  };
  reviews: {
    eyebrow: string;
    title: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    hours: string;
    mon: string;
    sat: string;
    sun: string;
    closed: string;
    address: string;
    formTitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sent: string;
  };
  footer: {
    tagline: string;
    links: string;
    contact: string;
    rights: string;
    made: string;
  };
  account: {
    account: string;
    login: string;
    signup: string;
    logout: string;
    myAccount: string;
    orderHistory: string;
    greeting: string;
    loginTitle: string;
    loginSub: string;
    signupTitle: string;
    signupSub: string;
    name: string;
    email: string;
    password: string;
    namePh: string;
    emailPh: string;
    passwordPh: string;
    loginCta: string;
    signupCta: string;
    noAccount: string;
    haveAccount: string;
    switchToSignup: string;
    switchToLogin: string;
    errEmail: string;
    errPassword: string;
    errName: string;
    errExists: string;
    errInvalid: string;
    demoTry: string;
  };
  cart: {
    title: string;
    badge: string;
    empty: string;
    emptySub: string;
    emptyCta: string;
    qty: string;
    remove: string;
    perKg: string;
    perDozen: string;
    perUnit: string;
    summary: string;
    subtotal: string;
    delivery: string;
    deliveryFree: string;
    total: string;
    checkout: string;
    continue: string;
    added: string;
    loginToCheckout: string;
    pkgLabel: string;
  };
  member: {
    title: string;
    welcome: string;
    profileTitle: string;
    memberSince: string;
    ordersTitle: string;
    noOrders: string;
    noOrdersCta: string;
    order: string;
    placed: string;
    status: string;
    statusProcessing: string;
    statusPacked: string;
    statusDelivered: string;
    items: string;
    orderTotal: string;
    loginRequired: string;
    loginRequiredSub: string;
    loginRequiredCta: string;
    backToShop: string;
  };
  demo: {
    reset: string;
    confirm: string;
    yes: string;
    cancel: string;
  };
}

export const translations: Record<Lang, Translations> = {
  sv: {
    nav: {
      about: "Gården",
      menu: "Sortiment",
      packages: "Lådor",
      how: "Så funkar det",
      reviews: "Omdömen",
      contact: "Kontakt",
      cta: "Beställ nu",
    },
    hero: {
      eyebrow: "Ekologiskt lantbruk · Sedan jorden minns",
      title1: "Mat som vuxit",
      title2: "i sin egen takt.",
      sub: "Grönsaker, ägg och kött från Green Land — odlat, fodrat och skördat på gården, utan mellanhänder och utan genvägar.",
      ctaPrimary: "Se sortimentet",
      ctaSecondary: "Boka gårdsbesök",
      scroll: "Skrolla",
    },
    ticker: [
      "EKOLOGISKT CERTIFIERAT",
      "SKÖRDAT DENNA VECKA",
      "INGA MELLANHÄNDER",
      "DJUR PÅ BETE ÅRET RUNT",
      "HANDPLOCKAT PÅ GÅRDEN",
      "0 MIL TILL NÄRMASTE FÅGEL",
    ],
    about: {
      eyebrow: "Om gården",
      title: "Tre generationer, en jord.",
      p1: "Green Land ligger där skogen möter fälten — åtta hektar grönsaksland, betesmark och en gammal lada som fortfarande doftar hö. Vi odlar utan konstgödsel, roterar grödorna efter säsong och låter djuren göra det jobb maskiner inte kan.",
      p2: "Det vi inte säljer på gården levereras samma vecka det skördas. Inget lager, inget kylhus i flera led — bara mat som hunnit vara mat hela vägen.",
      stat1n: "8 ha",
      stat1l: "odlad mark",
      stat2n: "0",
      stat2l: "mellanhänder",
      stat3n: "100%",
      stat3l: "ekologiskt foder",
    },
    menu: {
      eyebrow: "Sortimentet",
      title: "Från jord och hage, varje vecka.",
      sub: "Tillgängligheten varierar med säsongen — det är poängen.",
      filters: {
        all: "Allt",
        eggs: "Ägg & mejeri",
        meat: "Kött",
        veg: "Grönsaker",
        pantry: "Skafferi",
      },
      addToOrder: "Lägg i beställning",
      perKg: "/kg",
      perDozen: "/dussin",
      perUnit: "/st",
      seasonal: "Säsong",
    },
    packages: {
      eyebrow: "Färdiga lådor",
      title: "Ingen lista. Bara en låda på trappen.",
      sub: "Tre storlekar, packade efter vad gården gett den veckan.",
      cta: "Välj låda",
      popular: "Mest populär",
      includes: "Innehåller bland annat",
    },
    how: {
      eyebrow: "Beställning",
      title: "Från fält till köksbord på tre steg.",
      step1t: "Välj din låda",
      step1d: "Plocka en färdig låda eller bygg din egen från sortimentet.",
      step2t: "Vi packar fredag",
      step2d: "Allt skördas, slaktas eller samlas in samma vecka du beställer.",
      step3t: "Hämta eller få den levererad",
      step3d: "Avhämtning vid gården lördag förmiddag, eller leverans inom 3 mil.",
    },
    reviews: {
      eyebrow: "Vad kunderna säger",
      title: "Det märks i smaken.",
    },
    contact: {
      eyebrow: "Hitta hit",
      title: "Kontakt & öppettider",
      hours: "Öppettider gårdsbutik",
      mon: "Mån–Fre",
      sat: "Lördag",
      sun: "Söndag",
      closed: "Stängt",
      address: "Adress",
      formTitle: "Skicka en förfrågan",
      name: "Namn",
      email: "E-post",
      message: "Meddelande",
      send: "Skicka",
      sent: "Tack! Vi hör av oss inom 1–2 dagar.",
    },
    footer: {
      tagline: "Ekologiskt lantbruk utanför Göteborg.",
      links: "Snabblänkar",
      contact: "Kontakt",
      rights: "Alla rättigheter förbehållna.",
      made: "Byggd av",
    },
    account: {
      account: "Konto",
      login: "Logga in",
      signup: "Skapa konto",
      logout: "Logga ut",
      myAccount: "Mitt konto",
      orderHistory: "Orderhistorik",
      greeting: "Hej",
      loginTitle: "Välkommen tillbaka",
      loginSub: "Logga in för att se dina ordrar och favoriter.",
      signupTitle: "Bli medlem",
      signupSub: "Skapa ett konto så minns vi din låda till nästa vecka.",
      name: "Namn",
      email: "E-post",
      password: "Lösenord",
      namePh: "Anna Andersson",
      emailPh: "du@exempel.se",
      passwordPh: "Minst 6 tecken",
      loginCta: "Logga in",
      signupCta: "Skapa konto",
      noAccount: "Inget konto än?",
      haveAccount: "Har du redan ett konto?",
      switchToSignup: "Skapa ett",
      switchToLogin: "Logga in",
      errEmail: "Ange en giltig e-postadress.",
      errPassword: "Lösenordet måste vara minst 6 tecken.",
      errName: "Ange ditt namn.",
      errExists: "Det finns redan ett konto med den e-posten.",
      errInvalid: "Fel e-post eller lösenord.",
      demoTry: "Fyll i demokonto",
    },
    cart: {
      title: "Din varukorg",
      badge: "Varukorg",
      empty: "Varukorgen är tom",
      emptySub: "Lägg till något från sortimentet eller välj en färdig låda.",
      emptyCta: "Till sortimentet",
      qty: "Antal",
      remove: "Ta bort",
      perKg: "/kg",
      perDozen: "/dussin",
      perUnit: "/st",
      summary: "Sammanfattning",
      subtotal: "Delsumma",
      delivery: "Leverans",
      deliveryFree: "Ingår",
      total: "Att betala",
      checkout: "Slutför beställning",
      continue: "Fortsätt handla",
      added: "Tillagd i varukorgen",
      loginToCheckout: "Logga in för att slutföra",
      pkgLabel: "Låda",
    },
    member: {
      title: "Mitt konto",
      welcome: "Välkommen",
      profileTitle: "Profil",
      memberSince: "Medlem sedan",
      ordersTitle: "Orderhistorik",
      noOrders: "Du har inga ordrar än.",
      noOrdersCta: "Handla från gården",
      order: "Order",
      placed: "Lagd",
      status: "Status",
      statusProcessing: "Behandlas",
      statusPacked: "Packad",
      statusDelivered: "Levererad",
      items: "Varor",
      orderTotal: "Summa",
      loginRequired: "Logga in för att se ditt konto",
      loginRequiredSub: "Här samlas dina ordrar, din profil och din historik.",
      loginRequiredCta: "Logga in",
      backToShop: "Tillbaka till gården",
    },
    demo: {
      reset: "Återställ demo",
      confirm: "Nollställ allt?",
      yes: "Ja, nollställ",
      cancel: "Avbryt",
    },
  },
  en: {
    nav: {
      about: "The farm",
      menu: "Produce",
      packages: "Boxes",
      how: "How it works",
      reviews: "Reviews",
      contact: "Contact",
      cta: "Order now",
    },
    hero: {
      eyebrow: "Organic farming · Since the soil remembers",
      title1: "Food grown",
      title2: "at its own pace.",
      sub: "Vegetables, eggs and meat from Green Land — grown, raised and harvested on the farm, with no middlemen and no shortcuts.",
      ctaPrimary: "See the produce",
      ctaSecondary: "Book a farm visit",
      scroll: "Scroll",
    },
    ticker: [
      "CERTIFIED ORGANIC",
      "HARVESTED THIS WEEK",
      "NO MIDDLEMEN",
      "PASTURE-RAISED YEAR ROUND",
      "HAND-PICKED ON THE FARM",
      "0 MILES TO THE NEAREST BIRD",
    ],
    about: {
      eyebrow: "About the farm",
      title: "Three generations, one soil.",
      p1: "Green Land sits where the forest meets the fields — eight hectares of vegetable beds, pasture and an old barn that still smells of hay. We farm without synthetic fertiliser, rotate crops with the seasons, and let the animals do the work machines can't.",
      p2: "Whatever we don't sell at the farm stand goes out the same week it's harvested. No warehouse, no chain of cold stores — just food that got to stay food the whole way.",
      stat1n: "8 ha",
      stat1l: "farmed land",
      stat2n: "0",
      stat2l: "middlemen",
      stat3n: "100%",
      stat3l: "organic feed",
    },
    menu: {
      eyebrow: "The produce",
      title: "From soil and pasture, every week.",
      sub: "Availability shifts with the season — that's the point.",
      filters: {
        all: "All",
        eggs: "Eggs & dairy",
        meat: "Meat",
        veg: "Vegetables",
        pantry: "Pantry",
      },
      addToOrder: "Add to order",
      perKg: "/kg",
      perDozen: "/dozen",
      perUnit: "/each",
      seasonal: "In season",
    },
    packages: {
      eyebrow: "Ready-made boxes",
      title: "No list. Just a box on the step.",
      sub: "Three sizes, packed around whatever the farm gave us that week.",
      cta: "Choose box",
      popular: "Most popular",
      includes: "Typically includes",
    },
    how: {
      eyebrow: "Ordering",
      title: "From field to kitchen table in three steps.",
      step1t: "Pick your box",
      step1d: "Choose a ready-made box or build your own from the produce list.",
      step2t: "We pack on Friday",
      step2d: "Everything is harvested, raised or gathered the same week you order.",
      step3t: "Pick up or get it delivered",
      step3d: "Farm-stand pickup Saturday morning, or delivery within 20 miles.",
    },
    reviews: {
      eyebrow: "What customers say",
      title: "You can taste the difference.",
    },
    contact: {
      eyebrow: "Find us",
      title: "Contact & opening hours",
      hours: "Farm shop hours",
      mon: "Mon–Fri",
      sat: "Saturday",
      sun: "Sunday",
      closed: "Closed",
      address: "Address",
      formTitle: "Send an enquiry",
      name: "Name",
      email: "Email",
      message: "Message",
      send: "Send",
      sent: "Thanks! We'll get back to you within 1–2 days.",
    },
    footer: {
      tagline: "Organic farming outside Gothenburg.",
      links: "Quick links",
      contact: "Contact",
      rights: "All rights reserved.",
      made: "Built by",
    },
    account: {
      account: "Account",
      login: "Log in",
      signup: "Sign up",
      logout: "Log out",
      myAccount: "My account",
      orderHistory: "Order history",
      greeting: "Hi",
      loginTitle: "Welcome back",
      loginSub: "Log in to see your orders and favourites.",
      signupTitle: "Become a member",
      signupSub: "Create an account and we'll remember your box for next week.",
      name: "Name",
      email: "Email",
      password: "Password",
      namePh: "Anna Andersson",
      emailPh: "you@example.com",
      passwordPh: "At least 6 characters",
      loginCta: "Log in",
      signupCta: "Create account",
      noAccount: "No account yet?",
      haveAccount: "Already have an account?",
      switchToSignup: "Create one",
      switchToLogin: "Log in",
      errEmail: "Enter a valid email address.",
      errPassword: "Password must be at least 6 characters.",
      errName: "Please enter your name.",
      errExists: "An account with that email already exists.",
      errInvalid: "Wrong email or password.",
      demoTry: "Fill in demo account",
    },
    cart: {
      title: "Your cart",
      badge: "Cart",
      empty: "Your cart is empty",
      emptySub: "Add something from the produce list or pick a ready-made box.",
      emptyCta: "Browse the produce",
      qty: "Qty",
      remove: "Remove",
      perKg: "/kg",
      perDozen: "/dozen",
      perUnit: "/each",
      summary: "Summary",
      subtotal: "Subtotal",
      delivery: "Delivery",
      deliveryFree: "Included",
      total: "Total",
      checkout: "Place order",
      continue: "Continue shopping",
      added: "Added to cart",
      loginToCheckout: "Log in to check out",
      pkgLabel: "Box",
    },
    member: {
      title: "My account",
      welcome: "Welcome",
      profileTitle: "Profile",
      memberSince: "Member since",
      ordersTitle: "Order history",
      noOrders: "You don't have any orders yet.",
      noOrdersCta: "Shop from the farm",
      order: "Order",
      placed: "Placed",
      status: "Status",
      statusProcessing: "Processing",
      statusPacked: "Packed",
      statusDelivered: "Delivered",
      items: "Items",
      orderTotal: "Total",
      loginRequired: "Log in to see your account",
      loginRequiredSub: "This is where your orders, profile and history live.",
      loginRequiredCta: "Log in",
      backToShop: "Back to the farm",
    },
    demo: {
      reset: "Reset demo",
      confirm: "Clear everything?",
      yes: "Yes, clear it",
      cancel: "Cancel",
    },
  },
};
