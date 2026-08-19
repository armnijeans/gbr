# GBR — Global Body Repairs · Website Build Brief

> Drop this into the repo root as `CLAUDE.md` before you start. Claude Code reads it on every
> session, so it keeps design and content decisions consistent across the whole build.

---

## 1. The job

A full-service accident repair centre in Birmingham needs a site that does four things at once:

1. Get the phone ringing.
2. Capture photo-quote requests from people who won't ring.
3. Win insurance and fleet/trade enquiries (highest value per job).
4. Look demonstrably more established than every competitor in the postcode.

**Primary conversion:** a WhatsApp photo-quote. Secondary: phone call. Tertiary: quote form.

---

## 2. Facts to fill in — DO NOT INVENT THESE

Every value below must be replaced with real information before launch. Keep them all in
`/src/config/business.ts` so there is exactly one place to edit. Never hardcode a phone
number or address into a component.

```ts
export const business = {
  legalName:    "TODO — registered company name",
  tradingName:  "Global Body Repairs",
  phone:        "TODO",              // real number, tel: format too
  whatsapp:     "TODO",              // international format, e.g. 447xxxxxxxxx
  email:        "TODO",
  address:      { street: "TODO", locality: "Birmingham", postcode: "TODO", country: "GB" },
  geo:          { lat: 0, lng: 0 },  // TODO — from Google Maps
  hours:        { mon: "TODO", /* ... */ sun: "Closed" },
  googleReview: "TODO — Google Business Profile review link",
  companyNo:    "TODO",
  vatNo:        "TODO or null",
} as const;
```

**Claims that need verifying before they go on the page.** The signage mockup asserts
*Insurance Approved*, *Paint Work Specialist* and *Quality Guaranteed*. Only publish these if
they're true and you can name the basis — an insurer network, a paint manufacturer's approval
(e.g. a specific refinish brand's accredited scheme), or BS 10125 / IMI accreditation. Vague
trust badges are ignored; a named accreditation with a logo converts. If a claim isn't backed,
cut it rather than soften it.

Also confirm: courtesy cars (yes/no, conditions), collection & delivery radius, paintwork
guarantee length, typical turnaround, whether you take non-fault claims.

---

## 3. Competitive position

The nearest direct competitor runs a client-side-rendered template site with no meta
description, no social preview image (it still serves the site builder's default placeholder),
and a very thin review base. They're positioned narrowly on dent and scratch work.

**So we win on:** breadth (four service lines vs their one), server-rendered content that
actually ranks, real photographic proof, and a dedicated insurance-claims journey they don't
have. Do not copy their copy, structure or images.

---

## 4. Brand tokens

Derived from the GBR logo and the workshop signage. Put these in `globals.css` as CSS custom
properties and mirror them in `tailwind.config.ts`. Nothing outside this palette.

```css
:root{
  --ink:    #0E131A;  /* page base, dark sections */
  --steel:  #1B2432;  /* raised surfaces, cards, footer */
  --line:   #2E3B4E;  /* hairlines, borders */
  --red:    #E4262C;  /* brand red — CTAs and one accent per view ONLY */
  --paper:  #F5F6F7;  /* light sections, primary text on dark */
  --primer: #8894A3;  /* muted/secondary text */
}
```

**Red discipline:** red is for actions and the diagonal motif. If a view has more than one
red element that isn't a button, remove one. This is the single easiest way to look expensive.

**Typography**
- Display — **Chakra Petch** (600/700). Squared counters and clipped corners echo the logo.
  Headings only, never body copy.
- Body — **Barlow** (400/500/600). Grotesque with transport-signage roots.
- Utility — **Barlow Condensed** (600) for eyebrows, labels, stat captions, buttons.
- Load via `next/font/google` with `display: swap`. Subset to `latin`.

**Scale:** 54/40/28/20 display, 16.5 body, 13 utility. Line-height 0.98 on display, 1.5 on body.
Letter-spacing: 0.26em on eyebrows, 0.11em on nav, normal on body.

---

## 5. Design direction

**Signature element: the drag-to-reveal diagonal.** The hero is a before/after of a real
repair, split by a red diagonal the user drags. The angle (~5°) is taken from the leg of the
"R" in the logo, and it recurs as the site's structural motif — section edges, image masks,
the divider between service cards. Use it consistently or not at all; a diagonal that appears
once reads as an accident.

**Rhythm:** alternate dark and light sections. Hero and workshop sections on `--ink`; service
detail, pricing and the quote flow on `--paper` with dark text. An all-dark site is harder to
read in daylight on a phone forecourt-side, and the alternation gives the page structure
without decoration.

**Motion:** one orchestrated page-load sequence in the hero, scroll-reveal on the gallery,
hover states on cards. Nothing else. Respect `prefers-reduced-motion` throughout.

**Mobile:** a sticky bottom action bar with two targets — Call and WhatsApp. Most of your
traffic is a person standing next to a damaged car.

---

## 6. Stack

- **Next.js 15**, App Router, TypeScript, `output: 'export'` (fully static).
- **Tailwind CSS** with the tokens above. **shadcn/ui** for form primitives only — restyle
  everything, don't ship default shadcn look.
- **Hosting: Cloudflare Pages.** Free, permits commercial use, unlimited bandwidth. Vercel's
  free Hobby tier prohibits commercial projects — do not launch a trading business on it.
- **GitHub** → auto-deploy on push to `main`. Preview deploys on branches.
- **Forms:** Web3Forms or Formspree free tier, posting to the business inbox. Add a honeypot
  field and a time-to-submit check for spam.
- **Images:** pre-compress to AVIF + WebP and commit them. Static export disables the Next
  image optimiser, so do the work at build time with `sharp`.
- **Analytics:** Cloudflare Web Analytics (free, no cookie banner needed).
- **Domain:** Cloudflare Registrar, sold at cost.

---

## 7. Sitemap

```
/                          Home
/repairs/                  Services hub
  accident-repair/         Panel work, structural, insurance jobs
  smart-repair/            Dents, scratches, bumper scuffs, kerbed alloys
  paint-and-resprays/      Full resprays, colour matching, alloy refurb
  servicing-and-mot/       Servicing, MOT, mechanical
/insurance-claims/         Separate journey — highest-value page
/our-work/                 Gallery, before/after sliders, filterable by service
/about/                    The workshop, the team, the kit, the guarantee
/reviews/                  Google reviews embedded + written testimonials
/contact/                  Map, hours, directions, quote form
/quote/                    Standalone photo-quote flow
/areas/[slug]/             Local landing pages (see §10)
/privacy/ /terms/          Legal
```

---

## 8. Page specs

### Home
1. **Hero** — drag-reveal before/after, headline, WhatsApp + Call CTAs. See mockup.
2. **Trust strip** — four verified facts (accreditation, guarantee, courtesy car, collection).
3. **Four service cards** — one per line, diagonal-masked photo, one-line plain description.
4. **How it works** — three steps: send photos → we price it → we handle the rest. This *is*
   a genuine sequence, so numbering it is legitimate here (and only here).
5. **Proof** — three before/after sliders of real jobs with the vehicle and damage named.
6. **Insurance block** — dark section, aimed squarely at "someone hit me, what now".
7. **Reviews** — live Google rating + three quotes.
8. **Map, hours, and the quote form.**

### Service pages (×4, shared template)
Hero with the damage type named → what's included → the process → before/after examples for
*that* service → price guidance (a "from" band is far better than nothing) → FAQ block with
schema → CTA. 700–1,100 words of genuinely useful copy each; this is what ranks.

### Insurance claims
Explain non-fault vs fault plainly. Cover: you can choose your own repairer, we deal with the
insurer directly, courtesy car provision, excess handling, claim timeline. Include a short
"what to do at the scene" checklist — highly shareable and it earns links.

### Our work
Filterable grid. Every entry needs: vehicle make/model, damage type, service line, turnaround
time, and a real before/after pair. Twelve strong entries beat forty weak ones.

---

## 9. Conversion mechanics

**WhatsApp deep link** — prefill the message so the customer knows what to send:

```ts
const msg = encodeURIComponent(
  "Hi GBR, I'd like a repair quote. Here are photos of the damage. " +
  "Vehicle: \nReg: \nWhat happened: "
);
const href = `https://wa.me/${business.whatsapp}?text=${msg}`;
```

Track clicks as the primary conversion event. Fall back to the quote form on desktop where
WhatsApp Web may not be signed in.

**Quote form fields (keep it short):** name, phone, vehicle reg, what happened (textarea),
photos (optional upload), insurance claim yes/no. Seven fields maximum. Every field you add
costs you enquiries.

**Phone:** `tel:` links everywhere, and the number in plain text in the footer so it's
crawlable and matches the Google Business Profile exactly.

---

## 10. SEO

**Metadata:** unique title and description per route via the Next.js Metadata API. Title
pattern: `{Page} in Birmingham | GBR Global Body Repairs`. Real OG images generated per page —
this is a free win over the competitor, whose share previews are still a placeholder.

**Structured data** (JSON-LD): `AutoBodyShop` on the homepage with address, geo, `openingHours`,
`telephone`, `aggregateRating` (only once real reviews exist — never fake it), `Service` on each
service page, `FAQPage` on FAQ blocks, `BreadcrumbList` sitewide.

**NAP consistency:** name, address and phone must be byte-identical across the site, Google
Business Profile, and every directory listing. Inconsistency is the most common reason local
sites underperform.

**Area pages:** one per genuine catchment area (Aston, Erdington, Perry Barr, Handsworth,
Sutton Coldfield, Solihull, Great Barr, Castle Bromwich — adjust to your actual radius). Each
needs unique copy: local landmarks, distance and drive time, which services are most requested
there. Do not spin the same page eight times — Google discounts it and it can hurt you.

**Also:** `sitemap.xml` and `robots.txt` generated at build, canonical tags, `lang="en-GB"`,
UK spellings ("tyres", "colour", "kerbed") throughout.

**Off-site, and more important than any of the above:** get the Google Business Profile
verified, add photos weekly, and build a review-request habit — a card handed over with the
keys, or an SMS the day after collection. The competitor has a handful of reviews. Thirty
genuine ones inside six months is the single biggest ranking lever available to you.

---

## 11. Quality floor

Ship nothing that misses these:

- Lighthouse ≥ 95 across performance, accessibility, best practices and SEO on mobile.
- Largest Contentful Paint under 2.0s on a throttled 4G profile.
- Visible keyboard focus on every interactive element; the drag-reveal needs arrow-key control.
- All images have real alt text describing the vehicle and damage, not "car repair Birmingham".
- Colour contrast ≥ 4.5:1 for body text — check `--primer` on `--ink` and darken if it fails.
- Works at 320px wide.
- No layout shift from font loading.

---

## 12. Build order

1. Scaffold, tokens, fonts, `business.ts` config, layout shell, nav and footer.
2. Homepage hero with the drag-reveal component (the hardest bit — do it early).
3. Rest of the homepage sections.
4. Service page template, then the four instances.
5. Insurance claims page.
6. Gallery and the before/after component (reuse the hero's).
7. Contact, quote flow, form wiring, spam protection.
8. SEO layer: metadata, schema, sitemap, OG images.
9. Area pages.
10. Deploy to Cloudflare Pages, connect the domain, verify Lighthouse and schema.

Get steps 1–3 deployed to a preview URL before writing another page. Seeing the hero on a real
phone will change decisions.

---

## 13. Content checklist — the real bottleneck

The code will be finished long before this is. Start gathering now:

- [ ] 8–12 before/after pairs. Same angle, same light, phone on a stable surface. Shoot the
      "before" the moment the car arrives — you cannot go back for it.
- [ ] Workshop photos: booth, prep bay, the team working. No empty rooms.
- [ ] One photo of the finished signage on the unit.
- [ ] Accreditation logos you're licensed to display.
- [ ] Six to ten customer reviews, ideally on Google first.
- [ ] Confirmed opening hours, guarantee terms, courtesy car policy, collection radius.
- [ ] Vector version of the logo (SVG). The supplied files are raster on black and will look
      soft at large sizes — get the original from whoever designed it.
