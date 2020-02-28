# App-Template Modules

The API's module's folder is where folders containing models, resolvers, directives, and factories are created. This helps to organize the API and keep one "Module" containing everything related to a specific purpose. I.E User, Configuration, Profile, Zone would all be seperate "Modules" but could all reference each other.

## Development

### Resolvers

The `ABCXYZResolver.ts` files within a Module folder are automatically loaded into the GraphQL Schema and from that into the ApolloServer GraphQL Server.

#### Queries

Queries should always be named `MODEL_NAME` for singular and `MODEL_NAMEs` for pluarl.

In this example the

#### Mutations

Mutations should be named as

#### Field Resolvers

Field resolvers can be used to inject data into the Graph that isn't present (or override what is).

#### Subscriptions

TBD

### Factories

File Name: `ABCXYZFactory.ts`

Factories are used to create "Factories" for our models for use in mocking and testing.

### Models

File Name: `ABCXYZModel.ts`

### Directives

File Name: `ABCXYZDirective.ts`

### Tests

File Name: `ABCXYZ.test.ts`
