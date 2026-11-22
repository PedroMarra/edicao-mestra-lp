import { tc, fill } from '../lib/helpers.mjs';

export default ({ site, c }) => `
<section class="sec" id="faq">
  <div class="wrap narrow">
    ${tc(45, 'Perguntas')}
    <h2>Perguntas <span class="grad">frequentes</span></h2>
    <div class="faq">${c.faq.map((f) => `
      <details><summary>${f.q}</summary><p>${f.a(site, fill)}</p></details>`).join('')}
    </div>
  </div>
</section>`;
