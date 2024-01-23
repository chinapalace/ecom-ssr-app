import { Suspense } from 'react';

export const runtime = 'edge';

export default async function HomePage() {
  return (
    <>
      {/* <ThreeItemGrid /> */}
      <Suspense>
        {/* <Carousel /> */}
        {/* <Suspense>
          <Footer />
        </Suspense> */}
      </Suspense>
    </>
  );
}
