# TortolaCar Detail — Estética Automotiva

Landing page da **TortolaCar Detail**, estética automotiva em Maringá — PR.

> *"O cuidado que seu veículo merece"*

Site estático, sem build e sem dependências externas: basta publicar a pasta.

---

## Como publicar

Qualquer hospedagem de arquivos estáticos serve.

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

Abrir o `index.html` direto pelo `file://` funciona, mas as fontes locais são
bloqueadas por CORS — prefira um servidor.

---

## Estrutura

```
index.html              página única, com dados estruturados (schema.org)
robots.txt / sitemap.xml
assets/
  css/style.css         identidade visual, componentes e responsividade
  css/fonts.css         @font-face das fontes auto-hospedadas
  js/main.js            conteúdo dinâmico e interações
  fonts/                Anton, Saira Condensed, Barlow, Space Mono, Kaushan Script
  img/                  44 fotos (.jpg + .webp) e o brasão em .svg
```

---

## Identidade visual

Tudo saiu da loja real:

| Elemento | Origem |
| --- | --- |
| Vermelho `--red` | A fachada e a faixa do piso modular |
| Preto quente `--ink` | O piso de borracha e o concreto do box |
| Dourado `--gold` | As estrelas do brasão |
| Faixa diagonal | A faixa vermelha que corta o piso |
| Cromado nos títulos | O acabamento do brasão na placa |
| Manuscrito | O slogan pintado na placa da fachada |

As cores ficam todas em `:root`, no início do `assets/css/style.css`.

**Tipografia:** Anton nos títulos, Saira Condensed na interface, Barlow no texto
corrido, Space Mono nas etiquetas técnicas e Kaushan Script no slogan.

---

## Editando o conteúdo

**Serviços** ficam no `index.html`, dentro de `<ol class="idx-list">` — são
conteúdo de busca, por isso estão no HTML. Cada linha tem `data-img` (nome do
arquivo da foto, sem extensão) e `data-cap` (legenda).

**Galeria, avaliações, marquee e horários** ficam em arrays no topo do
`assets/js/main.js`:

```js
const GALERIA    = [ { f:'arquivo', k:'tall|wide|sq', c:'legenda', a:'texto alternativo' }, ... ];
const AVALIACOES = [ { n:'Nome', q:'quando', t:'texto da avaliação' }, ... ];
const MARQUEE    = ['Polimento técnico', 'Vitrificação', ...];
const MQ_FOTOS   = ['det-polidor', 'det-bmw-capo', ...];
const HORARIOS   = [ { d:'Segunda', h:'08:00 — 18:00', abre:['08:00','18:00'] }, ... ];
```

**Trocar telefone ou endereço:** procure por `5544999906329` e por
`São Judas Tadeu` no `index.html` e no `main.js`.

**Adicionar uma foto:** coloque o `.jpg` e o `.webp` em `assets/img/` e
acrescente uma entrada em `GALERIA`. Largura recomendada: ~1400px.

---

## O que já está pronto

**Interações**

- Galeria que prende a tela e corre na horizontal conforme você rola
  (no celular vira rolagem lateral com encaixe)
- Índice de serviços que troca a foto ao passar o mouse; no celular cada
  serviço mostra a própria foto
- Carrossel de avaliações 5★ do Google, com "ler completa"
- Lightbox com teclado, setas e contador
- Menu em tela cheia no celular, revelação no scroll, contadores animados

**Efeitos**

- Filme de grão sobre a página inteira
- Brilho cromado que varre os títulos ao aparecerem
- Holofote que segue o cursor no topo (lembra a lanterna de inspeção)
- Botões com cantos chanfrados, preenchimento que entra pela esquerda e
  atração magnética ao cursor
- Dois marquees em direções opostas — um de texto, um de fotos em P&B
- Parallax no topo e revelação palavra a palavra

**Base**

- Responsivo verificado de 320px a 1920px, sem rolagem horizontal
- `schema.org` `AutoDetailing` com avaliações, serviços e horários
- Horário que mostra **aberto/fechado agora** conforme o dia e a hora
- Funciona sem JavaScript e respeita `prefers-reduced-motion`
- Fontes e imagens locais — nenhuma requisição a terceiros

---

## Conteúdo

Fotos, avaliações e dados cadastrais vieram do perfil da loja no Google Maps.
Além dos enquadramentos originais, há recortes de detalhe e texturas extraídos
das mesmas fotos em resolução cheia. As placas visíveis foram desfocadas.
O brasão foi reproduzido em SVG a partir da fachada, mantendo forma, cores e
tipografia originais.

## Contato

**TortolaCar Detail — Estética Automotiva**
Av. São Judas Tadeu, 2714A — Jardim Diamante, Maringá/PR, 87024-000
WhatsApp: [(44) 99990-6329](https://wa.me/5544999906329) ·
Instagram: [@tortolacardetail](https://www.instagram.com/tortolacardetail/)
