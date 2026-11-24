// ─────────────────────────────────────────────────────────────
// CONFIGURAÇÃO GLOBAL — o único arquivo que você precisa mexer
// para preço, checkout, pixels, tempos e rodapé.
// Campo vazio ("") = a página mostra um bloco [PREENCHER].
// Depois de editar: rode `node build.mjs`.
// ─────────────────────────────────────────────────────────────
export default {
  brand: 'Edição Mestra',
  // Endereço oficial (Vercel). Usado no canonical, Open Graph e sitemap.
  // Ao comprar domínio próprio, troque aqui (ou defina SITE_URL na Vercel).
  domain: 'https://edicao-mestra-lp.vercel.app',

  // Link do checkout da Cakto (ex.: https://pay.cakto.com.br/xxxxx),
  // com o order bump já configurado lá dentro.
  // Todos os botões apontam para cá e herdam os UTMs da página.
  checkoutUrl: 'https://pay.cakto.com.br/d77sy56_1363931',

  price: {
    value: 'R$36,99',
    // Preço que passa a valer DEPOIS do prazo (deadline.until). Precisa ser
    // cobrado de verdade a partir dessa data (troque também na Cakto).
    // Vazio = sem bloco de lançamento.
    after: 'R$67',
    // Só preencha se o preço "de" existiu de verdade (CDC). Senão, deixe ''.
    anchor: '',
    note: 'pagamento único',
    access: 'acesso imediato',
  },

  // Prazo REAL da oferta (contador regressivo na caixa de preço).
  // Vazio = sem contador. Só preencha se o preço/bônus mudar de verdade
  // nessa data e for igual para todo mundo (CDC art. 37).
  // Formato: '2026-12-07T23:59:00-03:00' (horário de Brasília).
  // Depois do prazo o contador some sozinho; troque o preço aqui.
  deadline: {
    until: '2026-11-30T23:59:00-03:00',
    label: 'Esse preço acaba em',
  },

  // Tempos medidos de verdade (vídeo real, com gravação).
  // Ex.: before: '3 horas', after: '12', afterUnit: 'minutos'.
  times: {
    before: '3 horas',
    after: '10',
    afterUnit: 'minutos',
    // Tempo real do guia da skill v1.0 (LEIA-PRIMEIRO.md).
    install: '30 a 45 minutos (na primeira vez pode levar 1 a 2 horas, quase tudo é download)',
  },

  // Requisitos (aparecem no hero, na oferta e no FAQ).
  requirements: {
    // Conforme LEIA-PRIMEIRO.md da skill v1.0.
    claudePlan: 'o Pro ou superior',
    premiereVersion: 'Adobe Premiere Pro da Creative Cloud. Ele só é necessário para montar a sequência; o corte, as legendas e o motion saem como arquivos mesmo sem ele',
    os: 'Funciona melhor no Mac (com chip Apple). No Windows, o corte, as legendas e o motion funcionam; só dois extras (máscara de pessoa e leitura de PDF) são exclusivos do Mac',
  },

  // Pixels: cole só o ID. Vazio = nada é carregado.
  pixels: {
    // Google Tag Manager. Se o Pixel da Meta/TikTok for instalado DENTRO do
    // GTM, deixe meta/tiktok vazios aqui para não contar tudo em dobro.
    // Cada clique em botão de compra envia o evento "initiate_checkout"
    // para o dataLayer (use como acionador no GTM).
    gtm: 'GTM-K9Z4JBF4',
    meta: '',
    tiktok: '',
  },

  // Termos e Privacidade são gerados pelo build (src/legal/) em
  // termos.html e privacidade.html. Contato: Instagram e, se houver, e-mail.
  legal: {
    instagram: 'samuelrmbraga',
    contactEmail: 'samuelrmbraga40@gmail.com', // opcional, ex.: 'contato@edicaomestra.com.br'
    updated: '23 de novembro de 2026',
  },
};
