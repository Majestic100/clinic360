import { site, treatments, categories, results, steps, hours } from './data.mjs';
import {
  header, footer, trustStrip, priceIndex, priceBlock, priceTable, resultsGrid, resultsFeature, reviewsSection, stepsRows,
  faqList, zoSection, teamSection, pageHero, breadcrumbs, sectionHead, bookBtn, pricesBtn, btn, hoursList, stpsBadge,
  visitSection, bySlug, minPrice, baCard,
} from './components.mjs';
import { url, asset, esc, kr, plain, img, icon } from './helpers.mjs';

const ext = 'target="_blank" rel="noopener"';
const heroBg = {
  injektion: { bg: 'bg-consult', alt: 'Ditte vejleder en kunde før behandling', pos: '50%', posMobile: '22%' },
  hud: { bg: 'bg-skin', alt: 'Ansigtsbehandling i klinikken', pos: '50%', posMobile: '42%' },
  krop: { bg: 'bg-shelf-2', alt: 'Detalje fra klinikken', pos: '50%', posMobile: '45%' },
};
const pick = (ids) => ids.map((id) => results.find((r) => r.id === id));

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
    image: site.url + '/assets/img/team-hero-1080.webp',
    address: { '@type': 'PostalAddress', streetAddress: site.address.street, postalCode: site.address.zip, addressLocality: site.address.city, addressCountry: 'DK' },
    openingHoursSpecification: spec,
    sameAs: [site.facebook, site.instagram],
  });
}

export function layout({ path, title, description, active = '', body, ogImage = 'team-hero-1080.webp' }) {
  const canonical = site.url + '/' + path;
  const fullTitle = path === '' ? `${site.name}, kosmetisk speciallægeklinik ved Sønderborg` : `${title} | ${site.name}`;
  return `<!doctype html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#FAFAF9" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#1F1D1C" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:locale" content="da_DK">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${site.url}/assets/img/${ogImage}">
<link rel="icon" href="${asset('img/favicon.png')}" type="image/png">
<link rel="apple-touch-icon" href="${asset('img/favicon.png')}">
<link rel="preload" href="${asset('fonts/albert-sans-var.woff2')}" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset('css/style.css')}">
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">${jsonLd()}</script>
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
  const body = `
${pageHero({
  title: 'Kosmetiske behandlinger med naturlige resultater',
  lead: 'Specialsygeplejersker med tilknyttet speciallæge i Hørup på Als. Vi starter altid med en gratis forundersøgelse.',
  actions: bookBtn('primary') + pricesBtn(),
  bg: 'bg-team',
  alt: 'Ditte og Mette, der ejer Clinic 360, i klinikken',
  pos: '50%',
  mobileImg: 'team-hero-portrait',
  large: true,
})}

${trustStrip()}

<section class="section intro">
  <div class="container intro__inner">
    <h2 class="h2">Din tryghed kommer før resultatet</h2>
    <div class="intro__text">
      <p class="lead">Vi starter altid med en grundig og gratis forundersøgelse. Først derefter lægger vi en plan, der passer til dine ønsker, og er en behandling ikke det rigtige for dig, siger vi det.</p>
      <p><a class="text-link" href="${url('om-os/')}">Mød Mette, Ditte og Kristian</a></p>
    </div>
  </div>
</section>

<section class="section section--plane" aria-labelledby="behandlinger">
  <div class="container">
    ${sectionHead({ title: 'Behandlinger og priser', lead: 'Alle priser står her. Klik på en behandling for at læse mere.', id: 'behandlinger' })}
    ${priceIndex()}
    <div class="btn-row">${pricesBtn('primary')}</div>
  </div>
</section>

<section class="section" aria-labelledby="foer-efter">
  <div class="container">
    ${sectionHead({ title: 'Før og efter', lead: 'Træk i billedet for at sammenligne.', id: 'foer-efter' })}
    ${resultsFeature(pick(['ba-ansigt-3', 'ba-laeber-1', 'ba-pande-4']))}
    <div class="btn-row">${btn('Se før og efter', url('foer-efter/'), { variant: 'secondary' })}</div>
  </div>
</section>

${reviewsSection()}

<section class="section" aria-labelledby="forloeb">
  <div class="container">
    ${sectionHead({ title: 'Sådan foregår et forløb', id: 'forloeb' })}
    ${stepsRows(steps)}
  </div>
</section>

<section class="section section--plane" aria-labelledby="team">
  <div class="container">
    ${sectionHead({ title: 'Mød os', lead: 'To kosmetiske specialsygeplejersker fra Sønderborg Sygehus og en speciallæge i dermatologi.', id: 'team' })}
    ${teamSection()}
  </div>
</section>

${zoSection()}
${visitSection()}
`;
  return layout({
    path: '',
    title: 'Forside',
    description: 'Clinic 360 er en kosmetisk speciallægeklinik i Hørup på Als nær Sønderborg. Botox, filler, skinbooster, HydraFacial, PRF m.m. Gratis forundersøgelse og 10 % rabat på første behandling.',
    body,
  });
}

/* ---------------------------------------------------------------- Behandlinger */

function treatmentsIndex() {
  const body = `
${pageHero({
  title: 'Behandlinger',
  lead: 'Alle behandlinger udføres af autoriseret sundhedspersonale og starter med en gratis forundersøgelse.',
  actions: bookBtn('primary') + pricesBtn(),
  bg: 'bg-skin', alt: 'Ansigtsbehandling i klinikken', posMobile: '42%',
})}
<section class="section section--plane section--flush">
  <div class="container">${priceIndex()}</div>
</section>
${reviewsSection({ compact: true })}
`;
  return layout({
    path: 'behandlinger/',
    title: 'Behandlinger',
    active: 'behandlinger',
    description: 'Se alle behandlinger hos Clinic 360: botox, filler, skinbooster, Profhilo, PRF, kemisk peeling, Skinpen, HydraFacial og fedtfrysning.',
    body,
  });
}

function treatmentPage(t) {
  const tResults = results.filter((r) => t.results.includes(r.tag));
  const related = t.related.map((s) => bySlug[s]);
  const body = `
${pageHero({
  title: t.name,
  lead: t.lead,
  actions: bookBtn('primary') + btn('Se priser', '#priser', { variant: 'secondary' }),
  ...heroBg[t.category],
  crumbs: breadcrumbs([{ href: 'behandlinger/', label: 'Behandlinger' }, { label: t.name }]),
})}

<section class="facts-wrap" aria-label="Kort fortalt">
  <div class="container">
    <dl class="facts">
      <div class="facts__item"><dt>Pris</dt><dd>fra ${kr(minPrice(t))}</dd></div>
      ${t.facts.slice(0, 3).map(([k, v]) => `<div class="facts__item"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
    </dl>
  </div>
</section>

<section class="section">
  <div class="container article">
    <div class="article__main prose">
      <h2 class="h2">${t.headline}</h2>
      ${t.body.map((b, i) => `${i > 0 ? `<h3 class="h3">${b.h}</h3>` : ''}${b.p.map((p) => `<p>${p}</p>`).join('')}`).join('')}
    </div>
    <aside class="article__aside">
      <div class="article__img">${img(t.img, { alt: `${t.name} hos Clinic 360`, sizes: '(min-width: 960px) 30vw, 92vw' })}</div>
      <h2 class="h4">Velegnet til</h2>
      <ul class="checklist">${t.suited.map((s) => `<li>${icon.check}<span>${s}</span></li>`).join('')}</ul>
      ${
        t.contraindications
          ? `<h2 class="h4">Du kan ikke behandles, hvis du</h2>
      <ul class="dotlist">${t.contraindications.map((s) => `<li>${s}</li>`).join('')}</ul>`
          : ''
      }
    </aside>
  </div>
</section>

${
  t.steps.length
    ? `<section class="section section--plane" aria-labelledby="forloeb">
  <div class="container">
    ${sectionHead({ title: 'Sådan foregår det', id: 'forloeb' })}
    ${stepsRows(t.steps)}
  </div>
</section>`
    : ''
}

<section class="section" id="priser" aria-labelledby="priser-titel">
  <div class="container price-detail">
    <div>
      <h2 class="h2" id="priser-titel">Priser</h2>
      <p class="lead">Som ny kunde får du ${t.discount} % rabat på din første behandling. Forundersøgelsen er gratis.</p>
    </div>
    <div class="price-detail__table">
      ${priceTable(t)}
      <div class="btn-row">${bookBtn('primary')}</div>
    </div>
  </div>
</section>

${
  tResults.length >= 3
    ? `<section class="section section--plane" aria-labelledby="resultater">
  <div class="container">
    ${sectionHead({ title: 'Før og efter', lead: 'Træk i billedet for at sammenligne.', id: 'resultater' })}
    ${resultsFeature(tResults)}
    <div class="btn-row">${btn('Se før og efter', url('foer-efter/') + '#' + t.results[0], { variant: 'secondary' })}</div>
  </div>
</section>`
    : tResults.length
    ? `<section class="section section--plane" aria-labelledby="resultater">
  <div class="container">
    ${sectionHead({ title: 'Før og efter', lead: 'Træk i billedet for at sammenligne.', id: 'resultater' })}
    <div class="results__grid results__grid--two">${tResults.map((r) => baCard(r, { sizes: '(min-width: 640px) 45vw, 92vw' })).join('')}</div>
  </div>
</section>`
    : ''
}

${
  t.faq
    ? `<section class="section" aria-labelledby="faq">
  <div class="container narrow">
    ${sectionHead({ title: 'Spørgsmål og svar', id: 'faq' })}
    ${faqList(t.faq)}
  </div>
</section>`
    : ''
}

${reviewsSection({ compact: true })}

<section class="section" aria-labelledby="relateret">
  <div class="container">
    ${sectionHead({ title: 'Relaterede behandlinger', id: 'relateret' })}
    <ul class="related">
      ${related
        .map(
          (r) => `<li><a href="${url(r.slug + '/')}" class="related__link">
          <span class="related__media">${img(r.img, { alt: '', sizes: '(min-width: 900px) 30vw, 92vw' })}</span>
          <span class="related__name">${r.name}</span>
          <span class="related__price">fra ${kr(minPrice(r))}</span>
        </a></li>`
        )
        .join('')}
    </ul>
  </div>
</section>
`;
  return layout({
    path: t.slug + '/',
    title: t.name,
    active: 'behandlinger',
    description: `${plain(t.lead)} Pris fra ${kr(minPrice(t))}. Clinic 360 i Hørup nær Sønderborg.`.slice(0, 300),
    ogImage: `${t.img}-700.webp`,
    body,
  });
}

/* ---------------------------------------------------------------- Priser */

function prices() {
  const priceFaq = [
    { q: 'Er forundersøgelsen gratis?', a: 'Ja. Vi tilbyder altid en gratis og uforpligtende forundersøgelse, hvor vi gennemgår dine ønsker og forventninger.' },
    { q: 'Hvordan får jeg velkomstrabatten?', a: 'Som ny kunde får du 10 % rabat på din første behandling hos os. På fedtfrysning er velkomstrabatten 20 %.' },
    { q: 'Hvorfor skal jeg vente 48 timer?', a: 'Ved injektionsbehandlinger som botox, filler, skinbooster og Profhilo kræver loven 48 timers betænkningstid mellem forundersøgelse og behandling. Du kan godt booke behandlingen med det samme.' },
    { q: 'Skal jeg til læge før botox?', a: 'Ja. Botox er et lægemiddel, så vores speciallæge holder en lovpligtig forkonsultation online. Den er kun nødvendig første gang.' },
  ];
  const body = `
${pageHero({
  title: 'Priser',
  lead: 'Forundersøgelsen er gratis, og som ny kunde får du 10 % rabat på første behandling (20 % på fedtfrysning).',
  actions: bookBtn('primary') + btn('Ring ' + site.phone, site.phoneHref, { variant: 'secondary' }),
  bg: 'bg-shelf', alt: 'Hylde med kurve og planter i klinikken', posMobile: '70%',
})}

<div class="price-nav" data-price-nav>
  <div class="container">
    <ul class="price-nav__list" aria-label="Gå til behandling">
      ${treatments.map((t) => `<li><a href="#pris-${t.slug}" data-spy-link="pris-${t.slug}">${t.name}</a></li>`).join('')}
    </ul>
  </div>
</div>

${categories
  .map(
    (c) => `<section class="section section--tight price-section" aria-labelledby="kat-${c.id}">
  <div class="container">
    <h2 class="h2 price-section__title" id="kat-${c.id}">${c.name}</h2>
    ${treatments.filter((t) => t.category === c.id).map(priceBlock).join('')}
  </div>
</section>`
  )
  .join('')}

<p class="container legal-note">${icon.clock}Ved injektionsbehandlinger er der 48 timers lovpligtig betænkningstid efter forundersøgelsen.</p>

<section class="section section--plane" aria-labelledby="pris-resultater">
  <div class="container">
    ${sectionHead({ title: 'Se resultaterne før du vælger', lead: 'Træk i billedet for at sammenligne.', id: 'pris-resultater' })}
    ${resultsFeature(pick(['ba-ansigt-7', 'ba-laeber-2', 'ba-pande-1']))}
    <div class="btn-row">${btn('Se før og efter', url('foer-efter/'), { variant: 'secondary' })}</div>
  </div>
</section>

${zoSection()}

<section class="section section--plane" aria-labelledby="pris-faq">
  <div class="container narrow">
    ${sectionHead({ title: 'Spørgsmål om priser', id: 'pris-faq' })}
    ${faqList(priceFaq)}
  </div>
</section>
${reviewsSection({ compact: true })}
`;
  return layout({
    path: 'priser/',
    title: 'Priser',
    active: 'priser',
    description: 'Priser på botox, filler, skinbooster, Profhilo, PRF, kemisk peeling, Skinpen, HydraFacial og fedtfrysning hos Clinic 360. Gratis forundersøgelse og 10 % velkomstrabat.',
    body,
  });
}

/* ---------------------------------------------------------------- Før & efter */

function beforeAfter() {
  const body = `
${pageHero({
  title: 'Før og efter',
  lead: 'Træk i billederne for at se forskellen. Filtrér efter behandling.',
  actions: bookBtn('primary') + pricesBtn(),
  bg: 'bg-shelf-2', alt: 'Hylde med kurve og planter i klinikken', posMobile: '45%',
})}
<section class="section section--flush">
  <div class="container">${resultsGrid(results)}</div>
</section>
${reviewsSection({ compact: true })}
`;
  return layout({
    path: 'foer-efter/',
    title: 'Før og efter',
    active: 'foer-efter',
    description: 'Se før og efter-billeder af botox og filler hos Clinic 360 i Hørup nær Sønderborg. Naturlige resultater fra vores egne kunder.',
    body,
  });
}

/* ---------------------------------------------------------------- Om os */

function about() {
  const values = [
    { t: 'Sikkerhed først', d: 'Vi er registreret hos Styrelsen for Patientsikkerhed, og alle behandlinger udføres af autoriseret sundhedspersonale.' },
    { t: 'Naturlige resultater', d: 'Vi forfiner dit udseende uden at ændre det, med respekt for den naturlige aldring.' },
    { t: 'Ærlig vejledning', d: 'Du får god tid og en ærlig vurdering, også når svaret er, at du ikke har brug for en behandling.' },
  ];
  const body = `
${pageHero({
  title: 'Om Clinic 360',
  lead: 'Klinikken drives af Mette Appel og Ditte B. R. Thordsen, begge kosmetiske specialsygeplejersker, med tilknyttet speciallæge.',
  actions: bookBtn('primary'),
  bg: 'bg-team-wall', alt: 'Mette og Ditte foran Clinic 360-skiltet', pos: '50%', posMobile: '78%',
})}
<section class="section section--tight" aria-labelledby="vaerdier">
  <div class="container values">
    <h2 class="h2" id="vaerdier">Det kan du regne med</h2>
    <dl class="values__list">
      ${values.map((v) => `<div><dt>${v.t}</dt><dd>${v.d}</dd></div>`).join('')}
    </dl>
  </div>
</section>
<section class="section section--plane" aria-labelledby="team">
  <div class="container">
    ${sectionHead({ title: 'Mød os', id: 'team' })}
    ${teamSection({ withBio: true })}
  </div>
</section>
<section class="section" aria-labelledby="klinikken">
  <div class="container">
    ${sectionHead({ title: 'Klinikken', lead: 'En lys og rolig klinik i Hørup, hvor der er tid til dig.', id: 'klinikken' })}
    <div class="gallery">
      ${img('interior-lounge', { alt: 'Klinikkens lounge', sizes: '(min-width: 900px) 25vw, 50vw' })}
      ${img('t-skinpen-2', { alt: 'Behandling i klinikken', sizes: '(min-width: 900px) 40vw, 100vw' })}
      ${img('interior-anatomy', { alt: 'Plakat over ansigtets anatomi i klinikken', sizes: '(min-width: 900px) 25vw, 50vw' })}
      ${img('tray', { alt: 'Forfriskninger i klinikken', sizes: '(min-width: 900px) 25vw, 50vw' })}
      ${img('t-hydrafacial-2', { alt: 'Ansigtsbehandling med kølende kugler', sizes: '(min-width: 900px) 25vw, 50vw' })}
    </div>
  </div>
</section>
${reviewsSection()}
`;
  return layout({
    path: 'om-os/',
    title: 'Om os',
    active: 'om-os',
    description: 'Mød Mette Appel og Ditte B. R. Thordsen, kosmetiske specialsygeplejersker, og speciallæge Kristian hos Clinic 360 i Hørup nær Sønderborg.',
    ogImage: 'team-standing-1080.webp',
    body,
  });
}

/* ---------------------------------------------------------------- Kontakt */

function contact() {
  const body = `
${pageHero({
  title: 'Kontakt os',
  lead: 'Har du spørgsmål, eller vil du høre om en behandling? Ring, skriv eller book tid direkte.',
  bg: 'bg-talk', alt: 'Samtale i klinikken', posMobile: '80%',
})}
<section class="section section--flush">
  <div class="container contact">
    <div class="contact__info">
      <ul class="contact-list">
        <li>${icon.phone}<span><span class="contact-list__label">Telefon</span><a href="${site.phoneHref}">${site.phone}</a></span></li>
        <li>${icon.mail}<span><span class="contact-list__label">E-mail</span><a href="mailto:${site.email}">${site.email}</a></span></li>
        <li>${icon.pin}<span><span class="contact-list__label">Adresse</span><a href="${site.mapsUrl}" ${ext}>${site.address.street}, ${site.address.zip} ${site.address.city}</a></span></li>
      </ul>
      <div>
        <h2 class="h4">Åbningstider</h2>
        ${hoursList()}
      </div>
      ${stpsBadge()}
    </div>
    <form class="form" data-contact-form data-endpoint="${esc(site.formEndpoint)}" data-email="${site.email}" novalidate>
      <h2 class="h3">Skriv til os</h2>
      <div class="form__row">
        <div class="field"><label for="f-navn">Navn</label><input id="f-navn" name="navn" autocomplete="name" required aria-describedby="f-navn-fejl"><p class="field__error" id="f-navn-fejl">Skriv dit navn.</p></div>
        <div class="field"><label for="f-tlf">Telefon</label><input id="f-tlf" name="telefon" type="tel" autocomplete="tel" required aria-describedby="f-tlf-fejl"><p class="field__error" id="f-tlf-fejl">Skriv dit telefonnummer.</p></div>
      </div>
      <div class="field"><label for="f-mail">E-mail</label><input id="f-mail" name="email" type="email" autocomplete="email" required aria-describedby="f-mail-fejl"><p class="field__error" id="f-mail-fejl">Skriv en gyldig e-mailadresse.</p></div>
      <fieldset class="field">
        <legend>Det handler om (valgfrit)</legend>
        <div class="pill-options">
          ${['Forundersøgelse', ...treatments.map((t) => t.name), 'ZO Skin Health', 'Andet']
            .map((n) => `<label class="pill-option"><input type="checkbox" name="emne" value="${esc(n)}"><span>${n}</span></label>`)
            .join('')}
        </div>
      </fieldset>
      <div class="field"><label for="f-besked">Besked (valgfri)</label><textarea id="f-besked" name="besked" rows="5" aria-describedby="f-besked-hjaelp"></textarea><p class="field__help" id="f-besked-hjaelp">Skriv ikke helbredsoplysninger her. Dem tager vi ved forundersøgelsen.</p></div>
      <div class="consent"><input type="checkbox" id="f-samtykke" name="samtykke" required><label for="f-samtykke">Clinic 360 må bruge mine oplysninger til at svare på min besked. Se <a href="${url('cookie-og-privatlivspolitik/')}">privatlivspolitikken</a>.</label></div>
      <button class="btn btn--primary" type="submit">Send besked</button>
      <p class="form__status" role="status" aria-live="polite"></p>
    </form>
  </div>
</section>
`;
  return layout({
    path: 'kontakt/',
    title: 'Kontakt',
    active: 'kontakt',
    description: `Kontakt Clinic 360 på ${site.phone} eller ${site.email}. Kallehave 24, 6470 Sydals. Se åbningstider og book en gratis forundersøgelse.`,
    body,
  });
}

/* ---------------------------------------------------------------- Privatliv */

function privacy() {
  const body = `
${pageHero({ title: 'Cookie- og privatlivspolitik' })}
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
    title: 'Cookie- og privatlivspolitik',
    description: 'Læs hvordan Clinic 360 bruger cookies og behandler dine personoplysninger.',
    body,
  });
}

function notFound() {
  const body = pageHero({
    title: 'Siden findes ikke',
    lead: 'Siden er måske flyttet. Gå til forsiden, eller se behandlinger og priser.',
    actions: btn('Til forsiden', url(), { variant: 'primary' }) + pricesBtn(),
  });
  return layout({ path: '404.html', title: 'Siden findes ikke', description: 'Siden blev ikke fundet.', body });
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
    ['404.html', notFound()],
  ];
}
