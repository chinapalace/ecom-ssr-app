import { getCollectionFilters } from 'lib/shopify';
import { getPathname } from 'next-impl-getters/get-pathname';
import FilterMenu from './filter-menu';

export const dynamic = 'force-dynamic';

export default async function handler() {
  const pathname = getPathname();
  const collectionHandle = pathname.split('/')[3];

  const filters = await getCollectionFilters({
    collectionHandle
  });

  return <FilterMenu filters={filters} />;
}
