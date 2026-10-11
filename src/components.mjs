import { site, rating, hours, treatments, categories, results, resultTags, reviews, team } from './data.mjs';
import { url, asset, esc, kr, plain, img, icon, stars, pngSize } from './helpers.mjs';

export const bySlug = Object.fromEntries(treatments.map((t) => [t.slug, t]));
export const minPrice = (t) => Math.min(...t.prices.flatMap((g) => g.rows.filter((r) => !r.noFrom).map((r) => r.price)));

const ext = 'target="_blank" rel="noopener"';

export const btn = (label, href, { variant = 'primary', icon: ic = '', external = false, cls = '' } = {}) =>
  `<a class="btn btn--${variant} ${cls}" href="${href}"${external ? ' ' + ext : ''}>${label}${ic ? ' ' + ic : ''}</a>`;

export const bookBtn = (variant = 'primary', label = 'Book tid', cls = '') =>
  btn(label, site.bookingUrl, { variant, external: true, icon: icon.arrow, cls });

export const eyebrow = (t) => `<p class="eyebrow">${t}</p>`;

export const sectionHead = ({ eyebrow: e, title, lead = '', align = 'left', action = '' }) => `
  <div class="section-head section-head--${align}">
    <div>
      ${e ? eyebrow(e) : ''}
      <h2 class="h2">${title}</h2>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>
    ${action ? `<div class="section-head__action">${action}</div>` : ''}
  </div>`;

/* ---------------------------------------------------------------- Header & footer */

function logo(variant = 'dark') {
  const [w, h] = pngSize(`logo-${variant}-mono.png`);
  return `<img src="${asset(`img/logo-${variant}-mono.png`)}" width="${w}" height="${h}" alt="" class="brand__mark">`;
}

function brand(variant = 'dark') {
  return `<a class="brand" href="${url()}" aria-label="Clinic 360, til forsiden">
    ${logo(variant)}
    <span class="brand__text"><span class="brand__name">Clinic 360</span><span class="brand__tag">Kosmetisk speciallægeklinik</span></span>
  </a>`;
}

const nav = [
  { href: 'behandlinger/', label: 'Behandlinger', key: 'behandlinger', mega: true },
  { href: 'priser/', label: 'Priser', key: 'priser' },
  { href: 'foer-efter/', label: 'Før & efter', key: 'foer-efter' },
  { href: 'om-os/', label: 'Om os', key: 'om-os' },
  { href: 'kontakt/', label: 'Kontakt', key: 'kontakt' },
];

function megaMenu() {
  return `<div class="mega" id="mega-menu">
    <div class="mega__inner">
      ${categories
        .map(
          (c) => `<div class="mega__col">
            <p class="mega__title">${c.name}</p>
            <ul>${treatments
              .filter((t) => t.category === c.id)
              .map((t) => `<li><a href="${url(t.slug + '/')}"><span>${t.name}</span><span class="mega__price">fra ${kr(minPrice(t))}</span></a></li>`)
              .join('')}</ul>
          </div>`
        )
        .join('')}
      <div class="mega__col mega__col--cta">
        <p class="mega__title">I tvivl om, hvad du skal vælge?</p>
        <p>Vi tilbyder altid en gratis og uforpligtende forundersøgelse.</p>
        ${bookBtn('primary', 'Book forundersøgelse')}
        <a class="link" href="${url('priser/')}">Se alle priser ${icon.arrow}</a>
      </div>
    </div>
  </div>`;
}

export function header(active) {
  return `<a class="skip" href="#indhold">Spring til indhold</a>
<header class="site-header" data-header>
  <div class="container site-header__inner">
    ${brand()}
    <nav class="nav" aria-label="Hovedmenu">
      <ul class="nav__list">
        ${nav
          .map((n) =>
            n.mega
              ? `<li class="nav__item nav__item--mega" data-mega>
                  <a class="nav__link${active === n.key ? ' is-active' : ''}" href="${url(n.href)}"${active === n.key ? ' aria-current="page"' : ''}>${n.label}</a>
                  <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="mega-menu" aria-label="Vis alle behandlinger" data-mega-toggle><svg viewBox="0 0 24 24" aria-hidden="true" class="icon"><path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button>
                  ${megaMenu()}
                </li>`
              : `<li class="nav__item"><a class="nav__link${active === n.key ? ' is-active' : ''}" href="${url(n.href)}"${active === n.key ? ' aria-current="page"' : ''}>${n.label}</a></li>`
          )
          .join('')}
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="header-phone" href="${site.phoneHref}">${icon.phone}<span>${site.phone}</span></a>
      ${bookBtn('primary', 'Book tid', 'btn--sm')}
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobilmenu" data-menu-toggle>
        <span class="menu-btn__open">${icon.menu}</span><span class="menu-btn__close">${icon.x}</span>
        <span class="sr-only">Menu</span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobilmenu" hidden>
    <div class="container">
      <ul class="mobile-menu__main">
        ${nav.map((n) => `<li><a href="${url(n.href)}"${active === n.key ? ' aria-current="page"' : ''}>${n.label}</a></li>`).join('')}
      </ul>
      <p class="mobile-menu__title">Behandlinger</p>
      <ul class="mobile-menu__grid">
        ${treatments.map((t) => `<li><a href="${url(t.slug + '/')}">${t.name}</a></li>`).join('')}
      </ul>
      <div class="mobile-menu__contact">
        <a href="${site.phoneHref}">${icon.phone} ${site.phone}</a>
        <a href="mailto:${site.email}">${icon.mail} ${site.email}</a>
      </div>
    </div>
  </div>
</header>`;
}

export function hoursList(cls = '') {
  return `<dl class="hours ${cls}" data-hours>
    ${hours
      .map(
        (h) =>
          `<div class="hours__row" data-dow="${[].concat(h.dow).join(',')}"><dt>${h.day}</dt><dd>${h.time}</dd></div>`
      )
      .join('')}
  </dl>`;
}

export function stpsBadge(cls = '') {
  return `<a class="stps ${cls}" href="${site.stpsUrl}" ${ext}>
    <span class="stps__icon">${icon.shield}</span>
    <span class="stps__text"><span class="stps__small">Registreret hos</span><span class="stps__big">Styrelsen for Patientsikkerhed</span></span>
  </a>`;
}

export function footer() {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container">
    <div class="site-footer__cta">
      <h2 class="h2">Klar til en <em>uforpligtende</em> snak?</h2>
      <div class="site-footer__cta-actions">
        ${bookBtn('light', 'Book tid')}
        ${btn('Ring ' + site.phone, site.phoneHref, { variant: 'ghost-light', icon: '' })}
      </div>
    </div>
    <div class="site-footer__grid">
      <div class="site-footer__brand">
        ${brand('light')}
        <p>Kosmetiske behandlinger med respekt for hudens naturlige aldring. I Hørup på Sydals, tæt på Sønderborg.</p>
        ${stpsBadge('stps--light')}
      </div>
      <div>
        <p class="site-footer__title">Behandlinger</p>
        <ul class="site-footer__links">${treatments.map((t) => `<li><a href="${url(t.slug + '/')}">${t.name}</a></li>`).join('')}</ul>
      </div>
      <div>
        <p class="site-footer__title">Kontakt</p>
        <ul class="site-footer__links site-footer__contact">
          <li><a href="${site.phoneHref}">${icon.phone}${site.phone}</a></li>
          <li><a href="mailto:${site.email}">${icon.mail}${site.email}</a></li>
          <li><a href="${site.mapsUrl}" ${ext}>${icon.pin}${site.address.street}, ${site.address.zip} ${site.address.city}</a></li>
        </ul>
        <div class="site-footer__social">
          <a href="${site.facebook}" ${ext} aria-label="Clinic 360 på Facebook">${icon.facebook}</a>
          <a href="${site.instagram}" ${ext} aria-label="Clinic 360 på Instagram">${icon.instagram}</a>
        </div>
      </div>
      <div>
        <p class="site-footer__title">Åbningstider</p>
        ${hoursList('hours--light')}
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>© ${year} ${site.legalName} · CVR ${site.cvr}</p>
      <ul>
        <li><a href="${url('om-os/')}">Om os</a></li>
        <li><a href="${url('priser/')}">Priser</a></li>
        <li><a href="${url('cookie-og-privatlivspolitik/')}">Cookie- og privatlivspolitik</a></li>
      </ul>
    </div>
  </div>
</footer>
<nav class="action-bar" aria-label="Hurtige handlinger">
  <a href="${site.phoneHref}" class="action-bar__call">${icon.phone}<span>Ring</span></a>
  <a href="${url('priser/')}" class="action-bar__prices">Priser</a>
  <a href="${site.bookingUrl}" ${ext} class="action-bar__book">${icon.calendar}<span>Book tid</span></a>
</nav>`;
}

/* ---------------------------------------------------------------- Byggeklodser */

export function trustBar() {
  return `<section class="trust" aria-label="Derfor kan du være tryg">
    <div class="container trust__grid">
      ${stpsBadge('trust__item')}
      <a class="trust__item" href="${site.trustpilotUrl}" ${ext}>
        <span class="trust__icon trust__icon--tp">${stars(5)}</span>
        <span><strong>${rating.score} på Trustpilot</strong><span>${rating.count} anmeldelser</span></span>
      </a>
      <a class="trust__item" href="${url('om-os/')}">
        <span class="trust__icon">${icon.doctor}</span>
        <span><strong>Tilknyttet speciallæge</strong><span>Og kosmetiske specialsygeplejersker</span></span>
      </a>
      <a class="trust__item" href="${url('priser/')}">
        <span class="trust__icon">${icon.gift}</span>
        <span><strong>10 % velkomstrabat</strong><span>På din første behandling</span></span>
      </a>
    </div>
  </section>`;
}

export function treatmentCard(t, { sizes = '(min-width: 1100px) 30vw, (min-width: 640px) 45vw, 64px', extra = false } = {}) {
  return `<article class="t-card${extra ? ' t-card--extra' : ''}" data-tag="${t.category}">
    <a href="${url(t.slug + '/')}" class="t-card__link">
      <div class="t-card__media">${img(t.img, { alt: '', sizes })}</div>
      <div class="t-card__body">
        <h3 class="t-card__title">${t.name}</h3>
        <p class="t-card__text">${t.short}</p>
        <p class="t-card__meta"><span>fra <strong>${kr(minPrice(t))}</strong></span><span class="t-card__arrow">${icon.arrow}</span></p>
      </div>
    </a>
  </article>`;
}

export function priceTable(t) {
  return t.prices
    .map(
      (g) => `${g.group ? `<p class="price-table__group">${g.group}</p>` : ''}
      <ul class="price-table">
        ${g.rows
          .map(
            (r) =>
              `<li class="price-table__row"><span class="price-table__label">${r.label}</span><span class="price-table__price">${r.from ? '<small>fra</small> ' : ''}${kr(r.price)}</span></li>`
          )
          .join('')}
      </ul>`
    )
    .join('');
}

export function priceCard(t) {
  const hasResults = t.results.length > 0;
  return `<article class="price-card" id="pris-${t.slug}" data-spy>
    <header class="price-card__head">
      <div class="price-card__thumb">${img(t.img, { alt: '', sizes: '96px' })}</div>
      <div>
        <h3 class="price-card__title">${t.name}</h3>
        <p class="price-card__text">${t.short}</p>
      </div>
      <p class="price-card__from"><small>fra</small>${kr(minPrice(t))}</p>
    </header>
    <div class="price-card__body">${priceTable(t)}</div>
    <p class="price-card__badge">${icon.gift} ${t.discount} % rabat på din første behandling</p>
    <footer class="price-card__foot">
      ${bookBtn('primary', 'Book tid', 'btn--sm')}
      <a class="link" href="${url(t.slug + '/')}">Om behandlingen ${icon.arrow}</a>
      ${hasResults ? `<a class="link" href="${url('foer-efter/')}#${t.results[0]}">Før & efter ${icon.arrow}</a>` : ''}
    </footer>
  </article>`;
}

export function baCard(r, { sizes = '(min-width: 1100px) 22vw, (min-width: 640px) 45vw, 85vw' } = {}) {
  const tag = resultTags.find((x) => x.id === r.tag);
  const t = tag?.slug ? bySlug[tag.slug] : null;
  return `<figure class="ba" data-tag="${r.tag}">
    <div class="ba__frame" style="--pos:50%">
      ${img(`${r.id}-efter`, { alt: `Efter behandling: ${r.title}`, sizes, cls: 'ba__img' })}
      <div class="ba__before">${img(`${r.id}-foer`, { alt: `Før behandling: ${r.title}`, sizes, cls: 'ba__img' })}</div>
      <span class="ba__label ba__label--before" aria-hidden="true">Før</span>
      <span class="ba__label ba__label--after" aria-hidden="true">Efter</span>
      <span class="ba__handle" aria-hidden="true"><span>${icon.arrowLeft}${icon.arrow}</span></span>
      <input class="ba__range" type="range" min="0" max="100" value="50" aria-label="Træk for at sammenligne før og efter: ${esc(r.title)}">
    </div>
    <figcaption class="ba__caption">
      <span>${r.title}</span>
      ${t ? `<a href="${url(t.slug + '/')}">${t.name}</a>` : `<span class="ba__tag">${tag?.name ?? ''}</span>`}
    </figcaption>
  </figure>`;
}

export function resultsGrid(list, { filters = true, id = 'resultater' } = {}) {
  const used = resultTags.filter((tag) => list.some((r) => r.tag === tag.id));
  return `<div class="results" data-filter-scope>
    ${
      filters && used.length > 1
        ? `<div class="chips" role="group" aria-label="Filtrér før og efter-billeder">
            <button type="button" class="chip is-active" data-filter="all" aria-pressed="true">Alle <span>${list.length}</span></button>
            ${used
              .map(
                (tag) =>
                  `<button type="button" class="chip" data-filter="${tag.id}" aria-pressed="false" id="${tag.id}">${tag.name} <span>${list.filter((r) => r.tag === tag.id).length}</span></button>`
              )
              .join('')}
          </div>`
        : ''
    }
    <div class="results__grid" id="${id}">${list.map((r) => baCard(r)).join('')}</div>
    <p class="results__note">Billeder af vores egne kunder, vist med samtykke. Resultater varierer fra person til person.</p>
  </div>`;
}

export function reviewCard(r) {
  return `<figure class="review">
    ${stars(5, 'tp-stars--sm')}
    <blockquote>
      <p>${r.text}</p>
    </blockquote>
    <figcaption><strong>${r.name}</strong><span>${r.topic}, ${r.date}</span></figcaption>
  </figure>`;
}

export function reviewsSection({ title = 'Det siger vores kunder', compact = false } = {}) {
  const featured = reviews.find((r) => r.featured);
  const rest = reviews.filter((r) => r !== featured);
  return `<section class="section section--dark reviews" aria-labelledby="anmeldelser-titel">
    <div class="container">
      <div class="reviews__top">
        <div class="reviews__score">
          ${eyebrow('Trustpilot')}
          <h2 class="h2" id="anmeldelser-titel">${title}</h2>
          <div class="score">
            <span class="score__num">${rating.score}</span>
            <span class="score__meta">${stars(5)}<span><strong>${rating.label}</strong> · ${rating.count} anmeldelser</span></span>
          </div>
          ${btn('Læs alle anmeldelser', site.trustpilotUrl, { variant: 'ghost-light', external: true, icon: icon.external })}
        </div>
        ${
          compact
            ? ''
            : `<figure class="reviews__featured">
          <blockquote><p>“${featured.text}”</p></blockquote>
          <figcaption>${stars(5, 'tp-stars--sm')}<strong>${featured.name}</strong><span>${featured.date}</span></figcaption>
        </figure>`
        }
      </div>
      <div class="carousel" data-carousel>
        <div class="carousel__track" data-carousel-track tabindex="0" aria-label="Anmeldelser, rul vandret">
          ${(compact ? reviews : rest).map(reviewCard).join('')}
        </div>
        <div class="carousel__controls">
          <button type="button" class="round-btn" data-carousel-prev aria-label="Forrige anmeldelser">${icon.arrowLeft}</button>
          <button type="button" class="round-btn" data-carousel-next aria-label="Næste anmeldelser">${icon.arrow}</button>
        </div>
      </div>
    </div>
  </section>`;
}

export function stepsList(steps, cls = '') {
  return `<ol class="steps ${cls}">
    ${steps.map((s, i) => `<li class="steps__item"><span class="steps__num">${String(i + 1).padStart(2, '0')}</span><h3>${s.t}</h3><p>${s.d}</p></li>`).join('')}
  </ol>`;
}

export function faqList(items) {
  return `<div class="faq">
    ${items
      .map(
        (f) => `<details class="faq__item">
        <summary><span>${f.q}</span><span class="faq__icon">${icon.plus}</span></summary>
        <div class="faq__answer"><p>${f.a}</p></div>
      </details>`
      )
      .join('')}
  </div>`;
}

export function zoSection() {
  return `<section class="section zo" aria-labelledby="zo-titel">
    <div class="container zo__grid">
      <div class="zo__media">
        ${img('zo-set', { alt: 'Produkter fra ZO Skin Health', sizes: '(min-width: 900px) 40vw, 90vw' })}
      </div>
      <div class="zo__body">
        ${eyebrow('Medicinsk hudpleje')}
        <h2 class="h2" id="zo-titel">ZO Skin Health</h2>
        <p class="lead">En førende hudplejeserie udviklet af Dr. Zein Obagi, der kombinerer avanceret teknologi og videnskab for en sund, stærk og ungdommelig hud.</p>
        <p>Produkterne forebygger og behandler bl.a. akne, hyperpigmentering og aldringstegn og arbejder på celleniveau. Vi bruger ZO Skin Health i klinikken og hjælper dig gerne med at finde de produkter, der passer til din hud.</p>
        <div class="zo__actions">
          ${btn('Se ZO Skin Health-produkter', site.zoUrl, { variant: 'primary', external: true, icon: icon.external })}
          <a class="link" href="${url('kontakt/')}">Få personlig rådgivning ${icon.arrow}</a>
        </div>
      </div>
    </div>
  </section>`;
}

export function ctaBand({ title = 'Er du i tvivl om, hvilken behandling der passer til dig?', text = 'Book en gratis og uforpligtende forundersøgelse. Sammen gennemgår vi dine ønsker og forventninger, så du får den behandling, der giver mening for dig.' } = {}) {
  return `<section class="section section--tint cta-band">
    <div class="container cta-band__inner">
      <div class="cta-band__media">${img('consultation', { alt: 'Konsultation i klinikkens lounge', sizes: '(min-width: 900px) 40vw, 90vw' })}</div>
      <div class="cta-band__body">
        ${eyebrow('Gratis forundersøgelse')}
        <h2 class="h2">${title}</h2>
        <p class="lead">${text}</p>
        <div class="btn-row">
          ${bookBtn('primary', 'Book forundersøgelse')}
          ${btn('Skriv til os', url('kontakt/'), { variant: 'outline' })}
        </div>
      </div>
    </div>
  </section>`;
}

export function teamGrid({ withBio = false } = {}) {
  return `<div class="team ${withBio ? 'team--bio' : ''}">
    ${team
      .map(
        (m, i) => `<article class="member" id="${m.img}">
        <div class="member__media">${img(m.img, { alt: `Portræt af ${m.name}`, sizes: withBio ? '(min-width: 900px) 40vw, 90vw' : '(min-width: 900px) 30vw, 90vw' })}</div>
        <div class="member__body">
          <h3 class="member__name">${m.name}</h3>
          <p class="member__role">${m.role}</p>
          ${withBio ? m.bio.map((p) => `<p>${p}</p>`).join('') : `<p>${m.bio[0]}</p>`}
        </div>
      </article>`
      )
      .join('')}
  </div>`;
}

export function pageHero({ eyebrow: e, title, lead, actions = '', image = '', imageAlt = '', extra = '', bg = '', ...rest }) {
  if (bg) return bgHero({ eyebrow: e, title, lead, actions, extra, bg, ...rest });
  return `<section class="page-hero${image ? ' page-hero--image' : ''}">
    <div class="container page-hero__inner">
      <div class="page-hero__body">
        ${e ? eyebrow(e) : ''}
        <h1 class="h1">${title}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
        ${actions ? `<div class="btn-row">${actions}</div>` : ''}
        ${extra}
      </div>
      ${image ? `<div class="page-hero__media">${img(image, { alt: imageAlt, sizes: '(min-width: 900px) 45vw, 100vw', eager: true })}</div>` : ''}
    </div>
  </section>`;
}

/**
 * Sidehoved med baggrundsbillede og tekst ovenpå.
 * `pos`/`posMobile` = vandret fokus i billedet; `mobileImg` = alternativt portrætbillede på mobil.
 */
export function bgHero({ eyebrow: e, title, lead, actions = '', extra = '', bg, alt = '', pos = '50%', posMobile = '50%', mobileImg = '', crumbs = '', large = false, titleCls = '' }) {
  const mobile = mobileImg
    ? `<source media="(max-width: 699px)" srcset="${asset(`img/${mobileImg}-700.webp`)} 700w, ${asset(`img/${mobileImg}-1067.webp`)} 1067w" sizes="100vw">`
    : '';
  return `<section class="bg-hero${large ? ' bg-hero--lg' : ''}" style="--pos:${pos};--pos-m:${posMobile}">
    <picture class="bg-hero__media">
      ${mobile}
      ${img(bg, { alt, sizes: '(max-width: 899px) 300vw, 100vw', eager: true })}
    </picture>
    <div class="bg-hero__content">
      ${crumbs}
      <div class="container bg-hero__body">
        ${e ? eyebrow(e) : ''}
        <h1 class="h1${titleCls ? ' ' + titleCls : ''}">${title}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
        ${extra}
        ${actions ? `<div class="btn-row">${actions}</div>` : ''}
      </div>
    </div>
  </section>`;
}

export function breadcrumbs(items) {
  return `<nav class="crumbs container" aria-label="Brødkrummer"><ol>
    <li><a href="${url()}">Forside</a></li>
    ${items.map((it, i) => (i === items.length - 1 ? `<li aria-current="page">${it.label}</li>` : `<li><a href="${url(it.href)}">${it.label}</a></li>`)).join('')}
  </ol></nav>`;
}

export { plain, kr, img, icon, stars, url, esc };
