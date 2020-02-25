// Server/Renderer.tsx
import { InMemoryCache } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Duplex, Transform } from 'stream';
import { ApolloProvider } from '../Web/Providers/ApolloProvider';

const htmlStart = `<!DOCTYPE html>
<html>
<head>
  <script>window.__INITIAL__DATA__ = {}</script>
</head>
<body>
  <div id="app">
    `;

export async function renderUIStream(): Promise<Duplex> {
  const uiStream = new Transform({
    transform(chunk, enc, cb) {
      this.push(chunk);
      cb();
    },
  });
  uiStream.write(htmlStart);

  const { App } = await import('../Web/App');

  const serverCache = new InMemoryCache();

  const app = (
    <ApolloProvider cache={serverCache}>
      <App />
    </ApolloProvider>
  );
  await getDataFromTree(app);

  const appStream = renderToNodeStream(app);

  appStream.pipe(uiStream, { end: false });

  appStream.on('end', () => {
    const htmlEnd = `
  </div>
  <script type="application/javascript">window.APOLLO_STATE = ${JSON.stringify(
    serverCache.extract(),
  )}</script>
  <script type="module" src="Client.js"></script>
</body>
</html>`;

    uiStream.end(htmlEnd);
  });

  return uiStream;
}
