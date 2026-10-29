import type { Metadata } from 'next';
import Shell from '@/components/Shell';
import Maintenance from '@/components/Maintenance';
import { View } from '@/components/Views';
import { metaFor } from '@/lib/seo';
import { MAINTENANCE, type Route } from '@/lib/i18n';

const route: Route = { kind: 'home', lang: 'fa' };

export const metadata: Metadata = MAINTENANCE
  ? {
      title: 'هلیله باستانی، بوشهر | در حال به‌روزرسانی',
      description: 'سایت در حال به‌روزرسانی است.',
      robots: { index: false, follow: false },
    }
  : metaFor(route);

export default function HomePage() {
  if (MAINTENANCE) return <Maintenance />;
  return (
    <Shell route={route}>
      <View route={route} />
    </Shell>
  );
}
