import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { business, serviceArea, trustClaims, addressLine } from "@/config/business";

export const metadata: Metadata = {
  title: `About the Workshop in ${business.address.locality}`,
  description:
    `Who we are, how we work and what we guarantee. A full-service accident repair centre in ` +
    `${business.address.locality} covering ${serviceArea.blurb}.`,
  alternates: { canonical: "/about/" },
};

/**
 * About — CLAUDE.md §7: the workshop, the team, the kit, the guarantee.
 *
 * Deliberately light on specifics about equipment and staff, because those are
 * facts about a business I cannot verify. The structure is here and the copy
 * is honest about process; fill in the concrete detail (what spray booth, how
 * many technicians, which accreditations) before launch — that detail is what
 * makes this page worth reading, and it is the part only you can supply.
 */
export default function AboutPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs trail={trail} tone="ink" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
                About us
              </p>
              <h1 className="font-display mt-3 max-w-[16ch] text-[clamp(34px,6vw,54px)] leading-[0.98] text-[var(--paper)]">
                One workshop. Four trades. No handoffs.
              </h1>
              <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
                {business.tradingName} is a full-service accident repair centre on
                Holloway Bank in {business.address.locality}, covering{" "}
                {serviceArea.blurb}. Bodywork, paint, alloys and mechanical all
                happen under the same roof, which means a job that needs two of
                them only goes off the road once.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppCta />
                <CallCta />
              </div>
            </Reveal>
            <Reveal delayMs={120} className="diag-mask-b overflow-hidden rounded-[4px]">
              <Photo
                slug="workshop-bay"
                alt="Cars in a lit workshop bay at the GBR unit, doors open and work in progress"
                width={1200}
                height={816}
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <Section tone="paper" labelledBy="how-heading">
        <SectionHead
          tone="paper"
          id="how-heading"
          eyebrow="How we work"
          title="Three things we do differently."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {[
            {
              heading: "We tell you what it needs, not what it could need",
              paras: [
                "Anything we find gets sorted into three: needs doing now for safety or legality, will need doing soon, and can reasonably wait. Presenting all three as equally urgent is how garages lose people, and it is not something we do.",
                "If the repair costs less than your insurance excess, we will say so — even though it means a smaller job for us.",
              ],
            },
            {
              heading: "Preparation is where the hours go",
              paras: [
                "Paint does not hide imperfections, it reveals them. A gloss finish is a mirror, and every ripple underneath becomes more obvious once it is shiny, not less.",
                "That is why the surface is guide-coated and flatted before colour goes anywhere near it. It is the least visible part of the job and the first thing to disappear when a price gets cut.",
              ],
            },
            {
              heading: "Nothing happens without your say-so",
              paras: [
                "Collision work regularly turns up damage the estimate could not see. When it does we stop, document it, and get it authorised — by you or your insurer — before continuing.",
                "You will never collect a car and find an invoice larger than the one you agreed to.",
              ],
            },
          ].map((block, i) => (
            <Reveal key={block.heading} delayMs={i * 80} as="article">
              <h3 className="font-display text-[22px] leading-[1.15] text-[var(--ink)]">
                {block.heading}
              </h3>
              {block.paras.map((p, j) => (
                <p key={j} className="mt-3 text-[16.5px] leading-[1.55] text-[var(--primer-deep)]">
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="ink" labelledBy="workshop-heading">
        <SectionHead
          tone="ink"
          id="workshop-heading"
          eyebrow="The workshop"
          title="Where the work happens."
          intro="Unit 17 Holloway Bank — spray booth, prep bay and ramps in one building, so a car never leaves the site mid-repair."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              slug: "spray-booth",
              alt: "Technician in protective coveralls spraying a panel inside the booth",
              caption: "The booth",
            },
            {
              slug: "workshop-lifts",
              alt: "Vehicles raised on two-post lifts in the mechanical bay",
              caption: "Mechanical bay",
            },
            {
              slug: "workshop",
              alt: "Wide view of the GBR workshop floor with several cars under repair",
              caption: "The floor",
            },
          ].map((item, i) => (
            <Reveal
              key={item.slug}
              delayMs={i * 80}
              className="overflow-hidden rounded-[4px] border border-[var(--line)] bg-[var(--steel)]"
            >
              <div className="diag-mask-b h-[220px] overflow-hidden">
                <Photo
                  slug={item.slug}
                  alt={item.alt}
                  width={1200}
                  height={816}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="px-5 py-4 font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer)]">
                {item.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper" labelledBy="guarantee-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Reveal>
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer-deep)]">
              The guarantee
            </p>
            <h2
              id="guarantee-heading"
              className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--ink)]"
            >
              What you get in writing.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.5] text-[var(--primer-deep)]">
              Ask us for the written terms before you book. A guarantee you
              cannot read the wording of is not worth a great deal, and we would
              rather you checked.
            </p>
          </Reveal>
          <Reveal delayMs={120}>
            <ul className="grid gap-px overflow-hidden rounded-[4px] border border-[#DDE1E6] bg-[#DDE1E6] sm:grid-cols-2">
              {trustClaims.map((claim) => (
                <li key={claim.label} className="bg-white px-5 py-5">
                  <p className="font-utility text-[15px] font-semibold uppercase tracking-[0.08em] text-[var(--ink)]">
                    {claim.label}
                  </p>
                  <p className="mt-1.5 text-[15.5px] leading-[1.5] text-[var(--primer-deep)]">
                    {claim.detail}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <Section tone="steel" labelledBy="find-heading">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <Reveal>
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              Find us
            </p>
            <h2
              id="find-heading"
              className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--paper)]"
            >
              {addressLine()}
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
              Easy to reach from West Bromwich, Walsall and the A41. Directions,
              opening hours and the quote form are all on the contact page.
            </p>
            <p className="mt-6 font-utility text-[15px] font-semibold uppercase tracking-[0.08em]">
              <Link
                href="/contact/"
                className="text-[var(--paper)] underline-offset-4 transition-colors hover:text-[var(--red)] hover:underline"
              >
                Directions and opening hours
              </Link>
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
