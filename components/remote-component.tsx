'use client';
import { RemoteComponent } from '@paciolan/remote-component';

const url =
  'https://raw.githubusercontent.com/Paciolan/remote-component/master/examples/remote-components/HelloWorld.js';
const HelloWorld = (props) => <RemoteComponent url={url} {...props} />;

export default HelloWorld;
