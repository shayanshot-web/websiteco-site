import { Logo } from '@/components/Art';

/** صفحهٔ «در حال به‌روزرسانی» که تا زمان انتشار نهایی روی آدرس اصلی سایت نمایش داده می‌شود */
export default function Maintenance() {
  return (
    <main className="maint" lang="fa" dir="rtl">
      <div className="maint-card">
        <div className="maint-logo">
          <Logo />
        </div>
        <h1 className="maint-name">هلیله باستانی، بوشهر</h1>
        <p className="maint-msg">
          در حال به‌روزرسانی
          <span className="maint-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </p>
        <p className="maint-sub">به‌زودی با چهره‌ای تازه برمی‌گردیم.</p>
        <p className="maint-sub small" lang="en" dir="ltr">
          Updating — we will be back soon · Обновление — скоро вернёмся
        </p>
      </div>
      <svg className="maint-sea" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
        <path className="w1" d="M0 60c100-40 200-40 300 0s200 40 300 0 200-40 300 0 200 40 300 0v60H0z" />
        <path className="w2" d="M0 80c100-30 200-30 300 0s200 30 300 0 200-30 300 0 200 30 300 0v40H0z" />
      </svg>
    </main>
  );
}
