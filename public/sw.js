// Simple Service Worker for Nikolay Advolodkin's Personal Website
// Provides basic offline functionality

const CACHE_NAME = 'nikolay-site-v1';

// Essential assets to cache
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS).catch(() => {
          console.log('SW: Some assets failed to cache, continuing anyway');
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - network first, cache fallback
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and non-http(s) URLs
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // If successful, cache the response for same-origin requests
        if (response.status === 200 && event.request.url.startsWith(self.location.origin)) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone))
            .catch(() => {}); // Ignore cache errors
        }
        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // If it's a page request, return a simple offline page
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return new Response(
                `<!DOCTYPE html>
                <html>
                <head>
                  <title>Offline</title>
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style>
                    body { font-family: system-ui; text-align: center; padding: 50px; }
                    .container { max-width: 400px; margin: 0 auto; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h1>You're Offline</h1>
                    <p>Please check your connection and try again.</p>
                    <button onclick="location.reload()">Retry</button>
                  </div>
                </body>
                </html>`,
                { headers: { 'Content-Type': 'text/html' } }
              );
            }
            
            return new Response('Offline', { status: 503 });
          });
      })
  );
});

// Background sync for analytics and form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any queued analytics or form submissions
  console.log('Service Worker: Background sync triggered');
}

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/favicon-32x32.png',
      badge: '/favicon-16x16.png',
      data: data.url
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});

console.log('Service Worker: Loaded'); 