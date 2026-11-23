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
    try { window.fbq && window.fbq('track', 'InitiateCheckout', { content_name: 'Edição Mestra', value: __PRICE__, currency: 'BRL', variant }); } catch (e) {}
    try { window.ttq && window.ttq.track('InitiateCheckout', { content_name: 'Edição Mestra', value: __PRICE__, currency: 'BRL' }); } catch (e) {}
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

  // 4. Vídeo do topo: só começa a baixar depois que a página abriu.
  //    Celular baixa a versão menor. O poster aparece na hora.
  const demo = document.querySelector('video[data-hero]');
  const tc = document.querySelector('[data-timecode]');
  if (demo) {
    const start = () => {
      const small = matchMedia('(max-width: 959px)').matches;
      const slow = navigator.connection && (navigator.connection.saveData || /(^|-)2g/.test(navigator.connection.effectiveType || ''));
      if (slow) return; // conexão muito lenta: fica só o poster
      demo.src = small ? demo.dataset.srcSm : demo.dataset.src;
      demo.addEventListener('playing', () => demo.parentElement.classList.add('is-playing'), { once: true });
      if (!reduce) demo.play().catch(() => {});
    };
    if (document.readyState === 'complete') setTimeout(start, 200);
    else addEventListener('load', () => setTimeout(start, 200), { once: true });
    if (tc) {
      const pad = (n) => String(Math.floor(n)).padStart(2, '0');
      let lastTc = '';
      demo.addEventListener('timeupdate', () => {
        const t = demo.currentTime;
        const txt = `00:${pad(t / 60)}:${pad(t % 60)}:${pad((t % 1) * 30)}`;
        if (txt !== lastTc) { tc.textContent = txt; lastTc = txt; }
      });
    }
  }

  // 4a. Rótulos de seção (00:00:40:00) rodam como timecode de vídeo
  //     enquanto estão na tela. Só estética: conta para frente, não é prazo.
  const labels = document.querySelectorAll('[data-tc]');
  if (labels.length && !reduce && 'IntersectionObserver' in window) {
    const pad = (n) => String(n).padStart(2, '0');
    const on = new Map();
    let raf = 0;
    const tick = (now) => {
      on.forEach((start, el) => {
        const f = Math.floor((now - start) / (1000 / 30));
        const s = +el.dataset.tc + Math.floor(f / 30);
        el.textContent = `00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(f % 30)}`;
      });
      raf = on.size ? requestAnimationFrame(tick) : 0;
    };
    const lo = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) on.set(target, performance.now());
        else on.delete(target);
      });
      if (on.size && !raf) raf = requestAnimationFrame(tick);
    });
    labels.forEach((el) => lo.observe(el));
  }

  // 4a2. Preço de lançamento: contador até o prazo REAL de site.mjs
  //      (deadline.until), igual para todo mundo. Quando o prazo acaba,
  //      tudo que é [data-launch] some e [data-launch-off] aparece.
  const clockBox = document.querySelector('[data-deadline]');
  if (clockBox) {
    const end = Date.parse(clockBox.dataset.deadline);
    const seg = {}; ['d', 'h', 'm', 's'].forEach((k) => { seg[k] = clockBox.querySelector(`[data-clock-${k}]`); });
    const pad = (n) => String(n).padStart(2, '0');
    const over = () => {
      document.querySelectorAll('[data-launch]').forEach((el) => { el.hidden = true; });
      document.querySelectorAll('[data-launch-off]').forEach((el) => { el.hidden = false; });
    };
    let prev = {};
    const draw = () => {
      const left = end - Date.now();
      if (!(left > 0)) { over(); return false; }
      const s = Math.floor(left / 1000);
      const val = { d: pad(Math.floor(s / 86400)), h: pad(Math.floor(s / 3600) % 24), m: pad(Math.floor(s / 60) % 60), s: pad(s % 60) };
      for (const k in val) if (val[k] !== prev[k] && seg[k]) {
        seg[k].textContent = val[k];
        if (!reduce && prev[k]) { seg[k].classList.remove('tick'); void seg[k].offsetWidth; seg[k].classList.add('tick'); }
      }
      prev = val;
      return true;
    };
    if (draw()) {
      let id = 0;
      const run = () => { if (!id) id = setInterval(() => { if (!draw()) { clearInterval(id); id = 0; } }, 1000); };
      const stop = () => { clearInterval(id); id = 0; };
      // Só anima com a caixa na tela e a aba visível.
      let vis = false;
      if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { vis = e.isIntersecting; vis && !document.hidden ? (draw(), run()) : stop(); }).observe(clockBox);
      else run();
      document.addEventListener('visibilitychange', () => { document.hidden || !vis ? stop() : (draw() && run()); });
    }
  }

  // 4b. Posters dos outros vídeos só carregam perto da tela.
  const lazyPosters = document.querySelectorAll('video[data-poster]');
  if ('IntersectionObserver' in window) {
    const po = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) { target.poster = target.dataset.poster; po.unobserve(target); }
    }), { rootMargin: '600px 0px' });
    lazyPosters.forEach((v) => po.observe(v));
  } else lazyPosters.forEach((v) => { v.poster = v.dataset.poster; });

  // 5. Vídeos fora da tela pausam (economiza bateria e dados).
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting && !target.paused && !target.closest("[data-sync]")) target.pause();
      else if (isIntersecting && target.hasAttribute('data-hero') && target.src && !reduce) target.play().catch(() => {});
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
    // REC conta só enquanto o topo está visível e a aba está aberta.
    const t0 = performance.now(), p2 = (n) => String(n).padStart(2, '0');
    let recOn = true, timer = 0;
    const tickRec = () => {
      const t = (performance.now() - t0) / 1000;
      rec.textContent = `00:${p2(Math.floor(t / 60))}:${p2(Math.floor(t % 60))}:${p2(Math.floor((t % 1) * 30))}`;
    };
    const runRec = () => { clearInterval(timer); if (recOn && !document.hidden) timer = setInterval(tickRec, 100); };
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { recOn = e.isIntersecting; runRec(); }).observe(rec);
    document.addEventListener('visibilitychange', runRec);
    runRec();
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
