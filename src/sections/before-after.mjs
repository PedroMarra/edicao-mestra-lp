import { tc, fill, video } from '../lib/helpers.mjs';

// Prova: (1) antes e depois do próprio vídeo, (2) vídeo pronto feito com a
// skill e (3) exemplo de cliente com os dois vídeos tocando sincronizados.
export default ({ site }) => `
<section class="sec" id="antes-depois">
  <div class="wrap">
    ${tc(15, 'Antes e depois')}
    <h2>O mesmo vídeo, <span class="grad">antes e depois</span>.</h2>
    <p class="bignum"><span>${fill(site.times.before, 'X horas')}</span><i aria-hidden="true">→</i><span class="grad">${fill(site.times.after, 'Y minutos', ` ${site.times.afterUnit}`)}</span></p>
    <div class="ba ba--proof">
      <figure class="ba__item">
        <figcaption><span class="tag">Antes e depois</span> o mesmo vídeo, lado a lado</figcaption>
        <div class="phone"><span class="phone__notch" aria-hidden="true"></span>${video({ file: 'prova.mp4', poster: 'prova-poster.webp', desc: 'antes e depois do mesmo vídeo', ratio: '9/16' })}</div>
      </figure>
      <figure class="ba__item">
        <figcaption><span class="tag tag--on">Com a skill</span> pronto para postar em ${site.times.after || 'Y'} ${site.times.afterUnit}</figcaption>
        <div class="phone"><span class="phone__notch" aria-hidden="true"></span>${video({ file: 'resultado.mp4', poster: 'resultado-poster.webp', desc: 'vídeo final editado com a skill', ratio: '9/16' })}</div>
      </figure>
    </div>

    <div class="ba-extra">
      <p class="tc"><span>+</span> Vídeo de cliente</p>
      <p class="ba__hint">Dê play em um e os dois tocam juntos.</p>
      <div class="ba" data-sync>
        <figure class="ba__item">
          <figcaption><span class="tag">Antes</span> sem legenda, motion nem zoom</figcaption>
          <div class="screen screen--flat">${video({ file: 'cliente-antes.mp4', poster: 'cliente-antes-poster.webp', desc: 'vídeo de cliente sem edição', ratio: '9/16' })}</div>
        </figure>
        <figure class="ba__item">
          <figcaption><span class="tag tag--on">Depois</span> legendas, motion e zooms</figcaption>
          <div class="phone"><span class="phone__notch" aria-hidden="true"></span>${video({ file: 'cliente-depois.mp4', poster: 'cliente-depois-poster.webp', desc: 'vídeo de cliente editado', ratio: '9/16' })}</div>
        </figure>
      </div>
    </div>
  </div>
</section>`;
