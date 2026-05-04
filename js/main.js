
// BASE DE DATOS DEL EQUIPO 
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
    foto: 'img/rodrigo/r-batdog.webp',
    profilePage: 'rodrigo.html',
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
  },
];

// Estado global de la app
const state = {
  expandedCard: null,
  secretOpen: {},
};


// CURSOR PERSONALIZADO
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


//  EFECTO SFX 
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


// SCAN OVERLAY 
function triggerScan() {
  const overlay = document.getElementById('scan-overlay');
  overlay.classList.add('active');
  setTimeout(() => overlay.classList.remove('active'), 1500);
}


// TYPEWRITER 
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


// CONTADORES ANIMADOS 
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


// COMPONENTE: TARJETA DE TRIPULANTE (nombre + foto full) 
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


// COMPONENTE: PÁGINA HOME 
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


// COMPONENTE: PÁGINA BITÁCORA 
const bitacoraData = [
  {
    categoria: 'DECISIONES DE DISEÑO',
    prefijo: 'DISEÑO',
    catLabel: 'Diseño',
    entradas: [
      {
        fecha: '01-04-2026',
        titulo: 'ARQUITECTURA SPA',
        cuerpo: 'Se decidió implementar una Single Page Application en Vanilla JS puro. Los componentes se renderizan dinámicamente sobre el elemento #root, evitando recargas de página y preparando la base para una futura migración a React.'
      },
      {
        fecha: '01-04-2026',
        titulo: 'ESTÉTICA CYBERPUNK / SCI-FI',
        cuerpo: 'Definición de la identidad visual del proyecto: fondo oscuro con grilla de líneas sutiles, tipografías Orbitron y Share Tech Mono, paleta de cian (#00f5ff) y verde neón (#39ff14) como acentos principales. La estética HUD/terminal refuerza la temática del equipo.'
      },
      {
        fecha: '02-04-2026',
        titulo: 'TIPOGRAFÍAS GOOGLE FONTS',
        cuerpo: 'Selección de Orbitron (700/900) para títulos y elementos de interfaz, Share Tech Mono para datos y etiquetas monospaciadas, y Exo 2 (300/400/600) para el cuerpo de texto. La combinación logra contraste entre lo "mecánico" y lo legible.'
      },
      {
        fecha: '04-04-2026',
        titulo: 'ESTRUCTURA BASE DEL PROYECTO',
        cuerpo: 'Definición de la arquitectura de carpetas: HTML en la raíz, estilos en /css, lógica en /js, recursos en /img con subcarpetas por integrante. Creación de index.html como shell de la SPA y main.js como único archivo JS de la portada.'
      },
      {
        fecha: '06-04-2026',
        titulo: 'CURSOR PERSONALIZADO',
        cuerpo: 'Implementación de cursor doble: un dot fijo en la posición exacta del mouse y un ring con transición suave que crece de 34px a 54px al pasar sobre elementos interactivos (a, button, .crew-card). Controlado con mousemove y mouseover delegado.'
      },
      {
        fecha: '06-04-2026',
        titulo: 'SISTEMA DE EFECTOS VISUALES',
        cuerpo: 'Incorporación del overlay de escaneo (scan-overlay con scan-line animada), efecto typewriter con ciclo de escritura/borrado, contadores animados con easing cúbico sobre IntersectionObserver, y efecto SFX de texto flotante al interactuar con las tarjetas.'
      },
      {
        fecha: '20-04-2026',
        titulo: 'PERFILES INDIVIDUALES',
        cuerpo: 'Creación de las cuatro páginas de perfil (ximena.html, franco.html, rodrigo.html, mara.html), secciones de habilidades, galería de hobbies categorizada por tipo, y sección de contacto.'
      },
      {
        fecha: '20-04-2026',
        titulo: 'GRID DE PERFILES EN PORTADA',
        cuerpo: 'Diseño de tarjetas de tripulantes con foto a pantalla completa y nombre superpuesto. El grid de dos columnas permite escalar fácilmente sin romper el layout. Cada tarjeta aplica un efecto smash-in escalonado según su índice.'
      },
      {
        fecha: '26-04-2026',
        titulo: 'NAVEGACIÓN ENTRE PERFILES',
        cuerpo: 'Decisión de agregar botones de navegación secuencial entre los perfiles individuales (Ximena → Franco → Rodrigo → Mara) sin pasar por la portada. Facilita la revisión de todos los integrantes en orden y mejora la experiencia de navegación.'
      },
      {
        fecha: '03-05-2026',
        titulo: 'PRIMER DEPLOY EN VERCEL',
        cuerpo: 'Deploy inicial del proyecto. Build exitoso, todos los assets cargando correctamente. Configuración de dominio de producción y verificación de rutas relativas entre páginas.'
      },
    ]
  },
  {
    categoria: 'DIFICULTADES Y SOLUCIONES',
    prefijo: 'ERROR',
    catLabel: 'Dificultad',
    entradas: [
      {
        fecha: '27-04-2026',
        titulo: 'BOTÓN INTEGRANTES DESDE BITÁCORA',
        problema: 'Al estar en la sección bitácora de la SPA y pulsar "INTEGRANTES" en el nav, la función scrollToIntegrantes() no encontraba el elemento #crew-section (que solo existe en la vista home) y no hacía nada.',
        solucion: 'Se agregó una verificación: si #crew-section existe, hace scroll; si no, redirige directamente a ximena.html como punto de entrada al listado de perfiles.'
      },
      {
        fecha: '27-04-2026',
        titulo: 'ENLACE DE BITÁCORA DESDE PERFILES INDIVIDUALES',
        problema: 'Los perfiles individuales son páginas HTML estáticas separadas que no tienen acceso al router de la SPA. El botón BITÁCORA en el nav usaba window.location.href=\'index.html#bitacora\', un anchor que no disparaba ningún comportamiento en main.js.',
        solucion: 'Se cambió el href a index.html?page=bitacora y se agregó detección del parámetro en window.onload dentro de main.js, que lo lee con URLSearchParams y llama a navigate(\'bitacora\') si corresponde.'
      },
      {
        fecha: '28-04-2026',
        titulo: 'CENTRADO VERTICAL EN CARDS DE HABILIDADES',
        problema: 'Las cards de "TECNOLOGÍAS" y "EN APRENDIZAJE" tenían alturas distintas según la cantidad de skill-tags. Esto hacía que el contenido del card con menos tags quedara pegado arriba en lugar de centrarse.',
        solucion: 'Se aplicó display: flex, flex-direction: column y justify-content: center a .crew-card, y se eliminó el margin-bottom de .card-skills para que el flexbox tome el control del espaciado interno.'
      },
    ]
  },
  {
    categoria: 'CAMBIOS IMPORTANTES',
    prefijo: 'UPDATE',
    catLabel: 'Futuros cambios',
    entradas: [
      {
        fecha: '',
        titulo: 'MIGRACIÓN A REACT',
        cuerpo: 'El siguiente paso es migrar la arquitectura SPA a React, convirtiendo Home(), Bitacora() y los perfiles individuales en componentes reutilizables con JSX'
      },
    ]
  },
];

function Bitacora() {
  const todasLasEntradas = bitacoraData.flatMap(cat =>
    cat.entradas.map(entry => ({ ...entry, categoria: cat.categoria, catLabel: cat.catLabel }))
  );

  const totalEntradas = todasLasEntradas.length;

  const entradasHTML = todasLasEntradas.map((entry, i) => {
    const delay = i * 0.07;
    const bodyHTML = entry.problema
      ? `<div class="log-problem"><span class="log-label">PROBLEMA:</span> ${entry.problema}</div>
         <div class="log-solution"><span class="log-label">SOLUCION:</span> ${entry.solucion}</div>`
      : `<p class="log-body">${entry.cuerpo}</p>`;

    return `
      <div class="log-entry smash-in" style="animation-delay: ${delay}s">
        <div class="log-entry-header">
          <span class="log-cat-label">// ${entry.catLabel}</span>
          <span class="log-date">${entry.fecha}</span>
        </div>
        <div class="log-title">${entry.titulo}</div>
        ${bodyHTML}
      </div>
    `;
  }).join('');

  return `
    <section class="bitacora-page">
      <div class="section-header">
        <h2>// BITACORA DE MISION</h2>
        <div class="header-line"></div>
        <span class="header-count">${totalEntradas} ENTRADAS</span>
      </div>
      <div class="log-list">
        ${entradasHTML}
      </div>
    </section>
  `;
}


// MANEJADORES DE EVENTOS

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


// ACTUALIZAR ESTADO ACTIVO DEL NAV
function updateNavActive(page, isProfilePage) {
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
    const txt = btn.textContent.trim();
    if (page === 'home'     && txt === 'INICIO')       btn.classList.add('active');
    if (page === 'bitacora' && txt === 'BITÁCORA')     btn.classList.add('active');
    if (isProfilePage       && txt === 'INTEGRANTES')  btn.classList.add('active');
  });
}


// ROUTER PRINCIPAL
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


// ARRANCAR APP 
window.onload = () => {
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');
  navigate(page === 'bitacora' ? 'bitacora' : 'home');
};
