// Web/Providers/ThemeProvider.tsx
import React, { PropsWithChildren } from 'react';
import {
  ThemeProvider as MaterialThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export function ThemeProvider({
  children,
}: PropsWithChildren<{}>): React.ReactElement {
  return (
    <MaterialThemeProvider theme={theme}>{children}</MaterialThemeProvider>
  );
}
