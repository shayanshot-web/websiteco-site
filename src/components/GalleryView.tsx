'use client';

import { useCallback, useEffect, useState } from 'react';
import { galleryItems, galleryUi, type GalleryCat } from '@/content/gallery';
import type { Lang } from '@/content/types';

const cats: GalleryCat[] = ['sea', 'village', 'people', 'food', 'craft', 'culture'];

export default function GalleryView({ lang }: { lang: Lang }) {
  const u = galleryUi[lang];
  const [cat, setCat] = useState<GalleryCat | 'all'>('all');
  const [open, setOpen] = useState<number | null>(null);
  const items = galleryItems.filter((g) => cat === 'all' || g.cat === cat);
  const present = cats.filter((c) => galleryItems.some((g) => g.cat === c));

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(lang === 'fa' ? 1 : -1);
      if (e.key === 'ArrowRight') step(lang === 'fa' ? -1 : 1);
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, step, lang]);

  if (galleryItems.length === 0) {
    return (
      <div className="gl-wrap">
        <ul className="gl-grid">
          {Array.from({ length: 6 }, (_, i) => (
            <li key={i} className={`gl-frame empty tilt${i % 3}`}>
              <span className="gl-mat">
                <span className="gl-ph" style={{ aspectRatio: i % 3 === 1 ? '4/5' : '4/3' }}>
                  <svg viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M6 14h9l3-5h12l3 5h9v26H6z" />
                    <circle cx="24" cy="26" r="8" />
                  </svg>
                  <small>{u.slot}</small>
                </span>
              </span>
            </li>
          ))}
        </ul>
        <p className="notice">{u.soon}</p>
      </div>
    );
  }

  const cur = open === null ? null : items[open];
  return (
    <div className="gl-wrap">
      {present.length > 1 ? (
        <div className="gl-chips" role="tablist">
          {(['all', ...present] as const).map((c) => (
            <button
              key={c}
              type="button"
              className={cat === c ? 'on' : ''}
              onClick={() => setCat(c)}
              data-sound="tick"
            >
              {c === 'all' ? u.all : u.cats[c]}
            </button>
          ))}
        </div>
      ) : null}
      <ul className="gl-grid">
        {items.map((g, i) => (
          <li key={g.file} className={`gl-frame tilt${i % 3}`}>
            <button type="button" className="gl-btn" onClick={() => setOpen(i)} aria-label={`${u.open}: ${g.title[lang]}`} data-sound="pop">
              <span className="gl-mat">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/gallery/${g.file}`} alt={g.alt?.[lang] ?? g.title[lang]} loading="lazy" style={{ aspectRatio: g.ratio ?? '4/3' }} />
              </span>
              <span className="gl-cap">
                <strong>{g.title[lang]}</strong>
                {g.place ? <small>{g.place[lang]}</small> : null}
              </span>
            </button>
          </li>
        ))}
      </ul>
      {cur ? (
        <div className="gl-box" role="dialog" aria-modal="true" aria-label={cur.title[lang]} onClick={close}>
          <figure onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/gallery/${cur.file}`} alt={cur.alt?.[lang] ?? cur.title[lang]} />
            <figcaption>
              <strong>{cur.title[lang]}</strong>
              {cur.place ? <span> · {cur.place[lang]}</span> : null}
              {cur.credit ? <span> · {u.photoBy}: {cur.credit}</span> : null}
            </figcaption>
          </figure>
          <button type="button" className="gl-x" onClick={close} aria-label={u.close}>×</button>
          {items.length > 1 ? (
            <>
              <button type="button" className="gl-nav prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label={u.prev}>‹</button>
              <button type="button" className="gl-nav next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label={u.next}>›</button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
