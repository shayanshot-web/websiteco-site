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


/* شاخ/کَرنای باستانی: دو نت اکتاو و پنجم با موج دندانه‌ای و فیلتر پایین‌گذر */
function horn(c: Ctx, out: AudioNode, o: { f: number; at?: number; dur: number; vol: number; attack: number; cutoff: number }) {
  const t = c.currentTime + (o.at ?? 0);
  const lp = c.createBiquadFilter();
  lp.type = 'lowpass';
  lp.Q.value = 2;
  lp.frequency.setValueAtTime(o.cutoff * 0.5, t);
  lp.frequency.exponentialRampToValueAtTime(o.cutoff, t + o.attack);
  lp.connect(env(c, out, t, o.vol, o.attack, o.dur));
  [1, 1.005].forEach((det) => {
    const osc = c.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(o.f * det, t);
    osc.connect(lp);
    osc.start(t);
    osc.stop(t + o.dur + 0.05);
  });
}

/* ضربهٔ طبل حماسی: بدنهٔ کم‌فرکانس و ضربهٔ پوست */
function drum(c: Ctx, out: AudioNode, at: number, f: number, vol: number) {
  tone(c, out, { f, to: f * 0.38, at, dur: 0.55, vol, attack: 0.004 });
  hiss(c, out, { type: 'lowpass', f: 260, at, dur: 0.22, vol: vol * 0.6, attack: 0.003 });
  hiss(c, out, { type: 'bandpass', f: 1400, q: 1.5, at, dur: 0.04, vol: vol * 0.25, attack: 0.002 });
}

/* نالهٔ مرغ دریایی */
function gull(c: Ctx, out: AudioNode, at: number, base: number, vol: number) {
  tone(c, out, { f: base * 0.8, to: base * 1.55, at, dur: 0.13, vol, type: 'sawtooth', attack: 0.02 });
  tone(c, out, { f: base * 1.55, to: base * 0.8, at: at + 0.12, dur: 0.3, vol, type: 'sawtooth', attack: 0.02 });
  tone(c, out, { f: base * 1.6, to: base * 3.1, at, dur: 0.13, vol: vol * 0.35, type: 'triangle', attack: 0.02 });
  tone(c, out, { f: base * 3.1, to: base * 1.6, at: at + 0.12, dur: 0.3, vol: vol * 0.3, type: 'triangle', attack: 0.02 });
}

/* جلزولز روغن داغ و ماهی در تابه */
function sizzle(c: Ctx, out: AudioNode) {
  hiss(c, out, { type: 'highpass', f: 5200, q: 0.4, dur: 1.6, vol: 0.2, attack: 0.04 });
  hiss(c, out, { type: 'bandpass', f: 3200, q: 0.8, dur: 1.5, vol: 0.12, attack: 0.05 });
  for (let i = 0; i < 34; i++) {
    const at = Math.pow(Math.random(), 1.3) * 1.45;
    const big = Math.random() < 0.18;
    hiss(c, out, {
      type: 'bandpass',
      f: big ? 900 + Math.random() * 700 : 2200 + Math.random() * 3800,
      q: big ? 2 : 4,
      at,
      dur: big ? 0.035 : 0.018,
      vol: big ? 0.32 : 0.2,
      attack: 0.002,
    });
  }
}

const sounds: Record<string, Maker> = {
  /* موج دریا */
  sea: (c, o) => {
    hiss(c, o, { type: 'lowpass', f: 380, to: 1500, q: 0.4, dur: 1.7, vol: 0.5, attack: 0.8 });
    hiss(c, o, { type: 'highpass', f: 3200, q: 0.3, at: 0.7, dur: 1, vol: 0.07, attack: 0.3 });
  },
  /* معرفی و تاریخچه: طبل رزم و کَرنای باستانی و حماسی */
  about: (c, o) => {
    drum(c, o, 0, 120, 0.6);
    drum(c, o, 0.42, 100, 0.5);
    drum(c, o, 0.9, 80, 0.75);
    horn(c, o, { f: 98, at: 0.05, dur: 2.3, vol: 0.2, attack: 0.55, cutoff: 900 });
    horn(c, o, { f: 147, at: 0.3, dur: 2.0, vol: 0.14, attack: 0.6, cutoff: 1100 });
    horn(c, o, { f: 196, at: 0.9, dur: 1.5, vol: 0.09, attack: 0.5, cutoff: 1300 });
  },
  /* اقامتگاه: طبیعت کنار ساحل و آرامش؛ موج نرم، نسیم و چهچههٔ دور پرنده */
  stay: (c, o) => {
    hiss(c, o, { type: 'lowpass', f: 220, to: 650, q: 0.4, dur: 2.6, vol: 0.28, attack: 1.3 });
    hiss(c, o, { type: 'bandpass', f: 700, to: 500, q: 0.8, dur: 2.4, vol: 0.04, attack: 1 });
    tone(c, o, { f: 220, dur: 2.6, vol: 0.05, attack: 1.1 });
    tone(c, o, { f: 330, at: 0.15, dur: 2.4, vol: 0.035, attack: 1.1 });
    [0.7, 0.86, 1.02, 1.6, 1.74].forEach((at, i) => {
      const f = 3000 + (i % 3) * 450;
      tone(c, o, { f, to: f * 1.25, at, dur: 0.07, vol: 0.045, attack: 0.01 });
    });
  },
  /* جاذبه‌ها: موج دریا و مرغ دریایی */
  attractions: (c, o) => {
    hiss(c, o, { type: 'lowpass', f: 380, to: 1600, q: 0.4, dur: 1.9, vol: 0.42, attack: 0.9 });
    hiss(c, o, { type: 'highpass', f: 3200, q: 0.3, at: 0.8, dur: 1.1, vol: 0.06, attack: 0.3 });
    gull(c, o, 0.35, 1150, 0.07);
    gull(c, o, 0.95, 1000, 0.06);
  },
  /* رستوران‌ها: روغن داغ و ماهی سرخ‌شونده */
  restaurants: (c, o) => sizzle(c, o),
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
  /* غذا: همان جلزولز روغن داغ */
  food: (c, o) => sizzle(c, o),
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
