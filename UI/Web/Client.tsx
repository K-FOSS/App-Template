// UI/Client.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from './Providers/ApolloProvider';

async function renderClient() {
  const [{ App }, { hydrate }] = await Promise.all([
    import('./App')
    import('react-dom')
  ])

  hydrate(
    <ApolloProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('app'),
  );
}

renderClient();

