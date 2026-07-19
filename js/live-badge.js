// ===== Badge "EN VIVO" real =====
// Consulta el Worker de Cloudflare (que a su vez consulta la API oficial
// de Kick de forma segura) y prende/apaga el badge según corresponda.
// Se revisa al cargar la página y luego cada 60 segundos.

(function () {
  const WORKER_URL = 'https://kick-live-status.jmog1509.workers.dev/';
  const POLL_INTERVAL_MS = 60000;

  const statusEl = document.getElementById('liveStatus');
  if (!statusEl) return;

  const textEl = statusEl.querySelector('.live-status-text');

  function setLive() {
    statusEl.classList.remove('is-offline');
    statusEl.classList.add('is-live');
    textEl.textContent = 'Online';
  }

  function setOffline() {
    statusEl.classList.remove('is-live');
    statusEl.classList.add('is-offline');
    textEl.textContent = 'Offline';
  }

  async function checkLiveStatus() {
    try {
      const res = await fetch(WORKER_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error('Worker respondió con error');
      const data = await res.json();
      data.is_live ? setLive() : setOffline();
    } catch (err) {
      // Si el Worker falla, no rompemos la página, solo mostramos offline
      setOffline();
    }
  }

  checkLiveStatus();
  setInterval(checkLiveStatus, POLL_INTERVAL_MS);
})();
