// ============================================
// DYNAMIS CREW — TP1
// Archivo: js/main.js
// ============================================


// ── CURSOR PERSONALIZADO ──
// En index.html el cursor existe en el HTML; en Ximena.html lo creamos por JS
(function initCursor() {
  let cur  = document.getElementById('cursor');
  let ring = document.getElementById('cursor-ring');

  if (!cur) {
    cur  = document.createElement('div');
    ring = document.createElement('div');
    cur.id  = 'cursor';
    ring.id = 'cursor-ring';
    document.body.appendChild(cur);
    document.body.appendChild(ring);
  }

  document.addEventListener('mousemove', e => {
    cur.style.left  = e.clientX + 'px';
    cur.style.top   = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });

  document.addEventListener('mouseover', e => {
    const isInteractive = e.target.closest('a, button, .crew-card');
    ring.style.width   = isInteractive ? '60px'  : '34px';
    ring.style.height  = isInteractive ? '60px'  : '34px';
    ring.style.opacity = isInteractive ? '.9'    : '.55';
  });
})();


// ── EFECTO SCAN ──
// En index.html el overlay existe en el HTML; en Ximena.html lo creamos por JS
(function initScan() {
  let overlay = document.getElementById('scan-overlay');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'scan-overlay';
    overlay.innerHTML = `
      <div id="scan-line"></div>
      <div id="scan-msg">ESCANEANDO SISTEMA...</div>
    `;
    document.body.appendChild(overlay);
  }

  window.triggerScan = function () {
    overlay.classList.add('active');
    setTimeout(() => overlay.classList.remove('active'), 1500);
  };

  // En la página de Ximena se lanza automáticamente al cargar
  if (!document.querySelector('.hero-stats')) {
    window.addEventListener('load', () => setTimeout(triggerScan, 600));
  }
})();


// ── TYPEWRITER ──
(function initTypewriter() {
  // Frases según la página
  const isXime = !!document.querySelector('.hero-section');

  const phrases = isXime
    ? [
        'DESARROLLADORA EN FORMACIÓN',
        'APASIONADA POR LA TECNOLOGÍA',
        'EXPLORANDO CLOUD Y DATOS',
      ]
    : [
        'Construyendo el futuro, una línea a la vez.',
        'HTML · CSS · JavaScript · Vercel.',
        'Trabajo Práctico 1 — Proyecto Web en Equipo.',
      ];

  // En Ximena el typewriter anima el subtítulo; en index usa #typewriter
  const target = isXime
    ? document.querySelector('.hero-subtitle')
    : document.getElementById('typewriter');

  if (!target) return;

  let p = 0, c = 0, deleting = false;

  function type() {
    const text = phrases[p];

    if (!deleting) {
      target.textContent = text.slice(0, ++c);
      if (c === text.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      target.textContent = text.slice(0, --c);
      if (c === 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? 40 : 70);
  }

  // En index se retrasa para respetar la animación de entrada del hero
  const delay = isXime ? 0 : 1400;
  setTimeout(type, delay);
})();


// ── CONTADORES ANIMADOS (solo index.html) ──
(function initCounters() {
  const statsEl = document.querySelector('.hero-stats');
  if (!statsEl) return;

  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;

    document.querySelectorAll('.stat-number').forEach(el => {
      const target = +el.dataset.target;
      let current  = 0;
      const step   = Math.ceil(target / 30);

      const interval = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(interval);
      }, 40);
    });

    observer.disconnect();
  }, { threshold: .5 });

  observer.observe(statsEl);
})();


// ── ANIMACIONES AL SCROLL (solo Ximena.html) ──
(function initScrollAnimations() {
  if (!document.querySelector('.hero-section')) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('smash-in');
    });
  }, { threshold: 0.2 });

  window.addEventListener('load', () => {
    document.querySelectorAll('section').forEach(sec => observer.observe(sec));
  });
})();


// ── EFECTO CLICK SFX (solo Ximena.html) ──
(function initClickSFX() {
  if (!document.querySelector('.hero-section')) return;

  const words = ['CLICK!', 'SYNC!', 'OK!', 'OPEN!'];

  document.addEventListener('click', e => {
    const el = document.createElement('div');
    el.className   = 'space-sfx';
    el.textContent = words[Math.floor(Math.random() * words.length)];
    el.style.left  = e.clientX + 'px';
    el.style.top   = e.clientY + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 500);
  });
})();