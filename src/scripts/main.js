// Edição Mestra · main.js (sem dependências)
// CHECKOUT_URL é preenchido pelo build a partir de src/config/site.mjs.
const CHECKOUT_URL = '__CHECKOUT_URL__';

(() => {
  document.documentElement.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // 1. Botões → checkout, repassando UTMs e parâmetros de rastreio.
  const KEEP = /^(utm_|src$|sck$|xcod$|fbclid$|ttclid$|gclid$)/;
  const params = new URLSearchParams(location.search);
  const buttons = document.querySelectorAll('[data-cta]');
  if (/^https?:\/\//.test(CHECKOUT_URL)) {
    const url = new URL(CHECKOUT_URL);
    params.forEach((val, key) => { if (KEEP.test(key) && !url.searchParams.has(key)) url.searchParams.set(key, val); });
    buttons.forEach((a) => { a.href = url.toString(); });
  }

  // 2. Pixel: InitiateCheckout no clique.
  buttons.forEach((a) => a.addEventListener('click', () => {
    const variant = document.body.dataset.variant;
    try { window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: 'Edição Mestra', value: 37, currency: 'BRL', variant }); } catch (e) {}
    try { window.ttq && window.ttq.track('InitiateCheckout', { content_name: 'Edição Mestra', value: 37, currency: 'BRL' }); } catch (e) {}
  }));

  // 3. Botão fixo no celular: aparece quando o botão do hero sai da tela
  //    e some quando a oferta ou uma chamada de compra está visível.
  const sticky = document.querySelector('[data-sticky]');
  const heroCta = document.getElementById('hero-cta');
  const offer = document.getElementById('oferta');
  if (sticky && heroCta && 'IntersectionObserver' in window) {
    let heroOut = false;
    const visible = new Set();
    const sync = () => {
      const show = heroOut && visible.size === 0;
      sticky.classList.toggle('is-on', show);
      sticky.setAttribute('aria-hidden', String(!show));
      sticky.querySelector('a').tabIndex = show ? 0 : -1;
    };
    new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe(heroCta);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      sync();
    }, { threshold: 0.25 });
    [offer, ...document.querySelectorAll('.ctaband')].filter(Boolean).forEach((el) => io.observe(el));
  }

  // 4. Timecode do hero acompanha o vídeo demo.
  const tc = document.querySelector('[data-timecode]');
  const demo = document.querySelector('.hero video');
  if (tc && demo) {
    const pad = (n) => String(Math.floor(n)).padStart(2, '0');
    demo.addEventListener('timeupdate', () => {
      const t = demo.currentTime;
      tc.textContent = `00:${pad(t / 60)}:${pad(t % 60)}:${pad((t % 1) * 30)}`;
    });
  }

  // 5. Vídeos fora da tela pausam (economiza bateria e dados).
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting && !target.paused && !target.closest("[data-sync]")) target.pause();
    }));
    document.querySelectorAll('video').forEach((vid) => io.observe(vid));
  }

  // 6. Revelar ao rolar (com atraso em cascata entre irmãos).
  const sel = '.sec h2, .sec .tc, .sec .lead, .sec .note, .card, .chart, .ctaband__box, .ba__item, .pains li, .offer__box, .faq details, .guar__seal, .bignum, .steps';
  const targets = [...document.querySelectorAll(sel)].filter((el) => !el.closest('.hero'));
  if ('IntersectionObserver' in window && !reduce) {
    targets.forEach((el) => {
      el.classList.add('reveal');
      const sibs = [...el.parentElement.children].filter((n) => n.matches(sel));
      el.style.setProperty('--d', `${Math.min(sibs.indexOf(el), 5) * 0.08}s`);
    });
    const ro = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    targets.forEach((el) => ro.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('in'));
  }

  // 7. Barra de progresso (playhead da página) e REC rodando.
  const bar = document.querySelector('[data-progress]');
  const rec = document.querySelector('[data-rec]');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar) bar.style.setProperty('--p', max > 0 ? (scrollY / max).toFixed(4) : 0);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (rec && !reduce) {
    const t0 = performance.now(), p2 = (n) => String(n).padStart(2, '0');
    setInterval(() => {
      const t = (performance.now() - t0) / 1000;
      rec.textContent = `00:${p2(Math.floor(t / 60))}:${p2(Math.floor(t % 60))}:${p2(Math.floor((t % 1) * 30))}`;
    }, 1000 / 15);
  }

  // 8. Luz que segue o cursor (botões e cards) e tela do hero em 3D.
  if (fine && !reduce) {
    document.addEventListener('pointermove', (e) => {
      const el = e.target.closest && e.target.closest('.btn, .card, .chart, .ctaband__box, .offer__box');
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true });
    const media = document.querySelector('.hero__media');
    const screen = media && media.querySelector('.screen');
    if (media && screen) {
      media.addEventListener('pointermove', (e) => {
        const r = media.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        screen.style.setProperty('--ry', `${(x * 8 - 2).toFixed(2)}deg`);
        screen.style.setProperty('--rx', `${(-y * 6).toFixed(2)}deg`);
      });
      media.addEventListener('pointerleave', () => { screen.style.removeProperty('--ry'); screen.style.removeProperty('--rx'); });
    }
  }

  // 9. Antes e depois sincronizados: play/pause/seek em um vale para os dois.
  document.querySelectorAll('[data-sync]').forEach((group) => {
    const vids = [...group.querySelectorAll('video')];
    if (vids.length < 2) return;
    let lock = false;
    const each = (src, fn) => { if (lock) return; lock = true; vids.filter((v) => v !== src).forEach(fn); lock = false; };
    vids.forEach((v) => {
      v.addEventListener('play', () => each(v, (o) => { o.currentTime = v.currentTime; o.play().catch(() => {}); }));
      v.addEventListener('pause', () => each(v, (o) => o.pause()));
      v.addEventListener('seeked', () => each(v, (o) => { if (Math.abs(o.currentTime - v.currentTime) > 0.3) o.currentTime = v.currentTime; }));
    });
  });
})();
