import { fill } from '../lib/helpers.mjs';

export default ({ site }) => {
  const l = site.legal;
  const link = (url, label) => (url ? `<a href="${url}">${label}</a>` : `${label} ${fill('', `link de ${label.toLowerCase()}`)}`);
  return `
<footer class="footer">
  <div class="wrap footer__in">
    <p class="logo"><i aria-hidden="true"></i>${site.brand}</p>
    <p>${fill(l.owner, 'nome ou razão social')} · ${fill(l.document, 'CPF ou CNPJ')}</p>
    <p class="footer__links">${link(l.termsUrl, 'Termos de uso')} · ${link(l.privacyUrl, 'Privacidade')}${l.contactEmail ? ` · <a href="mailto:${l.contactEmail}">${l.contactEmail}</a>` : ''}</p>
    <p class="footer__disc">Este site não é afiliado à Anthropic nem à Adobe. Claude é marca da Anthropic; Premiere é marca da Adobe.</p>
  </div>
</footer>`;
};
