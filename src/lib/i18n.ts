import { fa } from '@/content/fa';
import { en } from '@/content/en';
import { ru } from '@/content/ru';
import type { Dict, InnerPageId, Lang, PageId, Post } from '@/content/types';

export const SITE_URL = 'https://websiteco.ir';
export const langs: Lang[] = ['fa', 'en', 'ru'];
export const dicts: Record<Lang, Dict> = { fa, en, ru };
export const innerIds: InnerPageId[] = [
  'about',
  'stay',
  'experiences',
  'gallery',
  'blog',
  'events',
  'shop',
  'contact',
];

export type Route =
  | { kind: 'home'; lang: Lang }
  | { kind: 'page'; lang: Lang; id: InnerPageId }
  | { kind: 'post'; lang: Lang; post: Post };

const prefix = (l: Lang) => (l === 'fa' ? '' : `/${l}`);

export function pagePath(l: Lang, id: PageId): string {
  if (id === 'home') return l === 'fa' ? '/' : `/${l}/`;
  return `${prefix(l)}/${dicts[l].slugs[id]}/`;
}

export function postPath(l: Lang, post: Post): string {
  return `${prefix(l)}/${post.slug}/`;
}

export function routePath(r: Route): string {
  switch (r.kind) {
    case 'home':
      return pagePath(r.lang, 'home');
    case 'page':
      return pagePath(r.lang, r.id);
    case 'post':
      return postPath(r.lang, r.post);
  }
}

/** همان صفحه در زبان دیگر */
export function altRoute(r: Route, l: Lang): Route {
  switch (r.kind) {
    case 'home':
      return { kind: 'home', lang: l };
    case 'page':
      return { kind: 'page', lang: l, id: r.id };
    case 'post': {
      const post = dicts[l].posts.find((p) => p.id === r.post.id) ?? dicts[l].posts[0];
      return { kind: 'post', lang: l, post };
    }
  }
}

export function allRoutes(): Route[] {
  const out: Route[] = [];
  for (const lang of langs) {
    out.push({ kind: 'home', lang });
    for (const id of innerIds) out.push({ kind: 'page', lang, id });
    for (const post of dicts[lang].posts) out.push({ kind: 'post', lang, post });
  }
  return out;
}

/** تبدیل بخش‌های آدرس به مسیر منطقی؛ null یعنی ۴۰۴ */
export function resolve(slug: string[]): Route | null {
  let lang: Lang = 'fa';
  let rest = slug;
  if (slug[0] === 'en' || slug[0] === 'ru') {
    lang = slug[0];
    rest = slug.slice(1);
  }
  const d = dicts[lang];
  if (rest.length === 0) return { kind: 'home', lang };
  if (rest.length > 1) return null;
  const s = rest[0];
  if (d.homeAliases.includes(s)) return { kind: 'home', lang };
  const id = innerIds.find((i) => d.slugs[i] === s);
  if (id) return { kind: 'page', lang, id };
  const post = d.posts.find((p) => p.slug === s);
  if (post) return { kind: 'post', lang, post };
  return null;
}

/** همه آدرس‌هایی که باید در خروجی استاتیک ساخته شوند، به‌جز صفحه اصلی فارسی (app/page.tsx) */
export function staticSlugs(): string[][] {
  const out: string[][] = [];
  for (const l of langs) {
    const d = dicts[l];
    const base = l === 'fa' ? [] : [l];
    if (l !== 'fa') out.push(base);
    for (const a of d.homeAliases) out.push([...base, a]);
    for (const id of innerIds) out.push([...base, d.slugs[id]]);
    for (const p of d.posts) out.push([...base, p.slug]);
  }
  return out;
}

/** متن بدون عبارت‌های [تکمیل شود] برای توضیحات متا */
export function stripTodo(text: string): string {
  return text.replace(/\s*\[[^\]]+\]/g, '').trim();
}

export function routeTitle(r: Route): string {
  const d = dicts[r.lang];
  switch (r.kind) {
    case 'home':
      return `${d.siteName} | ${d.tagline}`;
    case 'page':
      return `${d.pages[r.id].title} | ${d.siteName}`;
    case 'post':
      return `${r.post.title} | ${d.siteName}`;
  }
}

export function routeDescription(r: Route): string {
  const d = dicts[r.lang];
  switch (r.kind) {
    case 'home':
      return d.home.lead;
    case 'page':
      return stripTodo(d.pages[r.id].lead);
    case 'post':
      return stripTodo(r.post.excerpt);
  }
}

export function formatDate(lang: Lang, iso: string): string {
  const locale = lang === 'fa' ? 'fa-IR-u-ca-persian' : dicts[lang].locale;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function formatYear(lang: Lang): string {
  const locale = lang === 'fa' ? 'fa-IR-u-ca-persian' : dicts[lang].locale;
  return new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(new Date());
}
