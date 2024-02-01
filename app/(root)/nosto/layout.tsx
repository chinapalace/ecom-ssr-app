import { Suspense } from 'react';

export const runtime = 'edge';

export default async function Layout({ children }) {
  return (
    <>
      <Suspense>{children}</Suspense>
    </>
  );
}
