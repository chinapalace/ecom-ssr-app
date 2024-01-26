'use client';

import { Dialog, Transition } from '@headlessui/react';
import { SearchAndDiscoveryFilters } from 'components/layout/search/search-and-discovery-filters';
import { ShopifyCollectionFilterValue } from 'lib/shopify/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

function getPriceRange(filters) {
  const priceFilter = filters.find((filter) => filter.id === 'filter.v.price');
  const priceValues = priceFilter?.values;
  const input = JSON.parse(priceValues?.[0].input);
  const { price } = input || {};
  const min = price?.min;
  const max = price?.max;
  return { min, max };
}
export default function FilterMenu({ filters }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const openFilterMenu = () => setIsOpen(true);
  const closeFilterMenu = () => setIsOpen(false);

  const [filterState, setFilterState] = useState({});
  const handleFilterChange = (filterInput: string, value: ShopifyCollectionFilterValue[]) => {
    setFilterState((prevState) => ({
      ...prevState,
      [filterInput]: value
    }));
  };

  const applyFiltersToURL = () => {
    const filtersToApply = Object.keys(filterState).filter((key) => filterState[key]);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('filters', JSON.stringify(filtersToApply));

    router.push(`${pathname}?${newParams}`);
  };

  useEffect(() => {
    closeFilterMenu();
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openFilterMenu}
        aria-label="Open mobile menu"
        className="flex h-10 w-full items-center justify-center "
      >
        Filter
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeFilterMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-transform ease-in-out duration-300"
            enterFrom="translate-y-full"
            enterTo="translate-y-0"
            leave="transition-transform ease-in-out duration-200"
            leaveFrom="translate-y-0"
            leaveTo="translate-y-full"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-10 flex h-full w-full flex-col scroll-auto bg-white pb-6 dark:bg-black">
              <div className="overflow-auto p-4">
                <div className="flex items-center">
                  <button
                    className="flex h-11 w-11 items-center justify-center rounded-md  text-black transition-colors  dark:text-white"
                    aria-label="Close mobile menu"
                    onClick={closeFilterMenu}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                  <div className="flex-grow pr-11">
                    <h1 className="text-center">Filters</h1>
                  </div>
                </div>
                <div className="mb-4 w-full ">
                  <SearchAndDiscoveryFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    filterState={filterState}
                  />
                </div>
                <button
                  className="mb-10 h-12 w-full rounded-md bg-black text-white dark:bg-white dark:text-black"
                  onClick={applyFiltersToURL}
                >
                  Apply
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
