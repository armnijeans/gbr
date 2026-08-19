"use client";

import { Photo } from "@/components/ui/Photo";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

/**
 * Drag-to-reveal before/after — the site's signature element (CLAUDE.md §5).
 *
 * The split is a red diagonal at the angle of the leg of the "R" in the logo
 * (`--diagonal`, 5°). The divider's rotation and the clip-path's edge are
 * derived from the same angle and the measured height, so they stay in
 * register at every viewport size rather than drifting apart.
 *
 * Accessibility (CLAUDE.md §11): the stage is an ARIA slider with full
 * keyboard control — arrows step, shift/page steps coarsely, home/end jump to
 * the extremes — and a visible focus ring.
 *
 * Reused by the homepage hero, the proof section, and later the gallery.
 */

const MIN = 8;
const MAX = 92;
const STEP = 2;
const COARSE_STEP = 10;

const clamp = (n: number) => Math.min(MAX, Math.max(MIN, n));

export type BeforeAfterProps = {
  /** Photo slug under /public/photos for the damaged state. */
  before: string;
  /** Photo slug for the repaired state. */
  after: string;
  /** Real alt text naming vehicle and damage — never "car repair Birmingham". */
  beforeAlt: string;
  afterAlt: string;
  /** Label under the left edge. */
  beforeLabel?: string;
  /** Label under the right edge, e.g. "Finished · 3 days". */
  afterLabel?: string;
  /** Follow the mouse without needing to hold the button down. */
  followPointer?: boolean;
  /** Play the one-off reveal sweep on mount. Hero only (CLAUDE.md §5). */
  intro?: boolean;
  /** Starting position, 8–92. */
  initial?: number;
  /** Sizing. */
  className?: string;
  /** Overlaid content, e.g. the hero copy. */
  children?: React.ReactNode;
  priority?: boolean;
};

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = "Drag →",
  afterLabel,
  followPointer = false,
  intro = false,
  initial = 52,
  className = "",
  children,
  priority = false,
}: BeforeAfterProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(clamp(initial));
  const [dragging, setDragging] = useState(false);
  const [introDone, setIntroDone] = useState(!intro);
  /** Half the horizontal run of the diagonal, in px. Derived from height. */
  const [offset, setOffset] = useState(0);
  const labelId = useId();
  /**
   * Touch only: where a not-yet-committed gesture started, so onPointerMove
   * can tell a horizontal drag from a vertical scroll before touching state.
   * null once the gesture has committed one way or the other.
   */
  const touchStart = useRef<{ x: number; y: number; pointerId: number } | null>(null);

  // Keep the clip-path edge and the divider's rotation in register: for a
  // container of height H tilted by θ, the edge shifts ±(H/2)·tan(θ).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measure = () => {
      const deg =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--diagonal"),
        ) || 5;
      setOffset((el.offsetHeight / 2) * Math.tan((deg * Math.PI) / 180));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const setFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const endIntro = useCallback(() => setIntroDone(true), []);

  // End the intro on a timer rather than onAnimationEnd: that event bubbles
  // from the overlaid copy's own animations and would cut the sweep short.
  // Under prefers-reduced-motion there is no sweep, so settle immediately.
  useEffect(() => {
    if (!intro) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIntroDone(true);
      return;
    }
    const t = window.setTimeout(() => setIntroDone(true), 1400);
    return () => window.clearTimeout(t);
  }, [intro]);

  // Touch has to share the gesture with the page's own vertical scroll,
  // which mouse never does — dragging the stage shouldn't trap a scroll
  // attempt. touch-action: pan-y (below) hands vertical motion to the
  // browser natively; this threshold is the JS half of the same decision,
  // so a touch that turns out to be a scroll never gets an initial snap to
  // the touch-down position first.
  const TOUCH_COMMIT_PX = 8;

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    // Let the overlaid CTAs be clicked without hijacking the press.
    if ((e.target as HTMLElement).closest("[data-no-drag]")) return;
    endIntro();

    if (e.pointerType === "touch") {
      // Wait for onPointerMove to confirm horizontal intent before touching
      // any state — see TOUCH_COMMIT_PX above.
      touchStart.current = { x: e.clientX, y: e.clientY, pointerId: e.pointerId };
      return;
    }

    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging) {
      setFromClientX(e.clientX);
      return;
    }

    const pending = touchStart.current;
    if (pending && pending.pointerId === e.pointerId) {
      const dx = e.clientX - pending.x;
      const dy = e.clientY - pending.y;
      if (Math.abs(dx) > TOUCH_COMMIT_PX && Math.abs(dx) > Math.abs(dy)) {
        // Horizontal — commit to the drag, starting from the current point
        // rather than the touch-down point so it doesn't jump.
        touchStart.current = null;
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromClientX(e.clientX);
      } else if (Math.abs(dy) > TOUCH_COMMIT_PX && Math.abs(dy) > Math.abs(dx)) {
        // Vertical — this is a scroll. Let go without ever having captured
        // the pointer or moved the divider, so touch-action: pan-y's native
        // scroll proceeds untouched.
        touchStart.current = null;
      }
      return;
    }

    if (followPointer && e.pointerType === "mouse" && introDone) {
      setFromClientX(e.clientX);
    }
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    setDragging(false);
    touchStart.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? COARSE_STEP : STEP;
    let next: number | null = null;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        next = pos - step;
        break;
      case "ArrowRight":
      case "ArrowUp":
        next = pos + step;
        break;
      case "PageDown":
        next = pos - COARSE_STEP;
        break;
      case "PageUp":
        next = pos + COARSE_STEP;
        break;
      case "Home":
        next = MIN;
        break;
      case "End":
        next = MAX;
        break;
      default:
        return;
    }

    e.preventDefault();
    endIntro();
    setPos(clamp(next));
  };

  const style = {
    "--reveal-x": `${pos}%`,
    "--reveal-d": `${offset}px`,
    "--reveal-rest": `${clamp(initial)}%`,
  } as CSSProperties;

  return (
    <div
      ref={stageRef}
      role="slider"
      tabIndex={0}
      aria-labelledby={labelId}
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      aria-valuenow={Math.round(pos)}
      aria-valuetext={`${Math.round(pos)}% before repair, ${100 - Math.round(pos)}% after`}
      aria-orientation="horizontal"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      style={style}
      className={`relative touch-pan-y select-none overflow-hidden bg-[var(--ink)] [-webkit-tap-highlight-color:transparent] ${
        dragging ? "cursor-grabbing" : "cursor-ew-resize"
      } ${className}`}
    >
      <p id={labelId} className="sr-only">
        Before and after comparison. {beforeAlt} Compared with: {afterAlt} Use the
        left and right arrow keys to move the divider.
      </p>

      {/* AFTER — the finished repair, full-bleed underneath. */}
      <div className="absolute inset-0">
        <Photo
          slug={after}
          alt={afterAlt}
          width={1500}
          height={930}
          priority={priority}
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>

      {/* BEFORE — the damage, clipped to the diagonal. */}
      <div
        className={`absolute inset-0 ${introDone ? "" : "gbr-reveal-intro"}`}
        style={{
          clipPath:
            "polygon(0 0, calc(var(--reveal-x) + var(--reveal-d)) 0, calc(var(--reveal-x) - var(--reveal-d)) 100%, 0 100%)",
          transition: dragging ? "none" : "clip-path 220ms cubic-bezier(.22,.68,.24,1)",
        }}
      >
        <Photo
          slug={before}
          alt={beforeAlt}
          width={1500}
          height={930}
          priority={priority}
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      </div>

      {/* The red diagonal — the site's structural motif. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-[var(--reveal-x)] top-[-20%] h-[140%] w-[3px] bg-[var(--red)] shadow-[0_0_22px_rgba(228,38,44,0.6)] ${
          introDone ? "" : "gbr-reveal-intro"
        }`}
        style={{
          transform: "translateX(-50%) rotate(var(--diagonal))",
          transition: dragging ? "none" : "left 220ms cubic-bezier(.22,.68,.24,1)",
        }}
      />

      {/*
        Grip. Decorative — the stage itself is the control — but it grows and
        glows on drag so the interaction has somewhere to put its energy. Left
        tracks with the transition disabled during drag (as elsewhere); the
        scale/glow use their own always-on transition so releasing settles
        smoothly even though the position snaps immediately.
      */}
      <div
        aria-hidden
        className={`pointer-events-none absolute left-[var(--reveal-x)] top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--red)] text-[13px] font-bold leading-none tracking-[-2px] text-white ${
          dragging ? "scale-[1.14] shadow-[0_8px_30px_rgba(228,38,44,0.55)]" : "shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
        } ${introDone ? "" : "gbr-reveal-intro"}`}
        style={{
          transitionProperty: "transform, box-shadow, left",
          transitionDuration: dragging ? "200ms, 200ms, 0ms" : "200ms, 200ms, 220ms",
          transitionTimingFunction: "cubic-bezier(.22,.68,.24,1)",
        }}
      >
        ◀▶
      </div>

      {/*
        Edge captions. Capped at ~45% each so a long caption wraps rather than
        running into the one opposite — they collide at 320px otherwise. The
        shadow is what keeps them legible: behind them is a photograph we do
        not control, and --primer alone disappears over a light panel.
      */}
      <span className="pointer-events-none absolute bottom-4 left-5 max-w-[42%] font-utility text-[13px] font-semibold uppercase leading-tight tracking-[0.22em] text-[#D6DEE8] [text-shadow:0_1px_6px_rgba(6,9,13,0.95)]">
        {beforeLabel}
      </span>
      {afterLabel && (
        <span className="pointer-events-none absolute bottom-4 right-5 max-w-[48%] text-right font-utility text-[13px] font-semibold uppercase leading-tight tracking-[0.22em] text-[#D6DEE8] [text-shadow:0_1px_6px_rgba(6,9,13,0.95)]">
          {afterLabel}
        </span>
      )}

      {children}
    </div>
  );
}
