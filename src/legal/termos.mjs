import { contact } from './shared.mjs';

export default {
  out: 'termos.html',
  title: 'Termos de Uso',
  description: 'Condições de compra e uso da Edição Mestra.',
  body: (site) => `
<p class="legal__lead">Ao comprar ou usar a ${site.brand}, você concorda com os termos abaixo. Eles são curtos de propósito: leia antes de comprar.</p>

<h2>1. O que é o produto</h2>
<p>A ${site.brand} é uma skill (um pacote de instruções e arquivos) para usar com o Claude Code, que automatiza etapas da edição de vídeo no Adobe Premiere, acompanhada de guia de instalação e materiais de apoio. É um produto digital, entregue por download.</p>

<h2>2. O que você precisa ter</h2>
<p>Para usar a skill você precisa de um computador compatível, do Adobe Premiere e do Claude Code com um plano pago do Claude (Pro ou superior). Essas ferramentas são contratadas por você, diretamente com a Adobe e com a Anthropic, e não estão incluídas no preço. A ${site.brand} não é afiliada nem endossada pela Anthropic ou pela Adobe.</p>

<h2>3. Acesso e entrega</h2>
<p>Depois do pagamento aprovado, você recebe o acesso no e-mail informado na compra. No Pix a aprovação costuma ser imediata; no cartão, pode levar alguns minutos.</p>

<h2>4. Licença de uso</h2>
<p>Você recebe uma licença pessoal e intransferível para usar a skill nos seus projetos e nos projetos dos seus clientes. Não é permitido revender, redistribuir, compartilhar o download ou publicar o conteúdo da skill, no todo ou em parte.</p>

<h2>5. Garantia e reembolso</h2>
<p>Você tem 7 dias corridos, a partir da compra, para pedir o reembolso integral, sem precisar justificar (art. 49 do Código de Defesa do Consumidor). O pedido é feito pela própria Cackto (no e-mail da compra) ou falando com a gente.</p>

<h2>6. Resultados</h2>
<p>O tempo de edição depende do vídeo, do computador, da versão das ferramentas e da sua experiência. Os tempos mostrados na página (como "3 horas → 10 minutos") são da experiência do criador e servem de referência, não de promessa. Revise sempre o resultado antes de publicar ou entregar a um cliente.</p>

<h2>7. Atualizações e compatibilidade</h2>
<p>Você tem acesso às atualizações da versão 1.x. Mudanças feitas pela Adobe ou pela Anthropic nas ferramentas podem afetar o funcionamento da skill; nesses casos buscamos publicar correções, mas não garantimos compatibilidade com todas as versões futuras.</p>

<h2>8. Responsabilidade</h2>
<p>Recomendamos trabalhar sempre com cópia de segurança dos seus projetos. Não nos responsabilizamos por perda de arquivos, por uso fora do que está descrito no guia ou por falhas das ferramentas de terceiros.</p>

<h2>9. Mudanças nestes termos</h2>
<p>Podemos atualizar estes termos. A versão em vigor é sempre a publicada nesta página, com a data no topo.</p>

<h2>10. Contato</h2>
<p>Fale com a gente ${contact(site)}.</p>
`,
};
