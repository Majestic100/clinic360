import { site, rating, hours, treatments, categories, resultTags, reviews, team } from './data.mjs';
import { url, asset, esc, kr, plain, img, icon, stars, pngSize } from './helpers.mjs';

export const bySlug = Object.fromEntries(treatments.map((t) => [t.slug, t]));
export const minPrice = (t) => Math.min(...t.prices.flatMap((g) => g.rows.filter((r) => !r.noFrom).map((r) => r.price)));

const ext = 'target="_blank" rel="noopener"';

/* Knapper. Én etiket pr. hensigt på hele siden:
   booking = "Book tid", priser = "Se priser", kontakt = "Kontakt os", før/efter = "Se før og efter". */
export const btn = (label, href, { variant = 'primary', external = false, cls = '' } = {}) =>
  `<a class="btn btn--${variant}${cls ? ' ' + cls : ''}" href="${href}"${external ? ' ' + ext : ''}>${label}${external ? icon.external : ''}</a>`;

export const bookBtn = (variant = 'primary', cls = '') =>
  `<a class="btn btn--${variant}${cls ? ' ' + cls : ''}" href="${site.bookingUrl}" ${ext}>Book tid</a>`;

export const pricesBtn = (variant = 'secondary') => btn('Se priser', url('priser/'), { variant });

export const sectionHead = ({ title, lead = '', id = '', center = false }) => `
  <header class="section-head${center ? ' section-head--center' : ''}">
    <h2 class="h2"${id ? ` id="${id}"` : ''}>${title}</h2>
    ${lead ? `<p class="lead">${lead}</p>` : ''}
  </header>`;

/* ---------------------------------------------------------------- Header & footer */

function logo() {
  const [w, h] = pngSize('logo-dark-mono.png');
  return `<picture class="brand__mark">
    <source srcset="${asset('img/logo-light-mono.png')}" media="(prefers-color-scheme: dark)">
    <img src="${asset('img/logo-dark-mono.png')}" width="${w}" height="${h}" alt="">
  </picture>`;
}

function brand() {
  return `<a class="brand" href="${url()}" aria-label="Clinic 360, til forsiden">
    ${logo()}
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
        <p>Forundersøgelsen er altid gratis og uforpligtende.</p>
        ${bookBtn('primary', 'btn--sm')}
      </div>
    </div>
  </div>`;
}

export function header(active) {
  const cur = (k) => (active === k ? ' aria-current="page"' : '');
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
                  <a class="nav__link" href="${url(n.href)}"${cur(n.key)}>${n.label}</a>
                  <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="mega-menu" aria-label="Vis alle behandlinger" data-mega-toggle>${icon.caretDown}</button>
                  ${megaMenu()}
                </li>`
              : `<li class="nav__item"><a class="nav__link" href="${url(n.href)}"${cur(n.key)}>${n.label}</a></li>`
          )
          .join('')}
      </ul>
    </nav>
    <div class="site-header__actions">
      <a class="header-phone" href="${site.phoneHref}">${icon.phone}<span>${site.phone}</span></a>
      ${bookBtn('primary', 'btn--sm header-book')}
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobilmenu" data-menu-toggle>
        <span class="menu-btn__open">${icon.menu}</span><span class="menu-btn__close">${icon.x}</span>
        <span class="sr-only">Menu</span>
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobilmenu" hidden>
    <div class="container">
      <ul class="mobile-menu__main">
        ${nav.map((n) => `<li><a href="${url(n.href)}"${cur(n.key)}>${n.label}</a></li>`).join('')}
      </ul>
      <p class="mobile-menu__title">Alle behandlinger</p>
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
      .map((h) => `<div class="hours__row" data-dow="${[].concat(h.dow).join(',')}"><dt>${h.day}</dt><dd>${h.time}</dd></div>`)
      .join('')}
  </dl>`;
}

export function stpsBadge(cls = '') {
  return `<a class="stps ${cls}" href="${site.stpsUrl}" ${ext}>
    ${icon.shield}
    <span>Registreret hos <strong>Styrelsen for Patientsikkerhed</strong></span>
  </a>`;
}

export function footer() {
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
  <div class="container">
    <div class="site-footer__cta">
      <h2 class="h2">Klar til en uforpligtende snak?</h2>
      <div class="btn-row">
        ${bookBtn('primary')}
        ${btn('Ring ' + site.phone, site.phoneHref, { variant: 'secondary' })}
      </div>
    </div>
    <div class="site-footer__grid">
      <div class="site-footer__brand">
        ${brand()}
        <p>Kosmetiske behandlinger med respekt for hudens naturlige aldring, i Hørup på Sydals tæt på Sønderborg.</p>
        ${stpsBadge()}
      </div>
      <nav aria-label="Behandlinger">
        <p class="site-footer__title">Behandlinger</p>
        <ul class="site-footer__links">${treatments.map((t) => `<li><a href="${url(t.slug + '/')}">${t.name}</a></li>`).join('')}</ul>
      </nav>
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
        ${hoursList()}
      </div>
    </div>
    <div class="site-footer__bottom">
      <p>© ${year} ${site.legalName}, CVR ${site.cvr}</p>
      <a href="${url('cookie-og-privatlivspolitik/')}">Cookie- og privatlivspolitik</a>
    </div>
  </div>
</footer>
<nav class="action-bar" aria-label="Genveje">
  <a href="${site.phoneHref}">${icon.phone}<span>Ring</span></a>
  <a href="${url('priser/')}">Priser</a>
  <a href="${site.bookingUrl}" ${ext} class="action-bar__book">${icon.calendar}<span>Book tid</span></a>
</nav>`;
}

/* ---------------------------------------------------------------- Byggeklodser */

/** Fakta-strimmel lige under heroen (tillid hører ikke hjemme i selve heroen) */
export function trustStrip() {
  return `<section class="trust" aria-label="Tryghed">
    <div class="container trust__row">
      ${stpsBadge('trust__item')}
      <a class="trust__item" href="${site.trustpilotUrl}" ${ext}>${stars(5, 'tp-stars--sm')}<span><strong>${rating.score} af 5</strong> på Trustpilot (${rating.count} anmeldelser)</span></a>
      <a class="trust__item" href="${url('om-os/')}">${icon.doctor}<span>Tilknyttet <strong>speciallæge</strong></span></a>
      <a class="trust__item" href="${url('priser/')}">${icon.gift}<span><strong>10 % rabat</strong> på første behandling</span></a>
    </div>
  </section>`;
}

/** Prisindekset: sidens bærende element. Behandlinger grupperet efter type med synlig fra-pris. */
export function priceIndex() {
  const group = (c) => `<div class="pindex__group">
      <h3 class="pindex__title">${c.name}</h3>
      <ul class="pindex__list">
        ${treatments
          .filter((t) => t.category === c.id)
          .map(
            (t) => `<li><a class="pindex__row" href="${url(t.slug + '/')}">
              <span class="pindex__thumb">${img(t.img, { alt: '', sizes: '64px' })}</span>
              <span class="pindex__name">${t.name}</span>
              <span class="pindex__price"><small>fra</small> ${kr(minPrice(t))}</span>
              <span class="pindex__desc">${t.short}</span>
            </a></li>`
          )
          .join('')}
      </ul>
    </div>`;
  return `<div class="pindex">
    <div class="pindex__col">${group(categories[0])}</div>
    <div class="pindex__col">${group(categories[1])}${group(categories[2])}</div>
  </div>`;
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

/** Prisblok på prissiden: info til venstre, prisliste til højre */
export function priceBlock(t) {
  const hasResults = t.results.length > 0;
  return `<article class="pblock" id="pris-${t.slug}" data-spy>
    <div class="pblock__info">
      <div class="pblock__thumb">${img(t.img, { alt: '', sizes: '96px' })}</div>
      <h3 class="pblock__name">${t.name}</h3>
      <p class="pblock__text">${t.short}</p>
      <p class="pblock__discount">${icon.gift}${t.discount} % rabat på din første behandling</p>
      <p class="pblock__links">
        <a href="${url(t.slug + '/')}">Om ${t.name.toLowerCase().startsWith('prf') ? 'PRF' : t.name.toLowerCase()}</a>
        ${hasResults ? `<a href="${url('foer-efter/')}#${t.results[0]}">Se før og efter</a>` : ''}
      </p>
    </div>
    <div class="pblock__prices">
      ${priceTable(t)}
      ${bookBtn('primary', 'btn--sm')}
    </div>
  </article>`;
}

export function baCard(r, { sizes = '(min-width: 1100px) 25vw, (min-width: 640px) 45vw, 92vw', eager = false } = {}) {
  const tag = resultTags.find((x) => x.id === r.tag);
  const t = tag?.slug ? bySlug[tag.slug] : null;
  return `<figure class="ba" data-tag="${r.tag}">
    <div class="ba__frame" style="--pos:50%">
      ${img(`${r.id}-efter`, { alt: `Efter behandling: ${r.title}`, sizes, cls: 'ba__img', eager })}
      <div class="ba__before">${img(`${r.id}-foer`, { alt: `Før behandling: ${r.title}`, sizes, cls: 'ba__img', eager })}</div>
      <span class="ba__handle" aria-hidden="true"><span>${icon.drag}</span></span>
      <input class="ba__range" type="range" min="0" max="100" value="50" aria-label="Sammenlign før og efter: ${esc(r.title)}">
    </div>
    <figcaption class="ba__caption">
      <span class="ba__side">Før</span>
      <span class="ba__title">${r.title}${t ? `, <a href="${url(t.slug + '/')}">${t.name.toLowerCase()}</a>` : ''}</span>
      <span class="ba__side">Efter</span>
    </figcaption>
  </figure>`;
}

/** Tre resultater i asymmetrisk opstilling: ét stort, to mindre */
export function resultsFeature(list) {
  return `<div class="ba-feature">
    ${baCard(list[0], { sizes: '(min-width: 900px) 50vw, 92vw' })}
    <div class="ba-feature__side">${list.slice(1, 3).map((r) => baCard(r, { sizes: '(min-width: 900px) 25vw, 46vw' })).join('')}</div>
  </div>
  <p class="results__note">Billeder af vores egne kunder, vist med samtykke. Resultater varierer fra person til person.</p>`;
}

export function resultsGrid(list) {
  const used = resultTags.filter((tag) => list.some((r) => r.tag === tag.id));
  return `<div class="results" data-filter-scope>
    <div class="chips" role="group" aria-label="Filtrér efter behandling">
      <button type="button" class="chip is-active" data-filter="all" aria-pressed="true">Alle <span>${list.length}</span></button>
      ${used
        .map((tag) => `<button type="button" class="chip" data-filter="${tag.id}" aria-pressed="false">${tag.name} <span>${list.filter((r) => r.tag === tag.id).length}</span></button>`)
        .join('')}
    </div>
    <div class="results__grid">${list.map((r) => baCard(r)).join('')}</div>
    <p class="results__note">Billeder af vores egne kunder, vist med samtykke. Resultater varierer fra person til person.</p>
  </div>`;
}

export function reviewsSection({ compact = false } = {}) {
  const featured = reviews.find((r) => r.featured);
  const rest = reviews.filter((r) => r !== featured);
  const quote = (r) => `<figure class="quote">
      <blockquote><p>»${r.text}«</p></blockquote>
      <figcaption><strong>${r.name}</strong><span>${r.topic}, ${r.date}</span></figcaption>
    </figure>`;
  return `<section class="section section--plane reviews" aria-labelledby="anmeldelser">
    <div class="container">
      <div class="reviews__head">
        <h2 class="h2" id="anmeldelser">Det siger vores kunder</h2>
        <a class="rating" href="${site.trustpilotUrl}" ${ext}>${stars(5)}<span><strong>${rating.score} af 5</strong> på Trustpilot, ${rating.count} anmeldelser</span></a>
      </div>
      ${
        compact
          ? ''
          : `<figure class="reviews__featured">
        <blockquote><p>»${featured.text}«</p></blockquote>
        <figcaption><strong>${featured.name}</strong>, ${featured.topic.toLowerCase()} via Trustpilot</figcaption>
      </figure>`
      }
      <div class="carousel" data-carousel>
        <div class="carousel__track" data-carousel-track tabindex="0" role="region" aria-label="Flere anmeldelser, rul vandret">
          ${(compact ? reviews : rest).map(quote).join('')}
        </div>
        <div class="carousel__foot">
          <div class="carousel__controls">
            <button type="button" class="round-btn" data-carousel-prev aria-label="Forrige">${icon.arrowLeft}</button>
            <button type="button" class="round-btn" data-carousel-next aria-label="Næste">${icon.arrow}</button>
          </div>
          ${btn('Læs anmeldelser på Trustpilot', site.trustpilotUrl, { variant: 'text', external: true })}
        </div>
      </div>
    </div>
  </section>`;
}

/** Forløb som rækker (indholdet er en ægte sekvens, så tallene bærer information) */
export function stepsRows(steps) {
  return `<ol class="steps">
    ${steps.map((s, i) => `<li class="steps__row"><span class="steps__num" aria-hidden="true">${i + 1}</span><h3 class="steps__title">${s.t}</h3><p>${s.d}</p></li>`).join('')}
  </ol>`;
}

export function faqList(items) {
  return `<div class="faq">
    ${items
      .map(
        (f) => `<details class="faq__item">
        <summary><span>${f.q}</span>${icon.plus}</summary>
        <div class="faq__answer"><p>${f.a}</p></div>
      </details>`
      )
      .join('')}
  </div>`;
}

export function zoSection() {
  return `<section class="section zo" aria-labelledby="zo">
    <div class="container zo__grid">
      <div class="zo__media">${img('zo-set', { alt: 'Produkter fra ZO Skin Health', sizes: '(min-width: 900px) 34vw, 80vw' })}</div>
      <div class="zo__body">
        <h2 class="h2" id="zo">ZO Skin Health</h2>
        <p class="lead">Medicinsk hudpleje udviklet af Dr. Zein Obagi. Vi bruger serien i klinikken og hjælper dig med at vælge de produkter, der passer til din hud.</p>
        <p>Produkterne forebygger og behandler bl.a. akne, hyperpigmentering og aldringstegn.</p>
        <div class="btn-row">
          ${btn('Se ZO-produkterne', site.zoUrl, { variant: 'primary', external: true })}
          ${btn('Kontakt os', url('kontakt/'), { variant: 'secondary' })}
        </div>
      </div>
    </div>
  </section>`;
}

/** Team: de to indehavere side om side, speciallægen som en bred række nedenunder */
export function teamSection({ withBio = false } = {}) {
  const [a, b, doc] = team;
  const owner = (m) => `<article class="owner" id="${m.img}">
      <div class="owner__media">${img(m.img, { alt: `Portræt af ${m.name}`, sizes: '(min-width: 900px) 40vw, 92vw' })}</div>
      <h3 class="h3">${m.name}</h3>
      <p class="role">${m.role}</p>
      ${(withBio ? m.bio : m.bio.slice(0, 1)).map((p) => `<p>${p}</p>`).join('')}
    </article>`;
  return `<div class="team">
    <div class="team__owners">${owner(a)}${owner(b)}</div>
    <article class="doctor" id="${doc.img}">
      <div class="doctor__media">${img(doc.img, { alt: `Portræt af ${doc.name}`, sizes: '200px' })}</div>
      <div>
        <h3 class="h3">${doc.name}</h3>
        <p class="role">${doc.role}</p>
        ${(withBio ? doc.bio : [doc.bio[0], doc.bio[2]]).map((p) => `<p>${p}</p>`).join('')}
      </div>
    </article>
  </div>`;
}

/**
 * Sidehoved. Med `bg` lægges et bredt foto bag teksten (tekst nederst til venstre over en blød overgang).
 * `pos` = vandret fokus på desktop, `posMobile` = på mobil, `mobileImg` = alternativt (portræt) billede på mobil.
 */
export function pageHero({ title, lead, actions = '', bg = '', alt = '', pos = '50%', posMobile = '50%', mobileImg = '', crumbs = '', large = false }) {
  if (!bg) {
    return `<section class="page-hero">
    ${crumbs}
    <div class="container page-hero__body">
      <h1 class="h1">${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
      ${actions ? `<div class="btn-row">${actions}</div>` : ''}
    </div>
  </section>`;
  }
  const mobile = mobileImg
    ? `<source media="(max-width: 699px)" srcset="${asset(`img/${mobileImg}-700.webp`)} 700w, ${asset(`img/${mobileImg}-1067.webp`)} 1067w" sizes="100vw">`
    : '';
  return `<section class="bg-hero${large ? ' bg-hero--lg' : ''}" style="--pos:${pos};--pos-m:${posMobile}" data-hero>
    <picture class="bg-hero__media">
      ${mobile}
      ${img(bg, { alt, sizes: '(max-width: 899px) 300vw, 100vw', eager: true })}
    </picture>
    <div class="bg-hero__content">
      ${crumbs}
      <div class="container bg-hero__body">
        <h1 class="h1">${title}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
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

export function visitSection() {
  return `<section class="section visit" aria-labelledby="find-os">
  <div class="container">
    ${sectionHead({ title: 'Find os i Hørup', id: 'find-os' })}
    <div class="visit__cols">
      <div>
        <h3 class="h4">${icon.pin}Adresse</h3>
        <p>${site.name}<br>${site.address.street}<br>${site.address.zip} ${site.address.city}</p>
        ${btn('Rutevejledning', site.mapsUrl, { variant: 'text', external: true })}
      </div>
      <div>
        <h3 class="h4">${icon.phone}Telefon og e-mail</h3>
        <p><a href="${site.phoneHref}">${site.phone}</a><br><a href="mailto:${site.email}">${site.email}</a></p>
        ${bookBtn('primary', 'btn--sm')}
      </div>
      <div>
        <h3 class="h4">${icon.clock}Åbningstider</h3>
        ${hoursList()}
      </div>
    </div>
  </div>
</section>`;
}

export { plain, kr, img, icon, stars, url, esc };
