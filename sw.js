const CACHE_NAME = 'gcfm-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './gcfm_part1.html',
  './gcfm_part2.html',
  './gcfm_part3.html',
  './gcfm_part4.html',
  './gcfm_part5.html',
  './gcfm_part6.html'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});