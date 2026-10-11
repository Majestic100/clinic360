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

// Ikoner fra Phosphor (light), indlejret ved build. Kilde: @phosphor-icons/core
const PH = new URL('../node_modules/@phosphor-icons/core/assets/light/', import.meta.url);
const ph = (name) =>
  readFileSync(new URL(`${name}-light.svg`, PH), 'utf8')
    .replace('<svg ', '<svg class="icon" aria-hidden="true" focusable="false" ')
    .replace(/ width="[^"]*"| height="[^"]*"/g, '');

export const icon = {
  arrowLeft: ph('caret-left'),
  arrow: ph('caret-right'),
  external: ph('arrow-up-right'),
  phone: ph('phone'),
  mail: ph('envelope-simple'),
  pin: ph('map-pin'),
  clock: ph('clock'),
  shield: ph('shield-check'),
  doctor: ph('stethoscope'),
  gift: ph('gift'),
  check: ph('check'),
  x: ph('x'),
  menu: ph('list'),
  plus: ph('plus'),
  calendar: ph('calendar-blank'),
  chat: ph('chat-circle'),
  caretDown: ph('caret-down'),
  drag: ph('arrows-left-right'),
  facebook: ph('facebook-logo'),
  instagram: ph('instagram-logo'),
};

const starFill = readFileSync(new URL('../fill/star-fill.svg', PH), 'utf8').replace('<svg ', '<svg aria-hidden="true" focusable="false" ');

/** Trustpilot-stjerner (Trustpilots grønne farve, så de genkendes) */
export function stars(n = 5, cls = '') {
  const one = (fill) => `<span class="tp-star${fill ? '' : ' tp-star--empty'}">${starFill}</span>`;
  return `<span class="tp-stars ${cls}" role="img" aria-label="${n} ud af 5 stjerner på Trustpilot">${Array.from({ length: 5 }, (_, i) => one(i < n)).join('')}</span>`;
}
