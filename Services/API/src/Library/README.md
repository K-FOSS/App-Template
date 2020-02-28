# App-Template API Libraries

In this folder are files that container generally useful functions, or external libraries imported, initialized and exported along possibly with some helpful funcitons aswell.

## Usage

Create a file with a name relevant to your general topic. I.E `Apollo.ts` for the Apollo API Library for the Expo React Native Framework.

Export the functions and consts needed elsewhere in the API and just import them in the other files as needed.

## Included Libraries

### [Apollo.ts](./Apollo.ts)

The Apollo Library is where the function used to create the [Apollo GraphQL Server](https://www.apollographql.com/docs/apollo-server/) is exported, this is where you can configure the Apollo Server

### [Context.ts](./Context.ts)

The Context library is where the [getContext](https://www.apollographql.com/docs/apollo-server/security/authentication/#putting-user-info-on-the-context) function that is called by the Apollo Server on every incoming request to set the Context for the resolvers is exported from.
