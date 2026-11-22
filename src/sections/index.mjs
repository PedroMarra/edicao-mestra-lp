// Ordem das seções da página. 'cta:<chave>' insere uma chamada de compra
// com o texto de content.ctas.<chave>. Para reordenar ou tirar uma seção numa
// variante, passe `sections: [...]` no arquivo da variante.
import topbar from './topbar.mjs';
import hero from './hero.mjs';
import pain from './pain.mjs';
import how from './how.mjs';
import beforeAfter from './before-after.mjs';
import deliverables from './deliverables.mjs';
import audience from './audience.mjs';
import proof from './proof.mjs';
import author from './author.mjs';
import offer from './offer.mjs';
import guarantee from './guarantee.mjs';
import faq from './faq.mjs';
import finalCta from './final-cta.mjs';
import footer from './footer.mjs';
import stickyCta from './sticky-cta.mjs';
import divider from './divider.mjs';
import ctaBand from './cta-band.mjs';

export { ctaBand };
export const registry = { topbar, hero, pain, how, beforeAfter, deliverables, audience, proof, author, offer, guarantee, faq, finalCta, footer, stickyCta, divider };

export const defaultOrder = [
  'topbar', 'hero', 'divider',
  'pain', 'cta:pain',
  'how', 'cta:how',
  'beforeAfter', 'cta:beforeAfter', 'divider',
  'deliverables', 'cta:deliverables',
  'audience', 'cta:audience',
  'proof', 'author', 'offer',
  'guarantee', 'cta:guarantee',
  'faq', 'finalCta', 'footer', 'stickyCta',
];
