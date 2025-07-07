const CACHE_NAME = 'portfolio-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install: cache files one by one
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        urlsToCache.map(url =>
          fetch(url).then(response => {
            if (response.ok) {
              return cache.put(url, response.clone());
            } else {
              console.warn(`Service Worker: skipping ${url}, status ${response.status}`);
            }
          }).catch(err => {
            console.warn(`Service Worker: failed to fetch ${url}: ${err}`);
          })
        )
      );
    })
  );
});

// Activate: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(
        names.filter(name => name !== CACHE_NAME)
             .map(name => caches.delete(name))
      )
    )
  );
});

// Fetch: serve from cache, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => 
      resp || fetch(event.request)
    )
  );
});
