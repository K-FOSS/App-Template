// src/index.ts
import Fastify from 'fastify';
import fastifyFormBody from 'fastify-formbody';
import fastifyCookie from 'fastify-cookie';
import { config } from './Config';
import { handleRedirectRoute } from './Library/IdentityProvider';
import { handleACSRoute, handleMetadataRoute } from './Library/ServiceProvider';

// Web Server for routing incoming HTTP Traffic
const webServer = Fastify();

// Register Middlware
webServer.register(fastifyFormBody);
webServer.register(fastifyCookie, {
  secret: config.uiSharedSecretKey,
  parseOptions: {},
});

webServer.all('/sso/acs', handleACSRoute);
webServer.get('/sso/redirect', handleRedirectRoute);
webServer.all('/sso/metadata', handleMetadataRoute);

const listeningHost = await webServer.listen(8080, '0.0.0.0');
console.log(`SSO Server is listening on ${listeningHost}`);

export {};
