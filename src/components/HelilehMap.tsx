import type { Lang } from '@/content/types';
import { HELILEH, mapPoints, mapStrings, type MapKind } from '@/content/map';

const CX = 340;
const CY = 300;
const PX_PER_KM = 12; // هر ۵ کیلومتر = ۶۰ واحد

function project(lat: number, lon: number) {
  const kmE = (lon - HELILEH.lon) * Math.cos((HELILEH.lat * Math.PI) / 180) * 111.32;
  const kmN = (lat - HELILEH.lat) * 111.2;
  return { x: CX + kmE * PX_PER_KM, y: CY - kmN * PX_PER_KM, km: Math.hypot(kmE, kmN) };
}

const kindClass: Record<MapKind, string> = {
  village: 'hm-village',
  ancient: 'hm-ancient',
  fun: 'hm-fun',
  hub: 'hm-hub',
};

type Variant = 'wide' | 'narrow';

export default function HelilehMap({ lang, locale }: { lang: Lang; locale: string }) {
  const s = mapStrings[lang];
  const nf = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
  const pts = mapPoints.map((p, i) => ({ ...p, n: i + 1, ...project(p.lat, p.lon) }));
  const km = (v: number) => (v < 10 ? nf1.format(Math.round(v * 10) / 10) : nf.format(Math.round(v)));
  const rings = [5, 10, 15];
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${HELILEH.lat},${HELILEH.lon}`;

  /** wide: برچسب‌های کامل کنار نقشه — narrow: نقشه برش‌خورده با شماره و فهرست زیر آن */
  const renderSvg = (v: Variant) => {
    const wide = v === 'wide';
    return (
      <svg
        className={`hm-svg hm-svg-${v}`}
        viewBox={wide ? '0 80 680 460' : '175 85 430 410'}
        role="img"
        aria-label={s.aria}
        focusable="false"
      >
        <title>{s.aria}</title>
        {rings.map((r) => (
          <g key={r}>
            <circle cx={CX} cy={CY} r={r * PX_PER_KM} className="hm-ring" />
            <text x={CX} y={CY + r * PX_PER_KM + 14} textAnchor="middle" className="hm-sub">
              {nf.format(r)} {s.km}
            </text>
          </g>
        ))}

        {wide &&
          pts.map((p) => (
            <line
              key={`l-${p.id}`}
              className="hm-lead-line"
              x1={p.x}
              y1={p.y}
              x2={p.side === 'L' ? 186 : 494}
              y2={p.ly! - 5}
            />
          ))}

        {pts.map((p) => (
          <g key={p.id} className={kindClass[p.kind]}>
            {wide ? (
              <circle cx={p.x} cy={p.y} r={7} className="hm-dot" />
            ) : (
              <>
                <circle cx={p.x} cy={p.y} r={12} className="hm-dot" />
                <text x={p.x} y={p.y + 4.5} textAnchor="middle" className="hm-num">
                  {nf.format(p.n)}
                </text>
              </>
            )}
          </g>
        ))}

        <g className="hm-village">
          <circle cx={CX} cy={CY} r={wide ? 11 : 13} className="hm-dot" />
          <circle cx={CX} cy={CY} r={4} className="hm-core" />
        </g>

        {wide &&
          pts.map((p) => (
            <g key={`t-${p.id}`}>
              <text x={p.side === 'L' ? 180 : 500} y={p.ly} textAnchor={p.side === 'L' ? 'end' : 'start'} className="hm-ttl">
                {p.name[lang]}
              </text>
              <text x={p.side === 'L' ? 180 : 500} y={p.ly! + 17} textAnchor={p.side === 'L' ? 'end' : 'start'} className="hm-sub">
                {km(p.km)} {s.km}
              </text>
            </g>
          ))}

        {wide && (
          <>
            <line x1={CX} y1={CY - 13} x2={CX} y2={CY - 82} className="hm-lead-line" />
            <text x={CX} y={CY - 90} textAnchor="middle" className="hm-ttl hm-center">
              {s.center}
            </text>
          </>
        )}

        <text x={wide ? 640 : 585} y={wide ? 106 : 112} textAnchor="middle" className="hm-sub">
          N
        </text>
        <path
          d={wide ? 'M640 140V116M635 122L640 114L645 122' : 'M585 146V122M580 128L585 120L590 128'}
          className="hm-north"
        />

        {wide && (
          <g transform="translate(40 518)">
            {(['village', 'ancient', 'fun', 'hub'] as MapKind[]).map((k, i) => (
              <g key={k} transform={`translate(${[0, 90, 250, 400][i]} 0)`} className={kindClass[k]}>
                <circle r={5} className="hm-dot" />
                <text x={11} y={4} textAnchor="start" className="hm-sub">
                  {s.kinds[k]}
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    );
  };

  return (
    <section className="helileh-map" aria-labelledby="helileh-map-title" lang={lang}>
      <div className="container">
        <h2 id="helileh-map-title">{s.title}</h2>
        <p className="hm-lead">{s.lead}</p>

        <div className="hm-card">
          {renderSvg('wide')}
          {renderSvg('narrow')}

          <ol className="hm-list" aria-label={s.listTitle}>
            <li className="hm-village">
              <span className="hm-badge-html" aria-hidden="true">
                ★
              </span>
              <span className="hm-list-name">{s.center}</span>
              <span className="hm-list-km">{s.listCenter}</span>
            </li>
            {pts.map((p) => (
              <li key={p.id} className={kindClass[p.kind]}>
                <span className="hm-badge-html" aria-hidden="true">
                  {nf.format(p.n)}
                </span>
                <span className="hm-list-name">{p.name[lang]}</span>
                <span className="hm-list-km">
                  {km(p.km)} {s.km}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="hm-note">{s.note}</p>
        <a className="hm-link" href={gmaps} target="_blank" rel="noopener noreferrer">
          {s.openGoogle}
        </a>
      </div>
    </section>
  );
}
