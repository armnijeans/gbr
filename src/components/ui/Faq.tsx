import { JsonLd } from "@/components/ui/JsonLd";
import { faqSchema } from "@/lib/schema";
import type { Tone } from "@/components/ui/Section";

export type FaqItem = { q: string; a: string };

/**
 * FAQ block with FAQPage schema — CLAUDE.md §8.
 *
 * Built on native <details>/<summary> rather than JS state: it is keyboard
 * accessible and expandable with no script at all, which matters because the
 * answers are the ranking content and must be in the static HTML regardless.
 * Google reads the text either way — collapsed content is fine for FAQPage.
 */
export function Faq({
  items,
  tone,
  heading = "Common questions",
  headingId,
}: {
  items: readonly FaqItem[];
  tone: Tone;
  heading?: string;
  headingId?: string;
}) {
  const light = tone === "paper";

  return (
    <>
      <JsonLd data={faqSchema(items)} />
      <h2
        id={headingId}
        className={`font-display text-[clamp(28px,4.4vw,40px)] ${
          light ? "text-[var(--ink)]" : "text-[var(--paper)]"
        }`}
      >
        {heading}
      </h2>

      {/* The 1px gaps between rows are the parent's background showing through
          the space-y-px gutters, which is why it carries the divider colour. */}
      <dl
        className={`mt-8 space-y-px overflow-hidden rounded-[4px] border ${
          light ? "border-[#DDE1E6] bg-[#DDE1E6]" : "border-[var(--line)] bg-[var(--line)]"
        }`}
      >
        {items.map((item) => (
          <div key={item.q} className={light ? "bg-white" : "bg-[var(--steel)]"}>
            <details className="group">
              <summary
                className={`flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 font-display text-[18px] transition-colors sm:px-6 ${
                  light
                    ? "text-[var(--ink)] hover:bg-[#F1F3F5]"
                    : "text-[var(--paper)] hover:bg-[#212b3b]"
                }`}
              >
                {/* dt inside summary keeps the definition-list semantics intact
                    while letting <summary> own the disclosure behaviour. */}
                <dt>{item.q}</dt>
                <span
                  aria-hidden
                  className={`mt-1 shrink-0 transition-transform duration-200 group-open:rotate-45 ${
                    light ? "text-[var(--red)]" : "text-[var(--red)]"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                    <path
                      d="M8 3v10M3 8h10"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </summary>
              <dd
                className={`px-5 pb-5 text-[16.5px] leading-[1.5] sm:px-6 ${
                  light ? "text-[var(--primer-deep)]" : "text-[var(--primer)]"
                }`}
              >
                {item.a}
              </dd>
            </details>
          </div>
        ))}
      </dl>
    </>
  );
}
