// Server/Renderer.tsx
import { InMemoryCache } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Duplex, Transform } from 'stream';
import { ApolloProvider } from '../Web/Providers/ApolloProvider';
import { StaticRouter } from 'react-router';
import { ServerStyleSheets } from '@material-ui/core/styles';

const htmlStart = `<!DOCTYPE html>
<html><head>`;

export async function renderUIStream(url?: string): Promise<Duplex> {
  const uiStream = new Transform({
    transform(chunk, enc, cb) {
      this.push(chunk);
      cb();
    },
  });
  uiStream.write(htmlStart);

  const { App } = await import('../Web/App');

  const serverCache = new InMemoryCache();
  const serverSheets = new ServerStyleSheets();

  const context = {};
  const app = (
    <ApolloProvider cache={serverCache}>
      <StaticRouter location={url} context={context}>
        <App />
      </StaticRouter>
    </ApolloProvider>
  );
  await getDataFromTree(serverSheets.collect(app));

  const appStream = renderToNodeStream(app);

  uiStream.write(
    `<script type="application/javascript">window.APOLLO_STATE = ${JSON.stringify(
      serverCache.extract(),
    )}</script><style id="jss-server-side">${serverSheets.toString()}</style></head><body><div id="app">`,
  );

  appStream.pipe(uiStream, { end: false });

  appStream.on('end', () => {
    const htmlEnd = `</div><script type="module" src="/Web/Client.js"></script></body></html>`;

    uiStream.end(htmlEnd);
  });

  return uiStream;
}
