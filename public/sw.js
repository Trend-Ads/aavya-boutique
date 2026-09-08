// Aavya Boutique Admin — Service Worker (PWA)
const CACHE_NAME = "aavya-admin-v1";

const STATIC_ASSETS = [
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/icon-maskable-512x512.png",
  "/icons/apple-touch-icon.png",
  "/logo/logo-main.png",
  "/logo/logo-bg.png",
];

// Install: pre-cache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch: network-first for navigation, stale-while-revalidate for static assets
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignore non-GET requests and external API calls (e.g. Supabase, Cloudinary)
  if (req.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // Static assets (Next.js static chunks, public icons, images)
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/logo/") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".woff2")
  ) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return response;
        });
      })
    );
    return;
  }

  // Admin pages: Network-first with cache fallback
  if (url.pathname.startsWith("/admin")) {
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(req);
          if (cached) return cached;
          const dashboardFallback = await caches.match("/admin/dashboard");
          if (dashboardFallback) return dashboardFallback;
          return new Response("Offline — Aavya Boutique Admin", {
            status: 503,
            headers: { "Content-Type": "text/plain" },
          });
        })
    );
  }
});
