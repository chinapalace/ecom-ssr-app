'use client';
import { RemoteComponent } from '@paciolan/remote-component';
import { Suspense } from 'react';

const url =
  'https://raw.githubusercontent.com/chinapalace/remote-component-starter/main/dist/main.js';
const HelloWorld = ({ product }) => {
  return (
    <Suspense>
      <RemoteComponent
        url={url}
        title={product.title}
        images={[{ src: product.featuredImage.url }]}
      />
    </Suspense>
  );
};
export default HelloWorld;
