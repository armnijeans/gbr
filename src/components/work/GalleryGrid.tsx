"use client";

import { useMemo, useState } from "react";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Reveal } from "@/components/ui/Reveal";
import type { ProofItem, Service } from "@/config/business";

/**
 * Filterable gallery — CLAUDE.md §8.
 *
 * Filtering is client state, so this is the only part of /our-work/ that ships
 * as a client component; the page around it stays server-rendered. Every entry
 * is in the initial HTML regardless of the active filter — the filter hides
 * DOM rather than fetching, so crawlers see all twelve entries and there is no
 * empty-state flash on load.
 */

type Filter = "all" | Service["slug"];

export function GalleryGrid({
  items,
  services,
}: {
  items: readonly ProofItem[];
  services: readonly Pick<Service, "slug" | "name">[];
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const item of items) {
      map.set(item.serviceSlug, (map.get(item.serviceSlug) ?? 0) + 1);
    }
    return map;
  }, [items]);

  // Only offer a filter that would actually return something.
  const available = services.filter((s) => (counts.get(s.slug) ?? 0) > 0);
  const shown = filter === "all" ? items : items.filter((i) => i.serviceSlug === filter);

  const serviceName = (slug: string) => services.find((s) => s.slug === slug)?.name ?? slug;

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by service">
        <FilterButton
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="All work"
          count={items.length}
        />
        {available.map((s) => (
          <FilterButton
            key={s.slug}
            active={filter === s.slug}
            onClick={() => setFilter(s.slug)}
            label={s.name}
            count={counts.get(s.slug) ?? 0}
          />
        ))}
      </div>

      {/* Announced rather than silent, so the count change is not visual-only. */}
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {items.length} jobs.
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, i) => (
          <Reveal
            key={item.id}
            as="li"
            delayMs={Math.min(i, 5) * 70}
            className="overflow-hidden rounded-[4px] border border-[#DDE1E6] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[var(--red)] hover:shadow-[0_14px_34px_rgba(228,38,44,0.14)]"
          >
            <BeforeAfter
              before={item.before}
              after={item.after}
              beforeAlt={item.beforeAlt}
              afterAlt={item.afterAlt}
              className="h-[230px]"
            />
            <div className="px-5 py-4">
              <h3 className="font-display text-[20px] text-[var(--ink)]">{item.vehicle}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.5] text-[var(--primer-deep)]">
                {item.damage}
              </p>
              <p className="mt-3 font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer-deep)]">
                {serviceName(item.serviceSlug)} · {item.turnaround}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`on-red rounded-[3px] border px-4 py-2 font-utility text-[15px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 ${
        active
          ? "border-[var(--red)] bg-[var(--red)] text-white"
          : "border-[#C3CAD3] bg-transparent text-[var(--primer-deep)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
      }`}
    >
      {label}{" "}
      <span className={active ? "text-white/70" : "text-[var(--primer)]"}>{count}</span>
    </button>
  );
}
