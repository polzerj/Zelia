# 1. Service Worker

Web workers are JavaScript scripts which are executed in a background task. To start a web worker, it is recommendable to check if the browser supports web workers.

A Service Worker has different events:

- **Install event**

  The install event is triggered after the service worker got registered. There the dependencies are usually installed. E.g.: the static cache gets filled there

- **Activated event**

  On the initial installation the activated event gets fired im mediately after the installation. If there is a new service worker for the same page it only gets installed. However, the activation will be during the next session. In the activated event is usually used to clean up old resources. E.g.: the caches of the previous service worker get cleared

- **Fetch event**

  The fetch event is called every time a resource of the server is requested. It intercepts this request to respond for exam ple with the data of the cache.

Code to register a worker:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("service worker registered"))
    .catch((err) => console.log("service worker not registered", err));
}
```

The following code displays how to set up a service worker with the Cache-API to use a static and dynamic cache:

```js
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
```

links: [MDN Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)
