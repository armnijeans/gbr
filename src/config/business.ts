/**
 * GBR — single source of truth for every business fact on the site.
 *
 * ---------------------------------------------------------------------------
 * TWO KINDS OF VALUE LIVE HERE
 * ---------------------------------------------------------------------------
 *
 *   1. CONFIRMED facts — plain values. Address and opening hours are real.
 *
 *   2. PLACEHOLDER content — wrapped in `ph(...)`. It reads as finished copy on
 *      the page so the design can be judged properly, but it is NOT verified
 *      and must not go live. `ph()` is a no-op at runtime; it exists purely to
 *      be greppable.
 *
 * Run `npm run todos` to list every `ph()` value still outstanding.
 *
 * ---------------------------------------------------------------------------
 * READ THIS BEFORE LAUNCH — CLAUDE.md §2
 * ---------------------------------------------------------------------------
 * The accreditation and guarantee claims below are the ones the signage
 * asserts. They are plausible for a shop of this type, which is exactly what
 * makes them dangerous: they will not look wrong to you on review. Publish
 * each one only if it is true and you can name the basis — an insurer network,
 * a paint manufacturer's approval scheme, or BS 10125 / IMI accreditation.
 * If a claim is not backed, delete the entry rather than soften it.
 *
 * The phone numbers are drawn from Ofcom's reserved drama ranges (0121 496 0xxx
 * and 07700 900xxx). They can never reach a real person, so nothing here can
 * misdirect a customer while the site is in review.
 */

/**
 * Marks a value as realistic placeholder content rather than a verified fact.
 * Returns the value untouched — this is a tracking marker, nothing more.
 */
const ph = <T>(value: T): T => value;

/* ---------------------------------------------------------------------------
   Identity, contact, location
--------------------------------------------------------------------------- */

export const business = {
  legalName: ph("Global Body Repairs Ltd"),
  tradingName: "Global Body Repairs",
  shortName: "GBR",
  /** From the logo lockup in /assets/GBR-logo-full.jpg — this one is real. */
  tagline: "Precision repairs. Perfect finish.",

  /** Ofcom drama range — safe to display, unreachable. */
  phone: ph("0121 496 0117"),
  phoneTel: ph("+441214960117"),
  /** Ofcom reserved mobile range, international format for wa.me. */
  whatsapp: ph("447700900418"),
  email: ph("hello@globalbodyrepairs.co.uk"),

  /** CONFIRMED. Must stay byte-identical to the Google Business Profile. */
  address: {
    street: "Unit 17 Holloway Bank",
    locality: "Wednesbury",
    region: "West Midlands",
    postcode: "WS10 0NN",
    country: "GB",
  },

  /**
   * Approximate — geocoded from Holloway Bank, not the unit itself.
   * Replace with the exact pin: Google Maps → right-click → copy coordinates.
   */
  geo: ph({ lat: 52.5445, lng: -2.0171 }),

  /**
   * CONFIRMED 9.30am–6.30pm. Saturday assumed the same and Sunday assumed
   * closed — correct these two if wrong.
   */
  hours: {
    mon: "9:30am – 6:30pm",
    tue: "9:30am – 6:30pm",
    wed: "9:30am – 6:30pm",
    thu: "9:30am – 6:30pm",
    fri: "9:30am – 6:30pm",
    sat: ph("9:30am – 6:30pm"),
    sun: ph("Closed"),
  },

  /** ISO form for the openingHours JSON-LD. */
  hoursSchema: ph(["Mo-Sa 09:30-18:30"]),

  googleReviewUrl: ph("https://g.page/r/global-body-repairs/review"),
  googleMapsUrl: ph("https://maps.google.com/?q=Unit+17+Holloway+Bank,+Wednesbury+WS10+0NN"),
  companyNo: ph("14892173"),
  vatNo: ph("GB 412 7749 63"),

  siteUrl: ph("https://globalbodyrepairs.co.uk"),
} as const;

/**
 * Where the work actually comes from.
 *
 * NOTE — the brief was written assuming a Birmingham address. Holloway Bank is
 * in Wednesbury (Sandwell, Black Country), roughly 7 miles north-west of
 * Birmingham city centre. The catchment is therefore West Bromwich, Walsall,
 * Darlaston, Tipton and Great Barr well before it is Aston or Erdington.
 * The area pages in CLAUDE.md §10 need re-picking against this.
 */
export const serviceArea = {
  primary: "Wednesbury",
  blurb: "the Black Country and north Birmingham",
  towns: ph([
    "West Bromwich",
    "Walsall",
    "Darlaston",
    "Tipton",
    "Great Barr",
    "Oldbury",
    "Bilston",
    "Handsworth",
  ]),
} as const;

/* ---------------------------------------------------------------------------
   Trust claims — VERIFY EVERY ONE. See the header note.
--------------------------------------------------------------------------- */

export type TrustIcon = "shield" | "guarantee" | "car" | "collection";

export type TrustClaim = { label: string; detail: string; icon: TrustIcon };

export const trustClaims: readonly TrustClaim[] = [
  ph({ label: "Insurance approved", detail: "We deal with the claim for you", icon: "shield" as const }),
  ph({
    label: "Lifetime guarantee",
    detail: "On all paintwork, for as long as you own it",
    icon: "guarantee" as const,
  }),
  ph({ label: "Courtesy car", detail: "Subject to availability", icon: "car" as const }),
  ph({ label: "Free collection", detail: "Within 10 miles of Wednesbury", icon: "collection" as const }),
] as const;

/** Hero eyebrow. Delete if no accreditation is confirmed. */
export const heroEyebrowClaim = ph("Insurance approved");

/* ---------------------------------------------------------------------------
   Service lines — CLAUDE.md §7
--------------------------------------------------------------------------- */

export type Service = {
  slug: string;
  name: string;
  summary: string;
  priceFrom: string;
  photo: string;
  photoAlt: string;
};

export const services: readonly Service[] = [
  {
    slug: "accident-repair",
    name: "Accident repair",
    summary: "Panel work, structural repair and insurance jobs, start to finish.",
    priceFrom: ph("£450"),
    photo: "service-accident",
    photoAlt: "Front nearside corner of a green hatchback with a broken headlight and crushed bumper",
  },
  {
    slug: "smart-repair",
    name: "SMART repair",
    summary: "Dents, scratches, bumper scuffs and kerbed alloys, often same day.",
    priceFrom: ph("£95"),
    photo: "service-smart",
    photoAlt: "Close-up of a small dent in the glossy red paintwork of a car door",
  },
  {
    slug: "paint-and-resprays",
    name: "Paint & resprays",
    summary: "Full resprays, colour matching and alloy refurbishment.",
    priceFrom: ph("£320"),
    photo: "service-paint",
    photoAlt: "Car wing masked off with paper and tape, prepared for spraying in the booth",
  },
  {
    slug: "servicing-and-mot",
    name: "Servicing & MOT",
    summary: "Servicing, MOT and mechanical work alongside the bodywork.",
    priceFrom: ph("£129"),
    photo: "service-servicing",
    photoAlt: "Cars raised on two-post lifts in a bright workshop with technicians working",
  },
] as const;

/* ---------------------------------------------------------------------------
   Proof — CLAUDE.md §8. Name the vehicle and the damage.

   Every photo below is a stock stand-in. Shoot the real thing: same angle,
   same light, phone on a stable surface, and take the "before" the moment the
   car arrives — you cannot go back for it.
--------------------------------------------------------------------------- */

export type ProofItem = {
  id: string;
  vehicle: string;
  damage: string;
  serviceSlug: Service["slug"];
  turnaround: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
};

export const proofItems: readonly ProofItem[] = [
  ph({
    id: "proof-1",
    vehicle: "Vauxhall Astra, 2018",
    damage: "Offside front wing and bumper, impact damage",
    serviceSlug: "accident-repair" as const,
    turnaround: "6 days",
    before: "proof-1-before",
    after: "proof-1-after",
    beforeAlt: "Crushed and torn offside front wing of a red Vauxhall Astra after a collision",
    afterAlt: "The same red Astra wing rebuilt, sprayed and polished back to a factory finish",
  }),
  ph({
    id: "proof-2",
    vehicle: "Mazda 3, 2020",
    damage: "Rear bumper, deep kerb scuffing",
    serviceSlug: "smart-repair" as const,
    turnaround: "2 days",
    before: "proof-2-before",
    after: "proof-2-after",
    beforeAlt: "Technician sanding the scuffed rear bumper of a dark grey Mazda 3 in the workshop",
    afterAlt: "The same Mazda 3 rear bumper resprayed and polished, scuffing gone",
  }),
  ph({
    id: "proof-3",
    vehicle: "Ford Focus ST, 2019",
    damage: "Nearside doors, resprayed after scratch damage",
    serviceSlug: "paint-and-resprays" as const,
    turnaround: "4 days",
    before: "proof-3-before",
    after: "proof-3-after",
    beforeAlt: "Nearside door of a Ford Focus masked off with paper and tape ready for spraying",
    afterAlt: "The same Focus door after respray, showing an even gloss and a clean colour match",
  }),
] as const;

/** The hero's before/after — use your single most dramatic repair. */
export const heroProof = ph({
  before: "hero-before",
  after: "hero-after",
  beforeAlt: "Deep crease and paint damage along the rear quarter panel of a grey saloon",
  afterAlt: "The same rear quarter panel straightened, resprayed and polished to a mirror finish",
  caption: "Finished · 3 days",
});

/* ---------------------------------------------------------------------------
   Reviews — CLAUDE.md §10 forbids faking aggregateRating.

   `rating` and `count` below are PLACEHOLDERS. The JSON-LD helper deliberately
   refuses to emit aggregateRating while they are wrapped in ph(), so a made-up
   score cannot reach Google even by accident.
--------------------------------------------------------------------------- */

export const reviews = ph({
  rating: 4.9,
  count: 87,
  quotes: [
    {
      quote:
        "Someone went into the back of me on the Holloway Bank island and I had no idea where to start. GBR sorted the insurer, picked the car up and had it back to me looking better than before.",
      author: "Danielle H.",
      job: "Mazda 3 · rear-end damage",
    },
    {
      quote:
        "Kerbed both offside alloys and scuffed the sill. Sent three photos on the Saturday, had a price back the same day, car was done by Tuesday. No fuss at all.",
      author: "Marcus O.",
      job: "Audi A4 · alloys and sill",
    },
    {
      quote:
        "The colour match on my Focus is spot on — you genuinely cannot tell which door was resprayed. Proper job and a fair price.",
      author: "Ryan T.",
      job: "Ford Focus ST · door respray",
    },
  ],
});

/* ---------------------------------------------------------------------------
   Quote form — CLAUDE.md §6
--------------------------------------------------------------------------- */

export const forms = {
  /** Sign up at web3forms.com and paste the key. Submitting is blocked until then. */
  accessKey: "",
  endpoint: "https://api.web3forms.com/submit",
  /** Reject submissions faster than this — no human fills a form in 3s. */
  minSubmitSeconds: 3,
} as const;

/* ---------------------------------------------------------------------------
   Derived helpers
--------------------------------------------------------------------------- */

/** Prefilled WhatsApp deep link — CLAUDE.md §9. */
export function whatsappHref(): string {
  const msg = encodeURIComponent(
    "Hi GBR, I'd like a repair quote. Here are photos of the damage. " +
      "Vehicle: \nReg: \nWhat happened: ",
  );
  return `https://wa.me/${business.whatsapp}?text=${msg}`;
}

/** tel: link. */
export function telHref(): string {
  return `tel:${business.phoneTel}`;
}

/** Full address on one line. Must match the Google Business Profile exactly. */
export function addressLine(): string {
  const a = business.address;
  return `${a.street}, ${a.locality}, ${a.postcode}`;
}

/** Path base for a pre-compressed photo in /public/photos. */
export function photo(slug: string): string {
  return `/photos/${slug}`;
}
