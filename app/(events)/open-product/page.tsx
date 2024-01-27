import ClientEventPage from './event-handler';

export default function Page({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const productId = searchParams.id;

  return (
    <>
      <ClientEventPage productId={productId} />
    </>
  );
}
