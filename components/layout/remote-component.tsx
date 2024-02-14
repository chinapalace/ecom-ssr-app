'use client';
import { RemoteComponent } from '@paciolan/remote-component';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { Suspense } from 'react';
const url =
  'https://raw.githubusercontent.com/chinapalace/remote-component-starter/main/dist/main.js';
const HelloWorld = ({ product }) => {
  return (
    <ErrorBoundary errorComponent={<div>error</div>}>
      <Suspense>
        <RemoteComponent url={url} product={product} />
      </Suspense>
    </ErrorBoundary>
  );
};
export default HelloWorld;
