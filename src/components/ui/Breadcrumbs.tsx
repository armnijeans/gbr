import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import type { Tone } from "@/components/ui/Section";

export type Crumb = { label: string; href: string };

/**
 * Breadcrumb trail — CLAUDE.md §10 wants BreadcrumbList sitewide.
 *
 * Renders the visible trail and the matching JSON-LD from one array, so the
 * two cannot drift apart. The final crumb is the current page: not a link,
 * and marked aria-current.
 */
export function Breadcrumbs({ trail, tone }: { trail: readonly Crumb[]; tone: Tone }) {
  const light = tone === "paper";
  const muted = light ? "text-[var(--primer-deep)]" : "text-[var(--primer)]";
  const strong = light ? "text-[var(--ink)]" : "text-[var(--paper)]";

  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />
      <nav aria-label="Breadcrumb">
        <ol
          className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-utility text-[13px] font-semibold uppercase tracking-[0.13em] ${muted}`}
        >
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={strong}>
                    {crumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className={`transition-colors hover:${light ? "text-[var(--ink)]" : "text-[var(--paper)]"}`}
                    >
                      {crumb.label}
                    </Link>
                    <span aria-hidden className="opacity-50">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
