/**
 * Main Application Entry Point
 * Wires together Storage, Sidebar, Editor, Postits, Audio, Settings, Export, Pomodoro, Outline and Lore.
 */
import { Storage } from './storage.js';
import { Sidebar } from './sidebar.js';
import { Editor } from './editor.js';
import { Postits } from './postits.js';
import { AudioSynth } from './audio.js';
import { Settings } from './settings.js';
import { Export } from './export.js';
import { Pomodoro } from './pomodoro.js';
import { Outline } from './outline.js';
import { Lore } from './lore.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. Initialize Storage Engine
        await Storage.init();

        // 2. Initialize Editor
        Editor.init();

        // 3. Initialize Sidebar and load selected document into Editor
        await Sidebar.init((selectedDoc) => {
            Editor.loadDocument(selectedDoc);
        });

        // 4. Initialize Settings & Applying visual preferences
        await Settings.init();

        // 5. Initialize Floating Post-it Sticky Notes
        await Postits.init();

        // 6. Initialize Web Audio Ambient Synth
        AudioSynth.init();

        // 7. Initialize Document Export Engine
        Export.init();

        // 8. Initialize New Features: Pomodoro, Outline & Lore
        Pomodoro.init();
        Outline.init();
        await Lore.init();

        // 9. Bind Toolbar Formatting Commands
        bindToolbarEvents();

        // 10. Bind Zen Mode / Focus Controls
        bindZenMode();

        console.log('LofiNotepad v2 100% Client-side Loaded Successfully!');
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
        { id: 'btn-align-justify', cmd: 'justifyFull' },
        { id: 'btn-quote', cmd: 'formatBlock', value: 'blockquote' }
    ];

    formatButtons.forEach(({ id, cmd, value }) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                Editor.executeFormat(cmd, value || null);
            });
        }
    });

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
        document.body.classList.toggle('zen-mode');
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
