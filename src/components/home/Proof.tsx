import Link from "next/link";
import { Section, SectionHead } from "@/components/ui/Section";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { Reveal } from "@/components/ui/Reveal";
import { proofItems, services } from "@/config/business";

const serviceName = (slug: string) =>
  services.find((s) => s.slug === slug)?.name ?? slug;

/**
 * Three before/after sliders of real jobs — CLAUDE.md §8.
 * Every entry names the vehicle and the damage; this is the proof the
 * competitor cannot show (§3).
 *
 * followPointer is off here: unlike the hero, you want to park the divider and
 * read the caption rather than have it chase the cursor as you scroll past.
 */
export function Proof() {
  return (
    <Section tone="paper" labelledBy="proof-heading">
      <SectionHead
        tone="paper"
        id="proof-heading"
        eyebrow="Our work"
        title="Drag any of these. Nothing is staged."
        intro="Same car, same angle, same light — photographed as it arrived and again when it left."
      />

      {/* Three on the homepage, per CLAUDE.md §8 — the rest live in the
          gallery, which is what "See the full gallery" below goes to. */}
      <ul className="mt-10 grid gap-6 lg:grid-cols-3">
        {proofItems.slice(0, 3).map((item, i) => (
          <Reveal
            key={item.id}
            as="li"
            delayMs={i * 90}
            className="overflow-hidden rounded-[4px] border border-[#DDE1E6] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[var(--red)] hover:shadow-[0_14px_34px_rgba(228,38,44,0.14)]"
          >
            <BeforeAfter
              before={item.before}
              after={item.after}
              beforeAlt={item.beforeAlt}
              afterAlt={item.afterAlt}
              beforeLabel="Drag →"
              className="h-[230px]"
            />
            <div className="px-5 py-4">
              <h3 className="font-display text-[20px] text-[var(--ink)]">
                {item.vehicle}
              </h3>
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

      <p className="mt-8 font-utility text-[17px] font-semibold uppercase tracking-[0.08em]">
        <Link href="/our-work/" className="text-[var(--red)] underline-offset-4 hover:underline">
          See the full gallery
        </Link>
      </p>
    </Section>
  );
}
