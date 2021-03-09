import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column-reverse',
    height: '100%',
    overflowY: 'auto',
  },

  empty: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  message: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'flex-start',
  },

  stretch: {
    marginLeft: theme.spacing(2),
    width: '100%',
  },

  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(0.5),
  },

  username: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: '14px'
  },

  sentAtTime: {
    color: theme.palette.grey[400],
    fontSize: '14px'
  },

  messageContent: {
    width: '85%',
  },

  messageText: {
    lineHeight: '20px',
  },
}));
