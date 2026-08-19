#!/usr/bin/env node
/**
 * Lists every value still marked as unverified placeholder content.
 *
 * business.ts wraps placeholder values in `ph(...)`. That is a runtime no-op —
 * its only job is to be greppable, so the page can read as finished copy while
 * nothing unverified quietly becomes fact.
 *
 * Run with: npm run todos
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SKIP = new Set(["node_modules", ".next", ".git", "out", "assets", "scripts", "public"]);
const EXT = /\.(ts|tsx|css)$/;

const placeholders = [];
const todos = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP.has(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full);
    else if (EXT.test(entry)) scan(full);
  }
}

function scan(file) {
  const rel = relative(ROOT, file);
  readFileSync(file, "utf8").split("\n").forEach((line, i) => {
    const text = line.trim().replace(/\s+/g, " ");
    // Skip comment lines — they talk about ph() rather than using it.
    if (/^(\/\/|\*|\/\*)/.test(text)) return;
    if (/\bph\(/.test(line) && !/const ph =/.test(line)) {
      placeholders.push({ file: rel, line: i + 1, text: text.slice(0, 100) });
    } else if (line.includes("TODO")) {
      todos.push({ file: rel, line: i + 1, text: text.slice(0, 100) });
    }
  });
}

walk(join(ROOT, "src"));

function report(title, items, note) {
  if (items.length === 0) return;
  console.log(`\n  ${items.length} ${title}\n`);
  let current = null;
  for (const it of items) {
    if (it.file !== current) { current = it.file; console.log(`  ${current}`); }
    console.log(`    ${String(it.line).padStart(4)}  ${it.text}`);
  }
  if (note) console.log(`\n  ${note}`);
}

report("placeholder value(s) — realistic, but NOT verified", placeholders,
  "These render as finished copy. Confirm each one before launch;\n  the accreditation and guarantee claims especially — see CLAUDE.md §2.");
report("code TODO(s)", todos);

if (placeholders.length === 0 && todos.length === 0) {
  console.log("\n  Nothing outstanding. Every fact is confirmed.\n");
} else {
  console.log("");
}
