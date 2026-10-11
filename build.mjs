// Bygger hjemmesiden til ./dist
// Brug: node build.mjs            (til roden af et domæne)
//       BASE_PATH=/clinic360/ node build.mjs   (hvis siden ligger i en undermappe)
import { mkdirSync, writeFileSync, rmSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { allPages } from './src/pages.mjs';
import { site } from './src/data.mjs';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { redirects301, gone410 } from './src/redirects.mjs';
import { BASE } from './src/helpers.mjs';

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

// Web-manifest med korrekte stier
const manifest = JSON.parse(readFileSync('src/site.webmanifest', 'utf8'));
manifest.icons = manifest.icons.map((i) => ({ ...i, src: BASE + i.src.replace(/^\//, '') }));
writeFileSync(join(OUT, 'site.webmanifest'), JSON.stringify(manifest, null, 2));

// Sikkerheds-headers (_headers virker på Netlify og Cloudflare Pages). CSP tillader kun egne filer,
// det ene inline-script (via hash) og formular-endpointet, hvis det er sat.
const inline = "document.documentElement.classList.add('js')";
const hash = createHash('sha256').update(inline).digest('base64');
const connect = ["'self'", site.formEndpoint && new URL(site.formEndpoint).origin].filter(Boolean).join(' ');
writeFileSync(
  join(OUT, '_headers'),
  `/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: DENY
  Content-Security-Policy: default-src 'self'; script-src 'self' 'sha256-${hash}'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src ${connect}; form-action 'self' mailto:; frame-ancestors 'none'; base-uri 'self'

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`
);

// Redirects fra den gamle WordPress-side (_redirects: Netlify og Cloudflare Pages)
writeFileSync(
  join(OUT, '_redirects'),
  [...redirects301.map(([a, b]) => `${a} ${b} 301`), ...gone410.map((a) => `${a} /404.html 410`)].join('\n') + '\n'
);

console.log(`Byggede ${pages.length} sider til ./${OUT}`);
