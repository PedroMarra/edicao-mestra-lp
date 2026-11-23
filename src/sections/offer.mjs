import { tc, cta } from '../lib/helpers.mjs';

export default ({ site, c, v }) => `
<section class="sec offer aurora" id="oferta">
  <div class="wrap">
    <div class="offer__box">
      ${tc(40, 'Oferta')}
      ${site.deadline?.until ? `<p class="offer__clock" data-deadline="${site.deadline.until}" hidden>${site.deadline.label} <span data-clock>--</span></p>` : ''}
      <h2>${site.brand}</h2>
      <ul class="checks">${c.offer.includes.map((x) => `<li>${x}</li>`).join('')}</ul>
      ${site.price.anchor ? `<p class="offer__anchor">de <s>${site.price.anchor}</s> por</p>` : ''}
      <p class="offer__price">${site.price.value}</p>
      <p class="offer__note">${site.price.note} · sem mensalidade da skill</p>
      ${cta(site, v.hero.cta)}
      <ul class="badges">${c.offer.badges.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </div>
</section>`;
