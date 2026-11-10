import { site, rating, treatments, categories, results, steps, hours, reviews } from './data.mjs';
import {
  header, footer, trustBar, treatmentCard, priceCard, priceTable, resultsGrid, reviewsSection, stepsList, faqList,
  zoSection, ctaBand, teamGrid, pageHero, breadcrumbs, sectionHead, bookBtn, btn, eyebrow, hoursList, stpsBadge,
  bySlug, minPrice, NO_PRICE, baCard, bgHero,
} from './components.mjs';
import { url, asset, esc, kr, plain, img, icon, stars } from './helpers.mjs';

const ext = 'target="_blank" rel="noopener"';
const faqLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
const crumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: site.url + '/' + path })),
});
const heroBg = {
  injektion: { bg: 'bg-consult', alt: 'Ditte vejleder en kunde før behandling', posMobile: '84%' },
  hud: { bg: 'bg-skin', alt: 'Ansigtsbehandling i klinikken', posMobile: '42%' },
  krop: { bg: 'bg-shelf-2', alt: 'Detalje fra klinikken', posMobile: '45%' },
};

/* ---------------------------------------------------------------- Layout */

function jsonLd() {
  const dows = { 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Friday' };
  const spec = hours
    .filter((h) => typeof h.dow === 'number')
    .map((h) => {
      const [o, c] = h.time.split('-').map((s) => s.trim().replace('.', ':'));
      return { '@type': 'OpeningHoursSpecification', dayOfWeek: dows[h.dow], opens: o, closes: c };
    });
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: site.name,
    description: 'Kosmetisk speciallægeklinik i Hørup på Sydals nær Sønderborg.',
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: site.url + '/assets/img/og-clinic360.jpg',
    logo: site.url + '/assets/img/logo-dark.png',
    areaServed: ['Sønderborg', 'Als', 'Sydals'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: 'DK',
    },
    openingHoursSpecification: spec,
    sameAs: [site.facebook, site.instagram],
  });
}

export function layout({ path, title, description, active = '', body, ogImage = 'og-clinic360.jpg', noindex = false, ld = [] }) {
  const canonical = site.url + '/' + path;
  const fullTitle = title;
  const preview = process.env.PREVIEW === '1';
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
${noindex || preview ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
<meta name="theme-color" content="#F7F4F1">
<meta property="og:type" content="website">
<meta property="og:locale" content="da_DK">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/assets/img/${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Mette og Ditte i Clinic 360">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${asset('img/favicon-32.png')}" type="image/png" sizes="32x32">
<link rel="icon" href="${asset('img/favicon.png')}" type="image/png" sizes="256x256">
<link rel="apple-touch-icon" href="${asset('img/apple-touch-icon.png')}">
<link rel="manifest" href="${url('site.webmanifest')}">
<link rel="preload" href="${asset('fonts/hanken-grotesk-var.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${asset('fonts/instrument-serif.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset('css/style.css')}">
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">${jsonLd()}</script>
${ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join('\n')}
</head>
<body>
${header(active)}
<main id="indhold">
${body}
</main>
${footer()}
<script src="${asset('js/main.js')}" defer></script>
</body>
</html>`;
}

/* ---------------------------------------------------------------- Forside */

function home() {
  const featured = ['botox', 'kosmetisk-filler', 'skinbooster', 'hydrafacial', 'pfr-hud', 'kemisk-peeling'].map((s) => bySlug[s]);
  const featuredResults = ['ba-ansigt-3', 'ba-laeber-1', 'ba-pande-4', 'ba-laeber-2'].map((id) => results.find((r) => r.id === id));
  const body = `
${bgHero({
  eyebrow: 'Kosmetisk speciallægeklinik · Sydals',
  title: 'Naturlig skønhed, med respekt for <em>hudens aldring</em>',
  lead: 'Kosmetiske behandlinger udført af erfarne specialsygeplejersker med tilknyttet speciallæge. I Hørup på Als, tæt på Sønderborg.',
  actions: bookBtn('primary', 'Book tid') + btn('Se behandlinger & priser', url('priser/'), { variant: 'outline' }),
  extra: `<ul class="hero__points"><li>${icon.check} Gratis og uforpligtende forundersøgelse</li><li>${icon.check} 10 % rabat på din første behandling</li></ul>`,
  bg: 'bg-team',
  alt: 'Ditte og Mette, indehavere af Clinic 360, i klinikken',
  mobileImg: 'team-hero-portrait',
  large: true,
})}

${trustBar()}

<section class="section intro">
  <div class="container intro__grid">
    <div class="intro__media">
      ${img('team-standing', { alt: 'Ditte og Mette, indehavere af Clinic 360, i klinikken', sizes: '(min-width: 900px) 28vw, 60vw', cls: 'intro__img1' })}
      ${img('team-sofa', { alt: 'Forundersøgelse i klinikkens lounge', sizes: '(min-width: 900px) 24vw, 50vw', cls: 'intro__img2' })}
    </div>
    <div class="intro__body">
      ${eyebrow('Velkommen til Clinic 360')}
      <h2 class="h2">Din tryghed kommer <em>før</em> resultatet</h2>
      <p class="lead">Vores mål er et resultat, der fremhæver din naturlige skønhed på en æstetisk og harmonisk måde.</p>
      <p>Vi starter altid med en grundig og gratis forundersøgelse, så vi forstår dine ønsker og forventninger. Først derefter skræddersyr vi det behandlingsforløb, der passer til dig. Er en behandling ikke det rigtige for dig, siger vi det.</p>
      <p>Som kosmetisk speciallægeklinik er vi registreret hos Styrelsen for Patientsikkerhed, og vi går aldrig på kompromis med kvalitet og sikkerhed.</p>
      <a class="link" href="${url('om-os/')}">Mød os bag klinikken ${icon.arrow}</a>
    </div>
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: 'Behandlinger', title: 'Udvalgte behandlinger', lead: 'Fra blød rynkebehandling til medicinsk hudpleje. Alle priser står tydeligt.', action: btn(`Se alle ${treatments.length} behandlinger`, url('behandlinger/'), { variant: 'outline', icon: icon.arrow }) })}
    <div class="t-grid t-grid--home">${featured.map((t) => treatmentCard(t)).join('')}${treatments
      .filter((t) => !featured.includes(t))
      .map((t) => treatmentCard(t, { extra: true }))
      .join('')}</div>
    <div class="btn-row mobile-only">${btn('Se alle priser', url('priser/'), { variant: 'outline' })}</div>
  </div>
</section>

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'Før & efter', title: 'Resultater, der stadig ligner <em>dig</em>', lead: 'Træk i billederne for at sammenligne. Alle billeder er af vores egne kunder.', action: btn('Se alle resultater', url('foer-efter/'), { variant: 'outline', icon: icon.arrow }) })}
    ${resultsGrid(featuredResults, { filters: false, id: 'udvalgte-resultater' })}
  </div>
</section>

${reviewsSection()}

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'Sådan foregår det', title: 'Et trygt forløb fra første samtale', align: 'center' })}
    ${stepsList(steps, 'steps--3')}
  </div>
</section>

<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: 'Teamet', title: 'Autoriseret sundhedspersonale', lead: 'To kosmetiske specialsygeplejersker med baggrund fra Sønderborg Sygehus og en speciallæge med mange års erfaring i dermatologi.', action: btn('Læs mere om os', url('om-os/'), { variant: 'outline', icon: icon.arrow }) })}
    ${teamGrid()}
  </div>
</section>

${zoSection()}
${ctaBand()}
${visitSection()}
`;
  return layout({
    path: '',
    title: 'Clinic 360 | Kosmetisk klinik på Als ved Sønderborg',
    description: 'Kosmetisk speciallægeklinik i Hørup på Als ved Sønderborg. Botox, filler, skinbooster, HydraFacial og PRF. Gratis forundersøgelse og 10 % rabat.',
    body,
  });
}

function visitSection() {
  return `<section class="section visit" aria-labelledby="besoeg-titel">
  <div class="container visit__grid">
    <div>
      ${eyebrow('Besøg klinikken')}
      <h2 class="h2" id="besoeg-titel">Find os i Hørup på Sydals</h2>
      <ul class="contact-list">
        <li><span class="contact-list__icon">${icon.pin}</span><span><strong>Adresse</strong><a href="${site.mapsUrl}" ${ext}>${site.address.street}, ${site.address.zip} ${site.address.city}</a></span></li>
        <li><span class="contact-list__icon">${icon.phone}</span><span><strong>Telefon</strong><a href="${site.phoneHref}">${site.phone}</a></span></li>
        <li><span class="contact-list__icon">${icon.mail}</span><span><strong>E-mail</strong><a href="mailto:${site.email}">${site.email}</a></span></li>
      </ul>
      <div class="btn-row">
        ${bookBtn('primary', 'Book tid')}
        ${btn('Rutevejledning', site.mapsUrl, { variant: 'outline', external: true, icon: icon.external })}
      </div>
    </div>
    <div class="visit__hours">
      <h3 class="h3">${icon.clock} Åbningstider</h3>
      ${hoursList()}
    </div>
  </div>
</section>`;
}

/* ---------------------------------------------------------------- Behandlinger */

function treatmentsIndex() {
  const body = `
${pageHero({
  eyebrow: 'Behandlinger',
  bg: 'bg-skin', alt: 'Ansigtsbehandling i klinikken', posMobile: '42%',
  title: 'Find den behandling, der <em>passer til dig</em>',
  lead: 'Alle behandlinger udføres af autoriseret sundhedspersonale og starter med en gratis forundersøgelse.',
  actions: bookBtn('primary', 'Book forundersøgelse') + btn('Se prisliste', url('priser/'), { variant: 'outline' }),
})}
${categories
  .map(
    (c) => `<section class="section section--tight">
  <div class="container">
    ${sectionHead({ title: c.name })}
    <div class="t-grid">${treatments.filter((t) => t.category === c.id).map((t) => treatmentCard(t)).join('')}</div>
  </div>
</section>`
  )
  .join('')}
${ctaBand()}
`;
  return layout({
    path: 'behandlinger/',
    title: 'Kosmetiske behandlinger på Als | Clinic 360',
    active: 'behandlinger',
    description: 'Se alle behandlinger hos Clinic 360: botox, filler, skinbooster, Profhilo, PRF, kemisk peeling, Skinpen, HydraFacial og fedtfrysning.',
    body,
  });
}

function treatmentPage(t) {
  const tResults = results.filter((r) => t.results.includes(r.tag));
  const related = t.related.map((s) => bySlug[s]);
  const body = `
${bgHero({
  eyebrow: t.name,
  title: t.headline,
  lead: t.lead,
  extra: `<div class="t-hero__price">${minPrice(t) === null ? `<span>${NO_PRICE}</span>` : `<span>Pris fra</span><strong>${kr(minPrice(t))}</strong>`}<a class="link" href="#priser">Se ${t.prices.length ? 'alle priser' : 'mere'} ${icon.arrow}</a></div>`,
  actions: bookBtn('primary', 'Book tid') + btn('Gratis forundersøgelse', url('kontakt/'), { variant: 'outline' }),
  crumbs: breadcrumbs([{ href: 'behandlinger/', label: 'Behandlinger' }, { label: t.name }]),
  ...heroBg[t.category],
})}

<section class="facts-wrap">
  <div class="container">
    <dl class="facts">
      ${t.facts.map(([k, v]) => `<div class="facts__item"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
    </dl>
  </div>
</section>

<section class="section">
  <div class="container article">
    <div class="article__main prose">
      ${t.body.map((b) => `<h2 class="h3">${b.h}</h2>${b.p.map((p) => `<p>${p}</p>`).join('')}`).join('')}
    </div>
    <aside class="article__aside">
      <div class="aside-card">
        <h2 class="h4">Velegnet til</h2>
        <ul class="checklist">${t.suited.map((s) => `<li>${icon.check}<span>${s}</span></li>`).join('')}</ul>
      </div>
      ${
        t.contraindications
          ? `<div class="aside-card aside-card--muted">
        <h2 class="h4">Du kan ikke behandles, hvis du</h2>
        <ul class="dotlist">${t.contraindications.map((s) => `<li>${s}</li>`).join('')}</ul>
      </div>`
          : ''
      }
    </aside>
  </div>
</section>

${
  t.steps.length
    ? `<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: 'Behandlingsforløb', title: `Sådan foregår ${t.name.toLowerCase().startsWith('prf') ? 'en PRF-behandling' : 'behandlingen'}` })}
    ${stepsList(t.steps, `steps--${Math.min(t.steps.length, 4)}`)}
  </div>
</section>`
    : ''
}

<section class="section" id="priser">
  <div class="container price-detail">
    <div>
      ${eyebrow('Priser')}
      <h2 class="h2">Priser for ${t.name}</h2>
      <p class="lead">Som ny kunde får du <strong>${t.discount} % rabat</strong> på din første behandling. Forundersøgelsen er altid gratis.</p>
      <div class="btn-row">${bookBtn('primary', 'Book tid')}${btn('Se alle priser', url('priser/'), { variant: 'outline' })}</div>
      <p class="price-detail__call">Spørgsmål om prisen? Ring på <a href="${site.phoneHref}">${site.phone}</a>.</p>
    </div>
    <div class="price-detail__table">${priceTable(t)}${(() => {
      const r = reviews.find((x) => x.slug === t.slug);
      return r ? `<figure class="price-quote">${stars(5, 'tp-stars--sm')}<blockquote><p>“${r.text}”</p></blockquote><figcaption><strong>${r.name}</strong> på Trustpilot, ${r.date}</figcaption></figure>` : '';
    })()}</div>
  </div>
</section>

${
  tResults.length
    ? `<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: 'Før & efter', title: `Resultater med ${t.name.toLowerCase()}`, lead: 'Træk i billederne for at sammenligne.', action: btn('Se alle resultater', url('foer-efter/'), { variant: 'outline', icon: icon.arrow }) })}
    ${resultsGrid(tResults.slice(0, 4), { filters: false, id: 'resultater-' + t.slug })}
  </div>
</section>`
    : ''
}

${
  t.faq
    ? `<section class="section">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Spørgsmål og svar', title: 'Ofte stillede spørgsmål', align: 'center' })}
    ${faqList(t.faq)}
  </div>
</section>`
    : ''
}

${reviewsSection({ title: 'Trygge kunder, naturlige resultater', compact: true })}

<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'Måske også interessant', title: 'Relaterede behandlinger' })}
    <div class="t-grid">${related.map((r) => treatmentCard(r)).join('')}</div>
  </div>
</section>
${ctaBand()}
`;
  return layout({
    path: t.slug + '/',
    title: `${t.name} på Als ved Sønderborg | Clinic 360`,
    active: 'behandlinger',
    description: `${t.short} ${minPrice(t) === null ? NO_PRICE : 'Pris fra ' + kr(minPrice(t))}. Gratis forundersøgelse hos Clinic 360 på Als ved Sønderborg.`,
    ld: [crumbLd([['Forside', ''], ['Behandlinger', 'behandlinger/'], [t.name, t.slug + '/']]), ...(t.faq ? [faqLd(t.faq)] : [])],
    body,
  });
}

/* ---------------------------------------------------------------- Priser */

function prices() {
  const priceFaq = [
    { q: 'Er forundersøgelsen gratis?', a: 'Ja. Vi tilbyder altid en gratis og uforpligtende forundersøgelse, hvor vi gennemgår dine ønsker og forventninger.' },
    { q: 'Hvordan får jeg velkomstrabatten?', a: 'Som ny kunde får du 10 % rabat på din første behandling hos os. På fedtfrysning er velkomstrabatten 20 %.' },
    { q: 'Hvorfor skal jeg vente 48 timer?', a: 'Ved injektionsbehandlinger som botox, filler, skinbooster og Profhilo kræver lovgivningen 48 timers betænkningstid mellem forundersøgelse og behandling. Du kan sagtens booke behandlingen med det samme.' },
    { q: 'Skal jeg til læge før botox?', a: 'Ja. Botox er et lægemiddel, så vores speciallæge foretager en lovpligtig forkonsultation online. Den er kun nødvendig første gang.' },
  ];
  const body = `
${pageHero({
  eyebrow: 'Priser',
  bg: 'bg-shelf', alt: 'Hylde med kurve og planter i klinikken', posMobile: '70%',
  title: 'Klare priser på <em>alle</em> behandlinger',
  lead: 'Find din behandling herunder, eller hop direkte til den i menuen. Alle priser er i danske kroner.',
  actions: bookBtn('primary', 'Book tid') + btn('Ring ' + site.phone, site.phoneHref, { variant: 'outline' }),
})}

<section class="perks">
  <div class="container perks__grid">
    <div class="perk"><span class="perk__icon">${icon.chat}</span><div><h2 class="h4">Gratis forundersøgelse</h2><p>Altid uforpligtende, så du kan træffe et trygt valg.</p></div></div>
    <div class="perk"><span class="perk__icon">${icon.gift}</span><div><h2 class="h4">Velkomstrabat</h2><p>10 % på din første behandling, 20 % på fedtfrysning.</p></div></div>
    <div class="perk"><span class="perk__icon">${icon.clock}</span><div><h2 class="h4">48 timers betænkningstid</h2><p>Ved injektionsbehandlinger, som loven kræver.</p></div></div>
  </div>
</section>

<div class="price-nav" data-price-nav>
  <div class="container">
    <ul class="price-nav__list" aria-label="Spring til behandling">
      ${treatments.map((t) => `<li><a href="#pris-${t.slug}" data-spy-link="pris-${t.slug}">${t.name}</a></li>`).join('')}
    </ul>
  </div>
</div>

${categories
  .map(
    (c) => `<section class="section section--tight price-section" aria-labelledby="kat-${c.id}">
  <div class="container">
    <h2 class="price-section__title" id="kat-${c.id}">${c.name}</h2>
    <div class="price-grid">${treatments.filter((t) => t.category === c.id).map(priceCard).join('')}</div>
  </div>
</section>`
  )
  .join('')}

<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: 'Før & efter', title: 'Se resultaterne, før du vælger', lead: 'Træk i billederne for at sammenligne.', action: btn('Alle før & efter-billeder', url('foer-efter/'), { variant: 'outline', icon: icon.arrow }) })}
    ${resultsGrid(['ba-ansigt-7', 'ba-laeber-2', 'ba-pande-4', 'ba-laeber-1'].map((id) => results.find((r) => r.id === id)), { filters: false, id: 'pris-resultater' })}
  </div>
</section>

${zoSection()}

<section class="section">
  <div class="container narrow">
    ${sectionHead({ eyebrow: 'Godt at vide', title: 'Spørgsmål om priser og forløb', align: 'center' })}
    ${faqList(priceFaq)}
  </div>
</section>
${reviewsSection({ compact: true })}
`;
  return layout({
    path: 'priser/',
    title: 'Priser på kosmetiske behandlinger | Clinic 360',
    active: 'priser',
    description: 'Se priser på botox, filler, skinbooster, Profhilo, PRF, peeling, Skinpen, HydraFacial, fedtfrysning og laser. Gratis forundersøgelse og 10 % velkomstrabat.',
    ld: [faqLd(priceFaq)],
    body,
  });
}

/* ---------------------------------------------------------------- Før & efter */

function beforeAfter() {
  const body = `
${pageHero({
  eyebrow: 'Før & efter',
  bg: 'bg-shelf-2', alt: 'Hylde med kurve og planter i klinikken', posMobile: '45%',
  title: 'Naturlige resultater fra <em>vores egne</em> kunder',
  lead: 'Træk i billederne for at se forskellen. Filtrér efter behandling for at finde det, du er interesseret i.',
  actions: bookBtn('primary', 'Book forundersøgelse') + btn('Se priser', url('priser/'), { variant: 'outline' }),
})}
<section class="section section--tight">
  <div class="container">${resultsGrid(results)}</div>
</section>
${reviewsSection({ compact: true })}
${ctaBand()}
`;
  return layout({
    path: 'foer-efter/',
    title: 'Før og efter-billeder | Clinic 360',
    active: 'foer-efter',
    description: 'Se før og efter-billeder af botox og filler hos Clinic 360 i Hørup nær Sønderborg. Naturlige resultater fra vores egne kunder.',
    body,
  });
}

/* ---------------------------------------------------------------- Om os */

function about() {
  const values = [
    { i: icon.shield, t: 'Sikkerhed først', d: 'Registreret hos Styrelsen for Patientsikkerhed. Alle behandlinger udføres af autoriseret sundhedspersonale.' },
    { i: icon.heart, t: 'Naturlige resultater', d: 'Vi forfiner dit udseende uden at ændre det, med stor respekt for den naturlige aldring.' },
    { i: icon.chat, t: 'Ærlig vejledning', d: 'God tid, grundig information og en ærlig vurdering. Også når svaret er, at du ikke har brug for en behandling.' },
  ];
  const body = `
${pageHero({
  eyebrow: 'Om Clinic 360',
  title: 'Sygeplejersker med <em>hjerte</em> for detaljen',
  lead: 'Clinic 360 drives af Mette Appel og Ditte B. R. Thordsen, begge kosmetiske specialsygeplejersker med klinisk baggrund fra Sønderborg Sygehus, og med tilknyttet speciallæge.',
  actions: bookBtn('primary', 'Book tid'),
  bg: 'bg-team-wall', posMobile: '78%',
  alt: 'Mette og Ditte foran Clinic 360-skiltet',
})}
<section class="section section--tight">
  <div class="container values">
    ${values.map((v) => `<div class="value"><span class="value__icon">${v.i}</span><h2 class="h4">${v.t}</h2><p>${v.d}</p></div>`).join('')}
  </div>
</section>
<section class="section section--tint">
  <div class="container">
    ${sectionHead({ eyebrow: 'Teamet', title: 'Mød os' })}
    ${teamGrid({ withBio: true })}
  </div>
</section>
<section class="section">
  <div class="container">
    ${sectionHead({ eyebrow: 'Klinikken', title: 'Rolige rammer i Hørup', lead: 'En lys og diskret klinik, hvor der er tid til dig.' })}
    <div class="gallery">
      ${img('interior-lounge', { alt: 'Klinikkens lounge', sizes: '(min-width: 900px) 25vw, 50vw' })}
      ${img('t-skinpen-2', { alt: 'Behandling i klinikken', sizes: '(min-width: 900px) 40vw, 100vw' })}
      ${img('interior-anatomy', { alt: 'Detalje fra klinikken', sizes: '(min-width: 900px) 25vw, 50vw' })}
      ${img('tray', { alt: 'Forfriskninger i klinikken', sizes: '(min-width: 900px) 25vw, 50vw' })}
      ${img('t-hydrafacial-2', { alt: 'Ansigtsbehandling', sizes: '(min-width: 900px) 25vw, 50vw' })}
    </div>
  </div>
</section>
${reviewsSection()}
${ctaBand()}
`;
  return layout({
    path: 'om-os/',
    title: 'Om os: sygeplejersker og speciallæge | Clinic 360',
    active: 'om-os',
    description: 'Mød Mette Appel og Ditte B. R. Thordsen, kosmetiske specialsygeplejersker, og speciallæge Kristian hos Clinic 360 i Hørup nær Sønderborg.',
    body,
  });
}

/* ---------------------------------------------------------------- Kontakt */

function contact() {
  const body = `
${pageHero({
  eyebrow: 'Kontakt',
  bg: 'bg-talk', alt: 'Samtale i klinikken', posMobile: '80%',
  title: 'Ring, skriv eller <em>kig forbi</em>',
  lead: 'Har du spørgsmål, eller vil du booke en uforpligtende konsultation? Vi vender tilbage hurtigst muligt.',
})}
<section class="section section--tight">
  <div class="container contact">
    <div class="contact__info">
      <ul class="contact-list">
        <li><span class="contact-list__icon">${icon.phone}</span><span><strong>Telefon</strong><a href="${site.phoneHref}">${site.phone}</a></span></li>
        <li><span class="contact-list__icon">${icon.mail}</span><span><strong>E-mail</strong><a href="mailto:${site.email}">${site.email}</a></span></li>
        <li><span class="contact-list__icon">${icon.pin}</span><span><strong>Adresse</strong><a href="${site.mapsUrl}" ${ext}>${site.name}, ${site.address.street}<br>${site.address.zip} ${site.address.city}</a></span></li>
      </ul>
      <div class="aside-card">
        <h2 class="h4">${icon.clock} Åbningstider</h2>
        ${hoursList()}
      </div>
      ${stpsBadge()}
    </div>
    <form class="form" data-contact-form data-endpoint="${esc(site.formEndpoint)}" data-email="${site.email}" novalidate>
      <h2 class="h3">Hvad kan vi hjælpe med?</h2>
      <div class="form__row">
        <label class="field"><span>Navn *</span><input name="navn" autocomplete="name" required></label>
        <label class="field" data-either><span>Telefon</span><input name="telefon" type="tel" autocomplete="tel" inputmode="tel"></label>
      </div>
      <label class="field" data-either><span>E-mail</span><input name="email" type="email" autocomplete="email"></label>
      <p class="form__hint">Udfyld telefon eller e-mail, så vi kan svare dig.</p>
      <fieldset class="field">
        <legend>Min henvendelse drejer sig om</legend>
        <div class="pill-options">
          ${['Forundersøgelse', ...treatments.map((t) => t.name), 'ZO Skin Health', 'Andet']
            .map((n) => `<label class="pill-option"><input type="checkbox" name="emne" value="${esc(n)}"><span>${n}</span></label>`)
            .join('')}
        </div>
      </fieldset>
      <div class="hp" aria-hidden="true"><label>Lad dette felt være tomt <input name="_gotcha" tabindex="-1" autocomplete="off"></label></div>
      <label class="field"><span>Besked</span><textarea name="besked" rows="5"></textarea></label>
      <label class="consent"><input type="checkbox" name="samtykke" required><span>Jeg accepterer, at Clinic 360 behandler mine oplysninger for at besvare min henvendelse. Læs vores <a href="${url('cookie-og-privatlivspolitik/')}">privatlivspolitik</a>.</span></label>
      <p class="form__hint">Undlad at skrive helbredsoplysninger i formularen. Dem tager vi ved forundersøgelsen.</p>
      <button class="btn btn--primary" type="submit">Send besked ${icon.arrow}</button>
      <p class="form__status" id="form-status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
${visitSection()}
`;
  return layout({
    path: 'kontakt/',
    title: 'Kontakt og åbningstider | Clinic 360',
    active: 'kontakt',
    description: `Kontakt Clinic 360 på ${site.phone} eller ${site.email}. Kallehave 24, 6470 Sydals. Se åbningstider og book en gratis forundersøgelse.`,
    body,
  });
}

/* ---------------------------------------------------------------- Privatliv */

function privacy() {
  const body = `
${pageHero({ eyebrow: 'Juridisk', title: 'Cookie- og privatlivspolitik' })}
<section class="section section--tight">
  <div class="container narrow prose">
    <h2 class="h3">Cookies på clinic360.dk</h2>
    <p>En cookie er en lille datafil, der gemmes på din enhed, når du besøger en hjemmeside. En cookie er ikke et program og kan ikke indeholde virus.</p>
    <p>Denne hjemmeside sætter ingen cookies til statistik eller markedsføring. Skrifttyper og billeder hentes fra vores egen server. Når du booker tid, sendes du videre til vores bookingsystem hos Planway, som har sin egen cookie- og privatlivspolitik. Det samme gælder, hvis du følger links til Trustpilot, Facebook, Instagram eller ZO Skin Health.</p>
    <p>Du kan altid slette cookies i din browser. Vejledning finder du på <a href="https://minecookies.org/cookiehandtering" ${ext}>minecookies.org</a>.</p>

    <h2 class="h3">Privatlivspolitik</h2>
    <p>Beskyttelse af dine personoplysninger er afgørende for os. Her beskriver vi, hvordan vi indsamler, bruger, opbevarer og beskytter oplysninger om vores kunder og besøgende.</p>
    <h3 class="h4">Dataansvarlig</h3>
    <p>${site.legalName}<br>${site.address.street}, ${site.address.zip} ${site.address.city}<br>CVR: ${site.cvr}<br>Telefon: <a href="${site.phoneHref}">${site.phone}</a><br>E-mail: <a href="mailto:${site.email}">${site.email}</a></p>
    <h3 class="h4">Hvornår indsamler vi oplysninger?</h3>
    <ul><li>Når du kontakter os via formular, telefon eller e-mail</li><li>Når du booker en tid</li><li>Når du køber produkter</li><li>Når du tilmelder dig vores nyhedsbrev</li></ul>
    <h3 class="h4">Hvilke oplysninger?</h3>
    <ul><li>Navn, adresse, e-mail og telefonnummer</li><li>Helbredsoplysninger, der er relevante for de behandlinger, du ønsker</li><li>Betalings- og transaktionsoplysninger</li></ul>
    <h3 class="h4">Formål</h3>
    <ul><li>At administrere bookinger og udføre kosmetiske behandlinger</li><li>At forbedre vores ydelser og hjemmeside</li><li>At kommunikere med dig og informere om nye behandlinger og tilbud</li><li>At overholde gældende lovgivning</li></ul>
    <h3 class="h4">Opbevaring og sikkerhed</h3>
    <p>Vi opbevarer dine oplysninger, så længe det er nødvendigt for formålet, eller så længe loven kræver det. Vi bruger de nødvendige tekniske og organisatoriske foranstaltninger for at beskytte dine data mod uautoriseret adgang, tab, ændring eller ødelæggelse.</p>
    <h3 class="h4">Dine rettigheder</h3>
    <ul><li>Adgang til, rettelse eller sletning af dine oplysninger</li><li>Indsigelse mod behandlingen</li><li>Begrænsning af behandlingen</li><li>Dataportabilitet: at modtage dine oplysninger i et struktureret, maskinlæsbart format</li></ul>
    <p>Du kan klage over vores behandling af dine oplysninger til <a href="https://www.datatilsynet.dk" ${ext}>Datatilsynet</a>.</p>
    <h3 class="h4">Ændringer</h3>
    <p>Vi kan lejlighedsvis opdatere denne politik. Den seneste version findes altid her på siden.</p>
  </div>
</section>
`;
  return layout({
    path: 'cookie-og-privatlivspolitik/',
    title: 'Cookie- og privatlivspolitik | Clinic 360',
    description: 'Læs hvordan Clinic 360 bruger cookies og behandler dine personoplysninger.',
    body,
  });
}

/* ---------------------------------------------------------------- Handelsbetingelser */

// Klinikkens tekst fra den gamle clinic360.dk/handelsbetingelser/ (juni 2025). Det, vi har ændret, pakkes i rev():
// i preview-bygget markeres det med gult, så klinikken kan godkende det. På den rigtige side vises teksten normalt.
const rev = (html) => (process.env.PREVIEW === '1' ? `<ins class="review">${html}</ins>` : html);

function terms() {
  const preview = process.env.PREVIEW === '1';
  const body = `
${pageHero({ eyebrow: 'Juridisk', title: 'Handelsbetingelser' })}
<section class="section section--tight">
  <div class="container narrow prose">
    ${preview ? '<p class="review-note"><strong>Til godkendelse:</strong> Tekst markeret med gult er ændret i forhold til handelsbetingelserne på den nuværende clinic360.dk, fordi hjemmesiden ikke længere tager imod betaling. Markeringen vises kun på denne forhåndsvisning.</p>' : ''}
    <p>${rev(`Handelsbetingelserne gælder for ydelser og produkter fra ${site.legalName}, ${site.address.street}, ${site.address.zip} ${site.address.city}, CVR ${site.cvr}.`)}</p>
    <h2 class="h3">Aftaleindgåelse</h2>
    <p>Ved booking af en behandling eller tilmelding til en abonnementsløsning hos Clinic360.dk accepterer du samtidig vores gældende handelsbetingelser.</p>
    <p>Alle priser er angivet i danske kroner og inkluderer moms.</p>
    <h2 class="h3">Betaling</h2>
    <p>${rev('Betaling sker i klinikken eller via vores bookingsystem.')}</p>
    <p>Vi accepterer følgende betalingsmetoder: Visa, Mastercard og MobilePay.</p>
    <p>Beløbet trækkes først ved bekræftelse af din booking eller ved påbegyndelse af abonnementet.</p>
    <p>Ved abonnementer sker betalingen automatisk i den valgte abonnementsperiode.</p>
    <p>Du modtager altid en kvittering via e-mail.</p>
    <h2 class="h3">Abonnementer</h2>
    <p>Ved tilmelding til et abonnement accepterer du løbende betaling, som sker automatisk via det valgte betalingskort.</p>
    <p>Du kan til enhver tid opsige dit abonnement med den opsigelsesfrist, der er angivet ved tilmelding.</p>
    <p>Opsigelsen træder i kraft ved udgangen af den aktuelle abonnementsperiode.</p>
    <p>Det er dit ansvar at sikre, at dine betalingsoplysninger er opdaterede.</p>
    <p>Ved manglende betaling forbeholder Clinic360.dk sig retten til at suspendere dine bookinger eller adgang til behandlinger, indtil betalingen er gennemført.</p>
    <p>Vi tilbyder forskellige abonnementstyper, som varierer i antal inkluderede behandlinger og pris. Eventuelle bindingsperioder vil fremgå tydeligt ved tilmelding.</p>
    <p>Efter bindingsperiodens udløb fortsætter abonnementet som en løbende måned-til-måned ordning, med mulighed for opsigelse i henhold til gældende vilkår.</p>
    <h2 class="h3">Booking og afbud</h2>
    <p>Behandlinger skal bookes online via vores <a href="${site.bookingUrl}" ${ext}>bookingsystem</a>.</p>
    <p>Ved udeblivelse eller afbud mindre end 24 timer før aftalen forbeholder vi os retten til at opkræve det fulde beløb.</p>
    <p>For behandlinger, der er inkluderet i et abonnement, gælder samme afbudsregler.</p>
    <p>${rev('Manglende')} fremmøde vil betragtes som en benyttet behandling.</p>
    <h2 class="h3">Fortrydelsesret</h2>
    <p>Ved køb af fysiske produkter i klinikken gælder 14 dages fortrydelsesret fra modtagelsesdato.</p>
    <p>Behandlinger og abonnementsløsninger er undtaget fortrydelsesret, da de anses som personlige ydelser og/eller tages i brug ved første booking.</p>
    <p>Opsigelse af abonnementer kan ske ${rev('ved at kontakte os direkte')}.</p>
    <p>Du er altid velkommen til at kontakte os med spørgsmål vedrørende din booking, abonnement eller betaling. Skriv til <a href="mailto:${site.email}">${site.email}</a>${rev(` eller ring på <a href="${site.phoneHref}">${site.phone}</a>`)}.</p>
    <h2 class="h3">Ansvar og forbehold</h2>
    <p>Vi tager forbehold for tastefejl, prisjusteringer og tekniske problemer på hjemmesiden.</p>
    <p>Clinic360.dk kan ikke drages til ansvar for indirekte tab som følge af brug af vores tjenester.</p>
    <h2 class="h3">Persondata</h2>
    <p>Dine personlige oplysninger behandles i overensstemmelse med gældende databeskyttelseslovgivning.${rev(` Læs mere i vores <a href="${url('cookie-og-privatlivspolitik/')}">privatlivspolitik</a>.`)}</p>
    <p>Vi videregiver aldrig dine oplysninger uden samtykke og gemmer kun data, der er nødvendige for at opretholde vores aftale med dig.</p>
    <h2 class="h3">Klageadgang</h2>
    <p>Hvis du ønsker at klage over en behandling eller et forløb, bedes du kontakte os via ovenstående kontaktoplysninger.</p>
    <p>Hvis vi ikke når til en tilfredsstillende løsning, kan du kontakte:</p>
    <p>Center for Klageløsning<br>Nævnenes Hus, Toldboden 2, 8800 Viborg<br><a href="https://www.naevneneshus.dk" ${ext}>www.naevneneshus.dk</a></p>
    <h2 class="h3">Ændringer i handelsbetingelser</h2>
    <p>Clinic360.dk forbeholder sig retten til at ændre handelsbetingelserne.</p>
    <p>Ændringer træder i kraft, når de er offentliggjort på hjemmesiden.</p>
  </div>
</section>
`;
  return layout({
    path: 'handelsbetingelser/',
    title: 'Handelsbetingelser | Clinic 360',
    description: 'Handelsbetingelser for booking, betaling, afbud, abonnementer og klageadgang hos Clinic 360 på Als.',
    body,
  });
}

function notFound() {
  const body = `
${pageHero({
  eyebrow: '404',
  title: 'Siden findes <em>ikke</em>',
  lead: 'Siden er måske flyttet. Prøv en af genvejene herunder.',
  actions: btn('Til forsiden', url(), { variant: 'primary' }) + btn('Se behandlinger', url('behandlinger/'), { variant: 'outline' }) + btn('Priser', url('priser/'), { variant: 'outline' }),
})}`;
  return layout({ path: '404.html', title: 'Siden findes ikke | Clinic 360', description: 'Siden blev ikke fundet. Se behandlinger, priser eller kontakt Clinic 360.', body, noindex: true });
}

export function allPages() {
  return [
    ['index.html', home()],
    ['behandlinger/index.html', treatmentsIndex()],
    ...treatments.map((t) => [`${t.slug}/index.html`, treatmentPage(t)]),
    ['priser/index.html', prices()],
    ['foer-efter/index.html', beforeAfter()],
    ['om-os/index.html', about()],
    ['kontakt/index.html', contact()],
    ['cookie-og-privatlivspolitik/index.html', privacy()],
    ['handelsbetingelser/index.html', terms()],
    ['404.html', notFound()],
  ];
}
