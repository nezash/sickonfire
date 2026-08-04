// ===== Clips de Kick — automático =====
// Reemplaza el array manual anterior. Consulta el Worker de Cloudflare
// (worker/kick-recent-clips.js) que trae los clips más recientes reales
// desde Kick, y arma las tarjetas dinámicamente.

(function () {
  const WORKER_URL = 'https://kick-recent-clips.josemanuelosores.workers.dev/';

  const clipsGrid = document.getElementById('clipsGrid');
  if (!clipsGrid) return;

  function renderClips(clips) {
    if (!clips.length) {
      clipsGrid.innerHTML = `
        <p class="clips-empty">No se pudieron cargar los clips ahorita — prueba de nuevo más tarde, o mira todos en Kick abajo 👇</p>
      `;
      return;
    }

    clipsGrid.innerHTML = '';
    clips.forEach(clip => {
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

  async function loadClips() {
    clipsGrid.innerHTML = '<p class="clips-loading">Cargando clips...</p>';
    try {
      const res = await fetch(WORKER_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Worker respondió con error');
      const data = await res.json();
      renderClips(data.clips || []);
    } catch (err) {
      renderClips([]);
    }
  }

  loadClips();
})();
