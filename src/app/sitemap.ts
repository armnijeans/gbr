import type { MetadataRoute } from "next";
import { services } from "@/config/business";
import { abs } from "@/lib/schema";

/**
 * Force static generation. With output: 'export' there is no server to run
 * this at request time, so Next needs telling it can be evaluated once at
 * build and written to a file.
 */
export const dynamic = "force-static";

/**
 * sitemap.xml, generated at build — CLAUDE.md §10.
 *
 * Routes are listed explicitly rather than crawled off the filesystem, so a
 * page cannot end up in the sitemap before someone has decided it should be.
 * Priorities reflect the brief's ranking of commercial value: insurance
 * claims is the highest-value page (§8), service pages are what rank (§8).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, freq: "weekly" },
    { path: "/insurance-claims/", priority: 0.9, freq: "monthly" },
    { path: "/repairs/", priority: 0.8, freq: "monthly" },
    { path: "/our-work/", priority: 0.8, freq: "weekly" },
    { path: "/quote/", priority: 0.7, freq: "monthly" },
    { path: "/contact/", priority: 0.7, freq: "monthly" },
    { path: "/about/", priority: 0.6, freq: "monthly" },
    { path: "/reviews/", priority: 0.6, freq: "weekly" },
    { path: "/privacy/", priority: 0.2, freq: "yearly" },
    { path: "/terms/", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: abs(r.path),
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: abs(`/repairs/${s.slug}/`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
