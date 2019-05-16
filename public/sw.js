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

const APICACHE = "ledgerApi2";

self.addEventListener("install", evt => {
    console.log("Installed");
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

function getFromCache(evt) {
    return () => {
        return caches.match(evt.request).then((cachedResponse) => {
            if (cachedResponse) {
                console.log("Response", cachedResponse.clone());
                return cachedResponse;
            }
            const url = new URL(evt.request.url);
            if (url.pathname.startsWith("/api/ledgers")) {
                return caches
                    .match(new Request("/api/ledgers", {method: "GET"}))
                    .then(globalCachedResponse => {
                        if (!cachedResponse && globalCachedResponse) {
                            console.log("Global response");
                            return globalCachedResponse;
                        } else {
                            const cachedDate = new Date(cachedResponse.headers.get("date"));
                            const globalCachedDate = new Date(globalCachedResponse.headers.get("date"));
                            if (globalCachedDate.getTime() > cachedDate.getTime()) {
                                console.log("Global response");
                                return globalCachedResponse;
                            } else {
                                console.log("Response");
                                return cachedResponse;
                            }
                        }
                    });
            }
        });
    }
}

self.addEventListener("fetch", evt => {
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
        const response = fetch(evt.request.clone()).then((response) => {
            if (response.ok) {
                return caches.open(APICACHE).then(cache => {

                    cache.put(evt.request.clone(), response.clone());
                    return response;
                });
            } else {
                return getFromCache(evt)();
            }
        }).catch(getFromCache(evt));
        evt.respondWith(response);
        /*evt.respondWith(
            caches.match(evt.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                } else {
                    return fetch(evt.request).then(response => {
                        return caches.open(APICACHE).then(cache => {
                            cache.put(evt.request, response.clone());
                            return response;
                        });
                    });
                }
            }));*/
    }
});
