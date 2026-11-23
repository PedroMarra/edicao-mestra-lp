// Corpo das páginas de Termos e Privacidade (usa o mesmo <head> e CSS).
import footer from '../sections/footer.mjs';

export default ({ site, doc }) => `
<header class="legal-top">
  <div class="wrap legal-top__in">
    <a class="logo" href="./"><i aria-hidden="true"></i>${site.brand}</a>
    <a class="legal-top__back" href="./">Voltar para a página</a>
  </div>
</header>
<main class="legal" id="dor">
  <div class="wrap narrow">
    <p class="tc"><span>Atualizado em</span> ${site.legal.updated}</p>
    <h1>${doc.title}</h1>
    ${doc.body(site)}
  </div>
</main>
${footer({ site })}`;
