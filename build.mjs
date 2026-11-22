// Build da página de vendas: gera uma página por variante em dist/.
// Uso: node build.mjs   (Node 18+, sem dependências)
import { readdirSync, readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const SRC = join(ROOT, 'src');
const DIST = join(ROOT, 'dist');

const site = (await import(pathToFileURL(join(SRC, 'config/site.mjs')))).default;
const content = (await import(pathToFileURL(join(SRC, 'content/shared.mjs')))).default;
const { registry, defaultOrder } = await import(pathToFileURL(join(SRC, 'sections/index.mjs')));
const layout = (await import(pathToFileURL(join(SRC, 'layouts/page.mjs')))).default;

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

// CSS: tokens → base → componentes → seções, num arquivo só.
const cssOrder = ['tokens.css', 'base.css', 'components.css', 'sections.css'];
writeFileSync(join(DIST, 'styles.css'), cssOrder.map((f) => readFileSync(join(SRC, 'styles', f), 'utf8')).join('\n'));

// JS com o checkout injetado.
const js = readFileSync(join(SRC, 'scripts/main.js'), 'utf8').replace('__CHECKOUT_URL__', site.checkoutUrl || '[PREENCHER: link do checkout]');
writeFileSync(join(DIST, 'main.js'), js);

// Assets (vídeos, imagens). Os READMEs não vão para produção.
if (existsSync(join(ROOT, 'assets'))) cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true, filter: (p) => !p.endsWith('.md') });

const pending = new Map();
for (const file of readdirSync(join(SRC, 'variants')).filter((f) => f.endsWith('.mjs'))) {
  const v = (await import(pathToFileURL(join(SRC, 'variants', file)))).default;
  const c = { ...content, ...(v.content || {}) };
  const order = v.sections || defaultOrder;
  const body = order.map((name) => {
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

if (!site.checkoutUrl) pending.set('link do checkout', new Set(['main.js']));
console.log(`\n${pending.size} pendências [PREENCHER]:`);
for (const [k, files] of pending) console.log(`  · ${k}  → ${[...files].join(', ')}`);
