// Web/App.tsx
import React from 'react';
import { Router } from './Routes/Router';
import { AppBar } from '../Components/AppBar/index';

export function App(): React.ReactElement {
  return (
    <>
      <AppBar />
      <Router />
    </>
  );
}
