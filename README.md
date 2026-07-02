# SickonFire — Landing Page

Landing page de una sola página (scroll) para la vtuber/streamer peruana **SickonFire**. Reúne su presentación, horario de streams, stream en vivo embebido, clips destacados, galería de sus versiones, un evento especial y sus redes sociales — todo en una página visualmente llamativa acorde a su estética kawaii/gamer.

**🔗 Demo en vivo:** _(agregar el link de GitHub Pages acá una vez publicado)_

---

## 📌 Estado del proyecto

**Versión actual: `v1.0.0` — Base para revisión del cliente**

Este es el punto de partida que se comparte con la streamer para que lo revise. Todavía **no es la versión final**: faltan assets reales (fotos de galería, links de redes, Ko-fi) y es probable que pida ajustes de contenido o diseño después de verla. Cada tanda de cambios importante se documenta como una nueva versión en el [Historial de versiones](#-historial-de-versiones) más abajo, para llevar registro de qué cambió y por qué.

---

## 🧠 Mi rol en este proyecto

Este sitio fue desarrollado con asistencia de **Claude (Anthropic)** como herramienta de generación de código. Mi rol fue el de dirección y control de calidad:

- Definí el brief a partir de referencias visuales de la streamer (paleta, personajes, estética).
- Revisé cada versión generada y pedí ajustes concretos de diseño, contenido y funcionalidad.
- Reescribí y afiné los textos para que sonaran auténticos a la voz real de la streamer, no genéricos.
- Decidí qué funcionalidades priorizar (embed de stream en vivo, visor de galería, sección de evento) según lo que el proyecto necesitaba en cada etapa.
- Validé que las soluciones técnicas propuestas fueran reales y sostenibles (por ejemplo, confirmar qué soporta oficialmente la API de Kick antes de construir sobre eso).

No escribí el código línea por línea, pero sí dirigí cada decisión de qué construir, cómo debía verse y comportarse, y qué pulir. Lo cuento así de directo porque creo que la dirección de producto con IA como herramienta es, cada vez más, parte real del trabajo de desarrollo — no un atajo que haya que esconder.

---

## 🎨 Decisiones de diseño

- **Paleta:** crema cálido de fondo, rosa suave/candy/fucsia como color de marca, ciruela oscuro en vez de negro puro para el texto, y un acento lila frío (`--lilac`) sumado en la v2 para acompañar la actualización del modelo de la vtuber.
- **Tipografía:** `Fredoka` (redondeada, bubbly) para títulos — encaja con la estética kawaii — combinada con `Quicksand` para texto de cuerpo y `Space Mono` para detalles tipo dato/HUD (horario, contadores), como guiño a que su contenido principal es gaming.
- **Tono de los textos:** se ajustó varias rondas hasta encontrar un balance entre tierno y directo, sin sonar impostado ni "con pena" — reflejando cómo habla realmente la streamer, evitando frases con condicionales o justificaciones de más.
- **Layout:** una sola página de scroll largo, pensada para compartirse como link único en redes en vez de un perfil tipo "link in bio" con tarjeta chica.

---

## 🛠️ Stack técnico

HTML, CSS y JavaScript vanilla — sin frameworks ni build tools, para que sea fácil de editar directo en VS Code sin instalar nada.

- **`IntersectionObserver`** para las animaciones de aparición al hacer scroll.
- **Embed oficial de Kick** (`player.kick.com`) para el stream en vivo.
- **Lightbox hecho a mano** para la galería: navegación con flechas, teclado (← →, Esc) y swipe táctil en celular.
- **Iconos flotantes de fondo generados con posiciones/tiempos aleatorios** vía JS, para que no se repita siempre el mismo patrón visual.
- Estructura de datos simple en arrays (`GALLERY_IMAGES`, `CLIPS`) para que agregar contenido nuevo (una imagen, un clip) sea editar una línea, no tocar el HTML.

---

## 📁 Estructura del proyecto

```
sickonfire-page/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── icon.png            → imagen del hero
│   ├── sobre.png           → imagen de la sección "Sobre mí"
│   ├── evento-sickxtensible.png
│   ├── 1.png … 5.png       → galería (versión chibi)
│   └── rosquilla.png       → favicon
└── README.md
```

---

## 📜 Historial de versiones

### `v1.0.0` — Base inicial para revisión del cliente
- Estructura completa de secciones: Hero, Sobre mí, Evento (Sickxtensible), Horario, En vivo (embed Kick), Clips, Galería, Apoyo (Ko-fi), Footer.
- Galería de versión chibi con visor (lightbox) navegable por click, teclado y swipe.
- Paleta rosa/kawaii con acento lila.
- Textos ajustados a la voz real de la streamer.
- Favicon personalizado.
- Iconos de fondo con animación aleatoria.

---

## 🚧 Pendientes antes de la versión final

- [ ] Reemplazar los placeholders de `images/1.png` a `5.png` por las 5 imágenes reales de la galería.
- [ ] Confirmar y agregar los links reales de Instagram, Kick, TikTok y Twitter/X (hoy están como `href="#"`).
- [ ] Agregar el link de Ko-fi cuando esté listo (hoy el botón está deshabilitado).
- [ ] Cargar clips reales en el array `CLIPS` de `script.js`.
- [ ] Confirmar que `sickonfire` es el username exacto en Kick (usado en el embed del player).
- [ ] Feedback de la streamer sobre diseño/contenido → iterar a `v1.1.0` o `v2.0.0` según el alcance de los cambios.

---

## 💻 Cómo correrlo localmente

No necesita instalación. Dos opciones:

1. **Directo:** abre `index.html` en el navegador.
2. **Recomendado (para que el embed de Kick y las rutas de imágenes funcionen mejor):** usa la extensión **Live Server** en VS Code — click derecho sobre `index.html` → "Open with Live Server".

---

## 📄 Licencia / uso

Proyecto de uso exclusivo para la vtuber SickonFire. Las imágenes de referencia y el arte generado pertenecen a la streamer.
