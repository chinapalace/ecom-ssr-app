'use client';
import Drawer, { useDrawer } from 'components/drawer';
import { SortFilterItem } from 'lib/constants';
import { FilterItem } from './item';

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList({ list }: { list: ListItem[] }) {
  return (
    <>
      {list.map((item: ListItem, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </>
  );
}

export default function FilterDrawer({ list }: { list: ListItem[] }) {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  return (
    <>
      <button onClick={openDrawer} aria-label="Open sort menu" className="h-full w-full">
        Sort
      </button>
      <Drawer isOpen={isOpen} onClose={closeDrawer}>
        <div className="overflow-auto p-4">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <div className="flex-grow pr-10">
              <h1 className="text-center">Sort</h1>
            </div>
          </div>
          <nav>
            <ul>
              <FilterItemList list={list} />
            </ul>
          </nav>
        </div>
      </Drawer>
    </>
  );
}
