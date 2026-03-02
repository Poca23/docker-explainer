const CACHE = "docker-guide-v3";
const FILES = [
  "./",
  "./index.html",
  "./css/reset.css",
  "./css/theme.css",
  "./css/layout.css",
  "./css/animations.css",
  "./css/search.css",
  "./js/app.js",
  "./js/data.js",
  "./js/data-exo1.js",
  "./js/data-exo2.js",
  "./js/render.js",
  "./js/search.js",
  "./assets/favicon/android-chrome-192x192.png",
  "./assets/favicon/android-chrome-512x512.png",
  "./assets/favicon/apple-touch-icon.png",
  "./assets/favicon/favicon-32x32.png",
  "./assets/favicon/favicon-16x16.png",
];

self.addEventListener("install", (e) =>
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))),
);
self.addEventListener("fetch", (e) =>
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request))),
);
