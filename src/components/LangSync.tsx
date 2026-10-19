'use client';

import { useEffect } from 'react';

/** چون یک layout ریشه داریم، lang و dir صفحه را بعد از بارگذاری با زبان واقعی صفحه هماهنگ می‌کند */
export default function LangSync({ lang, dir }: { lang: string; dir: 'rtl' | 'ltr' }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);
  return null;
}
