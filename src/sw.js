const _version = 'v1';
const cacheName = 'v1';
const cacheList = [
    '/'
]

const log = msg => {
    console.log(`[ServiceWorker ${_version}] ${msg}`)
}

self.addEventListener('install', event => {
    log('INSTALl');
})

self.addEventListener('activate', event => {
    log('Activate');
})

self.addEventListener('fetch', event => {
    log('Fetch');
})

