import type { EventArtName } from '@/content/localEvents';

/* تصویرسازی رویدادها (SVG)؛ وقتی عکس واقعی آماده شد جایگزین می‌شود */
const N = '#0a3e66';
const art: Record<EventArtName, React.ReactNode> = {
  sport: (
    <>
      <rect width="160" height="120" fill="#fbe3c4" />
      <circle cx="120" cy="34" r="16" fill="#f6b04a" />
      <path d="M0 72h160v48H0z" fill="#58b36b" />
      <path d="M0 88h160M0 104h160" stroke="#4aa05d" strokeWidth="6" />
      <path d="M14 98V62h30v36M14 62l8-8h30l-8 8M44 62l8-8v36" fill="none" stroke="#fff" strokeWidth="3" />
      <g className="ea-hop">
        <circle cx="96" cy="78" r="12" fill="#fff" stroke={N} strokeWidth="2.5" />
        <path d="M96 70l6 4-2 7h-8l-2-7z" fill={N} />
      </g>
      <ellipse cx="96" cy="100" rx="11" ry="3" fill={N} opacity=".2" />
    </>
  ),
  grigsho: (
    <>
      <rect width="160" height="120" fill="#2c3e78" />
      <path d="M0 80c20-10 40-10 60 0s40 10 60 0 30-6 40-2v42H0z" fill="#0a3e66" />
      <path d="M118 22a16 16 0 1 0 14 24 13 13 0 1 1-14-24z" fill="#f6d27a" />
      {[[20, 20], [50, 34], [84, 16], [140, 70], [34, 58]].map(([x, y], i) => (
        <path key={i} className="ea-tw" style={{ animationDelay: `${i * 0.4}s` }} d={`M${x} ${y - 4}l1.2 2.8 2.8 1.2-2.8 1.2L${x} ${y + 4}l-1.2-2.8-2.8-1.2 2.8-1.2z`} fill="#fff" />
      ))}
      {[[44, 96], [78, 100], [110, 96]].map(([x, y], i) => (
        <g key={i} className="ea-bob" style={{ animationDelay: `${i * 0.3}s` }}>
          <circle cx={x} cy={y - 20} r="7" fill="#f2c9a0" />
          <path d={`M${x - 9} ${y + 8}c0-14 4-20 9-20s9 6 9 20z`} fill={['#e07a5f', '#f0b429', '#5fb3a1'][i]} />
          <path d={`M${x + 8} ${y - 6}q8-4 8 4t-8 6z`} fill="#f6f0e4" stroke="#d9c7a6" strokeWidth="1.5" />
        </g>
      ))}
    </>
  ),
  barat: (
    <>
      <rect width="160" height="120" fill="#13335e" />
      <path d="M96 22a24 24 0 1 0 20 36 19 19 0 1 1-20-36z" fill="#f6d27a" />
      <path className="ea-tw" d="M118 30l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#fff" />
      {[[30, 34], [60, 20], [140, 28], [20, 80]].map(([x, y], i) => (
        <circle key={i} className="ea-tw" style={{ animationDelay: `${i * 0.5}s` }} cx={x} cy={y} r="2" fill="#fff" />
      ))}
      {[[28, 74], [62, 88], [100, 80], [132, 92]].map(([x, y], i) => (
        <g key={i} className="ea-bob" style={{ animationDelay: `${i * 0.35}s` }}>
          <path d={`M${x} ${y - 24}v8`} stroke="#d9c7a6" strokeWidth="2" />
          <rect x={x - 7} y={y - 16} width="14" height="20" rx="4" fill="#f0b429" />
          <rect x={x - 7} y={y - 16} width="14" height="20" rx="4" fill="#fff" opacity=".25" />
          <circle cx={x} cy={y - 6} r="9" fill="#f0b429" opacity=".25" />
        </g>
      ))}
    </>
  ),
  kolun: (
    <>
      <rect width="160" height="120" fill="#e9dcc0" />
      <rect y="92" width="160" height="28" fill="#d2bf97" />
      <path d="M14 92V30h40v62M106 92V22h40v70" fill="#d9c7a6" stroke="#a8803d" strokeWidth="2.5" />
      <path d="M54 92V54a26 26 0 0 1 52 0v38z" fill="#8a5a2b" stroke="#6b4220" strokeWidth="3" />
      <path d="M80 28v64M62 60h36M62 76h36" stroke="#6b4220" strokeWidth="2" />
      <circle cx="68" cy="68" r="2.5" fill="#d9c7a6" />
      <circle cx="92" cy="68" r="2.5" fill="#d9c7a6" />
      <g className="ea-knock">
        <circle cx="86" cy="76" r="5.5" fill="none" stroke="#d9c7a6" strokeWidth="2.5" />
      </g>
      <path d="M118 22v-10h16v10" fill="#f6f0e4" stroke="#a8803d" strokeWidth="2.5" />
    </>
  ),
  domad: (
    <>
      <rect width="160" height="120" fill="#fce9d9" />
      <path d="M0 78h160v42H0z" fill="#7fc1e3" />
      <path className="ea-wave" d="M-30 92c10-5 20-5 30 0s20 5 30 0 20-5 30 0 20 5 30 0 20-5 30 0 20 5 30 0" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <g className="ea-bob">
        <circle cx="64" cy="34" r="9" fill="#f2c9a0" />
        <path d="M54 30c0-10 20-10 20 0z" fill="#fff" stroke="#d9c7a6" strokeWidth="1.5" />
        <path d="M48 78c0-24 8-34 16-34s16 10 16 34z" fill="#0a3e66" />
        <path d="M64 44v34" stroke="#d9c7a6" strokeWidth="2" />
      </g>
      <g className="ea-bob" style={{ animationDelay: '.5s' }}>
        <circle cx="104" cy="38" r="8" fill="#f2c9a0" />
        <path d="M92 36c4-14 20-14 24 0-4 8-20 8-24 0z" fill="#e07a5f" opacity=".85" />
        <path d="M88 78c0-22 7-30 16-30s16 8 16 30z" fill="#e07a5f" />
        <path d="M96 52l8 6 8-6M96 62l8 6 8-6" stroke="#fff" strokeWidth="1.5" fill="none" />
      </g>
      {[[28, 20], [136, 18], [130, 56]].map(([x, y], i) => (
        <path key={i} className="ea-tw" style={{ animationDelay: `${i * .4}s` }} d={`M${x} ${y - 5}l1.5 3.5 3.5 1.5-3.5 1.5L${x} ${y + 5}l-1.5-3.5-3.5-1.5 3.5-1.5z`} fill="#f0b429" />
      ))}
    </>
  ),
  theater: (
    <>
      <rect width="160" height="120" fill="#fbe3c4" />
      <path d="M0 86h160v34H0z" fill="#e9d6a8" />
      <path d="M0 80c20-8 40-8 60 0s40 8 60 0 30-5 40-2v10H0z" fill="#7fc1e3" />
      <rect x="22" y="22" width="116" height="62" rx="3" fill="#6b4220" />
      <rect x="30" y="28" width="100" height="50" fill="#fff6e0" />
      <path d="M22 22c14 0 18 18 18 62H22zM138 22c-14 0-18 18-18 62h18z" fill="#c0392b" />
      <path d="M22 22h116" stroke="#a02c20" strokeWidth="5" />
      <g className="ea-bob">
        <path d="M66 46a10 10 0 0 1 20 0c0 8-4 14-10 14s-10-6-10-14z" fill="#f6d27a" stroke={N} strokeWidth="2" />
        <circle cx="72" cy="45" r="1.8" fill={N} />
        <circle cx="80" cy="45" r="1.8" fill={N} />
        <path d="M72 52q4 4 8 0" stroke={N} strokeWidth="2" fill="none" />
        <path d="M92 50a9 9 0 0 1 18 0c0 7-4 12-9 12s-9-5-9-12z" fill="#fff" stroke={N} strokeWidth="2" />
        <path d="M96 48h4M104 48h4M97 57q4-3 8 0" stroke={N} strokeWidth="2" fill="none" />
      </g>
    </>
  ),
};

export default function EventArt({ name }: { name: EventArtName }) {
  return (
    <svg className="ea" viewBox="0 0 160 120" role="img" aria-hidden="true" focusable="false">
      {art[name]}
    </svg>
  );
}
