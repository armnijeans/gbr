import type { Metadata } from "next";
import { Section, SectionHead } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { reviews, business } from "@/config/business";

export const metadata: Metadata = {
  title: `Customer Reviews in ${business.address.locality}`,
  description:
    `What customers say after the job is done. Read verified reviews for ${business.tradingName} and leave your own on Google.`,
  alternates: { canonical: "/reviews/" },
};

/**
 * Reviews — CLAUDE.md §7.
 *
 * NOTE ON SCHEMA: there is deliberately no Review or AggregateRating JSON-LD
 * on this page. The quotes and the rating in business.ts are placeholders, and
 * marking up invented reviews is the exact structured-data violation §10
 * warns against. Wire the schema up in the same commit that brings in the real
 * Google reviews, not before.
 */
export default function ReviewsPage() {
  const trail = [
    { label: "Home", href: "/" },
    { label: "Reviews", href: "/reviews/" },
  ];

  return (
    <>
      <section className="border-b border-[var(--line)] bg-[var(--ink)]">
        <div className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 sm:py-16">
          <Breadcrumbs trail={trail} tone="ink" />
          <Reveal className="mt-8">
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              Reviews
            </p>
            <h1 className="font-display mt-3 max-w-[18ch] text-[clamp(34px,6vw,54px)] leading-[0.98] text-[var(--paper)]">
              What people say afterwards.
            </h1>
            <p className="mt-5 max-w-[52ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
              The only opinion that counts is one from someone who has already
              had the keys handed back. Here is what ours say.
            </p>
            <p className="mt-6 font-utility text-[17px] font-semibold uppercase tracking-[0.08em] text-[var(--paper)]">
              {reviews.rating} out of 5 · {reviews.count} Google reviews
            </p>
          </Reveal>
        </div>
      </section>

      <Section tone="paper" labelledBy="quotes-heading">
        <SectionHead
          tone="paper"
          id="quotes-heading"
          eyebrow="In their words"
          title="Unedited, and linked to the originals."
          intro="Every quote below is on our Google Business Profile — follow the link and read them there rather than taking our word for it."
        />

        <ul className="mt-10 grid gap-5 lg:grid-cols-3">
          {reviews.quotes.map((r, i) => (
            <Reveal
              key={i}
              as="li"
              delayMs={i * 80}
              className="flex flex-col rounded-[4px] border border-[#DDE1E6] bg-white px-6 py-6 transition-[border-color,box-shadow] duration-300 hover:border-[var(--red)] hover:shadow-[0_14px_34px_rgba(228,38,44,0.12)]"
            >
              <Stars />
              <blockquote className="mt-4 grow text-[16.5px] leading-[1.55] text-[var(--primer-deep)]">
                <p>&ldquo;{r.quote}&rdquo;</p>
              </blockquote>
              <footer className="mt-5 font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--ink)]">
                {r.author}
                <span className="block mt-1 text-[var(--primer-deep)]">{r.job}</span>
              </footer>
            </Reveal>
          ))}
        </ul>

        <Reveal delayMs={200} className="mt-10">
          <a
            href={business.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-utility text-[17px] font-semibold uppercase tracking-[0.08em] text-[var(--red)] underline-offset-4 hover:underline"
          >
            Read all reviews on Google
          </a>
        </Reveal>
      </Section>

      <Section tone="steel" labelledBy="leave-heading">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <Reveal>
            <p className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)]">
              Had work done?
            </p>
            <h2
              id="leave-heading"
              className="font-display mt-3 text-[clamp(28px,4.4vw,40px)] text-[var(--paper)]"
            >
              Two minutes, and it genuinely helps.
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.5] text-[#C2CBD6]">
              We are an independent shop competing with dealer networks. A
              review from you is worth more to us than any advertising we could
              buy, and it tells the next person standing next to a damaged car
              that we are worth ringing.
            </p>
          </Reveal>
          <Reveal delayMs={120} className="lg:flex lg:justify-end">
            <a
              href={business.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="on-red inline-flex min-h-[48px] items-center justify-center rounded-[3px] border border-transparent bg-[var(--red)] px-[22px] py-[13px] font-utility text-[19px] font-semibold uppercase leading-none tracking-[0.05em] text-white shadow-[0_0_0_rgba(228,38,44,0)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-px hover:bg-[#c81f24] hover:shadow-[0_8px_24px_rgba(228,38,44,0.35)]"
            >
              Leave a Google review
            </a>
          </Reveal>
        </div>
      </Section>

      <Section tone="paper" labelledBy="next-heading">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14">
          <Reveal>
            <h2
              id="next-heading"
              className="font-display text-[clamp(28px,4.4vw,40px)] text-[var(--ink)]"
            >
              Want the same result?
            </h2>
            <p className="mt-4 max-w-[46ch] text-[16.5px] leading-[1.5] text-[var(--primer-deep)]">
              Send three photos of the damage and we&rsquo;ll price it, usually
              the same day.
            </p>
          </Reveal>
          <Reveal delayMs={120} className="flex flex-wrap gap-3 lg:justify-end">
            <WhatsAppCta />
            <CallCta variant="outlineDark" />
          </Reveal>
        </div>
      </Section>
    </>
  );
}

/** Five filled stars. Decorative — the numeric rating is stated in text above. */
function Stars() {
  return (
    <div aria-hidden className="flex gap-1 text-[var(--red)]">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.6Z" />
        </svg>
      ))}
    </div>
  );
}
