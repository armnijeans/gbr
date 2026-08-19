import Link from "next/link";
import { Section, SectionHead } from "@/components/ui/Section";
import { services } from "@/config/business";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Four service lines — CLAUDE.md §8. Breadth is how we beat the nearest
 * competitor, who is positioned narrowly on dent and scratch work (§3).
 *
 * The image well carries the diagonal mask so the motif recurs structurally
 * rather than decoratively.
 */
export function ServiceCards() {
  return (
    <Section tone="paper" labelledBy="services-heading">
      <SectionHead
        tone="paper"
        id="services-heading"
        eyebrow="What we do"
        title="Four lines of work, one workshop."
        intro="Bodywork, paint, alloys and mechanical under one roof — so a single job doesn't get split across three units and three sets of delays."
      />

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Reveal key={service.slug} as="li" delayMs={i * 80}>
            <Link
              href={`/repairs/${service.slug}/`}
              className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-[#DDE1E6] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[var(--red)] hover:shadow-[0_14px_34px_rgba(228,38,44,0.14)]"
            >
              {/* Stock stand-in — swap for GBR's own work (CLAUDE.md §13). */}
              <div className="diag-mask-b relative h-[168px] shrink-0 overflow-hidden bg-[var(--ink)]">
                <Photo
                  slug={service.photo}
                  alt={service.photoAlt}
                  width={760}
                  height={517}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex grow flex-col px-5 pb-5 pt-4">
                <h3 className="font-display text-[20px] text-[var(--ink)]">{service.name}</h3>
                <p className="mt-2 grow text-[15.5px] leading-[1.5] text-[var(--primer-deep)]">
                  {service.summary}
                </p>
                <p className="mt-4 font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer-deep)]">
                  From {service.priceFrom}
                </p>
                <p className="mt-3 font-utility text-[15px] font-semibold uppercase tracking-[0.08em] text-[var(--red)]">
                  <span className="border-b border-transparent transition-colors group-hover:border-[var(--red)]">
                    See what&rsquo;s included
                  </span>
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
