// Server/index.ts
import Fastify from 'fastify';
import { renderUIStream } from './Renderer';

const webServer = Fastify();

webServer.get('/*', async (request, reply) => {
  const componentStream = await renderUIStream(request.req.url);

  reply.type('text/html').send(componentStream);

  // const appStream = await renderUIStream();
  // appStream.pipe(reply.res, { end: false });

  // appStream.on('end', () => {
  //   reply.res.write('</div>\n</body></html>');
  //   reply.res.end();
  // });
});

await webServer.listen(8085, '0.0.0.0');

console.log('UI Server Listening');

export {};
