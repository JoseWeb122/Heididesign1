/* ————————————————————————————————————————
   Maison Fête — catalog data (frontend mock)
———————————————————————————————————————— */

/** Pexels image URL builder with exact crops for art direction */
export const px = (id: number, w = 1200, h?: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${h ? `&h=${h}&fit=crop` : ""}`;

export type CategoryId =
  | "favors"
  | "centerpieces"
  | "jewelry"
  | "candles"
  | "supplies"
  | "custom";

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  img: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: CategoryId;
  rating: number;
  reviews: number;
  images: [number, number];
  occasions: string[];
  blurb: string;
  description: string;
  details: string[];
  bestseller?: boolean;
  isNew?: boolean;
  customizable?: boolean;
  options?: { label: string; choices: string[] };
}

export const CATEGORIES: Category[] = [
  { id: "favors", name: "Party Favors", tagline: "Keepsakes guests treasure long after the last toast.", img: 36663545 },
  { id: "centerpieces", name: "Centerpieces", tagline: "Sculptural table moments that anchor the room.", img: 29040932 },
  { id: "jewelry", name: "Jewelry", tagline: "Hand-strung pieces, made slowly and one at a time.", img: 10973399 },
  { id: "candles", name: "Chocolate Candles", tagline: "Dessert-inspired pours in heart & blossom forms.", img: 28176437 },
  { id: "supplies", name: "Party Supplies", tagline: "Curated table kits, garlands and finishing touches.", img: 14457430 },
  { id: "custom", name: "Custom Creations", tagline: "One-of-one pieces designed around your story.", img: 10474291 },
];

export const PRODUCTS: Product[] = [
  {
    id: "luxury-pearl-favor",
    name: "Luxury Pearl Party Favor",
    price: 28,
    category: "favors",
    rating: 4.9,
    reviews: 212,
    images: [36663545, 36663543],
    occasions: ["weddings", "bridal", "baby"],
    blurb: "A pearl-finished keepsake box tied in silk, filled with gold-wrapped chocolates.",
    description:
      "Our signature favor: a pearl-lacquered box hand-tied with double-faced satin ribbon, housing four gold-wrapped Belgian chocolate hearts and a hand-lettered tag with your guests' names.",
    details: ["Set of 10 boxed favors", "Belgian chocolate hearts, gold foil", "Personalized hand-lettered tags", "Ribbon in your choice of palette", "Ships within 5–7 business days"],
    bestseller: true,
    customizable: true,
    options: { label: "Ribbon palette", choices: ["Ivory Pearl", "Blush", "Sage", "Ink Blue"] },
  },
  {
    id: "crystal-centerpiece",
    name: "Crystal Celebration Centerpiece",
    price: 65,
    category: "centerpieces",
    rating: 5.0,
    reviews: 98,
    images: [29040932, 17315407],
    occasions: ["weddings", "anniversaries", "corporate"],
    blurb: "Cut-crystal votives and ivory florals arranged to catch candlelight.",
    description:
      "A low, luminous arrangement of cut-crystal votives, hand-poured ivory candles and seasonal white blooms — designed to sit below sightlines so conversation flows across the table.",
    details: ["Approx. 16\" diameter, low profile", "Cut-crystal votives included", "Fresh-look premium faux florals", "Candlelight-safe, drip-free pillars", "Ships within 3–5 business days"],
    bestseller: true,
  },
  {
    id: "charm-bracelet",
    name: "Handcrafted Charm Bracelet",
    price: 42,
    category: "jewelry",
    rating: 4.8,
    reviews: 167,
    images: [10973399, 11051718],
    occasions: ["gifts", "bridal"],
    blurb: "Hand-strung gemstones and a single gold initial charm of your choosing.",
    description:
      "Strung by hand in our studio: faceted gemstones, freshwater pearls and one 14k gold-plated initial charm. A keepsake your bridesmaids — or you — will actually wear again.",
    details: ["Faceted gemstones & freshwater pearls", "14k gold-plated initial charm", "Hand-strung on jeweler's elastic", "Arrives in a linen keepsake pouch", "Ships within 3–5 business days"],
    bestseller: true,
    customizable: true,
    options: { label: "Stone", choices: ["Moonstone", "Rose Quartz", "Labradorite", "Onyx"] },
  },
  {
    id: "signature-chocolate-candle",
    name: "Signature Chocolate Candle",
    price: 24,
    category: "candles",
    rating: 4.9,
    reviews: 301,
    images: [27089756, 28176437],
    occasions: ["birthdays", "gifts", "holidays"],
    blurb: "A cocoa-butter soy pour shaped like a chocolate heart, scented with vanilla & amber.",
    description:
      "Our most-loved pour: a sculptural chocolate-heart candle in creamy soy with notes of cocoa, vanilla bean and warm amber. Burns for 18 hours — or sits pretty, unlit, forever.",
    details: ["100% soy wax, cotton wick", "Cocoa, vanilla bean & amber", "18-hour burn time", "Gift-wrapped in tissue & ribbon", "Ships within 2–4 business days"],
    bestseller: true,
    customizable: true,
    options: { label: "Finish", choices: ["Ivory", "Cocoa", "Blush"] },
  },
  {
    id: "birthday-favor-set",
    name: "Elegant Birthday Favor Set",
    price: 36,
    category: "favors",
    rating: 4.7,
    reviews: 89,
    images: [7180609, 14457438],
    occasions: ["birthdays"],
    blurb: "Twelve petal-tied favor cups with confetti, matches and a birthday candle.",
    description:
      "A dozen petite favor cups in petal pink and cream, each holding a mini celebration candle, a book of gold foil matches and a sprinkle of biodegradable confetti.",
    details: ["Set of 12 favor cups", "Mini candle & gold matches in each", "Biodegradable petal confetti", "Custom age or initial tags", "Ships within 4–6 business days"],
    isNew: true,
    customizable: true,
  },
  {
    id: "golden-gift-box",
    name: "Golden Celebration Gift Box",
    price: 58,
    category: "custom",
    rating: 4.9,
    reviews: 143,
    images: [34972176, 31496295],
    occasions: ["gifts", "holidays", "anniversaries"],
    blurb: "A keepsake gold box layered with a candle, truffles and a handwritten note.",
    description:
      "Our gilded gifting moment: a rigid gold-foil keepsake box layered with a chocolate-heart candle, six champagne truffles, a silk ribbon and your message, penned by hand.",
    details: ["Rigid gold-foil keepsake box", "Chocolate-heart candle & truffles", "Hand-lettered message card", "Silk ribbon in your palette", "Ships within 3–5 business days"],
    customizable: true,
  },
  {
    id: "blossom-brass-centerpiece",
    name: "Blossom & Brass Centerpiece",
    price: 72,
    category: "centerpieces",
    rating: 4.9,
    reviews: 76,
    images: [11434576, 17023148],
    occasions: ["weddings", "corporate"],
    blurb: "Brushed brass compote with garden roses, trailing ivy and taper candles.",
    description:
      "A brushed-brass footed compote filled with garden roses, ranunculus and trailing ivy, flanked by two slender taper candles. Quietly dramatic, endlessly photographable.",
    details: ["Brushed-brass footed compote", "Premium silk garden roses", "Two ivory taper candles included", "Approx. 20\" wide × 12\" tall", "Ships within 5–7 business days"],
    isNew: true,
  },
  {
    id: "blush-crystal-bracelet",
    name: "Blush Crystal Bracelet",
    price: 38,
    category: "jewelry",
    rating: 4.8,
    reviews: 121,
    images: [10813695, 10982908],
    occasions: ["gifts", "bridal", "birthdays"],
    blurb: "Blush and ink crystal beads with a petite pearl accent — stacked or solo.",
    description:
      "Hand-threaded blush and ink crystal beads finished with a single freshwater pearl. Made to stack beautifully with our Charm Bracelet or to shine entirely alone.",
    details: ["Blush & ink faceted crystals", "Single freshwater pearl accent", "Hand-knotted construction", "Linen keepsake pouch included", "Ships within 3–5 business days"],
  },
  {
    id: "champagne-tower-candle",
    name: "Champagne Tower Candle",
    price: 30,
    category: "candles",
    rating: 4.7,
    reviews: 64,
    images: [28820611, 26997713],
    occasions: ["weddings", "anniversaries", "holidays"],
    blurb: "A fluted, pearl-white pillar poured to echo a coupe of champagne.",
    description:
      "Fluted like fine crystal and poured in pearl white, this sculptural pillar carries notes of white peach, elderflower and something faintly celebratory you can't name.",
    details: ["Sculptural fluted pillar", "White peach & elderflower", "26-hour burn time", "Unscented option for tablescapes", "Ships within 2–4 business days"],
    isNew: true,
  },
  {
    id: "balloon-garland-kit",
    name: "Balloon Garland & Arch Kit",
    price: 30,
    category: "supplies",
    rating: 4.6,
    reviews: 152,
    images: [33038494, 33542467],
    occasions: ["birthdays", "baby"],
    blurb: "A 14-foot matte balloon garland in your palette, with tools included.",
    description:
      "Fourteen feet of matte double-stuffed balloons in the palette of your event, with tying strips, glue dots and our step-by-step hanging guide. Looks professionally installed — by you.",
    details: ["14 ft of double-stuffed balloons", "Custom palette curation", "Tying strip, hooks & glue dots", "Illustrated hanging guide", "Ships within 2–4 business days"],
    customizable: true,
    options: { label: "Palette", choices: ["Pearl & Gold", "Blush & Cream", "Sage & Ivory", "Ink & Silver"] },
  },
  {
    id: "gilded-table-kit",
    name: "Gilded Fête Table Kit",
    price: 34,
    category: "supplies",
    rating: 4.8,
    reviews: 98,
    images: [5610387, 19455747],
    occasions: ["birthdays", "corporate", "holidays"],
    blurb: "Gilded plates, linen runners, place cards and votives for a table of eight.",
    description:
      "Everything the table needs, curated in one box: gilded-rim plates, a washed-linen runner, letterpress place cards and four glass votives. Set a table of eight in fifteen minutes.",
    details: ["Serves a table of 8", "Gilded-rim dinnerware set", "Washed-linen table runner", "Letterpress place cards × 8", "Ships within 3–5 business days"],
  },
  {
    id: "memory-luminary",
    name: "Velvet Memory Luminary",
    price: 44,
    category: "candles",
    rating: 4.9,
    reviews: 83,
    images: [28867980, 28213378],
    occasions: ["anniversaries", "weddings", "gifts"],
    blurb: "A keepsake candle engraved with names, dates or a line from your vows.",
    description:
      "Our most personal pour. A slow-burning soy candle in a ceramic vessel, hand-engraved with names, a date, or a single line that means the world to you. Made for anniversaries, proposals and quiet remembrance.",
    details: ["Hand-engraved ceramic vessel", "Your inscription, up to 30 characters", "Amber & sandalwood pour", "24-hour burn time", "Ships within 5–7 business days"],
    customizable: true,
  },
  {
    id: "monogram-favor-boxes",
    name: "Monogram Favor Boxes · Set of 12",
    price: 32,
    category: "favors",
    rating: 4.8,
    reviews: 140,
    images: [35985227, 36521859],
    occasions: ["weddings", "baby", "bridal"],
    blurb: "Ivory boxes foil-stamped with your monogram and tied in sage silk.",
    description:
      "Twelve ivory linen-finish boxes, each foil-stamped with your monogram in gold and tied with hand-dyed sage silk ribbon. Fill them with anything — we'll suggest chocolate hearts.",
    details: ["Set of 12 linen-finish boxes", "Gold foil monogram stamping", "Hand-dyed silk ribbon", "Flat-pack or pre-filled", "Ships within 5–7 business days"],
    customizable: true,
  },
  {
    id: "heirloom-necklace",
    name: "Heirloom Layered Necklace",
    price: 54,
    category: "jewelry",
    rating: 4.9,
    reviews: 57,
    images: [11352708, 10474296],
    occasions: ["gifts", "bridal", "anniversaries"],
    blurb: "Two hand-finished chains in warm gold, layered and clasped as one.",
    description:
      "Two strands of hand-finished gold chain — one paperclip, one rope — soldered to a single clasp so they always layer perfectly. The piece our studio is known for.",
    details: ["14k gold-filled chains", "Single-clasp layered design", "Hand-finished in our studio", "16\" + 18\" resting lengths", "Ships within 3–5 business days"],
  },
];

export const bestSellers = PRODUCTS.filter((p) => p.bestseller);
export const featuredProducts = PRODUCTS.slice(0, 6);

export const OCCASIONS = [
  { id: "birthdays", name: "Birthdays", img: 14457438, note: "Candles, confetti & keepsakes" },
  { id: "weddings", name: "Weddings", img: 15530615, note: "Favors, florals & forever pieces" },
  { id: "baby", name: "Baby Showers", img: 38258846, note: "Soft palettes, sweetest details" },
  { id: "bridal", name: "Bridal Showers", img: 5610373, note: "For the almost-newlywed" },
  { id: "anniversaries", name: "Anniversaries", img: 11743222, note: "Years worth celebrating" },
  { id: "corporate", name: "Corporate Events", img: 29040997, note: "Impressions that linger" },
  { id: "holidays", name: "Holidays", img: 33629667, note: "Gatherings, gilded" },
  { id: "gifts", name: "Gifts", img: 12080066, note: "Wrapped & ready to mean something" },
];

export const TESTIMONIALS = [
  {
    quote: "The pearl favors stopped conversation at our wedding — people were photographing them before they even sat down. Worth every penny and then some.",
    name: "Danielle R.",
    detail: "120 wedding favors · Charleston",
  },
  {
    quote: "I sent a mood board and three weeks later the exact centerpieces from my imagination arrived at my door. I've never felt so understood by a business.",
    name: "Priya S.",
    detail: "Custom bridal shower · Austin",
  },
  {
    quote: "My daughter still keeps her birthday favor box on her dresser, eight months later. These aren't party supplies — they're the memory itself.",
    name: "Marcus T.",
    detail: "Sweet sixteen suite · Chicago",
  },
  {
    quote: "Ordered forty chocolate candles as client gifts and our inbox filled with thank-you notes. The packaging alone felt like a luxury brand.",
    name: "Event Team, Halstead & Co.",
    detail: "Corporate gifting · New York",
  },
  {
    quote: "She answered every anxious email within the hour and redesigned our favor tags twice without a hint of impatience. Rare, old-school care.",
    name: "Amara L.",
    detail: "Baby shower order · Seattle",
  },
];

export const GALLERY = [
  { img: 33038494, caption: "Garden christening, cake table" },
  { img: 12114820, caption: "Teddy-suite baby shower" },
  { img: 38258848, caption: "The mama-to-be, photographed" },
  { img: 6063694, caption: "Holiday favor, red ribbon run" },
  { img: 10474305, caption: "Studio bench, mid-commission" },
  { img: 7984853, caption: "Valentine gifting series" },
  { img: 19455747, caption: "Thirtieth birthday tablescape" },
  { img: 26872410, caption: "Winter luminary, evergreen" },
];

export const OCCASION_LABELS: Record<string, string> = Object.fromEntries(
  OCCASIONS.map((o) => [o.id, o.name])
);

export const money = (n: number) => `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`;

export const FREE_SHIP_THRESHOLD = 75;
