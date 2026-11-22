import { tc, fill, video } from '../lib/helpers.mjs';

export default ({ site }) => `
<section class="sec" id="antes-depois">
  <div class="wrap">
    ${tc(15, 'Antes e depois')}
    <h2>O mesmo vídeo, <span class="grad">antes e depois</span>.</h2>
    <p class="bignum"><span>${fill(site.times.before, 'X horas')}</span><i aria-hidden="true">→</i><span class="grad">${fill(site.times.after, 'Y minutos', ` ${site.times.afterUnit}`)}</span></p>
    <p class="ba__hint">Dê play em um e os dois tocam juntos.</p>
    <div class="ba" data-sync>
      <figure class="ba__item">
        <figcaption><span class="tag">Antes</span> sem legenda, motion nem zoom</figcaption>
        <div class="screen screen--flat">${video({ file: 'antes.mp4', poster: 'antes-poster.webp', desc: 'trecho cru, sem edição', ratio: '9/16' })}</div>
      </figure>
      <figure class="ba__item">
        <figcaption><span class="tag tag--on">Depois</span> legendas, motion e zooms</figcaption>
        <div class="phone"><span class="phone__notch" aria-hidden="true"></span>${video({ file: 'depois.mp4', poster: 'depois-poster.webp', desc: 'o mesmo trecho editado pela skill', ratio: '9/16' })}</div>
      </figure>
    </div>
  </div>
</section>`;
