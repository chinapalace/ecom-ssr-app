import { ReactNode, Suspense } from 'react';

export default async function UnstyledLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-primary text-black dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        {/* <Navbar /> */}
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
