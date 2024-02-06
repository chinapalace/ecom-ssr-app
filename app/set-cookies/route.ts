import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cookieStore = cookies();

  // Example: Set a cookie using query parameters
  // ?appId=test&shopifyDomain=123&accessToken=123
  const appId = url.searchParams.get('appId');
  const shopifyDomain = url.searchParams.get('shopifyDomain');
  const accessToken = url.searchParams.get('accessToken');

  appId && cookieStore.set('appId', appId);
  shopifyDomain && cookieStore.set('shopifyDomain', shopifyDomain);
  accessToken && cookieStore.set('accessToken', accessToken);

  // Redirect to a specified path or a default one
  return redirect(`/${appId}/collection`);
}
