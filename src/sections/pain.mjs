import { tc } from '../lib/helpers.mjs';

const retention = `
<figure class="chart">
  <svg viewBox="0 0 320 180" role="img" aria-labelledby="ret-t ret-d">
    <title id="ret-t">Curva de retenção</title>
    <desc id="ret-d">Ilustração: sem edição a retenção despenca nos primeiros segundos; com cortes e ritmo, ela se mantém alta.</desc>
    <g class="chart__grid"><line x1="36" y1="20" x2="310" y2="20"/><line x1="36" y1="70" x2="310" y2="70"/><line x1="36" y1="120" x2="310" y2="120"/><line x1="36" y1="150" x2="310" y2="150"/></g>
    <g class="chart__axis"><text x="30" y="24" text-anchor="end">100%</text><text x="30" y="124" text-anchor="end">25%</text><text x="36" y="170">0s</text><text x="84" y="170">3s</text><text x="300" y="170" text-anchor="end">30s</text></g>
    <line class="chart__mark" x1="84" y1="16" x2="84" y2="150"/>
    <path class="chart__before" d="M36 20 C 60 40, 70 100, 90 116 S 200 138, 310 142"/>
    <path class="chart__after" d="M36 20 C 70 26, 110 40, 160 48 S 260 60, 310 64"/>
  </svg>
  <figcaption><span class="lg lg--after">com ritmo</span><span class="lg lg--before">sem edição</span><em>Ilustrativo</em></figcaption>
</figure>`;

const cuts = `
<figure class="chart chart--cuts">
  <div class="cuts" role="img" aria-label="Ilustração: o bruto tem muitos trechos de silêncio; depois dos cortes a timeline fica contínua e mais curta.">
    <div class="cuts__row"><b>BRUTO</b><div class="cuts__lane"><i></i><s></s><i></i><s></s><s></s><i></i><s></s><i></i><s></s><i></i></div></div>
    <div class="cuts__row cuts__row--after"><b>EDITADO</b><div class="cuts__lane"><i></i><i></i><i></i><i></i><i></i></div></div>
  </div>
  <figcaption><span class="lg lg--after">fala</span><span class="lg lg--gap">silêncio e erro</span><em>Ilustrativo</em></figcaption>
</figure>`;

export default ({ v }) => `
<section class="sec" id="dor">
  <div class="wrap two">
    <div>
      ${tc(5, 'O problema')}
      <h2>${v.pain.title}</h2>
      <ul class="pains">${v.pain.items.map((p) => `<li><strong>${p.k}</strong><span>${p.t}</span></li>`).join('')}</ul>
    </div>
    ${v.pain.chart === 'cuts' ? cuts : retention}
  </div>
</section>`;
