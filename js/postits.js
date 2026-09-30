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
                    <select class="postit-fontsize-select" title="Tamaño de letra">
                        <option value="12px" ${data.fontSize === '12px' ? 'selected' : ''}>12px</option>
                        <option value="14px" ${data.fontSize === '14px' ? 'selected' : ''}>14px</option>
                        <option value="15px" ${(!data.fontSize || data.fontSize === '15px') ? 'selected' : ''}>15px</option>
                        <option value="16px" ${data.fontSize === '16px' ? 'selected' : ''}>16px</option>
                        <option value="18px" ${data.fontSize === '18px' ? 'selected' : ''}>18px</option>
                    </select>
                    <button class="bullet-postit-btn" title="Agregar Viñeta (•)">•</button>
                    <button class="minimize-postit-btn" title="Minimizar / Expandir">${data.minimized ? '➕' : '➖'}</button>
                    <button class="delete-postit-btn" title="Eliminar Nota">🗑️</button>
                </div>
            </div>
            <div class="postit-body">
                <textarea class="postit-textarea" placeholder="• Escribe tu lista o notas aquí...">${data.text || ''}</textarea>
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

        // Bullet List Button Click
        const bulletBtn = el.querySelector('.bullet-postit-btn');
        if (bulletBtn) {
            bulletBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const val = textarea.value;

                if (start !== end) {
                    // Selection active: Toggle bullets for all selected lines
                    const lineStart = val.lastIndexOf('\n', start - 1) + 1;
                    let lineEnd = val.indexOf('\n', end);
                    if (lineEnd === -1) lineEnd = val.length;

                    const selectedBlock = val.substring(lineStart, lineEnd);
                    const lines = selectedBlock.split('\n');
                    const allBulleted = lines.every(l => l.trim() === '' || l.startsWith('• '));

                    let newLines;
                    if (allBulleted) {
                        newLines = lines.map(l => l.startsWith('• ') ? l.substring(2) : l);
                    } else {
                        newLines = lines.map(l => (l.startsWith('• ') || l.trim() === '') ? l : '• ' + l);
                    }

                    const newBlock = newLines.join('\n');
                    textarea.value = val.substring(0, lineStart) + newBlock + val.substring(lineEnd);
                    textarea.selectionStart = lineStart;
                    textarea.selectionEnd = lineStart + newBlock.length;
                } else {
                    // Cursor placement (no selection)
                    const lineStart = val.lastIndexOf('\n', start - 1) + 1;
                    let lineEnd = val.indexOf('\n', start);
                    if (lineEnd === -1) lineEnd = val.length;

                    const line = val.substring(lineStart, lineEnd);

                    if (line.startsWith('• ')) {
                        // Current line already has a bullet: insert next bullet on a new line below
                        const newInsertion = '\n• ';
                        textarea.value = val.substring(0, lineEnd) + newInsertion + val.substring(lineEnd);
                        const newPos = lineEnd + newInsertion.length;
                        textarea.selectionStart = textarea.selectionEnd = newPos;
                    } else if (line.trim() === '') {
                        // Empty line: add bullet
                        textarea.value = val.substring(0, lineStart) + '• ' + val.substring(lineEnd);
                        textarea.selectionStart = textarea.selectionEnd = lineStart + 2;
                    } else {
                        // Plain text line: convert line to bullet
                        textarea.value = val.substring(0, lineStart) + '• ' + line + val.substring(lineEnd);
                        textarea.selectionStart = textarea.selectionEnd = start + 2;
                    }
                }

                textarea.focus();
                data.text = textarea.value;
                Storage.savePostit(data);
            });
        }

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

        // Font Size Selector Handler & Initial Apply
        const textarea = el.querySelector('.postit-textarea');
        if (data.fontSize) {
            textarea.style.fontSize = data.fontSize;
        }

        const sizeSelect = el.querySelector('.postit-fontsize-select');
        if (sizeSelect) {
            sizeSelect.addEventListener('change', (e) => {
                e.stopPropagation();
                const newSize = e.target.value;
                textarea.style.fontSize = newSize;
                data.fontSize = newSize;
                Storage.savePostit(data);
            });
        }

        let textSaveTimeout = null;

        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const val = textarea.value;
                const lineStart = val.lastIndexOf('\n', start - 1) + 1;
                const line = val.substring(lineStart, start);

                if (line.trim() === '•') {
                    e.preventDefault();
                    textarea.value = val.substring(0, lineStart) + val.substring(start);
                    textarea.selectionStart = textarea.selectionEnd = lineStart;
                    data.text = textarea.value;
                    Storage.savePostit(data);
                } else if (line.startsWith('• ')) {
                    e.preventDefault();
                    const insertion = '\n• ';
                    textarea.value = val.substring(0, start) + insertion + val.substring(end);
                    textarea.selectionStart = textarea.selectionEnd = start + insertion.length;
                    data.text = textarea.value;
                    Storage.savePostit(data);
                }
            }
        });

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
