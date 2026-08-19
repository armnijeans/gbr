import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { WhatsAppCta, CallCta } from "@/components/ui/Cta";
import { business, heroProof, heroEyebrowClaim } from "@/config/business";

export function Hero() {
  return (
    <section className="border-b border-[var(--line)] bg-[var(--ink)]">
      <BeforeAfter
        before={heroProof.before}
        after={heroProof.after}
        beforeAlt={heroProof.beforeAlt}
        afterAlt={heroProof.afterAlt}
        afterLabel={heroProof.caption}
        followPointer
        intro
        priority
        className="h-[clamp(430px,74vh,560px)]"
      >
        {/*
          Copy overlay. pointer-events:none so the whole stage stays draggable;
          the buttons opt back in via data-no-drag.
        */}
        {/*
          The scrim has to do opposite jobs at the two ends. On desktop it can
          sit to the left of the copy and leave the photo clear. At 320px the
          copy spans the full width, so it becomes a vertical wash — but kept
          light enough at top and bottom that the photo and the red diagonal
          still read, because the drag is the whole point of the hero. The copy
          gets a text-shadow to make up the remaining legibility.

          Horizontal inset lives on the inner wrapper below, not here — it has
          to match the nav's `mx-auto max-w-[1180px] px-4 sm:px-6` shell
          exactly (same as every Section), or the heading drifts out of line
          with the logo and every other heading on the page.
        */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-center bg-[linear-gradient(180deg,rgba(10,14,20,0.42)_0%,rgba(10,14,20,0.80)_30%,rgba(10,14,20,0.76)_68%,rgba(10,14,20,0.28)_100%)] py-8 [text-shadow:0_1px_10px_rgba(6,9,13,0.8)] sm:bg-[linear-gradient(90deg,rgba(10,14,20,0.88)_0%,rgba(10,14,20,0.84)_44%,transparent_82%)] sm:py-11 sm:[text-shadow:none]">
          <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">
            {/*
              Eyebrow is --primer, not red as in the mockup. Two reasons:
              red on --ink is 4.14:1 and fails the 4.5:1 floor (CLAUDE.md §11),
              and the red diagonal is already this view's one accent (§4).
            */}
            <p className="gbr-rise font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--primer)] [animation-delay:60ms]">
              {business.address.locality} · {heroEyebrowClaim}
            </p>

            <h1 className="gbr-rise font-display mt-3.5 max-w-[15ch] text-[clamp(34px,7.2vw,54px)] text-[var(--paper)] [animation-delay:140ms]">
              Like it <span className="text-[var(--red)]">never</span> happened.
            </h1>

            <p className="gbr-rise mt-4 max-w-[40ch] text-[16.5px] leading-[1.5] text-[#C2CBD6] [animation-delay:220ms]">
              Accident repair, paintwork, alloys and servicing under one roof.
              Send us three photos and we&rsquo;ll price it today.
            </p>

            <div
              data-no-drag
              className="gbr-rise pointer-events-auto mt-6 flex flex-wrap gap-3 [animation-delay:300ms]"
            >
              <WhatsAppCta />
              <CallCta />
            </div>
          </div>
        </div>
      </BeforeAfter>
    </section>
  );
}
