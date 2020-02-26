// Web/Routes/Router.tsx
import React from 'react';
import { Switch, Route } from 'react-router';
import HomeRoute from './Home/index';
import AboutRoute from './About/index';

export function Router(): React.ReactElement {
  return (
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/About" component={AboutRoute} />
    </Switch>
  );
}
