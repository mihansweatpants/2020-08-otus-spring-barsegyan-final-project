import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },

  button: {
    borderRadius: 0,
    flex: 1,
  },

  unreadBadge: {
    backgroundColor: theme.palette.primary.light,
  },
}));
