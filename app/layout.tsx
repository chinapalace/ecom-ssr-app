import { GeistSans } from 'geist/font';
import { headers } from 'next/headers';
import { ReactNode, Suspense } from 'react';
import './globals.css';

function convertThemeToCSSVariables(theme: any) {
  const cssVariables = Object.entries(theme).map(([key, value]) => {
    return `--${key}: ${value};`;
  });
  return `:root {
    ${cssVariables.join('\n')}
  }`;
}
function extractSearchParams(urlString) {
  try {
    // Create a URL object
    const url = new URL(urlString);

    // Extract search parameters
    const searchParams = new URLSearchParams(url.search);

    // Convert search parameters to a simple object
    const params = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  } catch (error) {
    console.error('Invalid URL logged:', urlString);
    return {
      appId: null
    };
  }
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const referer = headers().get('referer');
  // const url = new URL(referer!);
  // const searchParams = url.searchParams;
  const searchParams = extractSearchParams(referer);
  const appId = searchParams['appId'];
  // const appId = searchParams.get('appId')!;
  // const appId = '4WSnL1O8mv';
  const res = await fetch(`${process.env.TAPCART_API}/apps/${appId}/themes`);
  const data = await res.json();
  const { colors } = data[0];
  const { theme } = colors;
  const cssVariables = convertThemeToCSSVariables(theme);

  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-white/70 text-black dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
        {/* <Navbar /> */}
        <Suspense>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
