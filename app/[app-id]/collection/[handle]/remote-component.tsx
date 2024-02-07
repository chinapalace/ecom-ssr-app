'use client';
import { RemoteComponent } from '@paciolan/remote-component';
import { Suspense } from 'react';

const url =
  'https://raw.githubusercontent.com/Paciolan/remote-component/master/examples/remote-components/HelloWorld.js';
const HelloWorld = (props) => (
  <Suspense>
    <RemoteComponent url={url} {...props} />
  </Suspense>
);

export default HelloWorld;
