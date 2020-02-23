// src/index.ts
import 'reflect-metadata';
import Fastify from 'fastify';
import { log } from './Library/logger';
import { ensureDatabaseConnection } from './Library/Database';
import { createApolloServer } from './Library/Apollo';

const dbConnection = ensureDatabaseConnection();

const webServer = Fastify();
const gqlServer = await createApolloServer();

webServer.get('/healthcheck', async (request, reply) => {
  reply.code(200);

  log('info', 'Health Check endpoint pinged');

  return { status: 'OK' };
});

webServer.register(gqlServer.createHandler());

await dbConnection;

await webServer.listen(8080, '0.0.0.0');

log('info', `API Server listening`);

export {};
