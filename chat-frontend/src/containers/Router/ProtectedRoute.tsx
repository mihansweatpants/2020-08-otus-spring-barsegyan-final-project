import React, { FC } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { Layout } from 'containers';

import { useSelector } from 'store';

const ProtectedRoute: FC<RouteProps> = ({
  render,
  children,
  component,
  ...rest
}) => {
  const { user } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={(...props) => {
        if (user == null) {
          return <Redirect to="/auth" />;
        }

        return (
          <Layout>
            <Route {...props} children={children} component={component} render={render} />
          </Layout>
        );
      }}
    />
  );
};

export default ProtectedRoute;
