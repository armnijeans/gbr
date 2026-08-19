import { trustClaims, type TrustIcon } from "@/config/business";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Four verified facts — CLAUDE.md §8.
 *
 * These render as placeholders until the claims are substantiated. A named
 * accreditation with a logo converts; a vague trust badge is ignored, and an
 * unbacked one is a liability. See the note in business.ts before filling in.
 */
export function TrustStrip() {
  return (
    <section aria-label="Why choose GBR" className="border-b border-[var(--line)] bg-[var(--steel)]">
      <ul className="mx-auto grid max-w-[1180px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {trustClaims.map((claim, i) => (
          <Reveal
            key={i}
            as="li"
            delayMs={i * 70}
            className="flex items-start gap-3 border-b border-[var(--line)] px-5 py-5 transition-colors duration-300 last:border-b-0 hover:bg-white/[0.03] sm:px-6 lg:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <Icon name={claim.icon} className="mt-0.5 h-5 w-5 shrink-0 text-[var(--red)]" />
            <div>
              <p className="font-utility text-[15px] font-semibold uppercase tracking-[0.08em] text-[var(--paper)]">
                {claim.label}
              </p>
              <p className="mt-1.5 font-utility text-[13.5px] font-semibold uppercase tracking-[0.13em] text-[#AEBAC9]">
                {claim.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/**
 * Small line icons, one per trust claim. Kept to a single thin stroke weight
 * and no fill so they read as marks rather than illustrations — small and
 * subtle per the brief's "one accent per view" discipline (CLAUDE.md §4),
 * not a fourth thing competing with the red diagonal above.
 */
function Icon({ name, className }: { name: TrustIcon; className?: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true,
  };

  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3.5l7 2.6v5.4c0 4.4-2.9 7.9-7 9-4.1-1.1-7-4.6-7-9V6.1l7-2.6Z" />
          <path d="M8.75 12.1l2.15 2.1 4.35-4.4" />
        </svg>
      );
    case "guarantee":
      // Infinity — "for as long as you own it" needs a shape distinct from
      // the shield's checkmark. Rendered as the actual "∞" character rather
      // than a hand-built path: a lemniscate is two loops crossing at a
      // single pinch point, which free-hand Bezier/arc math is easy to get
      // subtly wrong (an earlier version of this icon did). The font's glyph
      // outline is guaranteed correct; stroking rather than filling it keeps
      // the same thin-line weight as the other three icons.
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <text
            x="12"
            y="12.5"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="17"
            fontWeight="700"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            ∞
          </text>
        </svg>
      );
    case "car":
      return (
        <svg {...common}>
          <path d="M4.5 15.5l1.3-4.7A2 2 0 0 1 7.7 9.4h8.6a2 2 0 0 1 1.9 1.4l1.3 4.7" />
          <path d="M3.75 15.5h16.5v2.75a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6.75v1a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V15.5Z" />
          <path d="M7 12.3h10" />
        </svg>
      );
    case "collection":
      return (
        <svg {...common}>
          <path d="M12 21s6.5-5.7 6.5-11A6.5 6.5 0 0 0 5.5 10c0 5.3 6.5 11 6.5 11Z" />
          <circle cx="12" cy="10" r="2.15" />
        </svg>
      );
  }
}
