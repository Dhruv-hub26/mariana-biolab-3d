// Web Audio API Ambient Deep-Sea Drone Synthesizer

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseFilter: BiquadFilterNode | null = null;
  private isPlaying: boolean = false;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }

    if (this.ctx?.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private start() {
    if (!this.ctx) return;
    try {
      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.25, this.ctx.currentTime + 3);
      this.masterGain.connect(this.ctx.destination);

      // Deep Sub Osc 1 (48Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sine';
      this.osc1.frequency.setValueAtTime(48, this.ctx.currentTime);

      // Deep Sub Osc 2 (51Hz for subtle binaural beat)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(51.5, this.ctx.currentTime);

      const oscGain = this.ctx.createGain();
      oscGain.gain.value = 0.6;
      this.osc1.connect(oscGain);
      this.osc2.connect(oscGain);

      // Lowpass Filter for ocean sub depth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      oscGain.connect(filter);

      // LFO for slow breathing pressure swelling
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 0.12 Hz
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 40;
      this.lfo.connect(filter.frequency);
      this.lfo.start();

      filter.connect(this.masterGain);
      this.osc1.start();
      this.osc2.start();

      // Brown Noise Generator for ambient water pressure movement
      const bufferSize = this.ctx.sampleRate * 3;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      this.noiseFilter = this.ctx.createBiquadFilter();
      this.noiseFilter.type = 'lowpass';
      this.noiseFilter.frequency.setValueAtTime(220, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.value = 0.15;

      this.noiseNode.connect(this.noiseFilter);
      this.noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      this.noiseNode.start();
      this.isPlaying = true;
    } catch (e) {
      console.warn('Audio start error:', e);
    }
  }

  private stop() {
    if (!this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
      setTimeout(() => {
        this.osc1?.stop();
        this.osc2?.stop();
        this.lfo?.stop();
        this.noiseNode?.stop();
        this.osc1?.disconnect();
        this.osc2?.disconnect();
        this.lfo?.disconnect();
        this.noiseNode?.disconnect();
        this.isPlaying = false;
      }, 1500);
    } catch (e) {
      console.warn('Audio stop error:', e);
      this.isPlaying = false;
    }
  }

  // Tactical Sonar Ping FX
  public playSonarPing() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1180, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 1.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.5);
    } catch (e) {
      console.warn('Sonar ping error:', e);
    }
  }

  // Tactical UI Click Sound
  public playClick() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      // Ignore click audio errors
    }
  }
}

export const audioEngine = new AudioEngine();
