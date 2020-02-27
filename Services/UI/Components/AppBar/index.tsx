// Components/AppBar/index.tsx
import {
  AppBar as MUIAppBar,
  Button,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Theme,
  createStyles,
} from '@material-ui/core';
import React, { useMemo } from 'react';
import { Menu as MenuIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export function AppBar(): React.ReactElement {
  const classes = useStyles();

  console.log(`I'm an AppBar!`);

  return useMemo(
    () => (
      <MUIAppBar position='static'>
        {' '}
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            News
          </Typography>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </MUIAppBar>
    ),
    [],
  );
}
