// Library/initApollo.ts
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/react-hooks';
import fetch from 'isomorphic-unfetch';
// import { possibleTypes } from '../GraphQL/introspection-result.json';

interface InitClientParams {
  baseUrl: string;
  initialState?: any;
  cache?: any;
}

export function initApollo({
  baseUrl,
  initialState,
  cache = new InMemoryCache().restore(initialState || {}),
}: InitClientParams): import('@apollo/client').ApolloClient<any> {
  const link = createHttpLink({
    uri: `${baseUrl}/graphql`,
    fetch,
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link,
    cache: cache,
  });
}
