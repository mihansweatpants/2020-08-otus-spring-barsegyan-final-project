import React, { FC, useState, useEffect } from 'react';
import { useQueryParam, BooleanParam } from 'use-query-params';

import { Avatar, Typography, TextField, Button, Link } from '@material-ui/core';
import { LockOutlined as LockOutlinedIcon } from '@material-ui/icons';

import { useDispatch } from 'store';
import { signIn, signUp } from 'store/auth/authSlice';

import { useStyles } from './styles';

const AuthPage: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useQueryParam('signUp', BooleanParam);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitFailed, setIsSubmitFailed] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      isSignUp
        ? await dispatch(signUp({ username, password, email }))
        : await dispatch(signIn({ username, password }));
    }
    catch {
      setIsSubmitFailed(true);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  useEffect(
    () => setIsSubmitFailed(false),
    [username, password, email, isSignUp]
  );

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5" className={styles.formTitle}>
          Sign {isSignUp ? 'Up' : 'In'}
        </Typography>

        <TextField
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
          variant="outlined"
          label="Username"
          required
          fullWidth
          className={styles.formField}
        />

        {
          isSignUp && (
            <TextField
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              variant="outlined"
              label="Email Address"
              type="email"
              required
              fullWidth
              className={styles.formField}
            />
          )
        }

        <TextField
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          variant="outlined"
          label="Password"
          type="password"
          required
          fullWidth
          className={styles.formField}
        />

        {
          isSubmitFailed && isSignUp && (
            <Typography align="center" className={styles.formField} color="error">
              Sign Up failed. Username or email might be taken.
            </Typography>
          )
        }

        {
          isSubmitFailed && !isSignUp && (
            <Typography align="center" className={styles.formField} color="error">
              Sign In failed. Incorrect username or password.
            </Typography>
          )
        }

        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={styles.submitButton}
        >
          Sign {isSignUp ? 'Up' : 'In'}
        </Button>

        {
          isSignUp
            ? (
                <Link className={styles.link} variant="body2" onClick={() => setIsSignUp(undefined)}>
                  Already have an account? Sign In
                </Link>
              )
            : (
                <Link className={styles.link} variant="body2" onClick={() => setIsSignUp(true)}>
                  Don't have an account? Sign Up
                </Link>
              )
        }
      </form>
    </div>
  );
}

export default AuthPage;
