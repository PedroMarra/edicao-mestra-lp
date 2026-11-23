// ─────────────────────────────────────────────────────────────
// CONFIGURAÇÃO GLOBAL — o único arquivo que você precisa mexer
// para preço, checkout, pixels, tempos e rodapé.
// Campo vazio ("") = a página mostra um bloco [PREENCHER].
// Depois de editar: rode `node build.mjs`.
// ─────────────────────────────────────────────────────────────
export default {
  brand: 'Edição Mestra',
  domain: 'https://pedromarra.github.io/edicao-mestra-lp', // trocar pelo domínio próprio quando comprar (usado no Open Graph)

  // Link do checkout da Cackto (ex.: https://pay.cackto.com.br/xxxxx),
  // com o order bump já configurado lá dentro.
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
    before: '3 horas',
    after: '10',
    afterUnit: 'minutos',
    install: '15', // média estimada para instalar com o guia (validar com compradores reais)
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

  // Termos e Privacidade são gerados pelo build (src/legal/) em
  // termos.html e privacidade.html. Contato: Instagram e, se houver, e-mail.
  legal: {
    instagram: 'samuelrmbraga',
    contactEmail: '', // opcional, ex.: 'contato@edicaomestra.com.br'
    updated: '23 de novembro de 2026',
  },
};
