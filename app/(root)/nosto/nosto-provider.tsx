'use client';
import { NostoProvider as NostoProviderWrapper } from '@nosto/nosto-react';

async function getTapcartIntegrations({ appId }) {
  const res = await fetch(`${process.env.MOBILE_GET_APP}/${appId}/`);
  const data = await res.json();
  console.log(data);
}

export default async function NostoProvider({ children, nostoAccountId }) {
  //   const searchParams = useSearchParams();
  //   const appId = searchParams.get('appId')!;
  //   const res = await fetch(`${process.env.MOBILE_GET_APP}/${appId}/`);
  //   const data = await res.json();
  //   console.log(data);

  return <NostoProviderWrapper account={nostoAccountId}>{children}</NostoProviderWrapper>;
}
