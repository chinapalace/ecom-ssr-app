import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font';
import { ReactNode, Suspense } from 'react';
import './globals.css';

export const metadata = {
  title: 'Tapcart'
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-primary text-black dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        {/* <Navbar /> */}
        <Suspense>
          <main>{children}</main>
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
