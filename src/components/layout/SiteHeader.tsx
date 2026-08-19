"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { business, telHref } from "@/config/business";

const nav = [
  { href: "/repairs/", label: "Repairs" },
  { href: "/insurance-claims/", label: "Insurance" },
  { href: "/our-work/", label: "Our work" },
  { href: "/repairs/servicing-and-mot/", label: "Servicing" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const tel = telHref();

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--ink)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1180px] items-center gap-5 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0" aria-label={`${business.tradingName} — home`}>
          {/*
            Full lockup carries the words "Global Body Repairs", which the bare
            monogram does not — worth the width for a shop nobody knows yet.
            Cropped from the supplied lockup to drop the tagline strip, which is
            illegible at nav height. The bare mark takes over on narrow screens.

            Both files are raster on solid black (see /assets); `screen`
            blending drops the black field against our dark surfaces.
            TODO — replace with the original SVG (CLAUDE.md §13).
          */}
          <picture>
            <source srcSet="/brand/gbr-logo-nav.webp" type="image/webp" />
            <img
              src="/brand/gbr-logo-nav.png"
              alt=""
              width={600}
              height={84}
              className="logo-on-dark hidden h-9 w-auto sm:block lg:h-10"
            />
          </picture>
          <Image
            src="/brand/gbr-logo.jpg"
            alt=""
            width={132}
            height={66}
            priority
            className="logo-on-dark h-8 w-auto sm:hidden"
          />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex gap-6 font-utility text-[13px] font-semibold uppercase tracking-[0.11em] text-[var(--primer)]">
            {nav.map((item) => (
              <li key={item.href}>
                {/* Underline grows from the left on hover rather than just
                    appearing — a cheap, precise-feeling detail that a plain
                    colour change doesn't give you. */}
                <Link
                  href={item.href}
                  className="group relative inline-block py-1 transition-colors duration-200 hover:text-[var(--paper)]"
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[var(--red)] transition-transform duration-200 ease-out group-hover:scale-x-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="/quote/"
          className="on-red ml-auto rounded-[3px] bg-[var(--red)] px-4 py-2 font-utility text-[17px] font-semibold uppercase leading-none tracking-[0.06em] text-white transition-colors hover:bg-[#c81f24] lg:ml-0"
        >
          Get a price
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-1 flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden className="block h-[2px] w-6 bg-[var(--paper)]" />
          <span aria-hidden className="block h-[2px] w-6 bg-[var(--paper)]" />
          <span aria-hidden className="block h-[2px] w-6 bg-[var(--paper)]" />
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-[var(--line)] bg-[var(--ink)] lg:hidden"
        >
          <ul className="mx-auto max-w-[1180px] px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-[var(--line)] last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 font-utility text-[17px] font-semibold uppercase tracking-[0.11em] text-[var(--paper)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-3.5">
              <a
                href={tel}
                className="font-utility text-[17px] font-semibold uppercase tracking-[0.11em] text-[var(--red)]"
              >
                Call {business.phone}
              </a>
            </li>
          </ul>
        </nav>
      )}

      {/*
        Gradient edge, not a flat hairline — fades in from both sides with a
        soft red tint at the centre, tying back to the brand accent without
        adding a second solid red element (CLAUDE.md §4's one-accent rule).
        A plain div rather than a border because border-color can't take a
        gradient.
      */}
      <div
        aria-hidden
        className="h-px bg-[linear-gradient(90deg,transparent,var(--line)_18%,rgba(228,38,44,0.4)_50%,var(--line)_82%,transparent)]"
      />
    </header>
  );
}
