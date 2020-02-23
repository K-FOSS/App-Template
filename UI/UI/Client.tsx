// UI/Client.tsx
import React from 'react';
import { hydrate } from 'react-dom';

async function startClient(): Promise<void> {
  console.log('HelloWorld');

  const { App } = await import('./App');

  hydrate(<App />, document.getElementById('app'));
}

startClient();
