import { getAllApps } from 'lib/tapcart';

export default async function HomePage() {
  const apps = await getAllApps();
  return (
    <>
      <h1>Tapcart Apps</h1>
    </>
  );
}
