// Deklarace proměnných
        var cacheFiles = [];
var cacheName = "arlcache";
var offlineUrl = "";
var cacheVersion = "v4"; // 2024-07-12

var fullCacheName = cacheName + '-' + cacheVersion; // Přidejte tuto řádku

// Příjem zpráv od klienta
self.addEventListener("message", (event) => {
    if (event.data.type === "setConfig") {
        const config = event.data.config;
        cacheFiles = config.cacheFiles;
        offlineUrl = config.offlineUrl;
        console.log("Konfigurace načtena:", {
            cacheFiles,
            offlineUrl
        });
    }
});

self.addEventListener("install", (event) => {
    event.waitUntil(
            (async () => {
                // Čekáme na zprávu s konfigurací
                while (cacheFiles.length === 0 || offlineUrl === "") {
                    await new Promise((resolve) => setTimeout(resolve, 100));
                }
                // Odstraníme duplicitní položky z cacheFiles
                cacheFiles = Array.from(new Set([...cacheFiles, offlineUrl]));
                try {
                    // Aktualizujte název cache
                    const cache = await caches.open(fullCacheName);
                    await Promise.all(
                            cacheFiles.map(async (fileUrl) => {
                                try {
                                    await cache.add(fileUrl);
                                } catch (error) {
                                    console.error(`Failed to fetch: ${fileUrl}`, error);
                                }
                            }));
                } catch (error) {
                    console.error("Failed to fetch:", error);
                }
            })());
});


self.addEventListener("activate", (event) => {
    event.waitUntil(
            caches.keys().then((cacheNames) => {
        return Promise.all(
                cacheNames.map((cache) => {
                    if (!cache.startsWith(cacheName) || cache === fullCacheName) {
                        return;
                    }
                    return caches.delete(cache);
                }));
    }));
    self.clients.claim(); // Přidejte claim pro rychlejší aktivaci nového service worker
});

self.addEventListener("fetch", (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response) {
            // Vrátíme uloženou odpověď z cache
            return response;
        }
        // Pokusíme se provést síťový požadavek
        return fetch(event.request).catch((error) => {
            // console.log(event.request.mode);
            // Když nastane chyba (jako například offline stav), zkontrolujeme, zda jde o navigační požadavek
            if (event.request.mode === "navigate") {
                // V takovém případě vrátíme offline stránku
                return caches.match(offlineUrl);
            } else if (event.request.mode === "no-cors") {
                return caches.match(event.request).catch(() => {
                    // Pokud odpověď v cache není dostupná, vrátíme chybu 503 Service Unavailable
                    return new Response(null, {
                        status: 503,
                        statusText: "Service Unavailable"
                    });
                });
            } else {
                // Pro ostatní požadavky se pokusíme vrátit odpověď z cache
                return caches.match(event.request).catch(() => {
                    // Pokud odpověď v cache není dostupná, vrátíme chybu 503 Service Unavailable
                    return new Response(null, {
                        status: 503,
                        statusText: "Service Unavailable"
                    });
                });
            }
        });
    }));
});

self.addEventListener("message", function (event) {
    if (event.data && event.data.action === "cache-file") {
        caches.open(fullCacheName).then(function (cache) {
            cache.add(event.data.fileUrl).catch(function (error) {
                console.error("Failed to fetch:", error);
            });
        });
    }
});