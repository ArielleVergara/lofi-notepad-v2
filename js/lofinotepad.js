/**
 * LofiNotebook v2 - Standalone Client-Side Application Script
 * 100% Client-side application with IndexedDB persistence, ambient audio synthesizer, custom font/background upload, Pomodoro, Outline, Lore Bible, Onboarding Tour, i18n Bilingual Support, Native Spellcheck, and Ko-fi donations.
 */

/* ==========================================================================
   1. INTERNATIONALIZATION (I18N) DICTIONARY & MANAGER
   ========================================================================== */
const I18N = {
    es: {
        brandTitle: "LofiNotebook",
        toggleSidebar: "Mostrar/Ocultar Documentos",
        newDocument: "Crear Nuevo Documento",
        searchDocs: "Buscar notas...",
        myDocs: "Mis Documentos",
        defaultDocTitle: "Mi primer proyecto de escritura",
        defaultDocContent: "<h1>Bienvenido a LofiNotebook v2</h1><p>Este es tu espacio de escritura ambientado pensado para grandes proyectos literarios y novelas. Puedes personalizar tus fondos de pantalla, reproducir audio ambiental y llevar el control de tus personajes y lore.</p><p>Usa la barra de herramientas superior para dar formato a tu texto, o activa el <b>Modo Enfoque</b> (icono del ojo) para escribir libre de distracciones.</p>",
        fontTooltip: "Tipografía",
        fontSizeTooltip: "Tamaño de Letra",
        boldTooltip: "Negrita (Ctrl+B)",
        italicTooltip: "Cursiva (Ctrl+I)",
        underlineTooltip: "Subrayado (Ctrl+U)",
        strikeTooltip: "Tachado",
        textColorTooltip: "Color de Texto",
        blockFormatTooltip: "Estilo de Párrafo",
        alignLeftTooltip: "Alinear Izquierda",
        alignCenterTooltip: "Alinear Centro",
        alignRightTooltip: "Alinear Derecha",
        ulTooltip: "Lista con Viñetas",
        olTooltip: "Lista Numerada",
        quoteTooltip: "Cita",
        loreTooltip: "Fichas de Personajes y Lore",
        outlineTooltip: "Esquema por Capítulos",
        pomoTooltip: "Temporizador Pomodoro",
        postitTooltip: "Notas Post-it",
        audioTooltip: "Sonido Ambiental Lo-Fi",
        zenTooltip: "Modo Enfoque / Zen (Ctrl+Shift+F)",
        discordTooltip: "Servidor de Discord (Avisos y Sugerencias)",
        emailTooltip: "Contacto por Email (arienproceso@gmail.com)",
        kofiTooltip: "Apoyar en Ko-fi (Donaciones)",
        settingsTooltip: "Personalización y Ajustes",
        savedStatus: "💾 Guardado local",
        wordsLabel: "Palabras",
        charsLabel: "Caracteres",
        downloadBtn: "📥 Descargar",
        exportWord: "📘 Documento Word (.doc)",
        exportTxt: "📄 Texto plano (.txt)",
        exportMd: "📝 Markdown (.md)",
        exportHtml: "🌐 Página Web (.html)",
        exportPdf: "🖨️ Documento PDF / Imprimir",
        playAudio: "▶ Reproducir Audio",
        pauseAudio: "⏸ Pausar Audio",
        rainLabel: "🌧️ Lluvia suave",
        fireLabel: "🔥 Chimenea",
        wavesLabel: "🌊 Olas del mar",
        cafeLabel: "☕ Ambiente de Café",
        pomoDuration: "Duración:",
        minutes: "minutos",
        start: "▶ Iniciar",
        pause: "⏸ Pausar",
        reset: "🔄 Reiniciar",
        outlineTitle: "📜 Esquema por Capítulos",
        noHeadings: "No hay títulos en el documento (usa H1, H2 o H3).",
        loreModalTitle: "👥 Biblia del Proyecto (Personajes & Lore)",
        namePlaceholder: "Nombre (ej. Elena Rostova)",
        detailsPlaceholder: "Escribe los detalles de la ficha (Edad, rasgos, historia, secretos...)",
        cancel: "Cancelar",
        saveCard: "Guardar Ficha",
        catAll: "Todos",
        catChars: "Personajes",
        catPlaces: "Lugares",
        catLore: "Lore",
        catItems: "Objetos",
        searchLore: "Buscar ficha...",
        newLoreCard: "Nueva Ficha",
        noLoreCards: "No hay fichas guardadas en esta categoría. Haz clic en '➕' para agregar una.",
        settingsTitle: "⚙️ Personalización",
        helpTourBtn: "❓ Ver Tour de Ayuda",
        tabBg: "Ambiente & Fondo",
        tabSheet: "Hoja & Formato",
        tabTheme: "Tipografía & Tema",
        uploadBgLabel: "Subir Imagen de Fondo Propia (Se guardará automáticamente)",
        myUploadedBgs: "Mis Fondos Subidos",
        defaultBgs: "Fondos Lo-Fi Predeterminados",
        bgBlurLabel: "Desenfoque del Fondo (Blur)",
        bgOverlayLabel: "Filtro de Oscuridad (Overlay Opacity)",
        sheetStyleLabel: "Estilo de Hoja / Lienzo",
        pageSizeLabel: "Tamaño / Tipo de Hoja",
        sizeA4: "📄 A4 Estándar (794 x 1123 px)",
        sizeLetter: "📄 Carta / Letter (816 x 1056 px)",
        sizeLegal: "📄 Oficio / Legal (816 x 1344 px)",
        sizePoem: "📜 Poema / Poesía (Estrecho 540 px)",
        pageFlowLabel: "Comportamiento del Lienzo",
        flowContinuous: "📜 Hoja Continua (Se alarga dinámicamente al escribir)",
        flowStatic: "📌 Hoja Estática (Página fija con límite rígido)",
        paperBgLabel: "Color de Fondo del Papel",
        spellcheckLabel: "Corrector Ortográfico del Navegador",
        spellcheckOn: "Activado (Resalta faltas ortográficas)",
        spellcheckOff: "Desactivado",
        uploadFontLabel: "Subir Tipografía Personalizada (.ttf, .otf, .woff, .woff2)",
        defaultFontLabel: "Tipografía de Lectura Predeterminada",
        defaultFontSizeLabel: "Tamaño de Letra Predeterminado",
        accentColorLabel: "Color de Acento de la Interfaz",
        supportProjectTitle: "☕ Apoya el Desarrollo de LofiNotebook",
        supportProjectDesc: "Si LofiNotebook te ayuda en tus proyectos de escritura, puedes apoyar el servidor e inspirar nuevas funciones con una donación voluntaria en Ko-fi.",
        kofiBtnLabel: "☕ Donar en Ko-fi",
        tourSteps: [
            { title: "📖 ¡Bienvenido a LofiNotebook!", desc: "LofiNotebook es una aplicación 100% Client-Side. Todos tus borradores, fichas, fondos e ideas se guardan de forma permanente y totalmente privada en la memoria local de tu navegador (IndexedDB y localStorage). ¡Nadie más tiene acceso a tus escritos!" },
            { title: "📁 Gestor de Documentos", desc: "Abre la barra lateral para crear nuevos manuscritos, renombrarlos (con doble clic o con el icono de lápiz) y organizar todas tus obras." },
            { title: "✏️ Formato y Tipografía", desc: "Selecciona entre fuentes literarias (Lora, Playfair, Cinzel), cambia el tamaño, color, alineación o aplica negritas y listas a tu texto." },
            { title: "👥 Biblia del Proyecto", desc: "Crea y consulta fichas rápidas para tus personajes, lugares, lore y objetos para tenerlos siempre a mano mientras escribes tu historia." },
            { title: "📜 Esquema por Capítulos", desc: "Genera un índice inteligente de los títulos (H1, H2, H3) de tu documento para saltar rápidamente entre escenas y capítulos." },
            { title: "⏱️ Temporizador Pomodoro", desc: "Configura sesiones de tiempo libre para escribir concentrado. Al terminar sonarás un relajante timbre de cuenco tibetano." },
            { title: "📌 Notas Post-it", desc: "Despliega notas adhesivas flotantes en pantalla con colores suavemente desaturados para anotar ideas rápidas sin perder el foco." },
            { title: "🎧 Mezclador de Sonido Lo-Fi", desc: "Combina en tiempo real sonidos ambientales de lluvia, chimenea, olas del mar o barullo de café para crear tu ambiente perfecto." },
            { title: "👁️ Modo Enfoque (Zen)", desc: "Oculta todos los menús y centra la hoja de escritura en el medio exacto de la pantalla (también puedes presionar Ctrl+Shift+F)." },
            { title: "⚙️ Personalización Total", desc: "Sube tus propias imágenes de fondo (se guardarán permanentemente en tu galería), instala fuentes custom y cambia el color del papel." }
        ]
    },
    en: {
        brandTitle: "LofiNotebook",
        toggleSidebar: "Show/Hide Documents",
        newDocument: "Create New Document",
        searchDocs: "Search notes...",
        myDocs: "My Documents",
        defaultDocTitle: "My first writing project",
        defaultDocContent: "<h1>Welcome to LofiNotebook v2</h1><p>This is your cozy ambient writing space designed for large writing projects and novels. Customize your background wallpapers, play relaxing ambient audio, and keep track of your characters and lore.</p><p>Use the top toolbar to format your text, or toggle <b>Focus Mode</b> (the eye icon) to write completely distraction-free.</p>",
        fontTooltip: "Font Family",
        fontSizeTooltip: "Font Size",
        boldTooltip: "Bold (Ctrl+B)",
        italicTooltip: "Italic (Ctrl+I)",
        underlineTooltip: "Underline (Ctrl+U)",
        strikeTooltip: "Strikethrough",
        textColorTooltip: "Text Color",
        blockFormatTooltip: "Paragraph Style",
        alignLeftTooltip: "Align Left",
        alignCenterTooltip: "Align Center",
        alignRightTooltip: "Align Right",
        ulTooltip: "Bullet List",
        olTooltip: "Numbered List",
        quoteTooltip: "Blockquote",
        loreTooltip: "Character & Lore Bible",
        outlineTooltip: "Chapter Outline",
        pomoTooltip: "Pomodoro Timer",
        postitTooltip: "Sticky Notes",
        audioTooltip: "Lo-Fi Ambient Audio",
        zenTooltip: "Focus / Zen Mode (Ctrl+Shift+F)",
        discordTooltip: "Discord Server (News & Feedback)",
        emailTooltip: "Email Contact (arienproceso@gmail.com)",
        kofiTooltip: "Support on Ko-fi (Donations)",
        settingsTooltip: "Settings & Customization",
        savedStatus: "💾 Local saved",
        wordsLabel: "Words",
        charsLabel: "Characters",
        downloadBtn: "📥 Download",
        exportWord: "📘 Word Document (.doc)",
        exportTxt: "📄 Plain Text (.txt)",
        exportMd: "📝 Markdown (.md)",
        exportHtml: "🌐 Web Page (.html)",
        exportPdf: "🖨️ PDF Document / Print",
        playAudio: "▶ Play Audio",
        pauseAudio: "⏸ Pause Audio",
        rainLabel: "🌧️ Soft Rain",
        fireLabel: "🔥 Fireplace",
        wavesLabel: "🌊 Ocean Waves",
        cafeLabel: "☕ Coffee Shop",
        pomoDuration: "Duration:",
        minutes: "minutes",
        start: "▶ Start",
        pause: "⏸ Pause",
        reset: "🔄 Reset",
        outlineTitle: "📜 Chapter Outline",
        noHeadings: "No headings found in document (use H1, H2, or H3).",
        loreModalTitle: "👥 Project Bible (Characters & Lore)",
        namePlaceholder: "Name (e.g. Elena Rostova)",
        detailsPlaceholder: "Write entry details (Age, traits, backstory, secrets...)",
        cancel: "Cancel",
        saveCard: "Save Entry",
        catAll: "All",
        catChars: "Characters",
        catPlaces: "Places",
        catLore: "Lore",
        catItems: "Items",
        searchLore: "Search entry...",
        newLoreCard: "New Entry",
        noLoreCards: "No entries saved in this category yet. Click '➕' to add one.",
        settingsTitle: "⚙️ Customization",
        helpTourBtn: "❓ View Guided Tour",
        tabBg: "Ambient & Background",
        tabSheet: "Sheet & Layout",
        tabTheme: "Typography & Theme",
        uploadBgLabel: "Upload Custom Background Image (Saved automatically)",
        myUploadedBgs: "My Uploaded Backgrounds",
        defaultBgs: "Default Lo-Fi Wallpapers",
        bgBlurLabel: "Background Blur",
        bgOverlayLabel: "Darkness Filter (Overlay Opacity)",
        sheetStyleLabel: "Sheet / Canvas Style",
        pageSizeLabel: "Paper Size / Preset",
        sizeA4: "📄 Standard A4 (794 x 1123 px)",
        sizeLetter: "📄 Letter Size (816 x 1056 px)",
        sizeLegal: "📄 Legal Size (816 x 1344 px)",
        sizePoem: "📜 Poem / Poetry (Narrow 540 px)",
        pageFlowLabel: "Canvas Flow Mode",
        flowContinuous: "📜 Continuous Sheet (Expands dynamically as you write)",
        flowStatic: "📌 Static Sheet (Fixed page with strict bounds)",
        paperBgLabel: "Paper Background Color",
        spellcheckLabel: "Browser Spell Checker",
        spellcheckOn: "Enabled (Highlights spelling mistakes)",
        spellcheckOff: "Disabled",
        uploadFontLabel: "Upload Custom Font (.ttf, .otf, .woff, .woff2)",
        defaultFontLabel: "Default Reading Font",
        defaultFontSizeLabel: "Default Font Size",
        accentColorLabel: "Interface Accent Color",
        supportProjectTitle: "☕ Support LofiNotebook Development",
        supportProjectDesc: "If LofiNotebook helps you with your writing projects, you can support hosting and inspire new features with a voluntary donation on Ko-fi.",
        kofiBtnLabel: "☕ Donate on Ko-fi",
        tourSteps: [
            { title: "📖 Welcome to LofiNotebook!", desc: "LofiNotebook is a 100% Client-Side application. All your drafts, cards, custom wallpapers, and ideas are saved permanently and privately in your browser's local memory (IndexedDB & localStorage). Your writings stay completely private on your device!" },
            { title: "📁 Document Manager", desc: "Open the sidebar to create new drafts, rename them (double click or pencil icon), and organize your works." },
            { title: "✏️ Formatting & Typography", desc: "Select literary fonts (Lora, Playfair, Cinzel), change text size, colors, alignment, or apply bold and lists." },
            { title: "👥 Project Bible", desc: "Create and consult quick cards for your characters, places, lore, and items to keep them handy while writing." },
            { title: "📜 Chapter Outline", desc: "Generates an intelligent table of contents from your headings (H1, H2, H3) to jump quickly between scenes." },
            { title: "⏱️ Pomodoro Timer", desc: "Configure custom focus sessions. A gentle Tibetan bowl chime rings when time is up." },
            { title: "📌 Sticky Notes", desc: "Pop up draggable post-it notes in muted pastel colors for quick ideas without losing focus." },
            { title: "🎧 Lo-Fi Sound Mixer", desc: "Mix real-time ambient sounds of rain, fireplace, ocean waves, or coffee shop chatter for your ideal writing mood." },
            { title: "👁️ Focus Mode (Zen)", desc: "Hides all UI menus and perfectly centers your writing sheet in the screen (or press Ctrl+Shift+F)." },
            { title: "⚙️ Total Customization", desc: "Upload your own wallpapers (saved permanently in your gallery), install custom fonts, and adjust paper colors." }
        ]
    }
};

/* ==========================================================================
   2. STORAGE ENGINE (IndexedDB)
   ========================================================================== */
const DB_NAME = 'LofiNotebookDB';
const DB_VERSION = 4;
let dbInstance = null;

const Storage = {
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
                if (!db.objectStoreNames.contains('custom_bgs')) {
                    db.createObjectStore('custom_bgs', { keyPath: 'id' });
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

    async getAllDocuments() {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('documents', 'readonly');
            const store = tx.objectStore('documents');
            const req = store.getAll();
            req.onsuccess = () => {
                const docs = req.result || [];
                if (docs.length === 0) {
                    const currentLang = currentSettings.language || 'es';
                    const defaultDoc = {
                        id: 'doc_' + Date.now(),
                        title: I18N[currentLang].defaultDocTitle,
                        content: I18N[currentLang].defaultDocContent,
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

    /* --- Custom Background Gallery Operations --- */
    async getAllCustomBgs() {
        return new Promise((resolve) => {
            if (!dbInstance.objectStoreNames.contains('custom_bgs')) return resolve([]);
            const tx = dbInstance.transaction('custom_bgs', 'readonly');
            const store = tx.objectStore('custom_bgs');
            const req = store.getAll();
            req.onsuccess = () => resolve(req.result || []);
        });
    },

    async saveCustomBg(bgObj) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('custom_bgs', 'readwrite');
            const store = tx.objectStore('custom_bgs');
            store.put(bgObj);
            tx.oncomplete = () => resolve(bgObj);
        });
    },

    async deleteCustomBg(id) {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('custom_bgs', 'readwrite');
            const store = tx.objectStore('custom_bgs');
            store.delete(id);
            tx.oncomplete = () => resolve(true);
        });
    },

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

    async getSettings() {
        return new Promise((resolve) => {
            const tx = dbInstance.transaction('settings', 'readonly');
            const store = tx.objectStore('settings');
            const req = store.get('app_settings');
            req.onsuccess = () => {
                const autoLang = ((navigator.language || navigator.userLanguage || '').toLowerCase().startsWith('es')) ? 'es' : 'en';
                const defaults = {
                    key: 'app_settings',
                    language: autoLang,
                    spellcheckEnabled: true,
                    bgPreset: 'rainy_night',
                    customBgUrl: null,
                    bgBlur: 6,
                    bgOverlayOpacity: 0.55,
                    pageMode: 'mode-a4',
                    pageSize: 'size-a4',
                    pageFlow: 'flow-continuous',
                    paperBg: '#1e293b',
                    paperTextColor: '#f1f5f9',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    lineHeight: '1.7',
                    accentColor: '#8b5cf6',
                    hasSeenTour: false,
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

/* ==========================================================================
   3. SIDEBAR MANAGER
   ========================================================================== */
let activeDocumentId = null;
let onDocumentSelectCallback = null;

const Sidebar = {
    async init(onSelectCallback) {
        onDocumentSelectCallback = onSelectCallback;

        const sidebarToggle = document.getElementById('sidebar-toggle-btn');
        const sidebarPanel = document.getElementById('sidebar-panel');
        const newDocBtn = document.getElementById('new-doc-btn');
        const searchInput = document.getElementById('sidebar-search-input');

        if (sidebarToggle && sidebarPanel) {
            sidebarToggle.addEventListener('click', () => {
                sidebarPanel.classList.toggle('collapsed');
            });
        }

        if (newDocBtn) {
            newDocBtn.addEventListener('click', () => {
                Sidebar.createNewDocument();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                Sidebar.filterDocuments(e.target.value);
            });
        }

        await Sidebar.refreshDocumentList();
    },

    async refreshDocumentList() {
        const docs = await Storage.getAllDocuments();
        const docListContainer = document.getElementById('doc-list');
        if (!docListContainer) return;

        docListContainer.innerHTML = '';

        docs.forEach(doc => {
            const item = document.createElement('div');
            item.className = `doc-item ${doc.id === activeDocumentId ? 'active' : ''}`;
            item.dataset.id = doc.id;

            item.innerHTML = `
                <span class="doc-title" title="${doc.title}">${doc.title}</span>
                <div class="doc-actions">
                    <button class="icon-btn rename-btn" title="Renombrar Documento" style="width:24px;height:24px;font-size:0.75rem;">✏️</button>
                    <button class="icon-btn delete-btn" title="Eliminar Documento" style="width:24px;height:24px;font-size:0.75rem;">🗑️</button>
                </div>
            `;

            const titleEl = item.querySelector('.doc-title');
            const renameBtn = item.querySelector('.rename-btn');
            const deleteBtn = item.querySelector('.delete-btn');

            const triggerRename = async (e) => {
                e.stopPropagation();
                e.preventDefault();
                await Sidebar.renameDocument(doc.id, titleEl);
            };

            renameBtn.addEventListener('click', triggerRename);
            titleEl.addEventListener('dblclick', triggerRename);

            deleteBtn.addEventListener('click', async (e) => {
                e.stopPropagation();
                await Sidebar.deleteDocument(doc.id);
            });

            item.addEventListener('click', () => {
                Sidebar.selectDocument(doc.id);
            });

            docListContainer.appendChild(item);
        });

        if (!activeDocumentId && docs.length > 0) {
            Sidebar.selectDocument(docs[0].id);
        }
    },

    async selectDocument(docId) {
        activeDocumentId = docId;
        const doc = await Storage.getDocument(docId);
        if (!doc) return;

        document.querySelectorAll('.doc-item').forEach(el => {
            el.classList.toggle('active', el.dataset.id === docId);
        });

        if (onDocumentSelectCallback) {
            onDocumentSelectCallback(doc);
        }
    },

    async createNewDocument() {
        const lang = currentSettings.language || 'es';
        const defaultTitle = lang === 'es' ? 'Nuevo Borrador' : 'New Draft';
        const newDoc = {
            id: 'doc_' + Date.now(),
            title: defaultTitle,
            content: '<p>...</p>',
            isCustomTitle: false,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };

        await Storage.saveDocument(newDoc);
        await Sidebar.refreshDocumentList();
        Sidebar.selectDocument(newDoc.id);
    },

    async renameDocument(docId, titleElement = null) {
        const doc = await Storage.getDocument(docId);
        if (!doc) return;

        const lang = currentSettings.language || 'es';
        const promptMsg = lang === 'es' ? 'Escribe el nuevo nombre para este documento:' : 'Enter a new title for this document:';
        const currentTitle = doc.title || (lang === 'es' ? 'Nuevo Borrador' : 'New Draft');
        const newTitle = window.prompt(promptMsg, currentTitle);
        
        if (newTitle !== null && newTitle.trim() !== '') {
            const trimmed = newTitle.trim();
            doc.title = trimmed;
            doc.isCustomTitle = true;
            doc.updatedAt = Date.now();

            await Storage.saveDocument(doc);

            if (titleElement) {
                titleElement.textContent = trimmed;
                titleElement.title = trimmed;
            }

            await Sidebar.refreshDocumentList();
        }
    },

    async deleteDocument(docId) {
        const doc = await Storage.getDocument(docId);
        if (!doc) return;

        const docs = await Storage.getAllDocuments();
        const lang = currentSettings.language || 'es';
        if (docs.length <= 1) {
            alert(lang === 'es' ? 'No puedes eliminar el único documento. Crea otro primero.' : 'You cannot delete the only document. Create another one first.');
            return;
        }

        const confirmMsg = lang === 'es' ? `¿Seguro que deseas eliminar "${doc.title}"?` : `Are you sure you want to delete "${doc.title}"?`;
        if (confirm(confirmMsg)) {
            await Storage.deleteDocument(doc.id);
            if (activeDocumentId === doc.id) {
                activeDocumentId = null;
            }
            await Sidebar.refreshDocumentList();
        }
    },

    filterDocuments(query) {
        const q = query.toLowerCase().trim();
        document.querySelectorAll('.doc-item').forEach(el => {
            const title = el.querySelector('.doc-title').textContent.toLowerCase();
            el.style.display = title.includes(q) ? 'flex' : 'none';
        });
    },

    getActiveDocumentId() {
        return activeDocumentId;
    }
};

/* ==========================================================================
   DOM SANITIZER MODULE (Native XSS & Injection Prevention)
   ========================================================================== */
const Sanitizer = {
    clean(html) {
        if (!html) return '';
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 1. Remove dangerous executable script tags and embedded objects
            const dangerousTags = doc.querySelectorAll('script, iframe, object, embed, frame, frameset, form, input, button, select, textarea, link, meta, style, applet');
            dangerousTags.forEach(el => el.remove());

            // 2. Strip inline event handlers (onerror, onload, onclick, etc.) and javascript: URIs
            const allElements = doc.querySelectorAll('*');
            allElements.forEach(el => {
                Array.from(el.attributes).forEach(attr => {
                    const name = attr.name.toLowerCase();
                    const val = attr.value.toLowerCase();
                    if (name.startsWith('on') || val.includes('javascript:') || val.includes('data:text/html')) {
                        el.removeAttribute(attr.name);
                    }
                });
            });

            return doc.body.innerHTML;
        } catch (e) {
            console.error('Sanitizer Error:', e);
            return html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        }
    }
};

/* ==========================================================================
   4. RICH TEXT EDITOR ENGINE (WITH SPELLCHECKER & SANITIZER)
   ========================================================================== */
let editorElement = null;
let currentDocId = null;
let autoSaveTimeout = null;

const Editor = {
    init() {
        editorElement = document.getElementById('editor');
        if (!editorElement) return;

        // Apply Native Spellchecker
        Editor.applySpellcheck();

        // Sanitize pasted content (Prevents XSS when pasting rich text)
        editorElement.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = (e.clipboardData || window.clipboardData).getData('text/plain');
            const html = (e.clipboardData || window.clipboardData).getData('text/html');

            if (html) {
                const cleanHtml = Sanitizer.clean(html);
                document.execCommand('insertHTML', false, cleanHtml);
            } else if (text) {
                document.execCommand('insertText', false, text);
            }
        });

        editorElement.addEventListener('input', () => {
            Editor.updateMetrics();
            Editor.scheduleAutoSave();
        });

        document.addEventListener('selectionchange', () => {
            if (document.activeElement === editorElement || editorElement.contains(document.activeElement)) {
                Editor.updateToolbarState();
            }
        });

        // Instant save listeners on window unload, tab hide, or editor blur
        window.addEventListener('beforeunload', () => Editor.saveImmediately());
        window.addEventListener('pagehide', () => Editor.saveImmediately());
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') Editor.saveImmediately();
        });
        editorElement.addEventListener('blur', () => Editor.saveImmediately());

        const imageInput = document.getElementById('editor-image-input');
        if (imageInput) {
            imageInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                    Editor.executeFormat('insertImage', evt.target.result);
                };
                reader.readAsDataURL(file);
                imageInput.value = '';
            });
        }
    },

    applySpellcheck() {
        if (!editorElement) return;
        const isEnabled = currentSettings.spellcheckEnabled !== false;
        const lang = currentSettings.language || 'es';

        editorElement.spellcheck = isEnabled;
        editorElement.setAttribute('spellcheck', isEnabled ? 'true' : 'false');
        editorElement.setAttribute('lang', lang);
    },

    loadDocument(doc) {
        currentDocId = doc.id;
        if (editorElement) {
            // Check if there is an instant localStorage backup
            let contentToLoad = doc.content || '';
            try {
                const backup = localStorage.getItem('lofinotebook_backup_' + doc.id);
                if (backup && backup.length > contentToLoad.length) {
                    contentToLoad = backup;
                }
            } catch (e) {}

            editorElement.innerHTML = Sanitizer.clean(contentToLoad);
        }
        Editor.updateMetrics();
    },

    executeFormat(cmd, value = null) {
        if (!editorElement) return;
        editorElement.focus();
        document.execCommand(cmd, false, value);
        Editor.updateToolbarState();
        Editor.scheduleAutoSave();
    },

    toggleQuote() {
        if (!editorElement) return;
        editorElement.focus();

        const sel = window.getSelection();
        let isInsideQuote = false;

        if (sel && sel.rangeCount > 0) {
            let node = sel.getRangeAt(0).commonAncestorContainer;
            while (node && node !== editorElement) {
                if (node.nodeName === 'BLOCKQUOTE') {
                    isInsideQuote = true;
                    break;
                }
                node = node.parentNode;
            }
        }

        if (isInsideQuote) {
            // Exit blockquote: revert block back to standard paragraph <p>
            document.execCommand('formatBlock', false, 'p');
        } else {
            // Enter blockquote: turn current or new block into blockquote
            document.execCommand('formatBlock', false, 'blockquote');
        }

        Editor.updateToolbarState();
        Editor.scheduleAutoSave();
    },

    updateToolbarState() {
        const toggleBtnState = (cmd, btnId) => {
            const btn = document.getElementById(btnId);
            if (btn) {
                try {
                    if (document.queryCommandState(cmd)) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                } catch (e) {
                    btn.classList.remove('active');
                }
            }
        };

        toggleBtnState('bold', 'btn-bold');
        toggleBtnState('italic', 'btn-italic');
        toggleBtnState('underline', 'btn-underline');
        toggleBtnState('strikeThrough', 'btn-strike');
        toggleBtnState('insertUnorderedList', 'btn-ul');
        toggleBtnState('insertOrderedList', 'btn-ol');

        // Check if cursor is inside BLOCKQUOTE
        const quoteBtn = document.getElementById('btn-quote');
        if (quoteBtn) {
            const sel = window.getSelection();
            let isInsideQuote = false;
            if (sel && sel.rangeCount > 0) {
                let node = sel.getRangeAt(0).commonAncestorContainer;
                while (node && node !== editorElement) {
                    if (node.nodeName === 'BLOCKQUOTE') {
                        isInsideQuote = true;
                        break;
                    }
                    node = node.parentNode;
                }
            }
            if (isInsideQuote) {
                quoteBtn.classList.add('active');
            } else {
                quoteBtn.classList.remove('active');
            }
        }
    },

    saveImmediately() {
        if (autoSaveTimeout) {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = null;
        }
        if (!currentDocId || !editorElement) return;

        const content = editorElement.innerHTML;

        // Instant synchronous localStorage backup (fail-safe for immediate browser exit)
        try {
            localStorage.setItem('lofinotebook_active_doc_id', currentDocId);
            localStorage.setItem('lofinotebook_backup_' + currentDocId, content);
        } catch (e) {}

        // Save to IndexedDB
        Storage.getDocument(currentDocId).then(doc => {
            if (doc) {
                doc.content = content;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = doc.content;
                const text = tempDiv.textContent.trim();
                if (text && !doc.isCustomTitle && (doc.title === 'Nuevo Borrador' || doc.title === 'New Draft')) {
                    const firstWords = text.split(/\s+/).slice(0, 5).join(' ');
                    doc.title = firstWords.substring(0, 30);
                }
                Storage.saveDocument(doc);
            }
        });
    },

    scheduleAutoSave() {
        if (autoSaveTimeout) clearTimeout(autoSaveTimeout);

        // Instant synchronous backup on keystroke
        try {
            if (currentDocId && editorElement) {
                localStorage.setItem('lofinotebook_active_doc_id', currentDocId);
                localStorage.setItem('lofinotebook_backup_' + currentDocId, editorElement.innerHTML);
            }
        } catch (e) {}

        autoSaveTimeout = setTimeout(() => {
            Editor.saveImmediately();
            Sidebar.refreshDocumentList();
        }, 400);
    },

    updateMetrics() {
        if (!editorElement) return;
        const text = editorElement.textContent || '';
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        const chars = text.length;

        const wordCountEl = document.getElementById('word-count-val');
        const charCountEl = document.getElementById('char-count-val');

        if (wordCountEl) wordCountEl.textContent = words.toLocaleString();
        if (charCountEl) charCountEl.textContent = chars.toLocaleString();
    },

    getContent() {
        return editorElement ? editorElement.innerHTML : '';
    },

    getTextContent() {
        return editorElement ? editorElement.textContent : '';
    }
};

/* ==========================================================================
   5. FLOATING POST-IT STICKY NOTES
   ========================================================================== */
let postits = [];

const Postits = {
    async init() {
        const addPostitBtn = document.getElementById('add-postit-btn');
        if (addPostitBtn) {
            addPostitBtn.addEventListener('click', () => {
                Postits.createPostit();
            });
        }

        await Postits.loadPostits();
    },

    async loadPostits() {
        postits = await Storage.getAllPostits();
        const container = document.getElementById('postits-wrapper');
        if (!container) return;
        container.innerHTML = '';

        postits.forEach(data => {
            Postits.renderPostit(data);
        });
    },

    async createPostit() {
        const newPostit = {
            id: 'postit_' + Date.now(),
            text: '',
            color: 'yellow',
            minimized: false,
            x: 100 + (postits.length * 25) % 300,
            y: 120 + (postits.length * 25) % 200
        };

        postits.push(newPostit);
        await Storage.savePostit(newPostit);
        Postits.renderPostit(newPostit);
    },

    renderPostit(data) {
        const wrapper = document.getElementById('postits-wrapper');
        if (!wrapper) return;

        const el = document.createElement('div');
        el.className = `postit-container postit-${data.color} ${data.minimized ? 'minimized' : ''}`;
        el.id = data.id;
        el.style.left = `${data.x}px`;
        el.style.top = `${data.y}px`;

        el.innerHTML = `
            <div class="postit-header" id="${data.id}-header">
                <div class="postit-colors">
                    <span class="postit-color-dot" data-color="yellow" style="background:#d8c8b0;"></span>
                    <span class="postit-color-dot" data-color="pink" style="background:#cfa5ad;"></span>
                    <span class="postit-color-dot" data-color="green" style="background:#a9bfa8;"></span>
                    <span class="postit-color-dot" data-color="blue" style="background:#a4b8c9;"></span>
                    <span class="postit-color-dot" data-color="purple" style="background:#bfa4c9;"></span>
                </div>
                <div class="postit-btn-group">
                    <button class="minimize-postit-btn" title="Minimizar / Expandir">${data.minimized ? '➕' : '➖'}</button>
                    <button class="delete-postit-btn" title="Eliminar Nota">🗑️</button>
                </div>
            </div>
            <div class="postit-body">
                <textarea class="postit-textarea" placeholder="...">${data.text || ''}</textarea>
            </div>
        `;

        el.querySelectorAll('.postit-color-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const color = dot.dataset.color;
                el.className = `postit-container postit-${color} ${data.minimized ? 'minimized' : ''}`;
                data.color = color;
                Storage.savePostit(data);
            });
        });

        const minBtn = el.querySelector('.minimize-postit-btn');
        minBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            data.minimized = !data.minimized;
            el.classList.toggle('minimized', data.minimized);
            minBtn.textContent = data.minimized ? '➕' : '➖';
            Storage.savePostit(data);
        });

        el.querySelector('.delete-postit-btn').addEventListener('click', async (e) => {
            e.stopPropagation();
            const lang = currentSettings.language || 'es';
            const confirmMsg = lang === 'es' ? '¿Seguro que deseas eliminar esta nota Post-it?' : 'Delete this post-it note?';
            if (confirm(confirmMsg)) {
                el.remove();
                postits = postits.filter(p => p.id !== data.id);
                await Storage.deletePostit(data.id);
            }
        });

        const textarea = el.querySelector('.postit-textarea');
        let textSaveTimeout = null;
        textarea.addEventListener('input', () => {
            if (textSaveTimeout) clearTimeout(textSaveTimeout);
            textSaveTimeout = setTimeout(() => {
                data.text = textarea.value;
                Storage.savePostit(data);
            }, 300);
        });

        Postits.makeDraggable(el, el.querySelector('.postit-header'), data);
        wrapper.appendChild(el);
    },

    makeDraggable(element, dragHandle, data) {
        let posX = 0, posY = 0, initialX = 0, initialY = 0;
        dragHandle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            if (e.target.closest('.postit-btn-group') || e.target.closest('.postit-color-dot')) return;
            e.preventDefault();
            initialX = e.clientX;
            initialY = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            posX = initialX - e.clientX;
            posY = initialY - e.clientY;
            initialX = e.clientX;
            initialY = e.clientY;

            const newTop = element.offsetTop - posY;
            const newLeft = element.offsetLeft - posX;
            element.style.top = `${newTop}px`;
            element.style.left = `${newLeft}px`;
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            data.x = element.offsetLeft;
            data.y = element.offsetTop;
            Storage.savePostit(data);
        }
    }
};

/* ==========================================================================
   6. WEB AUDIO AMBIENT SOUND MIXER
   ========================================================================== */
let audioCtx = null;
let masterGain = null;
let isAudioPlaying = false;

const audioChannels = {
    rain: { gain: null, volume: 0, interval: null },
    fire: { gain: null, volume: 0, interval: null },
    waves: { gain: null, volume: 0 },
    cafe: { gain: null, volume: 0, interval: null, steamInterval: null }
};

const AudioSynth = {
    init() {
        const toggleBtn = document.getElementById('audio-toggle-btn');
        const panel = document.getElementById('audio-panel');
        const playBtn = document.getElementById('audio-play-master-btn');

        if (toggleBtn && panel) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                panel.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (panel.classList.contains('open') && !panel.contains(e.target) && !toggleBtn.contains(e.target)) {
                    panel.classList.remove('open');
                }
            });
        }

        if (playBtn) {
            playBtn.addEventListener('click', () => {
                AudioSynth.toggleMasterPlay();
            });
        }

        const setupSlider = (id, channelName) => {
            const slider = document.getElementById(id);
            if (slider) {
                slider.addEventListener('input', (e) => {
                    const vol = parseFloat(e.target.value);
                    audioChannels[channelName].volume = vol;
                    if (audioChannels[channelName].gain && audioCtx) {
                        audioChannels[channelName].gain.gain.setValueAtTime(vol, audioCtx.currentTime);
                    }
                    if (vol > 0 && !isAudioPlaying) {
                        AudioSynth.startAudio();
                    }
                });
            }
        };

        setupSlider('vol-rain', 'rain');
        setupSlider('vol-fire', 'fire');
        setupSlider('vol-waves', 'waves');
        setupSlider('vol-cafe', 'cafe');
    },

    ensureContext() {
        if (!audioCtx) {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContextClass();
            masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.7, audioCtx.currentTime);
            masterGain.connect(audioCtx.destination);
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
    },

    toggleMasterPlay() {
        if (isAudioPlaying) {
            AudioSynth.stopAudio();
        } else {
            AudioSynth.startAudio();
        }
    },

    startAudio() {
        AudioSynth.ensureContext();
        if (isAudioPlaying) return;

        AudioSynth.createRainNode();
        AudioSynth.createFireNode();
        AudioSynth.createWavesNode();
        AudioSynth.createCafeNode();

        isAudioPlaying = true;
        const playBtn = document.getElementById('audio-play-master-btn');
        const lang = currentSettings.language || 'es';
        if (playBtn) playBtn.textContent = I18N[lang].pauseAudio;
    },

    stopAudio() {
        if (!isAudioPlaying || !audioCtx) return;
        audioCtx.suspend();
        isAudioPlaying = false;
        if (audioChannels.rain.interval) clearInterval(audioChannels.rain.interval);
        if (audioChannels.fire.interval) clearInterval(audioChannels.fire.interval);
        if (audioChannels.cafe.interval) clearInterval(audioChannels.cafe.interval);
        if (audioChannels.cafe.steamInterval) clearInterval(audioChannels.cafe.steamInterval);

        const playBtn = document.getElementById('audio-play-master-btn');
        const lang = currentSettings.language || 'es';
        if (playBtn) playBtn.textContent = I18N[lang].playAudio;
    },

    createRainNode() {
        const bufferSize = 2 * audioCtx.sampleRate;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = (Math.random() * 2 - 1) * 0.1;
        }

        const rainSource = audioCtx.createBufferSource();
        rainSource.buffer = buffer;
        rainSource.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 1200;

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = audioChannels.rain.volume;

        rainSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);
        rainSource.start();

        audioChannels.rain.interval = setInterval(() => {
            if (audioChannels.rain.volume > 0 && isAudioPlaying) {
                const osc = audioCtx.createOscillator();
                const dropGain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1500 + Math.random() * 2000, audioCtx.currentTime);
                dropGain.gain.setValueAtTime(audioChannels.rain.volume * 0.05, audioCtx.currentTime);
                dropGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

                osc.connect(dropGain);
                dropGain.connect(masterGain);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.05);
            }
        }, 150);

        audioChannels.rain.gain = gainNode;
    },

    createFireNode() {
        const bufferSize = audioCtx.sampleRate * 2;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = data[i];
            data[i] *= 0.8;
        }

        const fireSource = audioCtx.createBufferSource();
        fireSource.buffer = buffer;
        fireSource.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 350;

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = audioChannels.fire.volume;

        fireSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);
        fireSource.start();

        audioChannels.fire.interval = setInterval(() => {
            if (audioChannels.fire.volume > 0 && isAudioPlaying && Math.random() < 0.6) {
                const popLen = audioCtx.sampleRate * 0.008;
                const popBuffer = audioCtx.createBuffer(1, popLen, audioCtx.sampleRate);
                const popData = popBuffer.getChannelData(0);
                for (let i = 0; i < popLen; i++) {
                    popData[i] = (Math.random() * 2 - 1) * (1 - i / popLen);
                }
                const popSource = audioCtx.createBufferSource();
                popSource.buffer = popBuffer;

                const popGain = audioCtx.createGain();
                popGain.gain.value = audioChannels.fire.volume * (0.1 + Math.random() * 0.3);

                popSource.connect(popGain);
                popGain.connect(masterGain);
                popSource.start();
            }
        }, 120);

        audioChannels.fire.gain = gainNode;
    },

    createWavesNode() {
        const bufferSize = audioCtx.sampleRate * 4;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        const waveSource = audioCtx.createBufferSource();
        waveSource.buffer = buffer;
        waveSource.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 300;

        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.08;

        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 450;

        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);
        lfo.start();

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = audioChannels.waves.volume;

        waveSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);
        waveSource.start();

        audioChannels.waves.gain = gainNode;
    },

    createCafeNode() {
        const bufferSize = audioCtx.sampleRate * 3;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (last + (0.015 * white)) / 1.015;
            last = data[i];
        }

        const cafeSource = audioCtx.createBufferSource();
        cafeSource.buffer = buffer;
        cafeSource.loop = true;

        const f1 = audioCtx.createBiquadFilter();
        f1.type = 'bandpass';
        f1.frequency.value = 320;
        f1.Q.value = 1.2;

        const f2 = audioCtx.createBiquadFilter();
        f2.type = 'bandpass';
        f2.frequency.value = 750;
        f2.Q.value = 1.5;

        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.25;
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 60;
        lfo.connect(lfoGain);
        lfoGain.connect(f1.frequency);
        lfo.start();

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = audioChannels.cafe.volume;

        cafeSource.connect(f1);
        f1.connect(f2);
        f2.connect(gainNode);
        gainNode.connect(masterGain);
        cafeSource.start();

        audioChannels.cafe.interval = setInterval(() => {
            if (audioChannels.cafe.volume > 0 && isAudioPlaying && Math.random() < 0.5) {
                const osc = audioCtx.createOscillator();
                const tinkGain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(2400 + Math.random() * 1200, audioCtx.currentTime);
                tinkGain.gain.setValueAtTime(audioChannels.cafe.volume * 0.08, audioCtx.currentTime);
                tinkGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

                osc.connect(tinkGain);
                tinkGain.connect(masterGain);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.16);
            }
        }, 1200);

        audioChannels.cafe.steamInterval = setInterval(() => {
            if (audioChannels.cafe.volume > 0 && isAudioPlaying && Math.random() < 0.3) {
                const dur = 1.2 + Math.random() * 0.8;
                const hissLen = audioCtx.sampleRate * dur;
                const hissBuffer = audioCtx.createBuffer(1, hissLen, audioCtx.sampleRate);
                const hissData = hissBuffer.getChannelData(0);
                for (let i = 0; i < hissLen; i++) {
                    hissData[i] = (Math.random() * 2 - 1) * 0.1;
                }

                const hissSource = audioCtx.createBufferSource();
                hissSource.buffer = hissBuffer;

                const hFilter = audioCtx.createBiquadFilter();
                hFilter.type = 'bandpass';
                hFilter.frequency.value = 2800;
                hFilter.Q.value = 1.0;

                const hGain = audioCtx.createGain();
                hGain.gain.setValueAtTime(0, audioCtx.currentTime);
                hGain.gain.linearRampToValueAtTime(audioChannels.cafe.volume * 0.07, audioCtx.currentTime + 0.2);
                hGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + dur);

                hissSource.connect(hFilter);
                hFilter.connect(hGain);
                hGain.connect(masterGain);
                hissSource.start();
            }
        }, 6000);

        audioChannels.cafe.gain = gainNode;
    }
};

/* ==========================================================================
   7. SETTINGS & CUSTOMIZATION CONTROLLER
   ========================================================================== */
const PRESET_WALLPAPERS = {
    rainy_night: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80")',
    cozy_room: 'url("https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80")',
    starry_sky: 'url("https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80")',
    pixel_sunset: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80")',
    lofi_forest: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80")',
    minimal_dark: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'
};

let currentSettings = {};

const Settings = {
    async init() {
        currentSettings = await Storage.getSettings();
        await Settings.loadCustomFonts();
        await Settings.loadCustomBgGallery();

        const modalBackdrop = document.getElementById('settings-modal');
        const openBtn = document.getElementById('open-settings-btn');
        const closeBtn = document.getElementById('close-settings-btn');
        const replayTourBtn = document.getElementById('replay-tour-btn');

        if (openBtn && modalBackdrop) {
            openBtn.addEventListener('click', () => {
                modalBackdrop.classList.add('open');
            });
        }

        if (closeBtn && modalBackdrop) {
            closeBtn.addEventListener('click', () => {
                modalBackdrop.classList.remove('open');
            });
        }

        if (replayTourBtn && modalBackdrop) {
            replayTourBtn.addEventListener('click', () => {
                modalBackdrop.classList.remove('open');
                Tour.startTour();
            });
        }

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) {
                    modalBackdrop.classList.remove('open');
                }
            });
        }

        document.querySelectorAll('.modal-tabs .tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.modal-tabs .tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                btn.classList.add('active');
                const targetTab = document.getElementById(btn.dataset.tab);
                if (targetTab) targetTab.classList.add('active');
            });
        });

        Settings.bindInputs();
        Settings.applySettings(currentSettings);
    },

    async loadCustomBgGallery() {
        const customBgs = await Storage.getAllCustomBgs();
        const galleryContainer = document.getElementById('custom-bg-gallery');
        if (!galleryContainer) return;

        galleryContainer.innerHTML = '';
        if (customBgs.length === 0) return;

        customBgs.forEach(bg => {
            const card = document.createElement('div');
            card.className = `preset-card ${currentSettings.customBgUrl === `url("${bg.dataUrl}")` ? 'active' : ''}`;
            card.style.backgroundImage = `url("${bg.dataUrl}")`;
            card.innerHTML = `<span class="preset-title">${bg.name}</span><button class="delete-bg-btn" style="position:absolute; top:4px; right:4px; background:rgba(0,0,0,0.6); border:none; color:white; border-radius:4px; padding:2px 4px; font-size:0.65rem; cursor:pointer;" title="Eliminar fondo">🗑️</button>`;

            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('delete-bg-btn')) return;
                document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                currentSettings.customBgUrl = `url("${bg.dataUrl}")`;
                Settings.saveAndApply();
            });

            card.querySelector('.delete-bg-btn').addEventListener('click', async (e) => {
                e.stopPropagation();
                const lang = currentSettings.language || 'es';
                const confirmMsg = lang === 'es' ? `¿Eliminar fondo "${bg.name}"?` : `Delete background "${bg.name}"?`;
                if (confirm(confirmMsg)) {
                    await Storage.deleteCustomBg(bg.id);
                    if (currentSettings.customBgUrl === `url("${bg.dataUrl}")`) {
                        currentSettings.customBgUrl = null;
                        currentSettings.bgPreset = 'rainy_night';
                    }
                    await Settings.loadCustomBgGallery();
                    Settings.saveAndApply();
                }
            });

            galleryContainer.appendChild(card);
        });
    },

    async loadCustomFonts() {
        const fonts = await Storage.getAllCustomFonts();
        const customStyleEl = document.getElementById('custom-fonts-style');
        const toolbarGroup = document.getElementById('toolbar-custom-fonts-group');
        const settingsGroup = document.getElementById('settings-custom-fonts-group');

        if (toolbarGroup) toolbarGroup.innerHTML = '';
        if (settingsGroup) settingsGroup.innerHTML = '';
        if (customStyleEl) customStyleEl.innerHTML = '';

        fonts.forEach(font => {
            const fontRule = `@font-face { font-family: '${font.name}'; src: url('${font.dataUrl}'); }\n`;
            if (customStyleEl) customStyleEl.innerHTML += fontRule;

            if (toolbarGroup) {
                const opt = document.createElement('option');
                opt.value = font.name;
                opt.textContent = `${font.name} (Custom)`;
                toolbarGroup.appendChild(opt);
            }
            if (settingsGroup) {
                const opt = document.createElement('option');
                opt.value = `'${font.name}', sans-serif`;
                opt.textContent = `${font.name} (Custom)`;
                settingsGroup.appendChild(opt);
            }
        });
    },

    bindInputs() {
        document.querySelectorAll('.preset-card[data-preset]').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                currentSettings.bgPreset = card.dataset.preset;
                currentSettings.customBgUrl = null;
                Settings.saveAndApply();
            });
        });

        const bgUploadInput = document.getElementById('custom-bg-input');
        if (bgUploadInput) {
            bgUploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = async (evt) => {
                    const bgDataUrl = evt.target.result;
                    const bgObj = {
                        id: 'bg_' + Date.now(),
                        name: file.name.substring(0, 15),
                        dataUrl: bgDataUrl,
                        createdAt: Date.now()
                    };
                    await Storage.saveCustomBg(bgObj);
                    currentSettings.customBgUrl = `url("${bgDataUrl}")`;
                    await Settings.loadCustomBgGallery();
                    Settings.saveAndApply();
                };
                reader.readAsDataURL(file);
            });
        }

        const fontUploadInput = document.getElementById('custom-font-input');
        if (fontUploadInput) {
            fontUploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const fontName = file.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9]/g, '_');
                const reader = new FileReader();
                reader.onload = async (evt) => {
                    await Storage.saveCustomFont({
                        name: fontName,
                        dataUrl: evt.target.result
                    });
                    await Settings.loadCustomFonts();
                    currentSettings.fontFamily = `'${fontName}', sans-serif`;
                    Settings.saveAndApply();
                };
                reader.readAsDataURL(file);
            });
        }

        const blurSlider = document.getElementById('setting-blur');
        if (blurSlider) {
            blurSlider.value = currentSettings.bgBlur;
            blurSlider.addEventListener('input', (e) => {
                currentSettings.bgBlur = parseInt(e.target.value);
                Settings.saveAndApply();
            });
        }

        const overlaySlider = document.getElementById('setting-overlay');
        if (overlaySlider) {
            overlaySlider.value = currentSettings.bgOverlayOpacity * 100;
            overlaySlider.addEventListener('input', (e) => {
                currentSettings.bgOverlayOpacity = parseFloat(e.target.value) / 100;
                Settings.saveAndApply();
            });
        }

        const pageSizeSelect = document.getElementById('setting-page-size');
        if (pageSizeSelect) {
            pageSizeSelect.value = currentSettings.pageSize || 'size-a4';
            pageSizeSelect.addEventListener('change', (e) => {
                currentSettings.pageSize = e.target.value;
                Settings.saveAndApply();
            });
        }

        const pageFlowSelect = document.getElementById('setting-page-flow');
        if (pageFlowSelect) {
            pageFlowSelect.value = currentSettings.pageFlow || 'flow-continuous';
            pageFlowSelect.addEventListener('change', (e) => {
                currentSettings.pageFlow = e.target.value;
                Settings.saveAndApply();
            });
        }

        const paperBgSelect = document.getElementById('setting-paper-bg');
        if (paperBgSelect) {
            paperBgSelect.value = currentSettings.paperBg;
            paperBgSelect.addEventListener('change', (e) => {
                currentSettings.paperBg = e.target.value;
                if (e.target.value === '#ffffff' || e.target.value === '#fef3c7') {
                    currentSettings.paperTextColor = '#1e293b';
                } else if (e.target.value === '#1e293b' || e.target.value === '#0f172a') {
                    currentSettings.paperTextColor = '#f1f5f9';
                }
                Settings.saveAndApply();
            });
        }

        const spellcheckSelect = document.getElementById('setting-spellcheck');
        if (spellcheckSelect) {
            spellcheckSelect.value = currentSettings.spellcheckEnabled !== false ? 'true' : 'false';
            spellcheckSelect.addEventListener('change', (e) => {
                currentSettings.spellcheckEnabled = e.target.value === 'true';
                Settings.saveAndApply();
            });
        }

        const fontFamilySelect = document.getElementById('setting-font-family');
        if (fontFamilySelect) {
            fontFamilySelect.value = currentSettings.fontFamily;
            fontFamilySelect.addEventListener('change', (e) => {
                currentSettings.fontFamily = e.target.value;
                Settings.saveAndApply();
            });
        }

        const fontSizeSelect = document.getElementById('setting-font-size');
        if (fontSizeSelect) {
            fontSizeSelect.value = currentSettings.fontSize;
            fontSizeSelect.addEventListener('change', (e) => {
                currentSettings.fontSize = e.target.value;
                Settings.saveAndApply();
            });
        }

        const accentColorInput = document.getElementById('setting-accent-color');
        if (accentColorInput) {
            accentColorInput.value = currentSettings.accentColor;
            accentColorInput.addEventListener('change', (e) => {
                currentSettings.accentColor = e.target.value;
                Settings.saveAndApply();
            });
        }
    },

    async saveAndApply() {
        await Storage.saveSettings(currentSettings);
        Settings.applySettings(currentSettings);
    },

    applySettings(s) {
        const root = document.documentElement;

        const bgUrl = s.customBgUrl || PRESET_WALLPAPERS[s.bgPreset] || PRESET_WALLPAPERS.rainy_night;
        root.style.setProperty('--bg-image-url', bgUrl);
        root.style.setProperty('--bg-blur', `${s.bgBlur}px`);
        root.style.setProperty('--bg-overlay-opacity', s.bgOverlayOpacity);

        root.style.setProperty('--sheet-bg', s.paperBg);
        root.style.setProperty('--sheet-text-color', s.paperTextColor || '#f1f5f9');
        root.style.setProperty('--sheet-font-family', s.fontFamily);
        root.style.setProperty('--sheet-font-size', s.fontSize);

        root.style.setProperty('--primary-accent', s.accentColor);

        const pageSheet = document.getElementById('editor');
        if (pageSheet) {
            const pageSize = s.pageSize || 'size-a4';
            const pageFlow = s.pageFlow || 'flow-continuous';
            pageSheet.className = `page-sheet ${pageSize} ${pageFlow}`;
        }

        // Apply Spellcheck State
        Editor.applySpellcheck();

        // Update UI Translations
        I18nManager.applyTranslations(s.language || 'es');
    }
};

/* ==========================================================================
   8. I18N MANAGER LOGIC
   ========================================================================== */
const I18nManager = {
    init() {
        const langToggleBtn = document.getElementById('lang-toggle-btn');
        if (langToggleBtn) {
            langToggleBtn.addEventListener('click', async () => {
                const current = currentSettings.language || 'es';
                const nextLang = current === 'es' ? 'en' : 'es';
                currentSettings.language = nextLang;
                await Settings.saveAndApply();
            });
        }
    },

    applyTranslations(lang) {
        const t = I18N[lang] || I18N.es;
        document.documentElement.lang = lang;

        // Language toggle button text
        const langBtn = document.getElementById('lang-toggle-btn');
        if (langBtn) {
            langBtn.textContent = lang === 'es' ? '🌐 ES' : '🌐 EN';
            langBtn.title = lang === 'es' ? 'Cambiar a Inglés' : 'Switch to Spanish';
        }

        // Translate data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) el.textContent = t[key];
        });

        // Translate data-i18n-title
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            if (t[key]) el.title = t[key];
        });

        // Translate data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (t[key]) el.placeholder = t[key];
        });

        // Audio play button state
        const audioPlayBtn = document.getElementById('audio-play-master-btn');
        if (audioPlayBtn) {
            audioPlayBtn.textContent = isAudioPlaying ? t.pauseAudio : t.playAudio;
        }

        // Pomodoro timer buttons
        const pomoStartBtn = document.getElementById('pomo-start-btn');
        if (pomoStartBtn) {
            pomoStartBtn.textContent = isPomoRunning ? t.pause : t.start;
        }
    }
};

/* ==========================================================================
   9. DOCUMENT EXPORT ENGINE
   ========================================================================== */
const Export = {
    init() {
        const dropdownBtn = document.getElementById('export-dropdown-btn');
        const dropdownMenu = document.getElementById('export-dropdown-menu');

        const docBtn = document.getElementById('export-doc-btn');
        const txtBtn = document.getElementById('export-txt-btn');
        const mdBtn = document.getElementById('export-md-btn');
        const htmlBtn = document.getElementById('export-html-btn');
        const pdfBtn = document.getElementById('export-pdf-btn');

        if (dropdownBtn && dropdownMenu) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (!dropdownMenu.contains(e.target) && e.target !== dropdownBtn) {
                    dropdownMenu.classList.remove('open');
                }
            });
        }

        if (docBtn) docBtn.addEventListener('click', () => { Export.exportDoc(); dropdownMenu.classList.remove('open'); });
        if (txtBtn) txtBtn.addEventListener('click', () => { Export.exportTxt(); dropdownMenu.classList.remove('open'); });
        if (mdBtn) mdBtn.addEventListener('click', () => { Export.exportMarkdown(); dropdownMenu.classList.remove('open'); });
        if (htmlBtn) htmlBtn.addEventListener('click', () => { Export.exportHtml(); dropdownMenu.classList.remove('open'); });
        if (pdfBtn) pdfBtn.addEventListener('click', () => { Export.exportPdf(); dropdownMenu.classList.remove('open'); });
    },

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    exportDoc() {
        const content = Editor.getContent();
        const wordDocument = `<html xmlns:o='urn:schemas-microsoft-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>Manuscript - LofiNotebook</title>
            <style>
                body { font-family: 'Calibri', 'Arial', sans-serif; font-size: 11pt; line-height: 1.5; color: #000; }
                h1 { font-size: 22pt; font-weight: bold; margin-bottom: 12pt; }
                h2 { font-size: 16pt; font-weight: bold; margin-top: 14pt; margin-bottom: 8pt; }
                h3 { font-size: 13pt; font-weight: bold; margin-top: 12pt; margin-bottom: 6pt; }
                p { margin-bottom: 10pt; }
                blockquote { border-left: 3px solid #888; padding-left: 10pt; color: #555; margin: 10pt 0; }
                img { max-width: 100%; height: auto; }
            </style>
        </head>
        <body>
            ${content}
        </body>
        </html>`;

        Export.downloadFile(wordDocument, 'manuscript.doc', 'application/msword');
    },

    exportTxt() {
        const text = Editor.getTextContent();
        Export.downloadFile(text, 'manuscript.txt', 'text/plain;charset=utf-8');
    },

    exportMarkdown() {
        let html = Editor.getContent();
        let md = html
            .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n\n')
            .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n\n')
            .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n\n')
            .replace(/<b>(.*?)<\/b>/gi, '**$1**')
            .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
            .replace(/<i>(.*?)<\/i>/gi, '*$1*')
            .replace(/<em>(.*?)<\/em>/gi, '*$1*')
            .replace(/<u>(.*?)<\/u>/gi, '_$1_')
            .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
            .replace(/<br\s*[\/]?>/gi, '\n')
            .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
            .replace(/<[^>]+>/g, '');

        Export.downloadFile(md.trim(), 'manuscript.md', 'text/markdown;charset=utf-8');
    },

    exportHtml() {
        const content = Editor.getContent();
        const fullHtml = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Manuscript - LofiNotebook</title>
    <style>
        body { font-family: sans-serif; line-height: 1.6; max-width: 800px; margin: 40px auto; padding: 20px; }
        img { max-width: 100%; height: auto; }
    </style>
</head>
<body>
${content}
</body>
</html>`;
        Export.downloadFile(fullHtml, 'manuscript.html', 'text/html;charset=utf-8');
    },

    exportPdf() {
        window.print();
    }
};

/* ==========================================================================
   10. POMODORO TIMER MODULE
   ========================================================================== */
let pomoTimerInterval = null;
let pomoRemainingSeconds = 25 * 60;
let isPomoRunning = false;

const Pomodoro = {
    init() {
        const toggleBtn = document.getElementById('pomodoro-toggle-btn');
        const panel = document.getElementById('pomodoro-panel');
        const startBtn = document.getElementById('pomo-start-btn');
        const resetBtn = document.getElementById('pomo-reset-btn');
        const customMinsInput = document.getElementById('pomo-custom-mins');

        if (toggleBtn && panel) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                panel.classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (panel.classList.contains('open') && !panel.contains(e.target) && !toggleBtn.contains(e.target)) {
                    panel.classList.remove('open');
                }
            });
        }

        if (startBtn) {
            startBtn.addEventListener('click', () => {
                if (isPomoRunning) {
                    Pomodoro.pause();
                } else {
                    Pomodoro.start();
                }
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                Pomodoro.reset();
            });
        }

        if (customMinsInput) {
            customMinsInput.addEventListener('change', (e) => {
                let mins = parseInt(e.target.value);
                if (isNaN(mins) || mins < 1) mins = 1;
                if (mins > 180) mins = 180;
                customMinsInput.value = mins;
                if (!isPomoRunning) {
                    pomoRemainingSeconds = mins * 60;
                    Pomodoro.updateDisplay();
                }
            });
        }

        Pomodoro.updateDisplay();
    },

    start() {
        if (isPomoRunning) return;
        isPomoRunning = true;
        const startBtn = document.getElementById('pomo-start-btn');
        const lang = currentSettings.language || 'es';
        if (startBtn) startBtn.textContent = I18N[lang].pause;

        pomoTimerInterval = setInterval(() => {
            pomoRemainingSeconds--;
            Pomodoro.updateDisplay();

            if (pomoRemainingSeconds <= 0) {
                Pomodoro.onTimerFinished();
            }
        }, 1000);
    },

    pause() {
        isPomoRunning = false;
        if (pomoTimerInterval) clearInterval(pomoTimerInterval);
        const startBtn = document.getElementById('pomo-start-btn');
        const lang = currentSettings.language || 'es';
        if (startBtn) startBtn.textContent = I18N[lang].start;
    },

    reset() {
        Pomodoro.pause();
        const customMinsInput = document.getElementById('pomo-custom-mins');
        const mins = customMinsInput ? parseInt(customMinsInput.value) || 25 : 25;
        pomoRemainingSeconds = mins * 60;
        Pomodoro.updateDisplay();
    },

    onTimerFinished() {
        Pomodoro.pause();
        Pomodoro.playTibetanBowlSound();
        const lang = currentSettings.language || 'es';
        alert(lang === 'es' ? '⏰ ¡Sesión de tiempo completada!' : '⏰ Focus session completed!');
    },

    updateDisplay() {
        const mins = Math.floor(pomoRemainingSeconds / 60);
        const secs = pomoRemainingSeconds % 60;
        const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

        const timerTextEl = document.getElementById('pomo-timer-display');
        const headerBadgeEl = document.getElementById('pomo-header-badge');

        if (timerTextEl) timerTextEl.textContent = timeStr;
        if (headerBadgeEl) headerBadgeEl.textContent = timeStr;
    },

    playTibetanBowlSound() {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContextClass();
            
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(432, ctx.currentTime);

            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 3.6);
        } catch (e) {
            console.error('Audio chime error:', e);
        }
    }
};

/* ==========================================================================
   11. DOCUMENT OUTLINE MODULE
   ========================================================================== */
const Outline = {
    init() {
        const toggleBtn = document.getElementById('outline-toggle-btn');
        const panel = document.getElementById('outline-panel');

        if (toggleBtn && panel) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                panel.classList.toggle('open');
                if (panel.classList.contains('open')) {
                    Outline.generateOutline();
                }
            });

            document.addEventListener('click', (e) => {
                if (panel.classList.contains('open') && !panel.contains(e.target) && !toggleBtn.contains(e.target)) {
                    panel.classList.remove('open');
                }
            });
        }
    },

    generateOutline() {
        const editor = document.getElementById('editor');
        const container = document.getElementById('outline-list');
        if (!editor || !container) return;

        const headings = editor.querySelectorAll('h1, h2, h3');
        container.innerHTML = '';

        const lang = currentSettings.language || 'es';

        if (headings.length === 0) {
            container.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); padding:8px;">${I18N[lang].noHeadings}</div>`;
            return;
        }

        headings.forEach((h, index) => {
            if (!h.id) {
                h.id = `heading_${index}_${Date.now()}`;
            }

            const level = h.tagName.toLowerCase();
            const titleText = h.textContent.trim() || (lang === 'es' ? 'Sin título' : 'Untitled');

            const item = document.createElement('div');
            item.className = `outline-item outline-${level}`;
            item.innerHTML = `<span class="outline-icon">${level === 'h1' ? '📖' : level === 'h2' ? '🔖' : '📍'}</span> <span class="outline-text">${titleText}</span>`;

            item.addEventListener('click', () => {
                h.scrollIntoView({ behavior: 'smooth', block: 'center' });
                h.style.transition = 'background 0.3s';
                const origBg = h.style.background;
                h.style.background = 'rgba(139, 92, 246, 0.3)';
                setTimeout(() => {
                    h.style.background = origBg;
                }, 1000);
            });

            container.appendChild(item);
        });
    }
};

/* ==========================================================================
   12. CHARACTER & LORE BIBLE MODULE
   ========================================================================== */
let loreEntries = [];
let editingEntryId = null;

const DEFAULT_LORE_EMOJIS = {
    personaje: '👤',
    lugar: '🏰',
    lore: '🔮',
    objeto: '🗝️'
};

const Lore = {
    async init() {
        const toggleBtn = document.getElementById('lore-toggle-btn');
        const modal = document.getElementById('lore-modal');
        const closeBtn = document.getElementById('close-lore-btn');
        const newEntryBtn = document.getElementById('new-lore-btn');
        const searchInput = document.getElementById('lore-search-input');

        const formContainer = document.getElementById('lore-form-container');
        const saveFormBtn = document.getElementById('lore-save-form-btn');
        const cancelFormBtn = document.getElementById('lore-cancel-form-btn');

        if (toggleBtn && modal) {
            toggleBtn.addEventListener('click', async () => {
                await Lore.loadEntries();
                modal.classList.add('open');
            });
        }

        if (closeBtn && modal) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('open');
                Lore.closeForm();
            });
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('open');
                    Lore.closeForm();
                }
            });
        }

        if (newEntryBtn) {
            newEntryBtn.addEventListener('click', () => {
                Lore.openForm();
            });
        }

        if (cancelFormBtn) {
            cancelFormBtn.addEventListener('click', () => {
                Lore.closeForm();
            });
        }

        if (saveFormBtn) {
            saveFormBtn.addEventListener('click', () => {
                Lore.saveEntryFromForm();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                Lore.filterEntries(e.target.value);
            });
        }

        document.querySelectorAll('.lore-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.lore-cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                Lore.renderEntries(btn.dataset.type);
            });
        });
    },

    async loadEntries() {
        loreEntries = await Storage.getAllLoreEntries();
        Lore.renderEntries('all');
    },

    renderEntries(filterType = 'all') {
        const container = document.getElementById('lore-grid');
        if (!container) return;
        container.innerHTML = '';

        const lang = currentSettings.language || 'es';

        const filtered = filterType === 'all' 
            ? loreEntries 
            : loreEntries.filter(e => e.type === filterType);

        if (filtered.length === 0) {
            container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:20px; color:var(--text-muted);">${I18N[lang].noLoreCards}</div>`;
            return;
        }

        filtered.forEach(entry => {
            const typeEmoji = DEFAULT_LORE_EMOJIS[entry.type] || '📌';
            const card = document.createElement('div');
            card.className = 'lore-card';
            card.dataset.id = entry.id;

            card.innerHTML = `
                <div class="lore-card-header">
                    <span class="lore-card-icon">${entry.icon || typeEmoji}</span>
                    <h4 class="lore-card-title">${entry.name}</h4>
                    <span class="lore-card-badge">${entry.type}</span>
                </div>
                <div class="lore-card-details">${entry.details || '...'}</div>
                <div class="lore-card-actions">
                    <button class="icon-btn edit-lore-btn" style="width:24px;height:24px;font-size:0.75rem;" title="Editar">✏️</button>
                    <button class="icon-btn delete-lore-btn" style="width:24px;height:24px;font-size:0.75rem;" title="Eliminar">🗑️</button>
                </div>
            `;

            card.querySelector('.edit-lore-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                Lore.openForm(entry);
            });

            card.querySelector('.delete-lore-btn').addEventListener('click', async (e) => {
                e.stopPropagation();
                const confirmMsg = lang === 'es' ? `¿Eliminar la ficha de "${entry.name}"?` : `Delete entry "${entry.name}"?`;
                if (confirm(confirmMsg)) {
                    await Storage.deleteLoreEntry(entry.id);
                    await Lore.loadEntries();
                }
            });

            container.appendChild(card);
        });
    },

    openForm(existingEntry = null) {
        const formContainer = document.getElementById('lore-form-container');
        const nameInput = document.getElementById('lore-input-name');
        const typeSelect = document.getElementById('lore-input-type');
        const iconInput = document.getElementById('lore-input-icon');
        const detailsInput = document.getElementById('lore-input-details');

        if (!formContainer) return;

        // Auto-change emoji icon when selecting type
        if (typeSelect) {
            typeSelect.onchange = (e) => {
                const selectedType = e.target.value;
                if (iconInput) {
                    iconInput.value = DEFAULT_LORE_EMOJIS[selectedType] || '📌';
                }
            };
        }

        if (existingEntry) {
            editingEntryId = existingEntry.id;
            if (nameInput) nameInput.value = existingEntry.name || '';
            if (typeSelect) typeSelect.value = existingEntry.type || 'personaje';
            if (iconInput) iconInput.value = existingEntry.icon || DEFAULT_LORE_EMOJIS[existingEntry.type] || '👤';
            if (detailsInput) detailsInput.value = existingEntry.details || '';
        } else {
            editingEntryId = null;
            if (nameInput) nameInput.value = '';
            if (typeSelect) typeSelect.value = 'personaje';
            if (iconInput) iconInput.value = DEFAULT_LORE_EMOJIS['personaje'];
            if (detailsInput) detailsInput.value = '';
        }

        formContainer.classList.add('open');
        if (nameInput) nameInput.focus();
    },

    closeForm() {
        const formContainer = document.getElementById('lore-form-container');
        if (formContainer) formContainer.classList.remove('open');
        editingEntryId = null;
    },

    async saveEntryFromForm() {
        const nameInput = document.getElementById('lore-input-name');
        const typeSelect = document.getElementById('lore-input-type');
        const iconInput = document.getElementById('lore-input-icon');
        const detailsInput = document.getElementById('lore-input-details');

        const name = nameInput ? nameInput.value.trim() : '';
        const lang = currentSettings.language || 'es';
        if (!name) {
            alert(lang === 'es' ? 'Por favor ingresa un nombre para la ficha.' : 'Please enter a name for the entry.');
            return;
        }

        const type = typeSelect ? typeSelect.value : 'personaje';
        const icon = iconInput && iconInput.value.trim() ? iconInput.value.trim() : (DEFAULT_LORE_EMOJIS[type] || '📌');
        const details = detailsInput ? detailsInput.value.trim() : '';

        const entryObj = {
            id: editingEntryId || 'lore_' + Date.now(),
            name: name,
            type: type,
            icon: icon,
            details: details,
            updatedAt: Date.now()
        };

        await Storage.saveLoreEntry(entryObj);
        Lore.closeForm();
        await Lore.loadEntries();
    },

    filterEntries(query) {
        const q = query.toLowerCase().trim();
        document.querySelectorAll('.lore-card').forEach(card => {
            const title = card.querySelector('.lore-card-title').textContent.toLowerCase();
            const details = card.querySelector('.lore-card-details').textContent.toLowerCase();
            card.style.display = (title.includes(q) || details.includes(q)) ? 'flex' : 'none';
        });
    }
};

/* ==========================================================================
   13. INTERACTIVE ONBOARDING TOUR MODULE
   ========================================================================== */
let currentTourStep = 0;

const Tour = {
    init() {
        const skipBtn = document.getElementById('tour-skip-btn');
        const prevBtn = document.getElementById('tour-prev-btn');
        const nextBtn = document.getElementById('tour-next-btn');

        if (skipBtn) skipBtn.addEventListener('click', () => Tour.endTour());
        if (prevBtn) prevBtn.addEventListener('click', () => Tour.prevStep());
        if (nextBtn) nextBtn.addEventListener('click', () => Tour.nextStep());
    },

    async checkFirstLaunch() {
        const settings = await Storage.getSettings();
        if (!settings.hasSeenTour) {
            setTimeout(() => {
                Tour.startTour();
            }, 600);
        }
    },

    startTour() {
        currentTourStep = 0;
        const backdrop = document.getElementById('tour-backdrop');
        const popover = document.getElementById('tour-popover');

        if (backdrop) backdrop.classList.add('open');
        if (popover) popover.classList.add('open');

        Tour.showStep(currentTourStep);
    },

    showStep(stepIndex) {
        document.querySelectorAll('.tour-target-highlight').forEach(el => el.classList.remove('tour-target-highlight'));

        const lang = currentSettings.language || 'es';
        const steps = I18N[lang].tourSteps;

        if (stepIndex < 0 || stepIndex >= steps.length) {
            Tour.endTour();
            return;
        }

        const stepTargets = [
            '.brand-title',
            'sidebar-toggle-btn',
            'toolbar-font-name',
            'lore-toggle-btn',
            'outline-toggle-btn',
            'pomodoro-toggle-btn',
            'add-postit-btn',
            'audio-toggle-btn',
            'zen-mode-toggle-btn',
            'open-settings-btn'
        ];

        const targetId = stepTargets[stepIndex];
        const step = steps[stepIndex];
        const targetEl = document.getElementById(targetId) || document.querySelector(targetId);

        const badgeEl = document.getElementById('tour-step-badge');
        const titleEl = document.getElementById('tour-title');
        const descEl = document.getElementById('tour-desc');
        const prevBtn = document.getElementById('tour-prev-btn');
        const nextBtn = document.getElementById('tour-next-btn');
        const popover = document.getElementById('tour-popover');

        if (badgeEl) badgeEl.textContent = `${lang === 'es' ? 'Paso' : 'Step'} ${stepIndex + 1} ${lang === 'es' ? 'de' : 'of'} ${steps.length}`;
        if (titleEl) titleEl.textContent = step.title;
        if (descEl) descEl.textContent = step.desc;

        if (prevBtn) prevBtn.style.visibility = stepIndex === 0 ? 'hidden' : 'visible';
        if (nextBtn) nextBtn.textContent = stepIndex === steps.length - 1 ? (lang === 'es' ? '¡Entendido! 🎉' : 'Got it! 🎉') : (lang === 'es' ? 'Siguiente ▶' : 'Next ▶');

        if (targetEl) {
            targetEl.classList.add('tour-target-highlight');
            const rect = targetEl.getBoundingClientRect();
            
            let top = rect.bottom + 12;
            let left = rect.left + (rect.width / 2) - 165;

            if (left < 10) left = 10;
            if (left + 330 > window.innerWidth) left = window.innerWidth - 340;
            if (top + 180 > window.innerHeight) top = rect.top - 190;

            if (popover) {
                popover.style.top = `${Math.max(10, top)}px`;
                popover.style.left = `${left}px`;
            }
        } else {
            if (popover) {
                popover.style.top = '100px';
                popover.style.left = 'calc(50vw - 165px)';
            }
        }
    },

    nextStep() {
        const lang = currentSettings.language || 'es';
        const steps = I18N[lang].tourSteps;
        if (currentTourStep >= steps.length - 1) {
            Tour.endTour();
        } else {
            currentTourStep++;
            Tour.showStep(currentTourStep);
        }
    },

    prevStep() {
        if (currentTourStep > 0) {
            currentTourStep--;
            Tour.showStep(currentTourStep);
        }
    },

    async endTour() {
        document.querySelectorAll('.tour-target-highlight').forEach(el => el.classList.remove('tour-target-highlight'));
        const backdrop = document.getElementById('tour-backdrop');
        const popover = document.getElementById('tour-popover');

        if (backdrop) backdrop.classList.remove('open');
        if (popover) popover.classList.remove('open');

        const settings = await Storage.getSettings();
        settings.hasSeenTour = true;
        await Storage.saveSettings(settings);
    }
};

/* ==========================================================================
   14. INITIALIZER & TOOLBAR BINDINGS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await Storage.init();
        currentSettings = await Storage.getSettings();

        Editor.init();
        I18nManager.init();

        await Sidebar.init((selectedDoc) => {
            Editor.loadDocument(selectedDoc);
        });

        await Settings.init();
        await Postits.init();
        AudioSynth.init();
        Export.init();

        Pomodoro.init();
        Outline.init();
        await Lore.init();

        Tour.init();
        await Tour.checkFirstLaunch();

        bindToolbarEvents();
        bindZenMode();

        console.log('LofiNotebook v2 Loaded Successfully!');
    } catch (err) {
        console.error('Initialization Error:', err);
    }
});

function bindToolbarEvents() {
    const formatButtons = [
        { id: 'btn-bold', cmd: 'bold' },
        { id: 'btn-italic', cmd: 'italic' },
        { id: 'btn-underline', cmd: 'underline' },
        { id: 'btn-strike', cmd: 'strikeThrough' },
        { id: 'btn-ul', cmd: 'insertUnorderedList' },
        { id: 'btn-ol', cmd: 'insertOrderedList' },
        { id: 'btn-align-left', cmd: 'justifyLeft' },
        { id: 'btn-align-center', cmd: 'justifyCenter' },
        { id: 'btn-align-right', cmd: 'justifyRight' },
        { id: 'btn-align-justify', cmd: 'justifyFull' }
    ];

    formatButtons.forEach(({ id, cmd, value }) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                Editor.executeFormat(cmd, value || null);
            });
        }
    });

    const quoteBtn = document.getElementById('btn-quote');
    if (quoteBtn) {
        quoteBtn.addEventListener('click', () => {
            Editor.toggleQuote();
        });
    }

    const fontSelect = document.getElementById('toolbar-font-name');
    if (fontSelect) {
        fontSelect.addEventListener('change', (e) => {
            Editor.executeFormat('fontName', e.target.value);
        });
    }

    const fontSizeSelect = document.getElementById('toolbar-font-size');
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', (e) => {
            Editor.executeFormat('fontSize', e.target.value);
        });
    }

    const blockFormatSelect = document.getElementById('toolbar-block-format');
    if (blockFormatSelect) {
        blockFormatSelect.addEventListener('change', (e) => {
            Editor.executeFormat('formatBlock', e.target.value);
        });
    }

    const colorInput = document.getElementById('toolbar-text-color');
    if (colorInput) {
        colorInput.addEventListener('change', (e) => {
            Editor.executeFormat('foreColor', e.target.value);
        });
    }
}

function bindZenMode() {
    const zenBtn = document.getElementById('zen-mode-toggle-btn');
    const zenExitBtn = document.getElementById('zen-exit-btn');

    const toggleZen = () => {
        const isEnteringZen = !document.body.classList.contains('zen-mode');
        
        if (isEnteringZen) {
            const sidebarPanel = document.getElementById('sidebar-panel');
            if (sidebarPanel) {
                sidebarPanel.classList.add('collapsed');
            }
            document.querySelectorAll('#audio-panel, #pomodoro-panel, #outline-panel, .export-dropdown-menu').forEach(p => p.classList.remove('open'));
        }

        document.body.classList.toggle('zen-mode');

        const editor = document.getElementById('editor');
        if (editor && isEnteringZen) {
            editor.focus();
        }
    };

    if (zenBtn) zenBtn.addEventListener('click', toggleZen);
    if (zenExitBtn) zenExitBtn.addEventListener('click', toggleZen);

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
            e.preventDefault();
            toggleZen();
        } else if (e.key === 'Escape' && document.body.classList.contains('zen-mode')) {
            toggleZen();
        }
    });
}
