// ─────────────────────────────────────────────────────────────
// CONFIGURAÇÃO GLOBAL — o único arquivo que você precisa mexer
// para preço, checkout, pixels, tempos e rodapé.
// Campo vazio ("") = a página mostra um bloco [PREENCHER].
// Depois de editar: rode `node build.mjs`.
// ─────────────────────────────────────────────────────────────
export default {
  brand: 'Edição Mestra',
  domain: 'https://pedromarra.github.io/edicao-mestra-lp', // trocar pelo domínio próprio quando comprar (usado no Open Graph)

  // Checkout (Hotmart ou Kiwify) com o order bump já configurado.
  // Todos os botões apontam para cá e herdam os UTMs da página.
  checkoutUrl: '',

  price: {
    value: 'R$37',
    // Só preencha se o preço "de" existiu de verdade (CDC). Senão, deixe ''.
    anchor: '',
    note: 'pagamento único',
    access: 'acesso imediato',
  },

  // Tempos medidos de verdade (vídeo real, com gravação).
  // Ex.: before: '3 horas', after: '12', afterUnit: 'minutos'.
  times: {
    before: '',
    after: '',
    afterUnit: 'minutos',
    install: '', // minutos para instalar com o guia, ex.: '10'
  },

  // Requisitos (aparecem no hero, na oferta e no FAQ).
  requirements: {
    claudePlan: '',       // ex.: 'Claude Pro (cerca de R$110/mês)'
    premiereVersion: '',  // ex.: 'Premiere Pro 25.0 ou mais novo'
    os: '',               // ex.: 'Mac com Apple silicon e Windows 11'
  },

  // Pixels: cole só o ID. Vazio = nada é carregado.
  pixels: {
    meta: '',
    tiktok: '',
  },

  legal: {
    owner: '',     // nome ou razão social
    document: '',  // CPF ou CNPJ
    termsUrl: '',
    privacyUrl: '',
    contactEmail: '',
  },
};
