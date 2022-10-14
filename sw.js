const CACHE_NAME = `my-sample-app-cache-v1`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      './index.html' ,

      './elements.html' ,

      './login.html' ,

      './map.html' ,

      './rio-capibaribe.html' ,

      './rio-pajeu.html' ,

      './rio-una.html' ,

      'assets/css/fontawesome-all.min.css' ,

      'assets/css/main.css' ,

      'assets/css/login.css' ,

      'assets/css/noscript.css' ,
      
      '.assets/images/icon.png',
      '.assets/images/pic01.jpg',
      '.assets/images/pic02.jpg',
      '.assets/images/pic03.jpg',
      '.assets/images/pic04.jpg',
      '.assets/images/pic05.jpg',
      '.assets/images/pic06.jpg',
      '.assets/images/pic07.jpg',
      '.assets/images/pic08.jpg',
      '.assets/images/pic09.jpg',
      '.assets/images/pic10.jpg',
      '.assets/images/pic11.jpg',
      '.assets/images/pic12.jpg',
      '.assets/images/pic13.jpg',
      '.assets/images/pic14.jpg',
      '.assets/images/pic15.jpg'
    ]);
  })());
});

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    try {
      // Try to fetch the resource from the network.
      const fetchResponse = await fetch(event.request);

      // Save the resource in the cache.
      cache.put(event.request, fetchResponse.clone());

      // And return it.
      return fetchResponse;
    } catch (e) {
      // Fetching didn't work get the resource from the cache.
      const cachedResponse = await cache.match(event.request);

      // And return it.
      return cachedResponse;
    }
  })());
});