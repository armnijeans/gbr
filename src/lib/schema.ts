import { business, addressLine } from "@/config/business";

/**
 * JSON-LD structured data — CLAUDE.md §10.
 *
 * ---------------------------------------------------------------------------
 * THE aggregateRating RULE
 * ---------------------------------------------------------------------------
 * The brief is unambiguous: never fake an aggregateRating. Doing so is a
 * Google structured-data violation that can earn a manual penalty, and it is
 * the single easiest way to undo the rest of this work.
 *
 * `reviews.rating` and `reviews.count` in business.ts are currently realistic
 * placeholders so the design reads properly. `autoBodyShopSchema()` therefore
 * does NOT emit aggregateRating at all, and will not until someone passes
 * `verifiedRating` explicitly — which should only happen once the numbers come
 * off a live Google Business Profile. There is deliberately no way to wire it
 * up by accident.
 */

const siteUrl = business.siteUrl.replace(/\/$/, "");

/** Absolute URL for a site-relative path. */
export function abs(path: string): string {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

type Json = Record<string, unknown>;

/**
 * The shop itself. Rendered once, on the homepage.
 *
 * @param verifiedRating Pass ONLY with real numbers from the live Google
 *   Business Profile. Omitted entirely otherwise — see the note above.
 */
export function autoBodyShopSchema(verifiedRating?: {
  ratingValue: number;
  reviewCount: number;
}): Json {
  const schema: Json = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    "@id": abs("/#business"),
    name: `${business.shortName} ${business.tradingName}`,
    legalName: business.legalName,
    url: siteUrl,
    telephone: business.phoneTel,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    openingHours: business.hoursSchema,
    areaServed: serviceAreaNames(),
    image: abs("/photos/workshop.jpg"),
    priceRange: "££",
  };

  if (verifiedRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: verifiedRating.ratingValue,
      reviewCount: verifiedRating.reviewCount,
    };
  }

  return schema;
}

function serviceAreaNames(): Json[] {
  return [business.address.locality, "Birmingham", "West Bromwich", "Walsall"].map((name) => ({
    "@type": "City",
    name,
  }));
}

/** One service line. Rendered on that service's page. */
export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.name,
    url: abs(input.path),
    provider: {
      "@type": "AutoBodyShop",
      "@id": abs("/#business"),
      name: `${business.shortName} ${business.tradingName}`,
      address: addressLine(),
    },
    areaServed: serviceAreaNames(),
  };
}

/** FAQ block. The questions must actually appear on the page as text. */
export function faqSchema(faqs: readonly { q: string; a: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Breadcrumb trail. Must match the visible breadcrumbs. */
export function breadcrumbSchema(trail: readonly { label: string; href: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: abs(item.href),
    })),
  };
}
