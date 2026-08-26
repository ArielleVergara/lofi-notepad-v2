/**
 * Storage Engine for LofiNotepad (IndexedDB + localStorage)
 * Provides 100% client-side persistence for documents, settings, post-its, custom fonts, lore entries and images.
 */

const DB_NAME = 'LofiNotepadDB';
const DB_VERSION = 3; // Incremented for lore_entries store

let dbInstance = null;

export const Storage = {
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains('documents')) {
                    db.createObjectStore('documents', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }
                if (!db.objectStoreNames.contains('postits')) {
                    db.createObjectStore('postits', { keyPath: 'id' });
                }
                if (!db.objectStoreNames.contains('custom_fonts')) {
                    db.createObjectStore('custom_fonts', { keyPath: 'name' });
                }
                if (!db.objectStoreNames.contains('lore_entries')) {
                    db.createObjectStore('lore_entries', { keyPath: 'id' });
                }
            };

            request.onsuccess = (e) => {
                dbInstance = e.target.result;
                resolve(dbInstance);
            };

            request.onerror = (e) => {
                console.error('IndexedDB Error:', e.target.error);
                reject(e.target.error);
            };
        });
    },

    /* --- Document Operations --- */
    async getAllDocuments() {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('documents', 'readonly');
            const store = tx.objectStore('documents');
            const req = store.getAll();
            req.onsuccess = () => {
                const docs = req.result || [];
                if (docs.length === 0) {
                    const defaultDoc = {
                        id: 'doc_' + Date.now(),
                        title: 'Mi primer manuscrito',
                        content: '<h1>Bienvenido a LofiNotepad v2</h1><p>Este es tu espacio de escritura ambientado. Puedes cambiar la imagen de fondo, reproducir sonido ambiental de lluvia o chimenea, y personalizar la tipografía a tu gusto.</p><p>Usa la barra de herramientas superior para dar formato a tu texto, o activa el <b>Modo Enfoque</b> para escribir sin distracciones.</p>',
                        isCustomTitle: true,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    };
                    Storage.saveDocument(defaultDoc);
                    resolve([defaultDoc]);
                } else {
                    docs.sort((a, b) => b.updatedAt - a.updatedAt);
                    resolve(docs);
                }
            };
        });
    },

    async getDocument(id) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('documents', 'readonly');
            const store = tx.objectStore('documents');
            const req = store.get(id);
            req.onsuccess = () => resolve(req.result);
        });
    },

    async saveDocument(doc) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('documents', 'readwrite');
            const store = tx.objectStore('documents');
            doc.updatedAt = Date.now();
            store.put(doc);
            tx.oncomplete = () => resolve(doc);
        });
    },

    async deleteDocument(id) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('documents', 'readwrite');
            const store = tx.objectStore('documents');
            store.delete(id);
            tx.oncomplete = () => resolve(true);
        });
    },

    /* --- Lore & Character Entries --- */
    async getAllLoreEntries() {
        return new Promise((resolve) => {
            if (!dbInstance.objectStoreNames.contains('lore_entries')) return resolve([]);
            const tx = dbInstance.transaction('lore_entries', 'readonly');
            const store = tx.objectStore('lore_entries');
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
        });
    },

    async saveLoreEntry(entry) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('lore_entries', 'readwrite');
            const store = tx.objectStore('lore_entries');
            store.put(entry);
            tx.oncomplete = () => resolve(entry);
        });
    },

    async deleteLoreEntry(id) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('lore_entries', 'readwrite');
            const store = tx.objectStore('lore_entries');
            store.delete(id);
            tx.oncomplete = () => resolve(true);
        });
    },

    /* --- Custom Fonts --- */
    async getAllCustomFonts() {
        return new Promise((resolve) => {
            if (!dbInstance.objectStoreNames.contains('custom_fonts')) return resolve([]);
            const tx = dbInstance.transaction('custom_fonts', 'readonly');
            const store = tx.objectStore('custom_fonts');
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
        });
    },

    async saveCustomFont(fontObj) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('custom_fonts', 'readwrite');
            const store = tx.objectStore('custom_fonts');
            store.put(fontObj);
            tx.oncomplete = () => resolve(fontObj);
        });
    },

    /* --- Settings & Preferences --- */
    async getSettings() {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('settings', 'readonly');
            const store = tx.objectStore('settings');
            const req = store.get('app_settings');
            req.onsuccess = () => {
                const defaults = {
                    key: 'app_settings',
                    bgPreset: 'rainy_night',
                    customBgUrl: null,
                    bgBlur: 6,
                    bgOverlayOpacity: 0.55,
                    pageMode: 'mode-a4',
                    paperBg: '#1e293b',
                    paperTextColor: '#f1f5f9',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    lineHeight: '1.7',
                    accentColor: '#8b5cf6',
                    activeDocId: null
                };
                resolve(req.result ? { ...defaults, ...req.result.value } : defaults);
            };
        });
    },

    async saveSettings(settings) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('settings', 'readwrite');
            const store = tx.objectStore('settings');
            store.put({ key: 'app_settings', value: settings });
            tx.oncomplete = () => resolve(settings);
        });
    },

    /* --- Post-it Notes Operations --- */
    async getAllPostits() {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('postits', 'readonly');
            const store = tx.objectStore('postits');
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
        });
    },

    async savePostit(postit) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('postits', 'readwrite');
            const store = tx.objectStore('postits');
            store.put(postit);
            tx.oncomplete = () => resolve(postit);
        });
    },

    async deletePostit(id) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('postits', 'readwrite');
            const store = tx.objectStore('postits');
            store.delete(id);
            tx.oncomplete = () => resolve(true);
        });
    }
};
