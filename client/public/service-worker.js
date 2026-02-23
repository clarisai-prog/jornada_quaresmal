/**
 * Service Worker — Jornada Quaresmal PWA v5
 * ✅ CORRIGIDO para GitHub Pages (base: /jornada-quaresmal-pwa-v5/)
 *
 * Problema original: todos os paths usavam "/" como raiz.
 * No GitHub Pages o site fica em /jornada-quaresmal-pwa-v5/ —
 * o SW tentava fazer cache de recursos que não existem nesse caminho.
 */

const CACHE_VERSION = "quaresma-v8";
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const DYNAMIC_CACHE = `${CACHE_VERSION}-dynamic`;
const FONT_CACHE = `${CACHE_VERSION}-fonts`;

// ✅ FIX: Base path do GitHub Pages
const BASE = "/jornada_quaresmal";

// ─── Assets do shell do app (pré-cache obrigatório) ──────────────────────────
const SHELL_ASSETS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/manifest.json`,
  `${BASE}/icons/icon-192.png`,
  `${BASE}/icons/icon-512.png`,
  `${BASE}/icons/apple-touch-icon.png`,
  `${BASE}/icons/favicon-32.png`,
  `${BASE}/icons/favicon-16.png`,
];

// ─── Rotas dos 40 dias (pré-cache para offline total) ────────────────────────
const DAY_ROUTES = Array.from({ length: 40 }, (_, i) => `${BASE}/dia/${i + 1}`);

// ============================================================
// INSTALL — Pré-cachear o shell e todas as rotas dos dias
// ============================================================
self.addEventListener("install", (event) => {
  console.log("[SW v5] Instalando:", CACHE_VERSION);

  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      await cache.addAll(SHELL_ASSETS).catch((err) => {
        console.warn("[SW v5] Erro no pré-cache do shell:", err);
      });

      // Rotas dos dias — falha silenciosa (SPA fallback responde)
      const dayPromises = DAY_ROUTES.map((route) =>
        cache.add(route).catch(() => { })
      );
      await Promise.allSettled(dayPromises);

      console.log("[SW v5] Pré-cache concluído — offline total disponível");
      return self.skipWaiting();
    })
  );
});

// ============================================================
// ACTIVATE — Limpar caches de versões antigas
// ============================================================
self.addEventListener("activate", (event) => {
  console.log("[SW v5] Ativando:", CACHE_VERSION);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const toDelete = cacheNames.filter(
        (name) => name.startsWith("quaresma-") && !name.startsWith(CACHE_VERSION)
      );
      if (toDelete.length > 0) {
        console.log("[SW v5] Deletando caches antigos:", toDelete);
      }
      return Promise.all([
        ...toDelete.map((name) => caches.delete(name)),
        self.clients.claim(),
      ]);
    })
  );
});

// ============================================================
// FETCH — Estratégias de cache por tipo de recurso
// ============================================================
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (!request.url.startsWith("http")) return;

  // ── Fontes do Google Fonts ────────────────────────────────
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(fontCacheFirst(request));
    return;
  }

  // Ignorar requisições de outras origens
  if (url.origin !== self.location.origin) return;

  // ── Assets estáticos (JS, CSS, imagens, ícones) ──────────
  if (
    request.destination === "script" ||
    request.destination === "style" ||
    request.destination === "image" ||
    request.destination === "font" ||
    url.pathname.startsWith(`${BASE}/icons/`) ||
    url.pathname.startsWith(`${BASE}/assets/`) ||
    url.pathname === `${BASE}/manifest.json`
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // ── Navegação (HTML/SPA) ──────────────────────────────────
  if (request.mode === "navigate") {
    event.respondWith(staleWhileRevalidate(request));
    return;
  }

  // ── Demais requisições ────────────────────────────────────
  event.respondWith(networkFirst(request));
});

// ============================================================
// ESTRATÉGIA: Cache First
// ============================================================
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return offlineFallback(request);
  }
}

// ============================================================
// ESTRATÉGIA: Font Cache First
// ============================================================
async function fontCacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(FONT_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response("", { status: 503 });
  }
}

// ============================================================
// ESTRATÉGIA: Stale-While-Revalidate
// ============================================================
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(request);

  const networkPromise = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => null);

  if (cached) return cached;

  const networkResponse = await networkPromise;
  if (networkResponse) return networkResponse;

  // ✅ FIX: fallback SPA usa o path correto com BASE
  const shellCache = await caches.match(`${BASE}/`) || await caches.match(`${BASE}/index.html`);
  if (shellCache) return shellCache;

  return offlineFallback(request);
}

// ============================================================
// ESTRATÉGIA: Network First
// ============================================================
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    return offlineFallback(request);
  }
}

// ============================================================
// FALLBACK OFFLINE
// ============================================================
function offlineFallback(request) {
  if (request.destination === "image") {
    return new Response("", { status: 503 });
  }

  return new Response(
    `<!DOCTYPE html>
    <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
        <title>Sem conexão — Jornada Quaresmal</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: Georgia, serif;
            background: #F5F1E8;
            color: #2C2C2C;
            min-height: 100dvh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            padding-bottom: calc(24px + env(safe-area-inset-bottom));
          }
          .card {
            background: #FDFAF4;
            border-radius: 16px;
            padding: 40px 32px;
            text-align: center;
            max-width: 360px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          }
          .icon { font-size: 48px; margin-bottom: 16px; }
          h1 { font-size: 24px; margin-bottom: 12px; }
          p { font-size: 15px; color: #6B6B6B; line-height: 1.7; margin-bottom: 8px; }
          .verse {
            margin-top: 24px;
            padding: 16px;
            background: #F5F1E8;
            border-radius: 8px;
            font-style: italic;
            font-size: 14px;
            color: #8B7355;
          }
          button {
            margin-top: 24px;
            padding: 12px 24px;
            background: #8B7355;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 15px;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="icon">🌿</div>
          <h1>Sem conexão</h1>
          <p>Você está offline. Suas anotações estão salvas com segurança no seu dispositivo.</p>
          <p>Reconecte-se para continuar a jornada.</p>
          <div class="verse">
            "Sede quietos e sabei que eu sou Deus."<br>
            <small>— Salmo 46:10</small>
          </div>
          <button onclick="window.location.reload()">Tentar novamente</button>
        </div>
      </body>
    </html>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

// ============================================================
// MESSAGE — Comunicação com o app
// ============================================================
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    console.log("[SW v5] SKIP_WAITING — ativando nova versão");
    self.skipWaiting();
  }
  if (event.data?.type === "GET_VERSION") {
    event.ports[0]?.postMessage({ version: CACHE_VERSION });
  }
  if (event.data?.type === "CACHE_DAY") {
    const dayId = event.data.dayId;
    if (dayId >= 1 && dayId <= 40) {
      caches.open(STATIC_CACHE).then((cache) => {
        cache.add(`${BASE}/dia/${dayId}`).catch(() => { });
      });
    }
  }
});
