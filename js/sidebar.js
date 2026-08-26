/**
 * Sidebar Document Manager
 * Handles listing, creating, selecting, renaming and deleting documents.
 */
import { Storage } from './storage.js';

let activeDocumentId = null;
let onDocumentSelectCallback = null;

export const Sidebar = {
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

            // Double click title or click pencil icon to rename
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
        const newDoc = {
            id: 'doc_' + Date.now(),
            title: 'Nuevo Borrador',
            content: '<p>Empieza a escribir aquí...</p>',
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

        const currentTitle = doc.title || 'Nuevo Borrador';
        const newTitle = window.prompt('Escribe el nuevo nombre para este documento:', currentTitle);
        
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
        if (docs.length <= 1) {
            alert('No puedes eliminar el único documento. Crea otro primero.');
            return;
        }

        if (confirm(`¿Seguro que deseas eliminar "${doc.title}"?`)) {
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
