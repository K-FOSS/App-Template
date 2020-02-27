// UI/Client.tsx
import React, { useEffect, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from './Providers/ApolloProvider';

function ClientApp({ children }: PropsWithChildren<{}>): React.ReactElement {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </ApolloProvider>
  );
}

async function renderClient() {
  const [{ App }, { hydrate }] = await Promise.all([
    import('./App'),
    import('react-dom'),
  ]);

  hydrate(
    <ClientApp>
      <App />
    </ClientApp>,
    document.getElementById('app'),
  );
}

renderClient();
