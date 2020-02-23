// src/Modules/Configuration/setupRequiredDirective.ts
import { SchemaDirectiveVisitor } from 'apollo-server-fastify';
import { defaultFieldResolver, GraphQLField, GraphQLObjectType } from 'graphql';
import { log } from '../../Library/logger';
import { Configuration } from './ConfigurationModel';

interface SetupRequiredObjectType extends GraphQLObjectType {
  _requiredSetupState: boolean;
  _setupRequiredFieldsWrapped: boolean;
}

interface SetupRequiredField extends GraphQLField<any, any> {
  setupRequiredWrapped: boolean | undefined;
}

export class SetupRequired extends SchemaDirectiveVisitor {
  public visitObject(type: SetupRequiredObjectType) {
    this.ensureFieldsWrapped(type);
  }
  // Visitor methods for nested types like fields and arguments
  // also receive a details object that provides information about
  // the parent and grandparent types.
  public visitFieldDefinition(
    field: SetupRequiredField,
    details: {
      objectType: SetupRequiredObjectType;
    },
  ) {
    this.ensureFieldsWrapped(details.objectType);
  }

  public ensureFieldsWrapped(objectType: SetupRequiredObjectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._setupRequiredFieldsWrapped) return;
    objectType._setupRequiredFieldsWrapped = true;

    const fields = objectType.getFields();

    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName] as SetupRequiredField;

      const { resolve = defaultFieldResolver } = field;
      field.resolve = async function(...args) {
        const hasSetup = await Configuration.hasCompletedSetup();
        if (!hasSetup) throw new Error('Setup has not been completed');

        return resolve.apply(this, args);
      };
    });
  }
}
