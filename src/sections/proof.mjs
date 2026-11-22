import { tc, hasAsset } from '../lib/helpers.mjs';

// Sem depoimentos reais = seção escondida (.is-empty). Nunca invente.
export default ({ c }) => {
  const list = c.testimonials || [];
  return `
<section class="sec${list.length ? '' : ' is-empty'}" id="depoimentos" ${list.length ? '' : 'hidden'}>
  <div class="wrap">
    ${tc(30, 'Quem já usa')}
    <h2>Quem já edita com a <span class="grad">skill</span>.</h2>
    <ul class="grid3">${list.map((t) => `
      <li class="card quote">
        <blockquote>${t.text}</blockquote>
        <p class="quote__who">${hasAsset(t.photo) ? `<img src="assets/${t.photo}" alt="${t.name}" width="40" height="40" loading="lazy">` : ''}<span><strong>${t.name}</strong>${t.handle ? ` <em>${t.handle}</em>` : ''}</span></p>
      </li>`).join('')}
    </ul>
  </div>
</section>`;
};
