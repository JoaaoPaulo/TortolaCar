/* =========================================================================
   TortolaCar Detail — interações da landing page
   ========================================================================= */
(() => {
'use strict';

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- dados */
const SERVICOS = [
  { t:'Lavagem técnica', d:'Método dos dois baldes, pH neutro e descontaminação química. A base de todo trabalho bem feito.',
    i:'<path d="M12 2.7s6 6.4 6 10.5a6 6 0 0 1-12 0C6 9.1 12 2.7 12 2.7Z"/><path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5"/>' },
  { t:'Polimento técnico', d:'Correção em múltiplas etapas que remove riscos, hologramas e oxidação até recuperar a profundidade da cor.',
    i:'<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="2.6"/><path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3"/>' },
  { t:'Polimento comercial', d:'Realce rápido de brilho para quem vai vender o veículo ou quer um refresh sem correção profunda.',
    i:'<path d="m12 3 2.3 6.2 6.7.3-5.2 4.2 1.8 6.4L12 16.6 6.4 20l1.8-6.4L3 9.5l6.7-.3Z"/>' },
  { t:'Vitrificação', d:'Camada cerâmica de longa duração: brilho profundo, efeito hidrofóbico e proteção real contra intempéries.',
    i:'<path d="m12 2.8 7.5 4.3v9.8L12 21.2 4.5 16.9V7.1Z"/><path d="M12 2.8v18.4M4.5 7.1 12 11.4l7.5-4.3"/>' },
  { t:'Cristalização', d:'Selagem que devolve maciez e brilho à pintura, com ótimo custo-benefício e aplicação rápida.',
    i:'<path d="M12 2.5 15 9l6.5 3-6.5 3-3 6.5L9 15l-6.5-3L9 9Z"/>' },
  { t:'Espelhamento', d:'Acabamento espelhado de concurso: refino máximo do verniz para um reflexo sem distorção.',
    i:'<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M7 16.5 11 11l3 3.4 2-2.4 1.5 4.5Z"/>' },
  { t:'PPF', d:'Película de proteção transparente contra pedras, riscos e atrito nas áreas mais expostas da carroceria.',
    i:'<path d="M12 2.8 5 5.6v6c0 4.2 2.9 7.6 7 9.6 4.1-2 7-5.4 7-9.6v-6Z"/><path d="m9.3 12 2 2 3.6-3.8"/>' },
  { t:'Higienização interna', d:'Extratora, vapor e produtos específicos em bancos, forros, carpete e ar-condicionado. Sai cheirando a novo.',
    i:'<path d="M6 20V9.5A3.5 3.5 0 0 1 9.5 6h5A3.5 3.5 0 0 1 18 9.5V20"/><path d="M4 20h16M8 6V4.6A1.6 1.6 0 0 1 9.6 3h4.8A1.6 1.6 0 0 1 16 4.6V6"/>' },
  { t:'Higienização de couro', d:'Limpeza profunda e hidratação que preserva a maciez e evita ressecamento e trincas.',
    i:'<path d="M4.5 8.5c2.5-3 5-4 7.5-4s5 1 7.5 4c-1.5 6-4 9-7.5 11-3.5-2-6-5-7.5-11Z"/><path d="M12 4.5v15"/>' },
  { t:'Faróis &amp; vidros', d:'Restauração de faróis amarelados e polimento de vidros com remoção de chuva ácida e marcas de palheta.',
    i:'<path d="M14.5 5.2A7 7 0 0 1 14.5 18.8"/><path d="M4 12a5.5 5.5 0 0 1 5.5-5.5H14v11H9.5A5.5 5.5 0 0 1 4 12Z"/>' },
  { t:'Chassi &amp; motor', d:'Limpeza detalhada do vão do motor e do chassi, com proteção de plásticos e mangueiras.',
    i:'<path d="M3.5 15v-4h3l2-2.5h5l2 2.5h3v4h-2.2a2.3 2.3 0 0 1-4.6 0H10a2.3 2.3 0 0 1-4.6 0Z"/>' },
  { t:'Motos', d:'Detalhamento completo de motocicletas — de uso urbano a motos de pista. Parafuso por parafuso.',
    i:'<circle cx="5.5" cy="16" r="3.2"/><circle cx="18.5" cy="16" r="3.2"/><path d="M5.5 16 9 9.5h5l2 3.5M12.5 9.5h3.2M9 9.5 8 7"/>' }
];

const GALERIA = [
  { f:'porsche',       a:'Porsche Macan branco finalizado no box da TortolaCar Detail',  c:'Porsche Macan — finalização' },
  { f:'bmw',           a:'BMW Série 1 preta com pintura espelhada após polimento',       c:'BMW — polimento &amp; brilho' },
  { f:'polimento',     a:'Polimento técnico sendo executado em um sedã vermelho',        c:'Polimento técnico' },
  { f:'fusion',        a:'Ford Fusion branco no box com piso modular e faixa vermelha',  c:'Ford Fusion — entrega' },
  { f:'lavagem',       a:'Honda HR-V coberto de espuma durante lavagem técnica',         c:'Lavagem técnica' },
  { f:'civic',         a:'Honda Civic branco com pintura refletindo o LED do box',       c:'Honda Civic — acabamento' },
  { f:'rangerover',    a:'Range Rover Sport preta em frente à fachada da loja',          c:'Range Rover — na fachada' },
  { f:'motos',         a:'Motocicletas em detalhamento no box da TortolaCar Detail',     c:'Motos — detalhamento' },
  { f:'moto-race',     a:'Moto de pista laranja preparada no box',                       c:'Moto de pista' },
  { f:'moto-race2',    a:'Moto de pista azul preparada no box',                          c:'Preparação de pista' },
  { f:'fachada',       a:'Audi Q3 prata em frente à fachada da TortolaCar Detail',       c:'Audi Q3 — na fachada' },
  { f:'moto-twister',  a:'Honda Twister preta com brilho após detalhamento',             c:'Honda Twister' }
];

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
    t:'Ótimo atendimento. Serviço excelente.\nCarro com aparência de novo.\nConserteza quando precisar, não terei dúvida que é no TortolaCar que levarei meu carro para um trato especial.' }
];

const HORARIOS = [
  { d:'Segunda',       h:'08:00 — 18:00', open:['08:00','18:00'] },
  { d:'Terça',         h:'08:00 — 18:00', open:['08:00','18:00'] },
  { d:'Quarta',        h:'08:00 — 18:00', open:['08:00','18:00'] },
  { d:'Quinta',        h:'08:00 — 18:00', open:['08:00','18:00'] },
  { d:'Sexta',         h:'08:00 — 18:00', open:['08:00','18:00'] },
  { d:'Sábado',        h:'Fechado', open:null },
  { d:'Domingo',       h:'Fechado', open:null }
];

const STAR = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>';

/** Iniciais do cliente para o avatar do card de avaliação. */
const iniciais = (nome) => nome.trim().split(/\s+/)
  .filter(p => p.length > 2)            // ignora "dos", "de", "da"
  .slice(0, 2)
  .map(p => p[0].toUpperCase())
  .join('');

/* ------------------------------------------------------------ preloader */
const hidePreloader = () => {
  const p = $('#preloader');
  if (p) setTimeout(() => p.classList.add('done'), 380);
};
addEventListener('load', hidePreloader);
setTimeout(hidePreloader, 3500); // rede lenta não pode travar a página

/* ------------------------------------------------------------- marquee  */
{
  const track = $('#marquee');
  const itens = ['Polimento técnico','Vitrificação','PPF','Cristalização','Espelhamento',
                 'Higienização interna','Restauração de faróis','Lavagem técnica','Motos','Micro pintura'];
  const bloco = itens.map(t => `<span>${t}</span>`).join('');
  track.innerHTML = bloco + bloco; // duplicado para o loop contínuo
}

/* ------------------------------------------------------------- serviços */
{
  const grid = $('#svcGrid');
  grid.innerHTML = SERVICOS.map((s, k) => `
    <article class="svc" data-rv style="transition-delay:${(k % 4) * 70}ms">
      <span class="svc-n">${String(k + 1).padStart(2, '0')}</span>
      <span class="svc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${s.i}</svg></span>
      <h3>${s.t}</h3>
      <p>${s.d}</p>
    </article>`).join('');
}

/* -------------------------------------------------------------- galeria */
{
  const track = $('#galTrack');
  track.innerHTML = GALERIA.map((g, k) => `
    <figure class="shot" tabindex="0" role="button" data-lb="${k}" aria-label="Ampliar: ${g.c.replace(/&amp;/g,'e')}">
      <picture>
        <source srcset="assets/img/${g.f}.webp" type="image/webp">
        <img src="assets/img/${g.f}.jpg" alt="${g.a}" loading="${k < 2 ? 'eager' : 'lazy'}" decoding="async">
      </picture>
      <span class="zoom"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8.5v5M8.5 11h5"/></svg></span>
      <figcaption>${g.c}</figcaption>
    </figure>`).join('');
}

/* ----------------------------------------------------------- avaliações */
{
  const track = $('#revTrack');
  track.innerHTML = AVALIACOES.map(r => `
    <article class="rev">
      <header class="rev-top">
        <span class="rev-av" aria-hidden="true">${iniciais(r.n)}</span>
        <div>
          <b>${r.n}</b>
          <span>${r.q}</span>
        </div>
      </header>
      <span class="stars" aria-label="5 de 5 estrelas">${STAR.repeat(5)}</span>
      <p class="rev-txt">${r.t}</p>
      ${r.t.length > 300 ? '<button class="rev-more" type="button">Ler avaliação completa</button>' : ''}
      <footer class="rev-foot">
        <svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 24 44c11 0 20-9 20-20 0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7A20 20 0 0 0 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>
        Avaliação verificada no Google
      </footer>
    </article>`).join('');
}

/* “ler mais” nas avaliações longas */
{
  $('#revTrack').addEventListener('click', e => {
    const b = e.target.closest('.rev-more');
    if (!b) return;
    const card = b.closest('.rev');
    const aberto = card.classList.toggle('expandido');
    b.textContent = aberto ? 'Recolher' : 'Ler avaliação completa';
  });
}

/* -------------------------------------------------------------- horário */
{
  const box  = $('#hours');
  const pill = $('#openPill');
  const hoje = (new Date().getDay() + 6) % 7; // 0 = segunda

  box.innerHTML = HORARIOS.map((h, k) => `
    <div class="${k === hoje ? 'today' : ''}">
      <span>${k === hoje ? '<b>' + h.d + '</b>' : h.d}</span>
      <span>${h.h}</span>
    </div>`).join('');

  const agora = new Date();
  const cfg   = HORARIOS[hoje].open;
  let aberto = false;
  if (cfg) {
    const min = agora.getHours() * 60 + agora.getMinutes();
    const [ah, am] = cfg[0].split(':').map(Number);
    const [fh, fm] = cfg[1].split(':').map(Number);
    aberto = min >= ah * 60 + am && min < fh * 60 + fm;
  }
  pill.className = 'open-pill' + (aberto ? '' : ' closed');
  pill.innerHTML = `<i></i>${aberto ? 'Aberto agora' : 'Fechado agora'}`;
}

$('#yr').textContent = new Date().getFullYear();

/* --------------------------------------------------------------- header */
{
  const header = $('#header');
  const bar    = $('#progress');
  const wa     = $('#wa');
  const links  = $$('#nav a');
  const secs   = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  let ticking = false;

  const onScroll = () => {
    const y   = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    header.classList.toggle('scrolled', y > 40);
    bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    wa.classList.toggle('show', y > 420);

    let atual = '';
    for (const s of secs) if (s.offsetTop - 140 <= y) atual = s.id;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + atual));
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive:true });
  onScroll();
}

/* ------------------------------------------------------------ menu mob. */
{
  const burger = $('#burger');
  const drawer = $('#drawer');
  const toggle = (forcar) => {
    const abrir = forcar ?? !drawer.classList.contains('open');
    drawer.classList.toggle('open', abrir);
    burger.classList.toggle('open', abrir);
    burger.setAttribute('aria-expanded', String(abrir));
    drawer.setAttribute('aria-hidden', String(!abrir));
    document.body.style.overflow = abrir ? 'hidden' : '';
  };
  burger.addEventListener('click', () => toggle());
  drawer.addEventListener('click', e => { if (e.target.tagName === 'A') toggle(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
}

/* --------------------------------------------------------- scroll reveal */
{
  const alvos = $$('[data-rv]');
  if (reduce || !('IntersectionObserver' in window)) {
    alvos.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, { rootMargin:'0px 0px -8% 0px', threshold:0.08 });
    alvos.forEach(el => io.observe(el));
  }
}

/* ------------------------------------------------------------ contadores */
{
  const nums = $$('[data-count]');
  const anima = (el) => {
    const alvo = +el.dataset.count;
    el.textContent = '0';
    if (reduce) { el.textContent = alvo; return; }
    const dur = 1500;
    const t0 = performance.now();
    const passo = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es, obs) => {
      es.forEach(e => { if (e.isIntersecting) { anima(e.target); obs.unobserve(e.target); } });
    }, { threshold:0.5 });
    nums.forEach(n => io.observe(n));
  } else nums.forEach(anima);
}

/* ------------------------------------------------------------ carrosséis */
function montaCarrossel(nome) {
  const track = $(`[data-car="${nome}"]`);
  if (!track) return;
  const prev = $(`[data-car-prev="${nome}"]`);
  const next = $(`[data-car-next="${nome}"]`);
  const dots = $(`[data-car-dots="${nome}"]`);
  const itens = [...track.children];
  if (!itens.length) return;

  const passo = () => {
    const a = itens[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || 16);
    return a + gap;
  };
  const porTela = () => Math.max(1, Math.round(track.clientWidth / passo()));
  const paginas = () => Math.max(1, itens.length - porTela() + 1);

  /* pontos */
  const desenhaDots = () => {
    const n = paginas();
    dots.innerHTML = Array.from({ length:n }, (_, k) =>
      `<button type="button" aria-label="Ir para o item ${k + 1}"></button>`).join('');
    [...dots.children].forEach((b, k) =>
      b.addEventListener('click', () => track.scrollTo({ left: k * passo(), behavior:'smooth' })));
  };
  desenhaDots();

  const sync = () => {
    const idx = Math.round(track.scrollLeft / passo());
    [...dots.children].forEach((b, k) => b.classList.toggle('on', k === idx));
    prev.disabled = track.scrollLeft < 6;
    next.disabled = track.scrollLeft > track.scrollWidth - track.clientWidth - 6;
  };
  track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive:true });
  sync();

  prev.addEventListener('click', () => track.scrollBy({ left:-passo() * porTela(), behavior:'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: passo() * porTela(), behavior:'smooth' }));

  /* arrastar com o mouse (o touch usa o scroll nativo) */
  let baixo = false, arrastando = false, x0 = 0, s0 = 0;
  track.addEventListener('pointerdown', e => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    baixo = true; arrastando = false;
    x0 = e.clientX; s0 = track.scrollLeft;
  });
  addEventListener('pointermove', e => {
    if (!baixo) return;
    const dx = e.clientX - x0;
    // só vira arrasto depois de um limiar: cliques em links e botões continuam funcionando
    if (!arrastando && Math.abs(dx) > 6) { arrastando = true; track.classList.add('dragging'); }
    if (arrastando) track.scrollLeft = s0 - dx;
  });
  addEventListener('pointerup', () => {
    if (!baixo) return;
    baixo = false;
    if (!arrastando) return;
    track.classList.remove('dragging');
    track.scrollTo({ left: Math.round(track.scrollLeft / passo()) * passo(), behavior:'smooth' });
    // impede que o clique de fim de arrasto abra o lightbox
    setTimeout(() => { arrastando = false; }, 0);
  });
  track.addEventListener('click', e => { if (arrastando) { e.stopPropagation(); e.preventDefault(); } }, true);

  let t;
  addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => { desenhaDots(); sync(); }, 180);
  });
}
montaCarrossel('gal');
montaCarrossel('rev');

/* -------------------------------------------------------------- lightbox */
{
  const lb  = $('#lb'), img = $('#lbImg'), cap = $('#lbCap');
  let i = 0;

  const mostra = (k) => {
    i = (k + GALERIA.length) % GALERIA.length;
    const g = GALERIA[i];
    img.src = `assets/img/${g.f}.jpg`;
    img.alt = g.a;
    cap.innerHTML = `${g.c} <span style="color:var(--txt-3)">— ${i + 1}/${GALERIA.length}</span>`;
  };
  const abre = (k) => {
    mostra(k);
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const fecha = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };

  $('#galTrack').addEventListener('click', e => {
    const fig = e.target.closest('[data-lb]');
    if (fig && !$('#galTrack').classList.contains('dragging')) abre(+fig.dataset.lb);
  });
  $('#galTrack').addEventListener('keydown', e => {
    const fig = e.target.closest('[data-lb]');
    if (fig && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); abre(+fig.dataset.lb); }
  });

  $('#lbX').addEventListener('click', fecha);
  $('#lbP').addEventListener('click', () => mostra(i - 1));
  $('#lbN').addEventListener('click', () => mostra(i + 1));
  lb.addEventListener('click', e => { if (e.target === lb) fecha(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     fecha();
    if (e.key === 'ArrowLeft')  mostra(i - 1);
    if (e.key === 'ArrowRight') mostra(i + 1);
  });
}

/* ------------------------------------------------------- parallax do hero */
if (!reduce) {
  const media = $('.hero-media');
  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      if (y < innerHeight * 1.2) media.style.transform = `translate3d(0,${y * 0.28}px,0)`;
      ticking = false;
    });
  }, { passive:true });
}

/* ------------------------------------------------- inclinação nos cartões */
if (!reduce && matchMedia('(hover:hover) and (pointer:fine)').matches) {
  $$('.svc').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width  - .5;
      const py = (e.clientY - r.top)  / r.height - .5;
      card.style.transform =
        `translateY(-6px) perspective(760px) rotateX(${-py * 4.5}deg) rotateY(${px * 5.5}deg)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

})();
