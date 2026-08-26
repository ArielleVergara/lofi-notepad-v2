/**
 * Document Outline / Table of Contents Generator
 * Scans document headings (H1, H2, H3) and provides a smooth-scrolling outline tree.
 */

export const Outline = {
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

        if (headings.length === 0) {
            container.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted); padding:8px;">No hay títulos en el documento (usa H1, H2 o H3).</div>';
            return;
        }

        headings.forEach((h, index) => {
            // Ensure unique ID for scrolling
            if (!h.id) {
                h.id = `heading_${index}_${Date.now()}`;
            }

            const level = h.tagName.toLowerCase(); // 'h1', 'h2', 'h3'
            const titleText = h.textContent.trim() || 'Sin título';

            const item = document.createElement('div');
            item.className = `outline-item outline-${level}`;
            item.innerHTML = `<span class="outline-icon">${level === 'h1' ? '📖' : level === 'h2' ? '🔖' : '📍'}</span> <span class="outline-text">${titleText}</span>`;

            item.addEventListener('click', () => {
                h.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Briefly highlight heading
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
