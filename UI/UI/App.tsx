// UI/App.tsx
import React from 'react';

export function App(): React.ReactElement {
  const message = 'helloWorld';

  return (
    <div onClick={() => console.log(`I've been Fucking clicked!`)}>
      {message}
    </div>
  );
}
