import { buildSearchIndex } from '@/lib/search-index';

export const dynamic = 'force-static';

/** خروجی استاتیک /search-index.json برای صفحه جستجو */
export function GET() {
  return Response.json(buildSearchIndex());
}
