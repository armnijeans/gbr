import type { MetadataRoute } from "next";
import { business, indexable } from "@/config/business";
import { abs } from "@/lib/schema";

/**
 * Force static generation. With output: 'export' there is no server to run
 * this at request time, so Next needs telling it can be evaluated once at
 * build and written to a file.
 */
export const dynamic = "force-static";

/**
 * robots.txt, generated at build — CLAUDE.md §10.
 *
 * While `indexable` is false this serves a blanket Disallow. That is the
 * intended state until the placeholder content is replaced; see the note on
 * the flag in business.ts.
 */
export default function robots(): MetadataRoute.Robots {
  if (!indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: abs("/sitemap.xml"),
    host: business.siteUrl,
  };
}
