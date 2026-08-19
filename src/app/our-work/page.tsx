import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryGrid } from "@/components/work/GalleryGrid";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { proofItems, services, business } from "@/config/business";

export const metadata: Metadata = {
  title: `Our Work in ${business.address.locality}`,
  description:
    "Before and after photographs of real repairs — accident damage, dents, alloys and resprays. Drag to compare each one. Vehicle, damage and turnaround named on every job.",
  alternates: { canonical: "/our-work/" },
};

/**
 * Gallery — CLAUDE.md §8. Every entry names vehicle, damage, service line and
 * turnaround, and carries a real before/after pair. Reuses the hero's
 * BeforeAfter component rather than a second implementation (§12 step 6).
 */
export default function OurWorkPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Our work", href: "/our-work/" },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs trail={trail} tone="ink" />
          <Reveal className="mt-8">
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              Our work
            </p>
            <h1 className="font-display mt-3 max-w-[18ch] text-[clamp(34px,6vw,54px)] leading-[0.98] text-[var(--paper)]">
              Drag any of these. Nothing is staged.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
              Same car, same angle, same light — photographed as it arrived and
              again when it left. Every job lists the vehicle, what was wrong with
              it and how long it took.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppCta label="Get a price for yours" />
              <CallCta />
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="paper" labelledBy="gallery-heading">
        <SectionHead
          tone="paper"
          id="gallery-heading"
          eyebrow="The gallery"
          title="Every job, start to finish."
          intro="Filter by the kind of work, or drag any slider to see the difference."
        />
        <GalleryGrid items={proofItems} services={services} />
      </Section>

      <Section tone="steel" labelledBy="yours-heading">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <Reveal>
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              Yours next
            </p>
            <h2
              id="yours-heading"
              className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--paper)]"
            >
              Send us three photos.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
              A wide shot of the car, one of the damage, one close up. We&rsquo;ll
              tell you what it needs and what it costs, usually the same day.
            </p>
          </Reveal>
          <Reveal delayMs={120} className="flex flex-wrap gap-3 lg:justify-end">
            <WhatsAppCta />
            <CallCta />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
