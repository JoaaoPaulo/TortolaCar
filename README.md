# TortolaCar Detail — Estética Automotiva

Landing page da **TortolaCar Detail**, estética automotiva em Maringá — PR.

> *"O cuidado que seu veículo merece"*

Site estático, sem build e sem dependências externas: basta publicar a pasta.

---

## Como publicar

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

Abrir o `index.html` pelo `file://` funciona, mas as fontes locais são
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
  fonts/                Instrument Serif, Manrope, Saira Condensed
  img/                  44 fotos (.jpg + .webp) e o brasão em .svg
```

---

## A identidade

A página **alterna entre claro e escuro conforme você rola** — a recepção e o
box da loja. É isso que dá caráter, não um fundo preto uniforme.

| | |
| --- | --- |
| `--bone` `#f4f1ea` | Concreto claro e quente das seções de texto |
| `--ink` `#0b0b0c` | Preto profundo das seções de fotografia |
| `--red` `#dc2f28` | O vermelho da fachada, único acento |

**Tipografia:** Instrument Serif nos títulos — a serifada ecoa o monograma do
brasão, e o itálico vermelho marca a palavra-chave de cada frase. Manrope no
texto e na interface. Só duas famílias.

Os tokens ficam em `:root` e no bloco `body[data-t="light"]`, no início do
`assets/css/style.css`. Cada seção declara `data-theme="light|dark"` no HTML.

---

## Editando o conteúdo

**Serviços** ficam no `index.html`, dentro de `<ol class="idx">` — são conteúdo
de busca, por isso estão no HTML. Cada linha tem `data-img` (arquivo da foto,
sem extensão) e `data-cap` (legenda).

**Galeria, avaliações e horários** ficam em arrays no topo do `assets/js/main.js`:

```js
const GALERIA    = [ { f:'arquivo', k:'t|w|s', c:'legenda', a:'texto alternativo' }, ... ];
const AVALIACOES = [ { n:'Nome', q:'quando', t:'texto da avaliação' }, ... ];
const HORARIOS   = [ { d:'Segunda', h:'08:00 — 18:00', abre:['08:00','18:00'] }, ... ];
```

`k` é o formato do quadro na galeria: `t` alto, `w` largo, `s` quadrado.

**Trocar telefone ou endereço:** procure por `5544999906329` e por
`São Judas Tadeu` no `index.html`.

**Adicionar uma foto:** coloque o `.jpg` e o `.webp` em `assets/img/` e
acrescente uma entrada em `GALERIA`. Largura recomendada: ~1400px.

---

## Efeitos

| Efeito | Onde |
| --- | --- |
| Troca de superfície clara/escura na rolagem | a página inteira |
| Título que sobe linha a linha, por máscara | hero, títulos de seção |
| Foto que segue o cursor ao passar pelos serviços | serviços (desktop) |
| Cursor que vira um disco com "Ver" | galeria (desktop) |
| Galeria que prende a tela e corre na horizontal | galeria (desktop) |
| Cartões de avaliação que empilham ao rolar | avaliações (desktop) |
| Cortina que sobe revelando a foto | a loja, mapa |
| Parallax da imagem dentro do quadro | hero, galeria, a loja |
| Preenchimento do botão a partir do ponto do cursor | todos os botões |
| Menu que abre em círculo a partir do ícone | celular |

No celular tudo tem equivalente adequado ao toque: a galeria vira rolagem
lateral com encaixe, cada serviço mostra a própria foto, e a pilha de
avaliações vira lista.

---

## Verificado

- Responsivo de 320px a 1920px, sem rolagem horizontal
- Sem erros de console; todas as imagens carregam
- Funciona sem JavaScript (serviços, telefone e endereço no HTML)
- Respeita `prefers-reduced-motion`
- Foco visível no teclado; contraste de texto 17:1 nos dois temas
- `schema.org` `AutoDetailing` com avaliações, serviços e horários
- Horário mostra **aberto/fechado agora** conforme o dia e a hora
- Fontes e imagens locais — nenhuma requisição a terceiros

---

## Conteúdo

Fotos, avaliações e dados cadastrais vieram do perfil da loja no Google Maps.
Além dos enquadramentos originais, há recortes de detalhe extraídos das mesmas
fotos em resolução cheia. As placas visíveis foram desfocadas. O brasão foi
reproduzido em SVG a partir da fachada, mantendo forma, cores e tipografia.

## Contato

**TortolaCar Detail — Estética Automotiva**
Av. São Judas Tadeu, 2714A — Jardim Diamante, Maringá/PR, 87024-000
WhatsApp: [(44) 99990-6329](https://wa.me/5544999906329) ·
Instagram: [@tortolacardetail](https://www.instagram.com/tortolacardetail/)
