// ===== Hover 3D / tilt sutil en tarjetas =====
// Se aplica a galería, clips y horario. Solo en dispositivos con mouse
// (pointer: fine) — en touch no tiene sentido y se desactiva solo.

(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (prefersReducedMotion || !hasFinePointer) return;

  const MAX_TILT = 6; // grados — sutil a propósito, no lo subas mucho

  function bindTilt(card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = ((x - centerX) / centerX) * MAX_TILT;
      const rotateX = -((y - centerY) / centerY) * MAX_TILT;

      card.style.transform =
        `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  }

  document
    .querySelectorAll('.gallery-item, .clip-card, .schedule-card')
    .forEach(bindTilt);
})();
