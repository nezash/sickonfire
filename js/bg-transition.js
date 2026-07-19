// ===== Transición continua de color de fondo entre secciones =====
// Recorrido: crema → rosa claro → lila claro → rosa claro → lila claro → crema
// El color se interpola en tiempo real según qué tan cerca está el
// scroll de cada sección (no cambia de golpe, se mezcla mientras bajas).

(function () {
  const BG_STOPS = [
    { id: 'inicio',  color: '#FFF6F2' }, // crema
    { id: 'sobre',   color: '#FFE9F3' }, // rosa claro
    { id: 'eventos', color: '#EFEAFB' }, // lila claro
    { id: 'horario', color: '#FFE9F3' }, // rosa claro
    { id: 'envivo',  color: '#EFEAFB' }, // lila claro
    { id: 'clips',   color: '#FFE9F3' }, // rosa claro
    { id: 'galeria', color: '#EFEAFB' }, // lila claro
    { id: 'apoyo',   color: '#FFF6F2' }  // crema
  ];

  const stops = BG_STOPS
    .map(stop => ({ ...stop, el: document.getElementById(stop.id) }))
    .filter(stop => stop.el);

  if (stops.length < 2) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function hexToRgb(hex) {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  function lerpColor(hexA, hexB, t) {
    const a = hexToRgb(hexA);
    const b = hexToRgb(hexB);
    const r = Math.round(a[0] + (b[0] - a[0]) * t);
    const g = Math.round(a[1] + (b[1] - a[1]) * t);
    const bl = Math.round(a[2] + (b[2] - a[2]) * t);
    return `rgb(${r}, ${g}, ${bl})`;
  }

  function updateBackground() {
    const anchor = window.scrollY + window.innerHeight * 0.35;

    let current = stops[0];
    let next = stops[0];
    let t = 0;

    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i];
      const b = stops[i + 1];
      const aTop = a.el.offsetTop;
      const bTop = b.el.offsetTop;

      if (anchor <= aTop) {
        current = a;
        next = a;
        t = 0;
        break;
      }
      if (anchor >= aTop && anchor <= bTop) {
        current = a;
        next = b;
        t = (anchor - aTop) / (bTop - aTop || 1);
        break;
      }
      current = b;
      next = b;
      t = 0;
    }

    document.body.style.backgroundColor = lerpColor(current.color, next.color, t);
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateBackground();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  updateBackground();
})();
