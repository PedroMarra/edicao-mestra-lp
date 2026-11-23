// Chamada de compra entre seções. Uso na ordem: 'cta:<chave>'
// (a chave vem de content.ctas, ou de v.ctas na variante).
import { cta, launch, onlyLaunch } from '../lib/helpers.mjs';

export default ({ site, c, v }, key) => {
  const d = { ...(c.ctas?.[key] || {}), ...(v.ctas?.[key] || {}) };
  if (!d.title) throw new Error(`CTA "${key}" sem texto em content.ctas`);
  const L = launch(site);
  return `
<aside class="ctaband" aria-label="Comprar a ${site.brand}">
  <div class="wrap">
    <div class="ctaband__box">
      <div class="ctaband__copy">
        <p class="ctaband__title">${d.title}</p>
        <p class="ctaband__sub">${d.sub}</p>
      </div>
      <div class="ctaband__act">
        ${cta(site, d.button || v.hero.cta)}
        <p class="ctaband__trust">${site.price.value}${L ? onlyLaunch(` até ${L.date}`) : ''} · garantia de 7 dias · acesso imediato</p>
      </div>
    </div>
  </div>
</aside>`;
};
