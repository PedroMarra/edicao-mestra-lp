// Variante FREELANCER — casa com o criativo A ("Editor que entrega em 24h").
export default {
  slug: 'freelancer',
  out: 'freelancer.html',
  meta: {
    title: 'Edição Mestra · Entregue em 24h sem virar a noite',
    description: 'Skill para usar com o Claude que faz o corte braçal no Premiere. Entregue mais rápido e atenda mais clientes. R$37, pagamento único.',
  },
  hero: {
    eyebrow: 'Skill do Claude para editores',
    title: 'Editor que entrega em <span class="grad">24h</span> pode cobrar mais caro.',
    altTitle: 'Corte o bruto em {after}, não numa tarde inteira.',
    sub: 'Uma skill do Claude que faz o corte braçal, as legendas e os zooms direto no Premiere. Você entrega mais rápido e usa seu tempo no que o cliente paga: o criativo.',
    cta: 'Quero entregar mais rápido',
  },
  pain: {
    title: 'O bruto de 20 minutos é <span class="grad">silêncio</span> pela metade.',
    chart: 'cuts',
    items: [
      { k: 'Corte braçal', t: 'Tirar pausa, erro e repetição de cada cliente é o trabalho que ninguém vê e todo mundo cobra pouco.' },
      { k: 'Prazo apertado', t: 'Três clientes no mesmo dia e a entrega vira madrugada.' },
      { k: 'Job recusado', t: 'Sem tempo sobrando, você diz não para o cliente que pagaria mais.' },
    ],
  },
  ctas: {
    pain: {
      title: 'Cada bruto que a skill corta é uma entrega a mais na sua semana.',
      sub: 'O braçal fica com ela. Você fica com o criativo, que é o que o cliente paga. R$37, uma vez.',
      button: 'Quero entregar mais rápido',
    },
    beforeAfter: {
      title: 'Imagine entregar esse "depois" no mesmo dia.',
      sub: 'Você paga uma vez e usa em todos os jobs, de todos os clientes.',
      button: 'Quero entregar assim',
    },
    deliverables: {
      title: 'Tudo isso por R$37. Se paga no primeiro job.',
      sub: 'Sem mensalidade da skill. Menos do que você cobra por um corte simples.',
      button: 'Garantir minha skill',
    },
    audience: {
      title: 'Se você vive com prazo apertado, ela foi feita para você.',
      sub: 'Instale hoje e já entregue o próximo cliente com a skill.',
      button: 'É pra mim, quero agora',
    },
  },
};
