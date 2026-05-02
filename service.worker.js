const CACHE_NAME = "risk-app-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js"
 "./manifest.json"
];

// install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return Promise.all(
          urlsToCache.map(url =>
            cache.add(url).catch(err => {
              console.log("Failed to cache:", url);
            })
          )
        );
      })
  );
});

// fetch (خیلی مهم)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
          .catch(() => caches.match("/index.html"));
      })
  );
});
