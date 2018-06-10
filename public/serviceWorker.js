
var urls = [
    // '/',
    'styles/index.css',
    'styles/gameboy.css',
    'images/gameboy.webp',
    '/styles/offlineSlider.css',
    '/javascripts/offlineSlider.js',
    'javascripts/resizeHandler.js',
    'javascripts/swipe.js',
    'javascripts/panelChooser.js',
    'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js',
    '/fonts/pokemon/pokemonFont.css',
    '/javascripts/controls.js',
    '/javascripts/menu.js',
    '/styles/menu.css'
];
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('static').then(function(cache) {
            urls.forEach(function (url) {
                cache.add(url).catch(
                    console.log("There was an error installing", url, "with service worker")
                );
            });
        })
    );
});

self.addEventListener('activate', function() {
    console.log("Service worker activated!");
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function(res) {
            return res || fetch(e.request);
        })
    );
});
