import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  loading: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: {
  },

  session: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: theme.spacing(2, 0),
  },

  sessionDetails: {},

  otherSessionsTitle: {
    marginTop: theme.spacing(4),
  },

  revoke: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    minWidth: '100px',
  },

  revokeButton: {
    marginRight: -theme.spacing(1),
    marginBottom: -theme.spacing(0.75),
  },

  lastAccessTime: {
    color: theme.palette.grey[400],
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },

  userAgent: {
    fontWeight: theme.typography.fontWeightMedium,
  },

  remoteAddr: {
    marginTop: theme.spacing(1),
  },
}));
