export const PHONE_DISPLAY = "086 270 9299";
export const PHONE_TEL = "+353862709299";
export const EMAIL = "mrbubblesexpress@gmail.com";
export const CONTACT_EMAIL = "ronan@mrbubblesexpress.com";

export const ADDRESSES = [
  {
    title: "Greenlanes",
    lines: "Unit 105, An Tsean Mhargadh, Greenlanes, Drogheda, Co. Louth",
  },
  {
    title: "Aston Village",
    lines: "Unit 5c, Aston Village, Aston Green, Drogheda, Co. Louth",
  },
] as const;

export const sectors = [
  {
    id: "hotel",
    label: "Hotel",
    packTitle: "Hotel linen pack",
    items: ["Sheets", "Duvet covers", "Pillowcases", "Bath towels"],
    turnaround: "Collected on the agreed cycle and returned before the next service.",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    packTitle: "Healthcare linen pack",
    items: ["Patient linen", "Scrubs", "Examination covers"],
    turnaround: "Thermal disinfection on healthcare loads. Soiled and clean stay apart.",
  },
  {
    id: "salon",
    label: "Salon & spa",
    packTitle: "Salon and spa pack",
    items: ["Towels", "Robes", "Gowns"],
    turnaround: "Folded and fresh for the next column of clients.",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    packTitle: "Restaurant linen pack",
    items: ["Tablecloths", "Napkins", "Chef whites"],
    turnaround: "Pressed and packed so the floor can open.",
  },
  {
    id: "workwear",
    label: "Workwear",
    packTitle: "Workwear pack",
    items: ["Hi-vis", "Uniforms"],
    turnaround: "Washed and finished, then returned to the site.",
  },
] as const;

export type SectorId = (typeof sectors)[number]["id"];

export const proofs = [
  {
    title: "ISO 9001 and ISO 45001",
    body: "NSAI certificates 19.7625 and 45.1101, valid to 17 December 2028.",
  },
  {
    title: "Fully insured. Irish owned.",
    body: "Cover is in place. The company is Irish owned.",
  },
  {
    title: "QR tracking on every bag",
    body: "A label on the bag, a scan in the driver app, a line on the desk log.",
  },
] as const;

export const flow = [
  {
    title: "Book a collection",
    body: "Tell us the sector, the volume, and the county. We confirm the run and the rate.",
  },
  {
    title: "We collect",
    body: "The driver labels every bag and scans it at the door.",
  },
  {
    title: "Wash to the standard that sector needs",
    body: "Hotel, healthcare, salon, restaurant, and workwear each have their own wash.",
  },
  {
    title: "Return scanned",
    body: "The bag is scanned onto the van and scanned again when it comes back.",
  },
] as const;

export const questions = [
  {
    q: "How do you price a collection?",
    a: "There is no rate card on this site. Send the sector, whether the linen is yours or rental, a weekly volume band, how often we collect, and the county. We confirm the run and the rate.",
  },
  {
    q: "How quickly does linen come back?",
    a: "On the cycle we agree when we book the run. Hotel and restaurant linen is aimed back before the next service. Healthcare loads take the time the thermal process needs. The brief is where that day is confirmed.",
  },
  {
    q: "What does the QR label record?",
    a: "The bag code, the collection scan, the plant check-in, and the return scan. The driver app and the desk log show the same events. You can walk a sample bag on the tracking page. That demo is not a login.",
  },
  {
    q: "How is healthcare linen handled?",
    a: "Soiled and clean stay apart. Processes are HSE-approved, with thermal disinfection where the load needs it. Each handoff is scanned. This site does not claim a hospital contract.",
  },
  {
    q: "Do you collect outside Louth?",
    a: "Both units are in Drogheda. Business collections run nationwide. Put the county on the brief and we confirm whether that site is on a run.",
  },
  {
    q: "Can you wash our linen, or only supply rental?",
    a: "Both. Own-linen laundry comes back as yours. Rental is a pack we supply, count, and replace when the scan shows a short.",
  },
] as const;

export const clients = [
  "HSE and Tusla approved centres",
  "Hotels and guesthouses",
  "Hair and beauty studios",
  "Restaurants and catering",
  "Construction and maintenance uniform contracts",
  "Private healthcare",
] as const;

export type ServiceBlock = {
  id: string;
  title: string;
  lede: string;
  collected: string;
  processed: string;
  returns: string;
  qr: string;
  photo: "towels" | "fleet" | "hotel" | "salon" | "restaurant" | "workwear" | "healthcare" | "fold";
  sector?: SectorId;
  note?: string;
};

export const services: ServiceBlock[] = [
  {
    id: "commercial",
    title: "Commercial laundry and linen rental",
    lede: "The core run. Your linen, or a rental pack, collected from the site and brought back clean.",
    collected: "Soiled linen, towels, and garments, bagged at the door.",
    processed: "Sorted by sector in the Drogheda plant, then washed and finished.",
    returns: "Clean packs on the agreed cycle, folded or pressed.",
    qr: "Bag code, collection time, plant check-in, and the return scan.",
    photo: "fold",
  },
  {
    id: "hotel",
    title: "Hotel and guesthouse linen",
    lede: "Guest linen that is back before the next service.",
    collected: "Sheets, duvet covers, pillowcases, and bath towels.",
    processed: "Washed and finished for a guest-ready fold.",
    returns: "Packed by the count you send, or by room type if you rent the pack.",
    qr: "Each bag is tied to the property and to the driver who collected it.",
    photo: "hotel",
    sector: "hotel",
  },
  {
    id: "salon",
    title: "Hair salon and beauty spa laundry",
    lede: "Towels, robes, and gowns, folded for the next client.",
    collected: "Used towels, robes, and gowns.",
    processed: "Washed and folded. No guest linen mixed into the load.",
    returns: "A fresh pile on the days we agree.",
    qr: "Collection and return scans, so a missing bag shows on the log.",
    photo: "salon",
    sector: "salon",
  },
  {
    id: "healthcare",
    title: "Medical and healthcare laundry",
    lede: "Patient linen, scrubs, and examination covers, handled as healthcare.",
    collected: "Patient linen, scrubs, and examination covers. Soiled and clean never share a bag.",
    processed:
      "HSE-approved processes. Thermal disinfection where the load needs it. Soiled and clean stay apart through the plant.",
    returns: "Clean linen, scanned out only after the wash is on the bag record.",
    qr: "A scan at each handoff: collection, plant, and return.",
    photo: "healthcare",
    sector: "healthcare",
    note: "Processes are HSE-approved. This is not a claim of a hospital contract.",
  },
  {
    id: "restaurant",
    title: "Restaurant and hospitality laundry",
    lede: "Table linen and chef whites, pressed for service.",
    collected: "Tablecloths, napkins, and chef whites.",
    processed: "Washed, then pressed and folded.",
    returns: "Packed so the floor can open without a re-iron.",
    qr: "Bag identity, and the time it left the plant.",
    photo: "restaurant",
    sector: "restaurant",
  },
  {
    id: "workwear",
    title: "Workwear and uniform cleaning",
    lede: "Hi-vis and uniforms, washed as workwear and brought back to the site.",
    collected: "Hi-vis and uniforms from the site or the contractor.",
    processed: "Washed and finished so the garment is fit to wear back on site.",
    returns: "Hung or folded, against the count collected.",
    qr: "The same label goes out and comes back, so a short count is visible.",
    photo: "workwear",
    sector: "workwear",
  },
  {
    id: "finishing",
    title: "Garment finishing and pressing",
    lede: "A press after the wash, when the garment has to look finished.",
    collected: "Shirts, jackets, and linen that need pressing as well as a wash.",
    processed: "Washed, then finished on the press.",
    returns: "Ready to wear, or ready to lay on a bed or a table.",
    qr: "The finish step sits on the bag record, after the wash and before the van.",
    photo: "fold",
  },
  {
    id: "stain",
    title: "Stain treatment and sanitisation",
    lede: "Marked items are flagged at the door, not discovered at the other end.",
    collected: "Items the site has marked, flagged when the bag is scanned.",
    processed: "Stain treatment where the cloth allows it, then the sector wash.",
    returns: "The item, or a note on the bag if the mark will not lift.",
    qr: "The flag stays on the bag record with the wash.",
    photo: "towels",
  },
  {
    id: "consultancy",
    title: "On-site laundry consultancy",
    lede: "A look at how the site sorts, stores, and hands linen to the driver.",
    collected: "Not a bag. A walk-through of the handoff at the site.",
    processed: "We set a simple pattern: soiled in one place, clean in another, a label on every bag.",
    returns: "A short written note of the collection pattern. No pack of slides.",
    qr: "How the site will use labels once the run starts.",
    photo: "fleet",
  },
  {
    id: "industrial",
    title: "Industrial garment laundry",
    lede: "Factory and warehouse garments, kept off the hospitality washers.",
    collected: "Workwear from factories and warehouses.",
    processed: "Washed as an industrial load, separate from guest linen.",
    returns: "Garments back on the site run.",
    qr: "Load identity from collection to return.",
    photo: "workwear",
  },
  {
    id: "stock",
    title: "Linen supply and stock management",
    lede: "A par level, checked against what the scans say is on the floor.",
    collected: "Counts of what is in use and what is in the cage.",
    processed: "Rental stock or your own stock, reconciled to the scan log.",
    returns: "The par you agreed, topped up when the count is short.",
    qr: "Each movement of a rental bag is on the audit trail.",
    photo: "towels",
  },
  {
    id: "pickup",
    title: "Pickup and delivery",
    lede: "The van is the start and the end of the record.",
    collected: "From the door, on the agreed days. The depots are in Drogheda. Collections cover Ireland.",
    processed: "The driver scan opens the record. The plant does the wash.",
    returns: "To the same site, scanned off the van.",
    qr: "Driver app at the door. The desk log shows the same events.",
    photo: "fleet",
  },
];

export const COUNTIES = [
  "Antrim",
  "Armagh",
  "Carlow",
  "Cavan",
  "Clare",
  "Cork",
  "Derry",
  "Donegal",
  "Down",
  "Dublin",
  "Fermanagh",
  "Galway",
  "Kerry",
  "Kildare",
  "Kilkenny",
  "Laois",
  "Leitrim",
  "Limerick",
  "Longford",
  "Louth",
  "Mayo",
  "Meath",
  "Monaghan",
  "Offaly",
  "Roscommon",
  "Sligo",
  "Tipperary",
  "Tyrone",
  "Waterford",
  "Westmeath",
  "Wexford",
  "Wicklow",
] as const;

export const provinces = [
  {
    name: "Leinster",
    counties: [
      "Carlow",
      "Dublin",
      "Kildare",
      "Kilkenny",
      "Laois",
      "Longford",
      "Louth",
      "Meath",
      "Offaly",
      "Westmeath",
      "Wexford",
      "Wicklow",
    ],
  },
  {
    name: "Munster",
    counties: ["Clare", "Cork", "Kerry", "Limerick", "Tipperary", "Waterford"],
  },
  {
    name: "Connacht",
    counties: ["Galway", "Leitrim", "Mayo", "Roscommon", "Sligo"],
  },
  {
    name: "Ulster",
    counties: ["Antrim", "Armagh", "Cavan", "Derry", "Donegal", "Down", "Fermanagh", "Monaghan", "Tyrone"],
  },
] as const;

export const pages = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/tracking", label: "Tracking" },
  { to: "/compliance", label: "Compliance" },
  { to: "/coverage", label: "Coverage" },
  { to: "/quote", label: "Quote" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const primaryNav = [
  { to: "/services", label: "Services" },
  { to: "/tracking", label: "Tracking" },
  { to: "/compliance", label: "Compliance" },
  { to: "/quote", label: "Quote" },
] as const;

export const moreNav = [
  { to: "/how-it-works", label: "How it works" },
  { to: "/coverage", label: "Coverage" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function sectorById(id: SectorId) {
  return sectors.find((sector) => sector.id === id) ?? sectors[0];
}
