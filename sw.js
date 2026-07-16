/* global self, caches, URL, fetch */
const CACHE_PREFIX = "swim-spaniel-v";
const CACHE_NAME = `${CACHE_PREFIX}2.0.1`;
const appUrl = (path) => new URL(path, self.registration.scope).href;
const APP_SHELL = [
  appUrl("./"),
  appUrl("index.html"),
  appUrl("site.webmanifest"),
  appUrl("favicon.svg"),
  appUrl("favicon.ico"),
  appUrl("icon-192.png"),
  appUrl("icon-512.png"),
  appUrl("apple-touch-icon.png"),
  appUrl("og-image.png"),
  appUrl("dist/main.js"),
  appUrl("dist/game.js"),
  appUrl("docs/images/obstacles/diver.svg"),
  appUrl("docs/images/obstacles/spaniel.svg"),
  appUrl("docs/images/obstacles/komodo.svg")
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const stale = cacheNames.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME);
      return Promise.all(stale.map((name) => caches.delete(name)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(appUrl("index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }

      return fetch(event.request).then((response) => {
        if (!response.ok) {
          return response;
        }

        const scopePath = new URL(self.registration.scope).pathname;
        const relativePath = requestUrl.pathname.startsWith(scopePath)
          ? requestUrl.pathname.slice(scopePath.length)
          : requestUrl.pathname;
        const shouldCache = relativePath.startsWith("dist/")
          || relativePath.startsWith("docs/images/")
          || requestUrl.pathname.endsWith(".png")
          || requestUrl.pathname.endsWith(".svg")
          || requestUrl.pathname.endsWith(".webmanifest")
          || requestUrl.pathname.endsWith(".ico");

        if (shouldCache) {
          const copy = response.clone();
          void caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, copy).catch(() => undefined);
          });
        }

        return response;
      }).catch(() => caches.match(event.request));
    })
  );
});
