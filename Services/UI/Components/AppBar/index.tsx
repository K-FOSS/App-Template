// Components/AppBar/index.tsx
import {
  AppBar as MUIAppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: theme.mixins.toolbar,
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

  return (
    <>
      <MUIAppBar position='sticky' className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Photos
          </Typography>
        </Toolbar>
      </MUIAppBar>
    </>
  );
}
