import { tc, fill, img } from '../lib/helpers.mjs';

export default ({ c }) => `
<section class="sec" id="quem-criou">
  <div class="wrap author">
    <div class="author__photo">${img({ file: c.author.photo, alt: `Foto de ${c.author.name || 'quem criou'}`, w: 400, h: 500, desc: 'sua foto em WebP 800×1000' })}</div>
    <div>
      ${tc(35, 'Quem criou')}
      <h2>${fill(c.author.name, 'seu nome')}</h2>
      <p class="lead">${fill(c.author.bio, '2 linhas de quem você é')}</p>
    </div>
  </div>
</section>`;
