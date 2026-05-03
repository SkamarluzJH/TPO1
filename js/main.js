// ============================================
// DYNAMIS — Sistema Nexus
// Archivo: js/main.js
// Arquitectura SPA Vanilla JS
// ============================================


// ── BASE DE DATOS DEL EQUIPO ──
const equipo = [
  {
    id: 'ximena',
    initials: 'XF',
    nombre: 'Ximena Facal',
    rol: 'FRONTEND DEV',
    crewId: 'CREW-001',
    base: 'Laboratorios Dynamis',
    estado: 'OPERATIVA',
    habilidades: ['HTML5', 'CSS3 Avanzado', 'JavaScript ES6', 'Figma'],
    foto: 'img/ximena/foto.png',
    profilePage: 'ximena.html',
    peliculas: ['Iron Man', 'Spider-Verse', 'Matrix'],
    discos: ['Random Access Memories', 'The Dark Side of the Moon', 'Discovery'],
  },
  {
    id: 'franco',
    initials: 'FG',
    nombre: 'Franco Guarachi',
    rol: 'UI DESIGNER',
    crewId: 'CREW-002',
    base: 'Servidores Subterráneos',
    estado: 'EN LÍNEA',
    habilidades: ['CSS', 'Figma', 'Git', 'Node.js'],
    foto: 'img/franco/foto.png',
    profilePage: 'franco.html',
    peliculas: ['The Dark Knight', 'Inception', 'Logan'],
    discos: ['Abbey Road', 'Ok Computer', 'Thriller'],
  },
  {
    id: 'rodrigo',
    initials: 'RP',
    nombre: 'Rodrigo Pinto',
    rol: 'FULLSTACK DEV',
    crewId: 'CREW-003',
    base: 'La Nube Oscura',
    estado: 'CONECTADO',
    habilidades: ['JS', 'Node', 'SQL', 'Python'],
    foto: 'img/avatar-rodrigo.jpg',
    profilePage: 'rodrigo.html',
    peliculas: ['Doctor Strange', 'Interstellar', 'Dune'],
    discos: ['A Night at the Opera', 'Rumours', 'Back in Black'],
  },
  {
    id: 'mara',
    initials: 'MS',
    nombre: 'Mara Skaarup',
    rol: 'BACKEND DEV',
    crewId: 'CREW-004',
    base: 'Estudio Orbital',
    estado: 'ACTIVA',
    habilidades: ['Python', 'APIs', 'Git', 'UI/UX'],
    foto: 'img/mara/foto.png',
    profilePage: 'mara.html',
    peliculas: ['Scott Pilgrim', 'Akira', 'Guardianes de la Galaxia'],
    discos: ['Demon Days', 'Currents', 'AM'],
  },
];

// Estado global de la app
const state = {
  expandedCard: null,
  secretOpen: {},
};


// ── CURSOR PERSONALIZADO ──
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cur.style.left  = e.clientX + 'px';
  cur.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

document.addEventListener('mouseover', e => {
  const interactive = e.target.closest('a, button, .crew-card');
  if (interactive) {
    ring.style.width  = '54px';
    ring.style.height = '54px';
    ring.style.opacity = '.9';
  } else {
    ring.style.width  = '34px';
    ring.style.height = '34px';
    ring.style.opacity = '.55';
  }
});


// ── EFECTO SFX ──
const sfxWords = ['ZAAAP!', 'PING!', 'ACCESS!', 'SCAN!', 'CLICK!', 'SYNC!'];

function triggerSFX(e, word) {
  const el = document.createElement('div');
  el.className = 'space-sfx';
  el.textContent = word || sfxWords[Math.floor(Math.random() * sfxWords.length)];
  el.style.left = `${e.clientX}px`;
  el.style.top  = `${e.clientY}px`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 520);
}


// ── SCAN OVERLAY ──
function triggerScan() {
  const overlay = document.getElementById('scan-overlay');
  overlay.classList.add('active');
  setTimeout(() => overlay.classList.remove('active'), 1500);
}


// ── TYPEWRITER ──
let twInterval = null;

function startTypewriter(elementId, phrases) {
  if (twInterval) clearTimeout(twInterval);
  const el = document.getElementById(elementId);
  if (!el) return;

  let pIdx = 0, cIdx = 0, deleting = false;

  function type() {
    if (!document.getElementById(elementId)) return;
    const phrase = phrases[pIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) { deleting = true; twInterval = setTimeout(type, 2000); return; }
    } else {
      el.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
    }
    twInterval = setTimeout(type, deleting ? 38 : 65);
  }

  twInterval = setTimeout(type, 600);
}


// ── CONTADORES ANIMADOS ──
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = +el.dataset.target;
    const dur = 1200;
    const start = performance.now();
    function step(now) {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(ease * target);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}


// ── COMPONENTE: TARJETA DE TRIPULANTE (nombre + foto full) ──
function CrewCard(miembro, delay) {
  return `
    <div class="profile-card smash-in"
         id="card-${miembro.id}"
         style="animation-delay: ${delay}s"
         onclick="handleCardClick(event, '${miembro.id}')">

      <div class="profile-card-name">${miembro.nombre}</div>

      <div class="profile-card-photo">
        <img src="${miembro.foto}"
             alt="${miembro.nombre}"
             onerror="this.style.display='none'; this.parentElement.querySelector('.profile-card-fallback').style.display='flex'">
        <div class="profile-card-fallback" style="display:none">${miembro.initials}</div>
      </div>

    </div>
  `;
}


// ── COMPONENTE: PÁGINA HOME ──
function Home() {
  const cardsHTML = equipo
    .map((m, i) => CrewCard(m, i * 0.12))
    .join('');

  return `
    <section class="hero-section">
      <div class="hero-badge">IFTS N°29 // TP1 // 2026</div>

      <h1 class="hero-title">
        DYNAMIS <span class="title-accent">CREW</span>
      </h1>
      <p class="hero-subtitle">EQUIPO DE DESARROLLO WEB — MISIÓN EN CURSO</p>

      <div class="typewriter-wrap">
        <span id="typewriter"></span>
      </div>

      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number" data-target="4">0</span>
          <span class="stat-label">Tripulantes</span>
        </div>
        <div class="stat">
          <span class="stat-number" data-target="10">0</span>
          <span class="stat-label">Tecnologías</span>
        </div>
        <div class="stat">
          <span class="stat-number" data-target="1">0</span>
          <span class="stat-label">Misión</span>
        </div>
      </div>

      <button class="btn-scan" onclick="handleScan(event)">
        ▶ INICIAR ESCANEO
      </button>
    </section>

    <section class="crew-section" id="crew-section">
      <div class="section-header">
        <h2>// TRIPULANTES</h2>
        <div class="header-line"></div>
        <span class="header-count">${equipo.length} AGENTES REGISTRADOS</span>
      </div>
      <div class="crew-grid" id="crew-grid">
        ${cardsHTML}
      </div>
    </section>

    <section class="mission-section">
      <div class="section-header">
        <h2>// MISIÓN</h2>
        <div class="header-line"></div>
      </div>
      <div class="mission-grid">
        <div class="mission-text">
          <p>Somos <span>DYNAMIS CREW</span>, un equipo de estudiantes del IFTS N°29 unidos para desarrollar este proyecto web como parte del <span>Trabajo Práctico 1</span>.</p>
          <p>Nuestra misión: construir un sitio cohesionado donde cada integrante presente sus habilidades y deje registro en la <span>bitácora de desarrollo</span>.</p>
          <p>Stack tecnológico: <span>HTML5</span> · <span>CSS3</span> · <span>JavaScript</span> puro — desplegado en <span>Vercel</span>.</p>
        </div>
        <div class="terminal-box">
          <div class="term-titlebar">
            <div class="term-dot" style="background:#ff5f57"></div>
            <div class="term-dot" style="background:#ffbd2e"></div>
            <div class="term-dot" style="background:#28c940"></div>
            <span class="term-title-text">dynamis ~ status</span>
          </div>
          <div class="term-body">
            <div><span class="t-prompt">$</span><span class="t-cmd"> crew --status</span></div>
            <div class="t-out">▸ EQUIPO: DYNAMIS CREW</div>
            <div class="t-out">▸ INTEGRANTES: 4</div>
            <div class="t-out">▸ ESTADO: EN DESARROLLO</div>
            <div><span class="t-prompt">$</span><span class="t-cmd"> deploy --target vercel</span></div>
            <div class="t-ok">▸ BUILD: OK</div>
            <div class="t-ok">▸ DEPLOY: EXITOSO ✓</div>
            <div><span class="t-prompt">$</span> <span class="t-cursor">▋</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="bitacora-section">
      <div class="section-header">
        <h2>// BITÁCORA</h2>
        <div class="header-line"></div>
      </div>
      <div class="bitacora-preview">
        <h2 style="font-family:'Orbitron',sans-serif; font-size:.82rem; letter-spacing:6px; color:var(--cyan)">
          // REGISTRO DE MISIÓN
        </h2>
        <p>Cada decisión, dificultad y cambio queda documentado en nuestra bitácora de misión. Transparencia total del proceso.</p>
        <a class="btn-outline" href="#" onclick="navigate('bitacora'); return false;">
          VER BITÁCORA →
        </a>
      </div>
    </section>
  `;
}


// ── COMPONENTE: PÁGINA BITÁCORA ──
const logs = [
  {
    fecha: '2026-04-01',
    titulo: 'ARQUITECTURA SPA',
    cuerpo: 'Decisión de estructura Single Page Application en Vanilla JS. El componente Home() y Bitacora() se renderizan dinámicamente. Preparación para migración a React.'
  },
  {
    fecha: '2026-04-05',
    titulo: 'SISTEMA DE CURSOR PERSONALIZADO',
    cuerpo: 'Implementado cursor doble con dot + ring. El ring crece al pasar por elementos interactivos (a, button, .crew-card) usando mouseover delegado.'
  },
  {
    fecha: '2026-04-10',
    titulo: 'TARJETAS EXPANDIBLES + ESTADO GLOBAL',
    cuerpo: 'Se incorporó state.expandedCard para tracking del card abierto. Al expandir, el card ocupa grid-column: span 2. Los archivos clasificados tienen su propio estado state.secretOpen[id].'
  },
  {
    fecha: '2026-04-15',
    titulo: 'DEPLOY EN VERCEL',
    cuerpo: 'Primer deploy exitoso. Build OK, todos los assets cargando correctamente. URL de producción activa.'
  },
];

function Bitacora() {
  const entriesHTML = logs.map((log, i) => `
    <div class="log-entry smash-in" style="animation-delay: ${i * 0.1}s">
      <div class="log-date">// ${log.fecha}</div>
      <div class="log-title">${log.titulo}</div>
      <p class="log-body">${log.cuerpo}</p>
    </div>
  `).join('');

  return `
    <section class="bitacora-page">
      <div class="section-header">
        <h2>// BITÁCORA DE MISIÓN</h2>
        <div class="header-line"></div>
        <span class="header-count">${logs.length} ENTRADAS</span>
      </div>
      ${entriesHTML}
    </section>
  `;
}


// ── MANEJADORES DE EVENTOS ──

// Card click → ir al perfil individual
window.handleCardClick = function(e, id) {
  if (e.target.closest('.reveal-btn') || e.target.closest('.classified-btn')) {
    triggerSFX(e, 'ACCESS!');
    triggerScan();
    const miembro = equipo.find(m => m.id === id);
    if (miembro) {
      setTimeout(() => {
        window.location.href = miembro.profilePage;
      }, 900);
    }
    return;
  }

  triggerSFX(e, 'ZAAAP!');
  triggerScan();
  const miembro = equipo.find(m => m.id === id);
  if (miembro) {
    setTimeout(() => {
      window.location.href = miembro.profilePage;
    }, 900);
  }
};

// Botón escaneo
window.handleScan = function(e) {
  triggerSFX(e, 'SCAN!');
  triggerScan();
};

// Scroll a la sección de integrantes (usado por el botón INTEGRANTES del nav en la home)
// Si estamos en home, hace scroll; si estamos en bitácora u otra vista, redirige a ximena.html
window.scrollToIntegrantes = function() {
  const section = document.getElementById('crew-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.location.href = 'ximena.html';
  }
};


// ── ACTUALIZAR ESTADO ACTIVO DEL NAV ──
function updateNavActive(page, isProfilePage) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    const txt = btn.textContent.trim();
    if (page === 'home'     && txt === 'INICIO')       btn.classList.add('active');
    if (page === 'bitacora' && txt === 'BITÁCORA')     btn.classList.add('active');
    if (isProfilePage       && txt === 'INTEGRANTES')  btn.classList.add('active');
  });
}


// ── ROUTER PRINCIPAL ──
window.navigate = function(page) {
  const root = document.getElementById('root');

  if (twInterval) clearTimeout(twInterval);

  updateNavActive(page, false);

  if (page === 'home') {
    root.innerHTML = Home();
    startTypewriter('typewriter', [
      'Construyendo el futuro, una línea a la vez.',
      'HTML · CSS · JavaScript.',
      'Trabajo Práctico 1 — Proyecto Web en Equipo.',
    ]);
    const statsEl = document.querySelector('.hero-stats');
    if (statsEl) {
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
      }, { threshold: .5 });
      obs.observe(statsEl);
    }
  } else if (page === 'bitacora') {
    root.innerHTML = Bitacora();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
};


// ── ARRANCAR APP ──
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  navigate(page === 'bitacora' ? 'bitacora' : 'home');
};