import type { AnchorHTMLAttributes } from 'react';

/**
 * لینک ساده (بارگذاری کامل صفحه) به‌جای next/link.
 * دلیل: صفحه‌های بخش‌ها (بلاگ، فروشگاه، رویدادها، ...) را پنل مدیریت (PHP) پویا می‌کند و
 * ناوبری نرم Next فقط نسخه استاتیک را نشان می‌داد.
 */
export default function A({ href, ...rest }: Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string }) {
  return <a href={href} {...rest} />;
}
