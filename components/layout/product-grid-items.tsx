import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';

export default function ProductGridItems({ products }: { products: Product[] }) {
  const getIdFromGid = (gid: string) => {
    const arr = gid.split('/');
    return arr[arr.length - 1];
  };
  return (
    <>
      {products.map((product, i) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-auto w-full"
            href={`/open-product?id=${getIdFromGid(product.id)}`}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 50vw"
              priority={i < 6}
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
