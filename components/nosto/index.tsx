'use client';
import { NostoCategory as NC, NostoPlacement as NP, NostoSession as NS } from '@nosto/nosto-react';

export function NostoCategory({ category }: { category: string }) {
  return <NC category={category} />;
}

export function NostoPlacement({ id }: { id: string }) {
  return <NP id={id} />;
}

export function NostoSession() {
  return <NS cart={[]} customer={{ first_name: 'Justin', last_name: 'McLaren' }} />;
}
