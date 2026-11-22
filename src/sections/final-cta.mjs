import { cta, priceLine } from '../lib/helpers.mjs';

export default ({ site, c, v }) => `
<section class="sec final">
  <div class="wrap center">
    <h2>${c.finalCta.replace('mais rápido', '<span class="grad">mais rápido</span>')}</h2>
    ${cta(site, v.hero.cta)}
    ${priceLine(site)}
  </div>
</section>`;
