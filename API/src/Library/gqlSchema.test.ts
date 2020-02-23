// src/Library/gqlSchema.test.ts
import { generateGQLSchema } from './gqlSchema';

describe('gqlSchema.ts', () => {
  test('Generate GQL Schema', async () => {
    const schema = await generateGQLSchema();

    expect(schema).toBeDefined();
  });
});
