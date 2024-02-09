import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { defaultSort, sorting } from 'lib/constants';
import { getCollectionProductsAndFilters } from 'lib/shopify';
import { v4 as uuidv4 } from 'uuid';
import HelloWorld from './remote-component';
export const runtime = 'edge';

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { handle: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, filters } = searchParams as { [key: string]: string };
  const filtersArray = filters ? JSON.parse(filters) : undefined;
  const parsedFilters = filtersArray?.map((filter) => {
    return JSON.parse(filter);
  });
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProductsAndFilters({
    collection: params.handle,
    sortKey,
    reverse,
    filters: parsedFilters
  });

  return (
    <section key={uuidv4()}>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
      <HelloWorld product={products[0]} />
      <iframe
        src="https://custom-blocks.tapcart.com/c5ScBNWVw1/YpO0yDt1JEzyVIF0/index.html"
        width="100%"
        height="100%"
      ></iframe>
    </section>
  );
}
