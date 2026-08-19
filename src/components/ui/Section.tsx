import { Reveal } from "@/components/ui/Reveal";

/**
 * Section shell. Handles the dark/light rhythm from CLAUDE.md §5 — an all-dark
 * site is hard to read in daylight on a phone at the forecourt, and the
 * alternation gives the page structure without decoration.
 */

const tones = {
  ink: "bg-[var(--ink)] text-[var(--paper)]",
  steel: "bg-[var(--steel)] text-[var(--paper)]",
  paper: "bg-[var(--paper)] text-[var(--ink)]",
} as const;

export type Tone = keyof typeof tones;

export function Section({
  tone,
  id,
  className = "",
  children,
  labelledBy,
}: {
  tone: Tone;
  id?: string;
  className?: string;
  children: React.ReactNode;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`border-b border-[var(--line)] ${tones[tone]} ${className}`}
    >
      <div className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 sm:py-20">{children}</div>
    </section>
  );
}

/** Eyebrow + heading pair, at the type scale in CLAUDE.md §4. */
export function SectionHead({
  eyebrow,
  title,
  intro,
  tone,
  id,
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone: Tone;
  id?: string;
  className?: string;
}) {
  const light = tone === "paper";
  return (
    <Reveal className={`max-w-[52ch] ${className}`}>
      <p
        className={`font-utility text-[13px] font-semibold uppercase tracking-[0.26em] ${
          light ? "text-[var(--primer-deep)]" : "text-[var(--primer)]"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`font-display mt-3 text-[clamp(28px,4.4vw,40px)] ${
          light ? "text-[var(--ink)]" : "text-[var(--paper)]"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-[16.5px] leading-[1.5] ${
            light ? "text-[var(--primer-deep)]" : "text-[#C2CBD6]"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
