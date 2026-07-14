import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const cssPath = join(root, 'assets/css/styles.css');

if (!existsSync(cssPath) || statSync(cssPath).size < 1000) {
  errors.push('Compiled CSS is missing or unexpectedly small.');
}

const html = await readFile(join(root, 'index.html'), 'utf8');
for (const id of ['top', 'work', 'about', 'contact']) {
  if (!html.includes(`id="${id}"`)) errors.push(`Missing single-page section: #${id}`);
}

if (/href="\/(projects|writing)|href="\/about\.html|href="\/resume\.html/.test(html)) {
  errors.push('The homepage still links to a retired internal page.');
}

if (errors.length) {
  console.error('Build check failed:\n' + errors.map((error) => `  - ${error}`).join('\n'));
  process.exit(1);
}

console.log('Single-page build check passed.');
