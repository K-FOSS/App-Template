// UI/Routes/Home/index.tsx
import React from 'react';
import { useHistory } from 'react-router';

export default function HomeRoute(): React.ReactElement {
  const { push } = useHistory();

  return (
    <>
      <h1>Home</h1>
      <p onClick={() => push('/')}>Home</p>
      <p onClick={() => push('/About')}>About</p>
    </>
  );
}
