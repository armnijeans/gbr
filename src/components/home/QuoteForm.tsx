"use client";

import { useRef, useState } from "react";
import { business, forms } from "@/config/business";

/**
 * Quote form — CLAUDE.md §9.
 *
 * Six fields. Every field you add costs enquiries, so the cap is seven and we
 * are under it. Spam protection is a honeypot plus a time-to-submit check;
 * neither costs the customer anything, unlike a CAPTCHA.
 *
 * Built on native form controls rather than shadcn/ui: the brief allows shadcn
 * for form primitives, but nothing here needs one, and the extra Radix runtime
 * would cost us on the Lighthouse budget (§11). Revisit at the /quote/ flow if
 * that page needs combobox or dialog behaviour.
 */

type State = "idle" | "sending" | "sent" | "error";

const fieldBase =
  "w-full rounded-[3px] border border-[#C8CFD7] bg-white px-3.5 py-3 text-[16.5px] " +
  "text-[var(--ink)] placeholder:text-[#9AA4B0] focus:border-[var(--ink)] focus:outline-none " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-[var(--red)]";

const labelBase =
  "block font-utility text-[13px] font-semibold uppercase tracking-[0.13em] text-[var(--primer-deep)]";

export function QuoteForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState<string | null>(null);
  const mountedAt = useRef(Date.now());
  const ready = forms.accessKey.length > 0;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: a real customer never fills a field they cannot see.
    if (data.get("company")) return;

    // Time-to-submit: bots post instantly.
    if ((Date.now() - mountedAt.current) / 1000 < forms.minSubmitSeconds) return;

    setState("sending");
    setError(null);
    data.set("access_key", forms.accessKey);
    data.set("subject", `Quote request — ${data.get("reg") || "no reg given"}`);

    try {
      const res = await fetch(forms.endpoint, { method: "POST", body: data });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setState("sent");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-[4px] border border-[#C8CFD7] bg-white px-6 py-8 text-[var(--ink)]"
      >
        <h3 className="font-display text-[24px]">Got it — thanks.</h3>
        <p className="mt-2 text-[16.5px] leading-[1.5] text-[var(--primer-deep)]">
          We&rsquo;ll come back to you with a price. If it&rsquo;s urgent, ring{" "}
          {business.phone} rather than waiting on email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate={false}>
      {!ready && process.env.NODE_ENV === "development" && (
        <p className="rounded-[3px] border border-dashed border-[var(--red)] bg-[rgba(228,38,44,0.08)] px-3 py-2.5 text-[14px] text-[var(--ink)]">
          Dev only — set <code>forms.accessKey</code> in{" "}
          <code>src/config/business.ts</code> to enable submission.
        </p>
      )}

      {/* Honeypot. Hidden from sight and from assistive tech, but not display:none —
          some bots skip fields that are display:none. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelBase}>
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`${fieldBase} mt-1.5`}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelBase}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            className={`${fieldBase} mt-1.5`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg" className={labelBase}>
          Vehicle registration
        </label>
        <input
          id="reg"
          name="reg"
          type="text"
          required
          autoCapitalize="characters"
          className={`${fieldBase} mt-1.5 uppercase`}
        />
      </div>

      <div>
        <label htmlFor="damage" className={labelBase}>
          What happened?
        </label>
        <textarea
          id="damage"
          name="damage"
          rows={4}
          required
          className={`${fieldBase} mt-1.5 resize-y`}
        />
      </div>

      <div>
        <label htmlFor="photos" className={labelBase}>
          Photos <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className={`${fieldBase} mt-1.5 file:mr-3 file:rounded-[2px] file:border-0 file:bg-[var(--ink)] file:px-3 file:py-1.5 file:font-utility file:text-[14px] file:uppercase file:tracking-[0.08em] file:text-white`}
        />
      </div>

      <fieldset>
        <legend className={labelBase}>Is this an insurance claim?</legend>
        <div className="mt-2 flex gap-5">
          {["Yes", "No", "Not sure"].map((opt) => (
            <label key={opt} className="flex items-center gap-2 text-[16.5px] text-[var(--ink)]">
              <input
                type="radio"
                name="insurance"
                value={opt}
                defaultChecked={opt === "Not sure"}
                className="h-4 w-4 accent-[var(--red)]"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {state === "error" && (
        <p role="alert" className="text-[15px] text-[var(--red)]">
          {error} Please ring us instead.
        </p>
      )}

      <button
        type="submit"
        disabled={!ready || state === "sending"}
        className="on-red min-h-[48px] w-full rounded-[3px] bg-[var(--red)] px-6 py-3 font-utility text-[19px] font-semibold uppercase leading-none tracking-[0.05em] text-white transition-colors hover:bg-[#c81f24] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send my quote request"}
      </button>

      <p className="text-[14px] leading-[1.5] text-[var(--primer-deep)]">
        We use your details to quote for the repair and nothing else.
      </p>
    </form>
  );
}
