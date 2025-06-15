// Service Worker for Nikolay Advolodkin's Personal Website
// Provides offline functionality and performance optimizations

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest',
  // Add critical CSS and JS files here
];

// External resources to cache
const EXTERNAL_RESOURCES = [
  'https://fonts.googleapis.com/css2',
  'https://fonts.gstatic.com/',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same-origin requests
    event.respondWith(handleSameOriginRequest(request));
  } else {
    // Cross-origin requests (fonts, APIs, etc.)
    event.respondWith(handleCrossOriginRequest(request));
  }
});

// Handle same-origin requests with cache-first strategy for static assets
async function handleSameOriginRequest(request) {
  const url = new URL(request.url);
  
  try {
    // For static assets, use cache-first strategy
    if (isStaticAsset(url.pathname)) {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // For pages, use network-first strategy with cache fallback
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache', error);
    
    // Try to serve from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If it's a page request and we have no cache, return offline page
    if (request.headers.get('accept')?.includes('text/html')) {
      return new Response(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Offline - Nikolay Advolodkin</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              text-align: center;
              padding: 50px;
              background: #f5f5f5;
            }
            .container {
              max-width: 500px;
              margin: 0 auto;
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 { color: #333; }
            p { color: #666; line-height: 1.6; }
            .retry-btn {
              background: #0066CC;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 6px;
              cursor: pointer;
              font-size: 16px;
              margin-top: 20px;
            }
            .retry-btn:hover { background: #0052A3; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>You're Offline</h1>
            <p>It looks like you're not connected to the internet. Please check your connection and try again.</p>
            <p>Some cached content may still be available.</p>
            <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
          </div>
        </body>
        </html>
        `,
        {
          status: 200,
          headers: { 'Content-Type': 'text/html' }
        }
      );
    }
    
    // For other requests, return a generic error
    return new Response('Offline', { status: 503 });
  }
}

// Handle cross-origin requests
async function handleCrossOriginRequest(request) {
  try {
    // For external resources, try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch from network
    const networkResponse = await fetch(request);
    
    // Cache successful responses for external resources
    if (networkResponse.status === 200 && shouldCacheExternalResource(request.url)) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: External resource failed', error);
    
    // Try to serve from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return empty response for failed external resources
    return new Response('', { status: 503 });
  }
}

// Check if a path is a static asset
function isStaticAsset(pathname) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.woff', '.woff2'];
  return staticExtensions.some(ext => pathname.endsWith(ext)) || 
         pathname.includes('/favicon') ||
         pathname.includes('/apple-touch-icon');
}

// Check if external resource should be cached
function shouldCacheExternalResource(url) {
  return EXTERNAL_RESOURCES.some(resource => url.includes(resource));
}

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