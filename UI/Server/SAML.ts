// Server/SAML.ts
// @ts-ignore
import validator from '@authenio/samlify-node-xmllint';
import { FastifyReply, FastifyRequest } from 'fastify';
import { promises as fs } from 'fs';
import { ServerResponse } from 'http';
import { sign } from 'jsonwebtoken';
import samlify, { IdentityProvider, ServiceProvider } from 'samlify';
import { config } from './Config';
import { extract } from 'samlify/types/src/extractor';

const binding = samlify.Constants.namespace.binding;

samlify.setSchemaValidator(validator);

const googleMetadata = await fs.readFile('/IDPMetadata.xml');

export const idp = IdentityProvider({
  metadata: googleMetadata,
});

export const serviceProvider = ServiceProvider({
  entityID: `https://localhost.kristianjones.dev/sso/metadata`,
  assertionConsumerService: [
    {
      Binding: binding.post,
      Location: 'https://localhost.kristianjones.dev/sso/acs',
    },
  ],
});

export async function handleACS(
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>,
): Promise<void> {
  try {
    const { extract } = await serviceProvider.parseLoginResponse(
      idp,
      'post',
      request,
    );
    const { nameID: email } = extract;

    const JWTString = sign(
      {
        valid: true,
        email,
      },
      config.secretKey,
    );

    reply.redirect(`/?token=${JWTString}`);
  } catch (err) {
    console.error('[FATAL] when parsing login response sent from okta', err);
    reply.send('ERROR DURING AUTH');
  }
}
