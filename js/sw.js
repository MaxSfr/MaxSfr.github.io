var cacheName = 'js13kPWA-v1';
var appShellFiles = [
    'index.html',
    'style.css',
   	'produits.csv',
    '/js/DecoderWorker.js',
    '/js/exif.js',
    '/js/job.js',
    '/js/app.js',
    '/images/barcode-scanner.png',
    '/images/icon-cart.png',
    '/images/icon-setup.png',
    '/images/icon-transmit.png',
    '/images/logo.png',
]

elf.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
      return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
          console.log('[Service Worker] Caching new resource: '+e.request.url);
          cache.put(e.request, response.clone());
          return response;
        });
      });
    })
  );
});