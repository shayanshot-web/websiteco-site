import type { MetadataRoute } from 'next';
import { allRoutes, routePath, SITE_URL } from '@/lib/i18n';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allRoutes().map((r) => ({
    url: `${SITE_URL}${routePath(r)}`,
    lastModified: now,
    changeFrequency: r.kind === 'post' ? 'monthly' : 'weekly',
    priority: r.kind === 'home' ? 1 : r.kind === 'post' ? 0.5 : 0.7,
  }));
}
