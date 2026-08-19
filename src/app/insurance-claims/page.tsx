import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHead } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Faq } from "@/components/ui/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { business, ph } from "@/config/business";

export const metadata: Metadata = {
  title: `Insurance Claim Repairs in ${business.address.locality}`,
  description:
    "You choose the repairer, not your insurer. We deal with the claim directly — non-fault, fault, excess and courtesy car explained plainly, plus what to do at the scene.",
  alternates: { canonical: "/insurance-claims/" },
};

/**
 * Insurance claims — CLAUDE.md §8, the highest-value page on the site and a
 * journey the nearest competitor does not have at all (§3).
 *
 * The legal points below (your right to choose a repairer, non-fault vs fault,
 * excess recovery) are general UK consumer-insurance facts, not claims about
 * this business, so they are safe to publish as written. Anything specific to
 * GBR — courtesy car provision, whether we handle non-fault claims — is
 * wrapped in ph() and needs confirming.
 */

const atScene = [
  {
    title: "Stop and stay calm",
    body: "Legally you must stop. Switch the engine off, put hazards on, and get everyone somewhere safe before anything else.",
  },
  {
    title: "Don't admit fault",
    body: "Not at the scene, not in a text afterwards. Liability is decided on evidence, and an apology in the moment can be used against you later.",
  },
  {
    title: "Exchange details",
    body: "Name, address, phone, insurer and policy number, plus the registration of every vehicle involved. You are legally required to give yours.",
  },
  {
    title: "Photograph everything",
    body: "All vehicles, all angles, the wider scene, road markings, signs and any debris. More is better — you cannot come back for these.",
  },
  {
    title: "Get witnesses",
    body: "A name and number from anyone who saw it is worth more than any amount of argument afterwards. Note any dashcam vehicles too.",
  },
  {
    title: "Ring us before your insurer",
    body: "Once you have called the insurer the repair is often steered before you have had a say. A call to us first costs nothing and keeps the choice yours.",
  },
];

const faqs = [
  {
    q: "Can I choose my own repairer?",
    a: "Yes. It is your legal right and it does not depend on your insurer's approval. They may recommend a shop from their approved network, and you may decline. Simply tell them you have already chosen your repairer and give them our details.",
  },
  {
    q: "What is the difference between a fault and a non-fault claim?",
    a: "A non-fault claim is one where another identified party was responsible — their insurer ultimately pays. A fault claim is one where you were responsible, or where the other party cannot be traced, so your own policy covers it. The distinction affects your excess, your no-claims bonus and often whether you get a replacement vehicle.",
  },
  {
    q: "Will I have to pay my excess?",
    a: "On a fault claim, yes — it is the amount you agreed to contribute. On a genuine non-fault claim you should not be out of pocket, and where the other party's insurer accepts liability your excess is normally recovered for you. Ask before you assume you have to pay it.",
  },
  {
    q: "Will claiming push my premium up?",
    a: "A fault claim usually will, and will normally affect your no-claims discount unless you have protected it. A non-fault claim where liability is settled against the other driver should not, though insurers do ask about all incidents regardless of fault. If the damage is minor it is worth comparing the repair cost against your excess before claiming at all — we will give you that figure without obligation.",
  },
  {
    q: "Do I get a courtesy car?",
    a: ph(
      "Subject to availability — confirm it with us when you book rather than assuming. On a non-fault claim you may also be entitled to a like-for-like replacement vehicle through the other party's insurer, which is a separate route worth asking about.",
    ),
  },
  {
    q: "How long does an insurance repair take?",
    a: ph(
      "The repair itself is usually the shorter half. Waiting on the insurer's authorisation and their engineer's inspection is what tends to set the timeline. We chase both rather than leaving you to, and we will give you a realistic date once the car is assessed.",
    ),
  },
  {
    q: "Do you handle the claim, or do I?",
    a: "We do. We produce the estimate, deal with the insurer's engineer, and negotiate any supplementary work found once the car is stripped. You should not be relaying messages between two companies about your own car.",
  },
  {
    q: "My car might be written off — what happens?",
    a: "An insurer writes a car off when the repair cost passes a proportion of its value, not when it is beyond repair. If you disagree with their valuation you can challenge it with evidence of comparable cars for sale. You can also sometimes keep the vehicle and take a reduced settlement. Talk to us before you accept the first offer.",
  },
];

export default function InsuranceClaimsPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Insurance claims", href: "/insurance-claims/" },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs trail={trail} tone="ink" />
          <Reveal className="mt-8">
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              Insurance claims
            </p>
            <h1 className="font-display mt-3 max-w-[16ch] text-[clamp(34px,6vw,54px)] leading-[0.98] text-[var(--paper)]">
              Someone hit you. Now what?
            </h1>
            <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
              Most people ring their insurer first and lose control of the repair in
              the same phone call. You do not have to. The car is yours, the choice
              of repairer is yours, and one call to us before you start the claim
              keeps it that way.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <WhatsAppCta label="Start a claim on WhatsApp" />
              <CallCta />
            </div>
          </Reveal>
        </div>
      </section>

      {/* The one thing most people don't know. */}
      <Section tone="paper" labelledBy="choose-heading">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <Reveal>
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer-deep)]">
              Your right
            </p>
            <h2
              id="choose-heading"
              className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--ink)]"
            >
              You choose the repairer.
            </h2>
          </Reveal>
          <Reveal delayMs={100} className="space-y-4 text-[16.5px] leading-[1.55] text-[var(--primer-deep)]">
            <p>
              Your insurer will usually offer you a shop from their approved network.
              That is a recommendation, not an instruction, and you are entitled to
              decline it. Approved networks exist because the insurer has negotiated
              rates with those shops — a commercial arrangement between them, which
              is not the same thing as the best outcome for your car.
            </p>
            <p>
              Saying no costs you nothing. Tell them you have already chosen your
              repairer, give them our details, and the claim proceeds normally. Some
              policies attach a higher excess to using a non-approved repairer, so
              it is worth checking your documents — but that is a number you can
              weigh up, not a rule that removes the choice.
            </p>
            <p className="text-[var(--ink)]">
              If you take one thing from this page: ring us before you ring them.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Fault vs non-fault, laid out plainly. */}
      <Section tone="ink" labelledBy="fault-heading">
        <SectionHead
          tone="ink"
          id="fault-heading"
          eyebrow="The two situations"
          title="Non-fault and fault, in plain English."
          intro="Which one you are in changes your excess, your no-claims bonus and whether you get a replacement car. It is worth knowing before you pick up the phone."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[4px] border border-[var(--line)] bg-[var(--steel)] p-6 sm:p-8">
            <h3 className="font-display text-[24px] text-[var(--paper)]">Non-fault</h3>
            <p className="mt-2 font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--red)]">
              Someone else was responsible
            </p>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.5] text-[var(--primer)]">
              {[
                "You should not be out of pocket at all",
                "Your excess is normally recovered from the other insurer",
                "Your no-claims discount should be protected once liability settles",
                "You may be entitled to a like-for-like replacement vehicle",
                "The other party's insurer ultimately pays for the repair",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--red)]" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delayMs={100} className="rounded-[4px] border border-[var(--line)] bg-[var(--steel)] p-6 sm:p-8">
            <h3 className="font-display text-[24px] text-[var(--paper)]">Fault</h3>
            <p className="mt-2 font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer)]">
              You were responsible, or the other driver can&rsquo;t be traced
            </p>
            <ul className="mt-5 space-y-3 text-[16px] leading-[1.5] text-[var(--primer)]">
              {[
                "You pay your excess",
                "Your no-claims discount is affected unless protected",
                "Your premium will usually rise at renewal",
                "Worth comparing the repair cost against your excess first",
                "For smaller damage, paying directly is often the better outcome",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primer)]" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delayMs={160} className="mt-6 rounded-[4px] border border-[var(--line)] bg-[var(--ink)] p-6">
          <p className="text-[16.5px] leading-[1.55] text-[#C2CBD6]">
            <span className="text-[var(--paper)]">Not sure which you are in?</span> Send
            us the details and we will tell you straight, including when
            <em className="not-italic text-[var(--paper)]"> not </em>
            to claim. If the repair costs less than your excess, claiming actively
            makes you worse off, and we would rather say so than take the work on a
            bad footing.
          </p>
        </Reveal>
      </Section>

      {/* At the scene — the shareable, link-earning bit (§8). */}
      <Section tone="paper" labelledBy="scene-heading">
        <SectionHead
          tone="paper"
          id="scene-heading"
          eyebrow="At the scene"
          title="Six things to do before you drive away."
          intro="Screenshot this. The moment after an accident is exactly when nobody remembers what they were supposed to do."
        />

        <ol className="mt-10 grid gap-px overflow-hidden rounded-[4px] border border-[#DDE1E6] bg-[#DDE1E6] sm:grid-cols-2 lg:grid-cols-3">
          {atScene.map((item, i) => (
            <Reveal
              key={item.title}
              as="li"
              delayMs={i * 70}
              className="group bg-white p-6 transition-colors duration-300 hover:bg-[#F1F3F5]"
            >
              <span
                aria-hidden
                className="font-display block text-[32px] leading-none text-[#C9D0D8] transition-colors duration-300 group-hover:text-[var(--red)]"
              >
                0{i + 1}
              </span>
              <h3 className="font-display mt-3 text-[19px] text-[var(--ink)]">
                <span className="sr-only">Step {i + 1}: </span>
                {item.title}
              </h3>
              <p className="mt-2 text-[15.5px] leading-[1.5] text-[var(--primer-deep)]">
                {item.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* What we actually do for you. */}
      <Section tone="steel" labelledBy="wedo-heading">
        <SectionHead
          tone="steel"
          id="wedo-heading"
          eyebrow="What we handle"
          title="You shouldn't be the middleman for your own car."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "The estimate",
              body: "Documented properly the first time, so it stands up to the insurer's engineer rather than triggering a fortnight of back-and-forth.",
            },
            {
              title: "The insurer",
              body: "Authorisation, the engineer's inspection, and any supplementary work found once the car is stripped. We chase them, not you.",
            },
            {
              title: "The excess",
              body: "On a non-fault claim we will tell you what should be recoverable and from whom, before you hand any money over.",
            },
            {
              title: "The repair",
              body: "Panel, paint and structural work in-house, with mechanical and alignment checked as part of the same job.",
            },
          ].map((item, i) => (
            <Reveal
              key={item.title}
              as="li"
              delayMs={i * 70}
              className="rounded-[4px] border border-[var(--line)] bg-[var(--ink)] px-5 py-5 transition-colors duration-300 hover:border-[var(--red)]"
            >
              <h3 className="font-display text-[19px] text-[var(--paper)]">{item.title}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.5] text-[var(--primer)]">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="ink" labelledBy="claims-faq-heading">
        <Faq items={faqs} tone="ink" headingId="claims-faq-heading" heading="Insurance questions, answered" />

        <Reveal className="mt-12 border-t border-[var(--line)] pt-10">
          <h2 className="font-display text-[clamp(24px,3.4vw,32px)] text-[var(--paper)]">
            Had an accident? Start here.
          </h2>
          <p className="mt-3 max-w-[46ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
            Send us photos of the damage and tell us what happened. We will tell you
            where you stand — including whether claiming is worth it at all.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppCta label="Start a claim on WhatsApp" />
            <CallCta />
          </div>
          <p className="mt-6 font-utility text-[15px] font-semibold uppercase tracking-[0.08em]">
            <Link
              href="/repairs/accident-repair/"
              className="text-[var(--paper)] underline-offset-4 transition-colors hover:text-[var(--red)] hover:underline"
            >
              More on accident repair
            </Link>
          </p>
        </Reveal>
      </Section>
    </>
  );
}
