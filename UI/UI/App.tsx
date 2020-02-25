import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const hasSetupGQL = gql`
  {
    hasFinishedSetup
  }
`;

export function App() {
  const { data } = useQuery<{ hasFinishedSetup: boolean }>(hasSetupGQL);

  return (
    <div>
      {data?.hasFinishedSetup.valueOf() ? 'has' : `hasn't`} Setup Application
      Yet
    </div>
  );
}
