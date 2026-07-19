// ===== Cursor trail (solo en dispositivos con mouse) =====
const trail = document.getElementById('cursorTrail');
const hasFinePointer = window.matchMedia('(pointer: fine)').matches;

// ===== Iconos flotantes aleatorios =====
const floatItems = document.querySelectorAll('.float-item');

floatItems.forEach(item => {
  const left = Math.random() * 96;
  const delay = Math.random() * 10;
  const duration = 10 + Math.random() * 10;
  const size = 1.1 + Math.random() * 1.3;

  item.style.left = `${left}%`;
  item.style.animationDelay = `${delay}s`;
  item.style.animationDuration = `${duration}s`;
  item.style.fontSize = `${size}rem`;
});

if (hasFinePointer && trail) {
  let dots = [];
  const maxDots = 8;

  document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.opacity = '0.8';
    document.body.appendChild(dot);
    dots.push(dot);

    requestAnimationFrame(() => {
      dot.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      dot.style.opacity = '0';
      dot.style.transform = 'translate(-50%, -50%) scale(0.3)';
    });

    setTimeout(() => {
      dot.remove();
      dots = dots.filter(d => d !== dot);
    }, 650);

    if (dots.length > maxDots) {
      const old = dots.shift();
      old.remove();
    }
  });

  trail.style.display = 'none';
}

// ===== Clips de Kick =====
const CLIPS = [
  {
    title: 'Como sick?',
    url: 'https://kick.com/sickonfire/clips/clip_01K9D4GJT6FB32WQZW3TK3CM1F',
    thumbnail: 'clips/thumbnail-clip1.webp'
  },
  {
    title: 'Y el boss, era ngro',
    url: 'https://kick.com/sickonfire/clips/clip_01K8F7ZMYB809V1M0KS7KQZR27',
    thumbnail: 'clips/thumbnail-clip2.webp'
  },
  {
    title: 'Kaisa Cuadra',
    url: 'https://kick.com/sickonfire/clips/clip_01KWA3VXGHN3717BJG390FSQ85',
    thumbnail: 'clips/thumbnail-clip3.webp'
  }
];

const clipsGrid = document.getElementById('clipsGrid');
if (clipsGrid) {
  CLIPS.forEach(clip => {
    const card = document.createElement('a');
    card.className = 'clip-card';
    card.href = clip.url;
    card.target = '_blank';
    card.rel = 'noopener';

    const thumbHtml = clip.thumbnail
      ? `<img src="${clip.thumbnail}" alt="${clip.title}" loading="lazy">`
      : '';

    card.innerHTML = `
      <div class="clip-thumb">
        ${thumbHtml}
        <div class="clip-play">▶</div>
      </div>
      <div class="clip-info">
        <p>${clip.title}</p>
        <span>Ver en Kick</span>
      </div>
    `;
    clipsGrid.appendChild(card);
  });
}

// ===== Galería (versión chibi) =====
const GALLERY_IMAGES = [
  { src: 'versiones/1.png', alt: 'SickonFire versión chibi 1' },
  { src: 'versiones/2.png', alt: 'SickonFire versión chibi 2' },
  { src: 'versiones/3.png', alt: 'SickonFire versión chibi 3' },
  { src: 'versiones/4.png', alt: 'SickonFire versión chibi 4' },
  { src: 'versiones/5.png', alt: 'SickonFire versión chibi 5' }
];

const galleryGrid = document.getElementById('galleryGrid');
const fanartCard = document.getElementById('fanartCard');

if (galleryGrid && fanartCard) {
  GALLERY_IMAGES.forEach((item, index) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item is-clickable';
    figure.setAttribute('tabindex', '0');
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-label', `Ver ${item.alt} en grande`);
    figure.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" loading="lazy">
      <div class="gallery-hint">🔍</div>
    `;
    figure.addEventListener('click', () => openLightbox(index));
    figure.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
    galleryGrid.insertBefore(figure, fanartCard);
  });
}

// ===== Lightbox / visor de imágenes =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const item = GALLERY_IMAGES[currentIndex];
  lightboxImg.src = item.src;
  lightboxImg.alt = item.alt;
  lightboxCounter.textContent = `${currentIndex + 1} / ${GALLERY_IMAGES.length}`;
}

function showNext() {
  currentIndex = (currentIndex + 1) % GALLERY_IMAGES.length;
  updateLightbox();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  updateLightbox();
}

if (lightbox) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) > 40) {
      delta < 0 ? showNext() : showPrev();
    }
  }, { passive: true });
}

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll(
  '.about, .event, .schedule, .live, .clips, .gallery, .support, .schedule-card, .gallery-item, .clip-card'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// ===== Smooth active state on nav (opcional, sutil) =====
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], header[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? '' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(sec => navObserver.observe(sec));
