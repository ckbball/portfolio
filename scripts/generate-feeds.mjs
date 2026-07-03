/* Generates sitemap.xml, robots.txt, and rss.xml from the JSON manifests.
   Dev-only Node — never runs at request time. Safe to run before manifests
   exist (M1): it degrades to the static routes and an empty feed. */
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE_URL = 'https://caesarladion.com';

const STATIC_ROUTES = ['/', '/projects/', '/writing/', '/about.html', '/resume.html'];

async function readJson(relPath) {
  const abs = join(root, relPath);
  if (!existsSync(abs)) return [];
  try {
    return JSON.parse(await readFile(abs, 'utf8'));
  } catch (err) {
    console.error(`Failed to parse ${relPath}: ${err.message}`);
    process.exitCode = 1;
    return [];
  }
}

function xmlEscape(str) {
  return String(str).replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c])
  );
}

function published(items) {
  return items.filter((it) => !it.draft);
}

async function main() {
  const projects = published(await readJson('content/projects.json'));
  const posts = published(await readJson('content/posts.json'));

  // sitemap.xml
  const urls = [
    ...STATIC_ROUTES,
    ...projects.map((p) => `/projects/detail.html?slug=${p.slug}`),
    ...posts.map((p) => `/writing/post.html?slug=${p.slug}`),
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${BASE_URL}${xmlEscape(u)}</loc></url>`).join('\n')}
</urlset>
`;
  await writeFile(join(root, 'sitemap.xml'), sitemap);

  // robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
  await writeFile(join(root, 'robots.txt'), robots);

  // rss.xml (writing)
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const items = sortedPosts
    .map(
      (p) => `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${BASE_URL}/writing/post.html?slug=${xmlEscape(p.slug)}</link>
      <guid>${BASE_URL}/writing/post.html?slug=${xmlEscape(p.slug)}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${xmlEscape(p.description || '')}</description>
    </item>`
    )
    .join('\n');
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Caesar Ladion — Writing</title>
    <link>${BASE_URL}/writing/</link>
    <description>Posts on agent evaluation, Go, and data engineering.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  await writeFile(join(root, 'rss.xml'), rss);

  console.log(
    `Generated feeds: ${urls.length} sitemap URLs, ${sortedPosts.length} RSS items.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
