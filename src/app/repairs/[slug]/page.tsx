import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, SectionHead } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { JsonLd } from "@/components/ui/JsonLd";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { serviceSchema } from "@/lib/schema";
import { services, proofItems, business } from "@/config/business";
import { serviceContent } from "@/content/services";

/**
 * Shared template for the four service lines — CLAUDE.md §8.
 *
 * One route rather than four near-identical files: the structure is genuinely
 * the same on each and the copy all lives in content/services.ts, so a change
 * to the layout cannot land on three pages and miss the fourth.
 *
 * Static export needs every path enumerated up front — see
 * generateStaticParams below.
 */

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

function findService(slug: string) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  const content = serviceContent[service.slug];
  if (!content) return null;
  return { service, content };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = findService(slug);
  if (!found) return {};

  const { service, content } = found;
  return {
    // Title pattern from CLAUDE.md §10.
    title: `${service.name} in ${business.address.locality}`,
    description: content.standfirst.slice(0, 155),
    alternates: { canonical: `/repairs/${service.slug}/` },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const found = findService(slug);
  if (!found) notFound();

  const { service, content } = found;
  const proof = proofItems.filter((p) => content.proofIds.includes(p.id));

  const trail = [
    { label: "Home", href: "/" },
    { label: "Repairs", href: "/repairs/" },
    { label: service.name, href: `/repairs/${service.slug}/` },
  ];

  return (
    <>
      <JsonLd
        data={serviceSchema({
          name: service.name,
          description: content.standfirst,
          path: `/repairs/${service.slug}/`,
        })}
      />

      {/* Hero — names the damage type, per the brief. */}
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs trail={trail} tone="ink" />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
                {business.address.locality} · {business.shortName}
              </p>
              <h1 className="font-display mt-3 text-[clamp(34px,6vw,54px)] leading-[0.98] text-[var(--paper)]">
                {content.headline}
              </h1>
              <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
                {content.standfirst}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppCta />
                <CallCta />
              </div>
            </Reveal>

            <Reveal delayMs={120} className="diag-mask-b overflow-hidden rounded-[4px]">
              <Photo
                slug={service.photo}
                alt={service.photoAlt}
                width={760}
                height={517}
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="h-full w-full object-cover"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's included */}
      <Section tone="paper" labelledBy="included-heading">
        <SectionHead
          tone="paper"
          id="included-heading"
          eyebrow="What's included"
          title="What the job actually covers."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.included.map((item, i) => (
            <Reveal
              key={item.title}
              as="li"
              delayMs={i * 70}
              className="rounded-[4px] border border-[#DDE1E6] bg-white px-5 py-5 transition-[border-color,box-shadow] duration-300 hover:border-[var(--red)] hover:shadow-[0_14px_34px_rgba(228,38,44,0.12)]"
            >
              <h3 className="font-display text-[20px] text-[var(--ink)]">{item.title}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.5] text-[var(--primer-deep)]">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* The process */}
      <Section tone="ink" labelledBy="process-heading">
        <SectionHead
          tone="ink"
          id="process-heading"
          eyebrow="The process"
          title="How it runs, start to finish."
        />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-5">
          {content.process.map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delayMs={i * 80}
              className="group bg-[var(--steel)] p-6 transition-colors duration-300 hover:bg-[#212b3b]"
            >
              <span
                aria-hidden
                className="font-display block text-[32px] leading-none text-[var(--line)] transition-colors duration-300 group-hover:text-[var(--red)]"
              >
                0{i + 1}
              </span>
              <h3 className="font-display mt-3 text-[18px] text-[var(--paper)]">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.5] text-[var(--primer)]">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Long-form detail — this is what ranks. */}
      <Section tone="paper" labelledBy="detail-heading">
        <SectionHead
          tone="paper"
          id="detail-heading"
          eyebrow="In detail"
          title="Worth knowing before you book."
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          {content.detail.map((block, i) => (
            <Reveal key={block.heading} delayMs={i * 80} as="article">
              <h3 className="font-display text-[22px] leading-[1.15] text-[var(--ink)]">
                {block.heading}
              </h3>
              {block.paras.map((para, j) => (
                <p
                  key={j}
                  className="mt-3 text-[16.5px] leading-[1.55] text-[var(--primer-deep)]"
                >
                  {para}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Proof for this service line */}
      {proof.length > 0 && (
        <Section tone="ink" labelledBy="service-proof-heading">
          <SectionHead
            tone="ink"
            id="service-proof-heading"
            eyebrow="Our work"
            title="A job like yours."
            intro="Drag to compare. Photographed as it arrived and again when it left."
          />
          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {proof.map((item, i) => (
              <Reveal
                key={item.id}
                as="li"
                delayMs={i * 90}
                className="overflow-hidden rounded-[4px] border border-[var(--line)] bg-[var(--steel)]"
              >
                <BeforeAfter
                  before={item.before}
                  after={item.after}
                  beforeAlt={item.beforeAlt}
                  afterAlt={item.afterAlt}
                  className="h-[260px]"
                />
                <div className="px-5 py-4">
                  <h3 className="font-display text-[20px] text-[var(--paper)]">{item.vehicle}</h3>
                  <p className="mt-2 text-[15.5px] leading-[1.5] text-[var(--primer)]">
                    {item.damage}
                  </p>
                  <p className="mt-3 font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer)]">
                    {service.name} · {item.turnaround}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      {/* Price guidance */}
      <Section tone="paper" labelledBy="pricing-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Reveal>
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer-deep)]">
              What it costs
            </p>
            <h2
              id="pricing-heading"
              className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--ink)]"
            >
              {content.pricing.band}
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.5] text-[var(--primer-deep)]">
              {content.pricing.note}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppCta label="Get a price on WhatsApp" />
              <CallCta variant="outlineDark" />
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <h3 className="font-utility text-[15px] font-semibold uppercase tracking-[0.13em] text-[var(--ink)]">
              What moves the price
            </h3>
            <ul className="mt-4 space-y-3">
              {content.pricing.factors.map((factor) => (
                <li
                  key={factor}
                  className="flex items-start gap-3 text-[16.5px] leading-[1.5] text-[var(--primer-deep)]"
                >
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--red)]" />
                  {factor}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* FAQ + schema */}
      <Section tone="ink" labelledBy="faq-heading">
        <Faq items={content.faqs} tone="ink" headingId="faq-heading" />

        <div className="mt-12 border-t border-[var(--line)] pt-10">
          <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
            Other things we do
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/repairs/${other.slug}/`}
                    className="font-utility text-[17px] font-semibold uppercase tracking-[0.08em] text-[var(--paper)] underline-offset-4 transition-colors hover:text-[var(--red)] hover:underline"
                  >
                    {other.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
