import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { ContactBlock } from "@/components/home/ContactBlock";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { business, addressLine, serviceArea, telHref } from "@/config/business";

export const metadata: Metadata = {
  title: `Contact Us in ${business.address.locality}`,
  description:
    `Find us at ${addressLine()}. Opening hours, directions and a quote form — or send photos on WhatsApp for a same-day price.`,
  alternates: { canonical: "/contact/" },
};

/**
 * Contact — CLAUDE.md §7: map, hours, directions, quote form.
 *
 * The map/hours/form block is the homepage's ContactBlock reused rather than
 * reimplemented, so the NAP details can only ever be stated once (§10 —
 * inconsistency is the most common reason local sites underperform).
 */
export default function ContactPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "/contact/" },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs trail={trail} tone="ink" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
            <Reveal>
              <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
                Contact
              </p>
              <h1 className="font-display mt-3 max-w-[16ch] text-[clamp(34px,6vw,54px)] leading-[0.98] text-[var(--paper)]">
                Come in, or send three photos.
              </h1>
              <p className="mt-5 max-w-[46ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
                We&rsquo;re on Holloway Bank in {business.address.locality}, a few
                minutes from West Bromwich and the A41, covering{" "}
                {serviceArea.blurb}. If the car is in front of you right now,
                WhatsApp is the quickest way to get a price.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <WhatsAppCta />
                <CallCta />
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <dl className="grid gap-px overflow-hidden rounded-[4px] border border-[var(--line)] bg-[var(--line)]">
                <div className="bg-[var(--steel)] px-5 py-4">
                  <dt className="font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer)]">
                    Address
                  </dt>
                  <dd className="mt-1.5 text-[16.5px] leading-[1.5] text-[var(--paper)]">
                    {business.address.street}
                    <br />
                    {business.address.locality}, {business.address.postcode}
                  </dd>
                </div>
                <div className="bg-[var(--steel)] px-5 py-4">
                  <dt className="font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer)]">
                    Phone
                  </dt>
                  <dd className="mt-1.5 text-[16.5px] leading-[1.5]">
                    <a
                      href={telHref()}
                      data-analytics="phone-call"
                      className="text-[var(--paper)] transition-colors hover:text-[var(--red)]"
                    >
                      {business.phone}
                    </a>
                  </dd>
                </div>
                <div className="bg-[var(--steel)] px-5 py-4">
                  <dt className="font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer)]">
                    Email
                  </dt>
                  <dd className="mt-1.5 text-[16.5px] leading-[1.5]">
                    <a
                      href={`mailto:${business.email}`}
                      className="text-[var(--paper)] transition-colors hover:text-[var(--red)]"
                    >
                      {business.email}
                    </a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Map, hours and the quote form — shared with the homepage. */}
      <ContactBlock />

      <Section tone="ink" labelledBy="directions-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Reveal>
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              Getting here
            </p>
            <h2
              id="directions-heading"
              className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--paper)]"
            >
              Holloway Bank, on the A41.
            </h2>
          </Reveal>
          <Reveal delayMs={100} className="space-y-4 text-[16.5px] leading-[1.55] text-[#C2CBD6]">
            <p>
              Holloway Bank is the stretch of the A41 running between West
              Bromwich and {business.address.locality}. If you are coming from
              the M5, leave at Junction 1 and head north-east — it is a few
              minutes from the island.
            </p>
            <p>
              From Walsall or Darlaston, come down through Hill Top and you will
              pass us on the way into West Bromwich. There is parking on site.
            </p>
            <p className="text-[var(--paper)]">
              If you cannot get the car to us, ask about collection — we cover{" "}
              {serviceArea.blurb}.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
