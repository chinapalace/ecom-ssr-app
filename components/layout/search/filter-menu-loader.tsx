import { getCollectionFilters } from 'lib/shopify';
import { getPathname } from 'next-impl-getters/get-pathname';
import { getSearchParams } from 'next-impl-getters/get-search-params';
import FilterMenu from './filter-menu';

export const dynamic = 'force-dynamic';

export default async function handler() {
  const searchParams = getSearchParams();
  const pathname = getPathname();
  const shopifyDomain = searchParams.get('shopifyDomain')!;
  const accessToken = searchParams.get('accessToken')!;
  const collectionHandle = pathname.split('/').pop();

  const filters = await getCollectionFilters({
    shopifyDomain,
    accessToken,
    collectionHandle
  });

  return <FilterMenu filters={filters} />;
}
