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
