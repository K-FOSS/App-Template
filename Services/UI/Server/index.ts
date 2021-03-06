// Server/index.ts
import Fastify from 'fastify';
import fastifyCookie from 'fastify-cookie';
import formBody from 'fastify-formbody';
import { verify } from 'jsonwebtoken';
import { config } from './Config';
import { handleManifestRoute } from './Library/Manifest';
import { renderUIStream } from './Renderer';

const webServer = Fastify();
webServer.register(formBody);

webServer.register(fastifyCookie, {
  secret: config.uiSharedSecretKey,
});

webServer.get('/manifest.json', handleManifestRoute);

webServer.get('/*', async (request, reply) => {
  if (request.query?.token) {
    reply.setCookie('token', request.query?.token, {
      sameSite: true,
      path: '/',
    });
  }

  try {
    if (config.requireAuth) {
      try {
        const token = request.query?.token || request.cookies.token;

        const tokenPayload = verify(token, config.secretKey) as {
          valid: boolean;
        };
        if (!tokenPayload.valid) {
          throw new Error('INVALID Token');
        }
      } catch {
        reply.redirect('/sso/redirect');
      }
    }

    const componentStream = await renderUIStream(request.req.url);

    reply.type('text/html').send(componentStream);
  } catch (err) {
    console.log(err);
    reply.send('Error');
  }

  // const appStream = await renderUIStream();
  // appStream.pipe(reply.res, { end: false });

  // appStream.on('end', () => {
  //   reply.res.write('</div>\n</body></html>');
  //   reply.res.end();
  // });
});

// webServer.get('/sso/redirect', async (request, reply) => {
//   const { idp, serviceProvider } = await import('./SAML');

//   const { id, context: redirectUrl } = await serviceProvider.createLoginRequest(
//     idp,
//     'redirect',
//   );

//   reply.redirect(redirectUrl);
// });

// webServer.get('/sso/post', async (request, reply) => {
//   const { idp, serviceProvider } = await import('./SAML');

//   const { id, context } = await serviceProvider.createLoginRequest(idp, 'post');
//   // construct form data
//   const endpoint = idp.entityMeta.getSingleSignOnService('post') as string;

//   return reply.type('text/html')
//     .send(`<form id="saml-form" method="post" action="${endpoint}" autocomplete="off">
//   <input type="hidden" name="SAMLRequest" id="SAMLRequest" value="${context}" />
// </form>
// <script type="text/javascript">
//   document.forms[0].submit();
// </script>`);
// });

// webServer.get('/sso/metadata', async (request, reply) => {
//   const { idp, serviceProvider } = await import('./SAML');

//   reply.header('Content-Type', 'text/xml').send(serviceProvider.getMetadata());
// });

// webServer.get('/idp/metadata', async (request, reply) => {
//   const { idp, serviceProvider } = await import('./SAML');

//   reply.header('Content-Type', 'text/xml').send(idp.getMetadata());
// });

// webServer.all('/sso/login', async (request, reply) => {
//   const { idp, serviceProvider } = await import('./SAML');

//   const { id, context: redirectUrl } = await serviceProvider.createLoginRequest(
//     idp,
//     'redirect',
//   );

//   reply.redirect(redirectUrl);
// });

// webServer.all('/sso/acs', handleACS);

await webServer.listen(8085, '0.0.0.0');

console.log('UI Server Listening');

export {};
