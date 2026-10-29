import EventArt from '@/components/EventArt';
import { Rich } from '@/components/Rich';
import { localEvents, localEventsUi } from '@/content/localEvents';
import type { Lang } from '@/content/types';

/** جدول گرافیکی رویدادهای هلیله (بالای تقویم باستانی) */
export default function LocalEvents({ lang }: { lang: Lang }) {
  const u = localEventsUi[lang];
  return (
    <section className="block ev-block">
      <h2>{u.title}</h2>
      <p className="ev-lead">{u.lead}</p>
      <table className="ev-table">
        <thead>
          <tr>
            <th scope="col">{u.cols.event}</th>
            <th scope="col">{u.cols.date}</th>
            <th scope="col">{u.cols.time}</th>
            <th scope="col">{u.cols.place}</th>
            <th scope="col">{u.cols.entry}</th>
          </tr>
        </thead>
        <tbody>
          {localEvents.map((e, i) => {
            const t = e.t[lang];
            return (
              <tr key={e.id} className={`ev-row c${i % 6}`} data-sound="events">
                <td className="ev-main">
                  <div className="ev-cell">
                  <span className="ev-pic">
                    {e.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/events/${e.photo}`} alt={t.title} loading="lazy" />
                    ) : (
                      <EventArt name={e.art} />
                    )}
                  </span>
                  <span className="ev-text">
                    <strong>{t.title}</strong>
                    <span>
                      <Rich text={t.desc} />
                    </span>
                    {e.full ? (
                      <details className="ev-more">
                        <summary>{u.more}</summary>
                        {e.slogan ? <blockquote>{e.slogan[lang]}</blockquote> : null}
                        {e.full[lang].map((para, k) => (
                          <p key={k}>{para}</p>
                        ))}
                        {e.author ? (
                          <small>
                            {u.by}: {e.author[lang]}
                          </small>
                        ) : null}
                      </details>
                    ) : null}
                    <small>
                      {u.organizer}: {u.community}
                    </small>
                  </span>
                  </div>
                </td>
                <td data-label={u.cols.date}>
                  <span className="ev-date">{t.date}</span>
                  {e.lunar ? <em className="ev-chip">{u.lunar}</em> : null}
                </td>
                <td data-label={u.cols.time}>{t.time}</td>
                <td data-label={u.cols.place}>{t.place}</td>
                <td data-label={u.cols.entry}>
                  <span className="ev-free">{u.free}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="ev-src">
        <a href={u.sourceUrl} target="_blank" rel="noopener noreferrer">
          {u.source}
        </a>
      </p>
    </section>
  );
}
