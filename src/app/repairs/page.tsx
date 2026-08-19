import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { services, business, serviceArea } from "@/config/business";
import { serviceContent } from "@/content/services";

export const metadata: Metadata = {
  title: `Car Body Repairs in ${business.address.locality}`,
  description:
    `Accident repair, SMART repair, paint and resprays, servicing and MOT — all under one roof in ` +
    `${business.address.locality}, serving ${serviceArea.blurb}.`,
  alternates: { canonical: "/repairs/" },
};

/**
 * Services hub — CLAUDE.md §7.
 *
 * Breadth is the competitive position (§3): the nearest competitor sells one
 * service, we sell four. This page exists to make that legible in one view
 * before sending people to the detail pages.
 */
export default function RepairsPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Repairs", href: "/repairs/" },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs trail={trail} tone="ink" />
          <Reveal className="mt-8">
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              What we do
            </p>
            <h1 className="font-display mt-3 max-w-[18ch] text-[clamp(34px,6vw,54px)] leading-[0.98] text-[var(--paper)]">
              Four lines of work, one workshop.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
              Bodywork, paint, alloys and mechanical under one roof — so a single
              job doesn&rsquo;t get split across three units and three sets of
              delays, and a car that needs two of them only goes off the road once.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppCta />
              <CallCta />
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="paper" labelledBy="lines-heading">
        <SectionHead
          tone="paper"
          id="lines-heading"
          eyebrow="Service lines"
          title="Pick the one that sounds like your car."
          intro="Not sure which it is? Send three photos and we'll tell you — that is a faster route than guessing."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {services.map((service, i) => {
            const content = serviceContent[service.slug];
            return (
              <Reveal key={service.slug} as="li" delayMs={i * 80}>
                <Link
                  href={`/repairs/${service.slug}/`}
                  className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-[#DDE1E6] bg-white transition-[border-color,box-shadow] duration-300 hover:border-[var(--red)] hover:shadow-[0_14px_34px_rgba(228,38,44,0.14)]"
                >
                  <div className="diag-mask-b relative h-[200px] shrink-0 overflow-hidden bg-[var(--ink)]">
                    <Photo
                      slug={service.photo}
                      alt={service.photoAlt}
                      width={760}
                      height={517}
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex grow flex-col px-6 pb-6 pt-5">
                    <h2 className="font-display text-[24px] text-[var(--ink)]">{service.name}</h2>
                    <p className="mt-2.5 text-[16px] leading-[1.5] text-[var(--primer-deep)]">
                      {service.summary}
                    </p>

                    <ul className="mt-4 grow space-y-1.5">
                      {content.included.slice(0, 3).map((item) => (
                        <li
                          key={item.title}
                          className="flex items-start gap-2.5 text-[15px] leading-[1.45] text-[var(--primer-deep)]"
                        >
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--red)]"
                          />
                          {item.title}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer-deep)]">
                      {content.pricing.band}
                    </p>
                    <p className="mt-2 font-utility text-[15px] font-semibold uppercase tracking-[0.08em] text-[var(--red)]">
                      <span className="border-b border-transparent transition-colors group-hover:border-[var(--red)]">
                        See what&rsquo;s included
                      </span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      <Section tone="steel" labelledBy="unsure-heading">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <Reveal>
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              Not sure
            </p>
            <h2
              id="unsure-heading"
              className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--paper)]"
            >
              Send three photos instead.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
              A wide shot of the car, one of the damage, one close up. We will tell
              you which of the four it is, what it involves and what it costs —
              usually the same day.
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
