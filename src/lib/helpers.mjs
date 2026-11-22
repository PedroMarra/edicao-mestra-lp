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

export const priceLine = (site) =>
  `<p class="price-line">${site.price.value} · ${site.price.note} · ${site.price.access}</p>`;

/** Rótulo de seção em timecode. */
export const tc = (n, label) => {
  const s = String(n).padStart(2, '0');
  return `<p class="tc"><span>00:00:${s}:00</span> ${label}</p>`;
};

/** Vídeo se o arquivo existir em assets/, senão o bloco [PREENCHER]. */
export const video = ({ file, poster, desc, ratio = '16/9', hero = false, label = '' }) => {
  if (!hasAsset(file)) return fillBlock(`${desc} (assets/${file})`, ratio);
  const posterAttr = hasAsset(poster) ? ` poster="assets/${poster}"` : '';
  const vtt = file.replace(/\.mp4$/, '.vtt');
  const track = hasAsset(vtt) ? `<track kind="captions" srclang="pt-BR" label="Português" src="assets/${vtt}" default>` : '';
  const attrs = hero
    ? 'autoplay muted loop playsinline preload="auto"'
    : 'muted loop playsinline controls preload="metadata"';
  return `<video ${attrs}${posterAttr} style="aspect-ratio:${ratio}" aria-label="${label || desc}"><source src="assets/${file}" type="video/mp4">${track}</video>`;
};

/** Imagem se existir, senão [PREENCHER]. */
export const img = ({ file, alt, w, h, desc, cls = '' }) =>
  hasAsset(file)
    ? `<img class="${cls}" src="assets/${file}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async">`
    : fillBlock(`${desc} (assets/${file})`, `${w}/${h}`);
