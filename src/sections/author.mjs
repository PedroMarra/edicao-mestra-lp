import { tc, fill, img } from '../lib/helpers.mjs';

export default ({ c }) => `
<section class="sec" id="quem-criou">
  <div class="wrap">
    ${tc(35, 'Quem criou')}
    <h2>${c.authors.length === 1 ? 'Quem criou a' : 'Quem está por trás da'} <span class="grad">skill</span>.</h2>
    <div class="authors${c.authors.length === 1 ? ' authors--solo' : ''}">${c.authors.map((a) => `
      <article class="card person">
        <div class="person__photo">${img({ file: a.photo, alt: `Foto de ${a.name}`, w: 800, h: 1000, desc: `foto de ${a.name.split(' ')[0]}` })}</div>
        <div class="person__txt">
          <h3>${a.name}</h3>
          <p class="person__role">${a.role}</p>
          <p>${fill(a.bio, `2 linhas sobre ${a.name.split(' ')[0]}`)}</p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;
