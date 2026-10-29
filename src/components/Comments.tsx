'use client';

import { useEffect, useState, type FormEvent } from 'react';
import type { Lang } from '@/content/types';

interface Item {
  name: string;
  text: string;
  rating: number;
  created: number;
}

const T: Record<Lang, Record<string, string>> = {
  fa: {
    btn: 'نظرها', title: 'نظر شما دربارهٔ تجربه‌های هلیله', empty: 'هنوز نظری ثبت نشده؛ اولین نفر باشید.',
    name: 'نام شما', text: 'نظر شما', rating: 'امتیاز', send: 'ثبت نظر', sending: 'در حال ارسال…',
    ok: 'ممنون! نظر شما پس از تأیید مدیریت در این بخش نمایش داده می‌شود.',
    error: 'ثبت نظر انجام نشد؛ لطفاً کمی بعد دوباره تلاش کنید.', links: 'لطفاً در نظر خود لینک نگذارید.',
    loadErr: 'بارگذاری نظرها ممکن نشد.', stars: 'از ۵',
  },
  en: {
    btn: 'Reviews', title: 'Share your experience in Helileh', empty: 'No reviews yet — be the first.',
    name: 'Your name', text: 'Your review', rating: 'Rating', send: 'Submit review', sending: 'Sending…',
    ok: 'Thank you! Your review will appear here after the administration approves it.',
    error: 'Could not submit your review. Please try again later.', links: 'Please do not include links.',
    loadErr: 'Could not load reviews.', stars: 'of 5',
  },
  ru: {
    btn: 'Отзывы', title: 'Поделитесь впечатлениями о Хелиле', empty: 'Пока нет отзывов — будьте первым.',
    name: 'Ваше имя', text: 'Ваш отзыв', rating: 'Оценка', send: 'Отправить', sending: 'Отправка…',
    ok: 'Спасибо! Отзыв появится здесь после одобрения администрацией.',
    error: 'Не удалось отправить отзыв. Попробуйте позже.', links: 'Пожалуйста, не добавляйте ссылки.',
    loadErr: 'Не удалось загрузить отзывы.', stars: 'из 5',
  },
};

export default function Comments({ lang }: { lang: Lang }) {
  const t = T[lang];
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error' | 'links'>('idle');

  useEffect(() => {
    let off = false;
    fetch('/comments.php')
      .then((r) => r.json())
      .then((d: { items?: Item[] }) => !off && setItems(d.items ?? []))
      .catch(() => !off && setFailed(true));
    return () => {
      off = true;
    };
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch('/comments.php', { method: 'POST', body: new FormData(form) });
      const d = (await res.json()) as { ok?: boolean; reason?: string };
      if (res.ok && d.ok) {
        setStatus('ok');
        setRating(0);
        form.reset();
      } else setStatus(d.reason === 'links' ? 'links' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const fmt = (ts: number) => new Date(ts * 1000).toLocaleDateString(lang === 'fa' ? 'fa-IR' : lang === 'ru' ? 'ru-RU' : 'en-GB');
  const count = items?.length ?? 0;

  return (
    <div className="cm" id="comments">
      <button type="button" className="btn btn-blue cm-toggle" aria-expanded={open} onClick={() => setOpen(!open)} data-sound="pop">
        <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
          <path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        {t.btn}
        {count ? <span className="cm-count">{count}</span> : null}
      </button>

      {open ? (
        <div className="cm-panel">
          <h3>{t.title}</h3>
          <form className="contact-form cm-form" onSubmit={onSubmit}>
            <input type="hidden" name="lang" value={lang} />
            <input type="hidden" name="rating" value={rating} />
            <div className="hp" aria-hidden="true">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label>
              <span>{t.name}</span>
              <input type="text" name="name" required maxLength={60} autoComplete="name" />
            </label>
            <div className="cm-rate" role="radiogroup" aria-label={t.rating}>
              <span>{t.rating}</span>
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} className={n <= rating ? 'on' : ''} aria-label={`${n} ${t.stars}`} aria-pressed={n === rating} onClick={() => setRating(n === rating ? 0 : n)}>
                  ★
                </button>
              ))}
            </div>
            <label>
              <span>{t.text}</span>
              <textarea name="text" required rows={4} maxLength={800} minLength={3} />
            </label>
            <button type="submit" className="btn btn-navy" disabled={status === 'sending'}>
              {status === 'sending' ? t.sending : t.send}
            </button>
            <p className={`form-status ${status === 'ok' ? 'ok' : status === 'idle' || status === 'sending' ? '' : 'error'}`} role="status" aria-live="polite">
              {status === 'ok' ? t.ok : status === 'error' ? t.error : status === 'links' ? t.links : ''}
            </p>
          </form>

          {failed ? (
            <p className="muted">{t.loadErr}</p>
          ) : items && items.length === 0 ? (
            <p className="muted">{t.empty}</p>
          ) : (
            <ul className="cm-list">
              {(items ?? []).map((c, i) => (
                <li key={i} className="cm-item">
                  <header>
                    <strong>{c.name}</strong>
                    {c.rating ? (
                      <span className="cm-stars" aria-label={`${c.rating} ${t.stars}`}>
                        {'★'.repeat(c.rating)}
                        <i>{'★'.repeat(5 - c.rating)}</i>
                      </span>
                    ) : null}
                    <small>{fmt(c.created)}</small>
                  </header>
                  <p>{c.text}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
