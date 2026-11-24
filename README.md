# Página de vendas · Edição Mestra (N1 Aurora)

Site estático, leve e mobile-first. Um build de ~100 linhas em Node (sem dependências) monta uma página por variante a partir de seções reutilizáveis.

```
site/
├── build.mjs              ← gera dist/ (node build.mjs)
├── src/
│   ├── config/site.mjs    ← checkout (Cackto), preço, tempos, requisitos, pixels, rodapé
│   ├── content/shared.mjs ← textos comuns: passos, pacote, FAQ, depoimentos, autor, oferta
│   ├── variants/          ← UMA página por arquivo (hero + dor + meta)
│   │   ├── creator.mjs    → dist/index.html      (criativo B)
│   │   └── freelancer.mjs → dist/freelancer.html (criativo A)
│   ├── sections/          ← cada seção é uma função; index.mjs define a ordem
│   ├── layouts/page.mjs   ← <head>, SEO, Open Graph, pixels
│   ├── styles/            ← tokens.css (paleta) → base → components → sections
│   └── scripts/main.js    ← checkout + UTMs, InitiateCheckout, botão fixo
├── assets/                ← vídeos e imagens (ver assets/README.md)
├── dist/                  ← saída pronta para subir (não edite à mão)
├── netlify.toml / vercel.json
```

## Uso do dia a dia

| Quero… | Mexa em |
|---|---|
| Colocar o link do checkout, tempos, requisitos, pixels | `src/config/site.mjs` |
| Trocar vídeo, foto ou imagem de compartilhamento | soltar em `assets/` com o nome certo |
| Mudar um texto que vale para as duas páginas | `src/content/shared.mjs` |
| Mudar hero/dor de um público | `src/variants/<variante>.mjs` |
| Criar uma página nova para outro criativo | copiar uma variante, trocar `slug`, `out` e textos |
| Testar o H1 alternativo | trocar `title` por `altTitle` na variante |
| Tirar ou reordenar seções numa variante | `sections: [...]` na variante (nomes em `src/sections/index.mjs`) |
| Ajustar cor, fonte, espaçamento | `src/styles/tokens.css` |

Depois de qualquer mudança: `node build.mjs`. Ele lista no terminal todos os `[PREENCHER]` que ainda faltam.

## Publicar

- **Vercel (principal):** importe o repositório em vercel.com → Add New → Project. O `vercel.json` já manda rodar `node build.mjs` e publicar `dist/`. O endereço grátis `*.vercel.app` é detectado sozinho no build (variável `VERCEL_PROJECT_PRODUCTION_URL`), então o link de compartilhamento sai certo sem mexer em nada.
- **Endereço oficial:** https://edicao-mestra-lp.vercel.app (publica sozinho a cada push em `main`).
- **GitHub Pages:** só redireciona para a Vercel, levando os UTMs junto (`REDIRECT_TO` no workflow). Assim links antigos continuam funcionando e o Google não vê conteúdo duplicado.
- O build gera `robots.txt` e `sitemap.xml` com as páginas de venda.
- **Domínio próprio depois:** adicione em Vercel → Settings → Domains. Para forçar um endereço no build, defina `SITE_URL` nas variáveis de ambiente.
- Endereços: `/` = creator, `/freelancer` = freelancer, `/termos` e `/privacidade`. Use um link por criativo no anúncio, com UTMs (ex.: `?utm_source=meta&utm_campaign=criativo-b`). Os UTMs (e `src`/`sck`) passam para o checkout da Cackto, que mostra a origem de cada venda.

## Regras da marca (não quebre)

- Texto do botão laranja é sempre escuro (`--on-cta`). Branco falha no contraste.
- Degradê de título só em uma palavra por seção (`<span class="grad">`).
- Azul só para informação (links, dados, chips). Brilhos aurora só no hero e na oferta.
- Nada de depoimento, número ou nome inventado. Depoimentos vazios = seção escondida.
- Não use logo do Claude nem diga "oficial". O rodapé já tem o aviso de não afiliação.
