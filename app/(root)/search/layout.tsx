import Collections from 'components/layout/search/collections';
import FilterList from 'components/layout/search/sort';
import { sorting } from 'lib/constants';
import { Suspense } from 'react';

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
        {/* Dropdown Containers */}
        <div className="flex w-full">
          {/* Collections Dropdown */}
          <div className="w-1/2">
            <Collections />
          </div>
          {/* FilterList Dropdown */}
          <div className="w-1/2">
            <FilterList list={sorting} title="Sort by" />
          </div>
        </div>
        {/* Main Content */}
        <div className="order-last min-h-screen w-full md:order-none">{children}</div>
      </div>
      {/* <Footer /> */}
    </Suspense>
  );
}
