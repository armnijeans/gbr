import { mkdirSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const OUT = "/Users/armaanihussain/claude/gbr/public/photos";
mkdirSync(OUT, { recursive: true });

// slug -> [unsplash id, target width]
const picks = {
  "hero-before":        ["1762049297259-f9fdd460ec99", 1500],
  "hero-after":         ["1572023101419-0c58422316ec", 1500],
  "service-accident":   ["1654027197679-84c14708d5de", 760],
  "service-smart":      ["1779048611509-e1bd641a8d7a", 760],
  "service-paint":      ["1674632917668-6237bad1347d", 760],
  "service-servicing":  ["1727893119356-1702fe921cf9", 760],
  "proof-1-before":     ["1662541547523-118842914aa7", 760],
  "proof-1-after":      ["1777213001814-3fb7036696dd", 760],
  "proof-2-before":     ["1786489785778-a163f38b7c87", 760],
  "proof-2-after":      ["1708805282706-f44730b7e527", 760],
  "proof-3-before":     ["1674632917668-6237bad1347d", 760],
  "proof-3-after":      ["1779048611509-e1bd641a8d7a", 760],
  "workshop":           ["1727893119356-1702fe921cf9", 1200],
  "alloys":             ["1611633235555-45e252fe48c8", 760],

  // Gallery pairs. Matched by subject and tone so the drag-reveal reads as
  // one car rather than two — front-end with front-end, door with door.
  "gallery-4-before":   ["1597328290883-50c5787b7c7e", 760],
  "gallery-4-after":    ["1616761879141-f485e5fed5df", 760],
  "gallery-5-before":   ["1550565076-b2371ea1a324", 760],
  "gallery-5-after":    ["1564705604144-51593412c133", 760],
  "gallery-6-before":   ["1609511583488-e13c95c04aa0", 760],
  "gallery-6-after":    ["1608479746923-7e17632a9799", 760],
  "gallery-7-before":   ["1676035291793-645c307e5a4e", 760],
  "gallery-7-after":    ["1703778672598-631c6fec67d2", 760],

  // Workshop / about-page imagery.
  "workshop-bay":       ["1632405862117-236585cfb757", 1200],
  "spray-booth":        ["1666009419611-e550e8c378d5", 1200],
  "workshop-lifts":     ["1618312980096-873bd19759a0", 1200],
};

const manifest = [];

for (const [slug, [id, w]] of Object.entries(picks)) {
  const url = `https://images.unsplash.com/photo-${id}?w=${w * 2}&q=85&fm=jpg&fit=crop`;
  const res = await fetch(url);
  if (!res.ok) { console.error("FAIL", slug, res.status); continue; }
  const buf = Buffer.from(await res.arrayBuffer());

  const h = Math.round(w * (slug.startsWith("hero") ? 0.62 : 0.68));
  const base = sharp(buf).resize(w, h, { fit: "cover", position: "centre" });

  const webp = await base.clone().webp({ quality: 74 }).toBuffer();
  const avif = await base.clone().avif({ quality: 52 }).toBuffer();
  const jpg  = await base.clone().jpeg({ quality: 76, progressive: true, mozjpeg: true }).toBuffer();

  writeFileSync(`${OUT}/${slug}.webp`, webp);
  writeFileSync(`${OUT}/${slug}.avif`, avif);
  writeFileSync(`${OUT}/${slug}.jpg`, jpg);

  manifest.push({ slug, id, w, h, kb: { avif: (avif.length/1024).toFixed(0), webp: (webp.length/1024).toFixed(0), jpg: (jpg.length/1024).toFixed(0) } });
  console.log(`${slug.padEnd(20)} ${w}x${h}  avif ${(avif.length/1024).toFixed(0)}kb  webp ${(webp.length/1024).toFixed(0)}kb  jpg ${(jpg.length/1024).toFixed(0)}kb`);
}

writeFileSync(`${OUT}/CREDITS.txt`,
`Placeholder photography — Unsplash (unsplash.com/license)
Free for commercial use, no attribution required. These are STAND-INS.
Replace every one of them with GBR's own work before launch; see CLAUDE.md §13.

` + manifest.map(m => `${m.slug.padEnd(20)} unsplash photo-${m.id}`).join("\n") + "\n");

console.log("\nwrote", manifest.length, "images x3 formats");
