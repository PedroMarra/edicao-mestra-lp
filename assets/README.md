# assets/

Solte os arquivos aqui com estes nomes e rode `node build.mjs`. O build troca cada bloco [PREENCHER] pelo arquivo sozinho.

| Arquivo | O que é | Formato |
|---|---|---|
| `demo.mp4` | Demo do hero: Claude Code + Premiere editando, 15–30s, sem cortes escondidos | MP4 H.264, 16:9, até ~4 MB |
| `demo-poster.webp` | Primeiro quadro do demo (aparece antes do vídeo carregar) | WebP 1280×720 |
| `antes.mp4` / `antes-poster.webp` | Trecho cru, sem edição | MP4 vertical 9:16, até ~3 MB |
| `depois.mp4` / `depois-poster.webp` | O mesmo trecho editado pela skill | MP4 vertical 9:16, até ~3 MB |
| `demo.vtt`, `antes.vtt`, `depois.vtt` | Legendas (só se o vídeo tiver fala) | WebVTT |
| `autor.webp` | Sua foto | WebP 640×640 |
| `og.jpg` | Imagem de compartilhamento (WhatsApp, Instagram) | JPG 1200×630 |
| `depo-1.webp`… | Foto de quem deu depoimento (opcional) | WebP 80×80 |

Dica para comprimir vídeo: `ffmpeg -i bruto.mov -vf scale=-2:1280 -c:v libx264 -crf 26 -preset slow -an -movflags +faststart depois.mp4`
