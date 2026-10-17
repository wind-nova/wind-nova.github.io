/**
 * 救羊出圈 · 轻量 WebAudio 音效
 * ------------------------------------------------------------
 * 不依赖任何音频文件，所有音色都由振荡器实时合成。
 * 浏览器要求在用户手势后解锁音频；App 会在第一次 pointerdown 时 resume。
 * 主题可以通过 audio 配置改变音阶与音色。
 */
(function (root) {
  'use strict';

  const SG = (root.SG = root.SG || {});

  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.volume = 0.2;
      this.profile = { base: 392, scale: [0, 2, 4, 7, 9, 12], wave: 'sine', brightness: 0.9 };
    }

    setEnabled(value) {
      this.enabled = Boolean(value);
    }

    setProfile(profile) {
      if (profile) this.profile = Object.assign({}, this.profile, profile);
    }

    unlock() {
      if (!this.enabled) return;
      try {
        if (!this.ctx) {
          const Ctx = root.AudioContext || root.webkitAudioContext;
          if (!Ctx) return;
          this.ctx = new Ctx();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
      } catch (_) {
        this.ctx = null;
      }
    }

    note(freq, at, duration, options) {
      if (!this.ctx || !this.enabled) return;
      const opts = options || {};
      const ctx = this.ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      osc.type = opts.wave || this.profile.wave || 'sine';
      osc.frequency.setValueAtTime(freq, at);
      if (opts.slideTo) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(40, opts.slideTo), at + duration);
      }
      filter.type = 'lowpass';
      filter.frequency.value = 2600 * (this.profile.brightness || 1);
      const peak = Math.max(0.0001, (opts.volume == null ? 0.08 : opts.volume));
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.exponentialRampToValueAtTime(peak, at + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start(at);
      osc.stop(at + duration + 0.03);
    }

    play(name) {
      if (!this.enabled) return;
      this.unlock();
      if (!this.ctx) return;
      const now = this.ctx.currentTime + 0.01;
      const base = this.profile.base || 392;
      const scale = this.profile.scale || [0, 2, 4, 7, 9, 12];
      const freqAt = (degree, octave) =>
        base * Math.pow(2, ((scale[degree % scale.length] || 0) + 12 * (octave || 0)) / 12);

      switch (name) {
        case 'select':
          this.note(freqAt(3, 0), now, 0.1, { volume: 0.045, wave: 'sine' });
          this.note(freqAt(4, 1), now + 0.035, 0.12, { volume: 0.035, wave: 'sine' });
          break;
        case 'slide':
          this.note(freqAt(3, 0), now, 0.16, {
            volume: 0.055,
            slideTo: freqAt(4, 0),
            wave: 'sine'
          });
          break;
        case 'undo':
          this.note(freqAt(3, 0), now, 0.12, { volume: 0.045 });
          this.note(freqAt(1, 0), now + 0.08, 0.18, { volume: 0.04 });
          break;
        case 'hint':
          [2, 4, 5].forEach((degree, index) => {
            this.note(freqAt(degree, 1), now + index * 0.075, 0.25, {
              volume: 0.035,
              wave: 'triangle'
            });
          });
          break;
        case 'reset':
          this.note(freqAt(2, 0), now, 0.2, { volume: 0.045, slideTo: freqAt(0, 0) });
          break;
        case 'error':
          this.note(freqAt(0, -1), now, 0.12, { volume: 0.04, wave: 'triangle' });
          break;
        case 'win': {
          const melody = [0, 2, 4, 5, 4, 7];
          melody.forEach((degree, index) => {
            this.note(freqAt(degree, 1), now + index * 0.11, 0.3, {
              volume: 0.055,
              wave: index % 2 ? 'sine' : 'triangle'
            });
          });
          [0, 4, 7].forEach((degree, index) => {
            this.note(freqAt(degree, 0), now + 0.6 + index * 0.035, 0.8, {
              volume: 0.032,
              wave: 'sine'
            });
          });
          break;
        }
        case 'tap':
          this.note(freqAt(4, 0), now, 0.06, { volume: 0.03 });
          break;
        default:
          break;
      }
    }
  }

  SG.SoundEngine = SoundEngine;
})(typeof window !== 'undefined' ? window : globalThis);
