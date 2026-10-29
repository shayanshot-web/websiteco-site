'use client';

import { useEffect, useState, type ReactElement } from 'react';

/* موجودات آکواریوم فوتر: SVG ساده، هر کدام با اندازهٔ واقعی‌تر نسبت به هم */
type Kind = 'whale' | 'dolphin' | 'jelly' | 'fish1' | 'fish2' | 'fish3' | 'puffer';

const art: Record<Kind, { w: number; h: number; el: ReactElement }> = {
  whale: {
    w: 220, h: 90,
    el: (
      <svg viewBox="0 0 220 90">
        <path d="M8 46c8-24 50-36 100-34 44 2 76 14 90 34-12 14-34 22-64 26-30 4-56 0-80-8-18-6-34-12-46-18z" fill="#3d6c93" />
        <path d="M30 56c40 16 100 18 160-8-8 14-30 24-60 28-34 4-70-2-100-20z" fill="#cfe3ef" />
        <path d="M8 46C-2 38-4 24 6 14c4 10 10 16 18 20zM8 46c-10 4-12 18-4 28 4-10 10-16 18-18z" fill="#2f5a80" />
        <path d="M120 70c6 8 4 14-6 16 0-6 0-10 6-16z" fill="#2f5a80" />
        <circle cx="178" cy="38" r="3.2" fill="#0a2a44" />
        <path d="M150 8c-3-6 0-10 4-14M158 8c3-6 6-8 10-9" stroke="#bfe6ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  dolphin: {
    w: 130, h: 60,
    el: (
      <svg viewBox="0 0 130 60">
        <path d="M4 38C20 14 56 6 88 14c14 4 26 12 38 16-8 2-16 0-22 0-2 14-14 24-32 26-26 2-50-4-68-18z" fill="#6f9bbd" />
        <path d="M18 40c28 14 58 14 84-4-6 12-24 22-46 22-16 0-28-6-38-18z" fill="#e4f0f7" />
        <path d="M60 14c2-8 8-12 14-12-2 6-4 10-6 14z" fill="#587f9f" />
        <path d="M118 30l10-12c2 8 0 16-4 22z" fill="#587f9f" />
        <path d="M0 38c-2 6 2 10 8 12" stroke="#6f9bbd" strokeWidth="5" fill="none" strokeLinecap="round" />
        <circle cx="34" cy="34" r="2.6" fill="#0a2a44" />
      </svg>
    ),
  },
  jelly: {
    w: 56, h: 80,
    el: (
      <svg viewBox="0 0 56 80">
        <path className="aq-bell" d="M6 32C6 12 18 2 28 2s22 10 22 30c-6 4-12 0-14 0s-8 4-8 4-6-4-8-4-8 4-14 0z" fill="#e7a5ff" fillOpacity=".85" />
        <circle cx="20" cy="16" r="3" fill="#fff" fillOpacity=".6" />
        <g stroke="#d27cf5" strokeWidth="2.4" fill="none" strokeLinecap="round" className="aq-tent">
          <path d="M16 34c-3 10 3 14-1 26" />
          <path d="M26 36c-3 10 3 16-1 32" />
          <path d="M36 36c3 10-3 16 1 30" />
          <path d="M44 34c3 8-2 14 2 24" />
        </g>
      </svg>
    ),
  },
  fish1: {
    w: 60, h: 36,
    el: (
      <svg viewBox="0 0 60 36">
        <path d="M2 18C12 4 32 2 44 14L58 4v28L44 22C32 34 12 32 2 18z" fill="#ff8a3d" />
        <path d="M22 6c4 8 4 16 0 24M32 8c3 7 3 13 0 20" stroke="#fff" strokeWidth="3" fill="none" strokeOpacity=".85" />
        <circle cx="11" cy="15" r="2.2" fill="#0a2a44" />
      </svg>
    ),
  },
  fish2: {
    w: 46, h: 30,
    el: (
      <svg viewBox="0 0 46 30">
        <path d="M2 15C8 4 24 2 34 11l10-7v22l-10-7C24 28 8 26 2 15z" fill="#2fb7c9" />
        <path d="M10 15h22" stroke="#e8fbff" strokeWidth="2" strokeOpacity=".7" />
        <circle cx="9" cy="12.5" r="1.8" fill="#0a2a44" />
      </svg>
    ),
  },
  fish3: {
    w: 34, h: 22,
    el: (
      <svg viewBox="0 0 34 22">
        <path d="M2 11C6 3 16 2 22 8l10-6v18l-10-6C16 20 6 19 2 11z" fill="#ffd54a" />
        <circle cx="7" cy="9" r="1.5" fill="#0a2a44" />
      </svg>
    ),
  },
  puffer: {
    w: 50, h: 44,
    el: (
      <svg viewBox="0 0 50 44">
        <circle cx="22" cy="22" r="17" fill="#e8c35a" />
        <path d="M6 28c10 8 24 8 32 0-4 12-28 14-32 0z" fill="#fff3c2" />
        <path d="M38 22l11-8v16z" fill="#d3a93c" />
        <path d="M14 8l-2-5M22 5V0M30 8l3-5M10 36l-4 3M34 36l4 3" stroke="#b08a22" strokeWidth="2" strokeLinecap="round" />
        <circle cx="14" cy="18" r="2.6" fill="#0a2a44" />
      </svg>
    ),
  },
};

interface Swimmer {
  kind: Kind;
  size: number; // پهنا بر حسب پیکسل
  top: number; // درصد
  dur: number; // ثانیه
  delay: number;
  dir: 'l' | 'r';
  front: boolean; // جلوی متن یا پشت آن
  bob: number;
}

const pool: { kind: Kind; size: [number, number]; weight: number }[] = [
  { kind: 'whale', size: [190, 240], weight: 1 },
  { kind: 'dolphin', size: [105, 135], weight: 2 },
  { kind: 'jelly', size: [42, 62], weight: 3 },
  { kind: 'fish1', size: [44, 66], weight: 3 },
  { kind: 'fish2', size: [34, 52], weight: 3 },
  { kind: 'fish3', size: [24, 38], weight: 4 },
  { kind: 'puffer', size: [38, 54], weight: 2 },
];

function make(count: number): Swimmer[] {
  const bag = pool.flatMap((p) => Array(p.weight).fill(p));
  const rnd = (a: number, b: number) => a + Math.random() * (b - a);
  return Array.from({ length: count }, (_, i) => {
    const p = bag[Math.floor(Math.random() * bag.length)];
    const big = p.kind === 'whale' || p.kind === 'dolphin';
    return {
      kind: p.kind,
      size: Math.round(rnd(p.size[0], p.size[1])),
      top: Math.round(rnd(4, p.kind === 'whale' ? 40 : 78)),
      dur: Math.round(big ? rnd(34, 52) : p.kind === 'jelly' ? rnd(40, 60) : rnd(18, 34)),
      delay: -Math.round(rnd(0, 40)),
      dir: Math.random() < 0.5 ? 'l' : 'r',
      front: i % 3 === 0 && !big,
      bob: Math.round(rnd(3, 6)),
    };
  });
}

/** آکواریوم زندهٔ پشت و جلوی نوشته‌های فوتر؛ هر بار بازدید ترکیب تصادفی تازه‌ای دارد */
export default function Aquarium() {
  const [swimmers, setSwimmers] = useState<Swimmer[]>([]);

  useEffect(() => {
    const small = window.matchMedia('(max-width: 640px)').matches;
    setSwimmers(make(small ? 9 : 15));
  }, []);

  return (
    <div className="aq" aria-hidden="true">
      {swimmers.map((s, i) => {
        const a = art[s.kind];
        return (
          <div
            key={i}
            className={`aq-swim ${s.dir === 'r' ? 'to-r' : 'to-l'} ${s.front ? 'front' : 'back'}`}
            style={{ top: `${s.top}%`, width: s.size, height: (s.size * a.h) / a.w, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}
          >
            <div className="aq-flip" style={{ transform: s.dir === 'r' ? 'scaleX(-1)' : undefined }}>
              <div className={`aq-bob ${s.kind === 'jelly' ? 'jelly' : ''}`} style={{ animationDuration: `${s.bob}s` }}>
                {a.el}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
