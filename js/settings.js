/**
 * Settings & Customization Controller
 * Manages modal tabs, background images, wallpaper presets, blur/overlay sliders, paper styles, fonts & custom font uploads.
 */
import { Storage } from './storage.js';

const PRESET_WALLPAPERS = {
    rainy_night: 'url("https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80")',
    cozy_room: 'url("https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80")',
    starry_sky: 'url("https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80")',
    pixel_sunset: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80")',
    lofi_forest: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80")',
    minimal_dark: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)'
};

let currentSettings = {};

export const Settings = {
    async init() {
        currentSettings = await Storage.getSettings();

        // Load and apply saved custom fonts
        await Settings.loadCustomFonts();

        const modalBackdrop = document.getElementById('settings-modal');
        const openBtn = document.getElementById('open-settings-btn');
        const closeBtn = document.getElementById('close-settings-btn');

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

        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', (e) => {
                if (e.target === modalBackdrop) {
                    modalBackdrop.classList.remove('open');
                }
            });
        }

        // Modal Tabs
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

    async loadCustomFonts() {
        const fonts = await Storage.getAllCustomFonts();
        const customStyleEl = document.getElementById('custom-fonts-style');
        const toolbarGroup = document.getElementById('toolbar-custom-fonts-group');
        const settingsGroup = document.getElementById('settings-custom-fonts-group');

        if (toolbarGroup) toolbarGroup.innerHTML = '';
        if (settingsGroup) settingsGroup.innerHTML = '';
        if (customStyleEl) customStyleEl.innerHTML = '';

        fonts.forEach(font => {
            // Inject @font-face
            const fontRule = `@font-face { font-family: '${font.name}'; src: url('${font.dataUrl}'); }\n`;
            if (customStyleEl) customStyleEl.innerHTML += fontRule;

            // Add to dropdowns
            if (toolbarGroup) {
                const opt = document.createElement('option');
                opt.value = font.name;
                opt.textContent = `${font.name} (Subida)`;
                toolbarGroup.appendChild(opt);
            }
            if (settingsGroup) {
                const opt = document.createElement('option');
                opt.value = `'${font.name}', sans-serif`;
                opt.textContent = `${font.name} (Subida)`;
                settingsGroup.appendChild(opt);
            }
        });
    },

    bindInputs() {
        // Preset cards
        document.querySelectorAll('.preset-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                currentSettings.bgPreset = card.dataset.preset;
                currentSettings.customBgUrl = null;
                Settings.saveAndApply();
            });
        });

        // Custom Background Image Upload
        const bgUploadInput = document.getElementById('custom-bg-input');
        if (bgUploadInput) {
            bgUploadInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (evt) => {
                    currentSettings.customBgUrl = `url("${evt.target.result}")`;
                    Settings.saveAndApply();
                };
                reader.readAsDataURL(file);
            });
        }

        // Custom Font Upload
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
                    alert(`¡Tipografía "${fontName}" instalada correctamente en LofiNotepad!`);
                };
                reader.readAsDataURL(file);
            });
        }

        // Blur Slider
        const blurSlider = document.getElementById('setting-blur');
        if (blurSlider) {
            blurSlider.value = currentSettings.bgBlur;
            blurSlider.addEventListener('input', (e) => {
                currentSettings.bgBlur = parseInt(e.target.value);
                Settings.saveAndApply();
            });
        }

        // Overlay Opacity Slider
        const overlaySlider = document.getElementById('setting-overlay');
        if (overlaySlider) {
            overlaySlider.value = currentSettings.bgOverlayOpacity * 100;
            overlaySlider.addEventListener('input', (e) => {
                currentSettings.bgOverlayOpacity = parseFloat(e.target.value) / 100;
                Settings.saveAndApply();
            });
        }

        // Page Mode Selector
        const pageModeSelect = document.getElementById('setting-page-mode');
        if (pageModeSelect) {
            pageModeSelect.value = currentSettings.pageMode;
            pageModeSelect.addEventListener('change', (e) => {
                currentSettings.pageMode = e.target.value;
                Settings.saveAndApply();
            });
        }

        // Paper Color Selector
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

        // Font Family Select
        const fontFamilySelect = document.getElementById('setting-font-family');
        if (fontFamilySelect) {
            fontFamilySelect.value = currentSettings.fontFamily;
            fontFamilySelect.addEventListener('change', (e) => {
                currentSettings.fontFamily = e.target.value;
                Settings.saveAndApply();
            });
        }

        // Font Size Select
        const fontSizeSelect = document.getElementById('setting-font-size');
        if (fontSizeSelect) {
            fontSizeSelect.value = currentSettings.fontSize;
            fontSizeSelect.addEventListener('change', (e) => {
                currentSettings.fontSize = e.target.value;
                Settings.saveAndApply();
            });
        }

        // Accent Color Picker
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
            pageSheet.className = `page-sheet ${s.pageMode}`;
        }
    }
};
