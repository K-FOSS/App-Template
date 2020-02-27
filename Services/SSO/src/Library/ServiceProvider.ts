// src/Library/ServiceProvider.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { ServerResponse } from 'http';
import { sign } from 'jsonwebtoken';
import { Constants, ServiceProvider } from 'samlify';
import { config } from '../Config';
import { idp } from './IdentityProvider';

const binding = Constants.namespace.binding;

export const sp = ServiceProvider({
  entityID: `https://${config.publicDomain}/sso/metadata`,
  assertionConsumerService: [
    {
      Binding: binding.post,
      Location: `https://${config.publicDomain}/sso/acs`,
    },
  ],
});

export async function handleACSRoute(
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>,
): Promise<void> {
  try {
    const { extract } = await sp.parseLoginResponse(idp, 'post', request);
    console.log(extract);

    const JWTString = sign(
      {
        valid: true,
      },
      config.secretKey,
      {
        expiresIn: '1d',
      },
    );

    reply.redirect(`/?token=${JWTString}`);
  } catch (err) {
    console.error('Error occured during ACS handling. ', err);
    reply.send('Unkown error occured. Please try again later.');
  }
}

export async function handleMetadataRoute(
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>,
): Promise<void> {
  reply.type('text/xml').send(sp.getMetadata());
}
