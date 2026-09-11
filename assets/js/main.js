/* ==========================================================================
   TORTOLACAR DETAIL — interações
   Conteúdo editável: GALERIA, AVALIACOES e HORARIOS logo abaixo.
   Os serviços ficam no index.html (são conteúdo de busca).
   ========================================================================== */
(() => {
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const lerp  = (a, b, t) => a + (b - a) * t;
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fino  = matchMedia('(hover:hover) and (pointer:fine)').matches;

/* ------------------------------------------------------------- CONTEÚDO */

// f = arquivo em assets/img (sem extensão) · k = formato (t alto | w largo | s quadrado)
const GALERIA = [
  { f:'porsche',        k:'t', c:'Porsche Macan — finalização', a:'Porsche Macan branco finalizado no box da TortolaCar Detail' },
  { f:'det-porsche',    k:'w', c:'Macan — frente',              a:'Frente do Porsche Macan sob a iluminação em LED do box' },
  { f:'bmw',            k:'s', c:'BMW — polimento',             a:'BMW Série 1 preta com a pintura espelhada após o polimento' },
  { f:'polimento',      k:'t', c:'Polimento técnico',           a:'Polimento técnico sendo executado na lateral de um sedã vermelho' },
  { f:'det-rr-roda',    k:'s', c:'Roda e pinça vermelha',       a:'Roda preta e pinça de freio vermelha após detalhamento' },
  { f:'rangerover',     k:'t', c:'Range Rover — na fachada',    a:'Range Rover Sport preta em frente à fachada da loja' },
  { f:'det-motos-fila', k:'w', c:'Motos no box',                a:'Motocicletas alinhadas no box da TortolaCar Detail' },
  { f:'fusion',         k:'t', c:'Ford Fusion — entrega',       a:'Ford Fusion branco pronto para entrega no box' },
  { f:'det-moto-disco', k:'s', c:'Disco e roda dianteira',      a:'Detalhe do disco de freio e da roda dianteira de uma moto' },
  { f:'lavagem',        k:'t', c:'Lavagem técnica',             a:'Honda HR-V coberto de espuma durante a lavagem técnica' },
  { f:'det-hrv',        k:'w', c:'Espuma de contato',           a:'Espuma cobrindo a traseira de um HR-V durante a lavagem' },
  { f:'civic',          k:'t', c:'Honda Civic — acabamento',    a:'Honda Civic branco refletindo as barras de LED do teto' },
  { f:'moto-race',      k:'w', c:'Moto de pista',               a:'Moto de pista laranja preparada no box' },
  { f:'fachada',        k:'t', c:'Audi Q3 — na fachada',        a:'Audi Q3 prata em frente à fachada da TortolaCar Detail' },
  { f:'det-audi-roda',  k:'s', c:'Roda — Audi Q3',              a:'Detalhe da roda do Audi Q3 após o detalhamento' },
  { f:'moto-twister',   k:'w', c:'Honda Twister',               a:'Honda Twister preta com brilho após o detalhamento' },
  { f:'motos',          k:'t', c:'Box de motos',                a:'Três motocicletas em detalhamento no box' },
  { f:'moto-estrada',   k:'t', c:'Depois do serviço',           a:'Moto preta na estrada ao entardecer após o detalhamento' },
];

// Avaliações 5 estrelas publicadas no Google Maps.
const AVALIACOES = [
  { n:'Juliana Vinicio', q:'um mês atrás',
    t:'Busquei o Juliano para que ele pudesse dar uma renovada no meu carro, e posso dizer a vocês foi a melhor decisão que tomei, não achava alguém tão competente para lavagem, polimento cuidado de fato com um bem caro e valioso nosso, ele cuida do seu carro como se fosse um filho, e posso te dizer se quer alguém para cuidar da estética do seu carro podem falar com ele sem medo não vão se arrepender, meu carro parecia que tinha saído concessionária de tão lindo que ficou, preço justo pelo serviço de qualidade! Parabéns e continue assim sempre entregando com excelência só tem a crescer cada vez mais! Deus abençoe!!' },
  { n:'Sidney dos Reis', q:'2 meses atrás',
    t:'Excelente Experiência, a empresa TortolaCar Detail é organizada, cumpre todos os prazos. Extremamente esclarecedora e transparente - qualidade do serviço acima da média. Inclusive já organizamos uma agenda para manutenção a cada 50 dias, para manter a garantia, eventuais manutenções e aumentar a vida útil da VITRIFICAÇÃO\n\nMuito satisfeito\nSuper recomendo' },
  { n:'Gilmar gouvea Junior', q:'7 meses atrás',
    t:'Excelente o atendimento e melhor ainda o serviço! Recomendo pra quem precisar muito top' },
  { n:'Fernando Rodrigues', q:'11 meses atrás',
    t:'Ótima, muito bom o atendimento, atento aos detalhes da moto, deixou ela em perfeito estado. Parafusos brilhando, moto está um espelho, parabéns.' },
  { n:'Simoni Si', q:'um ano atrás',
    t:'Ótimo atendimento. Serviço excelente.\nCarro com aparência de novo.\nConserteza quando precisar, não terei dúvida que é no TortolaCar que levarei meu carro para um trato especial.' },
];

const HORARIOS = [
  { d:'Segunda', h:'08:00 — 18:00', abre:['08:00','18:00'] },
  { d:'Terça',   h:'08:00 — 18:00', abre:['08:00','18:00'] },
  { d:'Quarta',  h:'08:00 — 18:00', abre:['08:00','18:00'] },
  { d:'Quinta',  h:'08:00 — 18:00', abre:['08:00','18:00'] },
  { d:'Sexta',   h:'08:00 — 18:00', abre:['08:00','18:00'] },
  { d:'Sábado',  h:'Fechado', abre:null },
  { d:'Domingo', h:'Fechado', abre:null },
];

/* -------------------------------------------------------------- HELPERS */
const STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>';

/** <picture> com WebP e retorno em JPEG. */
const foto = (f, alt, attrs = 'loading="lazy" decoding="async"') =>
  `<picture><source srcset="assets/img/${f}.webp" type="image/webp">` +
  `<img src="assets/img/${f}.jpg" alt="${alt}" ${attrs}></picture>`;

const iniciais = (nome) => nome.trim().split(/\s+/)
  .filter(p => p.length > 2).slice(0, 2).map(p => p[0].toUpperCase()).join('');

$$('[data-stars]').forEach(el => { el.innerHTML = STAR.repeat(+el.dataset.stars); });
$('#yr').textContent = new Date().getFullYear();

/* ------------------------------------------------------------ PRELOADER */
const fechaPre = () => {
  const p = $('#pre');
  if (!p || p.classList.contains('done')) return;
  setTimeout(() => { p.classList.add('done'); $('#heroH1')?.classList.add('in'); }, 300);
};
addEventListener('load', fechaPre);
setTimeout(fechaPre, 3200);

/* ------------------------------------------------------------- GALERIA */
{
  const sec = $('#galeria'), track = $('#pinTrack');
  const largo = { t:'fr--t', w:'fr--w', s:'fr--s' };

  track.innerHTML = GALERIA.map((g, i) => `
    <figure class="fr ${largo[g.k]}" tabindex="0" role="button" data-lb="${i}"
            data-cursor="Ver" aria-label="Ampliar: ${g.c}">
      ${foto(g.f, g.a, i < 3 ? 'decoding="async"' : 'loading="lazy" decoding="async"')}
      <figcaption>${g.c}</figcaption>
    </figure>`).join('');

  $('#pinCount').textContent = `${GALERIA.length} fotos`;

  const podePinar = () => matchMedia('(min-width:900px)').matches && !reduz;
  let dist = 0, rolagem = 0;

  const medir = () => {
    if (!podePinar()) {
      sec.classList.add('nopin');
      sec.style.height = '';
      track.style.transform = '';
      dist = 0;
      return;
    }
    sec.classList.remove('nopin');
    track.style.transform = '';
    dist = Math.max(0, track.scrollWidth - innerWidth);
    // a rolagem vertical é limitada a ~2,2 telas: as fotos correm mais
    // rápido que o dedo, senão a seção parece travada
    rolagem = Math.min(dist, innerHeight * 2.2);
    sec.style.height = dist ? `${innerHeight + rolagem}px` : '';
  };

  const mover = () => {
    if (!dist) return;
    const p = clamp(-sec.getBoundingClientRect().top / rolagem, 0, 1);
    track.style.transform = `translate3d(${-p * dist}px,0,0)`;
  };

  addEventListener('scroll', () => requestAnimationFrame(mover), { passive:true });
  addEventListener('resize', () => { medir(); mover(); });
  addEventListener('load',   () => { medir(); mover(); });
  medir();

  arrastavel(track, () => sec.classList.contains('nopin'));
}

/* --------------------------------------------------- AVALIAÇÕES (PILHA) */
{
  $('#stack').innerHTML = AVALIACOES.map((r, i) => `
    <article class="rv" style="--i:${i}">
      <q>${r.t}</q>
      ${r.t.length > 300 ? '<button class="more" type="button">Ler completa</button>' : ''}
      <footer class="who">
        <span class="av" aria-hidden="true">${iniciais(r.n)}</span>
        <span>
          <b>${r.n}</b>
          <span>${r.q} · Google</span>
        </span>
        <span class="stars" aria-label="5 de 5 estrelas">${STAR.repeat(5)}</span>
      </footer>
    </article>`).join('');

  $('#stack').addEventListener('click', e => {
    const b = e.target.closest('.more');
    if (!b) return;
    const card = b.closest('.rv');
    b.textContent = card.classList.toggle('open') ? 'Recolher' : 'Ler completa';
  });

  // o botão só aparece quando o texto realmente foi cortado — em telas
  // largas a citação costuma caber inteira
  const revisaCortes = () => {
    $$('.rv').forEach(card => {
      const b = card.querySelector('.more');
      if (!b) return;
      const q = card.querySelector('q');
      const aberto = card.classList.contains('open');
      if (aberto) { b.hidden = false; return; }
      b.hidden = q.scrollHeight <= q.clientHeight + 2;
    });
  };
  revisaCortes();
  addEventListener('load', revisaCortes);
  let tR;
  addEventListener('resize', () => { clearTimeout(tR); tR = setTimeout(revisaCortes, 180); });
}

/* -------------------------------------------------------------- HORÁRIO */
{
  const box = $('#hours'), pill = $('#pill');
  const hoje = (new Date().getDay() + 6) % 7;                // 0 = segunda

  box.innerHTML = HORARIOS.map((h, k) => `
    <div class="${k === hoje ? 'now' : ''}">
      <span>${h.d}</span><span>${h.h}</span>
    </div>`).join('');

  const agora = new Date(), cfg = HORARIOS[hoje].abre;
  let aberto = false;
  if (cfg) {
    const min = agora.getHours() * 60 + agora.getMinutes();
    const [ah, am] = cfg[0].split(':').map(Number);
    const [fh, fm] = cfg[1].split(':').map(Number);
    aberto = min >= ah * 60 + am && min < fh * 60 + fm;
  }
  pill.className = 'pill' + (aberto ? '' : ' shut');
  pill.innerHTML = `<i></i>${aberto ? 'Aberto agora' : 'Fechado agora'}`;
}

/* ------------------------------------------------ TEMA CLARO / ESCURO */
/* A página troca de superfície conforme a seção cruza o meio da tela.
   É o que dá identidade sem precisar de enfeite. */
{
  const secoes = $$('[data-theme]');
  let atual = 'dark';
  const aplica = () => {
    const meio = innerHeight * 0.5;
    let tema = secoes[0].dataset.theme;
    for (const s of secoes) {
      const r = s.getBoundingClientRect();
      if (r.top <= meio) tema = s.dataset.theme;
    }
    if (tema !== atual) { atual = tema; document.body.dataset.t = tema; }
  };
  addEventListener('scroll', () => requestAnimationFrame(aplica), { passive:true });
  addEventListener('resize', aplica);
  aplica();
}

/* ------------------------------------------------- HEADER · BARRA · NAV */
{
  const hd = $('#hd'), bar = $('#bar'), wa = $('#wa');
  const links = $$('#nav a');
  const alvos = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  let esperando = false;

  const aoRolar = () => {
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    hd.classList.toggle('on', y > 40);
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    wa.classList.toggle('on', y > 500);

    let id = '';
    for (const s of alvos) if (s.offsetTop - 160 <= y) id = s.id;
    links.forEach(a => {
      a.getAttribute('href') === '#' + id
        ? a.setAttribute('aria-current', 'true')
        : a.removeAttribute('aria-current');
    });
    esperando = false;
  };
  addEventListener('scroll', () => { if (!esperando) { esperando = true; requestAnimationFrame(aoRolar); } }, { passive:true });
  aoRolar();
}

/* ---------------------------------------------------------- MENU MOBILE */
{
  const burger = $('#burger'), drawer = $('#drawer');
  const alterna = (forcar) => {
    const abrir = forcar ?? !drawer.classList.contains('on');
    drawer.classList.toggle('on', abrir);
    burger.classList.toggle('on', abrir);
    burger.setAttribute('aria-expanded', String(abrir));
    drawer.setAttribute('aria-hidden', String(!abrir));
    document.body.style.overflow = abrir ? 'hidden' : '';
  };
  burger.addEventListener('click', () => alterna());
  drawer.addEventListener('click', e => { if (e.target.closest('a')) alterna(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') alterna(false); });
}

/* ----------------------------------------------- REVELAÇÃO NA ROLAGEM */
{
  // quebra o parágrafo em linhas reais para revelar uma a uma
  const emLinhas = (el) => {
    const txt = el.innerHTML;
    el.innerHTML = txt.split(/<br\s*\/?>/i)
      .map(l => `<span class="ln"><span>${l.trim()}</span></span>`).join('');
    el.classList.add('lines');
    [...el.querySelectorAll('.ln > span')].forEach((s, i) => {
      s.style.transitionDelay = `${i * 90}ms`;
    });
  };
  $$('[data-lines]').forEach(emLinhas);

  const alvos = [...$$('[data-rv]'), ...$$('[data-lines]'), ...$$('.step')];
  if (reduz || !('IntersectionObserver' in window)) {
    alvos.forEach(e => e.classList.add('in'));
  } else {
    const io = new IntersectionObserver((ents, obs) => {
      ents.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        obs.unobserve(en.target);
      });
    }, { rootMargin:'0px 0px -8% 0px', threshold:0.05 });
    alvos.forEach(e => io.observe(e));
  }
}

/* ------------------------------------------------------------ CONTADORES */
{
  const nums = $$('[data-count]');
  const anima = (el) => {
    const alvo = +el.dataset.count;
    if (reduz) { el.textContent = alvo; return; }
    el.textContent = '0';
    const t0 = performance.now(), dur = 1700;
    const passo = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 4)));
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es, obs) => {
      es.forEach(e => { if (e.isIntersecting) { anima(e.target); obs.unobserve(e.target); } });
    }, { threshold:0.6 });
    nums.forEach(n => io.observe(n));
  } else nums.forEach(anima);
}

/* --------------------------------------------------------------- PARALLAX */
/* As imagens andam mais devagar que o quadro que as recorta. */
if (!reduz) {
  const camadas = [...$$('[data-par]'), ...$$('.fr'), ...$$('.shot')];
  let esperando = false;
  const mover = () => {
    const h = innerHeight;
    for (const el of camadas) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > h + 200) continue;
      const img = el.matches('[data-par]') ? el.querySelector('img') : el.querySelector('img');
      if (!img) continue;
      const forca = el.dataset.par ? +el.dataset.par : 0.08;
      const centro = (r.top + r.height / 2 - h / 2) / h;      // -1 … 1
      img.style.transform = `translate3d(0,${(-centro * forca * 100).toFixed(2)}px,0)`;
    }
    esperando = false;
  };
  addEventListener('scroll', () => { if (!esperando) { esperando = true; requestAnimationFrame(mover); } }, { passive:true });
  addEventListener('resize', mover);
  mover();
}

/* ------------------------------------------- ÍNDICE: FOTO NO CURSOR */
{
  const linhas = $$('.idx-row');
  const fly = $('#idxFly');
  const desktop = matchMedia('(min-width:1000px)');
  let montado = null;

  const montaDesktop = () => {
    linhas.forEach(l => l.querySelector('.idx-img')?.remove());
    fly.innerHTML = linhas.map((l, i) =>
      `<img src="assets/img/${l.dataset.img}.jpg" alt="" loading="lazy" decoding="async" data-k="${i}">`
    ).join('');
  };
  const montaMobile = () => {
    fly.innerHTML = '';
    linhas.forEach(l => {
      if (l.querySelector('.idx-img')) return;
      l.insertAdjacentHTML('afterbegin',
        `<span class="idx-img">${foto(l.dataset.img, l.dataset.cap)}</span>`);
    });
  };
  const aplica = () => {
    const modo = desktop.matches ? 'd' : 'm';
    if (modo === montado) return;
    montado = modo;
    modo === 'd' ? montaDesktop() : montaMobile();
  };
  aplica();
  desktop.addEventListener('change', aplica);

  const ativa = (i) => {
    linhas.forEach((l, k) => l.classList.toggle('on', k === i));
    if (!desktop.matches || !fino) return;
    fly.classList.add('on');
    $$('img', fly).forEach(img => img.classList.toggle('on', +img.dataset.k === i));
  };
  const desativa = () => {
    linhas.forEach(l => l.classList.remove('on'));
    fly.classList.remove('on');
  };

  linhas.forEach((l, i) => {
    l.addEventListener('pointerenter', () => desktop.matches && ativa(i));
    l.addEventListener('focus', () => ativa(i));
  });
  $('#idx').addEventListener('pointerleave', desativa);

  // a foto segue o cursor com atraso
  if (fino && !reduz) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    addEventListener('pointermove', e => {
      // abaixo e à direita do cursor, dentro da tela: nunca cobre a linha lida
      const l = fly.offsetWidth  || 240;
      const a = fly.offsetHeight || 300;
      mx = clamp(e.clientX + 190, l / 2 + 12, innerWidth  - l / 2 - 12);
      my = clamp(e.clientY + 130, a / 2 + 12, innerHeight - a / 2 - 12);
    });
    const seguir = () => {
      fx = lerp(fx, mx, 0.12); fy = lerp(fy, my, 0.12);
      fly.style.translate = `${fx}px ${fy}px`;
      requestAnimationFrame(seguir);
    };
    requestAnimationFrame(seguir);
  }
}

/* --------------------------------------------------------------- CURSOR */
if (fino && !reduz) {
  const cur = $('#cur'), rot = cur.querySelector('b');
  let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    if (!cur.classList.contains('live')) { cx = mx; cy = my; cur.classList.add('live'); }
  });
  const seguir = () => {
    cx = lerp(cx, mx, 0.2); cy = lerp(cy, my, 0.2);
    cur.style.translate = `${cx}px ${cy}px`;
    requestAnimationFrame(seguir);
  };
  requestAnimationFrame(seguir);

  const liga = (el) => {
    el.addEventListener('pointerenter', () => {
      cur.classList.add('big'); rot.textContent = el.dataset.cursor || '';
    });
    el.addEventListener('pointerleave', () => cur.classList.remove('big'));
  };
  $$('[data-cursor]').forEach(liga);
  new MutationObserver(() => $$('[data-cursor]:not([data-cur-on])').forEach(el => {
    el.dataset.curOn = '1'; liga(el);
  })).observe(document.body, { childList:true, subtree:true });
}

/* ----------------------------------- BOTÃO: preenchimento a partir do cursor */
if (fino) {
  $$('.btn').forEach(b => {
    b.addEventListener('pointerenter', e => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--px', `${e.clientX - r.left}px`);
      b.style.setProperty('--py', `${e.clientY - r.top}px`);
    });
    b.addEventListener('pointerleave', e => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--px', `${e.clientX - r.left}px`);
      b.style.setProperty('--py', `${e.clientY - r.top}px`);
    });
  });
}

/* -------------------------------------------------------------- LIGHTBOX */
{
  const lb = $('#lb'), img = $('#lbImg'), cap = $('#lbCap');
  let i = 0;

  const mostra = (k) => {
    i = (k + GALERIA.length) % GALERIA.length;
    const g = GALERIA[i];
    img.src = `assets/img/${g.f}.jpg`;
    img.alt = g.a;
    cap.textContent = `${g.c}  ·  ${String(i + 1).padStart(2, '0')}/${GALERIA.length}`;
  };
  const abre = (k) => { mostra(k); lb.classList.add('on'); document.body.style.overflow = 'hidden'; };
  const fecha = () => { lb.classList.remove('on'); document.body.style.overflow = ''; };

  const track = $('#pinTrack');
  track.addEventListener('click', e => {
    const f = e.target.closest('[data-lb]');
    if (f && !track.classList.contains('drag')) abre(+f.dataset.lb);
  });
  track.addEventListener('keydown', e => {
    const f = e.target.closest('[data-lb]');
    if (f && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); abre(+f.dataset.lb); }
  });

  $('#lbx').addEventListener('click', fecha);
  $('#lbp').addEventListener('click', () => mostra(i - 1));
  $('#lbn').addEventListener('click', () => mostra(i + 1));
  lb.addEventListener('click', e => { if (e.target === lb) fecha(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape')     fecha();
    if (e.key === 'ArrowLeft')  mostra(i - 1);
    if (e.key === 'ArrowRight') mostra(i + 1);
  });
}

/* ================================================================ UTILS == */

/** Arrasto horizontal com o mouse, preservando cliques. */
function arrastavel(track, ativo = () => true) {
  let baixo = false, arrastando = false, x0 = 0, s0 = 0;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !ativo()) return;
    baixo = true; arrastando = false; x0 = e.clientX; s0 = track.scrollLeft;
  });
  addEventListener('pointermove', e => {
    if (!baixo) return;
    const dx = e.clientX - x0;
    if (!arrastando && Math.abs(dx) > 6) { arrastando = true; track.classList.add('drag'); }
    if (arrastando) track.scrollLeft = s0 - dx;
  });
  addEventListener('pointerup', () => {
    if (!baixo) return;
    baixo = false;
    if (!arrastando) return;
    track.classList.remove('drag');
    setTimeout(() => { arrastando = false; }, 0);
  });
  track.addEventListener('click', e => {
    if (arrastando) { e.stopPropagation(); e.preventDefault(); }
  }, true);
}

})();
