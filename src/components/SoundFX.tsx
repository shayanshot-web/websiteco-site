'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/* صداهای تولیدشده با WebAudio (بدون فایل صوتی). مرورگرها پخش خودکار را نمی‌پذیرند؛
   پس صدا فقط بعد از زدن دکمهٔ بلندگو فعال می‌شود و انتخاب کاربر یادآوری می‌شود. */

type Ctx = AudioContext;
type Maker = (c: Ctx, out: AudioNode) => void;

const KEY = 'helileh-sound';
const noiseCache = new WeakMap<Ctx, AudioBuffer>();

function noise(c: Ctx): AudioBuffer {
  let b = noiseCache.get(c);
  if (!b) {
    b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    noiseCache.set(c, b);
  }
  return b;
}

function env(c: Ctx, out: AudioNode, t: number, peak: number, attack: number, dur: number): GainNode {
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  g.connect(out);
  return g;
}

function tone(c: Ctx, out: AudioNode, o: { f: number; to?: number; type?: OscillatorType; at?: number; dur: number; vol: number; attack?: number }) {
  const t = c.currentTime + (o.at ?? 0);
  const osc = c.createOscillator();
  osc.type = o.type ?? 'sine';
  osc.frequency.setValueAtTime(o.f, t);
  if (o.to) osc.frequency.exponentialRampToValueAtTime(o.to, t + o.dur);
  osc.connect(env(c, out, t, o.vol, o.attack ?? 0.01, o.dur));
  osc.start(t);
  osc.stop(t + o.dur + 0.05);
}

function hiss(
  c: Ctx,
  out: AudioNode,
  o: { type: BiquadFilterType; f: number; to?: number; q?: number; at?: number; dur: number; vol: number; attack?: number },
) {
  const t = c.currentTime + (o.at ?? 0);
  const src = c.createBufferSource();
  src.buffer = noise(c);
  src.loop = true;
  const f = c.createBiquadFilter();
  f.type = o.type;
  f.Q.value = o.q ?? 0.7;
  f.frequency.setValueAtTime(o.f, t);
  if (o.to) f.frequency.exponentialRampToValueAtTime(o.to, t + o.dur);
  src.connect(f);
  f.connect(env(c, out, t, o.vol, o.attack ?? 0.01, o.dur));
  src.start(t, Math.random());
  src.stop(t + o.dur + 0.05);
}

const sounds: Record<string, Maker> = {
  /* موج دریا */
  sea: (c, o) => {
    hiss(c, o, { type: 'lowpass', f: 380, to: 1500, q: 0.4, dur: 1.7, vol: 0.5, attack: 0.8 });
    hiss(c, o, { type: 'highpass', f: 3200, q: 0.3, at: 0.7, dur: 1, vol: 0.07, attack: 0.3 });
  },
  /* باد در بادگیر */
  about: (c, o) => {
    hiss(c, o, { type: 'bandpass', f: 350, to: 950, q: 3, dur: 1.4, vol: 0.35, attack: 0.6 });
  },
  /* زنگ در خانه */
  stay: (c, o) => {
    tone(c, o, { f: 659, dur: 0.9, vol: 0.2 });
    tone(c, o, { f: 988, at: 0.18, dur: 1.1, vol: 0.18 });
  },
  /* مرغ دریایی */
  attractions: (c, o) => {
    tone(c, o, { f: 900, to: 1700, dur: 0.22, vol: 0.12, type: 'triangle', attack: 0.04 });
    tone(c, o, { f: 1700, to: 800, at: 0.2, dur: 0.3, vol: 0.12, type: 'triangle', attack: 0.04 });
    tone(c, o, { f: 1000, to: 1600, at: 0.62, dur: 0.2, vol: 0.09, type: 'triangle', attack: 0.04 });
  },
  /* حباب */
  restaurants: (c, o) => {
    [0, 0.12, 0.23, 0.38].forEach((at, i) => {
      const f = 380 + Math.random() * 300 + i * 40;
      tone(c, o, { f, to: f * 1.9, at, dur: 0.11, vol: 0.2, attack: 0.01 });
    });
  },
  /* تیک قطب‌نما */
  experiences: (c, o) => {
    tone(c, o, { f: 1500, type: 'triangle', dur: 0.05, vol: 0.2, attack: 0.002 });
    tone(c, o, { f: 1100, type: 'triangle', at: 0.11, dur: 0.05, vol: 0.16, attack: 0.002 });
    tone(c, o, { f: 2400, at: 0.2, dur: 0.5, vol: 0.05, attack: 0.01 });
  },
  /* شاتر دوربین */
  gallery: (c, o) => {
    hiss(c, o, { type: 'highpass', f: 2500, dur: 0.05, vol: 0.3, attack: 0.002 });
    hiss(c, o, { type: 'highpass', f: 1800, at: 0.07, dur: 0.07, vol: 0.25, attack: 0.002 });
  },
  /* خش قلم */
  blog: (c, o) => {
    for (let i = 0; i < 4; i++) hiss(c, o, { type: 'bandpass', f: 3500 + i * 300, q: 2, at: i * 0.07, dur: 0.06, vol: 0.16, attack: 0.01 });
  },
  /* ناقوس */
  events: (c, o) => {
    tone(c, o, { f: 880, dur: 1.4, vol: 0.2 });
    tone(c, o, { f: 1320, dur: 1, vol: 0.09 });
    tone(c, o, { f: 2217, dur: 0.6, vol: 0.05 });
  },
  /* ضربهٔ سفال */
  shop: (c, o) => {
    tone(c, o, { f: 320, to: 150, dur: 0.12, vol: 0.4, attack: 0.003 });
    tone(c, o, { f: 760, to: 700, at: 0.01, dur: 0.18, vol: 0.1, type: 'triangle' });
  },
  /* تنبک */
  culture: (c, o) => {
    tone(c, o, { f: 190, to: 70, dur: 0.3, vol: 0.55, attack: 0.004 });
    hiss(c, o, { type: 'bandpass', f: 1800, dur: 0.05, vol: 0.25, attack: 0.002 });
    tone(c, o, { f: 260, to: 110, at: 0.18, dur: 0.2, vol: 0.3, attack: 0.004 });
  },
  /* زنگ تلفن */
  contact: (c, o) => {
    [0, 0.26].forEach((at) => {
      tone(c, o, { f: 440, at, dur: 0.2, vol: 0.14, type: 'triangle', attack: 0.01 });
      tone(c, o, { f: 480, at, dur: 0.2, vol: 0.14, type: 'triangle', attack: 0.01 });
    });
  },
  /* جلزولز غذا */
  food: (c, o) => {
    hiss(c, o, { type: 'highpass', f: 4500, q: 0.4, dur: 0.9, vol: 0.2, attack: 0.05 });
    [0.1, 0.27, 0.41, 0.6].forEach((at) => hiss(c, o, { type: 'bandpass', f: 2500, q: 4, at, dur: 0.03, vol: 0.2, attack: 0.002 }));
  },
  /* تیک ملایم پیوندها */
  tick: (c, o) => {
    tone(c, o, { f: 1250, to: 1000, dur: 0.05, vol: 0.09, attack: 0.003 });
  },
  /* دکمه‌ها */
  pop: (c, o) => {
    tone(c, o, { f: 420, to: 820, dur: 0.1, vol: 0.2, attack: 0.005 });
  },
  /* نشان‌ها و کارت‌ها */
  drop: (c, o) => {
    tone(c, o, { f: 900, to: 420, dur: 0.16, vol: 0.18, attack: 0.005 });
    tone(c, o, { f: 1350, to: 630, at: 0.01, dur: 0.14, vol: 0.06, attack: 0.005 });
  },
};

sounds.craft = sounds.shop;
sounds.phone = sounds.contact;

export default function SoundFX({ onLabel, offLabel, hint }: { onLabel: string; offLabel: string; hint: string }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<Ctx | null>(null);
  const outRef = useRef<AudioNode | null>(null);
  const onRef = useRef(false);
  const lastRef = useRef<{ el: Element | null; t: number }>({ el: null, t: 0 });

  const ensure = useCallback((): Ctx | null => {
    if (ctxRef.current) {
      if (ctxRef.current.state === 'suspended') void ctxRef.current.resume();
      return ctxRef.current;
    }
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    const c = new AC();
    const comp = c.createDynamicsCompressor();
    const master = c.createGain();
    master.gain.value = 0.7;
    comp.connect(master);
    master.connect(c.destination);
    ctxRef.current = c;
    outRef.current = comp;
    return c;
  }, []);

  const play = useCallback(
    (name: string) => {
      if (!onRef.current) return;
      const c = ensure();
      const make = sounds[name] ?? sounds.drop;
      if (c && outRef.current && c.state === 'running') make(c, outRef.current);
    },
    [ensure],
  );

  useEffect(() => {
    let saved = false;
    try {
      saved = localStorage.getItem(KEY) === '1';
    } catch {
      /* حالت خصوصی */
    }
    onRef.current = saved;
    setOn(saved);

    // اگر کاربر قبلاً صدا را روشن کرده، با اولین کلیک/لمس/کلید مرورگر اجازهٔ پخش می‌دهد
    const unlock = () => {
      if (onRef.current) ensure();
    };
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });

    const over = (e: Event) => {
      if (!onRef.current) return;
      const target = e.target as Element | null;
      const el = target && target.closest ? target.closest('[data-sound]') : null;
      if (!el) {
        lastRef.current.el = null;
        return;
      }
      if (el === lastRef.current.el) return;
      lastRef.current.el = el;
      const now = performance.now();
      if (now - lastRef.current.t < 140) return;
      lastRef.current.t = now;
      play(el.getAttribute('data-sound') || 'drop');
    };
    document.addEventListener('pointerover', over, { passive: true });
    document.addEventListener('focusin', over);
    return () => {
      document.removeEventListener('pointerover', over);
      document.removeEventListener('focusin', over);
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [ensure, play]);

  const toggle = () => {
    const next = !on;
    onRef.current = next;
    setOn(next);
    try {
      localStorage.setItem(KEY, next ? '1' : '0');
    } catch {
      /* ignore */
    }
    if (next) {
      const c = ensure();
      if (c) {
        const go = () => sounds.sea(c, outRef.current as AudioNode);
        if (c.state === 'running') go();
        else void c.resume().then(go);
      }
    }
  };

  return (
    <button
      type="button"
      className={on ? 'sound-toggle is-on' : 'sound-toggle'}
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? onLabel : offLabel}
      title={hint}
    >
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor" fillOpacity=".25" />
        {on ? (
          <>
            <path className="snd w1" d="M15.5 9.5a3.6 3.6 0 0 1 0 5" />
            <path className="snd w2" d="M18 7a7 7 0 0 1 0 10" />
          </>
        ) : (
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        )}
      </svg>
    </button>
  );
}
