const CACHE = "docker-guide-v1";
const FILES = [
  "/",
  "/index.html",
  "/css/reset.css",
  "/css/theme.css",
  "/css/layout.css",
  "/css/animations.css",
  "/css/search.css",
  "/js/app.js",
  "/js/data.js",
  "/js/data-exo1.js",
  "/js/data-exo2.js",
  "/js/render.js",
  "/js/search.js",
  "/assets/favicon/favicon_docker-explainer.png",
  "/assets/logo/logo_docker-explainer-removebg-preview.png",
];

self.addEventListener("install", (e) =>
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))),
);
self.addEventListener("fetch", (e) =>
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request))),
);
