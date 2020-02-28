// src/Library/IdentityProvider.ts
import validator from '@authenio/samlify-node-xmllint';
import { FastifyReply, FastifyRequest } from 'fastify';
import { promises as fs } from 'fs';
import { ServerResponse } from 'http';
import {
  IdentityProvider,
  setSchemaValidator as setSAMLifySchemaValidator,
} from 'samlify';
import { config } from '../Config';
import { sp } from './ServiceProvider';

setSAMLifySchemaValidator(validator);

const metadata = await fs.readFile(config.metadataFile);

export const idp = IdentityProvider({
  metadata,
});

export async function handleRedirectRoute(
  request: FastifyRequest,
  reply: FastifyReply<ServerResponse>,
): Promise<void> {
  const { id, context: redirectUrl } = await sp.createLoginRequest(
    idp,
    'redirect',
  );
  reply.redirect(redirectUrl);
}
