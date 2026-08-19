import { business, telHref, whatsappHref } from "@/config/business";

/**
 * Sticky bottom action bar — CLAUDE.md §5.
 * Most traffic is a person standing next to a damaged car, so the two things
 * they might do are always one thumb-reach away. Mobile only; the desktop
 * header already carries both CTAs.
 */
export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-[var(--line)] bg-[var(--ink)]/97 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <a
        href={telHref()}
        data-analytics="phone-call"
        className="flex min-h-[56px] items-center justify-center border-r border-[var(--line)] font-utility text-[17px] font-semibold uppercase tracking-[0.08em] text-[var(--paper)]"
      >
        <span className="hidden xs:inline">Call {business.phone}</span>
        <span className="xs:hidden">Call us</span>
      </a>
      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        data-analytics="whatsapp-quote"
        className="on-red flex min-h-[56px] items-center justify-center bg-[var(--red)] font-utility text-[17px] font-semibold uppercase tracking-[0.08em] text-white"
      >
        WhatsApp photos
      </a>
    </div>
  );
}
