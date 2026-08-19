import { whatsappHref } from "@/config/business";

/**
 * Floating WhatsApp entry point — desktop/tablet only.
 *
 * Mobile already carries WhatsApp in the sticky action bar (CLAUDE.md §5), so
 * this uses the exact complementary breakpoint (`hidden lg:flex` against the
 * bar's `lg:hidden`) rather than picking a separate cutoff — there is no width
 * at which both or neither are visible.
 *
 * Red rather than WhatsApp's brand green: CLAUDE.md §4 keeps the palette
 * closed ("nothing outside this palette"), and every other WhatsApp CTA on
 * the site is already red — a green bubble here would be the one thing on
 * the page that doesn't belong to the brand. The icon shape still carries the
 * recognition.
 */
export function WhatsAppWidget() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics="whatsapp-widget"
      aria-label="Send us a WhatsApp message"
      className="on-red group fixed bottom-7 right-7 z-40 hidden h-16 w-16 items-center justify-center rounded-full bg-[var(--red)] text-white shadow-[0_10px_34px_rgba(228,38,44,0.42)] transition-[transform,box-shadow] duration-200 hover:scale-[1.06] hover:shadow-[0_14px_40px_rgba(228,38,44,0.55)] lg:flex"
    >
      {/* Slow idle pulse to draw the eye without being obnoxious. Off under
          prefers-reduced-motion via the global rule in globals.css. */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full bg-[var(--red)] motion-safe:animate-[gbr-widget-pulse_2.6s_ease-out_infinite]"
      />
      <WhatsAppIcon className="relative h-7 w-7" />

      <span className="pointer-events-none absolute right-full mr-3.5 whitespace-nowrap rounded-[3px] bg-[var(--ink)] px-3 py-2 font-utility text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--paper)] opacity-0 shadow-[0_6px_20px_rgba(0,0,0,0.3)] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        Chat with us
      </span>
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <path d="M16.02 3C9.4 3 4 8.37 4 14.98c0 2.1.56 4.15 1.62 5.96L3.9 27l6.2-1.63a12.9 12.9 0 0 0 5.92 1.5h.01c6.62 0 12.02-5.37 12.02-11.98C28.05 8.28 22.65 3 16.02 3Zm0 21.94h-.01a10.9 10.9 0 0 1-5.56-1.53l-.4-.24-3.68.97.98-3.6-.26-.37a9.9 9.9 0 0 1-1.53-5.29c0-5.5 4.48-9.98 10-9.98 5.5 0 9.97 4.48 9.97 9.98 0 5.51-4.47 10.06-9.97 10.06Zm5.47-7.47c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.63-.93-2.24-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
    </svg>
  );
}
