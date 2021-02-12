import React, { FC } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { AuthPage } from 'modules/auth/pages/AuthPage';
import { MessengerView } from 'modules/messenger/pages/MessengerView';

import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import { QueryParamProvider } from 'use-query-params';

const Router: FC = () => {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Switch>
          <GuestRoute path="/auth" exact component={AuthPage} />

          <ProtectedRoute path="/" exact component={MessengerView} />

          <Redirect to="/" />
        </Switch>
      </QueryParamProvider>
    </BrowserRouter>
  );
}

export default Router;
