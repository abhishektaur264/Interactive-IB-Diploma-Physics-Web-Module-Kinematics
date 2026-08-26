// Web Audio API Micro-Sound Synthesizer (Zero external audio asset dependency)

let audioCtx = null;
let soundEnabled = true;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
};

export const getSoundEnabled = () => soundEnabled;

export const playSound = (type) => {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'correct') {
      // Harmonic pleasant major chord chime
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + i * 0.06);
        g.gain.setValueAtTime(0.08, now + i * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35);
        o.connect(g);
        g.connect(ctx.destination);
        o.start(now + i * 0.06);
        o.stop(now + i * 0.06 + 0.35);
      });
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'reveal') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'launch') {
      // Projectile whoosh
      const whiteNoiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.25, ctx.sampleRate);
      const output = whiteNoiseBuffer.getChannelData(0);
      for (let i = 0; i < whiteNoiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = whiteNoiseBuffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(1500, now + 0.2);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      
      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.25);
    }
  } catch {
    // Graceful fallback if audio context blocked by browser autoplay policy
  }
};
