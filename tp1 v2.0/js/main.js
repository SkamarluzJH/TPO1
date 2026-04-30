// ============================================
// EFECTOS DYNAMIS PARA PORTFOLIO PERSONAL
// ============================================


// ── CURSOR PERSONALIZADO ──
const cur  = document.createElement('div');
const ring = document.createElement('div');

cur.id = 'cursor';
ring.id = 'cursor-ring';

document.body.appendChild(cur);
document.body.appendChild(ring);

document.addEventListener('mousemove', e => {
  cur.style.left  = e.clientX + 'px';
  cur.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

document.addEventListener('mouseover', e => {
  const interactive = e.target.closest('a, button, .crew-card');
  if (interactive) {
    ring.style.width  = '60px';
    ring.style.height = '60px';
    ring.style.opacity = '.9';
  } else {
    ring.style.width  = '34px';
    ring.style.height = '34px';
    ring.style.opacity = '.5';
  }
});


// ── EFECTO SCAN ──
const scanOverlay = document.createElement('div');
scanOverlay.id = 'scan-overlay';

scanOverlay.innerHTML = `
  <div id="scan-line"></div>
  <div id="scan-msg">ESCANEANDO PERFIL...</div>
`;

document.body.appendChild(scanOverlay);

function triggerScan() {
  scanOverlay.classList.add('active');
  setTimeout(() => scanOverlay.classList.remove('active'), 1500);
}

// lanzar scan al cargar
window.addEventListener('load', () => {
  setTimeout(triggerScan, 600);
});


// ── TYPEWRITER ──
function startTypewriter(element, phrases) {
  let p = 0, c = 0, deleting = false;

  function type() {
    const text = phrases[p];

    if (!deleting) {
      element.textContent = text.slice(0, ++c);
      if (c === text.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      element.textContent = text.slice(0, --c);
      if (c === 0) {
        deleting = false;
        p = (p + 1) % phrases.length;
      }
    }

    setTimeout(type, deleting ? 40 : 70);
  }

  type();
}

// iniciar typewriter
window.addEventListener('load', () => {
  const subtitle = document.querySelector('.hero-subtitle');

  if (subtitle) {
    startTypewriter(subtitle, [
      'DESARROLLADORA EN FORMACIÓN',
      'APASIONADA POR LA TECNOLOGÍA',
      'EXPLORANDO CLOUD Y DATOS'
    ]);
  }
});


// ── ANIMACIONES AL SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('smash-in');
    }
  });
}, { threshold: 0.2 });

// observar secciones
window.addEventListener('load', () => {
  document.querySelectorAll('section').forEach(sec => {
    observer.observe(sec);
  });
});


// ── EFECTO CLICK (SFX visual) ──
const words = ['CLICK!', 'SYNC!', 'OK!', 'OPEN!'];

document.addEventListener('click', e => {
  const el = document.createElement('div');
  el.className = 'space-sfx';
  el.textContent = words[Math.floor(Math.random() * words.length)];

  el.style.left = e.clientX + 'px';
  el.style.top  = e.clientY + 'px';

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 500);
});