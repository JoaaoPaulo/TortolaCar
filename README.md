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

Uma superfície só, do topo ao rodapé: um off-white quente. O contraste vem das
fotografias — o hero e a chamada final são fotos de tela cheia, escuras por
natureza. Nada de troca de tema no meio da rolagem.

| | |
| --- | --- |
| `--paper` `#f7f5f1` | Fundo único da página |
| `--ink` `#16150f` | Texto |
| `--red` `#c4322b` | O vermelho da fachada, único acento |

**Tipografia:** Instrument Serif nos títulos — a serifada ecoa o monograma do
brasão, e o itálico vermelho marca a palavra-chave de cada frase. Manrope no
texto e na interface. Só duas famílias.

Os tokens ficam em `:root`, no início do `assets/css/style.css`.

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

Movimento discreto, sem firula:

| Efeito | Onde |
| --- | --- |
| Título que sobe linha a linha, por máscara | hero, títulos de seção |
| Painel que troca a foto ao percorrer a lista | serviços (desktop) |
| Galeria que prende a tela e corre na horizontal | galeria (desktop) |
| Cortina que sobe revelando a foto | a loja, mapa |
| Parallax da imagem dentro do quadro | hero, galeria, a loja |
| Preenchimento do botão entrando pela esquerda | todos os botões |
| Carrossel com setas, pontos e arrasto | avaliações |

No celular tudo tem equivalente ao toque: a galeria vira rolagem lateral com
encaixe e cada serviço mostra a própria foto acima do texto.

---

## Verificado

- Responsivo de 320px a 1920px, sem rolagem horizontal
- Sem erros de console; todas as imagens carregam
- Funciona sem JavaScript (serviços, telefone e endereço no HTML)
- Respeita `prefers-reduced-motion`
- Foco visível no teclado; contraste de texto 16,8:1
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
