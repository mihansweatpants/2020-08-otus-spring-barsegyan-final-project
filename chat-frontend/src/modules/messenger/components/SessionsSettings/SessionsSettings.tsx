import React, { FC, Fragment, useEffect } from 'react';

import { CircularProgress, Typography, Divider, Button } from '@material-ui/core';

import { useSelector, useDispatch } from 'store';
import { fetchUserSessions, revokeSession } from 'store/settings/sessionsSlice';
import { signOut } from 'store/auth/authSlice';

import { formatToShortTime } from 'utils/date';

import { useStyles } from './styles';
import { HttpApi } from 'api';

const SessionsSettings: FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchUserSessions()), [dispatch]);

  const { sessions, pendingRequests } = useSelector(state => state.sessions);

  if (pendingRequests.isLoadingList) {
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    )
  }

  if (sessions.length === 0) return null;

  const currentSession = sessions.find(session => session.id === localStorage.getItem(HttpApi.AUTH_TOKEN_LOCAL_STORAGE_KEY));
  const otherSessions = sessions.filter(session => session.id !== currentSession?.id);

  return (
    <>
      {
        currentSession != null && (
          <>
            <Typography variant="h6" color="textSecondary">
              Current session
            </Typography>

            <div className={styles.session} key={currentSession.id}>
              <div className={styles.sessionDetails}>
                <Typography className={styles.userAgent}>{currentSession.details?.userAgent ?? <>&ndash;</>}</Typography>
                <Typography className={styles.remoteAddr} color="textSecondary">{currentSession.details?.remoteAddr ?? <>&ndash;</>}</Typography>
              </div>

              <div className={styles.revoke}>
                <Typography variant="body2" color="primary">
                  online
                </Typography>

                <Button
                  variant="text"
                  color="primary"
                  className={styles.revokeButton}
                  onClick={() => dispatch(signOut())}
                  disabled={pendingRequests[currentSession.id]}
                >
                  Sign out
                </Button>
              </div>
            </div>
          </>
        )
      }

      {
        otherSessions.length > 0 && (
          <>
            <Typography variant="h6" color="textSecondary" className={styles.otherSessionsTitle}>
              Other sessions
            </Typography>

            <div className={styles.list}>
              {
                otherSessions.map((session, index) => (
                  <Fragment key={session.id}>
                    <div className={styles.session}>
                      <div className={styles.sessionDetails}>
                        <Typography className={styles.userAgent}>{session.details?.userAgent ?? <>&ndash;</>}</Typography>
                        <Typography className={styles.remoteAddr} color="textSecondary">{session.details?.remoteAddr ?? <>&ndash;</>}</Typography>
                      </div>

                      <div className={styles.revoke}>
                        <Typography className={styles.lastAccessTime}>
                          {formatToShortTime(session.lastAccessedTime)}
                        </Typography>

                        <Button
                          variant="text"
                          color="primary"
                          className={styles.revokeButton}
                          onClick={() => dispatch(revokeSession(session.id))}
                          disabled={pendingRequests[session.id]}
                        >
                          Revoke
                        </Button>
                      </div>
                    </div>

                    {index !== otherSessions.length - 1 && <Divider variant="fullWidth" />}
                  </Fragment>
                ))
              }
            </div>
          </>
        )
      }
    </>
  );
};

export default SessionsSettings;