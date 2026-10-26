import type { Lang } from '@/content/types';
import { calUi, entries, gregMonths, monthNames, sources, windMeta, type CalEntry } from '@/content/calendar';

const MONTH_LEN = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];

function digits(n: number | string, lang: Lang): string {
  const s = String(n);
  return lang === 'fa' ? s.replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)]) : s;
}

/* تبدیل تقریبی تاریخ خورشیدی به میلادی (نوروز = ۲۱ مارس) */
function greg(m: number, d: number): { day: number; mon: number } {
  let doy = 0;
  for (let i = 0; i < m - 1; i++) doy += MONTH_LEN[i];
  const dt = new Date(Date.UTC(2027, 2, 21 + doy + d - 1));
  return { day: dt.getUTCDate(), mon: dt.getUTCMonth() };
}

function endOf(e: CalEntry): [number, number] {
  return e.end ?? [e.m, e.d2 ?? e.d1];
}

function dayOfYear(m: number, d: number): number {
  let n = 0;
  for (let i = 0; i < m - 1; i++) n += MONTH_LEN[i];
  return n + d - 1;
}

function gregRange(e: CalEntry, lang: Lang): string {
  const a = greg(e.m, e.d1);
  const [em, ed] = endOf(e);
  const b = e.end || e.d2 ? greg(em, ed) : a;
  const mn = gregMonths[lang];
  const A = digits(a.day, lang);
  const B = digits(b.day, lang);
  if (!e.end && !e.d2) return `${A} ${mn[a.mon]}`;
  if (e.end) return `${mn[a.mon]} – ${mn[b.mon]}`;
  return a.mon === b.mon ? `${A}–${B} ${mn[a.mon]}` : `${A} ${mn[a.mon]} – ${B} ${mn[b.mon]}`;
}

function dateLabel(e: CalEntry, lang: Lang): string {
  if (e.label) return e.label[lang];
  return e.d2 && !e.end ? `${digits(e.d1, lang)}–${digits(e.d2, lang)}` : digits(e.d1, lang);
}

/* تصویر کوچک باد روی دریا؛ شدت بیشتر یعنی خط‌های بیشتر و قایق کج‌تر */
function WindArt({ strong }: { strong?: boolean }) {
  return (
    <svg className={strong ? 'wind-art strong' : 'wind-art'} viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={strong ? 'wa-s' : 'wa-m'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={strong ? '#5b6b86' : '#8fc4e6'} />
          <stop offset="1" stopColor={strong ? '#1d3f6b' : '#2f7fc0'} />
        </linearGradient>
      </defs>
      <rect width="320" height="120" fill={`url(#${strong ? 'wa-s' : 'wa-m'})`} />
      <g className="wa-cloud" fill="#fff" opacity={strong ? 0.35 : 0.6}>
        <path d="M20 30c0-9 8-15 17-13 4-10 22-10 27 2 10-1 16 7 14 12H20z" />
        <path d="M200 24c0-8 7-13 15-11 4-9 20-9 24 2 9-1 14 6 12 9h-51z" />
      </g>
      <g className="wa-gust" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="3.2">
        <path d="M-20 44h110c14 0 14-12 0-12" strokeDasharray="90 40" opacity=".85" />
        <path d="M60 62h150c16 0 16-14 0-14" strokeDasharray="110 50" opacity=".7" />
        {strong ? <path d="M-10 80h130c14 0 14-12 0-12" strokeDasharray="80 36" opacity=".6" /> : null}
        {strong ? <path d="M120 28h120c12 0 12-10 0-10" strokeDasharray="70 40" opacity=".55" /> : null}
      </g>
      <path className="wa-sea" d="M0 96q20-8 40 0t40 0 40 0 40 0 40 0 40 0 40 0 40 0V120H0z" fill="#0a3e66" opacity=".85" />
      <g className="wa-boat" transform="translate(236 80)">
        <path d="M-26 8h52l-8 12h-36z" fill="#4a2e1c" />
        <path d="M0-34v42" stroke="#2b1a10" strokeWidth="2" />
        <path d="M2-32v36h22z" fill="#f6f0e4" />
        <path d="M-2-24v28h-16z" fill="#d9c7a6" />
      </g>
    </svg>
  );
}

function Sources({ keys, lang, label }: { keys?: string[]; lang: Lang; label: string }) {
  if (!keys || !keys.length) return null;
  return (
    <span className="src">
      {label}:{' '}
      {keys.map((k, i) => {
        const x = sources[k];
        return (
          <span key={k}>
            {i > 0 ? '؛ ' : ''}
            {x.url ? (
              <a href={x.url} target="_blank" rel="noopener noreferrer" dir="auto">
                {x.name[lang]}
              </a>
            ) : (
              x.name[lang]
            )}
          </span>
        );
      })}
    </span>
  );
}

/* نمودار بازهٔ وزش بادها در طول سال (از نوروز تا اسفند) */
function WindChart({ lang, winds, title, lead, seasons }: { lang: Lang; winds: CalEntry[]; title: string; lead: string; seasons: string[] }) {
  const names = monthNames[lang];
  const sorted = [...winds].sort((a, b) => dayOfYear(a.m, a.d1) - dayOfYear(b.m, b.d1));
  // موقعیت بر پایهٔ ماه (دوازده ستون برابر) تا با خطوط شبکه هم‌خوان باشد
  const pos = (m: number, d: number) => ((m - 1 + d / MONTH_LEN[m - 1]) / 12) * 100;
  return (
    <div className="wind-chart">
      <h3>{title}</h3>
      <p className="cal-lead">{lead}</p>
      <div className="wc-grid" role="table" aria-label={title}>
        <div className="wc-row wc-head" role="row" aria-hidden="true">
          <span className="wc-name" />
          <span className="wc-track">
            {names.map((n, i) => (
              <span key={n} className={`wc-m${i % 3 === 0 ? ' s' : ''}`}>
                <em>{n}</em>
                {i % 3 === 0 ? <b>{seasons[i / 3]}</b> : null}
              </span>
            ))}
          </span>
        </div>
        {sorted.map((e) => {
          const [em, ed] = endOf(e);
          const a = pos(e.m, e.d1 - 1);
          const b = pos(em, ed);
          const segs: [number, number][] = b > a ? [[a, b]] : [[a, 100], [0, b]];
          const strong = e.id === 'limehr';
          return (
            <div key={e.id} className="wc-row" role="row">
              <span className="wc-name" role="rowheader">
                {e.t[lang].title}
              </span>
              <span className="wc-track" role="cell">
                {segs.map(([x, y], i) => (
                  <span
                    key={i}
                    className={`wc-bar${strong ? ' strong' : ''}`}
                    style={{ insetInlineStart: `${x}%`, width: `${Math.max(y - x, 1.6)}%` }}
                    title={`${e.t[lang].title}: ${dateLabel(e, lang)} ${names[e.m - 1]}`}
                  />
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function CalendarView({ lang }: { lang: Lang }) {
  const u = calUi[lang];
  const names = monthNames[lang];
  const winds = entries.filter((e) => e.kind === 'wind');
  const byMonth = names.map((_, i) =>
    entries.filter((e) => e.m === i + 1).sort((a, b) => a.d1 - b.d1),
  );
  const kindLabel = (k: string) => (k === 'wind' ? u.kindWind : u.kindAncient);

  return (
    <section className="cal">
      <div className="cal-legend" aria-hidden="true">
        <span className="tag wind">{u.kindWind}</span>
        <span className="tag ancient">{u.kindAncient}</span>
      </div>

      <h2 className="accent">{u.windsTitle}</h2>
      <p className="cal-lead">{u.windsLead}</p>
      <div className="wind-cards">
        {winds.filter((e) => e.id === 'lakizab' || e.id === 'limehr').map((e) => {
          const meta = windMeta[lang][e.id];
          const strong = e.id === 'limehr';
          return (
            <article key={e.id} className={`wind-card ${strong ? 'is-strong' : 'is-mild'}`} data-sound="about">
              <WindArt strong={strong} />
              <div className="wind-body">
                <p className="wind-date">
                  <b>{dateLabel(e, lang)}</b>
                  <span>{names[e.m - 1]}</span>
                  <small>{gregRange(e, lang)}</small>
                </p>
                <h3>{e.t[lang].title}</h3>
                <p className="aka">
                  {u.knownAs}: {meta.aka}
                </p>
                <p>{e.t[lang].desc}</p>
                <p className="wind-tip">{meta.tip}</p>
                <p className="date-note">{meta.dateNote}</p>
                <Sources keys={e.src} lang={lang} label={u.sourceLabel} />
                <span className="wind-strength">{meta.strength}</span>
              </div>
            </article>
          );
        })}
      </div>

      <WindChart lang={lang} winds={winds} title={u.chartTitle} lead={u.chartLead} seasons={u.seasonLabels} />

      <h2 className="accent">{u.tableTitle}</h2>
      <div className="cal-table-wrap">
        <table className="cal-table">
          <caption className="sr-only">{u.title}</caption>
          <thead>
            <tr>
              <th scope="col">{u.colDate}</th>
              <th scope="col">{u.colEvent}</th>
              <th scope="col">{u.colAbout}</th>
            </tr>
          </thead>
          {byMonth.map((list, i) => (
            <tbody key={i} className={`season-${Math.floor(i / 3)}`}>
              <tr className="m-head">
                <th colSpan={3} scope="colgroup">
                  <span className="m-name">{names[i]}</span>
                  <span className="m-season">{u.seasonLabels[Math.floor(i / 3)]}</span>
                </th>
              </tr>
              {list.map((e) => (
                <tr key={e.id} className={`ev ${e.kind}`}>
                  <th scope="row" className="d">
                    <span className="day">{dateLabel(e, lang)}</span>
                    <small>{gregRange(e, lang)}</small>
                  </th>
                  <td className="t">
                    <strong>{e.t[lang].title}</strong>
                    <span className={`tag ${e.kind}`}>{kindLabel(e.kind)}</span>
                  </td>
                  <td className="x">
                    {e.t[lang].desc}
                    <Sources keys={e.src} lang={lang} label={u.sourceLabel} />
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <p className="notice cal-note">{u.note}</p>
    </section>
  );
}
