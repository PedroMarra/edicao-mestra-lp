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
      { title: 'Instale a skill no Claude Code', text: (s, f) => `Siga o guia passo a passo (Mac ou Windows). Leva ${f(s.times.install, 'tempo de instalação')}. Um comando no fim confere se está tudo certo.` },
      { title: 'Mande o vídeo cru e diga o estilo', text: () => 'Aponte o arquivo bruto e diga como quer: ritmo de Reels, podcast, aula. Ela corta silêncios e erros sozinha.' },
      { title: 'Abra a timeline pronta no Premiere', text: () => 'Os cortes, legendas e zooms já estão na timeline. Você revisa e ajusta o que quiser, como sempre fez.' },
    ],
  },

  // Itens do pacote. `confirm: true` = rascunho tirado do plano de oferta
  // (docs/02-oferta.md); a página marca para conferir. Troque para false
  // depois de confirmar que o item realmente vem no produto.
  deliverables: [
    { title: 'Skill Edição Mestra v1.0', text: 'Corta, legenda, põe zoom, motion e efeitos sonoros e acerta o volume para as redes. Sons e fontes já liberados para uso comercial.', tag: 'Núcleo' },
    { title: 'Corte pelo som', text: 'Tira silêncios, respirações, "éé", gaguejos, erros e retomadas do bruto, com jump cut e zoom.', tag: 'Corte' },
    { title: '7 estilos de motion', text: 'Motion graphics preso à palavra falada, incluindo o estilo "Edição Futurística", com bases prontas em código.', tag: 'Motion' },
    { title: 'Montagem no Premiere', text: 'Monta a sequência direto no Premiere (com um conector do Premiere) ou entrega vídeo, legendas e XML para você importar.', tag: 'Premiere' },
    { title: 'Ficha de cada cliente', text: 'Cadastre a identidade de cada cliente uma vez. A skill segue as regras dele em todo vídeo novo.', tag: 'Clientes' },
    { title: 'Guia de instalação', text: 'Passo a passo para Mac e Windows, com um comando que confere se falta alguma coisa.', tag: 'Guia' },
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
    { name: 'Samuel Braga', role: 'Criador da Edição Mestra', handle: 'samuelrmbraga',
      bio: 'Piauiense criado em Brasília, é videomaker desde os 18 anos. Começou fotografando na igreja e hoje tem a IA como braço direito no processo criativo e profissional. A Edição Mestra é esse jeito de trabalhar, empacotado para você usar.', photo: 'autor.webp' },
  ],

  offer: {
    includes: ['Skill Edição Mestra v1.0', 'Corte, legendas, zoom, SFX e 7 estilos de motion', 'Guia de instalação para Mac e Windows', 'Licença para editar vídeos de clientes', 'Atualizações da versão 1.x'],
    badges: ['Garantia de 7 dias', 'Acesso imediato por e-mail', 'Pix ou cartão'],
  },

  guarantee: {
    title: 'Teste por 7 dias.',
    text: 'Se não editar mais rápido, devolvemos 100% do valor. É só pedir pela Cakto, sem perguntas. Esse direito é seu por lei (art. 49 do CDC), e a gente prefere deixar isso claro antes da compra.',
  },

  faq: [
    { q: 'Preciso saber programar?', a: () => 'Não. Na instalação você copia alguns comandos do guia e cola no terminal, e um comando de conferência avisa se faltou algo. Depois é só conversar com o Claude em português.' },
    { q: 'Preciso pagar o Claude?', a: (s, f) => `Sim. O Claude Code exige um plano pago do Claude: ${f(s.requirements.claudePlan, 'qual plano e quanto custa')}. A Edição Mestra é paga uma vez só; a assinatura do Claude é à parte.` },
    { q: 'Ela mexe no Premiere sozinha?', a: () => 'Sim, com um conector do Premiere (servidor MCP) que você liga ao Claude Code uma vez, seguindo o guia. Sem o conector, a skill entrega o vídeo cortado, as legendas e um arquivo XML para você importar no Premiere.' },
    { q: 'Posso usar em vídeos de clientes?', a: () => 'Pode. A licença permite editar vídeos seus e dos seus clientes, inclusive cobrando pelo trabalho. Só não pode revender nem compartilhar a skill.' },
    { q: 'Funciona em qual versão do Premiere?', a: (s, f) => `${f(s.requirements.premiereVersion, 'versão do Premiere testada')}.` },
    { q: 'Funciona no Mac e no Windows?', a: (s, f) => `${f(s.requirements.os, 'sistemas testados')}.` },
    { q: 'Como recebo o acesso?', a: (s) => `Logo depois do pagamento aprovado você recebe um e-mail da Cakto com o acesso à área de membros, o download da skill e o guia de instalação. No Pix, a aprovação é na hora. Se o e-mail não chegar, confira o spam ou escreva para <a href="mailto:${s.legal.contactEmail}">${s.legal.contactEmail}</a>.` },
    { q: 'E se eu travar na instalação?', a: (s) => `Você tem suporte direto: mande um e-mail para <a href="mailto:${s.legal.contactEmail}">${s.legal.contactEmail}</a> ou uma mensagem no Instagram <a href="https://www.instagram.com/${s.legal.instagram}/" target="_blank" rel="noopener">@${s.legal.instagram}</a> que a gente te ajuda a deixar tudo funcionando.` },
    { q: 'E se eu não gostar?', a: () => 'Você tem 7 dias para pedir o reembolso pela Cakto e recebe 100% do valor de volta.' },
  ],


  // Chamadas de compra entre as seções. Cada uma responde à seção
  // anterior e empurra para o checkout. Variantes podem sobrescrever
  // qualquer chave com `ctas: { chave: {...} }`.
  // Regra: urgência só com motivo real (sem contador falso, sem "últimas vagas").
  ctas: {
    pain: {
      title: 'Seu próximo vídeo não precisa perder ninguém no segundo 3.',
      sub: 'A skill corta silêncio, legenda e dá ritmo por você. Uma vez R$36,99, todos os vídeos depois disso.',
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
      title: 'Tudo isso por R$36,99. Uma vez só.',
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
