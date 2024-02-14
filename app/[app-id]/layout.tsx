import { ReactNode, Suspense } from 'react';

export const dynamic = 'force-dynamic';

function convertThemeToCSSVariables(theme: any) {
  const cssVariables = Object.entries(theme).map(([key, value]) => {
    return `--${key}: ${value};`;
  });
  return `:root {
    ${cssVariables.join('\n')}
  }
  html::-webkit-scrollbar {
    display: none;
  }
  `;
}

export const metadata = {
  title: 'Tapcart'
};

export default async function RootLayout({
  children,
  params
}: {
  children: ReactNode;
  params: { appId: string };
}) {
  const appId = params.appId;
  const res = await fetch(`${process.env.TAPCART_API}/apps/${appId}/themes`);
  const data = await res.json();
  const { colors } = data[0];
  const { theme } = colors;
  const cssVariables = convertThemeToCSSVariables(theme);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      <Suspense>{children}</Suspense>
    </>
  );
}
