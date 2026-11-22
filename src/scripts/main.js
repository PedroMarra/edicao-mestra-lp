// Edição Mestra · main.js (sem dependências)
// CHECKOUT_URL é preenchido pelo build a partir de src/config/site.mjs.
const CHECKOUT_URL = '__CHECKOUT_URL__';

(() => {
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
      if (!isIntersecting && !target.paused) target.pause();
    }));
    document.querySelectorAll('video').forEach((vid) => io.observe(vid));
  }
})();
