import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { business, addressLine } from "@/config/business";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms of business for repairs carried out by ${business.tradingName}.`,
  alternates: { canonical: "/terms/" },
};

/**
 * Terms — CLAUDE.md §7.
 *
 * ---------------------------------------------------------------------------
 * THIS IS A STARTING POINT, NOT LEGAL ADVICE
 * ---------------------------------------------------------------------------
 * The structure is right and the consumer-law references are accurate, but
 * every commercial term below (deposits, storage charges, guarantee scope,
 * cancellation) is a business decision that has to be yours, not mine. Each
 * one is marked. Have someone qualified review this before you rely on it —
 * unenforceable terms are worse than no terms, because they give you false
 * confidence at exactly the wrong moment.
 */

const sections = [
  {
    heading: "Who these terms are with",
    paras: [
      `These terms apply to work carried out by ${business.legalName}, trading as ${business.tradingName}, of ${addressLine()} (company number ${business.companyNo}).`,
      "They apply whether you booked in person, by phone, by WhatsApp or through this website.",
    ],
  },
  {
    heading: "Quotes and estimates",
    paras: [
      "A price given from photographs is an estimate based on what we can see. It is not a fixed quotation, because photographs do not show what is behind a panel.",
      "Where stripping the vehicle reveals additional damage, we will stop and contact you with a revised figure before doing any further work. You will never receive an invoice for work you did not authorise.",
      "Estimates are valid for TODO — confirm how long, 30 days is typical. Parts prices in particular move.",
    ],
  },
  {
    heading: "Booking, deposits and cancellation",
    paras: [
      "TODO — confirm your policy. Do you take a deposit? Is it required only where parts are ordered specially? How much notice do you need to cancel or rearrange without charge?",
      "Where parts have been ordered specifically for your vehicle and cannot be returned, we may charge for those parts if you cancel. TODO — confirm whether this reflects how you actually operate.",
    ],
  },
  {
    heading: "Your vehicle while it is with us",
    paras: [
      "Please remove personal belongings before leaving the vehicle. TODO — confirm your position on items left in vehicles and check what your insurance actually covers.",
      "TODO — confirm your storage policy. Many shops allow a few days after completion and then charge daily. State the free period and the daily rate here.",
    ],
  },
  {
    heading: "Payment",
    paras: [
      "Unless the work is being paid for directly by an insurer, payment is due on collection. TODO — confirm which payment methods you accept.",
      "Where an insurer is settling the claim, you remain responsible for your policy excess and for any work outside the scope of the claim.",
      "TODO — confirm whether you retain a lien over the vehicle until payment is made. Most repairers do; it should be stated explicitly if so.",
    ],
  },
  {
    heading: "Our guarantee",
    paras: [
      "TODO — this section must match the guarantee advertised elsewhere on the site, and the wording matters. Set out exactly what is covered, for how long, whether it transfers if you sell the vehicle, and what voids it.",
      "A guarantee typically will not cover fair wear and tear, stone chips, damage from a later incident, or the consequences of poor aftercare in the days following a respray. State your actual exclusions rather than leaving them implied.",
    ],
  },
  {
    heading: "Aftercare following paintwork",
    paras: [
      "Fresh paint continues to cure after you collect the vehicle. TODO — confirm your aftercare advice and the period it applies for; commonly this means avoiding automatic car washes, waxing and polishing for several weeks.",
      "Damage caused by ignoring aftercare advice is not a defect in the work and will not be covered by the guarantee.",
    ],
  },
  {
    heading: "Your legal rights",
    paras: [
      "Nothing in these terms affects your statutory rights. Under the Consumer Rights Act 2015, services must be carried out with reasonable care and skill, and goods supplied must be of satisfactory quality, fit for purpose and as described.",
      "If something is not right, tell us first and give us the chance to put it right. We would far rather fix it than have you unhappy.",
    ],
  },
];

export default function TermsPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Terms", href: "/terms/" },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-14">
          <Breadcrumbs trail={trail} tone="ink" />
          <h1 className="font-display mt-8 text-[clamp(32px,5vw,44px)] leading-[1.02] text-[var(--paper)]">
            Terms &amp; conditions
          </h1>
          <p className="mt-4 max-w-[52ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
            The terms your repair is carried out under, and what to do if
            something isn&rsquo;t right.
          </p>
        </div>
      </section>

      <Section tone="paper">
        <div className="max-w-[68ch]">
          {sections.map((section) => (
            <section key={section.heading} className="mt-10 first:mt-0">
              <h2 className="font-display text-[24px] leading-[1.15] text-[var(--ink)]">
                {section.heading}
              </h2>
              {section.paras.map((para, i) => (
                <p key={i} className="mt-3 text-[16.5px] leading-[1.55] text-[var(--primer-deep)]">
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>
      </Section>
    </>
  );
}
