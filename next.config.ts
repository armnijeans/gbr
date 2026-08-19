import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static export for Cloudflare Pages (CLAUDE.md §6).
  output: "export",
  // Sitemap in CLAUDE.md §7 uses trailing slashes (/repairs/), so emit dirs.
  trailingSlash: true,
  // Static export disables the Next image optimiser; images are pre-compressed
  // at build time instead (CLAUDE.md §6).
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
