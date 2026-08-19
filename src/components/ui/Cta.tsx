import { business, telHref, whatsappHref } from "@/config/business";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[3px] border font-utility " +
  "text-[19px] font-semibold uppercase tracking-[0.05em] leading-none px-[22px] py-[13px] " +
  "transition-[background-color,border-color,box-shadow,transform] duration-200 min-h-[48px]";

const variants = {
  /** Primary — brand red. Buttons are exempt from the one-accent rule (§4).
      Glow-on-hover matches the WhatsApp widget's treatment elsewhere. */
  primary:
    "on-red border-transparent bg-[var(--red)] text-white shadow-[0_0_0_rgba(228,38,44,0)] " +
    "hover:bg-[#c81f24] hover:shadow-[0_8px_24px_rgba(228,38,44,0.35)] hover:-translate-y-px",
  /** Secondary on dark sections. */
  outline:
    "border-[#48566B] bg-transparent text-[var(--paper)] hover:border-[var(--paper)] hover:bg-white/5",
  /** Secondary on light sections. */
  outlineDark:
    "border-[#C3CAD3] bg-transparent text-[var(--ink)] hover:border-[var(--ink)] hover:bg-black/5",
} as const;

type Variant = keyof typeof variants;

function classes(variant: Variant, className?: string) {
  return `${base} ${variants[variant]} ${className ?? ""}`;
}

/**
 * Primary conversion — a WhatsApp photo quote (CLAUDE.md §9).
 * The message is prefilled so the customer knows what to send.
 */
export function WhatsAppCta({
  variant = "primary",
  label = "Send photos on WhatsApp",
  className,
}: {
  variant?: Variant;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics="whatsapp-quote"
      className={classes(variant, className)}
    >
      {label}
    </a>
  );
}

/** Secondary conversion — the phone call. */
export function CallCta({
  variant = "outline",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <a href={telHref()} data-analytics="phone-call" className={classes(variant, className)}>
      Call {business.phone}
    </a>
  );
}
