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
          ${a.handle ? `<a class="person__handle" href="https://www.instagram.com/${a.handle}/" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/></svg>@${a.handle}</a>` : ''}
          <p>${fill(a.bio, `2 linhas sobre ${a.name.split(' ')[0]}`)}</p>
        </div>
      </article>`).join('')}
    </div>
  </div>
</section>`;
