// Contato usado nos textos legais.
export const contact = (site) => {
  const l = site.legal;
  const parts = [];
  if (l.instagram) parts.push(`pelo Instagram <a href="https://www.instagram.com/${l.instagram}/" target="_blank" rel="noopener">@${l.instagram}</a> (mensagem direta)`);
  if (l.contactEmail) parts.push(`pelo e-mail <a href="mailto:${l.contactEmail}">${l.contactEmail}</a>`);
  return parts.join(' ou ');
};
