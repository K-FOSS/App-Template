// src/Library/Apollo.ts
import { getGQLContext } from './Context';
import { generateGQLSchema } from './gqlSchema';

type ApolloServer = import('apollo-server-fastify').ApolloServer;

let gqlServer: ApolloServer;
export async function createApolloServer(): Promise<ApolloServer> {
  if (!gqlServer) {
    const { ApolloServer } = await import('apollo-server-fastify');

    gqlServer = new ApolloServer({
      schema: await generateGQLSchema(),
      context: getGQLContext,
    });
  }

  return gqlServer;
}
