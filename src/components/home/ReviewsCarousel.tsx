"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { reviews as ReviewsConfig } from "@/config/business";

type Quote = (typeof ReviewsConfig)["quotes"][number];

const AUTOPLAY_MS = 6500;

/**
 * Auto-advancing review carousel.
 *
 * One quote at a time rather than a static 3-up grid — bigger type, more
 * confident, and it reads as considered rather than crammed. Autoplay pauses
 * on hover, focus and touch, stops entirely under `prefers-reduced-motion`
 * (CLAUDE.md §11), and the whole thing works without JS-driven autoplay via
 * the dot/arrow buttons, which are real buttons rather than click handlers on
 * decorative elements.
 */
export function ReviewsCarousel({ quotes }: { quotes: readonly Quote[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const advance = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + quotes.length) % quotes.length),
    [quotes.length],
  );

  // Restarts on every `index` change too — including a manual dot/arrow click
  // — so a deliberate click never gets undone by an autoplay tick landing a
  // moment later.
  useEffect(() => {
    if (paused || reducedMotion || quotes.length <= 1) return;
    const t = window.setInterval(() => advance(1), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, reducedMotion, advance, quotes.length, index]);

  // Also pause when the tab isn't visible, so it doesn't silently rack up
  // several advances while you're on another tab and jump on return.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) advance(delta < 0 ? 1 : -1);
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="overflow-hidden rounded-[6px] border border-[var(--line)] bg-[var(--ink)]"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex transition-transform duration-500 ease-[cubic-bezier(.22,.68,.24,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {quotes.map((r, i) => (
            <div
              key={i}
              className="w-full shrink-0 px-6 py-10 sm:px-12 sm:py-14"
              aria-hidden={i !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`Review ${i + 1} of ${quotes.length}`}
            >
              <blockquote className="mx-auto max-w-[62ch] text-center">
                <p className="font-display text-[clamp(20px,3vw,28px)] leading-[1.28] text-[var(--paper)]">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <footer className="mt-6 font-utility text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--primer)]">
                  {r.author} · {r.job}
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>

      {quotes.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => advance(-1)}
            aria-label="Previous review"
            className="on-red absolute left-0 top-1/2 -translate-x-3 -translate-y-1/2 rounded-full border border-[var(--line)] bg-[var(--steel)] p-2.5 text-[var(--primer)] transition-colors duration-200 hover:border-[var(--red)] hover:text-[var(--paper)] sm:-translate-x-4"
          >
            <ChevronIcon direction="left" />
          </button>
          <button
            type="button"
            onClick={() => advance(1)}
            aria-label="Next review"
            className="on-red absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 rounded-full border border-[var(--line)] bg-[var(--steel)] p-2.5 text-[var(--primer)] transition-colors duration-200 hover:border-[var(--red)] hover:text-[var(--paper)] sm:translate-x-4"
          >
            <ChevronIcon direction="right" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2.5">
            {quotes.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === index}
                className={`on-red h-2.5 rounded-full transition-[background-color,width] duration-300 ${
                  i === index ? "w-6 bg-[var(--red)]" : "w-2.5 bg-[var(--line)] hover:bg-[var(--primer)]"
                }`}
              />
            ))}
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">
        Showing review {index + 1} of {quotes.length}.
      </p>
    </div>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d={direction === "left" ? "M11 4L6 9l5 5" : "M7 4l5 5-5 5"}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
