'use client';
import { NostoProvider as NostoProviderWrapper } from '@nosto/nosto-react';

async function getTapcartIntegrations({ appId }) {
  const res = await fetch(`${process.env.MOBILE_GET_APP}/${appId}/`);
  const data = await res.json();
  console.log(data);
}

export function NostoItem({ product, onClick }) {
  return (
    <div className="nosto-item" onClick={onClick}>
      <a href={product.url}>
        <div className="nosto-image-container">
          <div className="nosto-image">
            <img src={product.thumb_url} alt={product.name} />
          </div>
          <div className="nosto-product-details">
            <div className="nosto-product-name">{product.name}</div>
            <div className="nosto-product-price">{product.price_text}</div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default async function NostoProvider({ children, nostoAccountId }) {
  //   const searchParams = useSearchParams();
  //   const appId = searchParams.get('appId')!;
  //   const res = await fetch(`${process.env.MOBILE_GET_APP}/${appId}/`);
  //   const data = await res.json();
  //   console.log(data);

  return (
    <NostoProviderWrapper recommendationComponent={<NostoItem />} account={nostoAccountId}>
      {children}
    </NostoProviderWrapper>
  );
}
