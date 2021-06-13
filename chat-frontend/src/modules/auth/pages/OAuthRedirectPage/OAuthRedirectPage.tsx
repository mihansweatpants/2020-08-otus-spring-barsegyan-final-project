import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParam, StringParam } from 'use-query-params';

import { CircularProgress } from '@material-ui/core';

import { HttpApi } from 'api';
import { useDispatch } from 'store';
import { fetchCurrentUser } from 'store/auth/authSlice';

import { useStyles } from './styles';

const OAuthRedirectPage: FC = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [authToken] = useQueryParam('token', StringParam);
  const [error] = useQueryParam('error', StringParam);

  useEffect(
    () => {
      if (authToken) {
        localStorage.setItem(HttpApi.AUTH_TOKEN_LOCAL_STORAGE_KEY, authToken);
        dispatch(fetchCurrentUser());
      }

      if (error) {
        history.replace(`/auth?oauthError=${error}`);
      }
    },
    [dispatch, history, authToken, error],
  );

  return (
    <div className={styles.root}>
      <CircularProgress />
    </div>
  )
};

export default OAuthRedirectPage;
