// Providers/ApolloProvider.tsx
import { ApolloProvider as HookApolloProvider } from '@apollo/react-hooks';
import React, { PropsWithChildren } from 'react';
import { initApollo } from '../Library/initApollo';
// import { useSnackbar } from 'notistack'

interface ApolloProviderProps {
  cache?: any;
}

export function ApolloProvider({
  children,
  cache,
}: PropsWithChildren<ApolloProviderProps>): React.ReactElement {
  // const { enqueueSnackbar } = useSnackbar();

  const client = initApollo({
    cache,
    initialState: typeof window !== 'undefined' && window?.APOLLO_STATE,
    baseUrl: 'http://192.168.254.179:8085',
  });

  return <HookApolloProvider client={client}>{children}</HookApolloProvider>;
}
