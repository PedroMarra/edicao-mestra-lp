import { tc, cta } from '../lib/helpers.mjs';

export default ({ site, c, v }) => `
<section class="sec" id="o-que-recebe">
  <div class="wrap">
    ${tc(20, 'O que você recebe')}
    <h2>Tudo para editar no <span class="grad">piloto automático</span>.</h2>
    <ul class="grid3">${c.deliverables.map((d) => `
      <li class="card deliv"><span class="chip">${d.tag}</span><h3>${d.title}</h3><p>${d.text}</p>${d.confirm ? '<span class="fill">[PREENCHER: confirmar este item]</span>' : ''}</li>`).join('')}
    </ul>
    <div class="center">${cta(site, v.hero.cta)}</div>
  </div>
</section>`;
