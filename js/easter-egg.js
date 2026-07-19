// ===== Easter egg: 10 clicks en la imagen del hero =====
// Cambia a images/molesta.png con temblor + tinte rojo + símbolos de
// enojo por 1 segundo, y vuelve sola a la normal. Se puede repetir.

(function () {
  const heroImg = document.getElementById('heroImg');
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroImg || !heroVisual) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const NORMAL_SRC = heroImg.getAttribute('src');
  const ANGRY_SRC = 'images/molesta.png';
  const CLICKS_NEEDED = 10;
  const DURATION_MS = 1000;
  const MARKS = ['💢', '💢', '💢'];

  let clickCount = 0;
  let isPlaying = false;

  function spawnAngerMarks() {
    const positions = [
      { top: '-6%', left: '-4%' },
      { top: '-8%', right: '-2%' },
      { top: '8%', right: '-8%' }
    ];

    return MARKS.map((mark, i) => {
      const span = document.createElement('span');
      span.className = 'anger-mark';
      span.textContent = mark;
      Object.assign(span.style, positions[i]);
      span.style.animationDelay = `${i * 0.08}s`;
      heroVisual.appendChild(span);
      return span;
    });
  }

  function triggerAngry() {
    isPlaying = true;
    heroImg.src = ANGRY_SRC;
    heroImg.classList.add('is-angry');

    const marks = prefersReducedMotion ? [] : spawnAngerMarks();

    setTimeout(() => {
      heroImg.src = NORMAL_SRC;
      heroImg.classList.remove('is-angry');
      marks.forEach(m => m.remove());
      isPlaying = false;
    }, DURATION_MS);
  }

  heroImg.style.cursor = 'pointer';

  heroImg.addEventListener('click', () => {
    if (isPlaying) return;
    clickCount++;
    if (clickCount >= CLICKS_NEEDED) {
      clickCount = 0;
      triggerAngry();
    }
  });
})();
