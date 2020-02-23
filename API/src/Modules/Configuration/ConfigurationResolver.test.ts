// src/Modules/Configuration/ConfigurationResolver.test.ts
import { executeGQL } from '../../Library/gqlSchema';
import { gql } from 'apollo-server-fastify';
import { getFactory } from '../../Library/Factory';
import { Configuration } from './ConfigurationModel';

describe('Configuration Resolver', () => {
  describe('helloWorld Query', () => {
    test.concurrent('Query Responds', async () => {
      const { data, errors } = await executeGQL<{
        helloWorld: 'helloWorld';
      }>(gql`
        {
          helloWorld
        }
      `);

      expect(errors).toBeUndefined();
      expect(data).toBeDefined();
      expect(data!.helloWorld).toBe('helloWorld');
    });
  });

  describe('hasFinishedSetup Query', () => {
    test.concurrent('Should Return List', async () => {
      const config = await (await getFactory()).for(Configuration).create(1);

      const { data, errors } = await executeGQL<{
        hasFinishedSetup: boolean;
      }>(gql`
        {
          hasFinishedSetup
        }
      `);

      expect(errors).toBeUndefined();
      expect(data!.hasFinishedSetup).toBeDefined();
      expect(data!.hasFinishedSetup).toBe(true);
    });
  });
});
