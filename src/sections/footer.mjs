export default ({ site }) => {
  const l = site.legal;
  const contact = [
    l.instagram ? `<a href="https://www.instagram.com/${l.instagram}/" target="_blank" rel="noopener">@${l.instagram}</a>` : '',
    l.contactEmail ? `<a href="mailto:${l.contactEmail}">${l.contactEmail}</a>` : '',
  ].filter(Boolean).join(' · ');
  return `
<footer class="footer">
  <div class="wrap footer__in">
    <p class="logo"><i aria-hidden="true"></i>${site.brand}</p>
    <p class="footer__links"><a href="termos.html">Termos de uso</a> · <a href="privacidade.html">Privacidade</a>${contact ? ` · ${contact}` : ''}</p>
    <p>© ${new Date().getFullYear()} ${site.brand}. Pagamento processado pela plataforma de pagamento parceira.</p>
    <p class="footer__disc">Este site não é afiliado à Anthropic nem à Adobe. Claude é marca da Anthropic; Premiere é marca da Adobe.</p>
  </div>
</footer>`;
};
