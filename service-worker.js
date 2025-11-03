const CACHE_NAME = 'story-app-v3';
const URLS_TO_CACHE = [
  '/', '/index.html', '/manifest.webmanifest',
  '/src/styles/main.css', '/src/views/main-view.js',
  '/icons/icon-192x192.png', '/icons/icon-512x512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(URLS_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const { request } = e;
  const isApi = request.url.includes('/v1/');
  if (isApi) {
    e.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
    return;
  }
  e.respondWith(
    caches.match(request).then(res => res || fetch(request))
  );
});

self.addEventListener('push', e => {
  let data = {};
  try { data = e.data?.json() || {}; } catch (_) {}
  const title = data.title || 'Story App';
  const options = {
    body: data.body || 'Ada cerita baru!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    data: { url: data.url || '/#/home' },
    actions: [{ action: 'open', title: 'Buka' }]
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const url = e.notification?.data?.url || '/#/home';
  e.waitUntil(clients.openWindow(url));
});
