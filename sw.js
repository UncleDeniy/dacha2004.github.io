const CACHE='dacha2004-v5';
const ASSETS=['./','index.html','login.html','chat.html','gallery.html','events.html','profile.html','settings.html','birthdays.html','assets/css/style.css','assets/js/app.js','assets/js/chat.js','assets/img/logo.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).catch(()=>{})));
self.addEventListener('fetch',e=>e.respondWith(fetch(e.request).catch(()=>caches.match(e.request))));
