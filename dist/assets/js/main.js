/* Clinic 360 – lille, afhængighedsfri JavaScript. Siden virker også uden. */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header-kant og mobil genvejsbjælke styres af IntersectionObserver (ingen scroll-lytter) */
  const header = $('[data-header]');
  const bar = $('.action-bar');
  if ('IntersectionObserver' in window) {
    const sentinel = document.createElement('div');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:8px;pointer-events:none';
    document.body.prepend(sentinel);
    new IntersectionObserver(([e]) => header?.classList.toggle('is-scrolled', !e.isIntersecting)).observe(sentinel);
    const hero = $('[data-hero]') || $('main > section');
    if (hero && bar) new IntersectionObserver(([e]) => bar.classList.toggle('is-visible', !e.isIntersecting)).observe(hero);
  }

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

  /* Kontaktformular: fejl vises under det enkelte felt */
  const form = $('[data-contact-form]');
  if (form) {
    const status = $('.form__status', form);
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = '';
      status.classList.remove('is-error');
      const required = $$('[required]', form);
      required.forEach((f) => f.closest('.field, .consent')?.classList.toggle('is-invalid', !f.checkValidity()));
      const invalid = required.filter((f) => !f.checkValidity());
      // Telefon eller e-mail: mindst ét af dem skal være udfyldt (og e-mail skal være gyldig, hvis den er udfyldt)
      const either = $$('[data-either] input', form);
      const filled = either.filter((f) => f.value.trim());
      either.forEach((f) => f.closest('.field').classList.remove('is-invalid'));
      if (!filled.length) {
        either.forEach((f) => f.closest('.field').classList.add('is-invalid'));
        invalid.splice(1, 0, either[0]);
      } else {
        filled.filter((f) => !f.checkValidity()).forEach((f) => { f.closest('.field').classList.add('is-invalid'); invalid.push(f); });
      }
      if (invalid.length) {
        status.textContent = invalid.length === 1 && invalid[0].name === 'samtykke'
          ? 'Sæt flueben for at give samtykke, så vi må svare dig.'
          : 'Udfyld de markerede felter for at sende beskeden.';
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
          status.textContent = 'Beskeden er sendt. Vi svarer hurtigst muligt.';
        } catch {
          status.textContent = 'Beskeden blev ikke sendt. Ring på 50 20 67 66 eller skriv til clinic360@outlook.dk.';
          status.classList.add('is-error');
        }
        return;
      }
      // Uden server: åbn mailprogrammet med beskeden udfyldt
      const body = `Navn: ${data.get('navn')}\nTelefon: ${data.get('telefon')}\nE-mail: ${data.get('email')}\nEmne: ${topics}\n\n${data.get('besked') || ''}`;
      location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent('Besked via clinic360.dk')}&body=${encodeURIComponent(body)}`;
      status.textContent = 'Dit mailprogram åbner med beskeden klar. Tryk send dér.';
    });
    form.addEventListener('input', (e) => {
      const f = e.target;
      if ((f.required || f.closest('[data-either]')) && f.value.trim() && f.checkValidity()) {
        f.closest('.field, .consent')?.classList.remove('is-invalid');
        if (f.closest('[data-either]')) $$('[data-either]', form).forEach((x) => x.classList.remove('is-invalid'));
      }
      if (f.type === 'checkbox' && f.required && f.checked) f.closest('.consent')?.classList.remove('is-invalid');
    });
  }
})();
