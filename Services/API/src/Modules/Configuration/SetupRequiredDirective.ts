// src/Modules/Configuration/setupRequiredDirective.ts
import { SchemaDirectiveVisitor } from 'apollo-server-fastify';
import { defaultFieldResolver, GraphQLField, GraphQLObjectType } from 'graphql';
import { Configuration } from './ConfigurationModel';

interface SetupRequiredObjectType extends GraphQLObjectType {
  _requiredSetupState: boolean;
  _setupRequiredFieldsWrapped: boolean;
}

interface SetupRequiredField extends GraphQLField<any, any> {
  setupRequiredWrapped: boolean | undefined;
}

export class SetupRequired extends SchemaDirectiveVisitor {
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  public visitFieldDefinition(
    field: SetupRequiredField,
    details: {
      objectType: SetupRequiredObjectType;
    },
  ) {
    const { resolve = defaultFieldResolver } = field;

    let requiredState = this.args.required || true;
    console.log(`Required State: `, requiredState);

    console.log(
      `Setup Required Visit Field. field: `,
      field,
      `\nDetails: `,
      details,
      `This: `,
      this,
    );

    field.resolve = async function(...args) {
      const hasSetup = await Configuration.hasCompletedSetup();
      if (hasSetup !== requiredState)
        throw new Error(
          `Setup has ${requiredState ? 'not yet' : 'already'} been completed`,
        );

      return resolve.apply(this, args);
    };
  }
}
