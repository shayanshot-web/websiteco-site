import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Shell from '@/components/Shell';
import { View } from '@/components/Views';
import { resolve, staticSlugs } from '@/lib/i18n';
import { metaFor } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return staticSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = resolve(slug);
  return route ? metaFor(route) : {};
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const route = resolve(slug);
  if (!route) notFound();
  return (
    <Shell route={route}>
      <View route={route} />
    </Shell>
  );
}
