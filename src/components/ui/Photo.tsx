import { photo } from "@/config/business";

/**
 * Pre-compressed photograph — CLAUDE.md §6.
 *
 * Static export disables the Next image optimiser, so `next/image` would ship a
 * plain <img> with no format negotiation at all. Instead every photo is built
 * to AVIF + WebP + JPEG at commit time (`npm run photos`) and served through a
 * <picture>, so the browser takes the smallest format it understands.
 *
 * Width and height are always set to reserve the box and keep CLS at zero.
 *
 * Every photo also has native browser drag disabled. Chrome and Safari let
 * you drag *any* <img> out of the page by default — a separate feature from
 * text selection, so `select-none` on a parent never touches it. Left alone,
 * that native drag starts the instant a pointer-down turns into a move,
 * fighting the custom drag on BeforeAfter and making the slider feel like it
 * is grabbing the image instead of moving the divider.
 */
export function Photo({
  slug,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes,
}: {
  /** Basename under /public/photos, without extension. */
  slug: string;
  /** Real alt text naming the vehicle and the damage — never "car repair Birmingham". */
  alt: string;
  width: number;
  height: number;
  /** Set on the LCP image only. */
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const base = photo(slug);
  return (
    <picture>
      <source srcSet={`${base}.avif`} type="image/avif" sizes={sizes} />
      <source srcSet={`${base}.webp`} type="image/webp" sizes={sizes} />
      <img
        src={`${base}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        draggable={false}
        className={`select-none [-webkit-touch-callout:none] [-webkit-user-drag:none] ${className}`}
      />
    </picture>
  );
}
