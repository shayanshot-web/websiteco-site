import type { Metadata } from 'next';
import Shell from '@/components/Shell';
import { View } from '@/components/Views';
import { metaFor } from '@/lib/seo';
import type { Route } from '@/lib/i18n';

const route: Route = { kind: 'home', lang: 'fa' };

export const metadata: Metadata = metaFor(route);

export default function HomePage() {
  return (
    <Shell route={route}>
      <View route={route} />
    </Shell>
  );
}
