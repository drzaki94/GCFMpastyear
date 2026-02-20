const CACHE_NAME = 'gcfm-mastery-v2';

// USE RELATIVE PATHS FOR GITHUB PAGES (./ instead of /)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './gcfm_part1.html',
  './gcfm_part2.html',
  './gcfm_part3.html',
  './gcfm_part4.html',
  './gcfm_part5.html',
  './gcfm_part6.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});