// Cloudflare Worker: trae los clips más recientes de sickonfire en Kick
// y le devuelve a la página una lista ya limpia y lista para usar.
//
// Usa un endpoint NO oficial de Kick (api/v2/channels/{channel}/clips).
// No requiere client_id/secret porque es público, pero al no estar
// documentado puede cambiar de forma sin aviso — si un día deja de
// traer datos, hay que revisar el mapeo de campos acá abajo.

const KICK_SLUG = 'sickonfire';
const MAX_CLIPS = 3;
const ALLOWED_ORIGIN = 'https://nezash.github.io';

export default {
  async fetch(request) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const res = await fetch(
        `https://kick.com/api/v2/channels/${KICK_SLUG}/clips?sort=date&order=desc`,
        { headers: { 'Accept': 'application/json' } }
      );

      if (!res.ok) throw new Error('Kick respondió con error al pedir clips');

      const raw = await res.json();

      // Kick a veces envuelve la lista en distintas llaves según el
      // endpoint ("clips", "data", o el array directo) — probamos las
      // más comunes en vez de asumir una sola.
      const list = raw.clips || raw.data || (Array.isArray(raw) ? raw : []);

      const clips = list
        .slice()
        .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
        .slice(0, MAX_CLIPS)
        .map((clip) => ({
          title: clip.title || clip.name || 'Clip sin título',
          thumbnail: clip.thumbnail_url || clip.thumbnail || '',
          url: `https://kick.com/${KICK_SLUG}/clips/${clip.id}`
        }));

      return new Response(JSON.stringify({ clips }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (err) {
      // Si algo falla, devolvemos lista vacía en vez de romper la página
      return new Response(JSON.stringify({ clips: [], error: 'unavailable' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }
};
