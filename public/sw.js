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

function getLedgerFromLedgers(globalCachedResponse, ledgerId) {
    return globalCachedResponse.json().then(ledgers => {
        const ledger = ledgers.find(ledger => ledger.id === parseInt(ledgerId));
        const responseBuffer = new Blob([JSON.stringify(ledger)], {type: "text/json"});
        return new Response(responseBuffer, {statusText: "OK", status: 200, headers: []});
    });
}

function getAPICache(url, cachedResponse) {
    return caches
        .match(new Request("/api/ledgers", {method: "GET"}))
        .then(globalCachedResponse => {
            const ledgerId = /\/api\/ledgers\/(?<id>[0-9]+)(\/.*)?/i.exec(url.pathname).groups.id;
            if (!cachedResponse && globalCachedResponse) {
                console.log("Global response");
                return getLedgerFromLedgers(globalCachedResponse, ledgerId);
            } else {
                const cachedDate = new Date(cachedResponse.headers.get("date"));
                const globalCachedDate = new Date(globalCachedResponse.headers.get("date"));
                if (globalCachedDate.getTime() > cachedDate.getTime()) {
                    console.log("Global response");
                    return getLedgerFromLedgers(globalCachedResponse, ledgerId);
                } else {
                    console.log("Response");
                    return cachedResponse;
                }
            }
        });
}

function getFromCache(evt) {
    return () => {
        return caches.match(evt.request).then((cachedResponse) => {
            if (cachedResponse) {
                console.log("Response", cachedResponse.clone());
                return cachedResponse;
            }
            const url = new URL(evt.request.url);
            if (url.pathname.startsWith("/api/ledgers")) {
                return getAPICache(url, cachedResponse);
            } else if (url.pathname.startsWith("/ledgers")) {
                return caches.match(new Request("/", {method: "GET"}));
            }
        });
    }
}

function updateCache(ledgers) {
    caches.open(APICACHE).then(cache => {
        cache.put(new Request("/api/ledgers",
            {method: "GET"}
            ),
            new Response(
                new Blob([JSON.stringify(ledgers)],
                    {type: "text/json"}),
                {status: 200, statusText: "OK"}
            )
        );
    });
}

function updateTransaction(ledgers, ledgerId, payload) {
    const ledgerIndex = ledgers.findIndex(object => object.id === parseInt(ledgerId));
    const transactionIndex = ledgers[ledgerIndex]
        .transactions
        .findIndex(object => object.id === payload.updatedTransaction.id);
    ledgers[ledgerIndex].transactions[transactionIndex] = Object.assign(ledgers[ledgerIndex].transactions[transactionIndex], payload.updatedTransaction);
    updateCache(ledgers);
}

function updateLedger(ledgers, payload) {
    const index = ledgers.findIndex(object => object.id === payload.updatedLedger.id);
    ledgers[index] = Object.assign(ledgers[index], payload.updatedLedger);
    updateCache(ledgers);
}

function createLedger(ledgers, payload) {
    payload.ledgerDraft.id = ledgers.reduce((previousValue, object) => Math.max(previousValue, object.id), -1) + 1;
    ledgers.push(payload.ledgerDraft);
    updateCache(ledgers);
}

function createTransaction(ledgers, ledgerId, payload) {
    const ledgerIndex = ledgers.findIndex(ledger => ledger.id === parseInt(ledgerId));
    payload.transactionDraft.id = ledgers[ledgerIndex].reduce((previousValue, object) => Math.max(previousValue, object.id), -1) + 1;
    ledgers[ledgerIndex].transactions.push(payload.transactionDraft);
    updateCache(ledgers);
}

function handleCreate(evt, objects, newObject) {
    const pathRegex = /\/api\/ledgers\/((?<ledgerId>[0-9]+)\/transactions)?/
        .exec(new URL(evt.request.url).pathname);
    if (pathRegex.groups.ledgerId !== "") {
        createTransaction(objects, pathRegex.groups.ledgerId, newObject);
    } else {
        createLedger(objects, newObject);
    }
}

function handleUpdate(evt, objects, updatedObject) {
    const pathRegex = /\/api\/ledgers\/(?<ledgerId>[0-9]+)(\/transactions\/(?<transactionId>[0-9]+))?/
        .exec(new URL(evt.request.url).pathname);
    if (pathRegex.groups.transactionId !== "") {
        updateTransaction(objects, pathRegex.groups.ledgerId, updatedObject);
    } else {
        updateLedger(objects, updatedObject);
    }
}

function handleModification(evt, handler) {
    const promiseChain = fetch(evt.request.clone());
    promiseChain.then(response => {
        fetch("/api/ledgers", {method: "GET"}).then(response => {
            response.json().then(ledgers => {
                updateCache(ledgers);
            });
        });
    }).catch(() => {
        caches.match(new Request("/api/ledgers", {method: "GET"})).then(cachedResponse => {
            cachedResponse.json().then(objects => {
                evt.request.clone().json().then(object => {
                    handler(evt, objects, object);
                });
            });
        }).catch(reason => {
            return new Response(null, {statusText: "OK", status: 200});
        });
        queue.pushRequest({request: evt.request.clone()});
        return new Response(null, {statusText: "OK", status: 200});
    });
    evt.respondWith(new Response(null, {statusText: "OK", status: 200}));
}

self.addEventListener("fetch", evt => {
    console.log("Fetch", evt.request.url);
    if (evt.request.method === "POST") {
        handleModification(evt, handleCreate);
    } else if (evt.request.method === "PUT") {
        handleModification(evt, handleUpdate);
    } else {
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
    }
});
