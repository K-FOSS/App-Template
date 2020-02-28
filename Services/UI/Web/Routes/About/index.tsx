// Web/Routes/About/index.tsx
import React from 'react';
import { useHistory } from 'react-router';

export default function AboutRoute(): React.ReactElement {
  const { push } = useHistory();

  return (
    <>
      <h1>About</h1>
      <p onClick={() => push('/')}>Home</p>
      <p onClick={() => push('/About')}>About</p>
    </>
  );
}
