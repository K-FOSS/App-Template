// UI/Routes/Home/index.tsx
import React from 'react';
import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';

export default function HomeRoute(): React.ReactElement {
  const { push } = useHistory();

  return (
    <>
      <h1>Home</h1>
      <p onClick={() => push('/')}>Home</p>
      <p onClick={() => push('/About')}>About</p>
      <Button
        variant='contained'
        color='primary'
        onClick={() => console.log('Hello World2')}
      >
        Hello World
      </Button>
    </>
  );
}
