import type { Lang } from '@/content/types';
import { calUi, entries, gregMonths, monthNames, type CalEntry } from '@/content/calendar';

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

function gregDate(e: CalEntry, lang: Lang): string {
  const a = greg(e.m, e.d1);
  return `${digits(a.day, lang)} ${gregMonths[lang][a.mon]}`;
}

function dateLabel(e: CalEntry, lang: Lang): string {
  return e.label ? e.label[lang] : digits(e.d1, lang);
}

export default function CalendarView({ lang }: { lang: Lang }) {
  const u = calUi[lang];
  const names = monthNames[lang];
  const byMonth = names.map((_, i) => entries.filter((e) => e.m === i + 1).sort((a, b) => a.d1 - b.d1));

  return (
    <section className="cal">
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
                <tr key={e.id} className="ev ancient">
                  <th scope="row" className="d">
                    <span className="day">{dateLabel(e, lang)}</span>
                    <small>{gregDate(e, lang)}</small>
                  </th>
                  <td className="t">
                    <strong>{e.t[lang].title}</strong>
                    <span className="tag ancient">{u.kindAncient}</span>
                  </td>
                  <td className="x">{e.t[lang].desc}</td>
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
