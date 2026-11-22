// Esqueleto HTML comum a todas as variantes.
import { hasAsset } from '../lib/helpers.mjs';

const metaPixel = (id) => id ? `
<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');</script>` : '';

const tiktokPixel = (id) => id ? `
<script>!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};ttq.load('${id}');ttq.page();}(window,document,'ttq');</script>` : '';

export default ({ site, v, body }) => {
  const url = site.domain ? `${site.domain.replace(/\/$/, '')}/${v.out === 'index.html' ? '' : v.out.replace('.html', '')}` : '';
  const og = hasAsset('og.jpg')
    ? `<meta property="og:image" content="${site.domain ? site.domain.replace(/\/$/, '') + '/' : ''}assets/og.jpg"><meta name="twitter:card" content="summary_large_image">`
    : '<!-- [PREENCHER: imagem de compartilhamento assets/og.jpg, 1200×630] -->';
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${v.meta.title}</title>
<meta name="description" content="${v.meta.description}">
<meta name="theme-color" content="#08090E">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${v.meta.title}">
<meta property="og:description" content="${v.meta.description}">
${url ? `<meta property="og:url" content="${url}"><link rel="canonical" href="${url}">` : '<!-- [PREENCHER: domínio em src/config/site.mjs para og:url e canonical] -->'}
${og}
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%2308090E'/%3E%3Crect x='7' y='11' width='18' height='4' rx='1' fill='%23FF7A44'/%3E%3Crect x='7' y='18' width='12' height='4' rx='1' fill='%234D9DFF'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@500&family=Space+Grotesk:wght@700&display=swap">
<link rel="stylesheet" href="styles.css">
<!-- ── PIXELS ─────────────────────────────────────────────
     Cole os IDs em src/config/site.mjs (pixels.meta / pixels.tiktok)
     e rode o build. O clique em qualquer botão dispara InitiateCheckout
     (Meta) e InitiateCheckout (TikTok) pelo main.js.
     ${site.pixels.meta ? '' : '[PREENCHER: ID do Pixel da Meta] '}${site.pixels.tiktok ? '' : '[PREENCHER: ID do Pixel do TikTok]'}
──────────────────────────────────────────────────────── -->${metaPixel(site.pixels.meta)}${tiktokPixel(site.pixels.tiktok)}
</head>
<body data-variant="${v.slug}">
<a class="skip" href="#dor">Pular para o conteúdo</a>
${body}
<script src="main.js" defer></script>
</body>
</html>
`;
};
