/* Clinic 360 – lille, afhængighedsfri JavaScript. Siden virker også uden. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header: kant ved scroll + mobil handlingsbar */
  const header = $('[data-header]');
  const bar = $('.action-bar');
  const onScroll = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 8);
    bar?.classList.toggle('is-visible', y > 420);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobilmenu */
  const menuBtn = $('[data-menu-toggle]');
  const menu = $('#mobilmenu');
  const setMenu = (open) => {
    menuBtn.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  };
  menuBtn?.addEventListener('click', () => setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia('(min-width: 1100px)').addEventListener('change', (e) => e.matches && menuBtn && setMenu(false));

  /* Mega-menu (behandlinger) – åbner ved hover via CSS og ved klik/tastatur via knappen */
  $$('[data-mega]').forEach((item) => {
    const toggle = $('[data-mega-toggle]', item);
    const set = (open) => { item.classList.toggle('is-open', open); toggle.setAttribute('aria-expanded', String(open)); };
    toggle.addEventListener('click', () => set(!item.classList.contains('is-open')));
    item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && item.classList.contains('is-open')) { set(false); toggle.focus(); } });
    document.addEventListener('click', (e) => { if (!item.contains(e.target)) set(false); });
  });

  /* Før/efter-slider */
  $$('.ba__frame').forEach((frame) => {
    const range = $('.ba__range', frame);
    const update = () => frame.style.setProperty('--pos', range.value + '%');
    range.addEventListener('input', update); // tastatur (piletaster)
    // Mus og touch: træk hvor som helst i billedet. Lodret scroll bevares (touch-action: pan-y).
    let dragging = false;
    const move = (e) => {
      const r = frame.getBoundingClientRect();
      range.value = Math.round(Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100)));
      update();
    };
    frame.addEventListener('pointerdown', (e) => {
      dragging = true;
      frame.setPointerCapture(e.pointerId);
      move(e);
      e.preventDefault();
      range.focus({ preventScroll: true });
    });
    frame.addEventListener('pointermove', (e) => dragging && move(e));
    ['pointerup', 'pointercancel'].forEach((t) => frame.addEventListener(t, () => (dragging = false)));
    update();
  });

  /* Filtrering af før/efter */
  $$('[data-filter-scope]').forEach((scope) => {
    const chips = $$('[data-filter]', scope);
    const items = $$('.ba', scope);
    const apply = (tag) => {
      chips.forEach((c) => {
        const on = c.dataset.filter === tag;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      items.forEach((it) => { it.hidden = tag !== 'all' && it.dataset.tag !== tag; });
    };
    chips.forEach((c) => c.addEventListener('click', () => apply(c.dataset.filter)));
    const fromHash = () => {
      const hash = decodeURIComponent(location.hash.slice(1));
      if (hash && chips.some((c) => c.dataset.filter === hash)) apply(hash);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
  });

  /* Karrusel (anmeldelser) */
  $$('[data-carousel]').forEach((c) => {
    const track = $('[data-carousel-track]', c);
    const step = () => (track.firstElementChild?.getBoundingClientRect().width || 300) + 16;
    $('[data-carousel-prev]', c)?.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
    $('[data-carousel-next]', c)?.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }));
  });

  /* Prisnavigation: marker aktiv behandling */
  const nav = $('[data-price-nav]');
  if (nav && 'IntersectionObserver' in window) {
    const links = $$('[data-spy-link]', nav);
    const setActive = (id) => {
      links.forEach((l) => {
        const on = l.dataset.spyLink === id;
        l.classList.toggle('is-active', on);
        if (on) {
          const list = l.parentElement.parentElement;
          const left = l.offsetLeft - list.clientWidth / 2 + l.clientWidth / 2;
          list.scrollTo({ left, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      });
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' }
    );
    $$('[data-spy]').forEach((el) => io.observe(el));
  }

  /* Åbningstider: marker i dag */
  const today = new Date().getDay();
  $$('[data-hours] .hours__row').forEach((row) => {
    if (row.dataset.dow.split(',').map(Number).includes(today)) row.classList.add('is-today');
  });

  /* Kontaktformular */
  const form = $('[data-contact-form]');
  if (form) {
    const status = $('.form__status', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.classList.remove('is-error');
      const invalid = $$('[required]', form).filter((f) => !f.checkValidity());
      $$('.is-invalid', form).forEach((f) => f.classList.remove('is-invalid'));
      // Telefon eller e-mail: mindst ét skal være udfyldt, og en udfyldt e-mail skal være gyldig
      const either = $$('[data-either] input', form);
      const filled = either.filter((f) => f.value.trim());
      if (!filled.length) invalid.push(...either);
      else invalid.push(...filled.filter((f) => !f.checkValidity()));
      $$('[aria-invalid]', form).forEach((f) => f.removeAttribute('aria-invalid'));
      if (form.elements._gotcha?.value) return; // spam-robot
      if (invalid.length) {
        invalid.forEach((f) => { f.classList.add('is-invalid'); f.setAttribute('aria-invalid', 'true'); f.setAttribute('aria-describedby', 'form-status'); });
        status.textContent = 'Udfyld de markerede felter: navn, telefon eller e-mail, og sæt flueben ved privatlivspolitikken.';
        status.classList.add('is-error');
        invalid[0].focus();
        return;
      }
      const data = new FormData(form);
      const topics = data.getAll('emne').join(', ') || 'Ikke angivet';
      const endpoint = form.dataset.endpoint;
      if (endpoint) {
        try {
          const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error();
          form.reset();
          status.textContent = 'Tak for din besked! Vi vender tilbage hurtigst muligt.';
        } catch {
          status.textContent = 'Beskeden kunne ikke sendes. Ring venligst til os eller skriv en e-mail.';
          status.classList.add('is-error');
        }
        return;
      }
      // Fallback uden server: åbn mailprogram med udfyldt besked
      const body = `Navn: ${data.get('navn')}\nTelefon: ${data.get('telefon')}\nE-mail: ${data.get('email')}\nEmne: ${topics}\n\n${data.get('besked') || ''}`;
      location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent('Henvendelse via clinic360.dk')}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Dit mailprogram åbnes med beskeden klar til afsendelse.';
    });
  }

  /* Diskret fade-in ved scroll */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const targets = $$('.section-head, .ba, .steps__item, .member, .price-card, .value, .zo__grid > *, .cta-band__inner > *, .intro__grid > *');
    targets.forEach((t) => t.classList.add('reveal'));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    targets.forEach((t) => io.observe(t));
  }
})();
