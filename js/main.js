// ============================================
// NEXUS CREW — TP1
// Archivo: js/main.js
// ============================================

// ── CUSTOM CURSOR ──
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');

document.addEventListener('mousemove', e => {
  cur.style.left  = e.clientX + 'px';
  cur.style.top   = e.clientY + 'px';
  ring.style.left = e.clientX + 'px';
  ring.style.top  = e.clientY + 'px';
});

// El anillo crece al pasar por links y botones
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    ring.style.width  = '56px';
    ring.style.height = '56px';
  });
  el.addEventListener('mouseleave', () => {
    ring.style.width  = '36px';
    ring.style.height = '36px';
  });
});


// ── EFECTO TYPEWRITER ──
const phrases = [
  'Construyendo el futuro, una línea a la vez.',
  'HTML · CSS · JavaScript · Vercel.',
  'Trabajo Práctico 1 — Proyecto Web en Equipo.',
];

let phraseIndex = 0;
let charIndex   = 0;
let deleting    = false;

const tw = document.getElementById('typewriter');

function type() {
  const phrase = phrases[phraseIndex];

  if (!deleting) {
    tw.textContent = phrase.slice(0, ++charIndex);
    if (charIndex === phrase.length) {
      deleting = true;
      setTimeout(type, 2000); // pausa antes de borrar
      return;
    }
  } else {
    tw.textContent = phrase.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(type, deleting ? 40 : 70);
}

// Empieza después de que aparece la animación del hero
setTimeout(type, 1400);


// ── CONTADORES ANIMADOS ──
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target  = +el.dataset.target;
    let   current = 0;
    const step    = Math.ceil(target / 30);

    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 40);
  });
}

// Se activa cuando el usuario hace scroll hasta los stats
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCounters();
    observer.disconnect();
  }
}, { threshold: .5 });

observer.observe(document.querySelector('.hero-stats'));


// ── BOTÓN ESCANEO ──
function triggerScan() {
  const overlay = document.getElementById('scan-overlay');
  overlay.classList.add('active');
  setTimeout(() => overlay.classList.remove('active'), 1500);
}