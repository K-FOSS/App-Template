// src/Modules/Configuration/ConfigurationModel.ts
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  DeepPartial,
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

let hasSetup: boolean;

@Entity()
@ObjectType()
export class Configuration extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  readonly uuid: number;

  @Column('int')
  id: 1;

  static async hasCompletedSetup(): Promise<boolean> {
    if (hasSetup) return true;

    let hasAlreadySetup = (await Configuration.count({ id: 1 })) === 1;
    if (hasAlreadySetup === true) hasSetup = true;

    return hasAlreadySetup;
  }

  static async initalConfiguration(
    config: DeepPartial<Omit<Configuration, 'id'>>,
  ) {
    const hasConfigured = await this.hasCompletedSetup();
    if (hasConfigured)
      throw new Error('Initial configuration already completed');

    const configuration = Configuration.create({ ...config, id: 1 });
    await configuration.save();

    return configuration;
  }
}
