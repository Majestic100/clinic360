import { readFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync(new URL('../assets/img/manifest.json', import.meta.url), 'utf8'));

export const BASE = (process.env.BASE_PATH || '/').replace(/\/?$/, '/');

/** Intern sti med base-path, fx url('priser/') */
export const url = (p = '') => BASE + p.replace(/^\//, '');
export const asset = (p) => url('assets/' + p);

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** 1400 -> "1.400 kr." */
export const kr = (n) => n.toLocaleString('da-DK').replace(/\s/g, '.') + ' kr.';

/** Fjern HTML-tags (til alt-tekster og meta) */
export const plain = (s = '') => s.replace(/<[^>]+>/g, '');

/**
 * Responsivt billede ud fra manifestet. `name` matcher filer som `${name}-700.webp`.
 */
export function img(name, { alt = '', sizes = '100vw', cls = '', eager = false, style = '' } = {}) {
  const files = Object.keys(manifest)
    .filter((f) => f.startsWith(name + '-') && /^\d+\.webp$/.test(f.slice(name.length + 1)))
    .sort((a, b) => manifest[a][0] - manifest[b][0]);
  if (!files.length) throw new Error(`Billede mangler: ${name}`);
  const largest = files[files.length - 1];
  const [w, h] = manifest[largest];
  const srcset = files.map((f) => `${asset('img/' + f)} ${manifest[f][0]}w`).join(', ');
  return `<img src="${asset('img/' + files[0])}" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}"${
    cls ? ` class="${cls}"` : ''
  }${style ? ` style="${style}"` : ''} ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

export function pngSize(file) {
  return manifest[file];
}

const svg = (body, vb = '0 0 24 24') =>
  `<svg class="icon" viewBox="${vb}" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const icon = {
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
  arrowLeft: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  external: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
  phone: svg('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  mail: svg('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>'),
  pin: svg('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  clock: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
  shield: svg('<path d="M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3z"/><path d="m9 12 2 2 4-4"/>'),
  doctor: svg('<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/><path d="M12 14v4M10 16h4"/>'),
  heart: svg('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
  gift: svg('<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v8h14v-8M12 8v12M12 8S10.5 4 8 4a2 2 0 0 0 0 4h4zm0 0s1.5-4 4-4a2 2 0 0 1 0 4h-4z"/>'),
  check: svg('<path d="m5 12 4.5 4.5L19 7"/>'),
  x: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  menu: svg('<path d="M4 8h16M4 16h16"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  calendar: svg('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  sparkle: svg('<path d="M12 3c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7z"/>'),
  chat: svg('<path d="M4 5h16v11H9l-5 4V5z"/>'),
  facebook: `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z"/></svg>`,
  instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>'),
};

/** Trustpilot-stjerner (grøn = Trustpilots farve, så de genkendes) */
export function stars(n = 5, cls = '') {
  const one = (fill) =>
    `<span class="tp-star${fill ? '' : ' tp-star--empty'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M12 3.5l2.4 6h6.3l-5.1 3.8 2 6.2L12 15.7l-5.6 3.8 2-6.2-5.1-3.8h6.3z"/></svg></span>`;
  return `<span class="tp-stars ${cls}" role="img" aria-label="${n} ud af 5 stjerner">${Array.from({ length: 5 }, (_, i) => one(i < n)).join('')}</span>`;
}
