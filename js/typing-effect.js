// ===== Efecto de escritura (typing) en el tagline del hero =====
// Se activa cada vez que el hero entra en pantalla (subiendo o bajando).
// El cursor '|' parpadea mientras escribe y desaparece al terminar.

(function () {
  const hero = document.querySelector('.hero');
  const tagline = document.querySelector('.hero-tagline');
  if (!hero || !tagline) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const fullText = tagline.textContent.trim();
  tagline.classList.add('typing-tagline');

  if (prefersReducedMotion) {
    tagline.textContent = fullText;
    return;
  }

  let typingTimer = null;
  let isTyping = false;

  function typeText() {
    isTyping = true;
    tagline.textContent = '';
    tagline.classList.add('is-typing');

    let i = 0;
    (function step() {
      if (i <= fullText.length) {
        tagline.textContent = fullText.slice(0, i);
        i++;
        typingTimer = setTimeout(step, 32);
      } else {
        isTyping = false;
        tagline.classList.remove('is-typing');
      }
    })();
  }

  function resetTagline() {
    clearTimeout(typingTimer);
    isTyping = false;
    tagline.textContent = '';
    tagline.classList.remove('is-typing');
  }

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!isTyping) typeText();
      } else {
        resetTagline();
      }
    });
  }, { threshold: 0.4 });

  heroObserver.observe(hero);
})();
