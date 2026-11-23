// ─────────────────────────────────────────────────────────────
// CONTEÚDO COMPARTILHADO — vale para todas as variantes.
// O que muda por público (hero, dor, meta) fica em src/variants/.
// Regra: nada de depoimento, número ou nome inventado.
// ─────────────────────────────────────────────────────────────
export default {
  chips: ['Cortes automáticos', 'Legendas', 'Zoom e ritmo'],

  how: {
    title: 'Três passos. O <span class="grad">braçal</span> fica com a skill.',
    skillDef:
      'Uma skill é um pacote de instruções que ensina o Claude a fazer uma tarefa do jeito certo, sempre.',
    steps: [
      { title: 'Instale a skill no Claude Code', text: (s, f) => `Siga o guia passo a passo. Leva ${f(s.times.install, 'tempo de instalação', ' minutos')}.` },
      { title: 'Mande o vídeo cru e diga o estilo', text: () => 'Aponte o arquivo bruto e diga como quer: ritmo de Reels, podcast, aula. Ela corta silêncios e erros sozinha.' },
      { title: 'Abra a timeline pronta no Premiere', text: () => 'Os cortes, legendas e zooms já estão na timeline. Você revisa e ajusta o que quiser, como sempre fez.' },
    ],
  },

  // Itens do pacote. `confirm: true` = rascunho tirado do plano de oferta
  // (docs/02-oferta.md); a página marca para conferir. Troque para false
  // depois de confirmar que o item realmente vem no produto.
  deliverables: [
    { title: 'Skill Edição Mestra', text: 'O pacote que corta, legenda e dá ritmo ao vídeo direto no Premiere.', tag: 'Núcleo', confirm: true },
    { title: 'Guia de instalação', text: 'Vídeo e passo a passo para instalar e conectar ao Premiere.', tag: 'M1', confirm: true },
    { title: 'Corte de silêncios e erros', text: 'O módulo que tira pausas, gaguejos e repetições do bruto.', tag: 'M2', confirm: true },
    { title: 'Legendas, zooms e motion', text: 'Estilos prontos de legenda e zoom para segurar a atenção.', tag: 'M3', confirm: true },
    { title: 'Fluxo completo', text: 'Do bruto ao vídeo pronto para postar, num fluxo só.', tag: 'M4', confirm: true },
    { title: 'Bônus: checklist de retenção 3s', text: 'O que conferir nos primeiros segundos antes de publicar.', tag: 'Bônus', confirm: true },
  ],

  audience: {
    yes: ['Creator que posta todo dia', 'Editor freelancer que quer entregar mais', 'Quem já usa o Premiere'],
    no: ['Quem não usa o Premiere', 'Quem procura um app de celular', 'Quem não pode assinar um plano pago do Claude'],
  },

  // Depoimentos REAIS com autorização. Lista vazia = seção escondida.
  // Formato: { name: 'Nome', handle: '@perfil', text: '...', photo: 'depo-1.webp' }
  testimonials: [],

  // Quem criou. Foto em assets/ (WebP 4:5, ex.: 800×1000).
  authors: [
    { name: 'Samuel Braga', role: 'Criador da Edição Mestra', bio: '', photo: 'autor.webp' },
  ],

  offer: {
    includes: ['Skill Edição Mestra', 'Guia de instalação passo a passo', 'Estilos de legenda e zoom', 'Atualizações da versão comprada'],
    badges: ['Garantia de 7 dias', 'Acesso imediato por e-mail', 'Pix ou cartão'],
  },

  guarantee: {
    title: 'Teste por 7 dias.',
    text: 'Se não editar mais rápido, devolvemos 100% do valor. É só pedir pela plataforma de pagamento, sem perguntas. Esse direito é seu por lei (art. 49 do CDC), e a gente prefere deixar isso claro antes da compra.',
  },

  faq: [
    { q: 'Preciso saber programar?', a: () => 'Não. Você só copia os comandos do guia e conversa com o Claude em português. Se você sabe abrir o Premiere, consegue instalar.' },
    { q: 'Preciso pagar o Claude?', a: (s, f) => `Sim. O Claude Code exige um plano pago do Claude: ${f(s.requirements.claudePlan, 'qual plano e quanto custa')}. A Edição Mestra é paga uma vez só; a assinatura do Claude é à parte.` },
    { q: 'Funciona em qual versão do Premiere?', a: (s, f) => `${f(s.requirements.premiereVersion, 'versão do Premiere testada')}.` },
    { q: 'Funciona no Mac e no Windows?', a: (s, f) => `${f(s.requirements.os, 'sistemas testados')}.` },
    { q: 'Como recebo o acesso?', a: () => 'Logo depois do pagamento aprovado você recebe um e-mail com o acesso à área de membros, o download da skill e o guia de instalação. No Pix, a aprovação é na hora.' },
    { q: 'E se eu não gostar?', a: () => 'Você tem 7 dias para pedir o reembolso pela plataforma de pagamento e recebe 100% do valor de volta.' },
  ],


  // Chamadas de compra entre as seções. Cada uma responde à seção
  // anterior e empurra para o checkout. Variantes podem sobrescrever
  // qualquer chave com `ctas: { chave: {...} }`.
  // Regra: urgência só com motivo real (sem contador falso, sem "últimas vagas").
  ctas: {
    pain: {
      title: 'Seu próximo vídeo não precisa perder ninguém no segundo 3.',
      sub: 'A skill corta silêncio, legenda e dá ritmo por você. Uma vez R$37, todos os vídeos depois disso.',
      button: 'Quero vídeos que seguram',
    },
    how: {
      title: 'Instala hoje. Edita o próximo vídeo já com a skill.',
      sub: 'O acesso chega no seu e-mail logo depois do pagamento. No Pix, na hora.',
      button: 'Quero começar agora',
    },
    beforeAfter: {
      title: 'Esse "depois" pode ser o seu próximo vídeo.',
      sub: 'Você paga uma vez e usa em todos os vídeos que editar.',
      button: 'Quero esse resultado',
    },
    deliverables: {
      title: 'Tudo isso por R$37. Uma vez só.',
      sub: 'Sem mensalidade da skill. Menos do que custa uma hora sua presa na timeline.',
      button: 'Garantir minha skill',
    },
    audience: {
      title: 'Se você se viu na primeira coluna, ela foi feita para você.',
      sub: 'Quanto antes instalar, mais vídeos saem editados no ritmo certo esta semana.',
      button: 'É pra mim, quero agora',
    },
    guarantee: {
      title: 'O risco fica com a gente.',
      sub: 'Teste por 7 dias. Se não editar mais rápido, você pede e recebe 100% de volta.',
      button: 'Testar por 7 dias',
    },
  },

  finalCta: 'Edite mais rápido, poste mais e deixe o braçal com a skill.',
};
