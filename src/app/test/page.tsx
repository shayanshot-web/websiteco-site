import type { Metadata } from 'next';
import Shell from '@/components/Shell';
import { View } from '@/components/Views';
import { metaFor } from '@/lib/seo';
import type { Route } from '@/lib/i18n';

/** نسخهٔ اصلی سایت روی websiteco.ir/test تا زمان انتشار نهایی */
const route: Route = { kind: 'home', lang: 'fa' };

export const metadata: Metadata = {
  ...metaFor(route),
  robots: { index: false, follow: false },
};

export default function TestHome() {
  return (
    <Shell route={route}>
      <View route={route} />
    </Shell>
  );
}
