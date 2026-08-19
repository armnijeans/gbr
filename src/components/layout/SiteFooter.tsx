import Link from "next/link";
import Image from "next/image";
import { business, addressLine, telHref } from "@/config/business";

const dayLabels: Record<keyof typeof business.hours, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

const columns = [
  {
    heading: "Repairs",
    links: [
      { href: "/repairs/accident-repair/", label: "Accident repair" },
      { href: "/repairs/smart-repair/", label: "SMART repair" },
      { href: "/repairs/paint-and-resprays/", label: "Paint & resprays" },
      { href: "/repairs/servicing-and-mot/", label: "Servicing & MOT" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about/", label: "About the workshop" },
      { href: "/our-work/", label: "Our work" },
      { href: "/reviews/", label: "Reviews" },
      { href: "/insurance-claims/", label: "Insurance claims" },
    ],
  },
];

export function SiteFooter() {
  const tel = telHref();

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--steel)] pb-28 lg:pb-0">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Image
            src="/brand/gbr-logo-full.jpg"
            alt={`${business.tradingName} logo`}
            width={320}
            height={104}
            className="logo-on-dark h-14 w-auto"
          />
          <p className="mt-4 max-w-[34ch] text-[15px] text-[var(--primer)]">
            {business.tagline} Accident repair, paintwork, alloys and servicing
            under one roof in {business.address.locality}.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h2 className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--paper)]">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-2.5 text-[15px] text-[var(--primer)]">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-[var(--paper)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/*
          NAP block — name, address and phone in crawlable plain text.
          These must be byte-identical to the Google Business Profile and every
          directory listing (CLAUDE.md §10).
        */}
        <div>
          <h2 className="font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--paper)]">
            Find us
          </h2>
          <address className="mt-4 space-y-2.5 text-[15px] not-italic text-[var(--primer)]">
            <p className="text-[var(--paper)]">{business.tradingName}</p>
            <p>{business.address.street}</p>
            <p>
              {business.address.locality}, {business.address.postcode}
            </p>
            <p>
              <a href={tel} className="text-[var(--paper)] transition-colors hover:text-[var(--red)]">
                {business.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${business.email}`}
                className="transition-colors hover:text-[var(--paper)]"
              >
                {business.email}
              </a>
            </p>
          </address>

          <h2 className="mt-7 font-utility text-[13px] font-semibold uppercase tracking-[0.26em] text-[var(--paper)]">
            Opening hours
          </h2>
          <dl className="mt-4 space-y-1.5 text-[15px] text-[var(--primer)]">
            {(Object.keys(business.hours) as Array<keyof typeof business.hours>).map((day) => (
              <div key={day} className="flex justify-between gap-4">
                <dt>{dayLabels[day]}</dt>
                <dd className="text-right">{business.hours[day]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-4 py-6 text-[13.5px] text-[var(--primer)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {business.legalName} · Company no. {business.companyNo} ·
            VAT {business.vatNo}
          </p>
          <p className="flex gap-5">
            <Link href="/privacy/" className="transition-colors hover:text-[var(--paper)]">
              Privacy
            </Link>
            <Link href="/terms/" className="transition-colors hover:text-[var(--paper)]">
              Terms
            </Link>
          </p>
        </div>
      </div>
      <span className="sr-only">{addressLine()}</span>
    </footer>
  );
}
