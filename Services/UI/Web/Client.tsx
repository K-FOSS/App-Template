// UI/Client.tsx
import React, { PropsWithChildren, useEffect, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';

function ClientApp({ children }: PropsWithChildren<{}>): React.ReactElement {
  const loadServiceWorker = useCallback(
    async function(): Promise<void> {
      const worker = await navigator.serviceWorker.register(
        './service-worker.ts',
        {
          scope: '/',
        },
      );

      console.log('SW registered: ', worker.navigationPreload);
    },
    [navigator.serviceWorker],
  );

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    if ('serviceWorker' in navigator) loadServiceWorker();
  }, []);

  return <BrowserRouter>{children}</BrowserRouter>;
}

async function renderClient() {
  const { App } = await import('./App');
  const { ApolloProvider } = await import('./Providers/ApolloProvider');
  const { ThemeProvider } = await import('./Providers/ThemeProvider');

  hydrate(
    <ApolloProvider>
      <ClientApp>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ClientApp>
    </ApolloProvider>,
    document.getElementById('app'),
  );
}

renderClient();
