// Bygger hjemmesiden til ./dist
// Brug: node build.mjs            (til roden af et domæne)
//       BASE_PATH=/clinic360/ node build.mjs   (hvis siden ligger i en undermappe)
import { mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { allPages } from './src/pages.mjs';
import { site } from './src/data.mjs';

const OUT = 'dist';
rmSync(OUT, { recursive: true, force: true });

const pages = allPages();
for (const [file, html] of pages) {
  const path = join(OUT, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, html);
}

cpSync('assets', join(OUT, 'assets'), { recursive: true, filter: (src) => !src.endsWith('manifest.json') });

const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .map(([f]) => f)
  .filter((f) => f !== '404.html')
  .map((f) => `${site.url}/${f.replace(/index\.html$/, '')}`);
writeFileSync(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`
);
writeFileSync(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`Byggede ${pages.length} sider til ./${OUT}`);
