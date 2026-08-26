/**
 * Character & World Lore Bible Module
 * 100% client-side manager for characters, places and lore entries with embedded custom modal form.
 */
import { Storage } from './storage.js';

let loreEntries = [];
let editingEntryId = null;

export const Lore = {
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

        const filtered = filterType === 'all' 
            ? loreEntries 
            : loreEntries.filter(e => e.type === filterType);

        if (filtered.length === 0) {
            container.innerHTML = '<div style="grid-column:1/-1; text-align:center; padding:20px; color:var(--text-muted);">No hay fichas guardadas en esta categoría. Haz clic en "➕" para agregar una.</div>';
            return;
        }

        filtered.forEach(entry => {
            const typeEmoji = entry.type === 'personaje' ? '👤' : entry.type === 'lugar' ? '🏰' : '🔮';
            const card = document.createElement('div');
            card.className = 'lore-card';
            card.dataset.id = entry.id;

            card.innerHTML = `
                <div class="lore-card-header">
                    <span class="lore-card-icon">${entry.icon || typeEmoji}</span>
                    <h4 class="lore-card-title">${entry.name}</h4>
                    <span class="lore-card-badge">${entry.type}</span>
                </div>
                <div class="lore-card-details">${entry.details || 'Sin detalles.'}</div>
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
                if (confirm(`¿Eliminar la ficha de "${entry.name}"?`)) {
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

        if (existingEntry) {
            editingEntryId = existingEntry.id;
            if (nameInput) nameInput.value = existingEntry.name || '';
            if (typeSelect) typeSelect.value = existingEntry.type || 'personaje';
            if (iconInput) iconInput.value = existingEntry.icon || '👤';
            if (detailsInput) detailsInput.value = existingEntry.details || '';
        } else {
            editingEntryId = null;
            if (nameInput) nameInput.value = '';
            if (typeSelect) typeSelect.value = 'personaje';
            if (iconInput) iconInput.value = '👤';
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
        if (!name) {
            alert('Por favor ingresa un nombre para la ficha.');
            return;
        }

        const type = typeSelect ? typeSelect.value : 'personaje';
        const icon = iconInput && iconInput.value.trim() ? iconInput.value.trim() : (type === 'personaje' ? '👤' : type === 'lugar' ? '🏰' : '🔮');
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
