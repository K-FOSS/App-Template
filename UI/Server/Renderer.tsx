// Server/Renderer.tsx
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Duplex, Writable, Readable, Transform } from 'stream';

const htmlStart = `<!DOCTYPE html>
<html>
<head>
  <script>window.__INITIAL__DATA__ = {}</script>
</head>
<body>
  <div id="app">
    `;

const htmlEnd = `
  </div>
  <script type="module" src="Client.js"></script>
</body>
</html>`;

export async function renderUIStream(): Promise<Duplex> {
  const uiStream = new Transform({
    transform(chunk, enc, cb) {
      this.push(chunk);
      cb();
    },
  });
  uiStream.write(htmlStart);

  const { App } = await import('../UI/App');

  const appStream = renderToNodeStream(<App />);
  appStream.pipe(uiStream, { end: false });

  appStream.on('end', () => {
    console.log('App Stream Done');

    uiStream.end(htmlEnd);
  });

  return uiStream;
}
