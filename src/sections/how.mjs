import { tc, fill } from '../lib/helpers.mjs';

export default ({ site, c }) => `
<section class="sec" id="como-funciona">
  <div class="wrap">
    ${tc(10, 'Como funciona')}
    <h2>${c.how.title}</h2>
    <p class="note">${c.how.skillDef}</p>
    <ol class="steps">${c.how.steps.map((s, i) => `
      <li class="card step"><span class="step__n">0${i + 1}</span><h3>${s.title}</h3><p>${s.text(site, fill)}</p></li>`).join('')}
    </ol>
  </div>
</section>`;
