import { contact } from './shared.mjs';

export default {
  out: 'privacidade.html',
  title: 'Política de Privacidade',
  description: 'Como a Edição Mestra trata os seus dados pessoais, de acordo com a LGPD.',
  body: (site) => `
<p class="legal__lead">Esta política explica quais dados a ${site.brand} recebe, para que usa e como você pode pedir acesso, correção ou exclusão, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018).</p>

<h2>1. Quais dados recebemos</h2>
<p><strong>Nesta página</strong> não há formulário: você não digita nenhum dado aqui. Podemos usar ferramentas de medição de anúncios (Pixel da Meta e do TikTok) que registram, por meio de cookies, informações de navegação como páginas visitadas, cliques nos botões, tipo de aparelho e a campanha de onde você veio (parâmetros UTM).</p>
<p><strong>Na compra</strong>, o pagamento acontece na plataforma de pagamento parceira, e não neste site. Os dados do cartão ou do Pix ficam com essa plataforma, sob a política de privacidade dela. Recebemos dela apenas o necessário para entregar o produto: nome, e-mail, telefone (se informado) e a situação da compra.</p>

<h2>2. Para que usamos</h2>
<ul>
  <li>Liberar o seu acesso à skill e ao material.</li>
  <li>Prestar suporte e responder às suas mensagens.</li>
  <li>Avisar sobre atualizações do produto que você comprou.</li>
  <li>Medir o resultado dos anúncios e melhorar esta página.</li>
</ul>

<h2>3. Com quem compartilhamos</h2>
<p>Com a plataforma de pagamento (para processar a compra e o reembolso), com a Meta e o TikTok (medição de anúncios, quando ativos) e com o serviço de hospedagem do site. <strong>Não vendemos nem alugamos seus dados.</strong></p>

<h2>4. Por quanto tempo guardamos</h2>
<p>Enquanto for necessário para manter seu acesso, dar suporte e cumprir obrigações legais. Depois disso, os dados são excluídos ou anonimizados.</p>

<h2>5. Cookies</h2>
<p>Você pode bloquear ou apagar cookies nas configurações do seu navegador. A página continua funcionando normalmente; apenas a medição dos anúncios deixa de considerar a sua visita.</p>

<h2>6. Seus direitos</h2>
<p>Você pode pedir, a qualquer momento: confirmação de que tratamos seus dados, acesso a eles, correção, exclusão, portabilidade e informação sobre com quem foram compartilhados (art. 18 da LGPD). Basta falar com a gente ${contact(site)}.</p>

<h2>7. Contato</h2>
<p>Dúvidas sobre esta política: ${contact(site)}.</p>
`,
};
