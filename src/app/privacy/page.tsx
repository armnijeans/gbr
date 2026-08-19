import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { business, addressLine } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${business.tradingName} collects, uses and stores your personal data.`,
  alternates: { canonical: "/privacy/" },
};

/**
 * Privacy policy — CLAUDE.md §7.
 *
 * ---------------------------------------------------------------------------
 * THIS IS A STARTING POINT, NOT LEGAL ADVICE
 * ---------------------------------------------------------------------------
 * It describes what this site actually does today: a Web3Forms-backed quote
 * form, a cookieless OpenStreetMap embed, and Cloudflare Web Analytics once
 * that is wired up. That is accurate as far as the code goes.
 *
 * What it cannot know is how the business handles data off the website —
 * how long you keep customer records, who you share them with (insurers,
 * parts suppliers, subcontractors), and whether you are ICO-registered.
 * Those sections are marked below. Have someone qualified read this before
 * launch; a wrong privacy policy is a regulatory problem, not a typo.
 */

const sections = [
  {
    heading: "Who we are",
    paras: [
      `${business.legalName}, trading as ${business.tradingName}, of ${addressLine()}. We are the data controller for personal data collected through this website.`,
      `You can reach us about anything on this page at ${business.email} or ${business.phone}.`,
    ],
  },
  {
    heading: "What we collect, and when",
    paras: [
      "If you submit the quote form, we collect the name, phone number, vehicle registration and description of the damage that you enter, plus any photographs you choose to attach.",
      "If you contact us by WhatsApp, phone or email, we hold whatever you send us in that conversation. WhatsApp messages are processed by WhatsApp under their own privacy terms, not ours.",
      "We do not collect anything else automatically beyond the anonymous, aggregated visit statistics described below.",
    ],
  },
  {
    heading: "Why we hold it",
    paras: [
      "To answer your enquiry, quote for the work, carry out the repair, and deal with your insurer where a claim is involved. Our lawful basis is that processing is necessary to take steps at your request before entering into a contract, and to perform that contract once agreed.",
      "We do not use your details for marketing unless you have separately asked us to.",
    ],
  },
  {
    heading: "Who we share it with",
    paras: [
      "Form submissions are delivered to our inbox by Web3Forms, who process the message in transit on our behalf.",
      "TODO — confirm and list the rest: insurers and their engineers where you are handling a claim, parts suppliers, any subcontracted specialists, and your accountant. If you share customer data with any of these, it belongs here.",
      "We do not sell your data to anyone, and we never will.",
    ],
  },
  {
    heading: "How long we keep it",
    paras: [
      "TODO — confirm your actual retention periods. Repair records are typically kept for several years to support the workmanship guarantee and to meet accounting obligations; enquiries that never became jobs should be deleted sooner. State real periods here rather than 'as long as necessary'.",
    ],
  },
  {
    heading: "Cookies and analytics",
    paras: [
      "This site sets no advertising or tracking cookies, which is why you are not being asked to dismiss a consent banner.",
      "The map on our contact page is embedded from OpenStreetMap, chosen specifically because it does not set cookies.",
      "TODO — once Cloudflare Web Analytics is enabled, describe it here: it measures page views without cookies and without collecting personal data or fingerprinting visitors.",
    ],
  },
  {
    heading: "Your rights",
    paras: [
      "Under UK GDPR you can ask us for a copy of the personal data we hold about you, ask us to correct it if it is wrong, ask us to delete it, or object to how we are using it. Contact us using the details above and we will respond within one month.",
      "If you are not satisfied with how we have handled your data, you can complain to the Information Commissioner's Office at ico.org.uk.",
      "TODO — confirm whether the business is registered with the ICO. Most businesses processing personal data electronically are required to register and pay the data protection fee.",
    ],
  },
];

export default function PrivacyPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Privacy", href: "/privacy/" },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-14">
          <Breadcrumbs trail={trail} tone="ink" />
          <h1 className="font-display mt-8 text-[clamp(32px,5vw,44px)] leading-[1.02] text-[var(--paper)]">
            Privacy policy
          </h1>
          <p className="mt-4 max-w-[52ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
            What we collect when you contact us, why we hold it, and what you can
            ask us to do about it.
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
