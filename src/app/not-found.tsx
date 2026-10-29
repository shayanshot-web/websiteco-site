import Link from '@/components/A';
import { pagePath } from '@/lib/i18n';

export default function NotFound() {
  return (
    <div className="notfound">
      <div lang="fa" dir="rtl">
        <h1>صفحه پیدا نشد</h1>
        <p>آدرسی که وارد کرده‌اید وجود ندارد یا جابه‌جا شده است.</p>
        <Link className="btn btn-blue" href={pagePath('fa', 'home')}>
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <p lang="en" dir="ltr">
        Page not found. <Link href="/en/">Home</Link> · <Link href="/ru/">Главная</Link>
      </p>
    </div>
  );
}
