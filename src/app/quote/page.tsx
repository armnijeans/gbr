import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/home/QuoteForm";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { business } from "@/config/business";

export const metadata: Metadata = {
  title: `Get a Repair Quote in ${business.address.locality}`,
  description:
    "Send three photos of the damage and get a price, usually the same day. WhatsApp is fastest — or fill in the form and it reaches the same inbox.",
  alternates: { canonical: "/quote/" },
};

/**
 * Standalone photo-quote flow — CLAUDE.md §7 and §9.
 *
 * WhatsApp leads because it is the primary conversion (§1). The form is the
 * desktop fallback for exactly the case the brief names: WhatsApp Web may not
 * be signed in, and a dead deep link would otherwise lose the enquiry.
 */
export default function QuotePage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Get a price", href: "/quote/" },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs trail={trail} tone="ink" />
          <Reveal className="mt-8">
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              Get a price
            </p>
            <h1 className="font-display mt-3 max-w-[16ch] text-[clamp(34px,6vw,54px)] leading-[0.98] text-[var(--paper)]">
              Three photos. That&rsquo;s all we need.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
              No forms to fight with and no waiting on hold. Send the photos on
              WhatsApp and we&rsquo;ll come back with a real figure, usually the
              same day.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppCta label="Send photos on WhatsApp" />
              <CallCta />
            </div>
          </Reveal>
        </div>
      </section>

      <Section tone="steel" labelledBy="photos-heading">
        <SectionHead
          tone="steel"
          id="photos-heading"
          eyebrow="What to send"
          title="Three photos, in this order."
          intro="Take them in daylight if you can, and keep the phone steady. Blurry photos mean we have to ask you to send them again."
        />
        <ol className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
          {[
            {
              title: "The whole car",
              body: "Stand back far enough to get all of it in frame. This tells us the model, the colour and the overall condition.",
            },
            {
              title: "The damage",
              body: "From about a metre away, square on. We need to see the damage and enough of the panel around it to judge the extent.",
            },
            {
              title: "Close up",
              body: "As near as your phone will focus. This is what tells us whether the paint is broken and how deep it goes.",
            },
          ].map((step, i) => (
            <Reveal
              key={step.title}
              as="li"
              delayMs={i * 80}
              className="group bg-[var(--ink)] p-6 transition-colors duration-300 hover:bg-[#141b26]"
            >
              <span
                aria-hidden
                className="font-display block text-[32px] leading-none text-[var(--line)] transition-colors duration-300 group-hover:text-[var(--red)]"
              >
                0{i + 1}
              </span>
              <h3 className="font-display mt-3 text-[19px] text-[var(--paper)]">
                <span className="sr-only">Photo {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-[15.5px] leading-[1.5] text-[var(--primer)]">{step.body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal delayMs={240} className="mt-8">
          <WhatsAppCta label="Open WhatsApp and send them" />
        </Reveal>
      </Section>

      <Section tone="paper" labelledBy="form-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <Reveal>
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer-deep)]">
              Or type it out
            </p>
            <h2
              id="form-heading"
              className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--ink)]"
            >
              Prefer a form?
            </h2>
            <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.5] text-[var(--primer-deep)]">
              This reaches the same inbox. Attach photos if you have them —
              it&rsquo;s optional, but a quote without them is a guess rather
              than a price.
            </p>
            <p className="mt-4 max-w-[44ch] text-[16.5px] leading-[1.5] text-[var(--primer-deep)]">
              If it&rsquo;s urgent, ring {business.phone} rather than waiting on
              email.
            </p>
          </Reveal>

          <Reveal delayMs={120}>
            <QuoteForm />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
