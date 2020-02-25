// UI/Client.tsx
import React from 'react';
import { hydrate } from 'react-dom';
import { ApolloProvider } from './Providers/ApolloProvider';

async function startClient() {
  const { App } = await import('./App');

  hydrate(
    <ApolloProvider>
      <App />
    </ApolloProvider>,
    document.getElementById('app'),
  );
}

startClient();
