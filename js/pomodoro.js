/**
 * Lo-Fi Pomodoro Timer Module
 * Allows users to freely set custom minutes for focus & break sessions.
 * Plays a relaxing Web Audio singing bowl chime upon completion.
 */

let timerInterval = null;
let remainingSeconds = 25 * 60;
let isRunning = false;

export const Pomodoro = {
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
                if (isRunning) {
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
                if (!isRunning) {
                    remainingSeconds = mins * 60;
                    Pomodoro.updateDisplay();
                }
            });
        }

        Pomodoro.updateDisplay();
    },

    start() {
        if (isRunning) return;
        isRunning = true;
        const startBtn = document.getElementById('pomo-start-btn');
        if (startBtn) startBtn.textContent = '⏸ Pausar';

        timerInterval = setInterval(() => {
            remainingSeconds--;
            Pomodoro.updateDisplay();

            if (remainingSeconds <= 0) {
                Pomodoro.onTimerFinished();
            }
        }, 1000);
    },

    pause() {
        isRunning = false;
        if (timerInterval) clearInterval(timerInterval);
        const startBtn = document.getElementById('pomo-start-btn');
        if (startBtn) startBtn.textContent = '▶ Iniciar';
    },

    reset() {
        Pomodoro.pause();
        const customMinsInput = document.getElementById('pomo-custom-mins');
        const mins = customMinsInput ? parseInt(customMinsInput.value) || 25 : 25;
        remainingSeconds = mins * 60;
        Pomodoro.updateDisplay();
    },

    onTimerFinished() {
        Pomodoro.pause();
        Pomodoro.playTibetanBowlSound();
        alert('⏰ ¡Sesión de tiempo completada!');
    },

    updateDisplay() {
        const mins = Math.floor(remainingSeconds / 60);
        const secs = remainingSeconds % 60;
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
