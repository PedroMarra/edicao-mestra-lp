// Helpers de template usados por todas as seções.
import { existsSync } from 'node:fs';
import { join } from 'node:path';

export const ASSETS_DIR = new URL('../../assets/', import.meta.url).pathname;
export const hasAsset = (file) => !!file && existsSync(join(ASSETS_DIR, file));

/** Bloco/trecho visível [PREENCHER] quando o valor está vazio. */
export const fill = (value, desc, suffix = '') =>
  value ? `${value}${suffix}` : `<span class="fill">[PREENCHER: ${desc}]</span>`;

export const fillBlock = (desc, ratio = '16/9') =>
  `<div class="fill-block" style="aspect-ratio:${ratio}"><span>[PREENCHER: ${desc}]</span></div>`;

export const join_ = (arr, fn) => arr.map(fn).join('');

/** Botão principal. data-cta é lido pelo main.js (UTM + pixel). */
export const cta = (site, label, id = '') =>
  `<a class="btn" ${id ? `id="${id}"` : ''} data-cta href="${site.checkoutUrl || '#oferta'}"><span class="btn__label">${label}</span><svg class="btn__arrow" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 10h11m-4-4 4 4-4 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`;

/** "R$36,99" → 36.99 */
export const money = (s) => +String(s).replace(/[^\d,]/g, '').replace(',', '.');
export const brl = (n) => 'R$' + n.toFixed(2).replace('.', ',').replace(',00', '');

/** Lançamento ativo = preço depois do prazo + prazo real definidos. */
export const launch = (site) => {
  const until = site.deadline?.until, after = site.price.after;
  if (!until || !after) return null;
  const now = money(site.price.value), later = money(after);
  return {
    until, after,
    date: `${until.slice(8, 10)}/${until.slice(5, 7)}`,
    hour: until.slice(11, 16).replace(':', 'h'),
    save: brl(later - now),
    off: Math.round((1 - now / later) * 100),
  };
};

/** Trecho que some sozinho quando o prazo acaba (main.js). */
export const onlyLaunch = (html) => `<span data-launch>${html}</span>`;

export const priceLine = (site) => {
  const L = launch(site);
  return `<p class="price-line">${site.price.value}${L ? onlyLaunch(` no lançamento (depois ${L.after})`) : ''} · ${site.price.note} · ${site.price.access}</p>`;
};

/** Rótulo de seção em timecode. */
export const tc = (n, label) => {
  const s = String(n).padStart(2, '0');
  return `<p class="tc"><span data-tc="${n}">00:00:${s}:00</span> ${label}</p>`;
};

/** Vídeo se o arquivo existir em assets/, senão o bloco [PREENCHER].
 *  Nada de vídeo baixa no carregamento: o do hero entra depois que a página
 *  abre (main.js), e os outros só baixam no play. O poster carrega perto da tela. */
export const video = ({ file, poster, desc, ratio = '16/9', hero = false, label = '', small = '', smallPoster = '' }) => {
  if (!hasAsset(file)) return fillBlock(`${desc} (assets/${file})`, ratio);
  const vtt = file.replace(/\.mp4$/, '.vtt');
  const track = hasAsset(vtt) ? `<track kind="captions" srclang="pt-BR" label="Português" src="assets/${vtt}" default>` : '';
  const aria = `aria-label="${label || desc}"`;
  if (hero) {
    const lg = `assets/${file}`, sm = hasAsset(small) ? `assets/${small}` : lg;
    const pLg = hasAsset(poster) ? `assets/${poster}` : '', pSm = hasAsset(smallPoster) ? `assets/${smallPoster}` : pLg;
    return `<video data-hero data-src="${lg}" data-src-sm="${sm}" muted loop playsinline preload="none" style="aspect-ratio:${ratio}" ${aria}></video>`
      + (pLg ? `<picture class="video-poster"><source media="(max-width: 959px)" srcset="${pSm}"><img src="${pLg}" alt="" width="1280" height="720" fetchpriority="high" decoding="async"></picture>` : '');
  }
  const posterAttr = hasAsset(poster) ? ` data-poster="assets/${poster}"` : '';
  return `<video muted loop playsinline controls preload="none"${posterAttr} style="aspect-ratio:${ratio}" ${aria}><source src="assets/${file}" type="video/mp4">${track}</video>`;
};

/** Imagem se existir, senão [PREENCHER]. */
export const img = ({ file, alt, w, h, desc, cls = '' }) =>
  hasAsset(file)
    ? `<img class="${cls}" src="assets/${file}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async">`
    : fillBlock(`${desc} (assets/${file})`, `${w}/${h}`);
