import Link from "next/link";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Aimed squarely at "someone hit me, what now" — CLAUDE.md §8.
 * Dark section. This is the highest-value enquiry on the site and the
 * competitor has no equivalent journey (§3).
 */
const points = [
  {
    title: "You choose the repairer",
    body: "Not your insurer. They may recommend one, but the choice is yours by law — and you can say so on the call.",
  },
  {
    title: "We deal with the insurer",
    body: "Estimates, authorisation, engineer's inspection, supplementary work. You do not sit on hold for any of it.",
  },
  {
    title: "Non-fault claims",
    body: "If someone else caused it, you should not be out of pocket. We will tell you plainly where you stand.",
  },
];

export function InsuranceBlock() {
  return (
    <section
      aria-labelledby="insurance-heading"
      className="border-b border-[var(--line)] bg-[var(--ink)]"
    >
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        <Reveal>
          <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
            Insurance claims
          </p>
          <h2
            id="insurance-heading"
            className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--paper)]"
          >
            Someone hit you. Now what?
          </h2>
          <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
            Most people ring their insurer first and lose control of the repair
            in the same phone call. Ring us first and you keep it.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <WhatsAppCta label="Start a claim on WhatsApp" />
            <CallCta />
          </div>

          <p className="mt-5 font-utility text-[15px] font-semibold uppercase tracking-[0.08em]">
            <Link
              href="/insurance-claims/"
              className="text-[var(--paper)] underline-offset-4 hover:underline"
            >
              Read the full claims guide
            </Link>
          </p>
        </Reveal>

        <ul className="space-y-px self-start overflow-hidden rounded-[4px] border border-[var(--line)] bg-[var(--line)]">
          {points.map((p, i) => (
            <Reveal
              key={p.title}
              as="li"
              delayMs={150 + i * 90}
              className="bg-[var(--steel)] px-6 py-5 transition-colors duration-300 hover:bg-[#212b3b]"
            >
              <h3 className="font-display text-[20px] text-[var(--paper)]">{p.title}</h3>
              <p className="mt-2 text-[15.5px] leading-[1.5] text-[var(--primer)]">{p.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
