/**
 * Web Audio API Ambient Sound Synthesizer
 * Generates distinct procedural ambient soundscapes (Rain, Fireplace, Waves, Cafe).
 * Includes auto-close on click outside.
 */

let audioCtx = null;
let masterGain = null;
let isPlaying = false;

const channels = {
    rain: { gain: null, volume: 0, interval: null },
    fire: { gain: null, volume: 0, interval: null },
    waves: { gain: null, volume: 0 },
    cafe: { gain: null, volume: 0, interval: null, steamInterval: null }
};

export const AudioSynth = {
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
                    channels[channelName].volume = vol;
                    if (channels[channelName].gain && audioCtx) {
                        channels[channelName].gain.gain.setValueAtTime(vol, audioCtx.currentTime);
                    }
                    if (vol > 0 && !isPlaying) {
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
        if (isPlaying) {
            AudioSynth.stopAudio();
        } else {
            AudioSynth.startAudio();
        }
    },

    startAudio() {
        AudioSynth.ensureContext();
        if (isPlaying) return;

        AudioSynth.createRainNode();
        AudioSynth.createFireNode();
        AudioSynth.createWavesNode();
        AudioSynth.createCafeNode();

        isPlaying = true;
        const playBtn = document.getElementById('audio-play-master-btn');
        if (playBtn) playBtn.textContent = '⏸ Pausar Audio';
    },

    stopAudio() {
        if (!isPlaying || !audioCtx) return;
        audioCtx.suspend();
        isPlaying = false;
        if (channels.rain.interval) clearInterval(channels.rain.interval);
        if (channels.fire.interval) clearInterval(channels.fire.interval);
        if (channels.cafe.interval) clearInterval(channels.cafe.interval);
        if (channels.cafe.steamInterval) clearInterval(channels.cafe.steamInterval);

        const playBtn = document.getElementById('audio-play-master-btn');
        if (playBtn) playBtn.textContent = '▶ Reproducir Audio';
    },

    /* --- Distinct Synthesizers --- */

    // 1. Rain Synthesizer
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
        gainNode.gain.value = channels.rain.volume;

        rainSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);
        rainSource.start();

        channels.rain.interval = setInterval(() => {
            if (channels.rain.volume > 0 && isPlaying) {
                const osc = audioCtx.createOscillator();
                const dropGain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(1500 + Math.random() * 2000, audioCtx.currentTime);
                dropGain.gain.setValueAtTime(channels.rain.volume * 0.05, audioCtx.currentTime);
                dropGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.04);

                osc.connect(dropGain);
                dropGain.connect(masterGain);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.05);
            }
        }, 150);

        channels.rain.gain = gainNode;
    },

    // 2. Fireplace Crackle Synthesizer
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
        gainNode.gain.value = channels.fire.volume;

        fireSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);
        fireSource.start();

        channels.fire.interval = setInterval(() => {
            if (channels.fire.volume > 0 && isPlaying && Math.random() < 0.6) {
                const popLen = audioCtx.sampleRate * 0.008;
                const popBuffer = audioCtx.createBuffer(1, popLen, audioCtx.sampleRate);
                const popData = popBuffer.getChannelData(0);
                for (let i = 0; i < popLen; i++) {
                    popData[i] = (Math.random() * 2 - 1) * (1 - i / popLen);
                }
                const popSource = audioCtx.createBufferSource();
                popSource.buffer = popBuffer;

                const popGain = audioCtx.createGain();
                popGain.gain.value = channels.fire.volume * (0.1 + Math.random() * 0.3);

                popSource.connect(popGain);
                popGain.connect(masterGain);
                popSource.start();
            }
        }, 120);

        channels.fire.gain = gainNode;
    },

    // 3. Ocean Waves Synthesizer
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
        gainNode.gain.value = channels.waves.volume;

        waveSource.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(masterGain);
        waveSource.start();

        channels.waves.gain = gainNode;
    },

    // 4. Cafe Synthesizer (Realistic Chatter Formants + Cup Clinks + Steam Wand)
    createCafeNode() {
        const bufferSize = audioCtx.sampleRate * 3;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);

        // Brownish background chatter base
        let last = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            data[i] = (last + (0.015 * white)) / 1.015;
            last = data[i];
        }

        const cafeSource = audioCtx.createBufferSource();
        cafeSource.buffer = buffer;
        cafeSource.loop = true;

        // Dual Formant Bandpass Filters for Distant Voice Murmur
        const f1 = audioCtx.createBiquadFilter();
        f1.type = 'bandpass';
        f1.frequency.value = 320;
        f1.Q.value = 1.2;

        const f2 = audioCtx.createBiquadFilter();
        f2.type = 'bandpass';
        f2.frequency.value = 750;
        f2.Q.value = 1.5;

        // Subtle tremor LFO on voices
        const lfo = audioCtx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 0.25;
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.value = 60;
        lfo.connect(lfoGain);
        lfoGain.connect(f1.frequency);
        lfo.start();

        const gainNode = audioCtx.createGain();
        gainNode.gain.value = channels.cafe.volume;

        cafeSource.connect(f1);
        f1.connect(f2);
        f2.connect(gainNode);
        gainNode.connect(masterGain);
        cafeSource.start();

        // 4A. Coffee Cup / Ceramic Spoon Tink Generator
        channels.cafe.interval = setInterval(() => {
            if (channels.cafe.volume > 0 && isPlaying && Math.random() < 0.5) {
                const osc = audioCtx.createOscillator();
                const tinkGain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(2400 + Math.random() * 1200, audioCtx.currentTime);
                tinkGain.gain.setValueAtTime(channels.cafe.volume * 0.08, audioCtx.currentTime);
                tinkGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);

                osc.connect(tinkGain);
                tinkGain.connect(masterGain);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.16);
            }
        }, 1200);

        // 4B. Espresso Steam Wand Milk Hiss (Periodic short hiss)
        channels.cafe.steamInterval = setInterval(() => {
            if (channels.cafe.volume > 0 && isPlaying && Math.random() < 0.3) {
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
                hGain.gain.linearRampToValueAtTime(channels.cafe.volume * 0.07, audioCtx.currentTime + 0.2);
                hGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + dur);

                hissSource.connect(hFilter);
                hFilter.connect(hGain);
                hGain.connect(masterGain);
                hissSource.start();
            }
        }, 6000);

        channels.cafe.gain = gainNode;
    }
};
