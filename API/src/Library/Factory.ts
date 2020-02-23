// src/Library/Factory.ts
// API/src/Library/Factory.ts
import { Blueprint, EntityFactory } from '@entity-factory/core';
import { TypeormAdapter } from '@entity-factory/typeorm';
import { createConnection } from 'typeorm';
import { getConnectionOptions } from './Database';
import { loadFiles } from './loadFiles';

let factory: EntityFactory;
export async function getFactory(): Promise<EntityFactory> {
  if (!factory) {
    const connectionOpts = {
      ...(await getConnectionOptions()),
      database: 'app-template-test',
    };

    const adapter = new TypeormAdapter({
      ...(connectionOpts as any),
    });
    const connection = await createConnection(connectionOpts);
    await connection.dropDatabase();
    await connection.synchronize();

    const blueprints: Blueprint[] = await loadFiles(
      '../Modules/**/**Factory.+(ts|js)',
    );

    factory = new EntityFactory({
      adapter,
      blueprints,
    });
  }

  // const factoryModules = await Promise.all(blueprintPromises);

  // let blueprints: Blueprint[] = [];
  // for (const factoryModule of factoryModules) {
  //   console.log(`Factory module: `, factoryModule);
  // }

  return factory;
}
