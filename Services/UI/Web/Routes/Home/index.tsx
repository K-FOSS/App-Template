// UI/Routes/Home/index.tsx
import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

export default function HomeRoute(): React.ReactElement {
  const { push } = useHistory();
  const [test, setTest] = React.useState<boolean>(false);
  const toggleTest = React.useCallback(
    () => setTest((currentTest) => !currentTest),
    [setTest],
  );

  return (
    <div>
      <h1>Home</h1>
      <p onClick={() => push('/')}>Home</p>
      <p onClick={() => push('/About')}>About</p>
      <Button onClick={toggleTest}>{test ? 'set' : 'unset'}</Button>
    </div>
  );
}
