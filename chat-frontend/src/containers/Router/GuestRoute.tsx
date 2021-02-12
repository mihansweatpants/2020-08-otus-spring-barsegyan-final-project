import React, { FC } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { useSelector } from 'store';

const GuestRoute: FC<RouteProps> = ({
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
        if (user != null) {
          return <Redirect to="/" />;
        }

        return (
          <Route {...props} children={children} component={component} render={render} />
        );
      }}
    />
  );
};

export default GuestRoute;
