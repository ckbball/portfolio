/* Minimal build sanity check for CI. Asserts the compiled stylesheet exists and
   looks real, and that the required top-level HTML entry points are present.
   Richer link/HTML validation arrives in M5. */
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function requireFile(rel) {
  if (!existsSync(join(root, rel))) errors.push(`Missing required file: ${rel}`);
}

// Compiled CSS must exist and be non-trivial.
const cssPath = join(root, 'assets/css/styles.css');
if (!existsSync(cssPath)) {
  errors.push('assets/css/styles.css not found — run `npm run build:css`.');
} else if (statSync(cssPath).size < 1000) {
  errors.push('assets/css/styles.css is suspiciously small — Tailwind build may have failed.');
}

['index.html', 'projects/index.html', 'writing/index.html', 'about.html', 'resume.html', '404.html']
  .forEach(requireFile);

['partials/header.html', 'partials/footer.html', 'assets/js/config.js', 'assets/js/partials.js']
  .forEach(requireFile);

// Every page that renders should carry the flash-guard inline script.
for (const page of ['index.html']) {
  if (existsSync(join(root, page))) {
    const html = await readFile(join(root, page), 'utf8');
    if (!html.includes("localStorage.getItem('theme')")) {
      errors.push(`${page} is missing the inline theme flash-guard script.`);
    }
  }
}

if (errors.length) {
  console.error('Build check failed:\n' + errors.map((e) => '  - ' + e).join('\n'));
  process.exit(1);
}
console.log('Build check passed.');
