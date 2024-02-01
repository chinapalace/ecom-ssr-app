'use client';

import Drawer, { useDrawer } from 'components/drawer';
import { SearchAndDiscoveryFilters } from 'components/layout/search/search-and-discovery-filters';
import { DynamicComponentWrapper } from 'components/load-dynamic-component';
import { ShopifyCollectionFilterValue } from 'lib/shopify/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

function getMinMaxPrice(data) {
  let minPrice = 0;
  let maxPrice = 0;

  for (const filter of data) {
    if (filter.type === 'PRICE_RANGE') {
      const priceData = JSON.parse(filter.values[0].input).price;
      if (priceData) {
        minPrice = priceData.min;
        maxPrice = priceData.max;
        break; // Stop iterating once we find the "PRICE_RANGE" filter
      }
    }
  }

  return [minPrice, maxPrice];
}

export default function FilterMenu({ filters }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const initialFilters = searchParams.get('filters') ? JSON.parse(searchParams.get('filters')) : [];

  const initialFilterState = initialFilters.reduce((acc, current) => {
    const parsedFilter = JSON.parse(current);
    if (parsedFilter.price) {
      return acc;
    }
    acc[current] = true;
    return acc;
  }, {});

  // filter prop is the total list of filters
  // filterState is the current state of the filters derived from the URL
  const [filterState, setFilterState] = useState(initialFilterState || {});
  const handleFilterChange = (filterInput: string, value: ShopifyCollectionFilterValue[]) => {
    setFilterState((prevState) => ({
      ...prevState,
      [filterInput]: value
    }));
  };

  const [minPrice, maxPrice] = getMinMaxPrice(filters);
  const priceFromUrl = initialFilters.find((filter) => {
    const parsedFilter = JSON.parse(filter);
    return parsedFilter.price !== undefined;
  });
  const priceRangeFromUrlObj = priceFromUrl ? JSON.parse(priceFromUrl).price : {};
  const priceRangeFromUrl =
    priceRangeFromUrlObj.min && priceRangeFromUrlObj.max
      ? [priceRangeFromUrlObj.min, priceRangeFromUrlObj.max]
      : [minPrice, maxPrice];

  const [priceRange, setPriceRange] = useState(priceRangeFromUrl);
  const [priceRangeUpdated, setPriceRangeUpdated] = useState(false);
  const handlePriceRangeChange = (newValue: number[]) => {
    setPriceRange(newValue);
    setPriceRangeUpdated(true);
  };

  const clearFilters = () => {
    setFilterState({});
    setPriceRange([minPrice, maxPrice]);
    setPriceRangeUpdated(false);
  };

  const applyFiltersToURL = () => {
    let filtersToApply = Object.keys(filterState).filter((key) => filterState[key]);
    if (priceRangeUpdated) {
      filtersToApply = [
        ...filtersToApply,
        JSON.stringify({ price: { min: priceRange[0], max: priceRange[1] } })
      ];
    }
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('filters', JSON.stringify(filtersToApply));

    router.push(`${pathname}?${newParams}`);
  };

  return (
    <>
      <button onClick={openDrawer} aria-label="Open filter menu" className="h-full w-full">
        Filter
      </button>
      <Drawer isOpen={isOpen} onClose={closeDrawer}>
        <div className="overflow-auto p-4">
          <div className="flex items-center">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-md  text-black transition-colors  dark:text-primary"
              aria-label="Close mobile menu"
              onClick={closeDrawer}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="flex-grow">
              <h1 className="text-center">Filters</h1>
            </div>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-md  text-black transition-colors  dark:text-primary"
              aria-label="Close mobile menu"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
          <div className="mb-4 w-full ">
            <SearchAndDiscoveryFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              filterState={filterState}
              priceRange={priceRange}
              setPriceRange={handlePriceRangeChange}
              minAndMaxPrice={[minPrice, maxPrice]}
            />
          </div>
          <button
            className="mb-10 h-12 w-full rounded-md bg-black text-primary dark:bg-primary dark:text-black"
            onClick={applyFiltersToURL}
          >
            Apply
          </button>

          <DynamicComponentWrapper />
        </div>
      </Drawer>
    </>
  );
}
