import { tc, cta, launch } from '../lib/helpers.mjs';

// Preço grande: R$ pequeno, centavos sobrescritos.
const bigPrice = (v) => {
  const m = v.match(/^(R\$)\s?(\d+)(,\d{2})?$/);
  return m ? `<span class="offer__cur">${m[1]}</span>${m[2]}${m[3] ? `<span class="offer__cents">${m[3]}</span>` : ''}` : v;
};

const clock = (L, site) => `
      <div class="clock" data-deadline="${L.until}" data-launch role="timer" aria-label="${site.deadline.label}">
        <p class="clock__label"><i aria-hidden="true"></i>${site.deadline.label}</p>
        <div class="clock__row" aria-hidden="true">${[['d', 'dias'], ['h', 'horas'], ['m', 'min'], ['s', 'seg']].map(([k, t], i) => `${i ? '<span class="clock__sep">:</span>' : ''}<span class="clock__seg"><b data-clock-${k}>--</b><small>${t}</small></span>`).join('')}</div>
        <p class="clock__when">Até ${L.date} às ${L.hour} (Brasília). Depois, ${L.after}.</p>
      </div>`;

export default ({ site, c, v }) => {
  const L = launch(site);
  return `
<section class="sec offer aurora" id="oferta">
  <div class="wrap">
    <div class="offer__box">
      ${tc(40, 'Oferta')}
      <h2>${site.brand}</h2>
      <ul class="checks">${c.offer.includes.map((x) => `<li>${x}</li>`).join('')}</ul>
      <div class="offer__pricebox">
        ${L ? `<p class="offer__launch" data-launch><span class="offer__tag"><i aria-hidden="true"></i>Preço de lançamento</span><span class="offer__off">-${L.off}%</span></p>` : ''}
        ${L ? `<p class="offer__anchor" data-launch>Depois de ${L.date}: <s>${L.after}</s></p>` : site.price.anchor ? `<p class="offer__anchor">de <s>${site.price.anchor}</s> por</p>` : ''}
        <p class="offer__price">${bigPrice(site.price.value)}</p>
        ${L ? `<p class="offer__save" data-launch>Você economiza ${L.save}</p>` : ''}
        <p class="offer__note">${site.price.note} · sem mensalidade da skill</p>
      </div>
      ${L ? clock(L, site) : ''}
      ${cta(site, v.hero.cta)}
      <ul class="badges">${c.offer.badges.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>
  </div>
</section>`;
};
