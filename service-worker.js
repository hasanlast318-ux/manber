// service-worker.js
const CACHE_NAME = 'manbar-almaarifa-v1';
const urlsToCache = [
  './',
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&display=swap'
];

// قائمة بجميع ملفات الأسئلة (أضف جميع المسارات)
const questionFiles = [
  // أسئلة عامة
  './questions/general/general_easy.js',
  './questions/general/general_medium.js',
  './questions/general/general_hard.js',
  './questions/general/general_expert.js',
  
  // أسئلة النبي
  './questions/prophet/prophet_easy.js',
  './questions/prophet/prophet_medium.js',
  './questions/prophet/prophet_hard.js',
  './questions/prophet/prophet_expert.js',
  
  // أسئلة فقهية
  './questions/fiqh/fiqh_easy.js',
  './questions/fiqh/fiqh_medium.js',
  './questions/fiqh/fiqh_hard.js',
  './questions/fiqh/fiqh_expert.js',
  
  // أسئلة لغوية
  './questions/language/language_easy.js',
  './questions/language/language_medium.js',
  './questions/language/language_hard.js',
  './questions/language/language_expert.js',
  
  // أهل البيت - علي
  './questions/ahlulbayt/ali/ali_easy.js',
  './questions/ahlulbayt/ali/ali_medium.js',
  './questions/ahlulbayt/ali/ali_hard.js',
  './questions/ahlulbayt/ali/ali_expert.js',
  
  // أهل البيت - فاطمة
  './questions/ahlulbayt/fatima/fatima_easy.js',
  './questions/ahlulbayt/fatima/fatima_medium.js',
  './questions/ahlulbayt/fatima/fatima_hard.js',
  './questions/ahlulbayt/fatima/fatima_expert.js',
  
  // أهل البيت - الحسن
  './questions/ahlulbayt/hasan/hasan_easy.js',
  './questions/ahlulbayt/hasan/hasan_medium.js',
  './questions/ahlulbayt/hasan/hasan_hard.js',
  './questions/ahlulbayt/hasan/hasan_expert.js',
  
  // أهل البيت - الحسين
  './questions/ahlulbayt/hussein/hussein_easy.js',
  './questions/ahlulbayt/hussein/hussein_medium.js',
  './questions/ahlulbayt/hussein/hussein_hard.js',
  './questions/ahlulbayt/hussein/hussein_expert.js',
  
  // أهل البيت - السجاد
  './questions/ahlulbayt/sajjad/sajjad_easy.js',
  './questions/ahlulbayt/sajjad/sajjad_medium.js',
  './questions/ahlulbayt/sajjad/sajjad_hard.js',
  './questions/ahlulbayt/sajjad/sajjad_expert.js',
  
  // أهل البيت - الباقر
  './questions/ahlulbayt/baqir/baqir_easy.js',
  './questions/ahlulbayt/baqir/baqir_medium.js',
  './questions/ahlulbayt/baqir/baqir_hard.js',
  './questions/ahlulbayt/baqir/baqir_expert.js',
  
  // أهل البيت - الصادق
  './questions/ahlulbayt/sadiq/sadiq_easy.js',
  './questions/ahlulbayt/sadiq/sadiq_medium.js',
  './questions/ahlulbayt/sadiq/sadiq_hard.js',
  './questions/ahlulbayt/sadiq/sadiq_expert.js',
  
  // أهل البيت - الكاظم
  './questions/ahlulbayt/kadhim/kadhim_easy.js',
  './questions/ahlulbayt/kadhim/kadhim_medium.js',
  './questions/ahlulbayt/kadhim/kadhim_hard.js',
  './questions/ahlulbayt/kadhim/kadhim_expert.js',
  
  // أهل البيت - الرضا
  './questions/ahlulbayt/reza/reza_easy.js',
  './questions/ahlulbayt/reza/reza_medium.js',
  './questions/ahlulbayt/reza/reza_hard.js',
  './questions/ahlulbayt/reza/reza_expert.js',
  
  // أهل البيت - الجواد
  './questions/ahlulbayt/jawad/jawad_easy.js',
  './questions/ahlulbayt/jawad/jawad_medium.js',
  './questions/ahlulbayt/jawad/jawad_hard.js',
  './questions/ahlulbayt/jawad/jawad_expert.js',
  
  // أهل البيت - الهادي
  './questions/ahlulbayt/hadi/hadi_easy.js',
  './questions/ahlulbayt/hadi/hadi_medium.js',
  './questions/ahlulbayt/hadi/hadi_hard.js',
  './questions/ahlulbayt/hadi/hadi_expert.js',
  
  // أهل البيت - العسكري
  './questions/ahlulbayt/askari/askari_easy.js',
  './questions/ahlulbayt/askari/askari_medium.js',
  './questions/ahlulbayt/askari/askari_hard.js',
  './questions/ahlulbayt/askari/askari_expert.js',
  
  // أهل البيت - المهدي
  './questions/ahlulbayt/mahdi/mahdi_easy.js',
  './questions/ahlulbayt/mahdi/mahdi_medium.js',
  './questions/ahlulbayt/mahdi/mahdi_hard.js',
  './questions/ahlulbayt/mahdi/mahdi_expert.js',
  
  // أهل البيت - شامل
  './questions/ahlulbayt/comprehensive/comprehensive_easy.js',
  './questions/ahlulbayt/comprehensive/comprehensive_medium.js',
  './questions/ahlulbayt/comprehensive/comprehensive_hard.js',
  './questions/ahlulbayt/comprehensive/comprehensive_expert.js'
];

// دمج القائمتين
const allFilesToCache = [...urlsToCache, ...questionFiles];

// التثبيت
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('فتح الكاش وتخزين الملفات...');
        // تخزين كل الملفات
        return cache.addAll(allFilesToCache).catch(error => {
          console.error('فشل تخزين بعض الملفات:', error);
          // نكمل حتى لو فشل بعضها
          return Promise.resolve();
        });
      })
  );
  self.skipWaiting(); // تفعيل service worker فوراً
});

// التنشيط - حذف الكاش القديم
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('حذف الكاش القديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // السيطرة على جميع الصفحات المفتوحة
    })
  );
});

// استراتيجية التخزين: Cache First ثم Network
self.addEventListener('fetch', event => {
  // تجاهل طلبات chrome-extension
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // من الكاش
        }
        return fetch(event.request).then(networkResponse => {
          // اختياري: تخزين الملفات الجديدة
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(error => {
          console.log('فشل جلب الملف:', error);
          // يمكن إرجاع صفحة offline.html إذا كان الطلب لصفحة HTML
          if (event.request.headers.get('accept').includes('text/html')) {
            return caches.match('./offline.html');
          }
        });
      })
  );
});