# GBR — Global Body Repairs

Static marketing site for a Birmingham accident repair centre.
`CLAUDE.md` in this directory is the build brief and the source of truth for
design tokens, copy decisions and build order.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind v4 · static export
(`output: 'export'`) · deploy target Cloudflare Pages.

Tailwind v4 is CSS-first, so the brand tokens live in `src/app/globals.css`
under `:root` and are mirrored into Tailwind via `@theme` in the same file.
There is no `tailwind.config.ts`.

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run build      # static export to ./out
npm run typecheck  # tsc --noEmit
npm run lint
npm run todos      # list unverified placeholder content
npm run photos     # re-fetch the placeholder photography
```

**Do not run `npm run build` while `npm run dev` is running.** They share
`.next`, and the build deletes chunks the dev server still expects — it fails
with `Cannot find module './331.js'` or a missing `page.js`. Stop the dev
server first. Likewise only ever run one dev server against this directory.

## Filling in the business facts

Everything real about the business lives in **`src/config/business.ts`** —
phone, address, hours, accreditations, prices, reviews. Nothing is hardcoded
into a component.

Two kinds of value live there:

- **Confirmed** facts, written plainly. The address and weekday opening hours
  are real.
- **Placeholder** content, wrapped in `ph(...)`. It reads as finished copy on
  the page so the design can be judged properly, but it is not verified.
  `ph()` is a runtime no-op — it exists only to be greppable.

Run `npm run todos` to list every `ph()` value still outstanding.

Two categories deserve particular care before launch:

- **The trust claims** (insurance approved, lifetime guarantee, courtesy car,
  free collection). These are plausible for a shop of this type, which is
  exactly what makes them dangerous — they will not look wrong on review.
  Publish each only if true and you can name the basis.
- **The review rating and count.** Never let a made-up `aggregateRating` reach
  the structured data; see CLAUDE.md §10.

The phone numbers are from Ofcom's reserved drama ranges (`0121 496 0xxx`,
`07700 900xxx`), so nothing on the site can misdirect a real caller while it is
in review.

## Photography

`/public/photos` holds stock stand-ins from Unsplash, pre-compressed to AVIF +
WebP + JPEG and served through a `<picture>` so the browser picks the smallest
format it understands. `public/photos/CREDITS.txt` lists the source of each.

Every one of them is a placeholder. Replace them with GBR's own work — see the
content checklist in CLAUDE.md §13. `npm run photos` regenerates them.

## Assets

`/assets` holds the originals: the two logo lockups and the hero mockup that
the drag-reveal component was built from. The logos are raster JPEGs on a
solid black field, so they are composited with `mix-blend-mode: screen` on
dark surfaces. Getting the original SVG is on the content checklist.

## Progress against the brief's build order

- [x] 1 — Scaffold, tokens, fonts, `business.ts`, layout shell, nav, footer
- [x] 2 — Homepage hero with the drag-reveal component
- [x] 3 — Rest of the homepage sections
- [ ] 4 — Service page template, then the four instances
- [ ] 5 — Insurance claims page
- [ ] 6 — Gallery
- [ ] 7 — Contact, quote flow, form wiring
- [ ] 8 — SEO layer: metadata, schema, sitemap, OG images
- [ ] 9 — Area pages
- [ ] 10 — Deploy to Cloudflare Pages
