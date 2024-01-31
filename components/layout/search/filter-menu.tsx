'use client';
import Drawer, { useDrawer } from 'components/drawer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';
import { SearchAndDiscoveryFilters } from './search-and-discovery-filters';

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

  const formRef = useRef(null);

  const [minPrice, maxPrice] = getMinMaxPrice(filters);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const initialFilters = searchParams.get('filters') ? JSON.parse(searchParams.get('filters')) : [];

  const initialFilterState = initialFilters.reduce((acc, current) => {
    const parsedFilter = JSON.parse(current);
    if (parsedFilter.price) {
      return acc;
    }
    acc[current] = true;
    return acc;
  }, {});

  const applyFiltersToURL = (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const filtersToApply = [];

    // Convert formData to an array of key-value pairs and iterate through it
    for (const [key, value] of formData.entries()) {
      filtersToApply.push(key);
    }

    // Add price range to filtersToApply
    // const priceMin = formData.get('minPrice') || minPrice;
    // const priceMax = formData.get('maxPrice') || maxPrice;
    filtersToApply.push(JSON.stringify({ price: { min: priceRange[0], max: priceRange[1] } }));

    console.log(filtersToApply);
    const newParams = new URLSearchParams(searchParams.toString());

    // // Ensure that filters are properly JSON-encoded and URL-encoded
    // const encodedFilters = filtersToApply.map((filter) => JSON.stringify(filter));
    newParams.set('filters', JSON.stringify(filtersToApply));
    console.log(newParams.toString());
    router.push(`${pathname}?${newParams}`);
  };

  return (
    <>
      <button onClick={openDrawer} aria-label="Open filter menu" className="h-full w-full">
        Filter
      </button>
      <Drawer isOpen={isOpen} onClose={closeDrawer}>
        <div className="overflow-auto p-4">
          <form ref={formRef} onSubmit={applyFiltersToURL}>
            <div className="flex items-center">
              <button
                className="flex h-11 w-11 items-center justify-center rounded-md  text-black transition-colors  dark:text-white"
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
              <div className="flex-grow">
                <h1 className="text-center">Filters</h1>
              </div>
              <input
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md  text-black transition-colors  dark:text-white"
                aria-label="Close mobile menu"
                type="reset"
                value="Clear"
              />
            </div>
            <div className="mb-4 w-full">
              <SearchAndDiscoveryFilters
                filters={filters}
                filterState={initialFilterState}
                minAndMaxPrice={[minPrice, maxPrice]}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
            <button
              type="submit"
              className="mb-10 h-12 w-full rounded-md bg-black text-white dark:bg-white dark:text-black"
            >
              Apply
            </button>
          </form>
        </div>
      </Drawer>
    </>
  );
}
