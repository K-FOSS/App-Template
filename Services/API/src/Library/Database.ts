// src/Library/Database.ts
import 'reflect-metadata';
import { Connection, createConnection, EntitySchema } from 'typeorm';
import { config } from '../Config/index';
import { loadFiles } from './loadFiles';

type PostgresConnectionArgs = import('typeorm/driver/postgres/PostgresConnectionOptions').PostgresConnectionOptions;

let connectionOptions: PostgresConnectionArgs;
export async function getConnectionOptions(): Promise<PostgresConnectionArgs> {
  if (!connectionOptions) {
    const entities = await loadFiles<EntitySchema>(
      'Modules/**/**Model.+(ts|js)',
    );

    connectionOptions = {
      type: 'postgres',
      ...config.database,
      entities,
      synchronize: true,
      logging: false,
    };
  }

  return connectionOptions;
}

export async function ensureDatabaseConnection(): Promise<Connection> {
  const connectionOptions = await getConnectionOptions();

  return createConnection(connectionOptions);
}
