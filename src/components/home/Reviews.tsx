import { Section, SectionHead } from "@/components/ui/Section";
import { ReviewsCarousel } from "@/components/home/ReviewsCarousel";
import { reviews, business } from "@/config/business";

/**
 * Live Google rating plus rotating quotes — CLAUDE.md §8.
 *
 * `rating` and `count` stay null until the Google Business Profile is live.
 * Never fake an aggregateRating (§10) — the JSON-LD omits it entirely while
 * these are null, and this block hides the rating line rather than showing a
 * placeholder score that could be mistaken for real.
 */
export function Reviews() {
  return (
    <Section tone="steel" labelledBy="reviews-heading">
      <SectionHead
        tone="steel"
        id="reviews-heading"
        eyebrow="Reviews"
        title="What people say afterwards."
        intro="Thirty genuine Google reviews inside six months is the single biggest ranking lever available — ask every customer as you hand the keys back."
      />

      <p className="mt-6 font-utility text-[17px] font-semibold uppercase tracking-[0.08em] text-[var(--paper)]">
        {reviews.rating} out of 5 · {reviews.count} Google reviews
      </p>

      <div className="mt-8">
        <ReviewsCarousel quotes={reviews.quotes} />
      </div>

      <p className="mt-8 font-utility text-[15px] font-semibold uppercase tracking-[0.08em]">
        <a
          href={business.googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--paper)] underline-offset-4 hover:underline"
        >
          Read all reviews on Google
        </a>
      </p>
    </Section>
  );
}
