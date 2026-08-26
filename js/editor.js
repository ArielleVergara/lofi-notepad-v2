/**
 * Rich Text Editor Engine
 * Handles WYSIWYG commands, toolbar states, auto-saving, word/char counts and image insertion.
 */
import { Storage } from './storage.js';
import { Sidebar } from './sidebar.js';

let editorElement = null;
let currentDocId = null;
let autoSaveTimeout = null;

export const Editor = {
    init() {
        editorElement = document.getElementById('editor');
        if (!editorElement) return;

        // Auto-save on typing (debounced 500ms)
        editorElement.addEventListener('input', () => {
            Editor.updateMetrics();
            Editor.scheduleAutoSave();
        });

        // Update toolbar active states on selection change
        document.addEventListener('selectionchange', () => {
            if (document.activeElement === editorElement || editorElement.contains(document.activeElement)) {
                Editor.updateToolbarState();
            }
        });

        // Handle Image Insert Button
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

    loadDocument(doc) {
        currentDocId = doc.id;
        if (editorElement) {
            editorElement.innerHTML = doc.content || '';
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
    },

    scheduleAutoSave() {
        if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(async () => {
            if (!currentDocId) return;
            const doc = await Storage.getDocument(currentDocId);
            if (doc) {
                doc.content = editorElement.innerHTML;
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = doc.content;
                const text = tempDiv.textContent.trim();
                if (text && !doc.isCustomTitle && doc.title === 'Nuevo Borrador') {
                    const firstWords = text.split(/\s+/).slice(0, 5).join(' ');
                    doc.title = firstWords.substring(0, 30);
                }
                await Storage.saveDocument(doc);
                Sidebar.refreshDocumentList();
            }
        }, 500);
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
