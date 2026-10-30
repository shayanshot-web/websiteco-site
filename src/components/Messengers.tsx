import { messengers, messengerUi, MESSENGER_NUMBER, type MessengerId } from '@/content/messengers';
import type { Lang } from '@/content/types';

/* نشان‌های ساده و اختصاصی پیام‌رسان‌ها (SVG درون‌خطی) */
function Glyph({ id }: { id: MessengerId }) {
  switch (id) {
    case 'whatsapp':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 4.5a11.2 11.2 0 0 0-9.6 16.9L5 27.5l6.3-1.6A11.2 11.2 0 1 0 16 4.5z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M12.2 10.8c.4-.6 1-.5 1.3.1l.9 1.9c.2.4 0 .8-.3 1.1l-.6.6c.9 1.7 2.1 2.8 3.9 3.7l.7-.8c.3-.4.7-.4 1.1-.2l1.8 1c.5.3.6.8.2 1.3-.7 1-1.8 1.5-3 1.2-3.9-1-6.5-3.6-7.4-6.4-.3-.9 0-1.7.4-2.5z" fill="#fff" />
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M5 15.2 26 7l-3.6 17.2c-.3 1.1-.9 1.3-1.8.8l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5.2 9.4-8.5c.4-.4-.1-.6-.6-.2l-11.6 7.3-5-1.6c-1.1-.3-1.1-1.1.2-1.7z" fill="#fff" />
        </svg>
      );
    case 'eitaa':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M9 22c2-1 3-3 3.5-6.5C13 12 15 9.5 18 9c3-.5 5 1.2 5 3.5 0 2-1.3 3-3 3.3 1.5.8 2 2 1.8 3.5-.4 2.5-3 3.7-6.3 3.7-1.7 0-3.1-.3-4.5-1z" fill="#fff" />
          <circle cx="19.5" cy="12.5" r="1.1" fill="#e8710a" />
        </svg>
      );
    case 'bale':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M16 6.5c-5.500 0-10 3.700-10 8.300 0 2.600 1.4 4.900 3.700 6.400L9 26l4.800-2.700c.7.100 1.4.2 2.2.2 5.500 0 10-3.700 10-8.300S21.500 6.5 16 6.5z" fill="#fff" />
          <circle cx="11.8" cy="14.8" r="1.4" fill="#00a98f" />
          <circle cx="16" cy="14.8" r="1.4" fill="#00a98f" />
          <circle cx="20.2" cy="14.8" r="1.4" fill="#00a98f" />
        </svg>
      );
  }
}

export default function Messengers({ lang, variant = 'light' }: { lang: Lang; variant?: 'light' | 'dark' | 'compact' }) {
  const u = messengerUi[lang];
  if (variant === 'compact') {
    return (
      <ul className="msg-compact" aria-label={u.title}>
        {messengers.map((m) => (
          <li key={m.id}>
            <a className={`msg-btn msg-${m.id}`} href={m.href} target="_blank" rel="noopener noreferrer" aria-label={`${m.label[lang]}: ${MESSENGER_NUMBER}`} title={m.label[lang]} data-sound="pop">
              <span className="msg-ico">
                <Glyph id={m.id} />
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className={`msg msg-${variant}`}>
      <p className="msg-title">
        {u.title} <span dir="ltr">{MESSENGER_NUMBER}</span>
      </p>
      <ul className="msg-list">
        {messengers.map((m) => (
          <li key={m.id}>
            <a
              className={`msg-btn msg-${m.id}`}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${m.label[lang]}: ${MESSENGER_NUMBER}`}
              data-sound="pop"
            >
              <span className="msg-ico">
                <Glyph id={m.id} />
              </span>
              <span className="msg-name">{m.label[lang]}</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="msg-hint">{u.hint}</p>
    </div>
  );
}
