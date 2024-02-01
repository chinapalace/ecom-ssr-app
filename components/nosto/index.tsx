'use client';
import { NostoCategory as NC, NostoPlacement as NP } from '@nosto/nosto-react';

export function NostoCategory({ category }: { category: string }) {
  return <NC category={category} />;
}

export function NostoPlacement({ id }: { id: string }) {
  return <NP id={id} />;
}
