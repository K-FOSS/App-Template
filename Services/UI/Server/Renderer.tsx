// Server/Renderer.tsx
import { InMemoryCache } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import React from 'react';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { Duplex, Transform } from 'stream';
import { ApolloProvider } from '../Web/Providers/ApolloProvider';
import { ThemeProvider } from '../Web/Providers/ThemeProvider';
import { StaticRouter } from 'react-router';
import { ServerStyleSheets } from '@material-ui/core/styles';

const htmlStart = `<!DOCTYPE html>
<html><head>
<style>
body {
  padding: 0;
  margin: 0;
}

html, body {
  height: 100%;
}
</style>
<link rel="manifest" href="/manifest.json">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
<link rel="icon" href="https://www.shareicon.net/data/512x512/2016/07/10/119930_google_512x512.png">`;

export async function renderUIStream(url?: string): Promise<Duplex> {
  const uiStream = new Transform({
    transform(chunk, enc, cb) {
      this.push(chunk);
      cb();
    },
  });
  uiStream.write(htmlStart);

  const { App } = await import('../dist/server/Web/App');

  const serverCache = new InMemoryCache();
  const serverSheets = new ServerStyleSheets();

  const context = {};
  const app = (
    <StaticRouter location={url} context={context}>
      <ApolloProvider cache={serverCache}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </StaticRouter>
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
