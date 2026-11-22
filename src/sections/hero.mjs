import { cta, priceLine, video, fill } from '../lib/helpers.mjs';

export default ({ site, v, c }) => {
  const after = fill(site.times.after, 'Y', ` ${site.times.afterUnit}`);
  const title = v.hero.title.replace('{after}', after);
  const alt = (v.hero.altTitle || '').replace('{after}', `${site.times.after || 'Y'} ${site.times.afterUnit}`);
  const req = [site.requirements.claudePlan ? `Claude Code (${site.requirements.claudePlan})` : 'Claude Code (plano pago do Claude)', 'Adobe Premiere'].join(' + ');
  return `
<section class="hero aurora" id="topo">
  <div class="wrap hero__grid">
    <div class="hero__copy">
      <p class="eyebrow">${v.hero.eyebrow}</p>
      <h1>${title}</h1>
      <!-- H1 alternativo para teste A/B: <h1>${alt}</h1> -->
      <p class="lead">${v.hero.sub}</p>
      <ul class="chips" aria-label="O que a skill faz">${c.chips.map((x) => `<li>${x}</li>`).join('')}</ul>
      <div class="hero__cta">
        ${cta(site, v.hero.cta, 'hero-cta')}
        ${priceLine(site)}
        <p class="req">Requer ${req}.</p>
      </div>
    </div>
    <div class="hero__media">
      <div class="screen">
        <div class="screen__bar" aria-hidden="true"><i></i><i></i><i></i><span>timeline · sequência 01</span></div>
        <div class="screen__body">
          ${video({ file: 'demo.mp4', poster: 'demo-poster.webp', desc: 'vídeo demo de 15–30s, Claude Code + Premiere editando', hero: true, label: 'Demonstração da Edição Mestra editando no Premiere' })}
          <span class="screen__tc" aria-hidden="true" data-timecode>00:00:14:22</span>
          <span class="screen__scan" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  </div>
</section>`;
};
