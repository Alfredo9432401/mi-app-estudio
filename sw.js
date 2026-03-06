const CACHE = 'estudio-v1';
const ARCHIVOS = [
  '/mi-app-estudio/',
  '/mi-app-estudio/index.html',
  '/mi-app-estudio/manifest.json',
  '/mi-app-estudio/icon-192.png',
  '/mi-app-estudio/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
