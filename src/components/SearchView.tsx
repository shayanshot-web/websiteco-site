'use client';

import { useEffect, useState } from 'react';
import type { Lang, UiStrings } from '@/content/types';
import type { SearchEntry } from '@/lib/search-index';

type Status = 'idle' | 'short' | 'loading' | 'ready' | 'error';

/** یکسان‌سازی حروف فارسی/عربی، ارقام و نیم‌فاصله برای جستجوی دقیق‌تر */
function normalize(s: string): string {
  return s
    .normalize('NFC')
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, '')
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/ة/g, 'ه')
    .replace(/ё/g, 'е')
    .replace(/‌/g, ' ')
    .replace(/[۰-۹]/g, (c) => String(c.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (c) => String(c.charCodeAt(0) - 0x0660));
}

function search(entries: SearchEntry[], q: string): SearchEntry[] {
  const words = normalize(q).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  const scored: { e: SearchEntry; score: number }[] = [];
  for (const e of entries) {
    const title = normalize(e.t);
    const text = normalize(e.x);
    let score = 0;
    let all = true;
    for (const w of words) {
      const inTitle = title.includes(w);
      const inText = text.includes(w);
      if (!inTitle && !inText) {
        all = false;
        break;
      }
      score += (inTitle ? 3 : 0) + (inText ? 1 : 0);
    }
    if (all) scored.push({ e, score });
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.e);
}

async function load(url: string, required: boolean): Promise<SearchEntry[]> {
  try {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error(String(res.status));
    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error('bad index');
    return data as SearchEntry[];
  } catch (err) {
    if (required) throw err;
    return []; // محتوای پنل مدیریت اختیاری است؛ نبودنش جستجوی صفحه‌ها را خراب نمی‌کند
  }
}

const safeHref = (u: string) => (u.startsWith('/') && !u.startsWith('//') ? u : '/');

export default function SearchView({ lang, ui, action }: { lang: Lang; ui: UiStrings['search']; action: string }) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [done, setDone] = useState('');

  useEffect(() => {
    const query = (new URLSearchParams(window.location.search).get('q') ?? '').trim();
    setQ(query);
    setDone(query);
    if (!query) {
      setStatus('idle');
      return;
    }
    if (normalize(query).replace(/\s+/g, '').length < 2) {
      setStatus('short');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    Promise.all([load('/search-index.json', true), load('/search-cms.json', false)])
      .then(([base, cms]) => {
        if (cancelled) return;
        setResults(search([...base, ...cms].filter((e) => e.l === lang), query));
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <>
      <form className="search-page-form" action={action} method="get" role="search">
        <label className="sr-only" htmlFor="search-q">
          {ui.label}
        </label>
        <input
          id="search-q"
          type="search"
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={ui.placeholder}
          maxLength={100}
          autoComplete="off"
        />
        <button type="submit" className="btn btn-blue">
          {ui.button}
        </button>
      </form>

      <div role="status" aria-live="polite" className="search-status">
        {status === 'loading' ? ui.loading : null}
        {status === 'short' ? ui.tooShort : null}
        {status === 'error' ? ui.error : null}
        {status === 'ready' && results.length === 0 ? ui.noResults : null}
      </div>

      {status === 'ready' && results.length > 0 ? (
        <p className="search-summary">
          {ui.resultsFor} «{done}»: {results.length}
        </p>
      ) : null}

      {status === 'ready' && results.length > 0 ? (
        <ul className="search-results">
          {results.map((r) => (
            <li key={`${r.k}-${r.u}`}>
              <span className="search-kind">{ui.kinds[r.k] ?? ui.kinds.page}</span>
              <h2>
                <a href={safeHref(r.u)}>{r.t}</a>
              </h2>
              {r.x ? <p>{r.x.length > 170 ? `${r.x.slice(0, 170)}…` : r.x}</p> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
