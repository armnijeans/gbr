"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-reveal wrapper — fades and rises content in as it enters the
 * viewport. Extends the hero's one-off load sequence to the rest of the page
 * (CLAUDE.md §5, expanded per client request — see the note in globals.css).
 *
 * Progressive enhancement, not a dependency: server-rendered markup is
 * unaffected either way, and a `<noscript>` rule in the root layout forces
 * `.gbr-reveal` back to fully visible if JS never runs, so content is never
 * gated behind script execution succeeding.
 */
/** Kept to the block-level tags this component is actually used with. */
type RevealTag = "div" | "li" | "section" | "article";

export function Reveal({
  children,
  delayMs = 0,
  as: Tag = "div",
  className = "",
}: {
  children: React.ReactNode;
  /** Stagger for items revealing together, e.g. cards in a grid. */
  delayMs?: number;
  as?: RevealTag;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    // Already in view at mount — e.g. a short page, or landing mid-page from
    // an anchor link or back-navigation. Reveal immediately rather than
    // waiting on the observer's first callback, which on some pages doesn't
    // fire until the next scroll or resize.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // Polymorphic `as` makes JSX intersect the ref type across every tag in
      // RevealTag, which no single ref object can satisfy — every value in
      // RevealTag is a plain block element sharing the HTMLElement surface
      // this component actually uses (className, style), so the cast is safe.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`gbr-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={visible ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
