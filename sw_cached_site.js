// Cache
const cacheName = 'v2';

// Call Install Event
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

// Call Activate Event
self.addEventListener('activate', (event) => {
    console.log('Service Worker activated');
    // remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker clear old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
});

//Fetch
self.addEventListener('fetch', (event) => {
    console.log('Service Worker fetching')
    // event.respondWith(fetch(event.request).catch(err => caches.match(event.request)))
    event.respondWith(
        fetch(event.request)
        .then(res => {
            //Make copy/clone of response
            const resClone = res.clone();
            // Open cache
            caches
            .open(cacheName)
            .then(cache => {
                // Add response to cache
                cache.put(event.request, resClone);
            })
            return res
        }).catch(err => caches.match(event.request).then(res => res))
    )
})