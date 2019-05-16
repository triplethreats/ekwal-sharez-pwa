// This optional code is used to register a service worker.
// register() is not called by default.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on subsequent visits to a page, after all the
// existing tabs open on the page have been closed, since previously cached
// resources are updated in the background.

// To learn more about the benefits of this model and instructions on how to
// opt-in, read https://bit.ly/CRA-PWA
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.precaching.precacheAndRoute([]);

workbox.precaching.precacheAndRoute([
    "/",
    "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/roboto/v19/KFOlCnqEu92Fr1MmEU9fBBc4.woff2"]);
// workbox.routing.registerRoute("/api/", new workbox.strategies.NetworkFirst({ "cacheName":"apiCache","networkTimeoutSeconds":10, plugins: [new workbox.backgroundSync.Plugin("apiQueue", {}), new workbox.cacheableResponse.Plugin({ statuses: [ 0, 200 ] })] }), 'GET');

const APICACHE = "ledgerApi";

self.addEventListener("install", evt => {
    console.log("Installed");
    /*evt.waitUntil(
        caches.open("home").then(cache => {
            return cache.add("/").then(() => self.skipWaiting());
        })
    );*/
});

self.addEventListener('activate', event => {
    const currentCaches = [APICACHE];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

const queue = new workbox.backgroundSync.Queue('ledgers');

self.addEventListener("fetch", evt => {
    if (!evt.request.url.startsWith(self.location.origin)) {
        return;
    }
    console.log("Fetch", evt.request.url);
    if (evt.request.method === "POST") {
        console.log("Posting data");
        const promiseChain = fetch(evt.request.clone());
        promiseChain.catch(() => {
            return queue.pushRequest({request: evt.request});
        });
        evt.respondWith(promiseChain);
    } else {
        console.log("Getting data");
        evt.respondWith(
            caches.match(evt.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                } else {
                    return caches.open(APICACHE).then(cache => {
                        return fetch(evt.request).then(response => {
                            return cache.put(evt.request, response.clone()).then(() => response);
                        });
                    });
                }
            }));
    }
});
