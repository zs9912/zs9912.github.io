// Cache
const cacheName = 'v2';

const cacheAssets = [
    'index.html',
    'about.html',
    'style.css',
    'main.js'
]

// Call Install Event
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
    event.waitUntil(
        caches
          .open(cacheName)
          .then(cache => {
            console.log('ServiceWorker caching files');
            cache.addAll(cacheAssets)
            .then(() => console.log('cached') )
            .catch(err => console.log('cache failed', err));
          })
          .then(() => self.skipWaiting())
    )
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
    event.respondWith(fetch(event.request).catch(err => caches.match(event.request)))
})