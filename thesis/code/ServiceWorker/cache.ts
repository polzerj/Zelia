const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";
const assets = ["/", "/index.html", "/app.js", "/style.css", "/fallback.html"];

// install event
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      // add static pages to the cache
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      // delete old caches if Service Worker gets initially activated
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        // return cached page
        // otherwise fetch the page
        return cacheRes || fetch(evt.request);
      })
      .catch(() => {
        // return tha fallback page if page cannot be fetched
        if (evt.request.url.indexOf(".html") > -1) {
          return caches.match("/fallback.html");
        }
      })
  );
});
