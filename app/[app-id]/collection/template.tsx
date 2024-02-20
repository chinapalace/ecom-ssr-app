import Filters from 'components/layout/search/filter-menu-loader';

import SortList from 'components/layout/search/sort/drawer';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div
        className="flex h-10 w-full border-y border-neutral-200 bg-neutral-200 text-center leading-10 text-black transition-colors dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
        style={{ gap: '1px' }}
      >
        <div className="w-full bg-primary text-black dark:bg-black">
          <SortList list={sorting} />
        </div>
        <div className="w-full bg-primary text-black dark:bg-black">
          <Filters />
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 p-4 text-black dark:text-white md:flex-row">
        {/* Main Content */}
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
      </div>
      {/* This is where my Footer would go if I had one */}
    </Suspense>
  );
}
