import type { ReactNode } from 'react';
import type { ExpIconName } from '@/content/experiences';

/* آیکن‌های متحرک تجربه‌ها (SVG درون‌خطی؛ انیمیشن‌ها در globals.css با پیشوند xi-) */

const N = '#0a3e66';
const B = '#0a6fb5';
const S = '#d9c7a6';
const C = '#e07a5f';
const Y = '#f0b429';

/** مسیر موج که با جابه‌جایی ۳۶ واحدی بی‌درز تکرار می‌شود */
const wv = (y: number, a = 3) => {
  let d = `M-36 ${y}`;
  for (let x = -36; x < 100; x += 36) d += `c6 ${-a} 12 ${-a} 18 0s12 ${a} 18 0`;
  return d;
};
const Wave = ({ y, c = B, w = 3, slow = false }: { y: number; c?: string; w?: number; slow?: boolean }) => (
  <path className={slow ? 'xi-wave xi-slow' : 'xi-wave'} d={wv(y)} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" />
);
const Star = ({ x, y, s = 1, d = 0 }: { x: number; y: number; s?: number; d?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="xi-tw" style={{ animationDelay: `${d}s` }} d="M0-5l1.4 3.6L5 0 1.4 1.4 0 5-1.4 1.4-5 0l3.6-1.4z" fill={Y} />
  </g>
);

const art: Record<ExpIconName, ReactNode> = {
  boat: (
    <>
      <g className="xi-rock">
        <path d="M10 40h44l-6 10H17z" fill={N} />
        <path d="M31 9v31" stroke={N} strokeWidth="2.5" />
        <path d="M33 12c8 6 13 15 14 26H33z" fill="#f6f0e4" stroke={N} strokeWidth="2" strokeLinejoin="round" />
        <path d="M29 18c-5 5-8 12-9 20h9z" fill={S} stroke={N} strokeWidth="2" strokeLinejoin="round" />
        <path d="M31 9l6 2-6 2z" fill={C} />
      </g>
      <Wave y={50} />
      <Wave y={57} c={N} w={2.5} slow />
    </>
  ),
  fishing: (
    <>
      <path d="M10 56L42 8" stroke={N} strokeWidth="3.2" strokeLinecap="round" />
      <g className="xi-line">
        <path d="M42 8c9 6 11 18 11 32" stroke="#4a6073" strokeWidth="1.6" fill="none" />
        <circle cx="53" cy="42" r="3" fill={C} stroke="#fff" strokeWidth="1" />
      </g>
      <g className="xi-swim">
        <path d="M8 50c4-5 12-5 16 0-4 5-12 5-16 0z" fill={C} />
        <path d="M24 50l6-4.5v9z" fill={C} />
        <circle cx="12.5" cy="49" r="1.2" fill="#fff" />
      </g>
      <Wave y={46} />
      <Wave y={56} c={N} w={2.5} slow />
    </>
  ),
  paddle: (
    <>
      <g className="xi-bob">
        <circle cx="30" cy="14" r="5" fill={N} />
        <path d="M30 20v15M30 25l-8 6M30 25l9 4M30 35l-4 8M30 35l4 8" stroke={N} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <path d="M5 44h54c-5 6-14 7-27 7S10 50 5 44z" fill={S} stroke={N} strokeWidth="2" strokeLinejoin="round" />
        <g className="xi-paddle">
          <path d="M39 29l12 26" stroke={C} strokeWidth="2.6" strokeLinecap="round" />
          <ellipse cx="52" cy="57" rx="3" ry="5.5" transform="rotate(-25 52 57)" fill={C} />
        </g>
      </g>
      <Wave y={53} />
      <Wave y={59} c={N} w={2.5} slow />
    </>
  ),
  beachtennis: (
    <>
      <path d="M0 52c16-5 32-5 64 0v12H0z" fill={S} />
      <g className="xi-swing">
        <ellipse cx="22" cy="24" rx="11" ry="13.5" fill="none" stroke={N} strokeWidth="3.2" />
        <path d="M22 37.5V51" stroke={N} strokeWidth="4.5" strokeLinecap="round" />
        <path d="M13.5 18h17M12.5 24h19M13.5 30h17M18 11.5v25M22 10.5v27M26 11.5v25" stroke={B} strokeWidth=".9" />
      </g>
      <g className="xi-bounce">
        <circle cx="48" cy="26" r="5.5" fill={Y} stroke={N} strokeWidth="1.5" />
        <path d="M43.5 24c3 1 6 1 9 0" stroke="#fff" strokeWidth="1.2" fill="none" />
      </g>
    </>
  ),
  volleyball: (
    <>
      <path d="M0 52c16-5 32-5 64 0v12H0z" fill={S} />
      <ellipse className="xi-shadow" cx="32" cy="56" rx="13" ry="3" fill={N} opacity=".2" />
      <g className="xi-hop">
        <g className="xi-spin">
          <circle cx="32" cy="30" r="17" fill="#fff" stroke={N} strokeWidth="2.5" />
          <path d="M32 13c-7 6-7 12 0 17s7 11 0 17M16 24c9-2 14 1 16 6M48 24c-9-2-14 1-16 6M18 42c6-4 12-4 14-12M46 42c-6-4-12-4-14-12" stroke={B} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      </g>
    </>
  ),
  football: (
    <>
      <path d="M0 52c16-5 32-5 64 0v12H0z" fill={S} />
      <ellipse className="xi-shadow" cx="32" cy="56" rx="13" ry="3" fill={N} opacity=".2" />
      <g className="xi-hop">
        <g className="xi-spin">
          <circle cx="32" cy="30" r="17" fill="#fff" stroke={N} strokeWidth="2.5" />
          <path d="M32 22l7.5 5.5-3 8.5H27.5l-3-8.5z" fill={N} />
          <path d="M32 22v-6M39.5 27.5l6-3M36.5 36l4 6M27.5 36l-4 6M24.5 27.5l-6-3" stroke={N} strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>
    </>
  ),
  claytennis: (
    <>
      <rect x="4" y="30" width="56" height="28" rx="3" fill="#e0a27a" />
      <path d="M4 44h56M32 30v28M12 30v28M52 30v28" stroke="#fff" strokeWidth="1.6" opacity=".9" />
      <path d="M4 30h56" stroke={N} strokeWidth="3" />
      <g className="xi-arcx">
        <g className="xi-arcy">
          <circle cx="8" cy="30" r="5" fill="#e9e04f" stroke={N} strokeWidth="1.5" />
        </g>
      </g>
      <g className="xi-swing2">
        <ellipse cx="12" cy="14" rx="6" ry="7.5" fill="none" stroke={N} strokeWidth="2.6" />
        <path d="M12 21.5V29" stroke={N} strokeWidth="3.4" strokeLinecap="round" />
      </g>
    </>
  ),
  museum: (
    <>
      <circle cx="32" cy="32" r="30" fill="#0a3e66" opacity=".08" />
      <Star x={52} y={12} d={0} />
      <Star x={11} y={16} s={0.7} d={0.8} />
      <g className="xi-scope">
        <path d="M32 24l12-11" stroke={N} strokeWidth="5" strokeLinecap="round" />
        <path d="M42 15l4-4" stroke={C} strokeWidth="5" strokeLinecap="round" />
      </g>
      <path d="M15 40a17 17 0 0 1 34 0z" fill="#fff" stroke={N} strokeWidth="2.4" />
      <rect x="10" y="40" width="44" height="17" fill={S} stroke={N} strokeWidth="2.4" />
      <path d="M26 57V48a6 6 0 0 1 12 0v9" fill="#f6f0e4" stroke={N} strokeWidth="2.2" />
      <path d="M15 46v6M49 46v6" stroke={N} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  oldtown: (
    <>
      <path d="M3 58V26h17v32z" fill={S} stroke={N} strokeWidth="2.2" />
      <path d="M44 58V20h17v38z" fill={S} stroke={N} strokeWidth="2.2" />
      <path d="M48 20v-9h9v9" fill="#f6f0e4" stroke={N} strokeWidth="2.2" />
      <path d="M20 58V36a12 12 0 0 1 24 0v22z" fill="#f6f0e4" stroke={N} strokeWidth="2.2" />
      <path d="M8 34h6v6H8zM49 32h7v6h-7z" fill={B} opacity=".6" />
      <g className="xi-steps">
        <ellipse cx="29" cy="54" rx="2.6" ry="4" fill={B} />
        <ellipse cx="35" cy="47" rx="2.6" ry="4" fill={B} />
        <ellipse cx="29" cy="40" rx="2.6" ry="4" fill={B} />
        <ellipse cx="35" cy="33" rx="2.6" ry="4" fill={B} />
      </g>
    </>
  ),
  stars: (
    <>
      <circle cx="32" cy="32" r="30" fill={N} />
      <Star x={14} y={14} s={0.8} d={0} />
      <Star x={50} y={16} s={1} d={0.6} />
      <Star x={52} y={40} s={0.6} d={1.2} />
      <Star x={10} y={38} s={0.6} d={0.3} />
      <path className="xi-shoot" d="M8 6l14 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 40l-9 17M32 40l9 17M32 40v17" stroke={S} strokeWidth="2.6" strokeLinecap="round" />
      <g className="xi-scope">
        <rect x="18" y="31" width="28" height="8" rx="2.5" transform="rotate(-32 32 40)" fill={S} />
        <rect x="14" y="30" width="7" height="10" rx="2" transform="rotate(-32 32 40)" fill={C} />
      </g>
    </>
  ),
  sundial: (
    <>
      <g className="xi-sun">
        <circle cx="13" cy="13" r="6.5" fill={Y} />
        <path d="M13 2v3M13 21v3M2 13h3M21 13h3M5 5l2 2M21 5l-2 2" stroke={Y} strokeWidth="2" strokeLinecap="round" />
      </g>
      <ellipse cx="32" cy="46" rx="26" ry="10" fill={S} stroke={N} strokeWidth="2.2" />
      <path d="M10 45l4 1M16 39l3 2M26 36l1 3M38 36l-1 3M48 39l-3 2M54 45l-4 1" stroke={N} strokeWidth="2" strokeLinecap="round" />
      <g className="xi-shade">
        <path d="M32 46L20 52l14 2z" fill={N} opacity=".4" />
      </g>
      <path d="M32 46V24l11 22z" fill={C} stroke={N} strokeWidth="2" strokeLinejoin="round" />
    </>
  ),
  park: (
    <>
      <g className="xi-sun">
        <circle cx="50" cy="13" r="7" fill={Y} />
      </g>
      <path d="M0 50c16-5 32-5 64 0v14H0z" fill={S} />
      <path d="M22 54c2-11 5-19 12-30" stroke="#8a6a3d" strokeWidth="3.6" fill="none" strokeLinecap="round" />
      <g className="xi-sway">
        <path d="M34 24c-8-9-19-7-24 0 9-3 16-2 24 0z" fill="#2a9d6f" />
        <path d="M34 24c8-9 19-7 24 0-9-3-16-2-24 0z" fill="#2a9d6f" />
        <path d="M34 24c-3-11 0-17 5-19-1 7 0 13-5 19z" fill="#34b27f" />
        <path d="M34 24c-7 4-9 11-7 15 4-4 6-9 7-15z" fill="#34b27f" />
        <circle cx="35" cy="27" r="2" fill="#8a6a3d" />
      </g>
      <path d="M40 46h16M42 46v7M54 46v7M40 41h16" stroke={N} strokeWidth="2.4" strokeLinecap="round" />
    </>
  ),
};

export default function ExpIcon({ name }: { name: ExpIconName }) {
  return (
    <svg className="xi" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      {art[name]}
    </svg>
  );
}
