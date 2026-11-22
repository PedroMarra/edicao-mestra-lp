import { tc } from '../lib/helpers.mjs';

export default ({ c }) => `
<section class="sec" id="para-quem">
  <div class="wrap">
    ${tc(25, 'Para quem é')}
    <h2>Feita para quem <span class="grad">já edita</span>.</h2>
    <div class="aud">
      <div class="card aud__col aud__col--yes"><h3>É para</h3><ul>${c.audience.yes.map((x) => `<li>${x}</li>`).join('')}</ul></div>
      <div class="card aud__col aud__col--no"><h3>Não é para</h3><ul>${c.audience.no.map((x) => `<li>${x}</li>`).join('')}</ul></div>
    </div>
  </div>
</section>`;
