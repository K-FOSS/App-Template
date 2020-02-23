// src/Modules/Configuration/ConfigurationResolver.ts
import { Query, Resolver, Mutation, Directive } from 'type-graphql';
import { Configuration } from './ConfigurationModel';

@Resolver()
export class ConfigurationResolver {
  constructor() {}

  @Query(() => Boolean)
  hasFinishedSetup(): Promise<boolean> {
    return Configuration.hasCompletedSetup();
  }

  @Directive('@setupRequired')
  @Query(() => String)
  async helloWorld(): Promise<'helloWorld'> {
    return 'helloWorld';
  }

  @Mutation(() => Boolean)
  async setupApplication(): Promise<boolean> {
    await Configuration.initalConfiguration({});

    return Configuration.hasCompletedSetup();
  }
}
