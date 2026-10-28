import type { Section } from '@/content/types';

/**
 * عبارت‌های داخل [ ] در محتوای وردپرس یعنی «هنوز تکمیل نشده».
 * اینجا با ظاهر متفاوت نشان داده می‌شوند تا مدیریت آن‌ها را پیدا و تکمیل کند.
 * لینک داخل متن (برای منبع‌ها) به شکل <<متن لینک|https://آدرس>> نوشته می‌شود.
 */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(<<[^|>]+\|https?:\/\/[^>]+>>|\[[^\]]+\])/g).filter((s) => s !== '');
  return (
    <>
      {parts.map((s, i) => {
        const link = /^<<([^|>]+)\|(https?:\/\/[^>]+)>>$/.exec(s);
        if (link) {
          return (
            <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">
              {link[1]}
            </a>
          );
        }
        return /^\[[^\]]+\]$/.test(s) ? (
          <mark key={i} className="todo">
            {s.slice(1, -1)}
          </mark>
        ) : (
          <span key={i}>{s}</span>
        );
      })}
    </>
  );
}

export function Sections({ sections }: { sections: Section[] }) {
  return (
    <>
      {sections.map((s, i) => {
        const H = s.level === 3 ? 'h3' : 'h2';
        return (
          <section key={i} className="block">
            {s.h ? <H>{s.h}</H> : null}
            {s.p.map((t, j) => (
              <p key={j}>
                <Rich text={t} />
              </p>
            ))}
          </section>
        );
      })}
    </>
  );
}
