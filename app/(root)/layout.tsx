import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font';
import { getSearchParams } from 'next-impl-getters/get-search-params';
import { ReactNode, Suspense } from 'react';
import './globals.css';

export const dynamic = 'force-dynamic';

function convertThemeToCSSVariables(theme: any) {
  const cssVariables = Object.entries(theme).map(([key, value]) => {
    return `--${key}: ${value};`;
  });
  return `:root {
    ${cssVariables.join('\n')}

    ::-webkit-scrollbar {
      display: none;
  }

  --grid-template-columns-plp: repeat(1, minmax(0, 1fr));
  --order-plp-image: 0;
  --border-radius-plp-image: 2px;
  --display-price: block;
  }`;
}

export const metadata = {
  title: 'Tapcart'
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const searchParams = getSearchParams();
  const appId = searchParams.get('appId')!;
  const res = await fetch(`${process.env.TAPCART_API}/apps/${appId}/themes`);
  const data = await res.json();
  const { colors } = data[0];
  const { theme } = colors;
  const cssVariables = convertThemeToCSSVariables(theme);

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-primary text-black dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
        {/* <Navbar /> */}
        <Suspense>
          <main>{children}</main>
          <SpeedInsights />
        </Suspense>
      </body>
    </html>
  );
}
