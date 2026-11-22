import { cta } from '../lib/helpers.mjs';

export default ({ site, v }) => `
<div class="sticky" data-sticky aria-hidden="true">
  <div class="sticky__in"><span class="sticky__p">${site.price.value}<small>${site.price.note}</small></span>${cta(site, v.hero.cta).replace('<a ', '<a tabindex="-1" ')}</div>
</div>`;
