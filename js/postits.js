/**
 * Floating Sticky Post-it Notes System
 * Allows creating draggable notes on screen for quick ideas & brainstorming.
 * Preserves notes in IndexedDB; closing minimizes or hides without deleting unless trash is clicked.
 */
import { Storage } from './storage.js';

let postits = [];

export const Postits = {
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
                    <span class="postit-color-dot" data-color="yellow" style="background:#fef08a;"></span>
                    <span class="postit-color-dot" data-color="pink" style="background:#fecdd3;"></span>
                    <span class="postit-color-dot" data-color="green" style="background:#bbf7d0;"></span>
                    <span class="postit-color-dot" data-color="blue" style="background:#bae6fd;"></span>
                    <span class="postit-color-dot" data-color="purple" style="background:#e9d5ff;"></span>
                </div>
                <div class="postit-btn-group">
                    <button class="minimize-postit-btn" title="Minimizar / Expandir">${data.minimized ? '➕' : '➖'}</button>
                    <button class="delete-postit-btn" title="Eliminar Nota">🗑️</button>
                </div>
            </div>
            <div class="postit-body">
                <textarea class="postit-textarea" placeholder="Anota tu idea rápida aquí...">${data.text || ''}</textarea>
            </div>
        `;

        // Color Picker Click
        el.querySelectorAll('.postit-color-dot').forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                const color = dot.dataset.color;
                el.className = `postit-container postit-${color} ${data.minimized ? 'minimized' : ''}`;
                data.color = color;
                Storage.savePostit(data);
            });
        });

        // Minimize / Expand Click
        const minBtn = el.querySelector('.minimize-postit-btn');
        minBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            data.minimized = !data.minimized;
            el.classList.toggle('minimized', data.minimized);
            minBtn.textContent = data.minimized ? '➕' : '➖';
            Storage.savePostit(data);
        });

        // Delete Click
        el.querySelector('.delete-postit-btn').addEventListener('click', async (e) => {
            e.stopPropagation();
            if (confirm('¿Seguro que deseas eliminar esta nota Post-it?')) {
                el.remove();
                postits = postits.filter(p => p.id !== data.id);
                await Storage.deletePostit(data.id);
            }
        });

        // Text Autosave
        const textarea = el.querySelector('.postit-textarea');
        let textSaveTimeout = null;
        textarea.addEventListener('input', () => {
            if (textSaveTimeout) clearTimeout(textSaveTimeout);
            textSaveTimeout = setTimeout(() => {
                data.text = textarea.value;
                Storage.savePostit(data);
            }, 300);
        });

        // Drag & Drop
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
