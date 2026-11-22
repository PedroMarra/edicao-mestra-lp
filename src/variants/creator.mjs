// Variante CREATOR — casa com o criativo B ("Seu vídeo não segura ninguém").
// Para criar uma nova variante: copie este arquivo, troque `slug`/`out`
// e os textos. O build gera uma página para cada arquivo desta pasta.
export default {
  slug: 'creator',
  out: 'index.html',
  meta: {
    title: 'Edição Mestra · Seu vídeo com ritmo, editado em minutos',
    description: 'Skill para usar com o Claude que corta, legenda e dá ritmo ao seu vídeo direto no Premiere. R$37, pagamento único.',
  },
  hero: {
    eyebrow: 'Skill do Claude para Premiere',
    // {after} vira o tempo de config.times.after (ou [PREENCHER]).
    title: 'Seu vídeo não segura ninguém. A Edição Mestra edita com <span class="grad">ritmo</span> em {after}.',
    // Teste A/B (troque por esta para testar):
    altTitle: 'Edite em <span class="grad">minutos</span> o vídeo que levava a tarde toda.',
    sub: 'Uma skill do Claude que corta, legenda e dá ritmo ao seu vídeo direto no Premiere. Você manda o vídeo cru, ela devolve a timeline editada.',
    cta: 'Quero editar mais rápido',
  },
  pain: {
    title: 'Quem sai do seu vídeo nos primeiros <span class="grad">3 segundos</span> não volta.',
    chart: 'retention',
    items: [
      { k: 'Horas na timeline', t: 'Cortar silêncio, gaguejo e repetição na mão come a tarde inteira.' },
      { k: 'Vídeo parado', t: 'Sem cortes e zooms no ritmo certo, o dedo rola antes do segundo 3.' },
      { k: 'Postar pouco', t: 'Se cada vídeo custa horas, você posta menos do que o algoritmo pede.' },
    ],
  },
};
