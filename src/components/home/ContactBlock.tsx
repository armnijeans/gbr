import { Section, SectionHead } from "@/components/ui/Section";
import { QuoteForm } from "@/components/home/QuoteForm";
import { business, addressLine } from "@/config/business";

const dayLabels: Record<keyof typeof business.hours, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

/** Map, hours, and the quote form — CLAUDE.md §8, section 8. */
export function ContactBlock() {
  return (
    <Section tone="paper" id="quote" labelledBy="contact-heading">
      <SectionHead
        tone="paper"
        id="contact-heading"
        eyebrow="Get a price"
        title="Tell us what happened."
        intro="WhatsApp is faster if you have the car in front of you. If you'd rather type it out, this reaches the same inbox."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div>
          {/*
            OpenStreetMap rather than Google Maps: it sets no cookies, so the
            site still needs no consent banner (CLAUDE.md §6). Lazy-loaded
            because it sits well below the fold and must not cost us LCP.
            The pin is approximate until the exact coordinates are confirmed.
          */}
          <iframe
            title={`Map showing ${business.tradingName}, ${addressLine()}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[240px] w-full rounded-[4px] border border-[#DDE1E6] grayscale-[0.35]"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${
              business.geo.lng - 0.008
            }%2C${business.geo.lat - 0.004}%2C${business.geo.lng + 0.008}%2C${
              business.geo.lat + 0.004
            }&layer=mapnik&marker=${business.geo.lat}%2C${business.geo.lng}`}
          />

          <h3 className="font-display mt-8 text-[20px] text-[var(--ink)]">Where we are</h3>
          <address className="mt-3 space-y-1.5 text-[16.5px] not-italic leading-[1.5] text-[var(--primer-deep)]">
            <p className="text-[var(--ink)]">{business.tradingName}</p>
            <p>{business.address.street}</p>
            <p>
              {business.address.locality}, {business.address.postcode}
            </p>
            <p>{business.phone}</p>
            <p>{business.email}</p>
          </address>

          <p className="mt-4 font-utility text-[15px] font-semibold uppercase tracking-[0.08em]">
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--red)] underline-offset-4 hover:underline"
            >
              Get directions
            </a>
          </p>

          <h3 className="font-display mt-8 text-[20px] text-[var(--ink)]">Opening hours</h3>
          <dl className="mt-3 max-w-[320px] space-y-1.5 text-[16.5px] text-[var(--primer-deep)]">
            {(Object.keys(business.hours) as Array<keyof typeof business.hours>).map((day) => (
              <div key={day} className="flex justify-between gap-4 border-b border-[#DDE1E6] pb-1.5">
                <dt>{dayLabels[day]}</dt>
                <dd className="text-right">{business.hours[day]}</dd>
              </div>
            ))}
          </dl>
        </div>

        <QuoteForm />
      </div>
    </Section>
  );
}
