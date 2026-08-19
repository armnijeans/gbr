import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppWidget } from "@/components/layout/WhatsAppWidget";
import { business, serviceArea } from "@/config/business";
import "./globals.css";

export const metadata: Metadata = {
  // Title pattern from CLAUDE.md §10: {Page} in Birmingham | GBR Global Body Repairs
  title: {
    default: `Car Body Repairs in ${business.address.locality} | ${business.shortName} ${business.tradingName}`,
    template: `%s | ${business.shortName} ${business.tradingName}`,
  },
  description:
    `Accident repair, paintwork, alloys and servicing under one roof in ${business.address.locality}, ` +
    `serving ${serviceArea.blurb}. Send three photos and we'll price it today.`,
  applicationName: `${business.shortName} ${business.tradingName}`,
};

export const viewport: Viewport = {
  themeColor: "#0E131A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={fontVariables}>
      <body className="min-h-screen antialiased">
        {/*
          Scroll-reveal (components/ui/Reveal.tsx) defaults content to hidden
          and waits for an IntersectionObserver to reveal it. If script never
          runs at all, force it back to visible rather than leaving it gated
          behind JS that failed to load.
        */}
        <noscript>
          <style>{`.gbr-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[3px] focus:bg-[var(--red)] focus:px-4 focus:py-2 focus:font-utility focus:uppercase focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <MobileActionBar />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
