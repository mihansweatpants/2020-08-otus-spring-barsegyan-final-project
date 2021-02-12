import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  accountInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    margin: theme.spacing(2, 0),
  },

  avatar: {
    height: '60px',
    width: '60px',
    fontSize: '24px',
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(1),
  },

  userInfo: {},
}));
