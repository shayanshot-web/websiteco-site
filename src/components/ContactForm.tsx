'use client';

import { useState, type FormEvent } from 'react';
import type { UiStrings } from '@/content/types';

type Status = 'idle' | 'sending' | 'ok' | 'error';

export default function ContactForm({ ui, lang }: { ui: UiStrings['form']; lang: string }) {
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch('/contact.php', { method: 'POST', body: new FormData(form) });
      const data = (await res.json()) as { ok?: boolean };
      if (res.ok && data.ok) {
        setStatus('ok');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <input type="hidden" name="lang" value={lang} />
      {/* تله‌ی اسپم: کاربر واقعی این فیلد را نمی‌بیند */}
      <div className="hp" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label>
        <span>{ui.name}</span>
        <input type="text" name="name" required maxLength={200} autoComplete="name" />
      </label>
      <label>
        <span>{ui.phone}</span>
        <input type="tel" name="phone" required maxLength={40} autoComplete="tel" dir="ltr" />
      </label>
      <label>
        <span>{ui.email}</span>
        <input type="email" name="email" maxLength={200} autoComplete="email" dir="ltr" />
      </label>
      <label>
        <span>{ui.subject}</span>
        <select name="subject" required>
          {ui.subjectOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      <label>
        <span>{ui.message}</span>
        <textarea name="message" required rows={6} maxLength={2000} />
      </label>

      <button type="submit" className="btn btn-blue" disabled={status === 'sending'}>
        {status === 'sending' ? ui.sending : ui.send}
      </button>

      <p className={`form-status ${status}`} role="status" aria-live="polite">
        {status === 'ok' ? ui.success : status === 'error' ? ui.error : ''}
      </p>
    </form>
  );
}
