/* تصویرسازی تخت و متحرک برای چهار کارت صفحهٔ اصلی (معرفی، اقامتگاه، جاذبه‌ها، رستوران‌ها) */

export type TileArtName = 'about' | 'stay' | 'attractions' | 'restaurants';

const Shine = () => <path className="ta-shine" d="M0 0h96L0 230z" fill="#fff" opacity=".22" />;

function About() {
  return (
    <>
      <rect width="280" height="400" fill="#c8e3f5" />
      {/* خورشید */}
      <g transform="translate(212 96)">
        <g className="ta-spin" stroke="#ffd166" strokeWidth="5" strokeLinecap="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d="M0 -50v-14" transform={`rotate(${a})`} />
          ))}
        </g>
      </g>
      <circle className="ta-pulse" cx="212" cy="96" r="36" fill="#ffd166" />
      {/* ابر */}
      <g className="ta-cloud" fill="#fff" opacity=".9">
        <path d="M30 70c0-10 8-17 18-15 5-11 24-11 29 2 10-1 16 7 14 13H30z" />
      </g>
      <g className="ta-cloud slow" fill="#fff" opacity=".7">
        <path d="M120 140c0-8 7-14 15-12 4-9 20-9 24 2 8-1 13 6 11 10h-50z" />
      </g>
      {/* دریا */}
      <rect y="200" width="280" height="200" fill="#336db5" />
      <path
        className="ta-dash"
        d="M-20 252q35-14 70 0t70 0 70 0 70 0 70 0"
        fill="none"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="26 24"
      />
      <path
        className="ta-dash rev"
        d="M-20 292q35-14 70 0t70 0 70 0 70 0 70 0"
        fill="none"
        stroke="#fff"
        strokeOpacity=".6"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="20 28"
      />
      {/* ساحل */}
      <path d="M0 340C70 318 150 340 280 306V400H0z" fill="#e6d3a6" />
      {/* خانه */}
      <rect x="34" y="276" width="116" height="92" fill="#f3efe4" />
      <path d="M22 280 92 220l70 60z" fill="#dc6a47" />
      <rect x="80" y="314" width="28" height="54" rx="14" fill="#1d3f6b" />
      <circle className="ta-glow" cx="52" cy="304" r="8" fill="#f6cf6e" />
      <circle className="ta-glow d2" cx="132" cy="304" r="8" fill="#f6cf6e" />
      {/* نخل */}
      <g className="ta-sway" transform="translate(232 346)">
        <path d="M0 0c4-28 2-56 10-84" fill="none" stroke="#1d3f6b" strokeWidth="6" strokeLinecap="round" />
        <g transform="translate(10 -84)" fill="none" stroke="#2f8f6b" strokeWidth="5" strokeLinecap="round">
          <path d="M0 0c-14-14-32-12-44 2" />
          <path d="M0 0c-6-20-24-26-40-18" />
          <path d="M0 0c8-20 24-24 38-14" />
          <path d="M0 0c14-10 30-6 40 8" />
        </g>
      </g>
      <Shine />
    </>
  );
}

function Stay() {
  const stars: [number, number, number][] = [
    [212, 62, 3.5],
    [150, 40, 2.5],
    [246, 120, 2.5],
    [40, 150, 2.5],
    [96, 96, 2],
    [190, 118, 2],
  ];
  return (
    <>
      <defs>
        <linearGradient id="ta-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c2563" />
          <stop offset="1" stopColor="#2f5aa0" />
        </linearGradient>
      </defs>
      <rect width="280" height="400" fill="url(#ta-night)" />
      {/* ماه */}
      <circle className="ta-pulse" cx="60" cy="76" r="22" fill="#fff6d8" />
      <circle cx="70" cy="70" r="19" fill="#223080" />
      {/* ستاره‌ها */}
      {stars.map(([x, y, r], i) => (
        <circle key={i} className={`ta-twinkle t${i % 3}`} cx={x} cy={y} r={r} fill="#fff" />
      ))}
      {/* خانه */}
      <rect y="214" width="280" height="150" fill="#f3efe4" />
      <rect x="96" y="148" width="88" height="70" fill="#f3efe4" />
      <path d="M84 152 140 104l56 48z" fill="#dc6a47" />
      <rect className="ta-glow" x="120" y="166" width="40" height="30" rx="15" fill="#f6cf6e" />
      <rect className="ta-glow" x="12" y="246" width="56" height="64" rx="24" fill="#f6cf6e" />
      <rect className="ta-glow d2" x="212" y="246" width="56" height="64" rx="24" fill="#f6cf6e" />
      <rect x="110" y="268" width="60" height="96" rx="30" fill="#dc6a47" />
      <circle cx="158" cy="320" r="3.5" fill="#f3efe4" />
      {/* زمین */}
      <rect y="362" width="280" height="38" fill="#bfae88" />
      {/* دودکش و دود */}
      <Shine />
    </>
  );
}

function Attractions() {
  return (
    <>
      <defs>
        <linearGradient id="ta-dusk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ee8a62" />
          <stop offset="1" stopColor="#f7c08c" />
        </linearGradient>
        <linearGradient id="ta-deep" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4aa3b8" />
          <stop offset="1" stopColor="#1f3f68" />
        </linearGradient>
        <clipPath id="ta-sea-clip">
          <rect width="280" height="262" />
        </clipPath>
      </defs>
      <rect width="280" height="400" fill="url(#ta-dusk)" />
      <g clipPath="url(#ta-sea-clip)">
        <circle className="ta-rise" cx="72" cy="262" r="66" fill="#e9694b" />
      </g>
      {/* مرغ‌ها */}
      <g className="ta-fly" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path className="ta-wing" d="M30 54q14-14 28 0 14-14 28 0" />
        <path className="ta-wing d2" d="M110 96q9-9 18 0 9-9 18 0" strokeWidth="4" />
      </g>
      {/* دریا */}
      <rect y="262" width="280" height="138" fill="url(#ta-deep)" />
      <path
        className="ta-dash"
        d="M-20 304q35-12 70 0t70 0 70 0 70 0 70 0"
        fill="none"
        stroke="#d6eef2"
        strokeOpacity=".8"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="30 22"
      />
      <path
        className="ta-dash rev"
        d="M-20 346q35-12 70 0t70 0 70 0 70 0 70 0"
        fill="none"
        stroke="#d6eef2"
        strokeOpacity=".5"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="22 26"
      />
      {/* قایق بادبانی */}
      <g className="ta-bob" transform="translate(206 278)">
        <path d="M0 -112v108" stroke="#7a4a2c" strokeWidth="4" strokeLinecap="round" />
        <path d="M4 -108v100h60z" fill="#fff" />
        <path d="M-4 -86v78h-44z" fill="#f6e3c8" />
        <path d="M-62 -2h140l-20 24h-100z" fill="#f3efe4" />
        <path d="M-56 6h128" stroke="#dc6a47" strokeWidth="3" />
      </g>
      <Shine />
    </>
  );
}

function Restaurants() {
  return (
    <>
      <rect width="280" height="400" fill="#fdf0d8" />
      {/* بشقاب */}
      <circle cx="140" cy="214" r="138" fill="#3a73b8" />
      <circle cx="140" cy="214" r="122" fill="#fff" />
      <g transform="translate(140 214)">
        <circle className="ta-spin-slow" r="96" fill="none" stroke="#f0c96a" strokeWidth="4" strokeLinecap="round" strokeDasharray="6 12" />
      </g>
      {/* ماهی */}
      <g className="ta-swim">
        <ellipse cx="124" cy="214" rx="84" ry="46" fill="#ef8466" />
        <path d="M198 214l54-36v72z" fill="#ec6a4a" />
        <path d="M96 176q26-22 60-4-30 4-60 4z" fill="#ec6a4a" />
        <circle cx="84" cy="200" r="8" fill="#fff" />
        <circle cx="82" cy="200" r="4" fill="#2b1a10" />
        <path d="M112 190q14 24 0 48" fill="none" stroke="#e25d3f" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* بخار */}
      <g fill="none" strokeWidth="11" strokeLinecap="round">
        <path className="ta-steam" d="M104 112c-16 22 14 30 0 54" stroke="#eab9a8" />
        <path className="ta-steam d2" d="M146 98c-16 22 14 30 0 54" stroke="#dc6a47" />
        <path className="ta-steam d3" d="M186 116c-14 20 12 28 0 48" stroke="#f3d3cc" />
      </g>
      {/* تزئین */}
      <circle className="ta-bounce" cx="10" cy="344" r="22" fill="#fbdc6a" />
      <circle className="ta-bounce d2" cx="272" cy="348" r="17" fill="#5aab6b" />
      <Shine />
    </>
  );
}

export function TileArt({ name }: { name: TileArtName }) {
  return (
    <svg
      className={`tile-svg ta-${name}`}
      viewBox="0 0 280 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {name === 'about' ? <About /> : null}
      {name === 'stay' ? <Stay /> : null}
      {name === 'attractions' ? <Attractions /> : null}
      {name === 'restaurants' ? <Restaurants /> : null}
    </svg>
  );
}
