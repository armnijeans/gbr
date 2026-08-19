import { Barlow, Barlow_Condensed, Chakra_Petch } from "next/font/google";

/**
 * Typography — CLAUDE.md §4.
 * All three subset to latin with display: swap. Fonts are self-hosted by
 * next/font at build time, so there is no layout shift and no third-party
 * request (CLAUDE.md §11).
 */

/** Display — squared counters and clipped corners echo the logo. Headings only. */
export const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-chakra-petch",
});

/** Body — grotesque with transport-signage roots. */
export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-barlow",
});

/** Utility — eyebrows, labels, stat captions, buttons. */
export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-barlow-condensed",
});

export const fontVariables = [
  chakraPetch.variable,
  barlow.variable,
  barlowCondensed.variable,
].join(" ");
