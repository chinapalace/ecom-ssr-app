'use client';
import { Disclosure } from '@headlessui/react';

import { Slider as BaseSlider, SliderProps } from '@mui/base/Slider';
import { ShopifyCollectionFilter, ShopifyCollectionFilterValue } from 'lib/shopify/types';
import { FC, ForwardedRef, forwardRef } from 'react';

interface ListFilterProps {
  filter: ShopifyCollectionFilter;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SearchAndDiscoveryFilters {
  filters: ShopifyCollectionFilter[];
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ListFilter: FC<ListFilterProps> = ({ filter, onFilterChange, filterState }) => {
  const { values } = filter;

  return (
    <div key={filter.id}>
      <>
        {values.map((value, i) => (
          <div key={value.id}>
            <input
              type="checkbox"
              id={value.id}
              onChange={(e) => onFilterChange(filter.values[i].input, e.target.checked)}
              checked={filterState[filter.values[i].input]}
            />
            <label htmlFor={value.id}>
              {value.label} ({value.count})
            </label>
          </div>
        ))}
      </>
    </div>
  );
};

const ListFilterGroup = ({ filter, onFilterChange, filterState }) => {
  return (
    <Disclosure>
      <Disclosure.Button className="py-2">
        {filter.label} ({filter.values.length})
      </Disclosure.Button>
      <Disclosure.Panel>
        <ListFilter filter={filter} onFilterChange={onFilterChange} filterState={filterState} />
      </Disclosure.Panel>
    </Disclosure>
  );
};

interface PriceRangeFilterProps {
  filter: {
    id: string;
    label: string;
    values: ShopifyCollectionFilterValue[];
  };
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterState: any;
}

function valuetext(value: number) {
  return `${value}°C`;
}

const Slider = forwardRef(function Slider(props: SliderProps, ref: ForwardedRef<HTMLSpanElement>) {
  return (
    <BaseSlider
      {...props}
      ref={ref}
      slotProps={{
        thumb: {
          className:
            'ring-black dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute'
        },
        root: { className: 'px-2 w-full pt-6 relative inline-flex h-10 cursor-pointer' },
        rail: {
          className: 'bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute'
        },
        track: {
          className: 'bg-black dark:bg-cyan-400 h-2 absolute rounded-full'
        },

        markLabel: {
          className:
            'absolute top-0 text-xs text-gray-500 dark:text-gray-400 mb-2 transform -translate-x-1/2'
        }
      }}
    />
  );
});
const PriceRangeFilter: FC<PriceRangeFilterProps> = ({
  priceRange,
  setPriceRange,
  minAndMaxPrice
}) => {
  const marks = [
    {
      value: minAndMaxPrice[0],
      label: `$${minAndMaxPrice[0]}`
    },
    {
      value: minAndMaxPrice[1],
      label: `$${minAndMaxPrice[1]}`
    }
  ];

  return (
    <Disclosure>
      <Disclosure.Button className="py-2">Price</Disclosure.Button>
      <Disclosure.Panel className="w-full">
        <Slider
          value={priceRange}
          onChange={(e, val, activeThumb) => setPriceRange(val, activeThumb)}
          getAriaLabel={() => 'Price range'}
          getAriaValueText={valuetext}
          min={minAndMaxPrice[0]}
          max={minAndMaxPrice[1]}
          marks={marks}
        />
      </Disclosure.Panel>
    </Disclosure>
  );
};

export const SearchAndDiscoveryFilters: FC<SearchAndDiscoveryFilters> = ({
  filters,
  onFilterChange,
  filterState,
  priceRange,
  setPriceRange,
  minAndMaxPrice
}) => {
  return (
    <div className="flex flex-col items-start">
      {filters.map((filter, i) => {
        switch (filter.type) {
          case 'LIST':
            return (
              <ListFilterGroup
                key={filter.id}
                filter={filter}
                onFilterChange={onFilterChange}
                filterState={filterState}
              />
            );
          case 'PRICE_RANGE':
            return (
              <PriceRangeFilter
                key={filter.id}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minAndMaxPrice={minAndMaxPrice}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
