import clsx from 'clsx';
import { Suspense } from 'react';

import { getCollections } from 'lib/shopify';
import { getSearchParams } from 'next-impl-getters/get-search-params';
import FilterList from './sort';

export const dynamic = 'force-dynamic';

async function CollectionList() {
  const searchParams = getSearchParams();
  const shopifyDomain = searchParams.get('shopifyDomain')!;
  const accessToken = searchParams.get('accessToken')!;

  const collections = await getCollections({ shopifyDomain, accessToken });
  return <FilterList list={collections} title="Collections" />;
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded';
const activeAndTitles = 'bg-neutral-800 dark:bg-neutral-300';
const items = 'bg-neutral-400 dark:bg-neutral-700';

export default function Collections() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CollectionList />
    </Suspense>
  );
}
