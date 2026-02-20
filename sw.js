// Name of the cache
const CACHE_NAME = 'gcfm-mastery-v1';

// List of files to cache for offline use
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/gcfm_part1.html',
  '/gcfm_part2.html',
  '/gcfm_part3.html',
  '/gcfm_part4.html',
  '/gcfm_part5.html',
  '/gcfm_part6.html',
  '/manifest.json',
  '/icon.png'
];

// Install Event: Cache all the files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching all assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activate Event: Clean up old caches
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
  // Force the service worker to take control immediately
  return self.clients.claim();
});

// Fetch Event: Serve cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // If the file is in cache, return it. Otherwise, fetch it from the network.
        return response || fetch(event.request);
      })
  );
});