// src/Library/gqlSchema.ts
import {
  DocumentNode,
  execute as executeGraphQL,
  ExecutionResult,
  GraphQLSchema,
} from 'graphql';
import { buildSchema } from 'type-graphql';
import { loadFiles } from './loadFiles';
import { SchemaDirectiveVisitor } from 'apollo-server-fastify';
import { camelCase } from './Random';
// import { setupRequired } from '../Modules/Configuration/setupRequiredDirective';

let schema: GraphQLSchema;
export async function generateGQLSchema(): Promise<GraphQLSchema> {
  if (!schema) {
    const resolvers: Function[] = await loadFiles(
      'Modules/**/**Resolver.+(ts|js)',
    );

    schema = await buildSchema({
      resolvers: resolvers as any,
    });
    const directives = await loadFiles<typeof SchemaDirectiveVisitor>(
      'Modules/**/**Directive.+(ts|js)',
    );

    let directiveMap: { [key: string]: typeof SchemaDirectiveVisitor } = {};
    for (const directive of directives) {
      const camelCaseName = camelCase(directive.name);

      directiveMap[camelCaseName] = directive;
    }

    SchemaDirectiveVisitor.visitSchemaDirectives(schema, directiveMap);
  }

  return schema;
}

export async function executeGQL<TData>(
  gqlString: DocumentNode,
): Promise<ExecutionResult<TData>> {
  if (!schema) await generateGQLSchema();

  return executeGraphQL(schema, gqlString);
}
