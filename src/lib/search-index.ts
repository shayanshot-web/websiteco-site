import { dicts, innerIds, langs, pagePath, postPath, stripTodo } from './i18n';
import type { Lang, Section } from '@/content/types';

export type SearchKind = 'page' | 'post' | 'product' | 'stay' | 'event';

export interface SearchEntry {
  /** زبان */
  l: Lang;
  /** نوع نتیجه */
  k: SearchKind;
  /** عنوان */
  t: string;
  /** آدرس */
  u: string;
  /** متن قابل جستجو */
  x: string;
}

function sectionsText(sections: Section[]): string {
  return sections
    .map((s) => [s.h ?? '', ...s.p].map(stripTodo).filter(Boolean).join('. '))
    .filter(Boolean)
    .join(' ');
}

/** فهرست جستجوی محتوای ثابت سایت (صفحه‌ها و نوشته‌ها)؛ هنگام بیلد ساخته می‌شود */
export function buildSearchIndex(): SearchEntry[] {
  const out: SearchEntry[] = [];
  for (const l of langs) {
    const d = dicts[l];
    for (const id of innerIds) {
      const p = d.pages[id];
      const extra = id === 'contact' ? ` ${d.manager} ${d.phoneDisplay} ${d.address}` : '';
      out.push({
        l,
        k: 'page',
        t: p.title,
        u: pagePath(l, id),
        x: `${stripTodo(p.lead)} ${sectionsText(p.sections)}${extra}`.trim(),
      });
    }
    for (const post of d.posts) {
      out.push({
        l,
        k: 'post',
        t: post.title,
        u: postPath(l, post),
        x: `${stripTodo(post.excerpt)} ${stripTodo(post.lead)} ${sectionsText(post.sections)}`.trim(),
      });
    }
  }
  return out;
}
