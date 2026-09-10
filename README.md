# TortolaCar Detail — Estética Automotiva

Landing page da **TortolaCar Detail**, estética automotiva em Maringá — PR.

> *"O cuidado que seu veículo merece"*

Site estático, sem build e sem dependências externas: basta publicar a pasta.

---

## Como publicar

Qualquer hospedagem de arquivos estáticos serve. O site não tem etapa de build.

| Serviço | Como fazer |
| --- | --- |
| **GitHub Pages** | Settings → Pages → Source: `main` / `root` |
| **Netlify / Vercel** | Arraste a pasta ou conecte o repositório (sem comando de build) |
| **Hospedagem própria** | Envie todos os arquivos para a pasta pública (`public_html`) |

Para testar na sua máquina:

```bash
npx http-server -p 8080
# abra http://localhost:8080
```

Abrir o `index.html` direto pelo `file://` funciona, mas as fontes locais
são bloqueadas por CORS — prefira um servidor.

---

## Estrutura

```
index.html              página única, com dados estruturados (schema.org)
robots.txt / sitemap.xml
assets/
  css/style.css         estilos e tokens da marca
  css/fonts.css         @font-face das fontes auto-hospedadas
  js/main.js            conteúdo dinâmico e interações
  fonts/                Archivo, Barlow e Barlow Condensed (.woff2)
  img/                  fotos (.jpg + .webp) e o brasão em .svg
```

---

## Editando o conteúdo

Serviços, fotos da galeria, avaliações e horários ficam em **arrays no topo do
`assets/js/main.js`** — não é preciso mexer no HTML.

```js
const SERVICOS   = [ { t:'Título', d:'Descrição', i:'<path .../>' }, ... ];
const GALERIA    = [ { f:'nome-do-arquivo', a:'texto alternativo', c:'legenda' }, ... ];
const AVALIACOES = [ { n:'Nome', q:'quando', t:'texto da avaliação' }, ... ];
const HORARIOS   = [ { d:'Segunda', h:'08:00 — 18:00', open:['08:00','18:00'] }, ... ];
```

**Trocar telefone ou endereço:** procure por `5544999906329` e por
`São Judas Tadeu` no `index.html` e no `main.js`.

**Adicionar uma foto:** coloque o `.jpg` e o `.webp` em `assets/img/` e
acrescente uma entrada em `GALERIA`. A largura recomendada é ~1400px.

**Cores da marca:** todas em `:root`, no início do `assets/css/style.css`
(`--red`, `--gold`, `--ink`…).

---

## O que já está pronto

- Carrossel de fotos com arrastar, setas, teclado e lightbox
- Carrossel de avaliações 5★ do Google, com "ler avaliação completa"
- Horário que mostra **aberto/fechado agora** conforme o dia e a hora
- Menu mobile, revelação no scroll, contadores animados, parallax no topo
- Layout responsivo testado de 320px a 1440px
- `schema.org` completo (`AutoDetailing`, avaliações, serviços e horários)
- Respeita `prefers-reduced-motion`
- Fontes e imagens locais — nenhuma requisição a terceiros

---

## Conteúdo

Fotos, avaliações e dados cadastrais vieram do perfil da loja no Google Maps.
As placas visíveis nas fotos foram desfocadas. O brasão foi reproduzido em SVG
a partir da fachada, mantendo forma, cores e tipografia originais.

## Contato

**TortolaCar Detail — Estética Automotiva**
Av. São Judas Tadeu, 2714A — Jardim Diamante, Maringá/PR, 87024-000
WhatsApp: [(44) 99990-6329](https://wa.me/5544999906329) ·
Instagram: [@tortolacardetail](https://www.instagram.com/tortolacardetail/)
