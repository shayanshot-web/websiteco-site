import type { Metadata } from 'next';
import { altRoute, dicts, routeDescription, routePath, routeTitle, type Route } from './i18n';

export function metaFor(route: Route): Metadata {
  const d = dicts[route.lang];
  const title = routeTitle(route);
  const description = routeDescription(route);
  const path = routePath(route);
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        'fa-IR': routePath(altRoute(route, 'fa')),
        en: routePath(altRoute(route, 'en')),
        ru: routePath(altRoute(route, 'ru')),
        'x-default': routePath(altRoute(route, 'fa')),
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: d.siteName,
      locale: d.ogLocale,
      type: route.kind === 'post' ? 'article' : 'website',
    },
  };
}
