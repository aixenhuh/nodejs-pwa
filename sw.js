const _version = 'v3';
const cacheName = 'v3';
const cacheList = [
    '/index.js',
    ''
]

const log = msg => {
    console.log(`[ServiceWorker ${_version}] ${msg}`)
}

// 서비스 워커 설치 (웹 자원 캐싱)
self.addEventListener('install', event => {
    log('INSTALL');
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            return cache.addAll(cacheList);
        })
        .catch(function(error){
            return console.log(error);
        })
    )

})

self.addEventListener('activate', event => {
    log('Activate');
    newCacheName = "v2";
    event.waitUntil(
        caches.keys().then(function(cacheList) {
          return Promise.all(
            cacheList.map(function(cacheName) {
              if (newCacheName.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          )
        }).catch(function(error) {
          return console.log(error);
        })
    )
})

self.addEventListener('fetch', event => {
    log('Fetch');
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
            .catch(function(error) {
                return console.log(error);
            })
    )
})

self.addEventListener('push', event => {
    const title = 'This';
    const options = {
        body : event.data.text()
    };

    event.waitUntil(self.registration.showNotification(title, options));
})

self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    event.waitUntil(
        clients.openWindow('https://www.naver.com')
    );
})