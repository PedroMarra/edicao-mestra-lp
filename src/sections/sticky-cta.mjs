import { cta, launch } from '../lib/helpers.mjs';

export default ({ site, v }) => {
  const L = launch(site);
  const note = L ? `<small data-launch>lançamento até ${L.date}</small><small data-launch-off hidden>${site.price.note}</small>` : `<small>${site.price.note}</small>`;
  return `
<div class="sticky" data-sticky aria-hidden="true">
  <div class="sticky__in"><span class="sticky__p">${site.price.value}${note}</span>${cta(site, v.hero.cta).replace('<a ', '<a tabindex="-1" ')}</div>
</div>`;
};
