export const mobileGetApp = async (appId) => {
  return await fetch(process.env.MOBILE_GET_APP + appId, { cache: 'force-cache' });
};

export const getShopifyStoreInfo = async (appId) => {
  const res = await mobileGetApp(appId);
  const data = await res.json();
  const { shopifyStore, shopifyApiKey } = data?.result;
  return { shopifyStore, shopifyApiKey };
};
