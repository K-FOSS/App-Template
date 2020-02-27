// API/src/Modules/Configurations/ConfigurationFactory.ts
import { TypeormBlueprint } from '@entity-factory/typeorm';
import { Configuration } from './ConfigurationModel';
import { DeepEntityPartial } from '@entity-factory/core';

export class ConfigurationFactory extends TypeormBlueprint<Configuration> {
  constructor() {
    super();

    this.type(Configuration);

    this.define(
      async ({
        faker,
        factory,
      }): Promise<DeepEntityPartial<Configuration>> => ({ id: 1 }),
    );
  }
}
