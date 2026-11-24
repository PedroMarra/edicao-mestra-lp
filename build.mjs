// Build da página de vendas: gera uma página por variante em dist/.
// Uso: node build.mjs   (Node 18+, sem dependências)
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

const site = (await import(pathToFileURL(join(SRC, 'config/site.mjs')))).default;
// Endereço do site: SITE_URL > endereço de produção da Vercel > config.
// Assim o link de compartilhamento sai certo em qualquer hospedagem.
if (process.env.SITE_URL) site.domain = process.env.SITE_URL;
else if (process.env.VERCEL_PROJECT_PRODUCTION_URL) site.domain = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
console.log(`Domínio: ${site.domain || '(nenhum)'}`);
const content = (await import(pathToFileURL(join(SRC, 'content/shared.mjs')))).default;
const { registry, defaultOrder, ctaBand } = await import(pathToFileURL(join(SRC, 'sections/index.mjs')));
const layout = (await import(pathToFileURL(join(SRC, 'layouts/page.mjs')))).default;

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// Modo redirecionamento (usado pelo GitHub Pages): cada página só manda
// a pessoa para o endereço oficial, levando junto UTMs e o #âncora.
// Evita conteúdo duplicado e não quebra links antigos.
if (process.env.REDIRECT_TO) {
  const to = process.env.REDIRECT_TO.replace(/\/$/, '');
  const pages = { 'index.html': '/', 'freelancer.html': '/freelancer', 'termos.html': '/termos', 'privacidade.html': '/privacidade', '404.html': '/' };
  for (const [file, path] of Object.entries(pages)) {
    const target = to + path;
    writeFileSync(join(DIST, file), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>${site.brand}</title><meta name="robots" content="noindex"><link rel="canonical" href="${target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script><meta http-equiv="refresh" content="0;url=${target}"></head><body style="background:#08090E;color:#F4F2FF;font-family:system-ui;padding:24px">Indo para <a style="color:#4D9DFF" href="${target}">${target}</a>…</body></html>`);
  }
  console.log(`Redirecionamento → ${to}`);
  process.exit(0);
}

// CSS: tokens → base → componentes → seções → movimento, num arquivo só.
const cssOrder = ['tokens.css', 'base.css', 'components.css', 'sections.css', 'motion.css'];
writeFileSync(join(DIST, 'styles.css'), cssOrder.map((f) => readFileSync(join(SRC, 'styles', f), 'utf8')).join('\n'));

// JS com o checkout injetado.
const js = readFileSync(join(SRC, 'scripts/main.js'), 'utf8').replace('__CHECKOUT_URL__', site.checkoutUrl || '[PREENCHER: link do checkout]')
  .replaceAll('__PRICE__', String(+site.price.value.replace(/[^\d,]/g, '').replace(',', '.')));
writeFileSync(join(DIST, 'main.js'), js);

// Assets (vídeos, imagens). Os READMEs não vão para produção.
if (existsSync(join(ROOT, 'assets'))) cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true, filter: (p) => !p.endsWith('.md') });

const pending = new Map();
const variants = [];
for (const file of readdirSync(join(SRC, 'variants')).filter((f) => f.endsWith('.mjs'))) {
  const v = (await import(pathToFileURL(join(SRC, 'variants', file)))).default;
  variants.push(v);
  const c = { ...content, ...(v.content || {}) };
  const order = v.sections || defaultOrder;
  const body = order.map((name) => {
    if (name.startsWith('cta:')) return ctaBand({ site, v, c }, name.slice(4));
    if (!registry[name]) throw new Error(`Seção desconhecida "${name}" em ${file}`);
    return registry[name]({ site, v, c });
  }).join('\n');
  const html = layout({ site, v, body });
  writeFileSync(join(DIST, v.out), html);
  for (const m of html.matchAll(/\[PREENCHER: ([^\]]+)\]/g)) {
    if (!pending.has(m[1])) pending.set(m[1], new Set());
    pending.get(m[1]).add(v.out);
  }
  console.log(`✓ ${v.out}  (${v.slug}, ${(html.length / 1024).toFixed(1)} KB)`);
}

// Páginas legais
const legalLayout = (await import(pathToFileURL(join(SRC, 'layouts/legal.mjs')))).default;
for (const file of readdirSync(join(SRC, 'legal')).filter((f) => f.endsWith('.mjs') && f !== 'shared.mjs')) {
  const doc = (await import(pathToFileURL(join(SRC, 'legal', file)))).default;
  const v = { slug: 'legal', out: doc.out, meta: { title: `${doc.title} · ${site.brand}`, description: doc.description } };
  const html = layout({ site, v, body: legalLayout({ site, doc }) }).replace('<meta name="theme-color"', '<meta name="robots" content="noindex">\n<meta name="theme-color"');
  writeFileSync(join(DIST, doc.out), html);
  console.log(`✓ ${doc.out}  (legal)`);
}

// robots.txt + sitemap.xml (só as páginas de venda; termos/privacidade são noindex).
if (site.domain) {
  const base = site.domain.replace(/\/$/, '');
  const urls = variants.map((v) => `${base}/${v.out === 'index.html' ? '' : v.out.replace('.html', '')}`);
  writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}\n</urlset>\n`);
  writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`);
}

if (!site.checkoutUrl) pending.set('link do checkout', new Set(['main.js']));
console.log(`\n${pending.size} pendências [PREENCHER]:`);
for (const [k, files] of pending) console.log(`  · ${k}  → ${[...files].join(', ')}`);
