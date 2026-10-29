import type { ProductArtName } from '@/content/products';

/* تصویرسازی محصولات صنایع دستی هلیله (SVG درون‌خطی) */

const WOOD = '#8a5a2b';
const WOOD2 = '#6b4220';
const NAVY = '#0a3e66';

const art: Record<ProductArtName, React.ReactNode> = {
  lenj: (
    <>
      <rect width="240" height="180" fill="#e8f1f8" />
      <circle cx="196" cy="34" r="16" fill="#f6d27a" />
      <path d="M0 120c20-8 40-8 60 0s40 8 60 0 40-8 60 0 40 8 60 0v60H0z" fill="#0a6fb5" opacity=".28" />
      {/* پایه چوبی ماکت */}
      <path d="M36 150h168l-10 18H46z" fill={WOOD2} />
      <rect x="30" y="144" width="180" height="9" rx="3" fill={WOOD} />
      <g className="pa-rock">
        {/* بدنه */}
        <path d="M30 108c30 8 140 8 180 0-4 20-14 32-30 36H62c-16-4-28-16-32-36z" fill={WOOD} stroke={WOOD2} strokeWidth="3" strokeLinejoin="round" />
        <path d="M34 114c34 7 138 7 172 0M40 126c30 6 130 6 160 0" stroke={WOOD2} strokeWidth="2" fill="none" />
        <path d="M30 108c-10-8-14-16-12-24 6 8 16 14 30 18z" fill={WOOD} stroke={WOOD2} strokeWidth="3" strokeLinejoin="round" />
        <path d="M210 108l8-12-14 4z" fill={WOOD} stroke={WOOD2} strokeWidth="3" strokeLinejoin="round" />
        {/* دکل و بادبان لاتین */}
        <path d="M118 108V26" stroke={WOOD2} strokeWidth="5" strokeLinecap="round" />
        <path d="M118 30c40 14 70 42 80 72H118z" fill="#f6f0e4" stroke={WOOD2} strokeWidth="3" strokeLinejoin="round" />
        <path d="M118 30c-24 16-40 40-46 72h46z" fill="#e9dcc0" stroke={WOOD2} strokeWidth="3" strokeLinejoin="round" />
        <path d="M118 26l16 5-16 5z" fill="#d9603a" />
        <path d="M118 36c-10 0-30 28-46 66M118 36c22 20 52 46 80 66" stroke="#c9b894" strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="122" r="3" fill="#f6f0e4" />
        <circle cx="100" cy="124" r="3" fill="#f6f0e4" />
        <circle cx="140" cy="124" r="3" fill="#f6f0e4" />
        <circle cx="180" cy="122" r="3" fill="#f6f0e4" />
      </g>
    </>
  ),
  mat: (
    <>
      <rect width="240" height="180" fill="#f6f0e4" />
      <rect y="150" width="240" height="30" fill="#e6dcc6" />
      {/* حصیر پهن‌شده */}
      <g>
        <path d="M20 118 58 52h170l-38 66z" fill="#d9b26a" stroke="#a8803d" strokeWidth="3" strokeLinejoin="round" />
        <path d="M20 118h170" stroke="#a8803d" strokeWidth="3" />
        <path d="M32 98 66 56M44 78l-6 0" stroke="none" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={`a${i}`} d={`M${34 + i * 17.5} 118 ${72 + i * 17.5} 52`} stroke="#b88d45" strokeWidth="1.6" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <path key={`b${i}`} d={`M${26 + i * 5.4} ${106 - i * 11} h${166}`} stroke="#c4974d" strokeWidth="1.3" opacity=".9" />
        ))}
        <path d="M30 100h160M40 84h160M50 68h160" stroke="#d9603a" strokeWidth="3.5" opacity=".85" />
        <path d="M24 112h166" stroke="#0a6fb5" strokeWidth="3" opacity=".7" />
      </g>
      {/* حصیر لوله‌شده */}
      <ellipse cx="206" cy="136" rx="16" ry="10" fill="#d9b26a" stroke="#a8803d" strokeWidth="3" />
      <ellipse cx="206" cy="136" rx="9" ry="5" fill="none" stroke="#a8803d" strokeWidth="2" />
      <path d="M190 136v-22a16 10 0 0 1 32 0v22" fill="#d9b26a" opacity="0" />
      {/* کپو: سینی/سبد بافته گرد */}
      <g className="pa-pop">
        <ellipse cx="68" cy="140" rx="46" ry="15" fill="#b88d45" stroke="#a8803d" strokeWidth="3" />
        <ellipse cx="68" cy="136" rx="46" ry="15" fill="#d9b26a" stroke="#a8803d" strokeWidth="3" />
        <ellipse cx="68" cy="136" rx="34" ry="10.5" fill="none" stroke="#a8803d" strokeWidth="2" />
        <ellipse cx="68" cy="136" rx="22" ry="7" fill="none" stroke="#d9603a" strokeWidth="2.5" />
        <ellipse cx="68" cy="136" rx="10" ry="3.5" fill="#a8803d" />
      </g>
    </>
  ),
  shell: (
    <>
      <rect width="240" height="180" fill="#f6f0e4" />
      {/* قاب چوبی */}
      <rect x="36" y="14" width="168" height="152" rx="6" fill={WOOD} stroke={WOOD2} strokeWidth="3" />
      <rect x="48" y="26" width="144" height="128" fill="#7fc1e3" stroke={WOOD2} strokeWidth="3" />
      <path d="M48 26h144v50H48z" fill="#bfe3f5" />
      <circle cx="166" cy="48" r="11" fill="#f6d27a" />
      <path d="M48 78c18-8 36-8 54 0s36 8 54 0 24-4 36-2v22H48z" fill="#0a6fb5" opacity=".45" />
      <path d="M48 112c14-6 30-6 46 0s30 6 46 0 36-6 52 0v42H48z" fill="#e9d6a8" />
      {/* صدف بادبزنی */}
      <g className="pa-pop">
        <path d="M96 140c-18-6-30-26-26-44 10-6 22-8 34-8s24 2 34 8c4 18-8 38-26 44z" fill="#f2b5a0" stroke="#c4694f" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M104 140V90M92 138 80 94M116 138l12-44M82 130 70 104M126 130l12-26" stroke="#c4694f" strokeWidth="2" />
        <path d="M94 144h20l-4 8h-12z" fill="#e8a18c" stroke="#c4694f" strokeWidth="2.5" strokeLinejoin="round" />
      </g>
      {/* حلزونی */}
      <path d="M156 138c0-10 8-16 16-14 8 2 10 12 4 18-8 8-22 4-20-4z" fill="#f6f0e4" stroke="#a8803d" strokeWidth="2.5" />
      <path d="M166 132c4 0 6 4 3 7" fill="none" stroke="#c4694f" strokeWidth="2" />
      {/* ستاره دریایی */}
      <path d="M68 134l4 8 9 1-6 6 2 9-9-4-8 4 2-9-6-6 9-1z" fill="#e07a5f" stroke="#b9553d" strokeWidth="1.5" strokeLinejoin="round" transform="translate(-2 -16) scale(1)" />
    </>
  ),
};

export default function ProductArt({ name }: { name: ProductArtName }) {
  return (
    <svg className="pa" viewBox="0 0 240 180" role="img" aria-hidden="true" focusable="false">
      {art[name]}
    </svg>
  );
}
